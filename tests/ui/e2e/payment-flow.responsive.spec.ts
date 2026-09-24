import { test } from "../../../fixtures/baseTest";
import { env } from "../../../config/environment";
import { payAndVerify } from "../../../utils/paymentFlow";
import { expectResponsive } from "../../../utils/responsive";

/**
 * The full money loop, run with BOTH the customer and the merchant at the project's screen size (desktop,
 * tablet or phone), auditing the layout of every screen they see along the way.
 */
test.describe("@e2e @payment @responsive @partners @storefront", () => {
  // Real payments take turns: see utils/paymentLock.ts.
  test.beforeEach(async ({ paymentSlot }) => {
    void paymentSlot;
  });

  test.setTimeout(360_000);
  test.skip(!env.testPhoneNumber, "Set TEST_PHONE_NUMBER to a phone number already registered with Melon.");

  test("customer pays and the merchant sees it, on this screen size @smoke", async ({
    page: merchantPage,
    customerPage,
    pagaPage,
    api,
  }, testInfo) => {
    // A different amount every run (₦1,000-₦9,990 in steps of ₦10).
    const amount = (100 + Math.floor(Math.random() * 900)) * 10;
    testInfo.annotations.push({ type: "amount", description: `₦${amount.toLocaleString()}` });

    await payAndVerify(
      {
        merchantPage,
        customerPage,
        pagaPage,
        api,
        onScreen: (page, label) => expectResponsive(page, label, testInfo),
      },
      { amount }
    );
  });
});
