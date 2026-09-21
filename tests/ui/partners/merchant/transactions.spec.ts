import { MerchantHomePage } from "../../../../pages/partners/merchant/HomePage";
import { MerchantTransactionsPage } from "../../../../pages/partners/merchant/TransactionsPage";
import { test, expect } from "../../../../fixtures/baseTest";
import { expectedCoins } from "../../../../test-data/constants/rewards";
import { formatNaira } from "../../../../utils/money";

const DAY = 24 * 60 * 60 * 1000;
const isoDate = (d: Date) => d.toISOString().slice(0, 10);

test.describe("@partners @transactions", () => {
  test("should list transactions with customer, reference, amount, coins and status @smoke", async ({
    page,
  }) => {
    const transactions = new MerchantTransactionsPage(page);
    await transactions.open();

    for (const column of ["Customer", "Reference", "Amount", "Reward (Coins)", "Status"]) {
      await expect(page.getByRole("columnheader", { name: column })).toBeVisible();
    }
    await expect(transactions.historyTab).toBeVisible();
    await expect(transactions.withdrawalsTab).toBeVisible();
  });

  test("should show the first page of transactions exactly as the API returns it", async ({
    page,
    api,
  }) => {
    const transactions = new MerchantTransactionsPage(page);
    const home = new MerchantHomePage(page);
    await transactions.open();

    await api.login();
    const { status, body } = await api.transactions(1, 10);
    expect(status).toBe(200);
    const expected = body.data.results;

    await expect(transactions.rows).toHaveCount(expected.length);
    for (const [index, transaction] of expected.entries()) {
      const row = await home.readRow(transactions.rows.nth(index));
      expect(row.reference).toBe(transaction.transaction_id);
      expect(row.amount).toBe(Number(transaction.requesting_amount_in_naira));
      expect(row.status).toBe(transaction.payment_status);
    }
  });

  test("should only use known statuses and reward coins only on successful payments", async ({
    page,
  }) => {
    const transactions = new MerchantTransactionsPage(page);
    const home = new MerchantHomePage(page);
    await transactions.open();

    const count = await transactions.rows.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const row = await home.readRow(transactions.rows.nth(i));

      await test.step(`${row.reference}: ${row.status}, ₦${row.amount}, ${row.coins} coins`, async () => {
        expect(["successful", "pending", "expired", "failed"]).toContain(row.status);

        if (row.status === "successful") {
          // 100 coins = ₦1 of reward
          expect(row.coins).toBe(expectedCoins(row.amount));
        } else {
          expect(row.coins).toBe(0);
        }
      });
    }
  });

  test("should move between pages of transactions", async ({ page }) => {
    const transactions = new MerchantTransactionsPage(page);
    await transactions.open();

    const firstOnPageOne = await transactions.firstReference();

    const next = await transactions.goToNextPage();
    expect(next.status()).toBe(200);
    await expect.poll(() => transactions.firstReference()).not.toBe(firstOnPageOne);

    const previous = await transactions.goToPreviousPage();
    expect(previous.status()).toBe(200);
    await expect.poll(() => transactions.firstReference()).toBe(firstOnPageOne);
  });

  test("should filter the stats by day, week and month and match the API for each range", async ({
    page,
  }) => {
    const home = new MerchantHomePage(page);
    const transactions = new MerchantTransactionsPage(page);
    await transactions.open();

    const today = new Date();

    for (const range of ["daily", "weekly", "monthly"] as const) {
      await test.step(`Range: ${range}`, async () => {
        const response = await transactions.selectRange(range);
        expect(response.status()).toBe(200);

        const params = new URL(response.url()).searchParams;
        const start = new Date(params.get("startDate")!);
        const end = new Date(params.get("endDate")!);
        const stats = (await response.json()).data;

        if (range === "daily") {
          expect(params.get("startDate")).toBe(isoDate(today));
          expect(params.get("endDate")).toBe(isoDate(today));
        }
        if (range === "weekly") {
          expect((end.getTime() - start.getTime()) / DAY).toBe(6);
        }
        if (range === "monthly") {
          expect(params.get("startDate")).toBe(isoDate(new Date(Date.UTC(today.getFullYear(), today.getMonth(), 1))));
          expect(params.get("endDate")).toBe(isoDate(new Date(Date.UTC(today.getFullYear(), today.getMonth() + 1, 0))));
        }

        await expect(home.statCard("Revenue").locator("h3")).toHaveText(formatNaira(stats.revenue.amount));
        await expect.poll(() => home.statValue("Transactions")).toBe(stats.transactions.count);
        await expect.poll(() => home.statValue("Customers rewarded")).toBe(stats.customers_rewarded.count);
      });
    }
  });

  test("should show all-time stats by default (no date range applied)", async ({ page, api }) => {
    const home = new MerchantHomePage(page);
    const overviewCall = page.waitForResponse((r) => /\/overview/.test(r.url()));

    await new MerchantTransactionsPage(page).open();

    expect(new URL((await overviewCall).url()).searchParams.has("startDate")).toBe(false);

    await api.login();
    const { body } = await api.overview();
    await expect(home.statCard("Revenue").locator("h3")).toHaveText(formatNaira(body.data.revenue.amount));
  });

  test("should show the withdrawal history from the withdrawals API", async ({ page, api }) => {
    const transactions = new MerchantTransactionsPage(page);
    await transactions.open();

    const [response] = await Promise.all([
      page.waitForResponse((r) => /\/wallets\/withdrawals\//.test(r.url())),
      transactions.openWithdrawals(),
    ]);
    expect(response.status()).toBe(200);
    const withdrawals = (await response.json()).data.results;

    for (const column of ["Date", "Reference", "Bank Account", "Amount", "Status"]) {
      await expect(page.getByRole("columnheader", { name: column })).toBeVisible();
    }
    await expect(transactions.rows).toHaveCount(withdrawals.length);
    await expect(page.getByText("All Statuses")).toBeVisible();
    void api;
  });

  test.fixme("should filter transactions by a chosen date", async ({ page }) => {
    // TODO(qa): the "Date" button above the table hasn't been walked through yet (date picker). Cover:
    // pick a date -> transactions API is called with that date -> only that day's rows are listed.
    const transactions = new MerchantTransactionsPage(page);
    await transactions.open();
    await page.getByRole("button", { name: "Date" }).click();
  });
});
