"use client";

import { DuplicateShardPanel } from "@/components/game/DuplicateShardPanel";
import { GachaBoxCard } from "@/components/game/GachaBoxCard";
import { GachaCharacterPool } from "@/components/game/GachaCharacterPool";
import { GachaLogPreview } from "@/components/game/GachaLogPreview";
import { GachaOddsTable } from "@/components/game/GachaOddsTable";
import { GachaPityPanel } from "@/components/game/GachaPityPanel";
import { GachaRecoveryRulePanel } from "@/components/game/GachaRecoveryRulePanel";
import { GachaResultPreview } from "@/components/game/GachaResultPreview";
import { GachaRollPreviewPanel } from "@/components/game/GachaRollPreviewPanel";
import { GachaSafetyPanel } from "@/components/game/GachaSafetyPanel";
import { GachaShardPreviewPanel } from "@/components/game/GachaShardPreviewPanel";
import { GachaValidationPanel } from "@/components/game/GachaValidationPanel";
import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { gachaBoxes } from "@/data/mockGacha";
import { createMockGachaInput, validateGachaInput } from "@/engine/gacha";
import { useGameState } from "@/state/gameStateStore";

export function GachaScreen() {
  const { clearGachaPreviewMock, resetGachaPityMock, runGachaMockPreview, state } = useGameState();
  const boxOne = gachaBoxes[0];
  const preview = state.gacha.lastRollPreview;
  const validation = preview?.validation ?? validateGachaInput(createMockGachaInput({ state }));

  return (
    <div className="space-y-4 px-4">
      <GameCard>
        <div className="flex items-start justify-between gap-3">
          <SectionTitle eyebrow="Gacha / กาชา" title="Box 1 V1A" />
          <span className="rounded-full border border-sky-300/30 bg-sky-400/10 px-3 py-1 text-xs font-semibold text-sky-100">
            V1A mock only
          </span>
        </div>
        <div className="mt-3 grid gap-2 text-sm text-slate-300">
          <p>กาชา Box 1 เปิดใน V1A</p>
          <p>ใช้ Free/Test Gem เท่านั้น</p>
          <p>Paid Gem Gacha ยังไม่เปิด</p>
          <p>ระบบนี้เป็น local mock preview เท่านั้น</p>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <FeatureLockBadge label="Box 1 เปิดใน V1A" status="enabled" />
          <FeatureLockBadge label="Free/Test Gem only" status="enabled" />
          <FeatureLockBadge label="single pull only" status="enabled" />
          <FeatureLockBadge label="Paid Gem disabled" status="disabled" />
        </div>
      </GameCard>

      <GachaRollPreviewPanel
        onClearPreview={clearGachaPreviewMock}
        onPreviewPull={runGachaMockPreview}
        onResetPity={resetGachaPityMock}
        preview={preview}
      />
      <GachaResultPreview preview={preview} />
      <GachaPityPanel
        guaranteedTriggered={preview?.pity_snapshot_before.guaranteed_triggered}
        pityAfter={preview?.pity_snapshot_after.pulls_since_last_rare}
        pityLimit={state.gacha.pity.pityLimit}
        pullsSinceLastRare={state.gacha.pity.pullsSinceLastRare}
      />
      <GachaShardPreviewPanel preview={preview?.shard_preview ?? null} />
      <GachaBoxCard box={boxOne} />
      <GachaOddsTable box={boxOne} />
      <GachaCharacterPool pool={boxOne.pool} />
      <DuplicateShardPanel />
      <GachaLogPreview logPreview={preview?.log_preview ?? null} />
      <GachaRecoveryRulePanel recoveryPolicy={preview?.log_preview.recovery_policy ?? null} />
      <GachaValidationPanel validation={validation} />
      <GachaSafetyPanel />
    </div>
  );
}
