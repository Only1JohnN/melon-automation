import { expect, Page, test } from "@playwright/test";
import { MelonApi } from "../api/MelonApi";
import { env } from "../config/environment";
import { PagaSimulatorPage } from "../pages/external/PagaSimulatorPage";
import { MerchantHomePage } from "../pages/partners/merchant/HomePage";
import { MerchantTransactionsPage } from "../pages/partners/merchant/TransactionsPage";
import { PayLinkPage } from "../pages/storefront/PayLinkPage";
import { expectedCoins, expectedRewardNaira } from "../test-data/constants/rewards";
import { localDateTime } from "./dates";
import { formatNaira } from "./money";

/** The merchant's numbers at one moment, plus which payments were already successful. */
export interface MerchantSnapshot {
  balance: number;
  revenue: number;
  transactions: number;
  customersRewarded: number;
  coinsAwarded: number;
  successful: Map<string, any>;
}

const successfulOf = (all: any[]) =>
  new Map(all.filter((t) => t.payment_status === "successful").map((t) => [t.transaction_id as string, t]));

const idsOf = (map: Map<string, any>) => [...map.keys()].sort().join(",");

/**
 * Reads the merchant's stats, wallet and successful payments so they all describe the same moment: if a payment
 * lands between the reads (another run paying the same merchant), it retries until they agree.
 */
export async function merchantSnapshot(api: MelonApi): Promise<MerchantSnapshot> {
  for (let attempt = 1; attempt <= 8; attempt++) {
    const first = successfulOf(await api.allTransactions());
    const overview = (await api.overview()).body.data;
    const wallet = (await api.wallet()).body.data;
    const second = successfulOf(await api.allTransactions());

    if (idsOf(first) === idsOf(second)) {
      return {
        balance: wallet.balance / 100, // the wallet API returns kobo
        revenue: overview.revenue.amount,
        transactions: overview.transactions.count,
        customersRewarded: overview.customers_rewarded.count,
        coinsAwarded: overview.customers_rewarded.coins_awarded,
        successful: second,
      };
    }

    await new Promise((resolve) => setTimeout(resolve, 1_500));
  }

  throw new Error("The merchant's numbers kept changing while taking a snapshot");
}

/** Naira to the kobo, so sums like 39.05 + 0 don't come out as 39.050000000000004. */
const money = (naira: number) => Math.round(naira * 100) / 100;

/** What the totals must be now, given the payments that turned successful since `before`. */
export function expectedTotals(before: MerchantSnapshot, now: MerchantSnapshot) {
  const added = [...now.successful.values()].filter((t) => !before.successful.has(t.transaction_id));
  const paid = added.reduce((sum, t) => sum + Number(t.paid_amount_in_naira), 0);
  const coins = added.reduce((sum, t) => sum + Number(t.reward_coin_amount ?? 0), 0);

  return {
    added,
    revenue: money(before.revenue + paid),
    transactions: before.transactions + added.length,
    coinsAwarded: before.coinsAwarded + coins,
    balance: money(before.balance + paid),
  };
}

export interface PaymentContext {
  merchantPage: Page;
  customerPage: Page;
  /** Any page in the merchant's browser context, used for the Paga simulator. */
  pagaPage: Page;
  api: MelonApi;
  /** Called at each screen so a caller can run extra checks (e.g. a layout audit) on it. */
  onScreen?: (page: Page, label: string) => Promise<void>;
}

export interface PaymentOptions {
  amount: number;
  /**
   * True (default): reward and coins must equal the documented rule (0.5%, capped at ₦500, 100 coins per ₦1).
   * False: for amounts whose reward isn't a whole number of coins the rounding isn't documented, so only internal
   * consistency is asserted (coins = 100 x the reward, within one coin) and the actual figures are then tracked.
   */
  exactReward?: boolean;
  /** Tap "I've made the transfer" after paying instead of waiting for the automatic check. */
  tapMadeTransfer?: boolean;
}

export interface PaymentResult {
  reference: string;
  accountNumber: string;
  coins: number;
  rewardNaira: number;
}

/**
 * The whole money loop, with the numbers taken BEFORE and checked AFTER on every surface:
 * customer pays -> Paga credits the account -> customer sees it -> the payment, the merchant's stats/balance,
 * the merchant's lists (home + transactions) and the customer's "payments completed" card all move by exactly
 * this payment. Anything that isn't instant is re-read after a refresh.
 */
