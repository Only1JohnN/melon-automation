import { PayLinkPage } from "../../../pages/storefront/PayLinkPage";
import { PagaSimulatorPage } from "../../../pages/external/PagaSimulatorPage";
import { MerchantHomePage } from "../../../pages/partners/merchant/HomePage";
import { MerchantTransactionsPage } from "../../../pages/partners/merchant/TransactionsPage";
import { test, expect } from "../../../fixtures/baseTest";
import { env } from "../../../config/environment";
import { toApiPhone } from "../../../api/MelonApi";
import { attachNetworkLogger } from "../../../utils/networkLogger";
import { expectedCoins, expectedRewardNaira } from "../../../test-data/constants/rewards";
import { formatNaira } from "../../../utils/money";

const SLUG = env.testStoreSlug;
const PAYMENT_AMOUNT = 5000;

// @partners + @storefront: the flow spans both, so the results dashboard counts it under each application.
test.describe("@e2e @payment @partners @storefront", () => {
  test.skip(!env.testPhoneNumber, "Set TEST_PHONE_NUMBER to a phone number already registered with Melon.");
  test.setTimeout(240_000);

  test("customer pays by bank transfer and the payment reaches the merchant everywhere @smoke", async ({
    page: merchantPage,
    customerPage,
    api,
  }, testInfo) => {
    const home = new MerchantHomePage(merchantPage);
    const transactions = new MerchantTransactionsPage(merchantPage);
    const pay = new PayLinkPage(customerPage);

    const paga = await merchantPage.context().newPage();
    attachNetworkLogger(paga, testInfo.testId, "paga");
    const simulator = new PagaSimulatorPage(paga);

    const reward = expectedRewardNaira(PAYMENT_AMOUNT);
    const coins = expectedCoins(PAYMENT_AMOUNT);

    // Aggregates only ever go up (other runs may pay this merchant too), so they're checked as ">= before + this payment".
    const before = await test.step("Merchant baseline (API): balance, revenue, transactions, coins", async () => {
      await api.login();
      const overview = (await api.overview()).body.data;
      const wallet = (await api.wallet()).body.data;
      return {
        balance: wallet.balance / 100,
        revenue: overview.revenue.amount,
        transactions: overview.transactions.count,
        coinsAwarded: overview.customers_rewarded.coins_awarded,
      };
    });

    await test.step("Customer opens the pay link, sees the coins they'll earn and asks to pay", async () => {
      await pay.goto(SLUG);
      await pay.enterAmount(String(PAYMENT_AMOUNT));
      await expect(pay.rewardText).toContainText(formatNaira(reward));
      await pay.continueToPay();
      await pay.enterPhoneNumber(env.testPhoneNumber!);
    });

    const transfer = await pay.readTransferDetails();

    await test.step("Payment starts as pending with no reward yet (API)", async () => {
      const { body } = await api.paymentLink(transfer.reference);
      expect(body.data.payment_status).toBe("pending");
      expect(body.data.reward_coin_amount).toBeNull();
      expect(body.data.paid_amount_in_naira).toBeNull();
    });

    await simulator.simulateDeposit(transfer.accountNumber, PAYMENT_AMOUNT);

    await test.step("Customer page confirms the payment and the coins earned", async () => {
      await pay.expectPaymentConfirmed(PAYMENT_AMOUNT, reward);
      await expect(customerPage.getByRole("link", { name: /back to melon qa bot/i }).or(
        customerPage.getByRole("button", { name: /back to melon qa bot/i })
      )).toBeVisible();
    });

    await test.step("Backend records it as successful with the right reward (API)", async () => {
      await expect
        .poll(async () => (await api.paymentLink(transfer.reference)).body.data.payment_status, { timeout: 60_000 })
        .toBe("successful");

      const { body } = await api.paymentLink(transfer.reference);
      const payment = body.data;
      expect(Number(payment.paid_amount_in_naira)).toBe(PAYMENT_AMOUNT);
      expect(payment.reward_status).toBe("successful");
      expect(payment.reward_coin_amount, "100 coins = ₦1 of reward").toBe(coins);
      expect(Number(payment.reward_naira_amount)).toBe(reward);
      expect(payment.rewarded_at).toBeTruthy();
      expect(payment.expired).toBe(false);
    });

    await test.step("Merchant sees the transaction, with customer, amount, coins and status (API)", async () => {
      const { body } = await api.transactions(1, 20);
      const mine = body.data.results.find((t: any) => t.transaction_id === transfer.reference);

      expect(mine, "transaction is in the merchant's list").toBeTruthy();
      expect(mine.payment_status).toBe("successful");
      expect(mine.reward_coin_amount).toBe(coins);
      expect(mine.customer.phone_number).toBe(toApiPhone(env.testPhoneNumber!));
    });

    await test.step("Merchant dashboard home shows the new transaction as Successful with its coins", async () => {
      await expect(async () => {
        await home.open();
        const row = home.rowFor(transfer.reference);
        await expect(row).toHaveCount(1);
        expect(await home.readRow(row)).toMatchObject({
          reference: transfer.reference,
          amount: PAYMENT_AMOUNT,
          coins,
          status: "successful",
        });
      }).toPass({ timeout: 60_000, intervals: [3_000] });
    });

    await test.step("Merchant balance, revenue, transaction count and coins all went up", async () => {
      expect(await home.balance()).toBeGreaterThanOrEqual(before.balance + PAYMENT_AMOUNT);

      const after = (await api.overview()).body.data;
      expect(after.revenue.amount).toBeGreaterThanOrEqual(before.revenue + PAYMENT_AMOUNT);
      expect(after.transactions.count).toBeGreaterThanOrEqual(before.transactions + 1);
      expect(after.customers_rewarded.coins_awarded).toBeGreaterThanOrEqual(before.coinsAwarded + coins);

      await expect(home.statCard("Revenue").locator("h3")).toHaveText(formatNaira(after.revenue.amount));
      expect(await home.statValue("Transactions")).toBe(after.transactions.count);
      expect(await home.statValue("Customers rewarded")).toBe(after.customers_rewarded.count);
      await expect(home.statCard("Repeat customers")).toContainText(
        `${after.repeat_customers.repeat_percentage}% returned to pay again`
      );
    });

    await test.step("The Transactions page lists it too", async () => {
      await transactions.open();
      await expect(transactions.rows.filter({ hasText: transfer.reference })).toHaveCount(1);
    });

    await test.step("The customer's 'Payments completed on Melon' card counts it", async () => {
      await customerPage.goto(`${env.storefrontUrl}/pay/${SLUG}`);
      await expect(pay.amountInput).toBeVisible();
      const after = (await api.overview()).body.data.transactions.count;
      expect(await pay.paymentsCompleted()).toBeGreaterThanOrEqual(before.transactions + 1);
      expect(Math.abs((await pay.paymentsCompleted()) - after)).toBeLessThanOrEqual(2);
    });
  });

  test("an unpaid payment link shows as pending with no coins on the merchant side", async ({
    page,
    api,
  }) => {
    const transactions = new MerchantTransactionsPage(page);
    const home = new MerchantHomePage(page);

    const created = await test.step("Customer starts a payment but never pays (API)", async () => {
      const { status, body } = await api.createPaymentLink({
        phone: toApiPhone(env.testPhoneNumber!),
        slug: SLUG,
        amount: "2500",
      });
      expect(status).toBe(201);
      return body.data.payment_link.transaction_id as string;
    });

    await api.login();

    await test.step("Merchant lists it as pending, ₦2,500, with +0 coins", async () => {
      await expect(async () => {
        await transactions.open();
        const row = transactions.rows.filter({ hasText: created });
        await expect(row).toHaveCount(1);
        expect(await home.readRow(row)).toMatchObject({
          amount: 2500,
          coins: 0,
          status: "pending",
        });
      }).toPass({ timeout: 45_000, intervals: [3_000] });
    });

    await test.step("Unpaid money is not in the merchant's revenue (API)", async () => {
      const { body } = await api.transactions(1, 20);
      const mine = body.data.results.find((t: any) => t.transaction_id === created);
      expect(mine.payment_status).toBe("pending");
      expect(mine.paid_amount_in_naira).toBeNull();
    });
  });

  test.fixme("a customer who sends the wrong amount is told, and is not rewarded for the difference", async () => {
    // TODO(qa): not explored yet — what should happen when the Paga deposit is smaller or larger than the
    // requested amount (e.g. ₦3,000 sent to a ₦5,000 link, or ₦7,000)? Ask product for the rule, then:
    // create the link, simulate the different amount, and assert the customer message, payment_status
    // (partial/successful/failed), paid_amount_in_naira, the coins (should follow what was actually paid)
    // and the merchant balance/revenue.
  });

  test.fixme("a payment link that is not paid within 30 minutes expires", async () => {
    // TODO(qa): needs either a shorter expiry on QA or a way to age a link. Assert: after expiry the customer
    // page says the link expired, the API returns expired=true / payment_status "expired", the merchant list
    // shows "Expired" with +0 coins, and a deposit to the dead account is not credited.
  });
});
