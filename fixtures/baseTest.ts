import {
  test as base,
  expect,
  Page,
} from "@playwright/test";

import { MelonApi } from "../api/MelonApi";
import { LoginPage } from "../pages/partners/LoginPage";
import {
  attachNetworkLogger,
  saveNetworkLogs,
} from "../utils/networkLogger";
import { acquirePaymentLock } from "../utils/paymentLock";

type Fixtures = {
  api: MelonApi;
  customerPage: Page;
  pagaPage: Page;
  paymentSlot: void;
  _saveNetworkLogs: void;
};

function sourceFor(projectName: string) {
  if (projectName.startsWith("merchant") || projectName === "e2e") return "merchant";
  if (projectName.startsWith("storefront")) return "customer";
  return "app";
}

export const test = base.extend<Fixtures>({
  page: async ({ page }, use, testInfo) => {
    attachNetworkLogger(page, testInfo.testId, sourceFor(testInfo.project.name));
    await use(page);
  },

  api: async ({ request }, use) => {
    await use(new MelonApi(request));
  },

  // A logged-out browser context for the customer. It copies the project's device, so a phone-sized
  // project gets a phone-sized customer alongside the phone-sized merchant.
  customerPage: async ({ browser }, use, testInfo) => {
    const device = testInfo.project.use;
    const context = await browser.newContext({
      viewport: device.viewport ?? { width: 1280, height: 800 },
      isMobile: device.isMobile,
      hasTouch: device.hasTouch,
      deviceScaleFactor: device.deviceScaleFactor,
      userAgent: device.userAgent,
      ignoreHTTPSErrors: true,
    });
    const customerPage = await context.newPage();
    attachNetworkLogger(customerPage, testInfo.testId, "customer");

    await use(customerPage);

    if (testInfo.status !== testInfo.expectedStatus) {
      // Attached as a file (not an inline body) so the JSON report stays small and the dashboard can
      // find it next to the other failure screenshots.
      const screenshotPath = testInfo.outputPath("customer-screenshot.png");
      const saved = await customerPage
        .screenshot({ path: screenshotPath, fullPage: true })
        .then(() => true)
        .catch(() => false);

      if (saved) {
        await testInfo.attach("customer-screenshot", {
          path: screenshotPath,
          contentType: "image/png",
        });
      }
    }

    await context.close();
  },

  // Paga's QA simulator always runs in a plain desktop browser, whatever device the test is emulating: it's an
  // external tool we only drive, not something whose layout we are checking.
  pagaPage: async ({ browser }, use, testInfo) => {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const pagaPage = await context.newPage();
    attachNetworkLogger(pagaPage, testInfo.testId, "paga");

    await use(pagaPage);

    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshotPath = testInfo.outputPath("paga-screenshot.png");
      const saved = await pagaPage
        .screenshot({ path: screenshotPath, fullPage: true })
        .then(() => true)
        .catch(() => false);

      if (saved) {
        await testInfo.attach("paga-screenshot", { path: screenshotPath, contentType: "image/png" });
      }
    }

    await context.close();
  },

  // Waits for its turn to make a real payment (see utils/paymentLock.ts). Request it in a beforeEach of a spec
  // that pays. Waiting here doesn't use up the test's own time limit.
  paymentSlot: [
    async ({}, use) => {
      const release = await acquirePaymentLock();
      try {
        await use();
      } finally {
        release();
      }
    },
    { timeout: 0 },
  ],

  _saveNetworkLogs: [
    async ({}, use, testInfo) => {
      await use();
      await saveNetworkLogs(testInfo.testId);
    },
    { auto: true },
  ],
});

export async function loginAsPartner(page: Page, options?: { expectSuccess?: boolean }) {
  const loginPage = new LoginPage(page);

  await page.goto(`${process.env.PARTNER_URL}/auth/login`);
  await loginPage.login(process.env.PARTNER_EMAIL!, process.env.PARTNER_PASSWORD!, {
    expectSuccess: options?.expectSuccess ?? true,
  });
}

export { expect };
