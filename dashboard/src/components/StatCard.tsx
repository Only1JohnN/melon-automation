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

  return (
    <div
      className={`
        relative
        bg-[#111827]
        rounded-3xl
        p-6
        border
        border-slate-800
        min-h-[140px]
        transition-all
        hover:shadow-lg
        hover:border-${colorClasses.split(' ')[0]}
        overflow-hidden
      `}
    >
      {icon && (
        <span className="absolute right-4 top-4 text-3xl opacity-30">
          {icon}
        </span>
      )}

      <p className="text-slate-400 text-sm">{title}</p>
      <h2 className={`text-2xl md:text-3xl xl:text-4xl font-bold mt-4 break-words ${colorClasses}`}>
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