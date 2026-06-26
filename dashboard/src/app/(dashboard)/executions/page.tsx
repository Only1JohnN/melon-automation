import Topbar from "@/components/Topbar";
import { getExecutions } from "@/lib/executions";
import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";

export const dynamic = "force-dynamic";

export default async function ExecutionsPage() {
  const executions =
    await getExecutions();

  const grouped =
    executions.reduce(
      (acc: any, execution) => {
        const month = new Date(
          execution.executedAt
        ).toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        });

        if (!acc[month]) {
          acc[month] = [];
        }

        acc[month].push(execution);

        return acc;
      },
      {}
    );

  return (
    <>
      <Topbar title="Executions" />

      <div className="space-y-8">
        {Object.entries(grouped).map(
          ([month, runs]: any) => (
            <div key={month}>
              <h2 className="mb-4 text-2xl font-semibold">
                {month}
              </h2>

              <div className="overflow-hidden rounded-3xl border border-slate-800 bg-[#111827]">
                <table className="w-full">
                  <thead className="bg-slate-900">
                    <tr>
                      <th className="p-4 text-left">
                        Date
                      </th>

                      <th className="p-4 text-left">
                        Time
                      </th>

                      <th className="p-4 text-left">
                        Status
                      </th>

                      <th className="p-4 text-left">
                        Environment
                      </th>

                      <th className="p-4 text-left">
                        Tests
                      </th>

                      <th className="p-4 text-left">
                        Duration
                      </th>

                      <th className="p-4 text-left">
                        Trigger
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {runs.map(
                      (
                        execution: any
                      ) => (
                        <tr
                          key={
                            execution.id
                          }
                          className="cursor-pointer border-t border-slate-800 hover:bg-slate-900"
                        >
                          <td className="p-4">
                            <Link
                              href={`/executions/${execution.id}`}
                              className="block"
                            >
                              {new Date(
                                execution.executedAt
                              ).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month:
                                    "short",
                                  year:
                                    "numeric",
                                }
                              )}
                            </Link>
                          </td>

                          <td className="p-4">
                            {new Date(
                              execution.executedAt
                            ).toLocaleTimeString(
                              "en-GB",
                              {
                                hour:
                                  "2-digit",
                                minute:
                                  "2-digit",
                              }
                            )}
                          </td>

                          <td className="p-4">
                            <StatusBadge
                              status={execution.status}
                            />
                          </td>

                          <td className="p-4">
                            {
                              execution.environment
                            }
                          </td>

                          <td className="p-4">
                            {
                              execution.total
                            }
                          </td>

                          <td className="p-4">
                            {(
                              Number(execution.duration) / 1000
                            ).toFixed(2)}
                            s
                          </td>

                          <td className="p-4">
                            {
                              execution.trigger
                            }
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}