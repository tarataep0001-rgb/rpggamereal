import type { ScreenId } from "@/types/game";
import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatBadge } from "@/components/ui/StatBadge";
import { box1GachaCharacters, mainCharacter, mockCharacters } from "@/data/mockCharacters";
import { mockPlayer } from "@/data/mockPlayer";
import { mockStages } from "@/data/mockStages";
import { calculateFormationBonus, getChapterName } from "@/utils/formulas";
import { formatNumber } from "@/utils/formatting";

type HomeCardProps = {
  onNavigate: (screen: ScreenId) => void;
};

const nextStage =
  mockStages.find((stage) => stage.stage_id === "1-6") ??
  mockStages.find((stage) => !stage.locked);

const activeFormationBonus =
  calculateFormationBonus(mockCharacters).find((bonus) => bonus.active) ?? null;

const starterTeammate = box1GachaCharacters.find(
  (character) => character.id === "ch_common_priest_light_aid",
);

const lockedFeatures = [
  { label: "WLD Withdraw", status: "disabled" as const, detail: "WLD Withdraw ถูกปิดใน V1A" },
  { label: "WLD Ranking", status: "disabled" as const, detail: "WLD Ranking ถูกปิดใน V1A" },
  { label: "Paid Gem Gacha", status: "disabled" as const, detail: "ระบบ Paid Gem ยังไม่เปิดใช้งาน" },
  { label: "Box 2", status: "disabled" as const, detail: "Disabled except internal test" },
  { label: "Box 3", status: "disabled" as const, detail: "Disabled" },
  { label: "Class 2", status: "disabled" as const, detail: "Locked until V1B / Lv60" },
  { label: "Class 3", status: "schema-only" as const, detail: "Schema only" },
  { label: "Epic Normal Drop", status: "schema-only" as const, detail: "Not live in V1A" },
];

const quickActions: Array<{
  label: string;
  icon: string;
  target: ScreenId;
  tone: string;
  subtitle: string;
}> = [
  {
    label: "Continue Stage",
    icon: "◆",
    target: "stage",
    tone: "border-sky-300/30 bg-sky-400/10 text-sky-100",
    subtitle: "Next map node",
  },
  {
    label: "Claim Idle",
    icon: "◷",
    target: "idle",
    tone: "border-emerald-300/30 bg-emerald-400/10 text-emerald-100",
    subtitle: "Mock rewards",
  },
  {
    label: "Team Formation",
    icon: "▦",
    target: "team",
    tone: "border-violet-300/30 bg-violet-400/10 text-violet-100",
    subtitle: "3x3 board",
  },
  {
    label: "Skill Priority",
    icon: "✧",
    target: "skills",
    tone: "border-indigo-300/30 bg-indigo-400/10 text-indigo-100",
    subtitle: "Class 1 skills",
  },
  {
    label: "Gacha Box 1",
    icon: "✦",
    target: "gacha",
    tone: "border-amber-300/35 bg-amber-400/10 text-amber-100",
    subtitle: "Free/Test Gem",
  },
  {
    label: "Inventory",
    icon: "▣",
    target: "inventory",
    tone: "border-teal-300/30 bg-teal-400/10 text-teal-100",
    subtitle: "Gear slots",
  },
  {
    label: "Guild",
    icon: "♜",
    target: "guild",
    tone: "border-fuchsia-300/30 bg-fuchsia-400/10 text-fuchsia-100",
    subtitle: "Boss mock",
  },
  {
    label: "Launch Gate",
    icon: "⚑",
    target: "launch",
    tone: "border-rose-300/35 bg-rose-500/10 text-rose-100",
    subtitle: "NO-GO",
  },
];

