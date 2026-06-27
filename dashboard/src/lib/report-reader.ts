import fs from "fs";
import path from "path";

const DEFAULT_BRANCH = process.env.REPORTS_BRANCH ?? "reports";

function getDefaultData() {
  const now = new Date().toISOString();

  return {
    report: {
      config: {
        projects: [],
      },
      suites: [],
      stats: {
        expected: 0,
        unexpected: 0,
        flaky: 0,
        duration: 0,
        startTime: now,
      },
    },
    metadata: {
      environment: process.env.APP_ENV ?? "Unknown",
    },
  };
}

function normalizeReport(input: any) {
  const report = input && typeof input === "object" ? input : {};

  return {
    ...report,
    config: report.config ?? { projects: [] },
    suites: report.suites ?? [],
    stats: {
      expected: report.stats?.expected ?? 0,
      unexpected: report.stats?.unexpected ?? 0,
      flaky: report.stats?.flaky ?? 0,
      duration: report.stats?.duration ?? 0,
      startTime: report.stats?.startTime ?? new Date().toISOString(),
      ...report.stats,
    },
  };
}

function normalizeMetadata(input: any) {
  const metadata = input && typeof input === "object" ? input : {};

  return {
    ...metadata,
    environment: metadata.environment ?? process.env.APP_ENV ?? "Unknown",
  };
}

async function fetchRemoteReportData() {
  const owner = process.env.GITHUB_OWNER ?? "Only1JohnN";
  const repo = process.env.GITHUB_REPO ?? "melon-automation";
  const branch = process.env.REPORTS_BRANCH ?? DEFAULT_BRANCH;
  const baseUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}`;

  try {
    const [reportResponse, metadataResponse] = await Promise.all([
      fetch(`${baseUrl}/reports/results.json`, { cache: "no-store" }),
      fetch(`${baseUrl}/reports/run-metadata.json`, { cache: "no-store" }),
    ]);

    if (!reportResponse.ok || !metadataResponse.ok) {
      return null;
    }

    const [report, metadata] = await Promise.all([
      reportResponse.json(),
      metadataResponse.json(),
    ]);

    return {
      report: normalizeReport(report),
      metadata: normalizeMetadata(metadata),
    };
  } catch {
    return null;
  }
}

export async function getReportData() {
  const repoRoot = path.resolve(process.cwd(), "..");
  const candidates = [
    path.resolve(process.cwd(), "reports", "results.json"),
    path.resolve(repoRoot, "reports", "results.json"),
    path.resolve(process.cwd(), "../reports/results.json"),
  ];

  const metadataCandidates = [
    path.resolve(process.cwd(), "reports", "run-metadata.json"),
    path.resolve(repoRoot, "reports", "run-metadata.json"),
    path.resolve(process.cwd(), "../reports/run-metadata.json"),
  ];

  const reportPath = candidates.find((candidate) => fs.existsSync(candidate));
  const metadataPath = metadataCandidates.find((candidate) => fs.existsSync(candidate));

  if (reportPath && metadataPath) {
    try {
      const report = normalizeReport(JSON.parse(fs.readFileSync(reportPath, "utf8")));
      const metadata = normalizeMetadata(JSON.parse(fs.readFileSync(metadataPath, "utf8")));

      return { report, metadata };
    } catch {
      return getDefaultData();
    }
  }

  const remoteData = await fetchRemoteReportData();

  return remoteData ?? getDefaultData();
}