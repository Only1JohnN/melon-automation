import fs from "fs";
import path from "path";

export function getReportData() {
  const reportPath = path.join(
    process.cwd(),
    "../reports/results.json"
  );

  const metadataPath = path.join(
    process.cwd(),
    "../reports/run-metadata.json"
  );

  if (
    !fs.existsSync(reportPath) ||
    !fs.existsSync(metadataPath)
  ) {
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
            startTime:
                new Date().toISOString(),
            },
        },

        metadata: {
            environment: "Unknown",
        },
        };
  }

  return {
    report: JSON.parse(
      fs.readFileSync(reportPath, "utf8")
    ),
    metadata: JSON.parse(
      fs.readFileSync(metadataPath, "utf8")
    ),
  };
}