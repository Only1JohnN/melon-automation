import { PayLinkPage } from "../../../pages/storefront/PayLinkPage";
import { test, expect } from "../../../fixtures/baseTest";

const BUSINESS_SLUG = process.env.TEST_STORE_SLUG!;

test.describe("@storefront @pay @smoke", () => {
  test("should let a recognized customer pay a preset amount by bank transfer", async ({
    page,
  }) => {
    test.skip(
      !process.env.TEST_PHONE_NUMBER,
      "Set TEST_PHONE_NUMBER to a phone number already known to Melon to run this test."
    );

    const payLinkPage = new PayLinkPage(page);

    await payLinkPage.goto(BUSINESS_SLUG);
    await payLinkPage.selectPresetAmount("₦5,000");
    await payLinkPage.continueToPay();
    await payLinkPage.enterPhoneNumber(process.env.TEST_PHONE_NUMBER!);

    await payLinkPage.expectTransferDetails();
  });
});

test.describe("@storefront @pay", () => {
  test("should let a recognized customer pay a custom amount by bank transfer", async ({
    page,
  }) => {
    test.skip(
      !process.env.TEST_PHONE_NUMBER,
      "Set TEST_PHONE_NUMBER to a phone number already known to Melon to run this test."
    );

    const payLinkPage = new PayLinkPage(page);

    await payLinkPage.goto(BUSINESS_SLUG);
    await payLinkPage.enterCustomAmount("1000");
    await payLinkPage.continueToPay();
    await payLinkPage.enterPhoneNumber(process.env.TEST_PHONE_NUMBER!);

    await payLinkPage.expectTransferDetails();
  });

  test("should require an amount before continuing to pay", async ({ page }) => {
    const payLinkPage = new PayLinkPage(page);

    await payLinkPage.goto(BUSINESS_SLUG);

    await expect(payLinkPage.continueToPayButton).toBeDisabled();
  });

  test("should show an error for an invalid phone number", async ({ page }) => {
    const payLinkPage = new PayLinkPage(page);

    await payLinkPage.goto(BUSINESS_SLUG);
    await payLinkPage.selectPresetAmount("₦2,500");
    await payLinkPage.continueToPay();

    await expect(payLinkPage.phoneInput).toBeVisible();
    await payLinkPage.phoneInput.fill("123");
    await payLinkPage.continueButton.click();

    await expect(payLinkPage.phoneErrorText).toBeVisible();
  });
});
