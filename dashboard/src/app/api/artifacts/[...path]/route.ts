import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const CONTENT_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".zip": "application/zip",
  ".json": "application/json",
};

function serve(file: string) {
  return new NextResponse(fs.readFileSync(file), {
    headers: {
      "Content-Type":
        CONTENT_TYPES[path.extname(file).toLowerCase()] ??
        "application/octet-stream",
    },
  });
}

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
      return serve(executionFile);
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
    return serve(localFile);
  }

  return new NextResponse(
    "Not Found",
    {
      status: 404,
    }
  );
}