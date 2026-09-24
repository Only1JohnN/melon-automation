import { MerchantHomePage } from "../../../../pages/partners/merchant/HomePage";
import { MerchantTransactionsPage } from "../../../../pages/partners/merchant/TransactionsPage";
import { test, expect } from "../../../../fixtures/baseTest";
import { expectedCoins } from "../../../../test-data/constants/rewards";
import { formatNaira } from "../../../../utils/money";
import { localDateTime, localIsoDate } from "../../../../utils/dates";
import { layoutOf } from "../../../../utils/responsive";

const DAY = 24 * 60 * 60 * 1000;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const pad = (n: number) => String(n).padStart(2, "0");

/** "2026-09-10" -> "10 Sep 2026", how the period picker labels a chosen range. */
function rangeLabel(isoStart: string, isoEnd: string) {
  const part = (iso: string) => {
    const [y, m, d] = iso.split("-").map(Number);
    return `${pad(d)} ${MONTHS[m - 1]} ${y}`;
  };
  return `${part(isoStart)} – ${part(isoEnd)}`;
}

/** The first calendar month is always the current one; days 4-27 exist exactly once on it. */
function daysOfThisMonth(from: number, to: number) {
  const now = new Date();
  const prefix = `${now.getFullYear()}-${pad(now.getMonth() + 1)}`;
  return { start: `${prefix}-${pad(from)}`, end: `${prefix}-${pad(to)}` };
}

