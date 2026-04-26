import type { ReactNode } from "react";

type GameCardProps = {
  children: ReactNode;
  className?: string;
};

export function GameCard({ children, className = "" }: GameCardProps) {
  return (
    <section
      className={`rounded-2xl border border-white/10 bg-slate-950/78 p-4 shadow-xl shadow-black/25 backdrop-blur ${className}`}
    >
      {children}
    </section>
  );
}
