import type { ReactNode } from "react";
import type { NavTab } from "@/types/game";
import { BottomNav } from "./BottomNav";
import { TopStatusBar } from "./TopStatusBar";

type AppShellProps = {
  activeTab: NavTab;
  children: ReactNode;
  onNavigate: (tab: NavTab) => void;
};

export function AppShell({ activeTab, children, onNavigate }: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#4338ca55,transparent_34%),radial-gradient(circle_at_top_right,#b4530950,transparent_30%),linear-gradient(180deg,#020617,#111827_48%,#030712)]" />
      <TopStatusBar />
      <main className="mx-auto min-h-[calc(100vh-112px)] max-w-md pb-5">{children}</main>
      <BottomNav activeTab={activeTab} onNavigate={onNavigate} />
    </div>
  );
}
