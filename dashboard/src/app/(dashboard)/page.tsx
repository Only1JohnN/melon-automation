import Topbar from "@/components/Topbar";
import StatCard from "@/components/StatCard";
import PassRateCard from "@/components/PassRateCard";
import RecentExecutions from "@/components/RecentExecutions";

import { getApplications, getOverviewStats } from "@/lib/report-parser";
import { getExecutions } from "@/lib/executions";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const [stats, executions, applications] = await Promise.all([
    getOverviewStats(),
    getExecutions(),
    getApplications(),
  ]);

  return (
    <>
      <Topbar title="Overview" environment={stats.environment} />

      {/* --- Stats Grid with modern cards --- */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Tests"
          value={stats.total.toString()}
          icon="📊"
          color="blue"
        />
        <StatCard
          title="Passed"
          value={stats.passed.toString()}
          icon="✅"
          color="green"
        />
        <StatCard
          title="Failed"
          value={stats.failed.toString()}
          icon="❌"
          color="red"
        />
        <StatCard
          title="Skipped"
          value={stats.skipped.toString()}
          icon="⏭️"
          color="yellow"
        />
      </div>

      <div className="mt-6">
        <PassRateCard
          total={stats.total}
          skipped={stats.skipped}
          passRate={stats.passRate}
          applications={applications}
        />
      </div>

      {/* --- Recent Executions with header and link --- */}
      <div className="mt-8">
        <RecentExecutions executions={executions.slice(0, 5)} />
      </div>
    </>
  );
}
