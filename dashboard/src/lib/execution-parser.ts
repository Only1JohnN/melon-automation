import fs from "fs";
import path from "path";
import {
  parseTests,
  parseFailures,
  parseApplications,
  groupByFeature,
} from "./playwright-parser";

import { Execution } from "./executions";
import { resolveArtifacts } from "./artifacts";

const REPORTS_URL =
  "https://raw.githubusercontent.com/Only1JohnN/melon-automation/reports/reports";

export async function getExecutionReport(
  executionId: string
) {
  // Same rule as the executions list: prefer a local reports/ folder, else read the reports branch.
  const localIndex = path.join(
    process.cwd(),
    "../reports/executions/index.json"
  );

  const executions = fs.existsSync(localIndex)
    ? JSON.parse(fs.readFileSync(localIndex, "utf8"))
    : await fetch(
        `${REPORTS_URL}/executions/index.json`,
        {
          cache: "no-store",
        }
      ).then((r) => r.json());

  const execution =
    executions.find(
      (item: Execution) =>
        item.id === executionId
    );

  if (!execution) {
    return null;
  }

  const executedAt =
    new Date(
      execution.executedAt
    );

  const year =
    executedAt.getUTCFullYear();

  const month = String(
    executedAt.getUTCMonth() + 1
  ).padStart(2, "0");

  const localReport = path.join(
    process.cwd(),
    "../reports/executions",
    String(year),
    month,
    executionId,
    "results.json"
    );

    let report;

    if (fs.existsSync(localReport)) {
    report = JSON.parse(
        fs.readFileSync(
        localReport,
        "utf8"
        )
    );
    } else {
    report = await fetch(
        `${REPORTS_URL}/executions/${year}/${month}/${executionId}/results.json`,
        {
        cache: "no-store",
        }
    ).then((r) => r.json());
    }

  return {
    execution,
    report,
    year,
    month,
  };
}

export async function getExecutionMetadata(
  executionId: string
) {
  const data =
    await getExecutionReport(
      executionId
    );

  return data?.execution ?? null;
}

export async function getExecutionOverview(
  executionId: string
) {
  const data =
    await getExecutionReport(
      executionId
    );

  if (!data) {
    return null;
  }

  const {
    report,
    execution,
  } = data;

  return {
    total:
      report.stats.expected +
      report.stats.unexpected +
      report.stats.flaky,

    passed:
      report.stats.expected,

    failed:
      report.stats.unexpected,

    passRate:
      (
        (report.stats.expected /
          (report.stats.expected +
            report.stats.unexpected +
            report.stats.flaky)) *
        100
      ).toFixed(1),

    duration:
      report.stats.duration,

    browser:
      report.config?.projects?.[0]
        ?.name ??
      "Unknown",

    environment:
      execution.environment,

    executedAt:
      execution.executedAt,

    trigger:
      execution.trigger,

    status:
      execution.status,
  };
}

export async function getExecutionTests(
  executionId: string
) {
  const data =
    await getExecutionReport(
      executionId
    );

  if (!data) {
    return [];
  }

  return parseTests(
    data.report
  );
}

export async function getExecutionFailures(
  executionId: string
) {
  const data =
    await getExecutionReport(
      executionId
    );

  if (!data) {
    return [];
  }

  return parseFailures(
    data.report
  );
}

export async function getExecutionApplications(
  executionId: string
) {
  const data =
    await getExecutionReport(
      executionId
    );

  if (!data) {
    return [];
  }

  return parseApplications(
    data.report
  );
}

export async function getGroupedExecutionTests(
  executionId: string
) {
  const tests =
    await getExecutionTests(
      executionId
    );

  return groupByFeature(
    tests
  );
}

export async function getGroupedExecutionFailures(
  executionId: string
) {
  const failures =
    await getExecutionFailures(
      executionId
    );

  return groupByFeature(
    failures
  );
}

export async function getExecutionTestById(
  executionId: string,
  testId: string
) {
  const tests =
    await getExecutionTests(
      executionId
    );

  const found =
    tests.find(
      (test) =>
        test.id === testId
    ) || null;

  if (!found) {
    return null;
  }

  return {
    ...found,
    apiLogs:
      await getExecutionApiLogs(
        executionId,
        found.playwrightTestId
      ),
  };
}

export async function getExecutionFailureById(
  executionId: string,
  failureId: string
) {
  const data =
    await getExecutionReport(
      executionId
    );

  if (!data) {
    return null;
  }

  const failures =
    parseFailures(
      data.report
    );

  const failure =
    failures.find(
      (f) =>
        f.id === failureId
    );

  if (!failure) {
    return null;
  }

  const artifacts = await resolveArtifacts(
    failure.attachments,
    {
      localRoots: [
        {
          dir: path.join(
            process.cwd(),
            "../reports/executions",
            String(data.year),
            data.month,
            executionId,
            "reports-artifacts"
          ),
          urlPrefix: `/api/artifacts/${data.year}/${data.month}/${executionId}/`,
        },
        {
          dir: path.join(process.cwd(), "test-results"),
          urlPrefix: "/api/artifacts/",
        },
      ],
      remoteBase: `${REPORTS_URL}/executions/${data.year}/${data.month}/${executionId}/reports-artifacts`,
    }
  );

  return {
    ...failure,

    artifacts,

    apiLogs:
      await getExecutionApiLogs(
        executionId,
        failure.playwrightTestId
      ),
  };
}

export async function getExecutionTestsByApplication(
  executionId: string,
  application: string
) {
  const tests =
    await getExecutionTests(
      executionId
    );

  return groupByFeature(
    tests.filter((test) =>
      test.tags.includes(
        application
      )
    )
  );
}

function getExecutionBasePath(
  year: string | number,
  month: string,
  executionId: string
) {
  return `${REPORTS_URL}/executions/${year}/${month}/${executionId}`;
}

export async function getExecutionApiLogs(
    executionId: string,
    playwrightTestId: string
    ) {
    const data =
        await getExecutionReport(
        executionId
        );

    if (!data) {
        return [];
    }

    const localLog = path.join(
        process.cwd(),
        "../reports/executions",
        String(data.year),
        data.month,
        executionId,
        "api-logs",
        `${playwrightTestId}.json`
    );

    if (fs.existsSync(localLog)) {
        return JSON.parse(
        fs.readFileSync(
            localLog,
            "utf8"
        )
        );
    }

    try {
        const res =
        await fetch(
            `${REPORTS_URL}/executions/${data.year}/${data.month}/${executionId}/api-logs/${playwrightTestId}.json`,
            {
            cache:
                "no-store",
            }
        );

        if (!res.ok) {
        return [];
        }

        return await res.json();
    } catch {
        return [];
    }
    }
