"use client";

import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useGameState } from "@/state/gameStateStore";

const buttonClass =
  "rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-bold text-slate-100 transition hover:bg-white/10";

export function LocalSaveControls() {
  const { hydrateMockState, loadMockSave, resetMockSave, saveMockState } = useGameState();

  return (
    <GameCard>
      <SectionTitle eyebrow="Mock controls" title="Local save controls" />
      <div className="grid grid-cols-2 gap-2">
        <button className={buttonClass} onClick={saveMockState} type="button">
          Save Mock State
        </button>
        <button className={buttonClass} onClick={loadMockSave} type="button">
          Load Mock Save
        </button>
        <button className={buttonClass} onClick={resetMockSave} type="button">
          Reset Local Save
        </button>
        <button className={buttonClass} onClick={hydrateMockState} type="button">
          Hydrate Mock Data
        </button>
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-300">
        ปุ่มเหล่านี้เป็น mock/display only ไม่มี real reward, real payment, ledger หรือ server authority.
      </p>
    </GameCard>
  );
}
