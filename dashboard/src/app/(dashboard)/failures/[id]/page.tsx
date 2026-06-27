import Topbar from "@/components/Topbar";
import { getFailureById } from "@/lib/report-parser";
import { notFound } from "next/navigation";
import ApiRequestRow from "@/components/ApiRequestRow";
import { formatBytes } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function FailureDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const failure = await getFailureById(id);

  if (!failure) {
    notFound();
  }

  // console.log("Screenshot:", failure.screenshotUrl);
  // console.log("Video:", failure.videoUrl);
  // console.log("Trace:", failure.traceUrl);

  const apiLogs = (failure as any).apiLogs ?? [];

  return (
  <>
    <Topbar title="Failure Details" />

    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6">
        <div>
          <h2 className="text-2xl font-bold">
            {failure.title}
          </h2>

          {failure.tags?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {failure.tags.map(
                (
                  tag: string,
                  index: number
                ) => (
                  <span
                    key={index}
                    className="
                    rounded-md
                    border
                    border-slate-700
                    bg-slate-800
                    px-2.5
                    py-1
                    text-xs
                    font-medium
                    text-slate-300
                  "
                  >
                    @{tag}
                  </span>
                )
              )}
            </div>
          )}
        </div>

        <div className="mt-4 flex gap-4">
          <span className="rounded-full bg-red-500/20 px-3 py-1 text-red-400">
            {failure.status}
          </span>

          <span>
            {(failure.duration / 1000).toFixed(2)}s
          </span>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6">
        <h3 className="mb-4 text-lg font-semibold">
          Error
        </h3>

        <pre className="overflow-auto whitespace-pre-wrap text-sm text-slate-300">
          {failure.error}
        </pre>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6">
        <h3 className="mb-4 text-lg font-semibold">
          Artifacts
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {failure.screenshot && (
            <a
              href={failure.screenshotUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-slate-700 p-4 hover:border-[#D6FF32]"
            >
              <p className="font-medium">
                📷 Screenshot
              </p>

              <p className="mt-1 text-xs text-slate-400">
                PNG • {formatBytes(failure.screenshot?.size)}
              </p>
            </a>
          )}

          {failure.video && (
            <a
              href={failure.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-slate-700 p-4 hover:border-[#D6FF32]"
            >
              <p className="font-medium">
                🎥 Video
              </p>

              <p className="mt-1 text-xs text-slate-400">
                MP4 • {formatBytes(failure.video?.size)}
              </p>
            </a>
          )}

          {failure.trace && (
            <a
              href={failure.traceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-slate-700 p-4 hover:border-[#D6FF32]"
            >
              <p className="font-medium">
                🔍 Trace
              </p>

              <p className="mt-1 text-xs text-slate-400">
                ZIP • {formatBytes(failure.trace?.size)}
              </p>
            </a>
          )}
        </div>
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
              {apiLogs.map(
                (log: any, index: number) => (
                  <ApiRequestRow
                    key={index}
                    log={log}
                  />
                )
              )}
            </div>
          )}
        </div>
    </div>
  </>
);
}
