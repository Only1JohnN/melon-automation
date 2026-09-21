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

type Fixtures = {
  api: MelonApi;
  customerPage: Page;
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

  // A logged-out browser context, for tests where a customer acts alongside the merchant.
  customerPage: async ({ browser }, use, testInfo) => {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
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
