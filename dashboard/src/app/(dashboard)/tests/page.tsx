import Topbar from "@/components/Topbar";
import Link from "next/link";
import { getGroupedTests } from "@/lib/report-parser";

export const dynamic = "force-dynamic";

export default async function TestsPage() {
  const groups =
    await getGroupedTests();

  return (
    <>
      <Topbar title="Tests" />

      <div className="space-y-6">
        {groups.map((group) => (
          <div
            key={group.fileName}
            className="overflow-hidden rounded-3xl border border-slate-800 bg-[#111827]"
          >
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
              <div>
                <h2 className="text-xl font-semibold">
                  {group.feature}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {group.fileName}
                </p>
              </div>

              <div className="flex gap-6 text-sm">
                <span>
                  <span className="font-semibold">
                    {group.total}
                  </span>{" "}
                  Tests
                </span>

                <span className="text-green-400">
                  {group.passed} Passed
                </span>

                <span className="text-red-400">
                  {group.failed} Failed
                </span>
              </div>
            </div>

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
                </tr>
              </thead>

              <tbody>
                {group.tests.map(
                  (test: any) => (
                    <tr
                      key={test.id}
                      className="border-t border-slate-800 hover:bg-slate-900"
                    >
                      <td className="p-4">
                        <Link
                          href={`/tests/${test.id}`}
                          className="block"
                        >
                          {test.title}
                        </Link>
                      </td>

                      <td className="p-4">
                        <span
                          className={
                            test.status ===
                            "passed"
                              ? "text-green-400"
                              : "text-red-400"
                          }
                        >
                          {test.status}
                        </span>
                      </td>

                      <td className="p-4">
                        {(
                          test.duration /
                          1000
                        ).toFixed(2)}
                        s
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </>
  );
}