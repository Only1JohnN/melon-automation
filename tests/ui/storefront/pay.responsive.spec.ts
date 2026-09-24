import { Page } from "@playwright/test";
import { PayLinkPage } from "../../../pages/storefront/PayLinkPage";
import { test, expect } from "../../../fixtures/baseTest";
import { env } from "../../../config/environment";
import { expectResponsive, inLandscape, isTouchLayout, layoutOf } from "../../../utils/responsive";

/**
 * Runs at desktop, tablet and phone size (storefront / storefront-tablet / storefront-mobile projects).
 * The customer's whole journey is walked and every step is audited for layout problems.
 */

const SLUG = env.testStoreSlug;
const KNOWN_PHONE = env.testPhoneNumber;

/** Makes a number the backend has never seen behave as "new" without ever sending it a text. */
async function pretendNumberIsNew(page: Page) {
  await page.route("**/auth/validate-phone/**", (route) =>
    route.fulfill({
      status: 404,
      contentType: "application/json",
      body: JSON.stringify({ status: "error", statusCode: 404, message: "User not found" }),
    })
  );
  await page.route("**/auth/simple-mode/send-otp/**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ status: "success", statusCode: 200, message: "OTP sent" }),
    })
  );
}

test.describe("@storefront @pay @responsive", () => {
  test.setTimeout(240_000);

  test("should fit the screen on every step of the pay flow @smoke", async ({ page }, testInfo) => {
    test.skip(!KNOWN_PHONE, "Set TEST_PHONE_NUMBER to a phone number already registered with Melon.");
    const pay = new PayLinkPage(page);

    await test.step("Step 1: enter the amount", async () => {
      await pay.goto(SLUG);
      await expectResponsive(page, "amount step (empty)", testInfo);

      await pay.enterAmount("5000");
      await expect(pay.rewardText).toContainText("₦25.00");
      await expectResponsive(page, "amount step (filled)", testInfo);
    });

    await test.step("Step 2: enter the phone number", async () => {
      await pay.continueToPay();
      await expect(pay.step(2)).toBeVisible();
      await expectResponsive(page, "phone step (empty)", testInfo);

      await pay.typePhoneNumber("0708070292");
      await expectResponsive(page, "phone step (incomplete number)", testInfo);
    });

    await test.step("Step 3: transfer details", async () => {
      await pay.enterPhoneNumber(KNOWN_PHONE!);
      await pay.readTransferDetails();
      await expect(pay.step(3)).toBeVisible();
      await expectResponsive(page, "transfer details step", testInfo);
    });

    await test.step("Step 3: while it checks the transfer", async () => {
      await pay.madeTransferButton.click();
      await expect(pay.checkingTransferText).toBeVisible();
      await expectResponsive(page, "checking the transfer", testInfo);
    });
  });

  test("should fit the screen when a new number is asked for its code", async ({ page }, testInfo) => {
    const pay = new PayLinkPage(page);
    await pretendNumberIsNew(page);

    await pay.goto(SLUG);
    await pay.enterAmount("2500");
    await pay.continueToPay();
    await pay.enterPhoneNumber("08011122233");

    await pay.expectOtpRequested();
    await expectResponsive(page, "OTP step", testInfo);
  });

  test("should fit the screen in the dark theme", async ({ page }, testInfo) => {
    const pay = new PayLinkPage(page);
    await pay.goto(SLUG);

    const light = await pay.backgroundColor();
    await pay.themeToggle.click();
    await expect.poll(() => pay.backgroundColor()).not.toBe(light);

    await expectResponsive(page, "amount step (dark)", testInfo);

    await pay.enterAmount("5000");
    await pay.continueToPay();
    await expect(pay.step(2)).toBeVisible();
    await expectResponsive(page, "phone step (dark)", testInfo);
  });

  test("should fit the screen for a link that does not exist", async ({ page }, testInfo) => {
    const pay = new PayLinkPage(page);
    await pay.goto("this-business-does-not-exist");

    await expectResponsive(page, "unknown business page", testInfo);
  });

  test("should fit the screen when turned on its side", async ({ page }, testInfo) => {
    test.skip(!isTouchLayout(layoutOf(page.viewportSize()!.width)), "Landscape only matters on phones and tablets");
    const pay = new PayLinkPage(page);

    await pay.goto(SLUG);
    await pay.enterAmount("5000");

    await inLandscape(page, async () => {
      await expectResponsive(page, "amount step landscape", testInfo);

      await pay.continueToPay();
      await expect(pay.step(2)).toBeVisible();
      await expectResponsive(page, "phone step landscape", testInfo);
    });
  });

  test("should bring up the right keyboards and not zoom the page when a field is tapped", async ({ page }) => {
    test.skip(!isTouchLayout(layoutOf(page.viewportSize()!.width)), "Only touch screens have on-screen keyboards");
    const pay = new PayLinkPage(page);
    await pay.goto(SLUG);

    await expect(pay.amountInput).toHaveAttribute("inputmode", "numeric");
    // iOS zooms the whole page when a focused field's text is smaller than 16px.
    const amountFont = await pay.amountInput.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
    expect.soft(amountFont, "amount field font size (px)").toBeGreaterThanOrEqual(16);

    await pay.enterAmount("2500");
    await pay.continueToPay();
    await expect(pay.phoneInput).toHaveAttribute("inputmode", "tel");
    const phoneFont = await pay.phoneInput.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
    expect.soft(phoneFont, "phone field font size (px)").toBeGreaterThanOrEqual(16);
  });

  test("should let the customer copy the account number with a tap", async ({ page, context }) => {
    test.skip(!KNOWN_PHONE, "Set TEST_PHONE_NUMBER to a phone number already registered with Melon.");
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    const pay = new PayLinkPage(page);

    await pay.goto(SLUG);
    await pay.enterAmount("1000");
    await pay.continueToPay();
    await pay.enterPhoneNumber(KNOWN_PHONE!);
    const transfer = await pay.readTransferDetails();

    await page.getByRole("button", { name: "Copy" }).click();

    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(transfer.accountNumber);
  });
});
