import { test, expect } from "../../../fixtures/baseTest";
import { env } from "../../../config/environment";
import { toApiPhone } from "../../../api/MelonApi";
import { randomAmountWithoutCoinLoss } from "../../../test-data/constants/rewards";
import { merchantSnapshot, payAndVerify } from "../../../utils/paymentFlow";
import { MerchantTransactionsPage } from "../../../pages/partners/merchant/TransactionsPage";

import { pending } from "../../../utils/pending";
// @partners + @storefront: the flow spans both, so the results dashboard counts it under each application.
test.describe("@e2e @payment @partners @storefront", () => {
  // Real payments take turns: see utils/paymentLock.ts.
  test.beforeEach(async ({ paymentSlot }) => {
    void paymentSlot;
  });

  // Every payment changes the merchant's totals, so these run one after another.
  test.describe.configure({ mode: "serial", timeout: 360_000 });
  test.skip(!env.testPhoneNumber, "Set TEST_PHONE_NUMBER to a phone number already registered with Melon.");

  test("customer pays a small amount and it reaches the merchant everywhere @smoke", async ({
    page: merchantPage,
    customerPage,
    pagaPage,
    api,
  }, testInfo) => {
    await payAndVerify(
      { merchantPage, customerPage, pagaPage, api },
      { amount: 1_000 }
    );
  });

  test("customer pays a random amount and taps I've made the transfer", async ({
    page: merchantPage,
    customerPage,
    pagaPage,
    api,
  }, testInfo) => {
    // A different amount every run (₦1,000-₦49,990 in steps of ₦10, so the reward is always a whole number of coins).
    const amount = randomAmountWithoutCoinLoss(1_000, 49_990);
    testInfo.annotations.push({ type: "amount", description: `₦${amount.toLocaleString()}` });

    await payAndVerify(
      { merchantPage, customerPage, pagaPage, api },
      { amount, tapMadeTransfer: true }
    );
  });

  test("customer pays an amount above the reward cap and the coins stop at ₦500 worth", async ({
    page: merchantPage,
    customerPage,
    pagaPage,
    api,
  }, testInfo) => {
    const result = await payAndVerify(
      { merchantPage, customerPage, pagaPage, api },
      { amount: 150_000 }
    );

    expect(result.rewardNaira, "the reward is capped").toBe(500);
    expect(result.coins, "500 naira of reward = 50,000 coins").toBe(50_000);
  });

  test("customer pays an amount whose reward is a fraction of a coin and the figures stay consistent", async ({
    page: merchantPage,
    customerPage,
    pagaPage,
    api,
  }, testInfo) => {
    // 0.5% of ₦12,345 is ₦61.725 = 6,172.5 coins: what the product does with the half coin is not documented,
    // so this checks that every screen agrees with the backend rather than guessing the rounding rule.
    await payAndVerify(
      { merchantPage, customerPage, pagaPage, api },
      { amount: 12_345, exactReward: false }
    );
  });

  test("an unpaid payment link shows as pending with no coins and is left out of the totals", async ({
    page,
    api,
  }) => {
    const transactions = new MerchantTransactionsPage(page);
    await api.login();
    const before = await merchantSnapshot(api);

    const reference = await test.step("Customer starts a payment but never pays (API)", async () => {
      const { status, body } = await api.createPaymentLink({
        phone: toApiPhone(env.testPhoneNumber!),
        slug: env.testStoreSlug,
        amount: "2500",
      });
      expect(status).toBe(201);
      return body.data.payment_link.transaction_id as string;
    });

    await test.step("Merchant lists it as pending, ₦2,500, with +0 coins", async () => {
      await expect(async () => {
        await transactions.open();
        const row = await transactions.findReference(reference);
        expect(row, "the pending payment is listed").toBeTruthy();
        expect(row).toMatchObject({ amount: 2500, coins: 0, status: "pending" });
      }).toPass({ timeout: 45_000, intervals: [3_000] });
    });

    await test.step("Unpaid money is not in revenue, the count, the coins or the balance", async () => {
      const after = await merchantSnapshot(api);
      const newlySuccessful = [...after.successful.keys()].filter((id) => !before.successful.has(id));

      // Anything else that turned successful in the meantime (another run) is accounted for; this payment isn't one.
      expect(newlySuccessful).not.toContain(reference);
      const paidElsewhere = newlySuccessful.reduce((sum, id) => sum + Number(after.successful.get(id).paid_amount_in_naira), 0);
      expect(after.revenue).toBe(before.revenue + paidElsewhere);
      expect(after.balance).toBe(before.balance + paidElsewhere);
    });
  });

  test.fixme(
    "should credit exactly 100 coins per ₦1 of reward for every amount, e.g. ₦1,740",
    pending(
      "Observed: a ₦1,740 payment records a reward of ₦8.70 but credits 869 coins; ₦8.70 is 870 coins. About 7% of amounts between ₦1,000 and ₦9,990 come out one coin short (a customer loses ₦0.01), which fits the coins being rounded down from a floating-point result (8.7 x 100 = 869.9999999999999). ₦12,345 shows the same one-coin gap. Expected: the coins equal 100 x the recorded reward. The random-amount tests skip the affected amounts so they don't fail at random."
    ),
    async ({ page: merchantPage, customerPage, pagaPage, api }) => {
      await payAndVerify({ merchantPage, customerPage, pagaPage, api }, { amount: 1_740 });
    }
  );

  test.fixme("a customer who sends the wrong amount is told, and is not rewarded for the difference", pending("Rule not confirmed: what should happen when the Paga deposit is smaller or larger than the requested amount (for example ₦3,000 or ₦7,000 sent to a ₦5,000 link)? Product needs to decide the customer message, the payment status, and whether coins follow the amount actually paid. Once known: create the link, send the different amount, and check the customer message, status, paid amount, coins, and the merchant's balance and revenue."), async () => {
  });

  test.fixme("a payment link that is not paid within 30 minutes expires", pending("Cannot be checked yet: payment links expire after 30 minutes, and QA has no shorter expiry or way to age a link. Once there is: check that the customer page says the link expired, the API returns expired and status \"expired\", the merchant list shows \"Expired\" with +0 coins, and a deposit to the expired account is not credited."), async () => {
  });
});