export async function payAndVerify(context: PaymentContext, options: PaymentOptions): Promise<PaymentResult> {
  const { merchantPage, customerPage, pagaPage, api, onScreen } = context;
  const { amount } = options;
  const home = new MerchantHomePage(merchantPage);
  const transactions = new MerchantTransactionsPage(merchantPage);
  const pay = new PayLinkPage(customerPage);
  const simulator = new PagaSimulatorPage(pagaPage);

  const exact = options.exactReward ?? true;
  let rewardNaira = expectedRewardNaira(amount);
  let coins = expectedCoins(amount);
  const phone = env.testPhoneNumber!;

  await api.login();

  // ── Before ─────────────────────────────────────────────────────────────────
  const before = await test.step("BEFORE: the merchant's numbers (API)", () => merchantSnapshot(api));

  const customerCardBefore = await test.step("BEFORE: the customer's 'Payments completed' card", async () => {
    await pay.goto(env.testStoreSlug);
    await onScreen?.(customerPage, "pay link (before)");
    return pay.paymentsCompleted();
  });

  await test.step("BEFORE: the merchant dashboard shows those same numbers", async () => {
    await expect(async () => {
      await home.open();
      expect(await home.balance()).toBe(before.balance);
      await expect(home.statCard("Revenue").locator("h3")).toHaveText(formatNaira(before.revenue));
      expect(await home.statValue("Transactions")).toBe(before.transactions);
    }).toPass({ timeout: 45_000 });
  });

  // ── Customer pays ──────────────────────────────────────────────────────────
  await test.step(`Customer enters ₦${amount.toLocaleString()} and sees what they'll earn`, async () => {
    await pay.enterAmount(String(amount));
    if (exact) {
      await expect(pay.rewardText).toContainText(formatNaira(rewardNaira));
      expect(await pay.displayedRewardNaira()).toBe(rewardNaira);
    } else {
      expect(Math.abs((await pay.displayedRewardNaira()) - rewardNaira)).toBeLessThanOrEqual(0.01);
    }
    await onScreen?.(customerPage, "amount entered");
    await pay.continueToPay();
    await onScreen?.(customerPage, "phone step");
    await pay.enterPhoneNumber(phone);
  });

  const transfer = await pay.readTransferDetails();
  await onScreen?.(customerPage, "transfer details");

  await test.step("The payment starts as pending with no reward (API) and the merchant sees it as pending", async () => {
    const { body } = await api.paymentLink(transfer.reference);
    expect(body.data.payment_status).toBe("pending");
    expect(body.data.reward_coin_amount).toBeNull();
    expect(body.data.paid_amount_in_naira).toBeNull();
    expect(transfer.amount).toBe(amount);

    await expect(async () => {
      await transactions.open();
      const row = await transactions.findReference(transfer.reference);
      expect(row, "the pending payment is listed").toBeTruthy();
      expect(row).toMatchObject({ amount, coins: 0, status: "pending" });
    }).toPass({ timeout: 45_000, intervals: [3_000] });
  });

  // ── Paga credits the account ───────────────────────────────────────────────
  await simulator.simulateDeposit(transfer.accountNumber, amount);

  await test.step("Customer sees the payment confirmed with the coins earned", async () => {
    if (options.tapMadeTransfer) {
      await pay.madeTransferButton.click();
    }
    await pay.expectPaymentConfirmed(amount, exact ? rewardNaira : undefined);
    await pay.expectClaimCoinsCta();
    await onScreen?.(customerPage, "payment confirmed");
  });

  // ── After: the payment itself ──────────────────────────────────────────────
  await test.step("AFTER: the backend records it as successful with the right reward (API)", async () => {
    await expect
      .poll(async () => (await api.paymentLink(transfer.reference)).body.data.payment_status, { timeout: 60_000 })
      .toBe("successful");

    const payment = (await api.paymentLink(transfer.reference)).body.data;
    expect(Number(payment.paid_amount_in_naira)).toBe(amount);
    expect(payment.reward_status).toBe("successful");

    if (exact) {
      expect(Number(payment.reward_naira_amount)).toBe(rewardNaira);
      expect(payment.reward_coin_amount, "100 coins = ₦1 of reward").toBe(coins);
    } else {
      const actualReward = Number(payment.reward_naira_amount);
      // How far the coins are from 100 x the recorded reward (0 when they agree).
      const drift = money(payment.reward_coin_amount - actualReward * 100);
      expect(Number.isInteger(payment.reward_coin_amount), "coins are a whole number").toBe(true);
      expect(Math.abs(drift), "coins are within one coin of 100 x the reward").toBeLessThanOrEqual(1);
      expect(Math.abs(actualReward - rewardNaira), "reward is within a cent of 0.5%").toBeLessThanOrEqual(0.01);
      rewardNaira = actualReward;
      coins = payment.reward_coin_amount;
      test.info().annotations.push({
        type: "rounding",
        description: `₦${amount.toLocaleString()}: exact 0.5% is ₦${amount * 0.005}; the reward is recorded as ₦${actualReward} and ${coins} coins were credited.`,
      });

      // A one-coin gap isn't asserted away: it is written down so someone can say which figure is right.
      if (drift !== 0) {
        test.info().annotations.push({
          type: "needs-decision",
          description: `The reward is recorded as ₦${actualReward} but ${coins.toLocaleString()} coins were credited, which is ₦${coins / 100}: the two are rounded in different directions (exact reward ₦${amount * 0.005}). Which figure is intended?`,
        });
      }
    }
    expect(payment.rewarded_at).toBeTruthy();
    expect(payment.expired).toBe(false);
  });

  // ── After: the merchant's totals ───────────────────────────────────────────
  const after = await test.step("AFTER: every merchant total moved by exactly the payments that landed (API)", async () => {
    let snapshot!: MerchantSnapshot;

    await expect(async () => {
      snapshot = await merchantSnapshot(api);
      const expected = expectedTotals(before, snapshot);

      expect(expected.added.map((t) => t.transaction_id), "this payment counts as successful").toContain(transfer.reference);
      expect(snapshot.revenue, "revenue").toBe(expected.revenue);
      expect(snapshot.transactions, "transaction count").toBe(expected.transactions);
      expect(snapshot.coinsAwarded, "coins awarded").toBe(expected.coinsAwarded);
      expect(snapshot.balance, "wallet balance").toBe(expected.balance);
    }).toPass({ timeout: 90_000, intervals: [3_000] });

    return snapshot;
  });

  // ── After: what the merchant sees ──────────────────────────────────────────
  await test.step("AFTER: the merchant home shows the new numbers and the new transaction (refresh until it does)", async () => {
    await expect(async () => {
      await home.open();
      const fresh = await merchantSnapshot(api);

      expect(await home.balance()).toBe(fresh.balance);
      await expect(home.statCard("Revenue").locator("h3")).toHaveText(formatNaira(fresh.revenue));
      expect(await home.statValue("Transactions")).toBe(fresh.transactions);
      expect(await home.statValue("Customers rewarded")).toBe(fresh.customersRewarded);
      await expect(home.statCard("Customers rewarded")).toContainText(
        `${fresh.coinsAwarded.toLocaleString("en-US")} Coins awarded`
      );
    }).toPass({ timeout: 90_000, intervals: [4_000] });

    await onScreen?.(merchantPage, "merchant home (after)");
  });

  await test.step("AFTER: the merchant's transaction list shows this payment as successful with the right coins and date", async () => {
    await expect(async () => {
      await transactions.open();
      const row = await transactions.findReference(transfer.reference);
      expect(row, "the payment is listed").toBeTruthy();
      expect(row).toMatchObject({ amount, coins, status: "successful" });

      const stored = after.successful.get(transfer.reference);
      if (row!.date && /^\d{4}-/.test(row!.date)) {
        expect(row!.date, "Date Updated").toBe(localDateTime(stored.updated_at));
      }
    }).toPass({ timeout: 60_000, intervals: [4_000] });

    await onScreen?.(merchantPage, "merchant transactions (after)");
  });

  await test.step("AFTER: the customer's 'Payments completed' card counts it", async () => {
    await expect(async () => {
      await pay.goto(env.testStoreSlug);
      const now = await merchantSnapshot(api);
      expect(await pay.paymentsCompleted()).toBe(now.transactions);
      expect(now.transactions).toBeGreaterThanOrEqual(customerCardBefore + 1);
    }).toPass({ timeout: 60_000, intervals: [4_000] });
  });

  return { reference: transfer.reference, accountNumber: transfer.accountNumber, coins, rewardNaira };
}
