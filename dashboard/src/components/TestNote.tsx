import { reasonFrom, screenOf, type Annotation } from "@/lib/test-meta";

type Props = {
  project?: string | null;
  annotations?: Annotation[] | null;
  status?: string;
};

/** The screen size a test ran at, shown next to its title so the desktop / tablet / phone copies can be told apart. */
export function ScreenBadge({ project }: { project?: string | null }) {
  const screen = screenOf(project);

  if (!screen) return null;

  return (
    <span className="ml-2 inline-flex items-center rounded-md border border-slate-700 bg-slate-800 px-2 py-0.5 align-middle text-xs text-slate-300">
      {screen}
    </span>
  );
}

/** For a skipped test: why it was skipped. Renders nothing for tests that ran. */
export function ReasonNote({ annotations, status }: Props) {
  if (status !== "skipped") return null;

  const reason = reasonFrom(annotations);

  if (!reason) return null;

  return (
    <p className="mt-1 max-w-3xl text-sm text-slate-400">
      <span
        className={
          reason.kind === "pending" ? "font-medium text-yellow-400" : "font-medium text-slate-300"
        }
      >
        {reason.kind === "pending" ? "Pending: " : "Not applicable here: "}
      </span>
      {reason.text}
    </p>
  );
}
