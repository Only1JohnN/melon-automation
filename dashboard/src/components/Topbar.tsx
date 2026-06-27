// components/Topbar.tsx
interface TopbarProps {
  title?: string;
  environment?: string;
}

export default function Topbar({ title = "Overview", environment }: TopbarProps) {
  // Optional: colour the dot based on environment
  const getDotColor = (env?: string) => {
    if (!env) return "bg-slate-500";
    const lower = env.toLowerCase();
    if (lower.includes("prod") || lower.includes("production")) return "bg-green-500";
    if (lower.includes("staging") || lower.includes("stage")) return "bg-yellow-500";
    if (lower.includes("dev") || lower.includes("development")) return "bg-blue-500";
    return "bg-slate-500";
  };

  return (
    <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="text-sm text-slate-400">Melon Automation Platform</p>
        <h1 className="mt-1 text-5xl font-bold">{title}</h1>
      </div>

      {environment && (
        <div className="flex items-center gap-3 rounded-full border border-slate-700 bg-slate-900/50 px-4 py-2 backdrop-blur-sm">
          <span className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${getDotColor(environment)}`} />
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Environment
            </span>
          </span>
          <span className="text-sm font-semibold text-white">{environment}</span>
        </div>
      )}
    </div>
  );
}