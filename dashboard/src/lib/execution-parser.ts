import fs from "fs";
import path from "path";
import {
  parseTests,
  parseFailures,
  parseApplications,
  groupByFeature,
} from "./playwright-parser";

import { Execution } from "./executions";

const REPORTS_URL =
  "https://raw.githubusercontent.com/Only1JohnN/melon-automation/reports/reports";

export async function getExecutionReport(
  executionId: string
) {
  const executions =
    await fetch(
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

  return (
    tests.find(
      (test) =>
        test.id === testId
    ) || null
  );
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

  const screenshotAttachment =
    failure.attachments?.find(
      (a: any) => a.name === "screenshot"
    ) ?? null;
  
  const videoAttachment =
    failure.attachments?.find(
      (a: any) => a.name === "video"
    ) ?? null;
  
  const traceAttachment =
    failure.attachments?.find(
      (a: any) => a.name === "trace"
    ) ?? null;
  
  const screenshot =
    screenshotAttachment && fs.existsSync(screenshotAttachment.path)
      ? {
          ...screenshotAttachment,
          size: fs.statSync(
            screenshotAttachment.path
          ).size,
        }
      : screenshotAttachment;
  
  const video =
    videoAttachment && fs.existsSync(videoAttachment.path)
      ? {
          ...videoAttachment,
          size: fs.statSync(
            videoAttachment.path
          ).size,
        }
      : videoAttachment;
  
  const trace =
    traceAttachment && fs.existsSync(traceAttachment.path)
      ? {
          ...traceAttachment,
          size: fs.statSync(
            traceAttachment.path
          ).size,
        }
      : traceAttachment;

  return {
    ...failure,

    screenshot,

    video,

    trace,

    screenshotUrl:
      buildExecutionArtifactUrl(
        executionId,
        data.year,
        data.month,
        screenshot
      ),

    videoUrl:
      buildExecutionArtifactUrl(
        executionId,
        data.year,
        data.month,
        video
      ),

    traceUrl:
      buildExecutionArtifactUrl(
        executionId,
        data.year,
        data.month,
        trace
      ),

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

function buildExecutionArtifactUrl(
  executionId: string,
  year: string | number,
  month: string,
  attachment: any
) {
  if (!attachment?.path) {
    return null;
  }

  const normalized = attachment.path.replace(/\\/g, "/");
  const marker = "/test-results/";
  const index = normalized.lastIndexOf(marker);

  // Extract everything after the last "/test-results/"
  const relative = index >= 0
    ? normalized.substring(index + marker.length)
    : normalized;

  const localArtifact = path.join(
    process.cwd(),
    "../reports/executions",
    String(year),
    month,
    executionId,
    "reports-artifacts",
    relative
  );

  // Local reports copy (if you manually copied artifacts)
  if (fs.existsSync(localArtifact)) {
    return `/api/artifacts/${year}/${month}/${executionId}/${relative}`;
  }

  // Fallback to original path (for local Playwright test-results)
  if (fs.existsSync(attachment.path)) {
    return `/api/artifacts/${year}/${month}/${executionId}/${relative}`;
  }

  // GitHub reports branch
  return `${REPORTS_URL}/executions/${year}/${month}/${executionId}/reports-artifacts/${relative}`;
}