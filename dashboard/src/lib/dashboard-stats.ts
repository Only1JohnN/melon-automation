export async function calculateStats(report: any) {
  let passed = 0;
  let failed = 0;

  const walkSuites = (suites: any[]) => {
    suites.forEach((suite) => {
      if (suite.specs) {
        suite.specs.forEach((spec: any) => {
          spec.tests?.forEach((test: any) => {
            const status = test.results?.[0]?.status;

            if (status === "passed") passed++;
            if (status === "failed") failed++;
          });
        });
      }

      if (suite.suites) {
        walkSuites(suite.suites);
      }
    });
  };

  walkSuites(report.suites || []);

  const total = passed + failed;

  return {
    total,
    passed,
    failed,
    passRate:
      total > 0
        ? ((passed / total) * 100).toFixed(1)
        : "0",
  };
}