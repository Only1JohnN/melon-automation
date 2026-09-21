import fs from "fs";
import path from "path";

export type ArtifactKind = "screenshot" | "video" | "trace";

export type Artifact = {
  kind: ArtifactKind;
  label: string;
  /** PNG, MP4, WEBM, ZIP - taken from the file that was actually found. */
  format: string;
  url: string | null;
  size: number | null;
  /** False when the file could not be found locally or on the reports branch. */
  available: boolean;
  /** Only useful to developers debugging the framework, not to read a failure. */
  technicalOnly: boolean;
  /** Shown but not clickable. */
  disabled: boolean;
};

export type ResolvedArtifacts = {
  screenshots: Artifact[];
  videos: Artifact[];
  trace: Artifact | null;
};

export type ArtifactSource = {
  /** Folders on this machine that may hold the published files, and the URL prefix that serves each. */
  localRoots: { dir: string; urlPrefix: string }[];
  /** Base URL of the same files on the reports branch (no trailing slash). */
  remoteBase: string;
};

// Traces are large and only useful to developers, so they're tagged technical-only and switched
// off for now. Flip this to true to make the card clickable again.
const TRACE_ENABLED = false;

const HEAD_TIMEOUT_MS = 8000;

function relativeToTestResults(attachmentPath: string) {
  const normalized = attachmentPath.replace(/\\/g, "/");
  const marker = "/test-results/";
  const index = normalized.lastIndexOf(marker);

  return index >= 0 ? normalized.substring(index + marker.length) : normalized;
}

const encodePath = (relative: string) =>
  relative.split("/").map(encodeURIComponent).join("/");

/**
 * The CI pipeline converts every .webm to .mp4 and deletes the .webm, but the report still
 * names the .webm. Try the .mp4 first, then the original (in case the conversion failed or
 * this is a local run that was never converted).
 */
function candidatesFor(kind: ArtifactKind, relative: string) {
  if (kind === "video" && relative.endsWith(".webm")) {
    return [relative.replace(/\.webm$/, ".mp4"), relative];
  }

  return [relative];
}

async function findFile(
  candidates: string[],
  source: ArtifactSource
): Promise<{ relative: string; url: string; size: number | null } | null> {
  for (const relative of candidates) {
    for (const root of source.localRoots) {
      const file = path.join(root.dir, relative);

      if (fs.existsSync(file)) {
        return {
          relative,
          url: `${root.urlPrefix}${encodePath(relative)}`,
          size: fs.statSync(file).size,
        };
      }
    }
  }

  for (const relative of candidates) {
    const url = `${source.remoteBase}/${encodePath(relative)}`;

    try {
      const response = await fetch(url, {
        method: "HEAD",
        cache: "no-store",
        signal: AbortSignal.timeout(HEAD_TIMEOUT_MS),
      });

      if (response.ok) {
        const length = Number(response.headers.get("content-length"));

        return {
          relative,
          url,
          size: Number.isFinite(length) && length > 0 ? length : null,
        };
      }
    } catch {
      // Unreachable or timed out: treat this candidate as missing and try the next one.
    }
  }

  return null;
}

async function resolveOne(
  attachment: any,
  kind: ArtifactKind,
  label: string,
  source: ArtifactSource
): Promise<Artifact> {
  const technicalOnly = kind === "trace";
  const disabled = kind === "trace" && !TRACE_ENABLED;
  const relative = attachment?.path ? relativeToTestResults(attachment.path) : null;

  const base = {
    kind,
    label,
    technicalOnly,
    disabled,
  };

  if (!relative || disabled) {
    return {
      ...base,
      format: relative ? relative.split(".").pop()!.toUpperCase() : "",
      url: null,
      size: null,
      available: false,
    };
  }

  const found = await findFile(candidatesFor(kind, relative), source);

  if (!found) {
    return {
      ...base,
      format: relative.split(".").pop()!.toUpperCase(),
      url: null,
      size: null,
      available: false,
    };
  }

  return {
    ...base,
    format: found.relative.split(".").pop()!.toUpperCase(),
    url: found.url,
    size: found.size,
    available: true,
  };
}

const isImage = (a: any) => String(a?.contentType ?? "").startsWith("image/");
const isVideo = (a: any) => String(a?.contentType ?? "").startsWith("video/");

function labelFor(kind: "screenshot" | "video", attachment: any, index: number, total: number) {
  const named =
    attachment.name && attachment.name !== kind
      ? String(attachment.name).replace(/[-_]/g, " ")
      : null;

  if (named) {
    return named.charAt(0).toUpperCase() + named.slice(1);
  }

  const noun = kind === "screenshot" ? "Screenshot" : "Video";

  return total > 1 ? `${noun} ${index + 1}` : noun;
}

/**
 * Every screenshot/video/trace attached to a failed test, each checked for existence and sized.
 * A test can have several (e.g. a merchant page and a customer page), so all of them are listed.
 */
export async function resolveArtifacts(
  attachments: any[] = [],
  source: ArtifactSource
): Promise<ResolvedArtifacts> {
  const screenshots = attachments.filter(isImage);
  const videos = attachments.filter(isVideo);
  const trace = attachments.find((a) => a.name === "trace");

  const [resolvedScreenshots, resolvedVideos, resolvedTrace] = await Promise.all([
    Promise.all(
      screenshots.map((a, i) =>
        resolveOne(a, "screenshot", labelFor("screenshot", a, i, screenshots.length), source)
      )
    ),
    Promise.all(
      videos.map((a, i) =>
        resolveOne(a, "video", labelFor("video", a, i, videos.length), source)
      )
    ),
    trace ? resolveOne(trace, "trace", "Trace", source) : Promise.resolve(null),
  ]);

  return {
    screenshots: resolvedScreenshots,
    videos: resolvedVideos,
    trace: resolvedTrace,
  };
}
