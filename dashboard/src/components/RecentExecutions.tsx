import Link from "next/link";
import StatusBadge from "./StatusBadge";
import { Execution } from "@/lib/executions";

interface Props {
  executions: Execution[];
}

export default function RecentExecutions({
  executions,
}: Props) {
  return (
    <div className="mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-[#111827]">
      <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
        <h2 className="text-xl font-semibold">
          Recent Executions
        </h2>

        <Link
          href="/executions"
          className="text-sm font-medium text-[#D6FF32] hover:underline"
        >
          View all →
        </Link>
      </div>

      <table className="w-full">
        <thead className="bg-slate-900">
          <tr>
            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Date
            </th>

            <th className="p-4 text-left">
              Tests
            </th>

            <th className="p-4 text-left">
              Pass Rate
            </th>

            <th className="p-4 text-left">
              Trigger
            </th>
          </tr>
        </thead>

        <tbody>
          {executions.map(
            (execution) => (
              <tr
                key={execution.id}
                className="border-t border-slate-800 hover:bg-slate-900"
              >
                <td className="p-4">
                  <Link
                    href={`/executions/${execution.id}`}
                    className="block"
                  >
                    <StatusBadge
                      status={execution.status}
                    />
                  </Link>
                </td>

                <td className="p-4">
                  {new Date(
                    execution.executedAt
                  ).toLocaleString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </td>

                <td className="p-4">
                  {execution.total}
                </td>

                <td className="p-4">
                  {(
                    (execution.passed /
                      execution.total) *
                    100
                  ).toFixed(1)}
                  %
                </td>

                <td className="p-4 capitalize">
                  {execution.trigger}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}