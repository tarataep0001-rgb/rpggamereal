import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { BattleSkillCastLog } from "@/data/mockBattleResult";

type SkillCastLogPreviewProps = {
  logs: BattleSkillCastLog[];
};

export function SkillCastLogPreview({ logs }: SkillCastLogPreviewProps) {
  return (
    <GameCard>
      <SectionTitle eyebrow="Skills" title="บันทึกการใช้สกิล" />
      <div className="space-y-2">
        {logs.map((log, index) => (
          <article
            className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
            key={`${log.unit}-${log.skill_name}-${index}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-bold text-white">
                {log.unit} / {log.skill_name}
              </p>
              <span className="rounded-full bg-violet-400/10 px-2 py-1 text-[11px] text-violet-100">
                CD {log.cooldown_started}
              </span>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-300">
              <span>MP {log.mp_before} → {log.mp_after}</span>
              <span>{log.target_type}</span>
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-400">{log.result_summary}</p>
          </article>
        ))}
      </div>
    </GameCard>
  );
}
