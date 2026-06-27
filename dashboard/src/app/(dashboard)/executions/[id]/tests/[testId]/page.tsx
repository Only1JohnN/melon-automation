import Topbar from "@/components/Topbar";
import { getExecutionTestById } from "@/lib/execution-parser";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function TestPage({
  params,
}: {
  params: Promise<{
    id: string;
    testId: string;
  }>;
}) {
  const { id, testId, } =
    await params;

  const test =
    await getExecutionTestById(
        id,
        testId
    );

  if (!test) {
    notFound();
  }

  return (
    <>
      <Topbar
        title={test.title}
      />

      <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6">
        <p>
          Status: {test.status}
        </p>

        <p>
          Application:{" "}
          {test.tags.join(", ")}
        </p>
      </div>
    </>
  );
}