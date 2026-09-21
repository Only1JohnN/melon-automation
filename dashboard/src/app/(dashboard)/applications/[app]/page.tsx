import Topbar from "@/components/Topbar";
import { getTestsByApplication } from "@/lib/report-parser";
import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";
import FeatureAccordion from "@/components/FeatureAccordion";

export const dynamic = "force-dynamic";

export default async function ApplicationPage({
  params,
}: {
  params: Promise<{ app: string }>;
}) {
  const { app } = await params;

  const groups = await getTestsByApplication(app);

  return (
    <>
      <Topbar title={`${app} Tests`} />

      <div className="space-y-8">
        {groups.map((group) => (
          <FeatureAccordion
            key={group.feature}
            title={group.feature}
            subtitle={`${group.total} Tests • ${group.passed} Passed • ${group.failed} Failed`}
          >
            {/* The content below replaces the duplicate info; 
                you may keep or remove the header inside if you prefer */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900">
                  <tr>
                    <th className="p-4 text-left">Test</th>
                    <th className="p-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {group.tests.map((test: any) => (
                    <tr
                      key={test.id}
                      className="border-t border-slate-800 hover:bg-slate-900"
                    >
                      <td className="p-4">
                        <Link
                          href={
                            test.status === "passed"
                              ? `/tests/${test.id}`
                              : `/failures/${test.id}`
                          }
                          className="block hover:text-[#D6FF32]"
                        >
                          {test.title}
                        </Link>
                      </td>
                      <td className="p-4">
                        <StatusBadge status={test.status} />
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