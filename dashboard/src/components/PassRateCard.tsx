interface ApplicationStats {
  name: string;
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  passRate: string | number;
}

interface Props {
  total: number;
  skipped: number;
  passRate: string | number;
  applications: ApplicationStats[];
}

export default function PassRateCard({
  total,
  skipped,
  passRate,
  applications,
}: Props) {
  const passRateNumber =
    typeof passRate === "string" ? parseFloat(passRate) : passRate;
  const executed = Math.max(0, total - skipped);

  // Aggregate overall passed/failed from applications
  const totalPassed = applications.reduce((sum, app) => sum + app.passed, 0);
  const totalFailed = applications.reduce((sum, app) => sum + app.failed, 0);
  const totalSkipped = applications.reduce((sum, app) => sum + app.skipped, 0);

  // Determine status label
  let statusLabel = "Needs Improvement";
  let statusColor = "text-rose-400";
  if (passRateNumber >= 90) {
    statusLabel = "Excellent 🚀";
    statusColor = "text-emerald-400";
  } else if (passRateNumber >= 70) {
    statusLabel = "Good 👍";
    statusColor = "text-amber-400";
  } else if (passRateNumber >= 50) {
    statusLabel = "Fair 😐";
    statusColor = "text-yellow-400";
  }

  // Find top performer (app with highest pass rate)
  let topPerformer = "—";
  let topPassRate = -1;
  for (const app of applications) {
    const rate = typeof app.passRate === "string" ? parseFloat(app.passRate) : app.passRate;
    if (rate > topPassRate) {
      topPassRate = rate;
      topPerformer = app.name;
    }
  }

  // Donut chart parameters
  const size = 80;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Compute stroke dasharrays for pass, fail, skip
  const totalTests = totalPassed + totalFailed + totalSkipped || 1;
  const passedPct = (totalPassed / totalTests) * 100;
  const failedPct = (totalFailed / totalTests) * 100;
  const skippedPct = (totalSkipped / totalTests) * 100;

  // Offsets for the SVG circles (start at 12 o'clock)
  const offsetPass = 0;
  const offsetFail = (passedPct / 100) * circumference;
  const offsetSkip = ((passedPct + failedPct) / 100) * circumference;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {/* --- Left Card: Overall Pass Rate --- */}
      <div className="rounded-3xl border border-slate-800 bg-[#111827] p-5 flex flex-col h-full">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-400">Pass Rate</p>
            <div className="mt-1 flex items-end gap-3">
              <p className="text-3xl font-semibold text-[#D6FF32]">
                {passRateNumber.toFixed(1)}%
              </p>
              <span className={`text-sm font-medium ${statusColor}`}>
                {statusLabel}
              </span>
            </div>
          </div>
          <span className="text-xs text-slate-500">
            {executed} / {total} executed
          </span>
        </div>

        {/* Donut chart + stats side by side */}
        <div className="mt-3 flex items-center gap-4">
          {/* Donut */}
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
            {/* Passed (green) */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#34d399"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={-offsetPass}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
            {/* Failed (rose) */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#f43f5e"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={-offsetFail}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
            {/* Skipped (amber) */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#f59e0b"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={-offsetSkip}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          </svg>

          {/* Stats numbers */}
          <div className="grid grid-cols-3 gap-2 text-sm flex-1">
            <div>
              <p className="text-emerald-400 font-medium">{totalPassed}</p>
              <p className="text-xs text-slate-400">Passed</p>
            </div>
            <div>
              <p className="text-rose-400 font-medium">{totalFailed}</p>
              <p className="text-xs text-slate-400">Failed</p>
            </div>
            <div>
              <p className="text-amber-400 font-medium">{totalSkipped}</p>
              <p className="text-xs text-slate-400">Skipped</p>
            </div>
          </div>
        </div>

        {/* Top performer */}
        <div className="mt-3 text-xs text-slate-400 flex items-center gap-2">
          <span>🏆 Best: <span className="text-slate-300 font-medium capitalize">{topPerformer}</span></span>
          {topPerformer !== "—" && (
            <span className="text-[#D6FF32] text-xs">
              {topPassRate.toFixed(1)}%
            </span>
          )}
        </div>

        {/* Progress bar (thin) */}
        <div className="mt-2">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-400 transition-all duration-500"
              style={{
                width: `${Math.min(100, Math.max(0, passRateNumber))}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* --- Right Card: Application Breakdowns --- */}
      <div className="rounded-3xl border border-slate-800 bg-[#111827] p-5 flex flex-col h-full">
        <p className="text-sm text-slate-400">Applications</p>

        <div className="mt-3 space-y-3 flex-1">
          {applications.map((app) => {
            const totalTests = app.total;
            const passedPct = totalTests > 0 ? (app.passed / totalTests) * 100 : 0;
            const failedPct = totalTests > 0 ? (app.failed / totalTests) * 100 : 0;
            const skippedPct = totalTests > 0 ? (app.skipped / totalTests) * 100 : 0;

            return (
              <div key={app.name} className="space-y-1">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span className="font-medium capitalize">{app.name}</span>
                  <span className="text-slate-400">{app.passRate}% pass</span>
                </div>

                <div className="relative h-2 w-full overflow-hidden rounded-full border border-slate-800 bg-slate-900">
                  <div
                    className="absolute left-0 top-0 h-full bg-emerald-400"
                    style={{ width: `${passedPct}%` }}
                    title={`${app.name} Passed ${passedPct.toFixed(1)}% (${app.passed})`}
                  />
                  <div
                    className="absolute top-0 h-full bg-rose-400"
                    style={{
                      left: `${passedPct}%`,
                      width: `${failedPct}%`,
                    }}
                    title={`${app.name} Failed ${failedPct.toFixed(1)}% (${app.failed})`}
                  />
                  <div
                    className="absolute top-0 h-full bg-amber-400"
                    style={{
                      left: `${passedPct + failedPct}%`,
                      width: `${skippedPct}%`,
                    }}
                    title={`${app.name} Skipped ${skippedPct.toFixed(1)}% (${app.skipped})`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend - compact */}
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" />
            Passed
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-400" />
            Failed
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-400" />
            Skipped
          </div>
        </div>
      </div>
    </div>
  );
}