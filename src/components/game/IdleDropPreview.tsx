import { ItemIconFrame } from "@/components/game/ItemIconFrame";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { formatNumber } from "@/utils/formatting";

type IdleDropPreviewProps = {
  drops: ReadonlyArray<{ item_id: string; display_name: string; quantity: number }>;
};

const assetByItemId: Record<string, string> = {
  mat_stone_lv1: "icon_mat_stone_lv1",
  mat_enhancement_powder: "icon_mat_enhancement_powder",
  mat_skill_book_fragment: "icon_mat_skill_book_fragment",
  mock_gear_chest: "icon_reward_chest",
  mock_idle_gear_chest: "icon_reward_chest",
};

export function IdleDropPreview({ drops }: IdleDropPreviewProps) {
  return (
    <GameCard>
      <SectionTitle eyebrow="Idle Drop Preview" title="Mock reward table" />
      <div className="grid gap-3">
        {drops.map((drop) => (
          <div
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3"
            key={drop.item_id}
          >
            <div className="w-14 shrink-0">
              <ItemIconFrame
                assetId={assetByItemId[drop.item_id] ?? "icon_reward_chest"}
                label={drop.display_name}
                tone="gold"
              />
            </div>
            <div>
              <p className="font-semibold text-white">{drop.display_name}</p>
              <p className="text-sm text-slate-300">x{formatNumber(drop.quantity)}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-amber-100">Epic gear ไม่ดรอปปกติใน V1A</p>
    </GameCard>
  );
}
