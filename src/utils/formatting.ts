export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatPercent(value: number): string {
  return `${value}%`;
}

export function formatLocked(value: boolean): string {
  return value ? "Locked" : "Open";
}
