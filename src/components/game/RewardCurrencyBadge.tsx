type RewardCurrencyBadgeProps = {
  label: string;
  value: string | number;
  tone?: "gold" | "blue" | "purple" | "red" | "green";
};

const toneClasses: Record<NonNullable<RewardCurrencyBadgeProps["tone"]>, string> = {
  gold: "border-amber-300/40 bg-amber-400/10 text-amber-100",
  blue: "border-sky-300/40 bg-sky-400/10 text-sky-100",
  purple: "border-violet-300/40 bg-violet-400/10 text-violet-100",
  red: "border-rose-300/40 bg-rose-400/10 text-rose-100",
  green: "border-emerald-300/40 bg-emerald-400/10 text-emerald-100",
};

export function RewardCurrencyBadge({
  label,
  value,
  tone = "gold",
}: RewardCurrencyBadgeProps) {
  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${toneClasses[tone]}`}>
      {label}: {value}
    </span>
  );
}
