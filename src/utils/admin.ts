import type { FeatureFlagStatus } from "@/types/game";
import { formatNumber } from "@/utils/formatting";

export function formatAdminThreshold(value: number, unit: string): string {
  return `${formatNumber(value)} ${unit}`;
}

export function getEmergencyPauseStatusLabel(enabled: boolean): string {
  return enabled ? "Paused / mock locked" : "Not paused / mock only";
}

export function getFeatureFlagTone(enabled: boolean): FeatureFlagStatus {
  return enabled ? "enabled" : "disabled";
}
