import Topbar from "@/components/Topbar";
import { getApplications } from "@/lib/report-parser";
import Link from "next/link";

export default async function ApplicationsPage() {
  const applications =
    await getApplications();

  return (
    <>
      <Topbar
        title="Applications"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {applications.map(
          (app) => (
            <Link
              key={app.name}
              href={`/applications/${app.name}`}
              className="rounded-3xl border border-slate-800 bg-[#111827] p-6 transition-all hover:border-[#D6FF32] hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold capitalize">
                {app.name}
              </h3>

              <div className="mt-6 space-y-2">
                <p>
                  Total:{" "}
                  {app.total}
                </p>

                <p>
                  Passed:{" "}
                  {app.passed}
                </p>

                <p>
                  Failed:{" "}
                  {app.failed}
                </p>

                <p>
                  Pass Rate:{" "}
                  {app.passRate}%
                </p>
              </div>
            </Link>
          )
        )}
      </div>
    </>
  );
}