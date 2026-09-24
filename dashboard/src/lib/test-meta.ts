export type Annotation = {
  type: string;
  description?: string;
};

export type Screen = "Desktop" | "Tablet" | "Phone";

/**
 * The screen size a Playwright project runs at. The merchant / storefront / e2e projects are the desktop ones and
 * their "-tablet" / "-mobile" twins run the same responsive specs at the other sizes. api, guest and setup
 * projects have no screen.
 */
export function screenOf(project?: string | null): Screen | null {
  if (!project) return null;
  if (project.endsWith("-tablet")) return "Tablet";
  if (project.endsWith("-mobile")) return "Phone";
  if (/^(merchant|storefront|e2e)$/.test(project)) return "Desktop";
  return null;
}

export type Reason = {
  /** pending: written down for a bug or unfinished feature. not-applicable: skipped because it doesn't apply here. */
  kind: "pending" | "not-applicable";
  text: string;
};

const clean = (text: string) => text.replace(/^TODO\((dev|qa)\):\s*/i, "").trim();

/** Why a test was skipped, from the annotations Playwright recorded for it. */
export function reasonFrom(annotations?: Annotation[] | null): Reason | null {
  const list = annotations ?? [];

  const pending = list.find((a) => (a.type === "pending" || a.type === "fixme") && a.description);
  if (pending) return { kind: "pending", text: clean(pending.description!) };

  const skipped = list.find((a) => a.type === "skip" && a.description);
  if (skipped) return { kind: "not-applicable", text: clean(skipped.description!) };

  if (list.some((a) => a.type === "fixme" || a.type === "skip")) {
    return { kind: "pending", text: "No reason was recorded for this skipped test." };
  }

  return null;
}

const REASON_TYPES = new Set(["pending", "fixme", "skip", "slow", "fail"]);

/** Everything else a test noted while running (known layout issues, rounding observed, ...). */
export function notesFrom(annotations?: Annotation[] | null): Annotation[] {
  return (annotations ?? []).filter((a) => !REASON_TYPES.has(a.type) && a.description);
}

const NOTE_LABELS: Record<string, string> = {
  "needs-decision": "Needs a decision",
  "known-layout-issue": "Known layout issue",
  rounding: "Rounding observed",
  "slow-response": "Slow response",
  healed: "Account healed",
};

export const noteLabel = (type: string) => NOTE_LABELS[type] ?? type.replace(/[-_]/g, " ");
