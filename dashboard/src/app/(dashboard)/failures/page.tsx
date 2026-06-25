import Link from "next/link";
import Topbar from "@/components/Topbar";
import { getGroupedFailures } from "@/lib/report-parser";

export const dynamic = "force-dynamic";

export default async function FailuresPage() {
  const groups =
    await getGroupedFailures();

  return (
    <>
      <Topbar title="Failures" />

      <div className="space-y-8">
        {groups.map((group) => (
          <div
            key={group.feature}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  {group.feature}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {group.failures.length} Failed Test
                  {group.failures.length !== 1 &&
                    "s"}
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-800 bg-[#111827]">
              <table className="w-full">
                <thead className="bg-slate-900">
                  <tr>
                    <th className="p-4 text-left">
                      Test
                    </th>

                    <th className="p-4 text-left">
                      Status
                    </th>

                    <th className="p-4 text-left">
                      Duration
                    </th>

                    <th className="p-4 text-left">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {group.failures.map(
                    (failure: any) => (
                      <tr
                        key={failure.id}
                        className="border-t border-slate-800 hover:bg-slate-900"
                      >
                        <td className="p-4">
                          {failure.title}
                        </td>

                        <td className="p-4">
                          <span className="rounded-full bg-red-500/20 px-2 py-1 text-xs text-red-400">
                            {failure.status}
                          </span>
                        </td>

                        <td className="p-4">
                          {(
                            failure.duration /
                            1000
                          ).toFixed(2)}
                          s
                        </td>

                        <td className="p-4">
                          <Link
                            href={`/failures/${failure.id}`}
                            className="font-medium text-[#D6FF32] hover:underline"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}