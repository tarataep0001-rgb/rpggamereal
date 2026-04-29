import { AutoFarmPanel } from "@/components/game/AutoFarmPanel";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { AutoFarmPreview } from "@/engine/idle";

type AutoFarmUsagePanelProps = {
  preview: AutoFarmPreview;
  onPreview: () => void;
};

export function AutoFarmUsagePanel({ onPreview, preview }: AutoFarmUsagePanelProps) {
  return (
    <div className="space-y-4">
      <AutoFarmPanel
        autoFarmHours={preview.auto_farm_hours}
        freePerDay={preview.free_auto_farm_per_day}
        nextExtraPrice={preview.next_extra_price}
        onPreview={onPreview}
        prices={preview.extra_price_ladder}
        remainingToday={preview.remaining_free_auto_farm}
        usedToday={preview.used_free_auto_farm_today}
      />
      <GameCard>
        <SectionTitle eyebrow="Bangkok Reset" title="Daily counters local mock" />
        <div className="mt-3 space-y-2 text-sm text-slate-300">
          <p>Daily Mission รีเซ็ตเวลา 00:00 Asia/Bangkok</p>
          <p>Bangkok business date: {preview.bangkok_business_date}</p>
          <p>Extra usage requires Free/Test Gem preview only. Paid Gem and WLD payment are disabled.</p>
        </div>
      </GameCard>
    </div>
  );
}
