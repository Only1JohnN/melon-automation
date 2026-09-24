import { Page } from "@playwright/test";

/**
 * page.goto that survives the odd dropped connection (net::ERR_SOCKET_NOT_CONNECTED, ERR_CONNECTION_RESET…).
 * Only network-level errors are retried; anything else (bad URL, HTTP problems) fails straight away.
 */
export async function gotoWithRetry(page: Page, url: string, attempts = 3) {
  for (let attempt = 1; ; attempt++) {
    try {
      await page.goto(url);
      return;
    } catch (error) {
      const transient = /net::ERR_/.test(String((error as Error).message));

      if (!transient || attempt >= attempts) {
        throw error;
      }

      await page.waitForTimeout(1_500 * attempt);
    }
  }
}
