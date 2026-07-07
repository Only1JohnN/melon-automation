import {
  test as base,
  expect,
  Page,
} from "@playwright/test";

import { LoginPage } from "../pages/partners/LoginPage";
import {
  attachNetworkLogger,
  saveNetworkLogs,
} from "../utils/networkLogger";

base.beforeEach(
  async ({ page }, testInfo) => {
    attachNetworkLogger(
      page,
      testInfo.testId
    );
  }
);

base.afterEach(
  async ({ page }, testInfo) => {
    await page.waitForTimeout(
      2000
    );
    
    saveNetworkLogs(
      testInfo.testId
    );
  }
);

export const test = base;

export async function loginAsPartner(page: Page, options?: { expectSuccess?: boolean }) {
  const loginPage = new LoginPage(page);

  await page.goto(`${process.env.PARTNER_URL}/auth/login`);
  await loginPage.login(process.env.PARTNER_EMAIL!, process.env.PARTNER_PASSWORD!, {
    expectSuccess: options?.expectSuccess ?? true,
  });
}

export { expect };