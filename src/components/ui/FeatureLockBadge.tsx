import type { FeatureStatus } from "@/types/game";

type FeatureLockBadgeProps = {
  label: string;
  status?: FeatureStatus;
};

const statusCopy: Record<FeatureStatus, string> = {
  enabled: "Enabled",
  disabled: "Disabled",
  "schema-only": "Schema only",
  "internal-test": "Internal test",
};

const statusClasses: Record<FeatureStatus, string> = {
  enabled: "border-emerald-300/40 bg-emerald-500/10 text-emerald-100",
  disabled: "border-rose-300/40 bg-rose-500/10 text-rose-100",
  "schema-only": "border-amber-300/40 bg-amber-500/10 text-amber-100",
  "internal-test": "border-sky-300/40 bg-sky-500/10 text-sky-100",
};

export function FeatureLockBadge({
  label,
  status = "disabled",
}: FeatureLockBadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-between gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${statusClasses[status]}`}
    >
      <span>{label}</span>
      <span className="opacity-80">{statusCopy[status]}</span>
    </span>
  );
}
