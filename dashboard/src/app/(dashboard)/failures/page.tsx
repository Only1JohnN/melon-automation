import Link from "next/link";
import Topbar from "@/components/Topbar";
import { getGroupedFailures } from "@/lib/report-parser";
import StatusBadge from "@/components/StatusBadge";
import FeatureAccordion from "@/components/FeatureAccordion";

export const dynamic = "force-dynamic";

export default async function FailuresPage() {
  const groups = await getGroupedFailures();

  return (
    <>
      <Topbar title="Failures" />

      <div className="space-y-8">
        {groups.map((group) => (
          <FeatureAccordion
            key={group.feature}
            title={group.feature}
            subtitle={`${group.failures.length} Failed Test${group.failures.length !== 1 ? "s" : ""}`}
          >
            {/* Removed the duplicate header – FeatureAccordion already shows it via props */}

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900">
                  <tr>
                    <th className="p-4 text-left">Test</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Duration</th>
                    <th className="p-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {group.failures.map((failure: any) => (
                    <tr
                      key={failure.id}
                      className="border-t border-slate-800 hover:bg-slate-900"
                    >
                      <td className="p-4">{failure.title}</td>
                      <td className="p-4">
                        <StatusBadge status={failure.status} />
                      </td>
                      <td className="p-4">
                        {(failure.duration / 1000).toFixed(2)}s
                      </td>
                      <td className="p-4">
                        <Link
                          href={`/failures/${failure.id}`}
                          className="font-medium text-[#D6FF32] hover:underline"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FeatureAccordion>
        ))}
      </div>
    </>
  );
}