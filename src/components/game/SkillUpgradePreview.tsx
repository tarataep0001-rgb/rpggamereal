import type { CharacterProgressionResult } from "@/engine/progression";
import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatBadge } from "@/components/ui/StatBadge";

type SkillUpgradePreviewProps = {
  progression: CharacterProgressionResult;
};

export function SkillUpgradePreview({ progression }: SkillUpgradePreviewProps) {
  const upgrade = progression.skill_upgrade_preview;

  return (
    <GameCard>
      <SectionTitle eyebrow="Skill Upgrade" title="Mock preview only" />
      <div className="mb-3 flex flex-wrap gap-2">
        <FeatureLockBadge label="No WLD" status="disabled" />
        <FeatureLockBadge label="No Paid Gem" status="disabled" />
        <FeatureLockBadge label="No ledger" status="disabled" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <StatBadge label="skill_id" value={upgrade.skill_id} tone="blue" />
        <StatBadge label="Current" value={`Lv ${upgrade.current_skill_level}`} tone="purple" />
        <StatBadge label="Next" value={upgrade.next_skill_level ? `Lv ${upgrade.next_skill_level}` : "Cap"} tone="green" />
        <StatBadge label="Gold" value={upgrade.required_gold} tone="gold" />
      </div>
      <div className="mt-3 space-y-2">
        {upgrade.required_materials.map((item) => (
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-slate-300" key={item.item_id}>
            {item.item_id} x{item.quantity}
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-300">
        Skill Upgrade นี้เป็น mock preview เท่านั้น ไม่ consume inventory และไม่สร้าง production authority.
      </p>
    </GameCard>
  );
}
