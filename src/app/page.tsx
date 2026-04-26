"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { AdminDashboardScreen } from "@/screens/AdminDashboardScreen";
import { BattleResultScreen } from "@/screens/BattleResultScreen";
import { CharacterScreen } from "@/screens/CharacterScreen";
import { ExportReadinessScreen } from "@/screens/ExportReadinessScreen";
import { GachaScreen } from "@/screens/GachaScreen";
import { GuildScreen } from "@/screens/GuildScreen";
import { HomeScreen } from "@/screens/HomeScreen";
import { IdleClaimScreen } from "@/screens/IdleClaimScreen";
import { InventoryScreen } from "@/screens/InventoryScreen";
import { LaunchGateScreen } from "@/screens/LaunchGateScreen";
import { ShopScreen } from "@/screens/ShopScreen";
import { SkillPriorityScreen } from "@/screens/SkillPriorityScreen";
import { StageMapScreen } from "@/screens/StageMapScreen";
import { TeamFormationScreen } from "@/screens/TeamFormationScreen";
import type { NavTab, ScreenId } from "@/types/game";

const primaryTabs: NavTab[] = [
  "home",
  "character",
  "team",
  "stage",
  "gacha",
  "inventory",
  "guild",
  "admin",
];

const screenMeta: Record<ScreenId, { title: string; subtitle: string; status?: string }> = {
  home: {
    title: "RPG V1A Command",
    subtitle: "Mobile-first idle RPG UI shell with V1A safety locks visible.",
    status: "Launch status: NO-GO",
  },
  character: {
    title: "Character",
    subtitle: "Class 1 live, Class 2 locked, Class 3 schema only.",
  },
  team: {
    title: "Team Formation",
    subtitle: "Canonical 3x3 board, local mock formation snapshot preview.",
  },
  stage: {
    title: "Stage Map",
    subtitle: "Chapter 1-5 only with deterministic stage type generation.",
  },
  gacha: {
    title: "Gacha",
    subtitle: "Box 1 Free/Test Gem pool only. Paid Gem gacha disabled.",
  },
  inventory: {
    title: "Inventory",
    subtitle: "Equipment, stack rules, salvage rules, and schema-only locks.",
  },
  guild: {
    title: "Guild",
    subtitle: "Guild overview mock with WLD guild rewards disabled.",
  },
  admin: {
    title: "Admin",
    subtitle: "Safety dashboard mock. No backend or production controls.",
    status: "Mock admin only",
  },
  skills: {
    title: "Skill Priority",
    subtitle: "Priority UI placeholder. No battle engine implemented.",
  },
  battle: {
    title: "Battle Result",
    subtitle: "Post-battle mock log preview. No real battle engine or simulator output exists.",
  },
  idle: {
    title: "Idle Claim",
    subtitle: "Local reward preview only. No ledger or claim backend.",
  },
  shop: {
    title: "Shop",
    subtitle: "Payment-sensitive shop features disabled.",
  },
  export: {
    title: "Export Readiness",
    subtitle: "Config export order and validation checklist.",
  },
  launch: {
    title: "Launch Gate",
    subtitle: "Default NO-GO checklist for unfinished launch requirements.",
    status: "NO-GO",
  },
};

function getActiveTab(screen: ScreenId): NavTab {
  return primaryTabs.includes(screen as NavTab) ? (screen as NavTab) : "home";
}

export default function Home() {
  const [screen, setScreen] = useState<ScreenId>("home");
  const meta = screenMeta[screen];

  const renderScreen = () => {
    switch (screen) {
      case "home":
        return <HomeScreen onNavigate={setScreen} />;
      case "character":
        return <CharacterScreen />;
      case "team":
        return <TeamFormationScreen />;
      case "stage":
        return <StageMapScreen />;
      case "gacha":
        return <GachaScreen />;
      case "inventory":
        return <InventoryScreen />;
      case "guild":
        return <GuildScreen />;
      case "admin":
        return <AdminDashboardScreen />;
      case "skills":
        return <SkillPriorityScreen />;
      case "battle":
        return <BattleResultScreen />;
      case "idle":
        return <IdleClaimScreen />;
      case "shop":
        return <ShopScreen />;
      case "export":
        return <ExportReadinessScreen />;
      case "launch":
        return <LaunchGateScreen />;
      default:
        return <HomeScreen onNavigate={setScreen} />;
    }
  };

  return (
    <AppShell activeTab={getActiveTab(screen)} onNavigate={setScreen}>
      <PageHeader {...meta} />
      {renderScreen()}
      <div className="px-4 pt-4">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-200"
            onClick={() => setScreen("skills")}
            type="button"
          >
            Skill Priority
          </button>
          <button
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-200"
            onClick={() => setScreen("battle")}
            type="button"
          >
            Battle Result
          </button>
          <button
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-200"
            onClick={() => setScreen("idle")}
            type="button"
          >
            Idle Claim
          </button>
          <button
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-200"
            onClick={() => setScreen("shop")}
            type="button"
          >
            Shop
          </button>
          <button
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-200"
            onClick={() => setScreen("export")}
            type="button"
          >
            Export Readiness
          </button>
          <button
            className="rounded-xl border border-rose-300/30 bg-rose-500/10 px-3 py-2 text-rose-100"
            onClick={() => setScreen("launch")}
            type="button"
          >
            Launch Gate
          </button>
        </div>
      </div>
    </AppShell>
  );
}
