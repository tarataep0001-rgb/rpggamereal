export function getLaunchGateStatus(items: ReadonlyArray<{ status: string }>): "GO" | "NO-GO" {
  return items.every((item) => item.status === "GO") ? "GO" : "NO-GO";
}

export function countBlockingLaunchItems(items: ReadonlyArray<{ status: string }>): number {
  return items.filter((item) => item.status !== "GO").length;
}

export function getPolicyReadinessStatus(reviewed: boolean): "reviewed" | "restricted" {
  return reviewed ? "reviewed" : "restricted";
}

export function getExportReadinessPercent(items: ReadonlyArray<{ status: string }>): number {
  if (items.length === 0) {
    return 0;
  }

  const ready = items.filter((item) => item.status === "pass").length;
  return Math.round((ready / items.length) * 100);
}
