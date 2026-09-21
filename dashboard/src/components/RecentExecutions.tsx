import Link from "next/link";
import StatusBadge from "./StatusBadge";
import { Execution } from "@/lib/executions";

interface Props {
  executions: Execution[];
}

export default function RecentExecutions({ executions }: Props) {
  return (
    <div className="mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-[#111827]">
      <div className="flex flex-col gap-4 border-b border-slate-800 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">Recent Executions</h2>

        <Link
          href="/executions"
          className="text-sm font-medium text-[#D6FF32] hover:underline"
        >
          View all →
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[680px] w-full">
          <thead className="bg-slate-900">
            <tr>
              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-left">Date</th>

              <th className="p-4 text-left hidden sm:table-cell">Tests</th>

              <th className="p-4 text-left hidden md:table-cell">Pass Rate</th>

              <th className="p-4 text-left hidden lg:table-cell">Trigger</th>
            </tr>
          </thead>

          <tbody>
            {executions.map((execution) => (
              <tr
                key={execution.id}
                className="border-t border-slate-800 hover:bg-slate-900"
              >
                <td className="p-4">
                  <Link href={`/executions/${execution.id}`} className="block">
                    <StatusBadge status={execution.status} />
                  </Link>
                </td>

                <td className="p-4">
                  {new Date(execution.executedAt).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>

                <td className="p-4 hidden sm:table-cell">{execution.total}</td>

                <td className="p-4 hidden md:table-cell">
                  {execution.total > 0
                    ? ((execution.passed / execution.total) * 100).toFixed(1)
                    : "0.0"}
                  %
                </td>

                <td className="p-4 hidden lg:table-cell capitalize">{execution.trigger}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
