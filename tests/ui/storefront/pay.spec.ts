import { PayLinkPage } from "../../../pages/storefront/PayLinkPage";
import { test, expect } from "../../../fixtures/baseTest";
import { env } from "../../../config/environment";
import { expectedRewardNaira } from "../../../test-data/constants/rewards";
import { formatNaira } from "../../../utils/money";

import { pending } from "../../../utils/pending";
const SLUG = env.testStoreSlug;
const KNOWN_PHONE = env.testPhoneNumber;

const knownPhoneOnly = () =>
  test.skip(!KNOWN_PHONE, "Set TEST_PHONE_NUMBER to a phone number already registered with Melon.");

/** Months between an ISO date and now, counting only full months (how the "since" card reads). */
function fullMonthsSince(iso: string) {
  const from = new Date(iso);
  const now = new Date();
  let months = (now.getUTCFullYear() - from.getUTCFullYear()) * 12 + (now.getUTCMonth() - from.getUTCMonth());
  if (now.getUTCDate() < from.getUTCDate()) months -= 1;
  return months;
}

test.describe("@storefront @pay", () => {
  test("should show the business, its verification and its trust cards @smoke", async ({
    page,
    api,
  }) => {
    const pay = new PayLinkPage(page);
    await pay.goto(SLUG);

    const { status, body } = await api.publicBusiness(SLUG);
    expect(status).toBe(200);
    const business = body.data;

    await expect(page.getByText(business.name, { exact: true }).first()).toBeVisible();
    await expect(page.getByText("KYC Approved")).toBeVisible();
    await expect(page.getByText(business.tagline)).toBeVisible();
    await expect(page.getByText("HOW MUCH ARE YOU PAYING?", { exact: false })).toBeVisible();

    await test.step("Date joined card: 'KYC verified since <Mon YYYY>' matches when the business was created", async () => {
      const since = new Date(business.created_at).toLocaleString("en-US", {
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      });
      await expect(pay.kycSinceCard).toContainText(`KYC verified since ${since}`);

      const months = fullMonthsSince(business.created_at);
      if (months >= 1 && months < 12) {
        await expect(pay.kycSinceCard).toContainText(`${months} month${months === 1 ? "" : "s"}`);
      }
    });
  });

  test("should show a payments-completed card that matches the merchant's successful transactions", async ({
    page,
    api,
  }) => {
    const pay = new PayLinkPage(page);
    await pay.goto(SLUG);
    await api.login();

    await expect(pay.paymentCompletedCard).toContainText("Payments completed on Melon");

    // A payment can land in another run mid-test, so compare fresh values and retry.
    await expect(async () => {
      await page.reload();
      await expect(pay.amountInput).toBeVisible();
      const { body } = await api.overview();
      expect(await pay.paymentsCompleted()).toBe(body.data.transactions.count);
    }).toPass({ timeout: 30_000 });
  });

  test("should only accept numbers in the amount and format them with commas", async ({ page }) => {
    const pay = new PayLinkPage(page);
    await pay.goto(SLUG);

    await pay.amountInput.fill("1234567");
    await expect(pay.amountInput).toHaveValue("1,234,567");

    await pay.amountInput.fill("abc");
    await expect(pay.amountInput).toHaveValue("");
    await expect(pay.continueToPayButton).toBeDisabled();
  });

  test("should not let the customer continue without an amount", async ({ page }) => {
    const pay = new PayLinkPage(page);
    await pay.goto(SLUG);

    await expect(pay.continueToPayButton).toBeDisabled();
    expect(await pay.displayedRewardNaira()).toBe(0);

    await pay.enterAmount("0");
    await expect(pay.continueToPayButton).toBeDisabled();
  });

  test("should show the Melon Coins earned for the typed amount (100 coins = ₦1)", async ({ page }) => {
    const pay = new PayLinkPage(page);
    await pay.goto(SLUG);

    for (const amount of [100, 1000, 5000, 12000, 50000]) {
      await test.step(`₦${amount} earns ₦${expectedRewardNaira(amount)} (${expectedRewardNaira(amount) * 100} coins)`, async () => {
        await pay.enterAmount(String(amount));
        await expect(pay.rewardText).toContainText(formatNaira(expectedRewardNaira(amount)));
        await expect(pay.continueToPayButton).toBeEnabled();
      });
    }
  });

  test("should cap the reward however large the payment is", async ({ page }) => {
    const pay = new PayLinkPage(page);
    await pay.goto(SLUG);

    for (const amount of ["100000", "500000", "2400000"]) {
      await pay.enterAmount(amount);
      await expect(pay.rewardText).toContainText("₦500.00");
    }
  });

  test("should let a recognised customer skip the OTP and get transfer details @smoke", async ({
    page,
    api,
  }) => {
    knownPhoneOnly();
    const pay = new PayLinkPage(page);

    await pay.goto(SLUG);
    await pay.enterAmount("5000");
    await expect(pay.rewardText).toContainText("₦25.00");
    await pay.continueToPay();

    await test.step("Step 2 asks for the phone number", async () => {
      await expect(pay.step(2)).toBeVisible();
      await expect(page.getByText(/we'll send your receipt and your ₦25.00 in melon coins/i)).toBeVisible();
    });

    const [lookup, created] = await Promise.all([
      page.waitForResponse((r) => /\/auth\/validate-phone\//.test(r.url())),
      page.waitForResponse((r) => /\/simple-mode\/payment-links$/.test(r.url()) && r.request().method() === "POST"),
      pay.enterPhoneNumber(KNOWN_PHONE!),
    ]);

    expect(lookup.status(), "known customer lookup").toBe(200);
    expect(created.status(), "payment link is created").toBe(201);
    const link = (await created.json()).data.payment_link;

    const transfer = await pay.readTransferDetails();

    await test.step("Step 3 shows a unique bank-transfer account for exactly this payment", async () => {
      await expect(pay.step(3)).toBeVisible();
      expect(transfer.accountNumber).toMatch(/^\d{10}$/);
      expect(transfer.bankName).toBe("Paga");
      expect(transfer.amount).toBe(5000);
      expect(transfer.accountNumber).toBe(link.account_number);
      expect(transfer.reference).toBe(link.transaction_id);
      await expect(page.getByText(/expires in (29|30):\d\d/)).toBeVisible();
      await expect(pay.madeTransferButton).toBeVisible();
      await expect(page.getByText(/you'll earn ₦25.00 in melon coins once this payment is confirmed/i)).toBeVisible();
    });

    await test.step("The backend agrees the payment is still waiting for money", async () => {
      const { status, body } = await api.paymentLink(transfer.reference);
      expect(status).toBe(200);
      expect(body.data.payment_status).toBe("pending");
      expect(body.data.requesting_amount_in_naira).toBe("5000");
      expect(body.data.expired).toBe(false);
    });
  });

  test("should copy the account number", async ({ page, context }) => {
    knownPhoneOnly();
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

  test("should let the customer go back and change the amount", async ({ page }) => {
    const pay = new PayLinkPage(page);

    await pay.goto(SLUG);
    await pay.enterAmount("2500");
    await pay.continueToPay();
    await expect(pay.phoneInput).toBeVisible();

    await pay.backButton.click();

    await expect(pay.amountInput).toBeVisible();
    await expect(pay.amountInput).toHaveValue("2,500");
  });

  test("should keep Continue disabled until the phone number is a valid Nigerian number", async ({ page }) => {
    const pay = new PayLinkPage(page);

    await pay.goto(SLUG);
    await pay.enterAmount("2500");
    await pay.continueToPay();
    await expect(pay.step(2)).toBeVisible();
    await expect(pay.continueButton).toBeDisabled();

    for (const invalid of ["123", "0708070292", "12345678901"]) {
      await pay.typePhoneNumber(invalid);
      await expect(pay.continueButton, `"${invalid}" is not accepted`).toBeDisabled();
    }

    await test.step("Letters are rejected and extra digits are cut at 11", async () => {
      await pay.typePhoneNumber("abcdefghijk");
      await expect(pay.phoneInput).toHaveValue("");

      await pay.typePhoneNumber("070807029200");
      await expect(pay.phoneInput).toHaveValue("07080702920");
      await expect(pay.continueButton).toBeEnabled();
    });
  });

  test("should ask a new phone number for a 4-digit OTP instead of continuing", async ({ page }) => {
    const pay = new PayLinkPage(page);
    const newNumber = "08011122233"; // synthetic — never a real subscriber, see the mocks below

    // Nothing here may reach a real phone: the lookup says "new customer" and the SMS call is answered
    // by a stub, so no OTP is ever sent. (The real 404-for-unknown-number rule is covered in tests/api.)
    await page.route("**/auth/validate-phone/**", (route) =>
      route.fulfill({
        status: 404,
        contentType: "application/json",
        body: JSON.stringify({ status: "error", statusCode: 404, message: "User not found" }),
      })
    );
    let smsRequested = false;
    await page.route("**/auth/simple-mode/send-otp/**", (route) => {
      smsRequested = true;
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ status: "success", statusCode: 200, message: "OTP sent" }),
      });
    });

    await pay.goto(SLUG);
    await pay.enterAmount("2500");
    await pay.continueToPay();
    await pay.enterPhoneNumber(newNumber);

    await pay.expectOtpRequested();
    await expect(page.getByText("We sent a 4-digit code to 0801 ••• 233.")).toBeVisible();
    await expect(page.getByText(/resend in \d:\d\d/i)).toBeVisible();
    expect(smsRequested, "an OTP was requested for the new number").toBe(true);
    await expect(pay.transferHeading).toBeHidden();
  });

  test("should switch between light and dark", async ({ page }) => {
    const pay = new PayLinkPage(page);
    await pay.goto(SLUG);

    const light = await pay.backgroundColor();
    await pay.themeToggle.click();
    await expect.poll(() => pay.backgroundColor()).not.toBe(light);
    const dark = await pay.backgroundColor();

    // The choice is not remembered across a reload today (the page comes back light); only the toggle is checked.
    await pay.themeToggle.click();
    await expect.poll(() => pay.backgroundColor()).toBe(light);
    expect(dark).not.toBe(light);
  });

  test("should check for the transfer straight away when the customer taps I've made the transfer", async ({
    page,
    api,
  }) => {
    knownPhoneOnly();
    const pay = new PayLinkPage(page);

    await pay.goto(SLUG);
    await pay.enterAmount("1000");
    await pay.continueToPay();
    await pay.enterPhoneNumber(KNOWN_PHONE!);
    const transfer = await pay.readTransferDetails();

    const check = page.waitForResponse(
      (r) => r.url().includes(`/simple-mode/payment-links?transactionId=${transfer.reference}`) && r.status() === 200
    );
    await pay.madeTransferButton.click();

    await expect(pay.checkingTransferText).toBeVisible();
    await expect(pay.checkingTransferButton).toBeDisabled();
    await check;

    await test.step("Nothing was paid, so the payment is still pending and no coins are given", async () => {
      const { body } = await api.paymentLink(transfer.reference);
      expect(body.data.payment_status).toBe("pending");
      expect(body.data.reward_coin_amount).toBeNull();
      await expect(page.getByText(/received$/i)).toBeHidden();
    });
  });

  test.fixme("should tell the customer when the pay link's business does not exist", pending("Observed: opening a pay link for a business that does not exist makes the API answer 404 \"Business not found\", yet the page still shows a placeholder business (\"Melon\", \"KYC Approved\", a \"?\" avatar) and lets the customer continue to pay. Expected: a clear \"business not found\" page with no payment form."), async ({ page }) => {
    await page.goto(`${env.storefrontUrl}/pay/this-business-does-not-exist`);
    await expect(page.getByText(/not found|doesn't exist|invalid/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /continue to pay/i })).toBeHidden();
  });
});
