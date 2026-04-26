import type { CoreGameState } from "@/state/gameStateTypes";

export function createDisplayHash(value: unknown): string {
  const input = JSON.stringify(value);
  let hash = 0;

  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) >>> 0;
  }

  return `mock_${hash.toString(16).padStart(8, "0")}`;
}

export function formatSaveDate(value: string | null): string {
  if (!value) return "Not saved";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Invalid date";
  return date.toLocaleString("th-TH", { hour12: false });
}

export function summarizeCoreState(state: CoreGameState) {
  const deployedCount = Object.values(state.teamFormation.deployedUnits).filter(Boolean).length;
  return {
    player: `${state.player.playerName} Lv ${state.player.level}/${state.player.effectiveLevelCap}`,
    inventory: `${state.inventory.usedInventorySlots}/${state.inventory.inventorySlots}`,
    formation: `${deployedCount}/6 deployed`,
    stage: `${state.stageProgress.highestStageCleared} cleared`,
    gacha: `${state.gacha.pity.pullsSinceLastRare}/${state.gacha.pity.pityLimit} pity`,
    idle: `${state.idle.accumulatedHours}/${state.idle.maxIdleHours}h`,
    launch: state.player.launchStatus,
  };
}
