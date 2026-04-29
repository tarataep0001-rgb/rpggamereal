import type { IdleTeamXpRow } from "./idleTypes";

export function createIdleXpDistributionPreview(
  teamSnapshot: readonly IdleTeamXpRow[],
  xpReady: number,
): IdleTeamXpRow[] {
  return teamSnapshot.map((unit) => {
    const xpGain = unit.deployed && !unit.level_capped ? xpReady : 0;

    return {
      ...unit,
      xp_share_percent: unit.deployed ? 100 : 0,
      xp_gain_preview: xpGain,
      capped_no_conversion_v1a: unit.level_capped,
    };
  });
}
