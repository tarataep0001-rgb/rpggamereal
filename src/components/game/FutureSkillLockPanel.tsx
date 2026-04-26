import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function FutureSkillLockPanel() {
  return (
    <GameCard className="border-rose-300/25">
      <SectionTitle eyebrow="Future Skills" title="Locked Class 2 / Class 3 state" />
      <div className="space-y-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <FeatureLockBadge label="Class 2 ยังไม่เปิดใน V1A" status="disabled" />
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Class 2 Skill 1 requires V1B / Lv60. Skill 2/3 require Lv75 /
            Lv90 future content.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <FeatureLockBadge label="Class 3 เป็นโครงข้อมูลเท่านั้น" status="schema-only" />
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Class 3 requires later content. Placeholder-only skills cannot go live.
          </p>
        </div>
      </div>
    </GameCard>
  );
}
