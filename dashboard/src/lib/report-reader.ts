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

  const report = JSON.parse(
    fs.readFileSync(reportPath, "utf8")
  );

  const metadata = JSON.parse(
    fs.readFileSync(metadataPath, "utf8")
  );

  return {
    report,
    metadata,
  };
}