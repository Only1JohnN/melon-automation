export function walkSuites(
  suites: any[],
  callback: (
    spec: any,
    test: any,
    result: any
  ) => void
) {
  suites.forEach((suite) => {
    if (suite.specs) {
      suite.specs.forEach((spec: any) => {
        spec.tests?.forEach((test: any) => {
          callback(
            spec,
            test,
            test.results?.[0]
          );
        });
      });
    }

    if (suite.suites) {
      walkSuites(
        suite.suites,
        callback
      );
    }
  });
}

export function parseTests(
  report: any
) {
  const tests: any[] = [];

  walkSuites(
    report.suites || [],
    (
      spec,
      test,
      result
    ) => {
      tests.push({
        id:
          spec.id ||
          spec.title,

        playwrightTestId:
          result?.testId ||
          test.testId ||
          spec.id,

        title:
          spec.title,

        feature:
          spec.file
            ?.split("/")
            .pop()
            ?.replace(
              ".spec.ts",
              ""
            ) ??
          "Unknown",

        file:
          spec.file,

        status:
          result?.status ??
          "unknown",

        duration:
          result?.duration ??
          0,

        tags: [
          ...(spec.tags ||
            []),
          ...(test.tags ||
            []),
        ],

        attachments:
          result?.attachments ||
          [],

        error:
          result?.errors?.[1]
            ?.message ||
          result?.error
            ?.message ||
          null,
      });
    }
  );

  return tests;
}

export function parseFailures(
  report: any
) {
  return parseTests(
    report
  ).filter(
    (test) =>
      test.status !==
      "passed"
  );
}

export function parseApplications(
  report: any
) {
  const tests =
    parseTests(report);

  const apps = [
    "partners",
    "admin",
    "storefront",
    "stack",
  ];

  return apps.map((app) => {
    const appTests =
      tests.filter((t) =>
        t.tags.includes(app)
      );

    return {
      name: app,

      total:
        appTests.length,

      passed:
        appTests.filter(
          (t) =>
            t.status ===
            "passed"
        ).length,

      failed:
        appTests.filter(
          (t) =>
            t.status !==
            "passed"
        ).length,
    };
  });
}

export function groupByFeature(
  tests: any[]
) {
  const grouped =
    new Map<
      string,
      any[]
    >();

  tests.forEach((test) => {
    if (
      !grouped.has(
        test.feature
      )
    ) {
      grouped.set(
        test.feature,
        []
      );
    }

    grouped
      .get(test.feature)!
      .push(test);
  });

  return Array.from(
    grouped.entries()
  ).map(
    ([feature, tests]) => ({
      feature,
      tests,
    })
  );
}