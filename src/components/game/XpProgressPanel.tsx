import type { CharacterProgressionResult } from "@/engine/progression";
import { GameCard } from "@/components/ui/GameCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatBadge } from "@/components/ui/StatBadge";

type XpProgressPanelProps = {
  progression: CharacterProgressionResult;
};

export function XpProgressPanel({ progression }: XpProgressPanelProps) {
  const xp = progression.xp_preview;
  const nextRequired = xp.next_level_xp_required ?? 1;

  return (
    <GameCard>
      <SectionTitle eyebrow="XP Preview" title="Level-up preview" />
      <ProgressBar
        label={`Lv ${xp.current_level} XP ${xp.current_xp}`}
        max={nextRequired}
        value={xp.capped ? nextRequired : xp.xp_after}
      />
      <div className="mt-4 grid grid-cols-2 gap-2">
        <StatBadge label="XP Gain" value={xp.xp_gain} tone="green" />
        <StatBadge label="Level After" value={`Lv ${xp.level_after}`} tone="gold" />
        <StatBadge label="Levels Gained" value={xp.levels_gained} tone="blue" />
        <StatBadge label="Discarded at Cap" value={xp.xp_discarded_at_cap} tone={xp.xp_discarded_at_cap > 0 ? "red" : "purple"} />
      </div>
      <p className="mt-3 rounded-xl border border-amber-300/25 bg-amber-400/10 p-3 text-xs leading-5 text-amber-50">
        ตัวละครถึงเลเวลสูงสุดจะไม่ได้รับ XP เพิ่ม และไม่มี XP conversion ใน V1A/V1B.
      </p>
    </GameCard>
  );
}
