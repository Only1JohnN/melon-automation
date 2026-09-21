import { MerchantHomePage } from "../../../../pages/partners/merchant/HomePage";
import { test, expect } from "../../../../fixtures/baseTest";
import { expectFitsViewportWidth, expectTapTarget, pageOverflowsHorizontally } from "../../../../utils/viewport";

test.describe("@partners @home @mobile", () => {
  test("should fit the phone screen with balance, Get Paid, stats and recent transactions @smoke", async ({
    page,
  }) => {
    const home = new MerchantHomePage(page);
    await home.open();

    expect(await pageOverflowsHorizontally(page), "no sideways scrolling").toBe(false);

    await expect(home.greeting).toBeVisible();
    await expectFitsViewportWidth(page, home.balanceCard, "balance card");
    await expectFitsViewportWidth(page, home.sharePaymentLinkCard, "share payment link card");
    await expectFitsViewportWidth(page, home.qrCodeCard, "QR code card");

    for (const label of ["Revenue", "Transactions", "Customers rewarded", "Repeat customers"] as const) {
      await home.statCard(label).scrollIntoViewIfNeeded();
      await expectFitsViewportWidth(page, home.statCard(label), `${label} card`);
    }
  });

  test("should make the main actions easy to tap", async ({ page }) => {
    const home = new MerchantHomePage(page);
    await home.open();

    await expectTapTarget(home.withdrawButton, "Withdraw to bank");
    await expectTapTarget(home.viewStatementButton, "View statement");
    await expectTapTarget(home.sharePaymentLinkCard, "Share payment link");
    await expectTapTarget(home.qrCodeCard, "QR code");
    await expectTapTarget(home.hideBalanceButton, "Hide balance", 32);
  });

  test("should open the navigation from the menu button and move between screens", async ({ page }) => {
    const home = new MerchantHomePage(page);
    await home.open();

    await expect(home.menuButton).toBeVisible();
    await expect(home.navLink("Transactions")).toBeHidden();

    await home.menuButton.click();
    for (const name of ["Home", "Transactions", "Settings"]) {
      await expect(home.navLink(name)).toBeVisible();
    }

    await home.navLink("Transactions").click();
    await expect(page).toHaveURL(/\/simple\/transactions/);

    await home.navigateTo("Settings");
    await expect(page).toHaveURL(/\/simple\/settings/);
  });

  test("should hide and show the balance", async ({ page }) => {
    const home = new MerchantHomePage(page);
    await home.open();

    const shown = await home.balanceAmount.innerText();
    await home.toggleBalanceVisibility();
    await expect(home.balanceAmount).not.toContainText("₦");

    await home.toggleBalanceVisibility();
    await expect(home.balanceAmount).toHaveText(shown);
  });

  test("should show the share-payment-link modal inside the screen and copy the link", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    const home = new MerchantHomePage(page);
    await home.open();

    const link = `https://${await home.paymentLinkText()}`;
    await home.openShareModal();

    await expectFitsViewportWidth(page, home.shareModalHeading, "modal heading");
    await expectFitsViewportWidth(page, home.shareModalCopyLink, "Copy link button");
    await expectTapTarget(home.shareModalCopyLink, "Copy link button");

    await home.shareModalCopyLink.click();
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(link);
  });

  test("should show the recent transactions as cards that match the API", async ({ page, api }) => {
    const home = new MerchantHomePage(page);
    await home.open();

    // On a phone the table is hidden and each transaction is a card instead.
    await expect(home.recentRows.first()).toBeHidden();
    await expect(home.recentCards.first()).toBeVisible();
    expect(await pageOverflowsHorizontally(page)).toBe(false);

    await api.login();
    const { body } = await api.transactions(1, 5);
    const expected = body.data.results;

    await expect(home.recentCards).toHaveCount(expected.length);

    for (const [index, transaction] of expected.entries()) {
      await test.step(`Card ${index + 1} is ${transaction.transaction_id}`, async () => {
        const card = await home.readCard(home.recentCards.nth(index));
        expect(card.reference).toBe(transaction.transaction_id);
        expect(card.amount).toBe(Number(transaction.requesting_amount_in_naira));
        expect(card.coins).toBe(transaction.reward_coin_amount ?? 0);
        expect(card.status).toBe(transaction.payment_status);
        expect(card.date).toMatch(/^[A-Z][a-z]{2} \d{1,2}, \d{4}$/);
      });
    }
  });
});
