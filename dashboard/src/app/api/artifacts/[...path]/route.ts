import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      path: string[];
    }>;
  }
) {
  const { path: parts } =
    await params;

  // Execution history
  if (
    parts.length >= 4 &&
    /^\d{4}$/.test(parts[0])
  ) {
    const [
      year,
      month,
      executionId,
      ...artifact
    ] = parts;

    const executionFile =
      path.join(
        process.cwd(),
        "../reports/executions",
        year,
        month,
        executionId,
        "reports-artifacts",
        ...artifact
      );

    if (
      fs.existsSync(
        executionFile
      )
    ) {
      return new NextResponse(
        fs.readFileSync(
          executionFile
        )
      );
    }
  }

  // Local Playwright
  const localFile =
    path.join(
      process.cwd(),
      "test-results",
      ...parts
    );

  if (
    fs.existsSync(
      localFile
    )
  ) {
    return new NextResponse(
      fs.readFileSync(
        localFile
      )
    );
  }

  return new NextResponse(
    "Not Found",
    {
      status: 404,
    }
  );
}