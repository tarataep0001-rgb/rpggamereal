type TutorialOverrideBadgeProps = {
  note?: string;
};

export function TutorialOverrideBadge({ note }: TutorialOverrideBadgeProps) {
  if (!note) {
    return null;
  }

  return (
    <div className="rounded-xl border border-amber-300/30 bg-amber-400/10 px-3 py-2 text-xs leading-5 text-amber-100">
      <span className="font-semibold">Tutorial Override:</span> {note}
    </div>
  );
}
