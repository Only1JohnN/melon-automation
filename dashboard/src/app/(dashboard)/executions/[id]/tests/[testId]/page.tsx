import Topbar from "@/components/Topbar";
import StatusBadge from "@/components/StatusBadge";
import StepsTimeline from "@/components/StepsTimeline";
import ApiRequestRow from "@/components/ApiRequestRow";
import { getExecutionTestById } from "@/lib/execution-parser";
import { formatDuration } from "@/lib/format";
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

  const apiLogs = test.apiLogs ?? [];

  return (
    <>
      <Topbar
        title={test.title}
      />

      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6">
          <div className="flex flex-wrap items-center gap-4">
            <StatusBadge status={test.status} />

            <span>{formatDuration(test.duration)}</span>

            {test.project && (
              <span className="rounded-md border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-300">
                {test.project}
              </span>
            )}
          </div>

          {test.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {test.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="rounded-md border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300"
                >
                  @{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6">
          <h3 className="mb-1 text-lg font-semibold">
            Steps
          </h3>

          <p className="mb-4 text-sm text-slate-400">
            What the test did, in order.
          </p>

          <StepsTimeline steps={test.steps} />
        </div>

        <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6">
          <h3 className="mb-4 text-lg font-semibold">
            API Activity
          </h3>

          {apiLogs.length === 0 ? (
            <p className="text-slate-400">
              No API logs found.
            </p>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-slate-800">
              {apiLogs.map((log: any, index: number) => (
                <ApiRequestRow key={index} log={log} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
