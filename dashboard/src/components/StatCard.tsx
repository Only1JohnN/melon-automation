interface Props {
  title: string;
  value: string;
}

export default function StatCard({
  title,
  value,
}: Props) {
  return (
    <div className="bg-[#111827] rounded-3xl p-6 border border-slate-800 min-h-[140px]">
      <p className="text-slate-400 text-sm">
        {title}
      </p>

      <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold mt-4 break-words">
        {value}
      </h2>
    </div>
  );
}