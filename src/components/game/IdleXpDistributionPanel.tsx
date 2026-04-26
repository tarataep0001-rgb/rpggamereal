import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

type IdleXpDistributionPanelProps = {
  deployedTeamSnapshot: ReadonlyArray<{
    character_id: string;
    display_name: string;
    cell_id: string;
    xp_share_percent: number;
    capped: boolean;
  }>;
  undeployedPreview: ReadonlyArray<{
    character_id: string;
    display_name: string;
    xp_share_percent: number;
  }>;
};

export function IdleXpDistributionPanel({
  deployedTeamSnapshot,
  undeployedPreview,
}: IdleXpDistributionPanelProps) {
  return (
    <GameCard>
      <SectionTitle eyebrow="XP Distribution" title="Team snapshot at claim time" />
      <div className="grid gap-2">
        {deployedTeamSnapshot.map((unit) => (
          <div
            className="rounded-xl border border-emerald-300/20 bg-emerald-400/10 p-3 text-sm"
            key={unit.character_id}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-emerald-50">{unit.display_name}</p>
              <span>{unit.xp_share_percent}% XP</span>
            </div>
            <p className="mt-1 text-xs text-emerald-100/70">
              {unit.character_id} / {unit.cell_id} / {unit.capped ? "level capped" : "not capped"}
            </p>
          </div>
        ))}
        {undeployedPreview.map((unit) => (
          <div
            className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm"
            key={unit.character_id}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-slate-200">{unit.display_name}</p>
              <span>{unit.xp_share_percent}% XP</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">{unit.character_id} / undeployed</p>
          </div>
        ))}
      </div>
      <div className="mt-4 text-sm leading-6 text-slate-300">
        <p>ตัวละครที่อยู่ในทีมได้รับ XP 100%</p>
        <p>ตัวละครที่ไม่ได้ลงทีมไม่ได้รับ XP</p>
        <p>ตัวละครที่ถึงเลเวลสูงสุดจะไม่ได้รับ XP เพิ่ม และไม่มี conversion ใน V1A</p>
      </div>
    </GameCard>
  );
}
