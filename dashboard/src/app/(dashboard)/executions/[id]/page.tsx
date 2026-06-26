import Link from "next/link";

import { notFound } from "next/navigation";

import Topbar from "@/components/Topbar";

import StatusBadge from "@/components/StatusBadge";

import GroupedTestsTable from "@/components/GroupedTestsTable";

import {
  getExecutionOverview,
  getExecutionApplications,
  getGroupedExecutionTests,
  getGroupedExecutionFailures,
  getExecutionTests,
  getExecutionFailures,
} from "@/lib/execution-parser";

export const dynamic =
  "force-dynamic";

export default async function ExecutionPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } =
    await params;

  const [
    overview,
    applications,
    groupedTests,
    groupedFailures,
    ] = await Promise.all([
    getExecutionOverview(id),
    getExecutionApplications(
        id
    ),
    getGroupedExecutionTests(
        id
    ),
    getGroupedExecutionFailures(
        id
    ),
    ]);

  if (!overview) {
    notFound();
  }

  return (
    <>
      <Topbar
        title="Execution"
      />

      <div className="space-y-6">

        <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6">

            <div className="flex items-center justify-between">

                <div>

                <h2 className="text-2xl font-bold">
                    Execution Summary
                </h2>

                <p className="mt-2 text-slate-400">

                    {new Date(
                    overview.executedAt
                    ).toLocaleString()}

                </p>

                </div>

                <StatusBadge
                status={overview.status}
                />

            </div>

            <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">

                <div>

                <p className="text-slate-400">
                    Total
                </p>

                <p className="mt-1 text-3xl font-bold">
                    {overview.total}
                </p>

                </div>

                <div>

                <p className="text-slate-400">
                    Passed
                </p>

                <p className="mt-1 text-3xl font-bold text-green-400">
                    {overview.passed}
                </p>

                </div>

                <div>

                <p className="text-slate-400">
                    Failed
                </p>

                <p className="mt-1 text-3xl font-bold text-red-400">
                    {overview.failed}
                </p>

                </div>

                <div>

                <p className="text-slate-400">
                    Pass Rate
                </p>

                <p className="mt-1 text-3xl font-bold">
                    {overview.passRate}%
                </p>

                </div>

            </div>

            </div>

            <div className="rounded-3xl border border-slate-800 bg-[#111827] overflow-hidden">

  <div className="border-b border-slate-800 p-6">

    <h2 className="text-xl font-semibold">
      Applications
    </h2>

  </div>
  
  <div>
    <h2 className="mb-4 text-xl font-semibold">
        Tests
    </h2>

    <GroupedTestsTable
        groups={groupedTests}
    />
    </div>

    <div>
    <h2 className="mb-4 text-xl font-semibold">
        Failures
    </h2>

    <GroupedTestsTable
        groups={groupedFailures}
    />
    </div>

  <table className="w-full">

    <thead className="bg-slate-900">

      <tr>

        <th className="p-4 text-left">
          Application
        </th>

        <th className="p-4 text-left">
          Passed
        </th>

        <th className="p-4 text-left">
          Failed
        </th>

        <th className="p-4 text-left">
          Total
        </th>

      </tr>

    </thead>

    <tbody>

      {applications.map(
        (app) => (
          <tr
            key={app.name}
            className="border-t border-slate-800"
          >

            <td className="p-4 capitalize">
                <Link
                    href={`/executions/${id}/applications/${app.name}`}
                    className="hover:text-[#D6FF32]"
                >
                    {app.name}
                </Link>
            </td>

            <td className="p-4 text-green-400">
              {app.passed}
            </td>

            <td className="p-4 text-red-400">
              {app.failed}
            </td>

            <td className="p-4">
              {app.total}
            </td>

          </tr>
        )
      )}

    </tbody>

  </table>

</div>

      </div>
    </>
  );
}