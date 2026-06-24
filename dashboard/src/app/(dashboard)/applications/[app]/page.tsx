import Topbar from "@/components/Topbar";
import { getTestsByApplication } from "@/lib/report-parser";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ApplicationPage({
  params,
}: {
  params: Promise<{ app: string }>;
}) {
  const { app } = await params;

  const tests =
    await getTestsByApplication(app);

  return (
    <>
      <Topbar
        title={`${app} Tests`}
      />

      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-[#111827]">
        <table className="w-full">
          <thead className="bg-slate-900">
            <tr>
              <th className="p-4 text-left">
                Test
              </th>

              <th className="p-4 text-left">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {tests.map((test) => (
              <tr
                key={test.id}
                className="border-t border-slate-800 hover:bg-slate-900"
              >
                <td className="p-4">
                  <Link
                    href={
                      test.status ===
                      "passed"
                        ? `/tests/${test.id}`
                        : `/failures/${test.id}`
                    }
                    className="block hover:text-[#D6FF32]"
                  >
                    {test.title}
                  </Link>
                </td>

                <td className="p-4">
                  <span
                    className={
                      test.status ===
                      "passed"
                        ? "rounded-full bg-green-500/20 px-3 py-1 text-green-400"
                        : "rounded-full bg-red-500/20 px-3 py-1 text-red-400"
                    }
                  >
                    {test.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}