import fs from "fs";
import path from "path";
import { getReportData } from "./report-reader";
import { resolveArtifacts } from "./artifacts";
import { normalizeSteps, stripAnsi } from "./playwright-parser";
import { APPLICATIONS } from "./applications";

export async function getOverviewStats() {
  const { report, metadata } = await getReportData();

  const skipped = report.stats.skipped ?? 0;

  const total =
    report.stats.expected +
    report.stats.unexpected +
    report.stats.flaky +
    skipped;

  const passed = report.stats.expected;

  const failed = report.stats.unexpected;

  const executed = Math.max(0, total - skipped);

  const passRate = executed > 0 ? ((passed / executed) * 100).toFixed(1) : "0";

  return {
    total,
    passed,
    failed,
    skipped,
    passRate,

    duration: (report.stats.duration / 1000).toFixed(2),

    browser: report.config?.projects?.[0]?.name ?? "Unknown",

    startTime: report.stats.startTime,

    environment: metadata.environment ?? "Unknown",
  };
}

export async function getFailures() {
  const { report } = await getReportData();
  const failures: any[] = [];

  // Convert spec file path to a human‑readable feature name
  const extractFeature = (filePath: string) => {
    const fileName = filePath.split("/").pop() ?? "Unknown";
    return fileName
      .replace(".spec.ts", "")
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (char: string) => char.toUpperCase());
  };

  const walkSuites = (suites: any[]) => {
    suites.forEach((suite) => {
      if (suite.specs) {
        suite.specs.forEach((spec: any) => {
          spec.tests?.forEach((test: any) => {
            const result = test.results?.[0];
            if (result && result.status !== "passed" && result.status !== "skipped") {
              const filePath = spec.location?.file ?? spec.file ?? "Unknown";
              const file = filePath;
              const fileName = filePath.split("/").pop() ?? "Unknown";
              const feature = extractFeature(filePath);

              // Error message priority: direct error → first error from array → fallback
              const errorMessage = stripAnsi(
                result.error?.message ??
                result.errors?.[0]?.message ??
                "Unknown error"
              );

              failures.push({
                id: spec.id ?? spec.title,
                playwrightTestId: spec.id,
                title: spec.title,
                status: result.status,
                duration: result.duration,
                error: errorMessage,
                file,
                fileName,
                feature,
                project: test.projectName ?? null,
                steps: normalizeSteps(result.steps),
                attachments: result.attachments ?? [],
                tags: [...(spec.tags ?? []), ...(test.tags ?? [])],
              });
            }
          });
        });
      }

      if (suite.suites) {
        walkSuites(suite.suites);
      }
    });
  };

  walkSuites(report.suites ?? []);
  return failures;
}

export async function getFailureById(id: string) {
  const failures = await getFailures();

  const failure = failures.find((failure) => failure.id === id);

  if (!failure) {
    return null;
  }

  const apiLogs = await getApiLogs(failure.playwrightTestId);

  const artifacts = await resolveArtifacts(failure.attachments, {
    localRoots: [
      {
        dir: path.join(process.cwd(), "test-results"),
        urlPrefix: "/api/artifacts/",
      },
    ],
    remoteBase:
      "https://raw.githubusercontent.com/Only1JohnN/melon-automation/reports/reports-artifacts",
  });
  // console.log(
  //   "Failure ID:",
  //   failure.id
  // );

  // console.log(
  //   "Playwright Test ID:",
  //   failure.playwrightTestId
  // );

  // console.log(
  //   "API Logs Count:",
  //   apiLogs.length
  // );

  return {
    ...failure,
    artifacts,
    apiLogs,
  };
}

