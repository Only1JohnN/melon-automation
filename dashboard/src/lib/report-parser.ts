import { getReportData } from "./report-reader";
import fs from "fs";
import path from "path";

export function getOverviewStats() {
  const { report, metadata } = getReportData();

  const total =
    report.stats.expected +
    report.stats.unexpected +
    report.stats.flaky;

  const passed = report.stats.expected;

  const failed = report.stats.unexpected;

  const passRate =
    total > 0
      ? ((passed / total) * 100).toFixed(1)
      : "0";

  return {
    total,
    passed,
    failed,
    passRate,
    duration: (
      report.stats.duration / 1000
    ).toFixed(2),
    browser:
      report.config?.projects?.[0]
        ?.name ?? "Unknown",
    startTime: report.stats.startTime,
    environment:
      metadata.environment ?? "Unknown",
  };
}

export function getFailures() {
  const { report } = getReportData();

  const failures: any[] = [];

  const walkSuites = (suites: any[]) => {
    suites.forEach((suite) => {
      if (suite.specs) {
        suite.specs.forEach((spec: any) => {
          spec.tests?.forEach((test: any) => {
            const result = test.results?.[0];

            if (
              result &&
              result.status !== "passed"
            ) {
              failures.push({
                id: spec.id || spec.title,
                title: spec.title,
                status: result.status,
                duration: result.duration,
                error:
                  result.errors?.[1]?.message ||
                  result.error?.message ||
                  "Unknown error",
                attachments:
                  result.attachments || [],
                tags: spec.tags || [],
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

  walkSuites(report.suites || []);

  return failures;
}

export function getFailureById(id: string) {
  const failure = getFailures().find(
    (failure) => failure.id === id
  );

  if (!failure) {
    return null;
  }

  return {
    ...failure,

    screenshot:
      failure.attachments.find(
        (a: any) =>
          a.name === "screenshot"
      ) || null,

    video:
      failure.attachments.find(
        (a: any) =>
          a.name === "video"
      ) || null,

    trace:
      failure.attachments.find(
        (a: any) =>
          a.name === "trace"
      ) || null,
  };
}

export function getApiLogs(
  testId: string
) {
  try {
    const filePath = path.join(
      process.cwd(),
      "../reports/api-logs",
      `${testId}.json`
    );

    return JSON.parse(
      fs.readFileSync(
        filePath,
        "utf8"
      )
    );
  } catch {
    return [];
  }
}

export function getAllTests() {
  const { report } =
    getReportData();

  const tests: any[] = [];

  const walkSuites = (
    suites: any[]
  ) => {
    suites.forEach((suite) => {
      if (suite.specs) {
        suite.specs.forEach(
          (spec: any) => {
            spec.tests?.forEach(
              (test: any) => {
                tests.push({
                    id: spec.id || spec.title,
                    title: spec.title,
                    tags: spec.tags || [],
                    status:
                        test.results?.[0]?.status ||
                        "unknown",
                    });
              }
            );
          }
        );
      }

      if (suite.suites) {
        walkSuites(
          suite.suites
        );
      }
    });
  };

  walkSuites(
    report.suites || []
  );

  return tests;
}

export function getApplications() {
  const tests =
    getAllTests();

  const apps = [
    "partners",
    "admin",
    "storefront",
    "stack",
  ];

  return apps.map((app) => {
    const appTests =
      tests.filter((test) =>
        test.tags.includes(app)
      );

    const passed =
      appTests.filter(
        (t) =>
          t.status === "passed"
      ).length;

    const failed =
      appTests.filter(
        (t) =>
          t.status !== "passed"
      ).length;

    const total =
      appTests.length;

    const passRate =
      total > 0
        ? (
            (passed / total) *
            100
          ).toFixed(1)
        : "0";

    return {
      name: app,
      total,
      passed,
      failed,
      passRate,
    };
  });
}

export function getTestsByApplication(
  application: string
) {
  const tests =
    getAllTests();

  return tests.filter((test) =>
    test.tags.includes(
      application
    )
  );
}

export function getTestById(
  id: string
) {
  const tests =
    getAllTests();

  return tests.find(
    (test) =>
      test.id === id
  );
}