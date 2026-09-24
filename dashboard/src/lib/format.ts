export function formatBytes(
  bytes?: number | null
) {
  if (!bytes) {
    return "-";
  }

  const units = [
    "B",
    "KB",
    "MB",
    "GB",
  ];

  let value = bytes;
  let unit = 0;

  while (
    value >= 1024 &&
    unit < units.length - 1
  ) {
    value /= 1024;
    unit++;
  }

  return `${value.toFixed(1)} ${units[unit]}`;
}
export function formatDuration(ms?: number | null) {
  if (ms === undefined || ms === null) {
    return "-";
  }

  if (ms < 1000) {
    return `${Math.round(ms)}ms`;
  }

  if (ms < 60_000) {
    return `${(ms / 1000).toFixed(1)}s`;
  }

  const minutes = Math.floor(ms / 60_000);
  const seconds = Math.round((ms % 60_000) / 1000);

  return `${minutes}m ${seconds}s`;
}

/** "pre-release" -> "Pre-release": how an environment name is shown. */
export function formatEnvironment(environment?: string | null) {
  if (!environment) {
    return "";
  }

  const trimmed = environment.trim();

  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}
