import { noteLabel, notesFrom, reasonFrom, type Annotation } from "@/lib/test-meta";

type Props = {
  annotations?: Annotation[] | null;
  status?: string;
};

/** Why a test is skipped, and anything else it noted while running (known issues, figures worth a second look). */
export default function TestReasons({ annotations, status }: Props) {
  const reason = status === "skipped" ? reasonFrom(annotations) : null;
  const notes = notesFrom(annotations);

  if (!reason && notes.length === 0) return null;

  return (
    <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6">
      {reason && (
        <div>
          <h3 className="mb-1 text-lg font-semibold">
            {reason.kind === "pending" ? "Why this test is pending" : "Why this test was skipped"}
          </h3>
          <p className="mb-3 text-sm text-slate-400">
            {reason.kind === "pending"
              ? "Written down but switched off until the product behaves as described."
              : "It does not apply at this screen size or in this state."}
          </p>
          <p className="text-slate-200">{reason.text}</p>
        </div>
      )}

      {notes.length > 0 && (
        <div className={reason ? "mt-6" : ""}>
          <h3 className="mb-3 text-lg font-semibold">Notes from this run</h3>
          <ul className="space-y-2">
            {notes.map((note, index) => (
              <li key={index} className="text-sm text-slate-300">
                <span className="mr-2 rounded-md border border-slate-700 bg-slate-800 px-2 py-0.5 text-xs font-medium text-yellow-300">
                  {noteLabel(note.type)}
                </span>
                {note.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
