import type { CharacterProgressionResult } from "@/engine/progression";
import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatBadge } from "@/components/ui/StatBadge";

type CharacterProgressSummaryProps = {
  progression: CharacterProgressionResult;
  compact?: boolean;
};

export function CharacterProgressSummary({ progression, compact = false }: CharacterProgressSummaryProps) {
  const nextUnlock = progression.next_skill_unlock;

  return (
    <GameCard className="border-emerald-300/25">
      <SectionTitle eyebrow="ระบบพัฒนาตัวละคร" title="Character Progression Preview" />
      <div className="mb-3 flex flex-wrap gap-2">
        <FeatureLockBadge label="Local mock only" status="schema-only" />
        <FeatureLockBadge label="Class 1 live" status="enabled" />
        <FeatureLockBadge label="Production NO-GO" status="disabled" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <StatBadge label="Level after XP" value={`Lv ${progression.xp_preview.level_after}`} tone="green" />
        <StatBadge label="V1A Cap" value={progression.xp_preview.effective_level_cap} tone="gold" />
        <StatBadge label="Unlocked Skills" value={progression.unlocked_skills.filter((skill) => skill.unlocked).length} tone="blue" />
        <StatBadge label="Next Unlock" value={nextUnlock ? `Lv ${nextUnlock.level}` : "All Class 1"} tone="purple" />
      </div>
      {!compact ? (
        <p className="mt-3 text-xs leading-5 text-slate-300">
          เลเวลสูงสุด V1A = 50. ตัวละครถึงเลเวลสูงสุดจะไม่ได้รับ XP เพิ่ม และ XP ส่วนเกินถูกทิ้งใน V1A/V1B.
        </p>
      ) : null}
    </GameCard>
  );
}
