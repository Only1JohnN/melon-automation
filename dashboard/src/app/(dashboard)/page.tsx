import Topbar from "@/components/Topbar";
import StatCard from "@/components/StatCard";

import { getOverviewStats } from "@/lib/report-parser";

export default async function Dashboard() {
  const stats = await getOverviewStats();

  return (
    <>
      <Topbar
        title="Overview"
        environment={stats.environment}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
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

      <div className="grid grid-cols-4 gap-6 mt-6">
      <StatCard
        title="Browser"
        value={stats.browser}
      />

      <StatCard
        title="Duration"
        value={`${stats.duration}s`}
      />

      <StatCard
        title="Environment"
        value={stats.environment}
      />

      <StatCard
        title="Last Run"
        value={new Date(
          stats.startTime
        ).toLocaleTimeString("en-GB", {
          timeZone: "Africa/Lagos",
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      />
    </div>
    </>
  );
}