export function HeroStatusCard() {
  return (
    <GameCard className="overflow-hidden border-amber-300/25 bg-[linear-gradient(135deg,rgba(15,23,42,.94),rgba(46,16,101,.72)),radial-gradient(circle_at_top_right,rgba(251,191,36,.22),transparent_34%)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
            Main Lobby / หน้าหลัก
          </p>
          <h2 className="mt-2 text-3xl font-black text-white">
            {mockPlayer.playerName}
          </h2>
          <p className="mt-1 text-sm text-slate-300">
            {mockPlayer.mainClass} / {mainCharacter.role} / Class 1 live
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-rose-300/40 bg-rose-500/10 px-3 py-1 text-xs font-black text-rose-100">
          {mockPlayer.launchStatus}
        </span>
      </div>

      <div className="mt-5">
        <ProgressBar
          label={`Lv ${mockPlayer.level} / Cap ${mockPlayer.effectiveLevelCap}`}
          max={mockPlayer.effectiveLevelCap}
          value={mockPlayer.level}
        />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <StatBadge label="Team Power" value={formatNumber(mockPlayer.teamPower)} tone="gold" />
        <StatBadge label="Chapter" value={mockPlayer.currentChapter} tone="purple" />
        <StatBadge label="Highest" value={mockPlayer.highestStageCleared} tone="blue" />
        <StatBadge label="Idle Stage" value={mockPlayer.idleStage} tone="green" />
      </div>
    </GameCard>
  );
}

export function CurrencySummaryCard() {
  return (
    <GameCard>
      <SectionTitle eyebrow="Currency" title="Wallet display only" />
      <div className="grid grid-cols-2 gap-2">
        <StatBadge label="Gold" value={formatNumber(mockPlayer.gold)} tone="gold" />
        <StatBadge label="Free Gem" value={mockPlayer.freeGem} tone="blue" />
        <StatBadge label="Paid Gem" value={`${mockPlayer.paidGem} / disabled`} tone="red" />
        <StatBadge label="Mailbox" value={mockPlayer.mailboxCount} tone="purple" />
      </div>
      <p className="mt-3 rounded-xl border border-rose-300/20 bg-rose-500/10 p-3 text-xs leading-5 text-rose-100">
        ระบบ Paid Gem ยังไม่เปิดใช้งาน ไม่มี payment หรือ wallet behavior ใน prototype นี้
      </p>
    </GameCard>
  );
}

export function MainCharacterPreviewCard() {
  const stats = mainCharacter.stats;

  return (
    <GameCard>
      <SectionTitle eyebrow="Main Character" title={mainCharacter.displayName} />
      <div className="flex gap-3">
        <div className="flex h-24 w-20 shrink-0 items-center justify-center rounded-2xl border border-amber-300/30 bg-gradient-to-br from-amber-300/20 via-violet-500/20 to-sky-500/20 text-3xl">
          ◇
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-white">
            {mainCharacter.baseClass} / Lv {mainCharacter.level} / Cap {mainCharacter.levelCap}
          </p>
          <p className="mt-1 text-xs text-slate-300">
            Starter weapon: {mainCharacter.starterWeaponId}
          </p>
          <p className="mt-2 text-xs text-amber-100">
            Main Character has no Star system in V1A
          </p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2">
        <StatBadge label="HP" value={stats.HP} tone="green" />
        <StatBadge label="ATK" value={stats.ATK} tone="gold" />
        <StatBadge label="DEF" value={stats.DEF} tone="blue" />
        <StatBadge label="SPD" value={stats.SPD} tone="purple" />
      </div>
    </GameCard>
  );
}

export function TeamSnapshotCard({ onNavigate }: HomeCardProps) {
  return (
    <GameCard>
      <SectionTitle eyebrow="Team" title="Current team snapshot" />
      <div className="space-y-2 text-sm text-slate-300">
        <p>Deployed units: {mockCharacters.length}/6</p>
        <p>Starter teammate: {starterTeammate?.id ?? "ch_common_priest_light_aid"}</p>
        <p>Rules: 1-6 units, main character mandatory, no duplicate character_id</p>
      </div>
      <div className="mt-3 rounded-xl border border-amber-300/25 bg-amber-400/10 p-3">
        <p className="text-sm font-bold text-amber-100">
          Active bonus: {activeFormationBonus?.name ?? "None"}
        </p>
        <p className="mt-1 text-xs text-slate-300">
          {activeFormationBonus?.effect ?? "No active formation bonus"}
        </p>
      </div>
      <button
        className="mt-4 w-full rounded-xl bg-violet-300 px-4 py-3 text-sm font-black text-slate-950"
        onClick={() => onNavigate("team")}
        type="button"
      >
        Go to Team
      </button>
    </GameCard>
  );
}

