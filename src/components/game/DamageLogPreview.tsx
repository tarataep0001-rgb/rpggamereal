import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { BattleDamageLog } from "@/data/mockBattleResult";
import { formatDamageNumber, getDamageLogTotals } from "@/utils/battleDisplay";

type DamageLogPreviewProps = {
  logs: BattleDamageLog[];
};

export function DamageLogPreview({ logs }: DamageLogPreviewProps) {
  const totals = getDamageLogTotals(logs);

  return (
    <GameCard>
      <SectionTitle eyebrow="Damage" title="บันทึกดาเมจ" />
      <div className="space-y-2">
        {logs.map((log) => (
          <article
            className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
            key={log.action_no}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-white">
                #{log.action_no} {log.attacker} → {log.target}
              </p>
              <span className="rounded-full bg-black/25 px-2 py-1 text-[11px] text-slate-300">
                {log.crit ? "CRIT" : "normal"} / {log.element_modifier}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">{log.skill}</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
              <span>final {formatDamageNumber(log.final_damage)}</span>
              <span>shield {formatDamageNumber(log.shield_damage)}</span>
              <span>actual HP {formatDamageNumber(log.actual_hp_damage)}</span>
              <span>overkill {formatDamageNumber(log.overkill_damage)}</span>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-sky-300/20 bg-sky-400/10 p-3 text-xs leading-5 text-sky-100">
        final {formatDamageNumber(totals.finalDamage)} / shield {formatDamageNumber(totals.shieldDamage)} / actual HP{" "}
        {formatDamageNumber(totals.actualHpDamage)} / overkill {formatDamageNumber(totals.overkillDamage)}
      </div>
    </GameCard>
  );
}
