import Link from "next/link";
import StatusBadge from "./StatusBadge";


type Group = {
  feature: string;
  tests: any[];
};

type Props = {
  groups: Group[];
  executionId?: string;
};

export default function GroupedTestsTable({
  groups,
  executionId,
}: Props) {
  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <div
          key={group.feature}
          className="overflow-hidden rounded-3xl border border-slate-800 bg-[#111827]"
        >
          <div className="border-b border-slate-800 px-6 py-5">
            <h2 className="text-xl font-semibold">
              {group.feature}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {group.tests.length} Test
              {group.tests.length !== 1 &&
                "s"}
            </p>
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

                <th className="p-4 text-left">
                  Action
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
                      {test.title}
                    </td>

                    <td className="p-4">
                      <StatusBadge
                        status={
                          test.status
                        }
                      />
                    </td>

                    <td className="p-4">
                      {(
                        test.duration /
                        1000
                      ).toFixed(2)}
                      s
                    </td>

                    <td className="p-4">
                      <Link
                        href={
                            executionId
                                ? test.status ===
                                "passed"
                                ? `/executions/${executionId}/tests/${test.id}`
                                : `/executions/${executionId}/failures/${test.id}`
                                : test.status ===
                                "passed"
                                ? `/tests/${test.id}`
                                : `/failures/${test.id}`
                            }
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
      ))}
    </div>
  );
}