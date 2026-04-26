import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { MockBattleResult } from "@/data/mockBattleResult";
import { formatConfigVersionList } from "@/utils/battleDisplay";

type BattleSnapshotNoticeProps = {
  result: MockBattleResult;
};

export function BattleSnapshotNotice({ result }: BattleSnapshotNoticeProps) {
  const snapshotRows = [
    ["battle_id", result.snapshot_info.battle_id],
    ["deterministic_seed", result.snapshot_info.deterministic_seed],
    ["team_snapshot", result.snapshot_info.team_snapshot],
    ["enemy_snapshot", result.snapshot_info.enemy_snapshot],
  ];

  return (
    <GameCard>
      <SectionTitle eyebrow="Snapshot" title="ข้อมูล Snapshot / Audit" />
      <div className="space-y-2">
        {snapshotRows.map(([label, value]) => (
          <div className="flex justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs" key={label}>
            <span className="text-slate-500">{label}</span>
            <span className="break-all text-right font-semibold text-slate-200">{value}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-white/10 bg-black/20 p-3">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
          config_versions present
        </p>
        <div className="space-y-1 text-xs text-slate-300">
          {formatConfigVersionList(result).map((line) => (
            <p className="break-all" key={line}>{line}</p>
          ))}
        </div>
      </div>
      <p className="mt-3 rounded-xl border border-amber-300/25 bg-amber-400/10 p-3 text-xs leading-5 text-amber-100">
        ข้อมูลนี้เป็น mock battle log สำหรับ prototype เท่านั้น ระบบจริงต้องใช้
        server-authoritative snapshot และ deterministic replay test
      </p>
    </GameCard>
  );
}
