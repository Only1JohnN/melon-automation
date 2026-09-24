import { APPLICATIONS } from "./applications";

export type ReportStep = {
  title: string;
  duration: number;
  error: string | null;
  steps: ReportStep[];
};

const ANSI = /\u001b\[[0-9;]*m/g;

export const stripAnsi = (text: string) => text.replace(ANSI, "");

// Playwright's JSON report nests `test.step` calls: each has a title, a duration
// and, when it failed, an error. Normalise them so the UI never touches raw report shapes.
export function normalizeSteps(steps: any[] = []): ReportStep[] {
  return steps.map((step) => ({
    title: step.title,
    duration: step.duration ?? 0,
    error:
      (step.error?.message ?? step.errors?.[0]?.message)?.replace(ANSI, "") ??
      null,
    steps: normalizeSteps(step.steps),
  }));
}

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

        project:
          test.projectName ??
          null,

        steps: normalizeSteps(
          result?.steps
        ),

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

        annotations:
          test.annotations ||
          [],

        error:
          (
            result?.errors?.[1]
              ?.message ||
            result?.error
              ?.message ||
            null
          )?.replace(ANSI, "") ??
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
        "passed" &&
      // A skipped test is waiting on something, not failing (its reason is shown with it).
      test.status !==
        "skipped"
  );
}

export function parseApplications(
  report: any
) {
  const tests =
    parseTests(report);

  const apps = [...APPLICATIONS];

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
              "passed" &&
            t.status !==
              "skipped"
        ).length,

      skipped:
        appTests.filter(
          (t) =>
            t.status ===
            "skipped"
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