import fs from "fs";
import path from "path";
import { Page } from "@playwright/test";

const networkLogs = new Map<
  string,
  any[]
>();

export function attachNetworkLogger(
  page: Page,
  testId: string
) {
  networkLogs.set(testId, []);

  page.on("response", async (response) => {
  //   console.log(
  //   "API:",
  //   response.request().resourceType(),
  //   response.request().url()
  // );
    const request = response.request();

    const resourceType =
      request.resourceType();

    // Only capture API calls
    if (
      resourceType !== "fetch" &&
      resourceType !== "xhr"
    ) {
      return;
    }

    let responseBody: string | null =
      null;

    let responseHeaders = {};

    try {
      responseBody =
        await response.text();
    } catch {}

    try {
      responseHeaders =
        response.headers();
    } catch {}

    let requestHeaders = {};

    try {
      requestHeaders =
        await request.headers();
    } catch {}

    let requestBody = null;

    try {
      requestBody =
        request.postData() || null;
    } catch {}

    networkLogs
      .get(testId)
      ?.push({
        timestamp:
          new Date().toISOString(),

        resourceType,

        method:
          request.method(),

        url:
          request.url(),

        status:
          response.status(),

        request: {
          headers:
            requestHeaders,
          body:
            requestBody,
        },

        response: {
          headers:
            responseHeaders,
          body:
            responseBody,
        },
      });
  });
}

export function saveNetworkLogs(
  testId: string
) {

  // console.log(
  //   "Saving logs for:",
  //   testId
  // );

  // console.log(
  //   "Captured requests:",
  //   networkLogs.get(testId)?.length
  // );

  const logDir = path.join(
    process.cwd(),
    "reports",
    "api-logs"
  );

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, {
      recursive: true,
    });
  }

  fs.writeFileSync(
    path.join(
      logDir,
      `${testId}.json`
    ),
    JSON.stringify(
      networkLogs.get(testId) ||
        [],
      null,
      2
    )
  );

  networkLogs.delete(testId);
}