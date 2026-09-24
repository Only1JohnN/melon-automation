import fs from "fs";
import os from "os";
import path from "path";

const LOCK = path.join(os.tmpdir(), "melon-automation-payment.lock");
const STALE_AFTER_MS = 15 * 60_000;

/**
 * Real payments all go to the same QA merchant and each one checks that the merchant's totals moved by exactly
 * its own payment. Two of them at once (different workers, or the desktop and phone copies of a test) would
 * see each other's money, so they take turns. The lock is a directory: creating it is atomic, and one left
 * behind by a crashed run is ignored after 15 minutes.
 */
export async function acquirePaymentLock(): Promise<() => void> {
  for (;;) {
    try {
      fs.mkdirSync(LOCK);
      return () => fs.rmSync(LOCK, { recursive: true, force: true });
    } catch (error: any) {
      if (error.code !== "EEXIST") throw error;

      try {
        if (Date.now() - fs.statSync(LOCK).mtimeMs > STALE_AFTER_MS) {
          fs.rmSync(LOCK, { recursive: true, force: true });
          continue;
        }
      } catch {
        continue; // released between the two calls: try again straight away
      }

      await new Promise((resolve) => setTimeout(resolve, 2_000));
    }
  }
}
