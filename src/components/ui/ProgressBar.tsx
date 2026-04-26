type ProgressBarProps = {
  value: number;
  max: number;
  label?: string;
};

export function ProgressBar({ value, max, label }: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div>
      {label ? (
        <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
          <span>{label}</span>
          <span>
            {value}/{max}
          </span>
        </div>
      ) : null}
      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-400 via-violet-400 to-amber-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
