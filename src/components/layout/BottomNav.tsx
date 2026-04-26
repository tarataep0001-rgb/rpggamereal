import type { NavTab } from "@/types/game";

type NavItem = {
  id: NavTab;
  label: string;
  icon: string;
};

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: "⌂" },
  { id: "character", label: "Char", icon: "◇" },
  { id: "team", label: "Team", icon: "▦" },
  { id: "stage", label: "Stage", icon: "◆" },
  { id: "gacha", label: "Gacha", icon: "✦" },
  { id: "inventory", label: "Bag", icon: "▣" },
  { id: "guild", label: "Guild", icon: "♜" },
  { id: "admin", label: "Admin", icon: "⚑" },
];

type BottomNavProps = {
  activeTab: NavTab;
  onNavigate: (tab: NavTab) => void;
};

export function BottomNav({ activeTab, onNavigate }: BottomNavProps) {
  return (
    <nav className="sticky bottom-0 z-20 border-t border-white/10 bg-slate-950/95 px-2 py-2 backdrop-blur">
      <div className="mx-auto grid max-w-md grid-cols-8 gap-1">
        {navItems.map((item) => {
          const active = item.id === activeTab;

          return (
            <button
              className={`flex min-h-12 flex-col items-center justify-center rounded-xl text-[11px] font-semibold transition ${
                active
                  ? "bg-amber-300 text-slate-950"
                  : "text-slate-400 hover:bg-white/10 hover:text-white"
              }`}
              key={item.id}
              onClick={() => onNavigate(item.id)}
              type="button"
            >
              <span className="text-base leading-none">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
