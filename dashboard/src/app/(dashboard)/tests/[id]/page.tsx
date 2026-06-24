import Topbar from "@/components/Topbar";
import {
  getTestById,
  getFailureById,
} from "@/lib/report-parser";
import { notFound } from "next/navigation";

export default async function TestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } =
    await params;

  const test =
    await getTestById(id);

  if (!test) {
    notFound();
  }

  const failure =
    getFailureById(id);

  return (
    <>
      <Topbar
        title={test.title}
      />

      <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6">
        <p>
          Status:
          {" "}
          {test.status}
        </p>

        <p>
          Application:
          {" "}
          {test.tags.join(
            ", "
          )}
        </p>
      </div>
    </>
  );
}