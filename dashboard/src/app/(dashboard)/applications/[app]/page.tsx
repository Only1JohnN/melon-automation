import Topbar from "@/components/Topbar";
import { getTestsByApplication } from "@/lib/report-parser";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ApplicationPage({
  params,
}: {
  params: Promise<{ app: string }>;
}) {
  const { app } = await params;

  const groups =
    await getTestsByApplication(app);

  return (
    <>
      <Topbar
        title={`${app} Tests`}
      />

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
                  {group.total} Tests •{" "}
                  <span className="text-green-400">
                    {group.passed} Passed
                  </span>{" "}
                  •{" "}
                  <span className="text-red-400">
                    {group.failed} Failed
                  </span>
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
                            href={
                              test.status ===
                              "passed"
                                ? `/tests/${test.id}`
                                : `/failures/${test.id}`
                            }
                            className="block hover:text-[#D6FF32]"
                          >
                            {test.title}
                          </Link>
                        </td>

                        <td className="p-4">
                          <span
                            className={
                              test.status ===
                              "passed"
                                ? "rounded-full bg-green-500/20 px-3 py-1 text-green-400"
                                : "rounded-full bg-red-500/20 px-3 py-1 text-red-400"
                            }
                          >
                            {test.status}
                          </span>
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