"use client";

import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatBadge } from "@/components/ui/StatBadge";
import { useGameState } from "@/state/gameStateStore";
import { formatSaveDate } from "@/utils/saveFormatting";

export function SaveStatusPanel() {
  const { state, runtime } = useGameState();
  const validationTone = runtime.validation.status === "valid" ? "green" : "red";

  return (
    <GameCard className="border-sky-300/20 bg-gradient-to-br from-slate-950/95 via-sky-950/30 to-slate-950/95">
      <SectionTitle eyebrow="Local Save" title="Save status" />
      <div className="mt-4 grid grid-cols-2 gap-2">
        <StatBadge label="Schema" value={state.metadata.save_schema_version} tone="blue" />
        <StatBadge label="Validation" value={runtime.validation.status.toUpperCase()} tone={validationTone} />
        <StatBadge label="Last saved" value={formatSaveDate(runtime.lastSavedAt)} tone="purple" />
        <StatBadge label="Storage" value={runtime.storageAvailable ? "localStorage" : "memory only"} tone="gold" />
      </div>
      <p className="mt-3 rounded-xl border border-amber-300/25 bg-amber-400/10 p-3 text-xs leading-5 text-amber-100">
        ระบบ Save นี้เป็น local mock สำหรับ prototype เท่านั้น
      </p>
      <p className="mt-2 text-xs text-slate-400">{runtime.lastAction}</p>
    </GameCard>
  );
}
