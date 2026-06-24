import { NextResponse } from "next/server";
import {
  getLatestRun,
} from "@/lib/github";

export async function GET() {
  const run =
    await getLatestRun();

  return NextResponse.json(
    run
  );
}