import { PayLinkPage } from "../../../pages/storefront/PayLinkPage";
import { test, expect } from "../../../fixtures/baseTest";
import { env } from "../../../config/environment";
import { expectFitsViewportWidth, expectTapTarget, pageOverflowsHorizontally } from "../../../utils/viewport";

const SLUG = env.testStoreSlug;

test.describe("@storefront @pay @mobile", () => {
  test("should fit the phone screen with the business, trust cards and amount form @smoke", async ({ page }) => {
    const pay = new PayLinkPage(page);
    await pay.goto(SLUG);

    expect(await pageOverflowsHorizontally(page), "no sideways scrolling").toBe(false);

    await expect(page.getByText("KYC Approved")).toBeVisible();
    await expectFitsViewportWidth(page, pay.paymentCompletedCard, "payments completed card");
    await expectFitsViewportWidth(page, pay.kycSinceCard, "KYC since card");
    await pay.amountInput.scrollIntoViewIfNeeded();
    await expectFitsViewportWidth(page, pay.amountInput, "amount field");
    await expectFitsViewportWidth(page, pay.continueToPayButton, "Continue to pay");
    await expectTapTarget(pay.continueToPayButton, "Continue to pay", 44);
  });

  test("should bring up the right keyboards: numbers for the amount, a phone pad for the number", async ({
    page,
  }) => {
    const pay = new PayLinkPage(page);
    await pay.goto(SLUG);

    await expect(pay.amountInput).toHaveAttribute("inputmode", "numeric");

    await pay.enterAmount("2500");
    await pay.continueToPay();
    await expect(pay.phoneInput).toHaveAttribute("inputmode", "tel");
    await expectFitsViewportWidth(page, pay.phoneInput, "phone field");
    await expectTapTarget(pay.continueButton, "Continue", 44);
  });

  test("should show the coins the customer will earn while they type the amount", async ({ page }) => {
    const pay = new PayLinkPage(page);
    await pay.goto(SLUG);

    await pay.enterAmount("5000");

    await expect(pay.rewardText).toContainText("₦25.00");
    await expect(pay.continueToPayButton).toBeEnabled();
  });

  test("should show the transfer details on a phone without overflowing", async ({ page, context }) => {
    test.skip(!env.testPhoneNumber, "Set TEST_PHONE_NUMBER to a phone number already registered with Melon.");
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    const pay = new PayLinkPage(page);

    await pay.goto(SLUG);
    await pay.enterAmount("1000");
    await pay.continueToPay();
    await pay.enterPhoneNumber(env.testPhoneNumber!);
    const transfer = await pay.readTransferDetails();

    expect(await pageOverflowsHorizontally(page)).toBe(false);
    await expect(pay.step(3)).toBeVisible();
    await expectFitsViewportWidth(page, pay.transferHeading, "account number label");

    const copy = page.getByRole("button", { name: "Copy" });
    await expectFitsViewportWidth(page, copy, "Copy button");
    await copy.click();
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(transfer.accountNumber);
  });

  test("should ask a new number for an OTP on a phone", async ({ page }) => {
    const pay = new PayLinkPage(page);

    // Same protection as the desktop test: the lookup and the SMS call are stubbed, nothing is sent.
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

    await pay.goto(SLUG);
    await pay.enterAmount("2500");
    await pay.continueToPay();
    await pay.enterPhoneNumber("08011122233");

    await pay.expectOtpRequested();
    expect(await pageOverflowsHorizontally(page)).toBe(false);
  });
});
