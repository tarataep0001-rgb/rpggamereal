import { GameCard } from "@/components/ui/GameCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { MissionPreview } from "@/engine/idle";

type DailyMissionPanelProps = {
  missions: MissionPreview[];
  periodKey: string;
  onPreviewClaim: (mission: MissionPreview) => void;
};

export function DailyMissionPanel({ missions, onPreviewClaim, periodKey }: DailyMissionPanelProps) {
  return (
    <GameCard>
      <SectionTitle eyebrow="Daily Missions" title="Daily Mission รีเซ็ตเวลา 00:00 Asia/Bangkok" />
      <p className="mt-2 text-sm text-slate-300">Bangkok business date: {periodKey}</p>
      <div className="mt-4 grid gap-3">
        {missions.map((mission) => (
          <article className="rounded-xl border border-white/10 bg-white/[0.03] p-3" key={mission.mission_id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-bold text-white">{mission.name}</p>
                <p className="text-xs text-slate-500">{mission.mission_id}</p>
              </div>
              <span className={mission.claimable ? "text-emerald-100" : mission.claimed ? "text-sky-100" : "text-slate-400"}>
                {mission.claimed ? "claimed" : mission.claimable ? "claimable" : "locked"}
              </span>
            </div>
            <div className="mt-3">
              <ProgressBar label={`${mission.progress}/${mission.target}`} max={mission.target} value={mission.progress} />
            </div>
            <p className="mt-2 text-xs text-slate-300">Mission Claim รับได้ครั้งเดียวต่อรอบ</p>
            <p className="mt-1 text-xs text-slate-500">snapshot: {mission.reward_snapshot.reward_snapshot_id}</p>
            <button
              className="mt-3 rounded-xl border border-amber-300/30 bg-amber-400/10 px-3 py-2 text-xs font-bold text-amber-100 disabled:opacity-50"
              disabled={!mission.claimable}
              onClick={() => onPreviewClaim(mission)}
              type="button"
            >
              Preview claim
            </button>
          </article>
        ))}
      </div>
    </GameCard>
  );
}
