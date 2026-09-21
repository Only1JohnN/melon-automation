import fs from "fs";
import path from "path";

export interface Execution {
  id: string;
  environment: string;
  executedAt: string;
  status: string;
  total: number;
  passed: number;
  failed: number;
  duration: string;
  trigger: string;
}

const REPORTS_URL =
  "https://raw.githubusercontent.com/Only1JohnN/melon-automation/reports/reports";


export async function getExecutions() {
  const executions: Execution[] = [];

  const localCandidates = [
    path.resolve(process.cwd(), "reports/executions/index.json"),
    path.resolve(process.cwd(), "../reports/executions/index.json"),
    path.resolve(process.cwd(), "../../reports/executions/index.json"),
  ];

  try {
    let index: any = null;
    const localPath = localCandidates.find((candidate) => fs.existsSync(candidate));

    if (localPath) {
      index = JSON.parse(fs.readFileSync(localPath, "utf8"));
    } else {
      const response = await fetch(`${REPORTS_URL}/executions/index.json`, {
        cache: "no-store",
      });
      if (!response.ok) {
        return [];
      }
      index = await response.json();
    }

    for (const item of index) {
      executions.push(item);
    }
  } catch {
    return [];
  }

  return executions.sort(
    (a, b) =>
      new Date(
        b.executedAt
      ).getTime() -
      new Date(
        a.executedAt
      ).getTime()
  );
}