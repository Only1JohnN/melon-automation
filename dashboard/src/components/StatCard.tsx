// components/StatCard.tsx
interface Props {
  title: string;
  value: string;
  icon?: string;
  color?: "blue" | "green" | "red" | "yellow";
  progress?: number; // 0–100
}

const colorMap = {
  blue: "border-blue-500 text-blue-400",
  green: "border-green-500 text-green-400",
  red: "border-red-500 text-red-400",
  yellow: "border-yellow-500 text-yellow-400",
};

export default function StatCard({
  title,
  value,
  icon,
  color = "blue",
  progress,
}: Props) {
  const colorClasses = colorMap[color];
  const borderClass = colorClasses.split(" ")[0];

  return (
    <div
      className={
        `relative bg-[#111827] rounded-3xl p-4 sm:p-6 border ${borderClass} min-h-[120px] sm:min-h-[140px] transition-all hover:shadow-lg overflow-hidden`
      }
    >
      {/* Icon moved into header to avoid duplication on small screens */}

      <div className="flex items-start justify-between gap-4">
        <p className="text-slate-400 text-sm">{title}</p>

        {icon && (
          <span className="text-2xl sm:text-3xl opacity-30">
            {icon}
          </span>
        )}
      </div>

      <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-3 break-words ${colorClasses}`}>
        {value}
      </h2>
      {progress !== undefined && (
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-700">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${Math.min(100, Math.max(0, progress))}%`,
              background: `linear-gradient(to right, #ef4444, #eab308, #22c55e)`,
            }}
          />
        </div>
      )}
    </div>
  );
}