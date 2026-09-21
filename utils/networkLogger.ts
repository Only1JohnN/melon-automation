import fs from "fs";
import path from "path";
import { Page } from "@playwright/test";

export interface ApiLogEntry {
  timestamp: string;
  source?: string;
  resourceType: string;
  method: string;
  url: string;
  status: number;
  request: { headers: unknown; body: string | null };
  response: { headers: unknown; body: string | null };
}

const networkLogs = new Map<string, ApiLogEntry[]>();
const pendingReads = new Map<string, Promise<void>[]>();

// Reports (incl. api-logs) are published to the `reports` branch, so secrets must never reach them.
const SENSITIVE_HEADERS = new Set(["authorization", "cookie", "set-cookie", "x-api-key"]);
const SENSITIVE_KEYS = /^(pin|otp)$|password|token|secret|plain_key|plugin_key/i;

// Third-party analytics/telemetry: never useful when debugging a Melon flow.
const NOISE_URLS = /cdn-cgi|google-analytics|googletagmanager|firebaseinstallations|doubleclick/;

function redactValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(redactValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, val]) => [
        key,
        SENSITIVE_KEYS.test(key) ? "[REDACTED]" : redactValue(val),
      ])
    );
  }
  return value;
}

export function redactHeaders(headers: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(headers).map(([key, val]) => [
      key,
      SENSITIVE_HEADERS.has(key.toLowerCase()) ? "[REDACTED]" : val,
    ])
  );
}

export function redactBody(body: string | null): string | null {
  if (!body) return body;
  try {
    return JSON.stringify(redactValue(JSON.parse(body)));
  } catch {
    return body;
  }
}

function ensureLog(testId: string) {
  if (!networkLogs.has(testId)) {
    networkLogs.set(testId, []);
  }
  return networkLogs.get(testId)!;
}

export function logApiCall(testId: string, entry: ApiLogEntry) {
  ensureLog(testId).push({
    ...entry,
    request: {
      headers: redactHeaders((entry.request.headers as Record<string, string>) ?? {}),
      body: redactBody(entry.request.body),
    },
    response: {
      headers: redactHeaders((entry.response.headers as Record<string, string>) ?? {}),
      body: redactBody(entry.response.body),
    },
  });
}

/**
 * Records every fetch/xhr call a page makes. Safe to call for several pages in one
 * test (e.g. merchant + customer); `source` labels which actor made the call.
 */
export function attachNetworkLogger(page: Page, testId: string, source?: string) {
  ensureLog(testId);

  const track = (work: Promise<void>) => {
    const list = pendingReads.get(testId) ?? [];
    list.push(work);
    pendingReads.set(testId, list);
  };

  page.on("response", (response) => track(record(response)));

  async function record(response: import("@playwright/test").Response) {
    const request = response.request();
    const resourceType = request.resourceType();

    if ((resourceType !== "fetch" && resourceType !== "xhr") || NOISE_URLS.test(request.url())) {
      return;
    }

    let responseBody: string | null = null;
    try {
      responseBody = await response.text();
    } catch {}

    let requestHeaders: Record<string, string> = {};
    try {
      requestHeaders = await request.allHeaders();
    } catch {}

    let requestBody: string | null = null;
    try {
      requestBody = request.postData() || null;
    } catch {}

    logApiCall(testId, {
      timestamp: new Date().toISOString(),
      source,
      resourceType,
      method: request.method(),
      url: request.url(),
      status: response.status(),
      request: { headers: requestHeaders, body: requestBody },
      response: { headers: response.headers(), body: responseBody },
    });
  }
}

export async function saveNetworkLogs(testId: string) {
  await Promise.allSettled(pendingReads.get(testId) ?? []);
  pendingReads.delete(testId);

  const logDir = path.join(process.cwd(), "reports", "api-logs");

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(logDir, `${testId}.json`),
    JSON.stringify(networkLogs.get(testId) || [], null, 2)
  );

  networkLogs.delete(testId);
}
