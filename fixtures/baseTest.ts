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
  async ({}, testInfo) => {
    saveNetworkLogs(
      testInfo.testId
    );
  }
);

export const test = base;

export { expect };