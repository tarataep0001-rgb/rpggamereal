type PageHeaderProps = {
  title: string;
  subtitle: string;
  status?: string;
};

export function PageHeader({ title, subtitle, status }: PageHeaderProps) {
  return (
    <header className="px-4 pb-4 pt-5">
      <div className="mx-auto max-w-md">
        {status ? (
          <span className="mb-3 inline-flex rounded-full border border-rose-300/30 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-100">
            {status}
          </span>
        ) : null}
        <h1 className="text-2xl font-black text-white">{title}</h1>
        <p className="mt-1 text-sm leading-6 text-slate-300">{subtitle}</p>
      </div>
    </header>
  );
}
