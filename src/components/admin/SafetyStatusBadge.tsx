type SafetyStatusBadgeProps = {
  label: string;
  status: "safe" | "warning" | "blocked" | "mock" | "NO-GO";
};

const statusClasses: Record<SafetyStatusBadgeProps["status"], string> = {
  safe: "border-emerald-300/40 bg-emerald-400/10 text-emerald-100",
  warning: "border-amber-300/40 bg-amber-400/10 text-amber-100",
  blocked: "border-rose-300/40 bg-rose-400/10 text-rose-100",
  mock: "border-sky-300/40 bg-sky-400/10 text-sky-100",
  "NO-GO": "border-rose-300/50 bg-rose-500/15 text-rose-100",
};

export function SafetyStatusBadge({ label, status }: SafetyStatusBadgeProps) {
  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClasses[status]}`}>
      {label}: {status}
    </span>
  );
}
