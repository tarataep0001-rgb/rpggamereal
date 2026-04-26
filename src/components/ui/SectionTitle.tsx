type SectionTitleProps = {
  title: string;
  eyebrow?: string;
};

export function SectionTitle({ title, eyebrow }: SectionTitleProps) {
  return (
    <div className="mb-3">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200/80">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-lg font-bold text-white">{title}</h2>
    </div>
  );
}