test.describe("@partners @transactions", () => {
  test("should list transactions with customer, reference, amount, coins, date and status @smoke", async ({
    page,
  }) => {
    const transactions = new MerchantTransactionsPage(page);
    await transactions.open();

    await expect(transactions.historyTab).toBeVisible();
    await expect(transactions.withdrawalsTab).toBeVisible();

    if (!(await transactions.transactions.usesCards())) {
      await test.step("Table layout: the expected columns, in a sensible order", async () => {
        const headers = await transactions.transactions.headers();
        for (const column of ["customer", "reference", "amount", "reward", "date", "status"]) {
          expect(headers.some((h) => h.includes(column)), `a "${column}" column`).toBe(true);
        }
      });
    }

    const [first] = await transactions.transactions.records(1);
    expect(first.reference).toMatch(/^MELON-\d+$/);
    expect(first.customer.length).toBeGreaterThan(0);
    expect(first.amount).toBeGreaterThan(0);
    expect(first.date, "each transaction shows when it was last updated").toBeTruthy();
    expect(["successful", "pending", "expired", "failed"]).toContain(first.status);
  });

  test("should show the first page of transactions exactly as the API returns it", async ({ page, api }) => {
    const transactions = new MerchantTransactionsPage(page);
    await api.login();

    await expect(async () => {
      await transactions.open();
      const expected = (await api.transactions(1, 10)).body.data.results;
      const shown = await transactions.transactions.records();

      expect(shown.map((t) => t.reference)).toEqual(expected.map((t: any) => t.transaction_id));

      for (const [index, transaction] of expected.entries()) {
        expect(shown[index].amount, `${shown[index].reference} amount`).toBe(Number(transaction.requesting_amount_in_naira));
        expect(shown[index].status, `${shown[index].reference} status`).toBe(transaction.payment_status);
        if (/^\d{4}-/.test(shown[index].date ?? "")) {
          expect(shown[index].date, `${shown[index].reference} date updated`).toBe(localDateTime(transaction.updated_at));
        }
      }
    }).toPass({ timeout: 45_000 });
  });

  test("should only use known statuses and reward coins only on successful payments (100 coins = ₦1)", async ({
    page,
  }) => {
    const transactions = new MerchantTransactionsPage(page);
    await transactions.open();

    // Rows can appear a moment before their cells are filled in, so wait until every row has a status.
    let records = await transactions.transactions.records();
    await expect(async () => {
      records = await transactions.transactions.records();
      expect(records.length).toBeGreaterThan(0);
      expect(records.filter((row) => !row.status)).toEqual([]);
    }).toPass({ timeout: 15_000 });

    for (const row of records) {
      await test.step(`${row.reference}: ${row.status}, ₦${row.amount}, ${row.coins} coins`, async () => {
        expect(["successful", "pending", "expired", "failed"]).toContain(row.status);

        if (row.status === "successful") {
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

    const next = await transactions.goToPage(2);
    expect(next.status()).toBe(200);
    await expect.poll(() => transactions.firstReference()).not.toBe(firstOnPageOne);

    const previous = await transactions.goToPage(1);
    expect(previous.status()).toBe(200);
    await expect.poll(() => transactions.firstReference()).toBe(firstOnPageOne);
  });

  test("should filter the stats by day, week and month and match the API for each range", async ({ page }) => {
    const home = new MerchantHomePage(page);
    const transactions = new MerchantTransactionsPage(page);
    await transactions.open();

    await expect(transactions.rangeControl).toHaveText(/all time/i);
    const today = new Date();

    for (const range of ["daily", "weekly", "monthly"] as const) {
      await test.step(`Range: ${range}`, async () => {
        const response = await transactions.selectRange(range);
        expect(response.status()).toBe(200);

        const params = new URL(response.url()).searchParams;
        const start = params.get("startDate")!;
        const end = params.get("endDate")!;
        const stats = (await response.json()).data;

        if (range === "daily") {
          expect(start).toBe(localIsoDate(today));
          expect(end).toBe(localIsoDate(today));
        }
        if (range === "weekly") {
          expect((Date.parse(end) - Date.parse(start)) / DAY).toBe(6);
          expect(Date.parse(start)).toBeLessThanOrEqual(Date.parse(localIsoDate(today)));
          expect(Date.parse(end)).toBeGreaterThanOrEqual(Date.parse(localIsoDate(today)));
        }
        if (range === "monthly") {
          expect(start).toBe(`${today.getFullYear()}-${pad(today.getMonth() + 1)}-01`);
          expect(end).toBe(localIsoDate(new Date(today.getFullYear(), today.getMonth() + 1, 0)));
        }

        await expect(transactions.rangeControl).toHaveText(rangeLabel(start, end));
        await expect(home.statCard("Revenue").locator("h3")).toHaveText(formatNaira(stats.revenue.amount));
        await expect.poll(() => home.statValue("Transactions")).toBe(stats.transactions.count);
        await expect.poll(() => home.statValue("Customers rewarded")).toBe(stats.customers_rewarded.count);
      });
    }
  });

  test("should filter the stats by a custom range picked on the calendar", async ({ page }) => {
    const home = new MerchantHomePage(page);
    const transactions = new MerchantTransactionsPage(page);
    await transactions.open();

    const { start, end } = daysOfThisMonth(10, 12);

    await transactions.openRangeControl();
    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().includes("/overview?") && r.url().includes(`endDate=${end}`)),
      transactions.pickDays(10, 12),
    ]);

    expect(new URL(response.url()).searchParams.get("startDate")).toBe(start);
    const stats = (await response.json()).data;

    await expect(transactions.rangeControl).toHaveText(rangeLabel(start, end));
    await expect(home.statCard("Revenue").locator("h3")).toHaveText(formatNaira(stats.revenue.amount));
  });

  test("should show all-time stats by default (no date range applied)", async ({ page, api }) => {
    const home = new MerchantHomePage(page);
    const overviewCall = page.waitForResponse((r) => /\/overview/.test(r.url()));

    await new MerchantTransactionsPage(page).open();

    expect(new URL((await overviewCall).url()).searchParams.has("startDate")).toBe(false);

    await api.login();
    await expect(async () => {
      const { body } = await api.overview();
      await expect(home.statCard("Revenue").locator("h3")).toHaveText(formatNaira(body.data.revenue.amount), { timeout: 3_000 });
    }).toPass({ timeout: 30_000 });
  });

  test("should narrow the list to a chosen date range and match the API for that range", async ({ page, api }) => {
    const transactions = new MerchantTransactionsPage(page);
    await transactions.open();
    await api.login();

    const { start, end } = daysOfThisMonth(20, 22);

    await transactions.openDateFilter();
    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().includes("/transactions?") && r.url().includes(`endDate=${end}`)),
      transactions.pickDays(20, 22),
    ]);
    expect(response.status()).toBe(200);
    expect(new URL(response.url()).searchParams.get("startDate")).toBe(start);

    await page.keyboard.press("Escape");

    const expected = (await api.transactionsQuery(`page=1&limit=10&startDate=${start}&endDate=${end}`)).body.data.results;

    await expect
      .poll(async () => (await transactions.transactions.records()).map((t) => t.reference), { timeout: 20_000 })
      .toEqual(expected.map((t: any) => t.transaction_id));

    for (const row of await transactions.transactions.records()) {
      const day = Number((row.date ?? "").match(/(\d{4}-\d{2}-(\d{2}))|([A-Z][a-z]{2} (\d{1,2}), \d{4})/)?.[2] ?? (row.date ?? "").match(/ (\d{1,2}),/)?.[1] ?? 0);
      expect(day, `${row.reference} (${row.date}) falls inside the range`).toBeGreaterThanOrEqual(20);
      expect(day).toBeLessThanOrEqual(22);
    }
  });

  test.describe("withdrawal requests", () => {
    test("should show the withdrawal history from the withdrawals API", async ({ page, api }) => {
      const transactions = new MerchantTransactionsPage(page);
      await transactions.open();
      await api.login();

      const [response] = await Promise.all([
        page.waitForResponse((r) => /\/wallets\/withdrawals\//.test(r.url())),
        transactions.openWithdrawals(),
      ]);
      expect(response.status()).toBe(200);
      const withdrawals = (await response.json()).data.results;

      await expect(async () => {
        const shown = await transactions.withdrawalRecords();
        expect(shown.map((w) => w.reference)).toEqual(withdrawals.map((w: any) => w.transaction_id ?? w.reference));
      }).toPass({ timeout: 20_000 });

      if (await page.locator("table:visible").count()) {
        const headers = (await page.locator("table:visible thead th").allInnerTexts()).map((h) => h.trim().toLowerCase());
        for (const column of ["date", "reference", "bank account", "amount", "status"]) {
          expect(headers, `a "${column}" column`).toContain(column);
        }
      } else {
        // Phone cards: every card carries the reference, status, bank, date and amount.
        for (const w of await transactions.withdrawalRecords()) {
          expect(w, "a complete card").toMatchObject({ reference: expect.stringMatching(/^ML-/), status: expect.any(String) });
          expect(w.date).not.toBe("");
          expect(w.bank).not.toBe("");
        }
      }
    });

    test("should search withdrawals by reference and say so when nothing matches", async ({ page, api }) => {
      const transactions = new MerchantTransactionsPage(page);
      await transactions.open();
      await api.login();
      await transactions.openWithdrawals();

      const known = (await api.withdrawals(1, 10)).body.data.results[0];
      test.skip(!known, "No withdrawals exist to search for");
      const reference = known.transaction_id ?? known.reference;

      const [found] = await Promise.all([
        page.waitForResponse((r) => r.url().includes("/wallets/withdrawals/") && r.url().includes(`search=${reference}`)),
        transactions.searchInput.fill(reference),
      ]);
      expect(found.status()).toBe(200);
      await expect
        .poll(async () => (await transactions.withdrawalRecords()).map((w) => w.reference))
        .toEqual([reference]);

      await transactions.searchInput.fill("NO-SUCH-REFERENCE-000");
      // The message exists once for the table and once for the phone cards; only the one on screen counts.
      await expect(page.getByText("There are no withdrawal requests matching your filters.").filter({ visible: true })).toBeVisible();
    });

    test("should filter withdrawals by status", async ({ page }) => {
      const transactions = new MerchantTransactionsPage(page);
      await transactions.open();
      await transactions.openWithdrawals();

      await transactions.statusFilter.click();
      await expect(page.getByRole("option")).toHaveText(["All Statuses", "Success", "Pending", "Failed"]);

      const [response] = await Promise.all([
        page.waitForResponse((r) => r.url().includes("/wallets/withdrawals/") && r.url().includes("status=failed")),
        page.getByRole("option", { name: "Failed" }).click(),
      ]);
      expect(response.status()).toBe(200);

      await expect
        .poll(async () => (await transactions.withdrawalRecords()).every((w) => w.status === "failed"))
        .toBe(true);
    });

    test("should filter withdrawals by date", async ({ page }) => {
      const transactions = new MerchantTransactionsPage(page);
      await transactions.open();
      await transactions.openWithdrawals();

      const { start, end } = daysOfThisMonth(20, 22);

      // The list asks for start_date after the first day is picked and adds end_date after the second.
      await transactions.openDateFilter();
      const [response] = await Promise.all([
        page.waitForResponse((r) => r.url().includes("/wallets/withdrawals/") && r.url().includes(`end_date=${end}`)),
        transactions.pickDays(20, 22),
      ]);

      expect(response.status()).toBe(200);
      expect(new URL(response.url()).searchParams.get("start_date")).toBe(start);
    });
  });

  test("should use the compact list on small screens and the table on large ones", async ({ page }) => {
    const transactions = new MerchantTransactionsPage(page);
    await transactions.open();

    const usesCards = await transactions.transactions.usesCards();
    const layout = layoutOf(page.viewportSize()!.width);

    // Desktop must be a table; on phones it must not be (a 6-column table does not fit). Tablets may be either.
    if (layout === "desktop") expect(usesCards).toBe(false);
    if (layout === "mobile") expect(usesCards).toBe(true);
  });
});
