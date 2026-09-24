const pad = (n: number) => String(n).padStart(2, "0");

/**
 * YYYY-MM-DD in the machine's local time. The apps build their date filters from the browser's local date,
 * so using toISOString() (UTC) here breaks for a few hours around midnight (Lagos is UTC+1).
 */
export function localIsoDate(date = new Date()) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function addDays(date: Date, days: number) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

/** ISO timestamp -> "YYYY-MM-DD HH:mm" in local time, the way the dashboard prints "Date Updated". */
export function localDateTime(iso: string) {
  const date = new Date(iso);
  return `${localIsoDate(date)} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/** ISO timestamp -> "Sep 21, 2026", the phone layout's date format. */
export function shortDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
