import Topbar from "@/components/Topbar";
import StatCard from "@/components/StatCard";
import RecentExecutions from "@/components/RecentExecutions";

import { getOverviewStats } from "@/lib/report-parser";
import { getExecutions } from "@/lib/executions";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const [
    stats,
    executions,
  ] = await Promise.all([
    getOverviewStats(),
    getExecutions(),
  ]);

  return (
    <>
      <Topbar
        title="Overview"
        environment={
          stats.environment
        }
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Tests"
          value={stats.total.toString()}
        />

        <StatCard
          title="Passed"
          value={stats.passed.toString()}
        />

        <StatCard
          title="Failed"
          value={stats.failed.toString()}
        />

        <StatCard
          title="Pass Rate"
          value={`${stats.passRate}%`}
        />
      </div>

      <RecentExecutions
        executions={executions.slice(
          0,
          10
        )}
      />
    </>
  );
}