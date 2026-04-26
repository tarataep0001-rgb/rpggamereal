import { DuplicateShardPanel } from "@/components/game/DuplicateShardPanel";
import { GachaBoxCard } from "@/components/game/GachaBoxCard";
import { GachaCharacterPool } from "@/components/game/GachaCharacterPool";
import { GachaLogPreview } from "@/components/game/GachaLogPreview";
import { GachaOddsTable } from "@/components/game/GachaOddsTable";
import { GachaPityPanel } from "@/components/game/GachaPityPanel";
import { LockedFeaturePanel } from "@/components/game/LockedFeaturePanel";
import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { box1PityPreview, gachaBoxes } from "@/data/mockGacha";

export function GachaScreen() {
  const boxOne = gachaBoxes[0];

  return (
    <div className="space-y-4 px-4">
      <GameCard>
        <div className="flex items-start justify-between gap-3">
          <SectionTitle eyebrow="Gacha / กาชา" title="Box 1 V1A" />
          <span className="rounded-full border border-sky-300/30 bg-sky-400/10 px-3 py-1 text-xs font-semibold text-sky-100">
            V1A mock only
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <FeatureLockBadge label="Box 1 เปิดใน V1A" status="enabled" />
          <FeatureLockBadge label="ใช้ Free/Test Gem เท่านั้น" status="enabled" />
          <FeatureLockBadge label="สุ่มครั้งเดียวเท่านั้น" status="enabled" />
          <FeatureLockBadge label="Paid Gem Gacha ยังไม่เปิด" status="disabled" />
        </div>
      </GameCard>

      <GachaBoxCard box={boxOne} />
      <GachaOddsTable box={boxOne} />
      <GachaCharacterPool pool={boxOne.pool} />
      <GachaPityPanel
        pityLimit={box1PityPreview.pityLimit}
        pullsSinceLastRare={box1PityPreview.pullsSinceLastRare}
      />
      <DuplicateShardPanel />
      <LockedFeaturePanel
        eyebrow="Locked Gacha"
        items={[
          {
            label: "Box 2 ยังไม่เปิดใน V1A",
            status: "internal-test",
            note: "Box 2 disabled/internal test only.",
          },
          { label: "Box 3 ยังไม่เปิด", status: "disabled" },
          { label: "Paid Gem Gacha ยังไม่เปิด", status: "disabled" },
          { label: "Multi-pull disabled/schema only", status: "schema-only" },
          { label: "No real money logic", status: "disabled" },
        ]}
        title="V1A locked gacha state"
      />
      <GachaLogPreview />
    </div>
  );
}
