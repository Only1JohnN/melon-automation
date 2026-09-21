import { MerchantHomePage } from "../../../../pages/partners/merchant/HomePage";
import { MerchantTransactionsPage } from "../../../../pages/partners/merchant/TransactionsPage";
import { test, expect } from "../../../../fixtures/baseTest";
import { expectFitsViewportWidth, expectTapTarget, pageOverflowsHorizontally } from "../../../../utils/viewport";
import { formatNaira } from "../../../../utils/money";

test.describe("@partners @transactions @mobile", () => {
  test("should fit the phone screen with filters, stats, table and paging", async ({ page }) => {
    const transactions = new MerchantTransactionsPage(page);
    await transactions.open();

    expect(await pageOverflowsHorizontally(page), "no sideways scrolling").toBe(false);

    for (const range of ["daily", "weekly", "monthly"] as const) {
      await expectFitsViewportWidth(page, transactions.rangeButton(range), `${range} filter`);
      await expectTapTarget(transactions.rangeButton(range), `${range} filter`, 32);
    }

    await expect(transactions.cards.first()).toBeVisible();
    await transactions.pageButton(2).scrollIntoViewIfNeeded();
    await expect(transactions.pageButton(2)).toBeVisible();
    await expectFitsViewportWidth(page, transactions.pageButton(2), "page 2 button");
  });

  test("should switch the time range and update the stats from the API", async ({ page }) => {
    const home = new MerchantHomePage(page);
    const transactions = new MerchantTransactionsPage(page);
    await transactions.open();

    const response = await transactions.selectRange("monthly");
    expect(response.status()).toBe(200);
    const stats = (await response.json()).data;

    await expect(home.statCard("Revenue").locator("h3")).toHaveText(formatNaira(stats.revenue.amount));
  });

  test("should page through transactions and open the withdrawal history", async ({ page }) => {
    const home = new MerchantHomePage(page);
    const transactions = new MerchantTransactionsPage(page);
    await transactions.open();

    const firstCard = home.readCard(transactions.cards.first());
    const first = (await firstCard).reference;
    await transactions.pageButton(2).scrollIntoViewIfNeeded();
    const response = await transactions.goToPage(2);
    expect(response.status()).toBe(200);
    await expect.poll(async () => (await home.readCard(transactions.cards.first())).reference).not.toBe(first);

    await transactions.historyTab.scrollIntoViewIfNeeded();
    await transactions.openWithdrawals();
    expect(await pageOverflowsHorizontally(page)).toBe(false);
  });
});
