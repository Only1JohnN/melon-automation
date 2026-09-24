import { test, expect } from "../../fixtures/baseTest";
import { env } from "../../config/environment";
import { COINS_PER_NAIRA, expectedCoins, expectedRewardNaira, rewardIsHalfCoin } from "../../test-data/constants/rewards";
import { localIsoDate, addDays } from "../../utils/dates";

test.describe("@partners @api", () => {
  test("should log a merchant in and return a token, member and default business @smoke", async ({ api }) => {
    const { status, body } = await api.login();

    expect(status).toBe(200);
    expect(body.message).toBe("Logged in successfully");
    expect(body.data.token).toBeTruthy();
    expect(body.data.member.email).toBe(env.partnerEmail);
    expect(body.data.member.default_business).toMatch(/^[0-9a-f-]{36}$/);
    expect(body.data.member.verified).toBe(true);
    expect(body.data.member.profile_completed).toBe(true);
  });

  test("should refuse a wrong password", async ({ api }) => {
    const result = await (api as any).send("POST", "/auth/login-member", {
      data: { email: env.partnerEmail, password: "WrongPassword@999" },
      auth: false,
    });

    expect(result.status).toBeGreaterThanOrEqual(400);
    expect(result.status).toBeLessThan(500);
    expect(result.body.status).toBe("error");
    expect(result.body.data?.token).toBeUndefined();
  });

  test("should refuse an unknown account", async ({ api }) => {
    const result = await (api as any).send("POST", "/auth/login-member", {
      data: { email: "nobody.here@yopmail.com", password: "Password@12345" },
      auth: false,
    });

    expect(result.status).toBe(404);
    expect(result.body.message).toBe("User not found");
  });

  test("should reject merchant endpoints called without a token", async ({ api }) => {
    await api.login();
    const businessId = api.businessId;
    api.token = undefined;

    const overview = await (api as any).send("GET", `/simple-mode/business/${businessId}/overview`);
    const transactions = await (api as any).send("GET", `/simple-mode/business/${businessId}/transactions?page=1&limit=5`);
    const wallet = await (api as any).send("GET", `/wallets/businesses/${businessId}`);

    for (const result of [overview, transactions, wallet]) {
      expect([401, 403]).toContain(result.status);
    }
  });

  test("should return the overview figures the dashboard shows", async ({ api }) => {
    await api.login();
    const { status, body } = await api.overview();

    expect(status).toBe(200);
    const overview = body.data;
    expect(typeof overview.revenue.amount).toBe("number");
    expect(Number.isInteger(overview.transactions.count)).toBe(true);
    expect(Number.isInteger(overview.customers_rewarded.count)).toBe(true);
    expect(Number.isInteger(overview.customers_rewarded.coins_awarded)).toBe(true);
    expect(overview.repeat_customers.repeat_percentage).toBeGreaterThanOrEqual(0);
    expect(overview.repeat_customers.repeat_percentage).toBeLessThanOrEqual(100);
    expect(overview.customers_rewarded.count).toBeLessThanOrEqual(overview.transactions.count);
  });

  test("should narrow the overview to a date range", async ({ api }) => {
    await api.login();
    const today = new Date().toISOString().slice(0, 10);
    const monthStart = `${today.slice(0, 8)}01`;

    const allTime = (await api.overview()).body.data;
    const month = await api.overviewBetween(monthStart, today);
    const day = await api.overviewBetween(today, today);

    expect(month.status).toBe(200);
    expect(day.status).toBe(200);
    expect(day.body.data.revenue.amount).toBeLessThanOrEqual(month.body.data.revenue.amount);
    expect(month.body.data.revenue.amount).toBeLessThanOrEqual(allTime.revenue.amount);
    expect(day.body.data.transactions.count).toBeLessThanOrEqual(allTime.transactions.count);
  });

  test("should page through transactions, newest first", async ({ api }) => {
    await api.login();
    const first = await api.transactions(1, 10);
    const second = await api.transactions(2, 10);

    expect(first.status).toBe(200);
    expect(first.body.data.results.length).toBeLessThanOrEqual(10);
    expect(first.body.data.paginate).toBeTruthy();

    const firstIds = first.body.data.results.map((t: any) => t.transaction_id);
    const secondIds = second.body.data.results.map((t: any) => t.transaction_id);
    expect(secondIds.filter((id: string) => firstIds.includes(id))).toEqual([]);

    const dates = first.body.data.results.map((t: any) => new Date(t.created_at).getTime());
    expect([...dates].sort((a, b) => b - a)).toEqual(dates);
  });

  test("should reward exactly 100 coins per ₦1 of reward on every successful payment, and nothing otherwise", async ({
    api,
  }) => {
    await api.login();
    const all: any[] = [];
    for (let page = 1; page <= 5; page++) {
      const { body } = await api.transactions(page, 20);
      all.push(...body.data.results);
      if (body.data.results.length < 20) break;
    }
    expect(all.length).toBeGreaterThan(0);

    const halfCoinPayments: string[] = [];

    for (const t of all) {
      if (t.payment_status === "successful") {
        const paid = Number(t.paid_amount_in_naira);
        expect(paid, `${t.transaction_id} paid amount`).toBe(Number(t.requesting_amount_in_naira));
        expect(t.reward_status).toBe("successful");

        if (rewardIsHalfCoin(paid)) {
          // The exact reward is half a coin over: the product's two figures may differ by one coin (see the note).
          expect(Math.abs(t.reward_coin_amount - expectedCoins(paid)), `${t.transaction_id} coins`).toBeLessThanOrEqual(1);
          expect(Math.abs(Number(t.reward_naira_amount) - expectedRewardNaira(paid)), `${t.transaction_id} reward ₦`).toBeLessThanOrEqual(0.01);

          const creditedNaira = t.reward_coin_amount / COINS_PER_NAIRA;
          if (Math.abs(creditedNaira - Number(t.reward_naira_amount)) > 1e-9) {
            halfCoinPayments.push(
              `${t.transaction_id}: ₦${paid.toLocaleString()} -> reward recorded ₦${t.reward_naira_amount} but ${t.reward_coin_amount} coins credited (₦${creditedNaira})`
            );
          }
        } else {
          expect(t.reward_coin_amount, `${t.transaction_id} coins`).toBe(expectedCoins(paid));
          expect(Number(t.reward_naira_amount), `${t.transaction_id} reward ₦`).toBe(expectedRewardNaira(paid));
        }
      } else {
        expect(["pending", "expired", "failed"], `${t.transaction_id} status`).toContain(t.payment_status);
        expect(t.reward_coin_amount ?? 0, `${t.transaction_id} coins`).toBe(0);
      }
    }

    if (halfCoinPayments.length > 0) {
      test.info().annotations.push({
        type: "needs-decision",
        description: `The reward in naira and the coins credited differ by one coin when the exact reward is half a coin (the naira figure rounds up, the coins round down). Which is intended? ${halfCoinPayments.join("; ")}`,
      });
    }
  });

  test("should report totals that equal the sum of the merchant's own successful payments", async ({ api }) => {
    await api.login();

    // Take the transactions and the overview at one consistent moment (another run may pay this merchant).
    let successful: any[] = [];
    let overview: any;
    for (let attempt = 0; attempt < 6; attempt++) {
      const first = (await api.allTransactions()).filter((t) => t.payment_status === "successful");
      overview = (await api.overview()).body.data;
      const second = (await api.allTransactions()).filter((t) => t.payment_status === "successful");
      successful = second;
      if (first.length === second.length) break;
    }

    const paid = successful.reduce((sum, t) => sum + Number(t.paid_amount_in_naira), 0);
    const coins = successful.reduce((sum, t) => sum + Number(t.reward_coin_amount ?? 0), 0);
    const customers = new Set(successful.map((t) => t.customer_id));

    expect(overview.transactions.count, "transactions = successful payments").toBe(successful.length);
    expect(overview.revenue.amount, "revenue = sum of paid amounts").toBe(paid);
    expect(overview.customers_rewarded.coins_awarded, "coins awarded = sum of rewards").toBe(coins);
    expect(overview.customers_rewarded.count, "customers rewarded = distinct paying customers").toBe(customers.size);
  });

  test("should only count a payment in the totals once it is successful", async ({ api }) => {
    await api.login();
    const all = await api.allTransactions();

    const unpaid = all.filter((t) => t.payment_status !== "successful");
    expect(unpaid.length, "the merchant has pending/expired payments to check").toBeGreaterThan(0);

    for (const t of unpaid) {
      expect(t.paid_amount_in_naira, `${t.transaction_id} (${t.payment_status}) has not been paid`).toBeNull();
      expect(t.reward_coin_amount ?? null, `${t.transaction_id} has no coins`).toBeNull();
    }
  });

  test("should give every customer of a payment a name and phone number", async ({ api }) => {
    await api.login();

    for (const t of (await api.transactions(1, 20)).body.data.results) {
      expect(t.customer.first_name, `${t.transaction_id} customer name`).toBeTruthy();
      expect(t.customer.phone_number, `${t.transaction_id} customer phone`).toMatch(/^\d{10}$/);
      expect(t.customer_id).toBe(t.customer.id);
    }
  });

  test("should filter transactions by a date range", async ({ api }) => {
    await api.login();
    const start = localIsoDate(addDays(new Date(), -30));
    const end = localIsoDate(new Date());

    const { status, body } = await api.transactionsQuery(`page=1&limit=50&startDate=${start}&endDate=${end}`);
    expect(status).toBe(200);

    const day = 24 * 60 * 60 * 1000;
    for (const t of body.data.results) {
      const when = Math.max(Date.parse(t.created_at), Date.parse(t.updated_at));
      expect(when, `${t.transaction_id} falls inside the range (±1 day for timezones)`).toBeGreaterThanOrEqual(Date.parse(start) - day);
      expect(when).toBeLessThanOrEqual(Date.parse(end) + 2 * day);
    }
  });

  test("should filter and search withdrawals", async ({ api }) => {
    await api.login();
    const all = (await api.withdrawals(1, 50)).body.data.results as any[];
    test.skip(all.length === 0, "No withdrawals to filter");

    const failed = await (api as any).send("GET", `/wallets/withdrawals/${api.businessId}?page=1&limit=50&status=failed`);
    expect(failed.status).toBe(200);
    for (const w of failed.body.data.results) expect(String(w.status).toLowerCase()).toBe("failed");

    const reference = all[0].transaction_id ?? all[0].reference;
    const found = await (api as any).send("GET", `/wallets/withdrawals/${api.businessId}?page=1&limit=50&search=${reference}`);
    expect(found.status).toBe(200);
    expect(found.body.data.results.map((w: any) => w.transaction_id ?? w.reference)).toEqual([reference]);

    const none = await (api as any).send("GET", `/wallets/withdrawals/${api.businessId}?page=1&limit=50&search=NO-SUCH-REFERENCE-000`);
    expect(none.body.data.results).toEqual([]);
  });

  test("should list the linked withdrawal bank accounts and the banks that can be added", async ({ api }) => {
    await api.login();
    const accounts = await api.accounts();
    const banks = await api.banks();

    expect(accounts.status).toBe(200);
    for (const account of accounts.body.data.result) {
      expect(["pending", "verified", "deactivated"]).toContain(account.status);
      expect(account.account_number).toMatch(/^\d{10}$/);
      expect(account.bank_name).toBeTruthy();
    }

    expect(banks.status).toBe(200);
    expect(banks.body.data.banks.length).toBeGreaterThan(50);
    for (const bank of banks.body.data.banks.slice(0, 10)) {
      expect(bank.name).toBeTruthy();
      expect(bank.uuid).toMatch(/^[0-9A-F-]{36}$/i);
    }
  });

  test("should return the merchant wallet in kobo", async ({ api }) => {
    await api.login();
    const { status, body } = await api.wallet();
    const business = (await api.business()).body.data;

    expect(status).toBe(200);
    expect(Number.isInteger(body.data.balance)).toBe(true);
    expect(body.data.account_name).toBe(business.details.name);
    expect(body.data.provider).toBe("paga");
    expect(body.data.account_number).toMatch(/^\d{10}$/);
  });

  test("should return the business and personal profile", async ({ api }) => {
    await api.login();
    const business = await api.business();
    const personal = await api.personal();

    expect(business.status).toBe(200);
    expect(business.body.data.details.slug).toBe(env.testStoreSlug);
    expect(business.body.data.details.type).toBe("registered");

    expect(personal.status).toBe(200);
    expect(personal.body.data.email).toBe(env.partnerEmail);
    expect(personal.body.data.phone_verified).toBe(true);
    expect(personal.body.data.profile_completed).toBe(true);
  });

  test("should list an active payment QR code for the reward link", async ({ api }) => {
    await api.login();
    const { status, body } = await api.qrCodes();
    expect(status).toBe(200);

    const link = `${env.storefrontUrl}/pay/${env.testStoreSlug}`;
    const active = body.data.results.filter((q: any) => q.status === "active" && q.qr_type === "payment");

    expect(active.length).toBeGreaterThan(0);
    for (const qr of active) {
      expect(qr.qr_data).toBe(link);
      expect(qr.qr_image_url).toMatch(/^https:\/\/.+\.png$/);
      expect(typeof qr.scan_count).toBe("number");
    }
  });

  test("should return the withdrawal history", async ({ api }) => {
    await api.login();
    const { status, body } = await api.withdrawals(1, 10);

    expect(status).toBe(200);
    expect(Array.isArray(body.data.results)).toBe(true);
    expect(body.data.paginate).toBeTruthy();
  });
});
