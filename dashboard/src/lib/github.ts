const owner =
  process.env.GITHUB_OWNER!;

const repo =
  process.env.GITHUB_REPO!;

const token =
  process.env.GITHUB_TOKEN!;

export async function getLatestRun() {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/actions/runs`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  const data =
    await response.json();

  return data.workflow_runs?.[0];
}

export async function getArtifacts(
  runId: number
) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/actions/runs/${runId}/artifacts`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return response.json();
}