export function ProgressionCard() {
  const underpowered = nextStage
    ? mockPlayer.teamPower < nextStage.recommended_power
    : false;

  return (
    <GameCard>
      <SectionTitle eyebrow="Progress" title={`Chapter 1 ${getChapterName(1)}`} />
      <div className="grid grid-cols-2 gap-2">
        <StatBadge label="Cleared" value={mockPlayer.highestStageCleared} tone="blue" />
        <StatBadge label="Next" value={nextStage?.stage_id ?? "N/A"} tone="gold" />
        <StatBadge label="Rec Lv" value={nextStage?.recommended_level ?? "-"} tone="purple" />
        <StatBadge
          label="Rec Power"
          value={nextStage ? formatNumber(nextStage.recommended_power) : "-"}
          tone={underpowered ? "red" : "green"}
        />
      </div>
      <p className="mt-3 text-sm text-slate-300">
        Player team power: {formatNumber(mockPlayer.teamPower)}
      </p>
      {underpowered ? (
        <p className="mt-2 rounded-xl border border-rose-300/30 bg-rose-500/10 p-3 text-xs text-rose-100">
          Underpowered warning: team power is lower than recommended power.
        </p>
      ) : (
        <p className="mt-2 rounded-xl border border-emerald-300/30 bg-emerald-500/10 p-3 text-xs text-emerald-100">
          Team power is ready for the suggested stage.
        </p>
      )}
    </GameCard>
  );
}

export function IdleRewardCard({ onNavigate }: HomeCardProps) {
  return (
    <GameCard>
      <SectionTitle eyebrow="Idle" title="Reward ready preview" />
      <div className="grid grid-cols-2 gap-2">
        <StatBadge label="Idle stage" value={mockPlayer.idleStage} tone="green" />
        <StatBadge label="Max idle" value="8 hours" tone="blue" />
        <StatBadge label="Mock time" value="2h 35m" tone="purple" />
        <StatBadge label="Ready" value="XP 480 / Gold 1,240" tone="gold" />
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-300">
        Auto Farm = 2 hours idle. Free Auto Farm = 2/day. ข้อมูลนี้เป็น mock สำหรับ prototype เท่านั้น
      </p>
      <button
        className="mt-4 w-full rounded-xl bg-amber-300 px-4 py-3 text-sm font-black text-slate-950"
        onClick={() => onNavigate("idle")}
        type="button"
      >
        Claim Idle
      </button>
    </GameCard>
  );
}

export function QuickActionGrid({ onNavigate }: HomeCardProps) {
  return (
    <div>
      <SectionTitle eyebrow="Actions" title="Quick action grid" />
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => (
          <button
            className={`min-h-24 rounded-2xl border p-4 text-left transition hover:brightness-125 ${action.tone}`}
            key={action.label}
            onClick={() => onNavigate(action.target)}
            type="button"
          >
            <span className="text-2xl">{action.icon}</span>
            <span className="mt-2 block text-sm font-black">{action.label}</span>
            <span className="mt-1 block text-xs opacity-75">{action.subtitle}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function LockedFeaturePanel() {
  return (
    <GameCard>
      <SectionTitle eyebrow="Locked V1A" title="Disabled feature state" />
      <div className="space-y-2">
        {lockedFeatures.map((feature) => (
          <div
            className="flex flex-col gap-2 rounded-xl bg-white/5 p-3"
            key={feature.label}
          >
            <FeatureLockBadge label={feature.label} status={feature.status} />
            <p className="text-xs text-slate-300">{feature.detail}</p>
          </div>
        ))}
      </div>
    </GameCard>
  );
}

export function ReadinessStatusPanel() {
  const rows = [
    "Frontend prototype only",
    "Mock data only",
    "No backend",
    "No real WLD",
    "No real withdrawal",
    "No real ledger",
    "ยังไม่มีการรัน simulation จริง",
    "ยังไม่มี legal/policy review จริง",
  ];

  return (
    <GameCard className="border-rose-300/25">
      <SectionTitle eyebrow="Safety" title="V1A readiness status" />
      <div className="space-y-2 text-sm text-slate-300">
        {rows.map((row) => (
          <p key={row}>{row}</p>
        ))}
      </div>
      <p className="mt-4 rounded-xl border border-rose-300/30 bg-rose-500/10 p-3 text-sm font-black text-rose-100">
        สถานะเปิดจริง: NO-GO
      </p>
    </GameCard>
  );
}
