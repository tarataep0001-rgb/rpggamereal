type BangkokDateParts = {
  year: number;
  month: number;
  day: number;
};

function formatDateKey(parts: BangkokDateParts): string {
  return `${parts.year}-${String(parts.month).padStart(2, "0")}-${String(parts.day).padStart(2, "0")}`;
}

export function getBangkokDateParts(nowIso: string): BangkokDateParts {
  const date = new Date(nowIso);
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = Object.fromEntries(
    formatter.formatToParts(date).map((part) => [part.type, part.value]),
  );

  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
  };
}

export function getBangkokBusinessDate(nowIso: string): string {
  return formatDateKey(getBangkokDateParts(nowIso));
}

export function getBangkokWeekKey(nowIso: string): string {
  const parts = getBangkokDateParts(nowIso);
  const utcDate = new Date(Date.UTC(parts.year, parts.month - 1, parts.day));
  const day = utcDate.getUTCDay() || 7;

  utcDate.setUTCDate(utcDate.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(utcDate.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((utcDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);

  return `${utcDate.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}
