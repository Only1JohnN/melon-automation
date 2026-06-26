import Topbar from "@/components/Topbar";
import GroupedTestsTable from "@/components/GroupedTestsTable";

import {
  getExecutionTestsByApplication,
} from "@/lib/execution-parser";

export const dynamic =
  "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{
    id: string;
    app: string;
  }>;
}) {
  const {
    id,
    app,
  } = await params;

  const groups =
    await getExecutionTestsByApplication(
      id,
      app
    );

  return (
    <>
      <Topbar
        title={`${app} Tests`}
      />

      <GroupedTestsTable
        groups={groups}
        executionId={id}
      />
    </>
  );
}