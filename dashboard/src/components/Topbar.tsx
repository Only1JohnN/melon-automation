interface TopbarProps {
  title?: string;
  environment?: string;
}

export default function Topbar({
  title = "Overview",
  environment,
}: TopbarProps) {
  return (
    <div className="mb-10 flex justify-between items-center">
      <div>
        <p className="text-slate-400">
          Melon Automation Platform
        </p>

        <h1 className="text-5xl font-bold mt-2">
          {title}
        </h1>
      </div>

      {environment && (
        <div className="bg-slate-900 border border-slate-800 px-4 py-3 rounded-xl">
          {environment}
        </div>
      )}
    </div>
  );
}