export async function getApiLogs(testId: string) {
  // ---------- Local ----------
  const localPath = path.join(
    process.cwd(),
    "../reports/api-logs",
    `${testId}.json`,
  );

  if (fs.existsSync(localPath)) {
    return JSON.parse(fs.readFileSync(localPath, "utf8"));
  }

  // ---------- CI ----------
  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/Only1JohnN/melon-automation/reports/reports/api-logs/${testId}.json`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      return [];
    }

    return await res.json();
  } catch {
    return [];
  }
}

function getFeatureInfo(spec: any) {
  const file = spec.location?.file ?? spec.file ?? "Unknown";

  const fileName = file.split("/").pop() ?? "Unknown";

  const feature = fileName
    .replace(".spec.ts", "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c: string) => c.toUpperCase());

  return {
    file,
    fileName,
    feature,
  };
}

export async function getAllTests() {
  const { report } = await getReportData();

  const tests: any[] = [];

  const walkSuites = (suites: any[]) => {
    suites.forEach((suite) => {
      if (suite.specs) {
        suite.specs.forEach((spec: any) => {
          const { file, fileName, feature } = getFeatureInfo(spec);

          spec.tests?.forEach((test: any) => {
            const result = test.results?.[0];

            const rawStatus = result?.status;
            const status = rawStatus
              ? String(rawStatus).toLowerCase()
              : "unknown";

            const filePath = spec.location?.file ?? spec.file ?? "";
            const fileSegments = String(filePath).toLowerCase().split(/[\\/]/);

            const appsList = [...APPLICATIONS];
            const inferredApps = appsList.filter(
              (a) =>
                (spec.tags || []).includes(a) ||
                (test.tags || []).includes(a) ||
                fileSegments.includes(a),
            );

            tests.push({
              id: spec.id || spec.title,

              title: spec.title,

              feature,

              file,

              fileName,

              tags: [...(spec.tags || []), ...(test.tags || [])],

              project: test.projectName ?? null,

              annotations: test.annotations ?? [],

              apps: inferredApps,

              status,

              duration: result?.duration ?? 0,
            });
          });
        });
      }

      if (suite.suites) {
        walkSuites(suite.suites);
      }
    });
  };

  walkSuites(report.suites || []);

  return tests;
}

export async function getGroupedTests() {
  const tests = await getAllTests();

  const grouped = new Map<string, any>();

  tests.forEach((test) => {
    if (!grouped.has(test.fileName)) {
      grouped.set(test.fileName, {
        feature: test.feature,

        file: test.file,

        fileName: test.fileName,

        tests: [],
      });
    }

    grouped.get(test.fileName).tests.push(test);
  });

  return Array.from(grouped.values()).map((group) => ({
    ...group,

    total: group.tests.length,

    passed: group.tests.filter((t: any) => t.status === "passed").length,

    failed: group.tests.filter((t: any) => t.status !== "passed" && t.status !== "skipped").length,

    skipped: group.tests.filter((t: any) => t.status === "skipped").length,
  }));
}

export async function getGroupedFailures() {
  const failures = await getFailures();

  const grouped = new Map<string, any>();

  failures.forEach((failure) => {
    if (!grouped.has(failure.feature)) {
      grouped.set(failure.feature, {
        feature: failure.feature,
        failures: [],
      });
    }

    grouped.get(failure.feature).failures.push(failure);
  });

  return Array.from(grouped.values());
}

export async function getApplications() {
  const tests = await getAllTests();

  const apps = [...APPLICATIONS];

  return apps.map((app) => {
    const appTests = tests.filter(
      (test) =>
        (test.apps || []).includes(app) || (test.tags || []).includes(app),
    );

    const total = appTests.length;
    const passed = appTests.filter((t) => t.status === "passed").length;
    const skipped = appTests.filter((t) => t.status === "skipped").length;
    const failed = Math.max(0, total - passed - skipped);
    const executed = Math.max(0, total - skipped);

    const passRate =
      executed > 0 ? ((passed / executed) * 100).toFixed(1) : "0";

    return {
      name: app,
      total,
      passed,
      failed,
      skipped,
      passRate,
    };
  });
}

export async function getTestsByApplication(application: string) {
  const tests = await getAllTests();

  const filtered = tests.filter(
    (test) =>
      (test.apps || []).includes(application) ||
      (test.tags || []).includes(application),
  );

  const grouped = new Map<string, any>();

  filtered.forEach((test) => {
    if (!grouped.has(test.feature)) {
      grouped.set(test.feature, {
        feature: test.feature,
        tests: [],
      });
    }

    grouped.get(test.feature).tests.push(test);
  });

  return Array.from(grouped.values()).map((group) => ({
    ...group,

    total: group.tests.length,

    passed: group.tests.filter((t: any) => t.status === "passed").length,

    failed: group.tests.filter((t: any) => t.status !== "passed" && t.status !== "skipped").length,

    skipped: group.tests.filter((t: any) => t.status === "skipped").length,
  }));
}

export async function getTestById(id: string) {
  const tests = await getAllTests();

  return tests.find((test) => test.id === id) || null;
}
