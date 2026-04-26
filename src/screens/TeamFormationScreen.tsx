import { AvailableUnitCard } from "@/components/game/AvailableUnitCard";
import { FormationBoard } from "@/components/game/FormationBoard";
import { FormationBonusPanel } from "@/components/game/FormationBonusPanel";
import { FormationPatternCard } from "@/components/game/FormationPatternCard";
import { TargetingRulesPanel } from "@/components/game/TargetingRulesPanel";
import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatBadge } from "@/components/ui/StatBadge";
import { box1GachaCharacters, mainCharacter, mockCharacters } from "@/data/mockCharacters";
import {
  calculateFormationBonus,
  countDeployedUnits,
  countOrthogonalAdjacency,
  findDuplicateCharacterIds,
  getFormationPriorityResult,
  isMainCharacterDeployed,
} from "@/utils/formulas";

const availableUnitIds = [
  "main_hero",
  "ch_common_priest_light_aid",
  "ch_common_archer_wind_shot",
  "ch_common_thief_dark_cut",
  "ch_uncommon_sword_earth_guard",
  "ch_rare_mage_earth_sage",
];

const availableUnits = availableUnitIds.flatMap((id) => {
  if (id === "main_hero") {
    return [mainCharacter];
  }

  const deployed = mockCharacters.find((unit) => unit.id === id);
  const poolUnit = box1GachaCharacters.find((unit) => unit.id === id);
  const unit = deployed ?? poolUnit;

  return unit ? [unit] : [];
});

const teamRules = [
  "ตัวละครหลักต้องอยู่ในทีมเสมอ",
  "ลงทีมได้ 1-6 ตัว",
  "ห้ามใช้ตัวละครซ้ำ character_id",
  "Duplicate gacha characters convert to shards",
  "เปลี่ยน Formation ได้เฉพาะนอก Battle",
  "Formation Snapshot จะถูกล็อกตอนเริ่มต่อสู้",
  "Battle uses formation_snapshot",
];

export function TeamFormationScreen() {
  const bonuses = calculateFormationBonus(mockCharacters);
  const activeBonus = getFormationPriorityResult(mockCharacters);
  const deployedCount = countDeployedUnits(mockCharacters);
  const duplicateIds = findDuplicateCharacterIds(mockCharacters);
  const mainDeployed = isMainCharacterDeployed(mockCharacters);
  const adjacencyCount = countOrthogonalAdjacency(mockCharacters);

  return (
    <div className="space-y-4 px-4">
      <GameCard className="border-amber-300/25 bg-gradient-to-br from-slate-950/95 to-violet-950/60">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
              จัดทีม 3x3
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Team Formation 3x3
            </h2>
            <p className="mt-1 text-sm text-slate-300">
              Frontend tactical layout mock. No battle engine in this phase.
            </p>
          </div>
          <FeatureLockBadge label="V1A mock-only" status="schema-only" />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <StatBadge label="Team size" value={`${deployedCount}/6`} tone="gold" />
          <StatBadge
            label="Active bonus"
            value={activeBonus?.name ?? "None"}
            tone={activeBonus ? "green" : "red"}
          />
          <StatBadge
            label="Main required"
            value={mainDeployed ? "OK" : "Missing"}
            tone={mainDeployed ? "green" : "red"}
          />
          <StatBadge
            label="Duplicates"
            value={duplicateIds.length === 0 ? "None" : duplicateIds.join(", ")}
            tone={duplicateIds.length === 0 ? "blue" : "red"}
          />
        </div>

        <p className="mt-4 rounded-xl border border-sky-300/25 bg-sky-400/10 p-3 text-xs leading-5 text-sky-100">
          Formation Snapshot จะถูกล็อกตอนเริ่มต่อสู้ และ formation bonus จะล็อกตาม snapshot นั้นจนจบ battle
        </p>
      </GameCard>

      <GameCard>
        <SectionTitle eyebrow="Board" title="3x3 Tactical Board" />
        <FormationBoard units={mockCharacters} />
      </GameCard>

      <FormationBonusPanel activeBonus={activeBonus} units={mockCharacters} />

      <GameCard>
        <SectionTitle eyebrow="Patterns" title="Formation pattern reference" />
        <div className="space-y-3">
          {bonuses.map((bonus) => (
            <FormationPatternCard bonus={bonus} key={bonus.id} />
          ))}
        </div>
        <p className="mt-3 text-xs leading-5 text-slate-400">
          Assassin Spread adjacency links currently detected: {adjacencyCount}. Priority order is Front Guard, Backline Focus, Balanced Line, Cross Formation, Assassin Spread.
        </p>
      </GameCard>

      <GameCard>
        <SectionTitle eyebrow="Units" title="Available units" />
        <div className="space-y-3">
          {availableUnits.map((unit) => (
            <AvailableUnitCard key={unit.id} unit={unit} />
          ))}
        </div>
      </GameCard>

      <GameCard>
        <SectionTitle eyebrow="Rules" title="Team constraints" />
        <div className="space-y-2 text-sm leading-6 text-slate-300">
          {teamRules.map((rule) => (
            <p key={rule}>{rule}</p>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <FeatureLockBadge label="Main mandatory" status="enabled" />
          <FeatureLockBadge label="No duplicate" status="enabled" />
          <FeatureLockBadge label="During battle changes" status="disabled" />
        </div>
      </GameCard>

      <TargetingRulesPanel />

      <GameCard className="border-rose-300/25">
        <SectionTitle eyebrow="Scope" title="Safety / mock-only note" />
        <div className="space-y-2 text-sm leading-6 text-slate-300">
          <p>ข้อมูลนี้เป็น mock สำหรับ prototype เท่านั้น</p>
          <p>ระบบต่อสู้จริงยังไม่ได้เปิดใน Phase นี้</p>
          <p>No server-authoritative calculation in this phase.</p>
          <p>No WLD, Paid Gem, withdrawal, blockchain, ledger, or backend behavior.</p>
        </div>
      </GameCard>
    </div>
  );
}
