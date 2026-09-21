"use client";

import { useState } from "react";
import { formatDuration } from "@/lib/format";

export type Step = {
  title: string;
  duration: number;
  error: string | null;
  steps: Step[];
};

function hasFailure(step: Step): boolean {
  return Boolean(step.error) || step.steps.some(hasFailure);
}

function countSteps(steps: Step[]): number {
  return steps.reduce((total, step) => total + 1 + countSteps(step.steps), 0);
}

// A failing step also fails every step that contains it, so only the innermost one is "the" failure.
function isLeafFailure(step: Step): boolean {
  return Boolean(step.error) && !step.steps.some(hasFailure);
}

function countFailed(steps: Step[]): number {
  return steps.reduce(
    (total, step) => total + (isLeafFailure(step) ? 1 : 0) + countFailed(step.steps),
    0
  );
}

/** Titles from the first failing step down to the innermost one that actually failed. */
function failurePath(steps: Step[]): string[] {
  const failing = steps.find(hasFailure);

  if (!failing) {
    return [];
  }

  return [failing.title, ...failurePath(failing.steps)];
}

function StepRow({
  step,
  index,
  depth,
}: {
  step: Step;
  index: number;
  depth: number;
}) {
  const failed = hasFailure(step);
  const ownError = isLeafFailure(step) ? step.error : null;
  const expandable = step.steps.length > 0 || Boolean(ownError);
  // Passing branches stay closed so a long test reads at a glance; anything on the failure path opens.
  const [open, setOpen] = useState(failed);

  return (
    <li>
      <button
        type="button"
        disabled={!expandable}
        onClick={() => setOpen((value) => !value)}
        className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
          failed
            ? "bg-red-500/10 hover:bg-red-500/15"
            : "hover:bg-slate-800/50"
        } ${expandable ? "cursor-pointer" : "cursor-default"}`}
      >
        <span
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
            failed
              ? "bg-red-500/20 text-red-400"
              : "bg-green-500/20 text-green-400"
          }`}
          aria-label={failed ? "Failed step" : "Passed step"}
        >
          {failed ? "✕" : "✓"}
        </span>

        <span className="min-w-0 flex-1">
          <span className="block break-words text-sm font-medium text-slate-100">
            {depth === 0 && (
              <span className="mr-2 text-slate-500">{index + 1}.</span>
            )}
            {step.title}
          </span>
        </span>

        <span className="shrink-0 text-xs text-slate-400">
          {formatDuration(step.duration)}
        </span>

        {expandable && (
          <span
            className={`shrink-0 text-slate-500 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          >
            ▾
          </span>
        )}
      </button>

      {open && (
        <div>
          {ownError && (
            <pre className="mx-3 mb-2 mt-1 overflow-auto whitespace-pre-wrap rounded-xl border border-red-500/30 bg-black p-3 text-xs text-red-300">
              {ownError}
            </pre>
          )}

          {step.steps.length > 0 && (
            <ol className="ml-4 space-y-1 border-l border-slate-800 pl-2">
              {step.steps.map((child, childIndex) => (
                <StepRow
                  key={childIndex}
                  step={child}
                  index={childIndex}
                  depth={depth + 1}
                />
              ))}
            </ol>
          )}
        </div>
      )}
    </li>
  );
}

export default function StepsTimeline({ steps }: { steps: Step[] }) {
  const [resetKey, setResetKey] = useState(0);

  if (!steps || steps.length === 0) {
    return (
      <p className="text-slate-400">
        No steps were recorded for this test.
      </p>
    );
  }

  const total = countSteps(steps);
  const failed = countFailed(steps);
  const path = failurePath(steps);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-400">
        <span>
          {total} step{total !== 1 && "s"}
        </span>

        <span className={failed ? "text-red-400" : "text-green-400"}>
          {failed
            ? `${failed} failed`
            : "all passed"}
        </span>

        <button
          type="button"
          onClick={() => setResetKey((key) => key + 1)}
          className="ml-auto text-xs text-[#D6FF32] hover:underline"
        >
          Reset expanded steps
        </button>
      </div>

      {path.length > 0 && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm">
          <p className="font-semibold text-red-300">Failed at</p>
          <p className="mt-1 break-words text-slate-200">
            {path.join("  ›  ")}
          </p>
        </div>
      )}

      {/* Changing the key remounts the list, restoring the default open/closed state. */}
      <ol key={resetKey} className="space-y-1">
        {steps.map((step, index) => (
          <StepRow key={index} step={step} index={index} depth={0} />
        ))}
      </ol>
    </div>
  );
}
