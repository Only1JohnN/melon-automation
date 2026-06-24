import Topbar from "@/components/Topbar";
import { getFailures } from "@/lib/report-parser";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function FailuresPage() {
  const failures = await getFailures();

  return (
    <>
      <Topbar title="Failures" />

      <div className="mt-8 overflow-x-auto rounded-3xl border border-slate-800 bg-[#111827]">
        <table className="w-full text-left">
          <thead className="border-b border-slate-800 bg-slate-900">
            <tr>
              <th className="px-6 py-4">Test Name</th>
              <th className="px-6 py-4">Application</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Duration</th>
              <th className="px-6 py-4">Error</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {failures.map((failure, index) => (
              <tr
                key={index}
                className="border-b border-slate-800 hover:bg-slate-900/50 transition-colors"
              >
                <td className="px-6 py-4 font-medium">
                  {failure.title}
                </td>

                <td className="px-6 py-4">
                  {failure.tags?.[0] ?? "Unknown"}
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-red-500/20 px-3 py-1 text-sm text-red-400">
                    {failure.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  {(failure.duration / 1000).toFixed(2)}s
                </td>

                <td className="max-w-md truncate px-6 py-4 text-slate-400">
                  {failure.error}
                </td>

                <td className="px-6 py-4">
                  <Link
                    href={`/failures/${failure.id}`}
                    className="rounded-xl bg-[#D6FF32] px-4 py-2 font-medium text-black hover:opacity-90"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}