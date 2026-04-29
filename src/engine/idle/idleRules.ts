export const IDLE_MAX_HOURS = 8;
export const AUTO_FARM_HOURS = 2;
export const FREE_AUTO_FARM_PER_DAY = 2;
export const EXTRA_AUTO_FARM_PRICES = [20, 40, 60, 80, 100, 120] as const;
export const IDLE_CONFIG_VERSION = "v1a.idle_mission.foundation.0";

export function calculateIdleXp(stageGlobalIndex: number, cappedHours: number): number {
  return Math.floor(stageGlobalIndex * 20 * cappedHours);
}

export function calculateIdleGold(stageGlobalIndex: number, cappedHours: number): number {
  return Math.floor(stageGlobalIndex * 10 * cappedHours);
}
