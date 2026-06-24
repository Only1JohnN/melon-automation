export async function getReportData() {
  const report = await fetch(
    "https://raw.githubusercontent.com/Only1JohnN/melon-automation/reports/reports/results.json",
    {
      cache: "no-store",
    }
  ).then((res) => res.json());

  const metadata = await fetch(
    "https://raw.githubusercontent.com/Only1JohnN/melon-automation/reports/reports/run-metadata.json",
    {
      cache: "no-store",
    }
  ).then((res) => res.json());

  return {
    report,
    metadata,
  };
}