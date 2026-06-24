interface FailureCardProps {
  title: string;
  status: string;
  duration: number;
  error: string;
}

export default function FailureCard({
  title,
  status,
  duration,
  error,
}: FailureCardProps) {
  return (
    <div className="bg-[#111827] border border-red-500/20 rounded-3xl p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">
          {title}
        </h3>

        <span className="text-red-400">
          {status}
        </span>
      </div>

      <p className="text-slate-400 mt-2">
        {(duration / 1000).toFixed(2)}s
      </p>

      <p className="mt-4 text-sm text-slate-300 line-clamp-4">
        {error}
      </p>
    </div>
  );
}