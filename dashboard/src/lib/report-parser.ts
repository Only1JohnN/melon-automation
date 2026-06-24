import { getReportData } from "./report-reader";

export async function getOverviewStats() {
  const { report, metadata } =
    await getReportData();

  const total =
    report.stats.expected +
    report.stats.unexpected +
    report.stats.flaky;

  const passed =
    report.stats.expected;

  const failed =
    report.stats.unexpected;

  const passRate =
    total > 0
      ? ((passed / total) * 100).toFixed(
          1
        )
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

    startTime:
      report.stats.startTime,

    environment:
      metadata.environment ??
      "Unknown",
  };
}

export async function getFailures() {
  const { report } =
    await getReportData();

  const failures: any[] = [];

  const githubBase =
    "https://raw.githubusercontent.com/Only1JohnN/melon-automation/reports";

  const buildArtifactUrl = (
    attachment: any
  ) => {
    if (!attachment?.path) {
      return null;
    }

    const relativePath =
      attachment.path.replace(
        "/home/runner/work/melon-automation/melon-automation/",
        ""
      );

    return `${githubBase}/reports-artifacts/${relativePath}`;
  };

  const walkSuites = (
    suites: any[]
  ) => {
    suites.forEach((suite) => {
      if (suite.specs) {
        suite.specs.forEach(
          (spec: any) => {
            spec.tests?.forEach(
              (test: any) => {
                const result =
                  test.results?.[0];

                if (
                  result &&
                  result.status !==
                    "passed"
                ) {
                  const screenshot =
                    result.attachments?.find(
                      (a: any) =>
                        a.name ===
                        "screenshot"
                    ) || null;

                  const video =
                    result.attachments?.find(
                      (a: any) =>
                        a.name ===
                        "video"
                    ) || null;

                  const trace =
                    result.attachments?.find(
                      (a: any) =>
                        a.name ===
                        "trace"
                    ) || null;

                  failures.push({
                    id:
                      spec.id ||
                      spec.title,

                    title:
                      spec.title,

                    status:
                      result.status,

                    duration:
                      result.duration,

                    error:
                      result.errors?.[1]
                        ?.message ||
                      result.error
                        ?.message ||
                      "Unknown error",

                    screenshot,
                    video,
                    trace,

                    screenshotUrl:
                      buildArtifactUrl(
                        screenshot
                      ),

                    videoUrl:
                      buildArtifactUrl(
                        video
                      ),

                    traceUrl:
                      buildArtifactUrl(
                        trace
                      ),

                    attachments:
                      result.attachments ||
                      [],

                    tags:
                      spec.tags || [],
                  });
                }
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

  return failures;
}

export async function getFailureById(
  id: string
) {
  const failures =
    await getFailures();

  return (
    failures.find(
      (failure) =>
        failure.id === id
    ) || null
  );
}

export async function getApiLogs(
  testId: string
) {
  try {
    return await fetch(
      `https://raw.githubusercontent.com/Only1JohnN/melon-automation/reports/reports/api-logs/${testId}.json`,
      {
        cache: "no-store",
      }
    ).then((res) =>
      res.json()
    );
  } catch {
    return [];
  }
}

export async function getAllTests() {
  const { report } =
    await getReportData();

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
                  id:
                    spec.id ||
                    spec.title,

                  title:
                    spec.title,

                  tags:
                    spec.tags || [],

                  status:
                    test.results?.[0]
                      ?.status ||
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

export async function getApplications() {
  const tests =
    await getAllTests();

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
          t.status ===
          "passed"
      ).length;

    const failed =
      appTests.filter(
        (t) =>
          t.status !==
          "passed"
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

export async function getTestsByApplication(
  application: string
) {
  const tests =
    await getAllTests();

  return tests.filter((test) =>
    test.tags.includes(
      application
    )
  );
}

export async function getTestById(
  id: string
) {
  const tests =
    await getAllTests();

  return (
    tests.find(
      (test) =>
        test.id === id
    ) || null
  );
}