import fs from "fs";
import path from "path";

export async function getReportData() {
  const report = await fetch(
    "https://raw.githubusercontent.com/Only1JohnN/melon-automation/reports/reports/results.json",
    {
      cache: "no-store",
    }
  ).then((r) => r.json());

  const metadata = await fetch(
    "https://raw.githubusercontent.com/Only1JohnN/melon-automation/reports/reports/run-metadata.json",
    {
      cache: "no-store",
    }
  ).then((r) => r.json());

  return {
    report,
    metadata,
  };
}