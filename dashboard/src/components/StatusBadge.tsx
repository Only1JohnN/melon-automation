type StatusBadgeProps = {
  status: string;
};

const styles: Record<
  string,
  string
> = {
  passed:
    "bg-green-500/20 text-green-400 border border-green-500/30",

  failed:
    "bg-red-500/20 text-red-400 border border-red-500/30",

  skipped:
    "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",

  timedOut:
    "bg-orange-500/20 text-orange-400 border border-orange-500/30",

  interrupted:
    "bg-purple-500/20 text-purple-400 border border-purple-500/30",

  cancelled:
    "bg-slate-500/20 text-slate-300 border border-slate-500/30",

  flaky:
    "bg-blue-500/20 text-blue-400 border border-blue-500/30",

  running:
    "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30",

  queued:
    "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30",

  unknown:
    "bg-slate-700 text-slate-300 border border-slate-600",
};

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const normalized = status
    ?.trim()
    ?.toLowerCase()
    .replace(/\s+/g, "");
  
  const aliases: Record<string, string> = {
    timeout: "timedOut",
    timedout: "timedOut",
    canceled: "cancelled",
  };
  
  const key =
    aliases[normalized] ??
    normalized;

  const className =
    styles[key] ??
    styles.unknown;

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${className}`}
    >
      {status}
    </span>
  );
}