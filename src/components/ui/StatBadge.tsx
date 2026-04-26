type StatBadgeProps = {
  label: string;
  value: string | number;
  tone?: "blue" | "gold" | "purple" | "red" | "green";
};

const toneClasses: Record<NonNullable<StatBadgeProps["tone"]>, string> = {
  blue: "border-sky-300/30 bg-sky-400/10 text-sky-100",
  gold: "border-amber-300/40 bg-amber-400/10 text-amber-100",
  purple: "border-violet-300/30 bg-violet-400/10 text-violet-100",
  red: "border-rose-300/30 bg-rose-400/10 text-rose-100",
  green: "border-emerald-300/30 bg-emerald-400/10 text-emerald-100",
};

export function StatBadge({ label, value, tone = "blue" }: StatBadgeProps) {
  return (
    <div className={`rounded-xl border px-3 py-2 ${toneClasses[tone]}`}>
      <p className="text-[11px] uppercase tracking-wide opacity-75">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}
