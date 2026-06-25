import {
  test as base,
  expect,
} from "@playwright/test";

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

export { expect };