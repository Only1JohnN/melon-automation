import Topbar from "@/components/Topbar";
import { getApplications } from "@/lib/report-parser";
import Link from "next/link";

export default async function ApplicationsPage() {
  const applications = await getApplications();

  return (
    <>
      <Topbar title="Applications" />

      <div className="mx-auto max-w-5xl grid grid-cols-1 gap-6 md:grid-cols-2">
        {applications.map((app) => (
          <Link
            key={app.name}
            href={`/applications/${app.name}`}
            className="group relative rounded-3xl border border-slate-800 bg-[#111827] p-6 transition-all duration-300 hover:border-[#D6FF32] hover:shadow-[0_0_30px_rgba(214,255,50,0.1)] hover:-translate-y-1"
          >
            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#D6FF32]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative z-10">
              {/* App name with icon */}
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-semibold capitalize text-white">
                  {app.name}
                </h3>
                <span className="text-2xl opacity-30 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </div>

              {/* Stats grid */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-400">Total</p>
                  <p className="text-2xl font-bold">{app.total}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Passed</p>
                  <p className="text-2xl font-bold text-green-400">
                    {app.passed}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Failed</p>
                  <p className="text-2xl font-bold text-red-400">
                    {app.failed}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Pass Rate</p>
                  <p className="text-2xl font-bold text-[#D6FF32]">
                    {app.passRate}%
                  </p>
                </div>
              </div>

              {/* Pass rate progress bar */}
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-700">
                <div
                  className="h-full rounded-full bg-[#D6FF32] transition-all duration-500"
                  style={{ width: `${app.passRate}%` }}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}