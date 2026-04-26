import { ItemIconFrame } from "@/components/game/ItemIconFrame";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { noGoReasons } from "@/data/mockLaunchGate";

export function NoGoStatusPanel() {
  return (
    <GameCard className="border-rose-300/30 bg-rose-500/10">
      <div className="flex gap-4">
        <div className="w-20 shrink-0">
          <ItemIconFrame assetId="icon_launch_no_go" label="Launch NO-GO" tone="red" />
        </div>
        <div>
          <SectionTitle eyebrow="Launch Gate" title="สถานะเปิดจริง: NO-GO" />
          <p className="text-sm leading-6 text-rose-100/85">
            ยังไม่พร้อม production และห้ามตีความว่า production-ready.
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-2 text-sm text-rose-100/85">
        {noGoReasons.map((reason) => (
          <p key={reason}>- {reason}</p>
        ))}
      </div>
    </GameCard>
  );
}
