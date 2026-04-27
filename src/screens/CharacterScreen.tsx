import { CharacterDetailPanel } from "@/components/game/CharacterDetailPanel";
import { CharacterProgressSummary } from "@/components/game/CharacterProgressSummary";
import { ClassRoadmapLockPanel } from "@/components/game/ClassRoadmapLockPanel";
import { ClassPathTimeline } from "@/components/game/ClassPathTimeline";
import { ClassPreviewCard } from "@/components/game/ClassPreviewCard";
import { ProgressionValidationPanel } from "@/components/game/ProgressionValidationPanel";
import { ResetTicketRulePanel } from "@/components/game/ResetTicketRulePanel";
import { SkillUnlockTimeline } from "@/components/game/SkillUnlockTimeline";
import { StarterWeaponCard } from "@/components/game/StarterWeaponCard";
import { StatGrid } from "@/components/game/StatGrid";
import { TeammateStarPreview } from "@/components/game/TeammateStarPreview";
import { XpProgressPanel } from "@/components/game/XpProgressPanel";
import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatBadge } from "@/components/ui/StatBadge";
import { class1Previews, classStatTemplates, mainCharacter } from "@/data/mockCharacters";
import { mockSkills } from "@/data/mockSkills";
import { createMockCharacterProgressionInput, processCharacterProgressionPreview } from "@/engine/progression";

const swordsmanSkillUnlocks = [
  { level: 10, skillId: "swordsman_slash_01", label: "ฟันผ่า" },
  { level: 20, skillId: "swordsman_guard_break_02", label: "ฟันทำลายเกราะ" },
  { level: 40, skillId: "swordsman_brave_guard_03", label: "ตั้งโล่กล้าหาญ" },
];

export function CharacterScreen() {
  const swordsmanTemplate = classStatTemplates.Swordsman;
  const characterProgression = processCharacterProgressionPreview(createMockCharacterProgressionInput());

  return (
    <div className="space-y-4 px-4">
      <CharacterDetailPanel />
      <CharacterProgressSummary progression={characterProgression} />
      <XpProgressPanel progression={characterProgression} />

      <GameCard>
        <SectionTitle eyebrow="Stats" title="Combat stat sheet" />
        <StatGrid stats={mainCharacter.stats} />
      </GameCard>

      <GameCard>
        <SectionTitle eyebrow="Formula" title="Display stat calculation" />
        <div className="space-y-3 text-sm leading-6 text-slate-300">
          <p>LevelStat = BaseStat + GrowthStat × (Level - 1)</p>
          <p>Then apply grade multiplier, class modifier, equipment stats, V1A display only.</p>
          <p className="rounded-xl border border-amber-300/25 bg-amber-400/10 p-3 text-amber-50">
            ค่าสเตตัสนี้เป็น mock display สำหรับ prototype เท่านั้น ระบบจริงต้องใช้ server-authoritative calculation ตาม config version
          </p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <StatBadge label="Base HP" value={swordsmanTemplate.base.HP} tone="blue" />
          <StatBadge label="Growth HP" value={swordsmanTemplate.growth.HP} tone="green" />
          <StatBadge label="Base ATK" value={swordsmanTemplate.base.ATK} tone="gold" />
          <StatBadge label="Growth ATK" value={swordsmanTemplate.growth.ATK} tone="purple" />
        </div>
      </GameCard>

      <ClassPathTimeline />
      <ClassRoadmapLockPanel progression={characterProgression} />

      <GameCard>
        <SectionTitle eyebrow="Class 1" title="Class selector / preview" />
        <div className="space-y-3">
          {class1Previews.map((item) => (
            <ClassPreviewCard
              active={item.className === mainCharacter.baseClass}
              item={item}
              key={item.className}
            />
          ))}
        </div>
        <p className="mt-3 text-xs leading-5 text-slate-400">
          Other Class 1 cards are preview only for this mock. Selection/reset flow is not implemented in V1A UI phase.
        </p>
      </GameCard>

      <SkillUnlockTimeline progression={characterProgression} />

      <GameCard>
        <SectionTitle eyebrow="Skills" title="Class 1 unlock summary" />
        <div className="space-y-2">
          {swordsmanSkillUnlocks.map((unlock) => {
            const config = mockSkills.find((skill) => skill.skill_id === unlock.skillId);

            return (
              <div className="rounded-xl border border-white/10 bg-white/5 p-3" key={unlock.skillId}>
                <div className="flex items-center justify-between gap-3">
                  <p className="font-bold text-white">
                    Lv{unlock.level} {unlock.label}
                  </p>
                  <FeatureLockBadge label="Class 1" status="enabled" />
                </div>
                <p className="mt-2 text-xs leading-5 text-slate-300">
                  {config?.description_short ?? "Swordsman active skill"}
                </p>
                <p className="mt-1 text-xs text-amber-100">
                  {config?.effect_formula ?? "Display formula placeholder"}
                </p>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-xs leading-5 text-slate-400">
          Skill Priority is managed in the Skill Priority screen. Auto Skill uses equipped active skills only.
        </p>
      </GameCard>

      <StarterWeaponCard />
      <TeammateStarPreview progression={characterProgression} />
      <ResetTicketRulePanel progression={characterProgression} />
      <ProgressionValidationPanel progression={characterProgression} />

      <GameCard>
        <SectionTitle eyebrow="Teammates" title="Gacha teammate system note" />
        <div className="space-y-2 text-sm leading-6 text-slate-300">
          <p>Main character is mandatory.</p>
          <p>Teammates come from gacha/mock pool.</p>
          <p>Duplicate gacha characters convert to shards.</p>
          <p>ระบบดาวใช้กับลูกทีมจากกาชาเท่านั้น</p>
          <p>Star 5 extra shards are stored.</p>
          <p>Shard exchange disabled/schema only in V1A.</p>
        </div>
      </GameCard>

      <GameCard>
        <SectionTitle eyebrow="Locked" title="V1A character restrictions" />
        <div className="flex flex-wrap gap-2">
          <FeatureLockBadge label="Class 2 ยังไม่เปิดใน V1A" status="disabled" />
          <FeatureLockBadge label="Class 3 เป็นโครงข้อมูลเท่านั้น" status="schema-only" />
          <FeatureLockBadge label="Paid/WLD features disabled" status="disabled" />
          <FeatureLockBadge label="Production readiness NO-GO" status="disabled" />
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-300">
          ข้อมูลนี้เป็น mock สำหรับ prototype เท่านั้น ระบบจริงต้องคำนวณจาก server/config version
        </p>
      </GameCard>
    </div>
  );
}
