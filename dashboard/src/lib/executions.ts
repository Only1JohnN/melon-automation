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
  const executions: Execution[] =
    [];

  try {
    const index = await fetch(
      `${REPORTS_URL}/executions/index.json`,
      {
        cache: "no-store",
      }
    ).then((r) => r.json());

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