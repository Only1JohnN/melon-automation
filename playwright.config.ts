import { defineConfig, devices } from "@playwright/test";
import { env } from "./config/environment";

const MERCHANT_STATE = "playwright/.auth/merchant.json";

// Screen sizes every responsive check runs at. Tablet is emulated on Chromium (an iPad descriptor would
// switch the project to WebKit, which CI doesn't install).
const DEVICES = {
  desktop: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
  tablet: {
    ...devices["Desktop Chrome"],
    viewport: { width: 820, height: 1180 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  },
  mobile: { ...devices["Pixel 7"] },
};

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,

  /* Add timeout for each test */
  timeout: env.timeout || 60_000,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["line"],
    ["html"],
    [
      "json",
      {
        outputFile: "reports/results.json",
      },
    ],
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    // A wrong locator should fail in seconds, not sit until the whole test times out.
    actionTimeout: 30_000,
    navigationTimeout: 60_000,

    headless: env.headless,
    viewport: {
      width: 1920,
      height: 1080,
    },

    deviceScaleFactor: 2,

    launchOptions: {
      slowMo: env.slowMo,
    },

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    screenshot: "only-on-failure",
    video: {
      mode: "retain-on-failure",

      size: {
        width: 1920,
        height: 1080,
      },
    },
    trace: "retain-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    // Any *.responsive.spec.ts runs at desktop, tablet and phone size (see DEVICES above); the
    // other specs run at desktop size only.

    // ── Merchant dashboard (authenticated) ─────────────────────────────────
    {
      name: "merchant-setup",
      testMatch: "**/merchant.auth.setup.ts",
      use: { ...devices["Desktop Chrome"], storageState: undefined },
    },

    {
      name: "merchant",
      dependencies: ["merchant-setup"],
      testMatch: "**/ui/partners/merchant/**/*.spec.ts",
      use: { ...DEVICES.desktop, storageState: MERCHANT_STATE },
    },

    {
      name: "merchant-tablet",
      dependencies: ["merchant-setup"],
      testMatch: "**/ui/partners/merchant/**/*.responsive.spec.ts",
      use: { ...DEVICES.tablet, storageState: MERCHANT_STATE },
    },

    {
      name: "merchant-mobile",
      dependencies: ["merchant-setup"],
      testMatch: "**/ui/partners/merchant/**/*.responsive.spec.ts",
      use: { ...DEVICES.mobile, storageState: MERCHANT_STATE },
    },

    // ── Customer-facing pay link (public) ──────────────────────────────────
    {
      name: "storefront",
      testMatch: "**/ui/storefront/**/*.spec.ts",
      use: { ...DEVICES.desktop, storageState: undefined, ignoreHTTPSErrors: true },
    },

    {
      name: "storefront-tablet",
      testMatch: "**/ui/storefront/**/*.responsive.spec.ts",
      use: { ...DEVICES.tablet, storageState: undefined, ignoreHTTPSErrors: true },
    },

    {
      name: "storefront-mobile",
      testMatch: "**/ui/storefront/**/*.responsive.spec.ts",
      use: { ...DEVICES.mobile, storageState: undefined, ignoreHTTPSErrors: true },
    },

    // ── Cross-actor flows: customer pays, merchant sees it (both actors use the project's device) ──
    {
      name: "e2e",
      dependencies: ["merchant-setup"],
      testMatch: "**/ui/e2e/**/*.spec.ts",
      use: { ...DEVICES.desktop, storageState: MERCHANT_STATE },
    },

    {
      name: "e2e-tablet",
      dependencies: ["merchant-setup"],
      testMatch: "**/ui/e2e/**/*.responsive.spec.ts",
      use: { ...DEVICES.tablet, storageState: MERCHANT_STATE },
    },

    {
      name: "e2e-mobile",
      dependencies: ["merchant-setup"],
      testMatch: "**/ui/e2e/**/*.responsive.spec.ts",
      use: { ...DEVICES.mobile, storageState: MERCHANT_STATE },
    },

    // ── Backend API checks (no browser) ────────────────────────────────────
    {
      name: "api",
      testMatch: "**/api/**/*.spec.ts",
    },

    // ── Auth flows (logged out) ────────────────────────────────────────────
    {
      name: "guest",
      testMatch: ["**/login.spec.ts", "**/signup.spec.ts", "**/forgot-password.spec.ts"],
      use: { ...devices["Desktop Chrome"], storageState: undefined },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});