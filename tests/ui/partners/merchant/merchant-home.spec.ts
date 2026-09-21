import { MerchantHomePage } from "../../../../pages/partners/merchant/HomePage";
import { test, expect } from "../../../../fixtures/baseTest";
import { env } from "../../../../config/environment";
import { formatNaira } from "../../../../utils/money";

test.describe("@partners @home", () => {
  test("should load the dashboard with its data coming from the API @smoke", async ({ page }) => {
    const home = new MerchantHomePage(page);

    const [overview, transactions, wallet] = await Promise.all([
      page.waitForResponse((r) => /\/simple-mode\/business\/.+\/overview/.test(r.url())),
      page.waitForResponse((r) => /\/simple-mode\/business\/.+\/transactions\?page=1&limit=5/.test(r.url())),
      page.waitForResponse((r) => /\/wallets\/businesses\//.test(r.url())),
      home.open(),
    ]);

    expect(overview.status(), "overview API").toBe(200);
    expect(transactions.status(), "transactions API").toBe(200);
    expect(wallet.status(), "wallet API").toBe(200);

    await expect(home.greeting).toBeVisible();
    await expect(home.viewStatementButton).toBeVisible();
    await expect(home.withdrawButton).toBeVisible();
  });

  test("should show the wallet balance from the API", async ({ page, api }) => {
    const home = new MerchantHomePage(page);
    await home.open();

    await api.login();
    const { body } = await api.wallet();
    const balanceNaira = body.data.balance / 100; // the wallet API returns kobo

    await expect(home.balanceAmount).toHaveText(formatNaira(balanceNaira));
    await expect(page.getByText(/settled instantly on every payment/i)).toBeVisible();
  });

  test("should hide and show the balance with the eye icon", async ({ page }) => {
    const home = new MerchantHomePage(page);
    await home.open();

    const visibleBalance = await home.balanceAmount.innerText();
    expect(visibleBalance).toContain("₦");

    await home.toggleBalanceVisibility();
    await expect(home.showBalanceButton).toBeVisible();
    await expect(home.balanceAmount).not.toContainText(/\d/);
    await expect(home.balanceAmount).not.toContainText("₦");

    await home.toggleBalanceVisibility();
    await expect(home.hideBalanceButton).toBeVisible();
    await expect(home.balanceAmount).toHaveText(visibleBalance);
  });

  test("should show revenue, transactions, customers rewarded and repeat customers from the overview API", async ({
    page,
    api,
  }) => {
    const home = new MerchantHomePage(page);
    await home.open();

    await api.login();
    const { status, body } = await api.overview();
    expect(status).toBe(200);
    const stats = body.data;

    await expect(home.statCard("Revenue").locator("h3")).toHaveText(formatNaira(stats.revenue.amount));
    expect(await home.statValue("Transactions")).toBe(stats.transactions.count);
    expect(await home.statValue("Customers rewarded")).toBe(stats.customers_rewarded.count);
    await expect(home.statCard("Customers rewarded")).toContainText(
      `${stats.customers_rewarded.coins_awarded.toLocaleString("en-US")} Coins awarded`
    );
    expect(await home.statValue("Repeat customers")).toBe(stats.repeat_customers.count);
    await expect(home.statCard("Repeat customers")).toContainText(
      `${stats.repeat_customers.repeat_percentage}% returned to pay again`
    );
  });

  test("should list the five most recent transactions exactly as the API returns them", async ({
    page,
    api,
  }) => {
    const home = new MerchantHomePage(page);
    await home.open();

    await api.login();
    const { body } = await api.transactions(1, 5);
    const expected = body.data.results;

    await expect(home.recentRows).toHaveCount(expected.length);

    for (const [index, transaction] of expected.entries()) {
      await test.step(`Row ${index + 1} is ${transaction.transaction_id}`, async () => {
        const row = await home.readRow(home.recentRows.nth(index));
        expect(row.reference).toBe(transaction.transaction_id);
        expect(row.amount).toBe(Number(transaction.requesting_amount_in_naira));
        expect(row.coins).toBe(transaction.reward_coin_amount ?? 0);
        expect(row.status).toBe(transaction.payment_status);
        expect(row.customer).toContain(transaction.customer.first_name);
      });
    }
  });

  test("should show the payment link in Get Paid and open the share modal @smoke", async ({
    page,
    context,
    api,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    const home = new MerchantHomePage(page);
    await home.open();

    await api.login();
    const { body } = await api.business();
    const link = `${env.storefrontUrl}/pay/${body.data.details.slug}`;

    expect(`https://${await home.paymentLinkText()}`).toBe(link);

    await home.openShareModal();
    await expect(page.getByText(link.replace("https://", ""), { exact: true }).last()).toBeVisible();
    await expect(page.getByText(/anyone with this link can pay you/i)).toBeVisible();

    await home.shareModalCopyLink.click();
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(link);
  });

  test("should take the merchant to the full list with View all", async ({ page }) => {
    const home = new MerchantHomePage(page);
    await home.open();

    await home.viewAllTransactions.click();

    await expect(page).toHaveURL(/\/simple\/transactions/);
  });

  test("should navigate between Home, Transactions and Settings", async ({ page }) => {
    const home = new MerchantHomePage(page);
    await home.open();

    await home.navigateTo("Transactions");
    await expect(page).toHaveURL(/\/simple\/transactions/);

    await home.navigateTo("Settings");
    await expect(page).toHaveURL(/\/simple\/settings/);

    await home.navigateTo("Home");
    await expect(page).toHaveURL(/\/simple\/home/);
  });

  // ── Known problems: written down for whoever picks them up ─────────────────

  test.fixme("should start a withdrawal with Withdraw to bank", async ({ page }) => {
    // TODO(dev): clicking "Withdraw to bank" does nothing (no dialog, no navigation, no API call).
    // Expected: a withdrawal flow. Assert the dialog/heading and the withdrawal API once it exists.
    const home = new MerchantHomePage(page);
    await home.open();
    await home.withdrawButton.click();
    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test.fixme("should open the statement with View statement", async ({ page }) => {
    // TODO(dev): clicking "View statement" does nothing (no dialog, no download, no API call).
    // Expected: a statement view or a downloadable statement.
    const home = new MerchantHomePage(page);
    await home.open();
    await home.viewStatementButton.click();
    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test.fixme("should add a bank account from the balance card", async ({ page }) => {
    // TODO(dev): clicking "Add bank account" does nothing. Expected: the add-bank flow
    // (Settings > Withdrawal Bank has the same "Add Withdrawal Bank" action).
    const home = new MerchantHomePage(page);
    await home.open();
    await home.addBankAccountButton.click();
    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test.fixme("should open the QR code from the Get Paid card", async ({ page }) => {
    // TODO(dev): clicking the "QR code — Print or share as an image" card does nothing.
    // Expected: it opens the QR code (modal or Settings > Qr Code).
    const home = new MerchantHomePage(page);
    await home.open();
    await home.qrCodeCard.click();
    await expect(page.getByAltText("Your reward QR code")).toBeVisible();
  });

  test.fixme("should switch the share modal to the QR code", async ({ page }) => {
    // TODO(dev): "Show the QR code instead" in the Share modal does nothing — the modal keeps showing
    // the link. Expected: the QR image with Download/Copy.
    const home = new MerchantHomePage(page);
    await home.open();
    await home.openShareModal();
    await home.shareModalShowQr.click();
    await expect(page.getByAltText("Your reward QR code")).toBeVisible();
  });

  test.fixme("should preview the same pay page the customer really sees", async ({ page, api }) => {
    // TODO(dev): the Share modal's "Preview: what your customer sees" is out of date. It shows the tagline
    // "Fresh meals, sides and drinks — daily.", an "MQ" avatar and ₦2,500/₦5,000/₦12,000 preset chips, but
    // the real page shows the business tagline ("Where Quality meets Innovation"), the logo and no presets.
    const home = new MerchantHomePage(page);
    await home.open();
    await api.login();
    const { body } = await api.business();

    await home.openShareModal();
    await expect(page.getByText(body.data.details.tagline)).toBeVisible();
    await expect(page.getByText("₦12,000")).toBeHidden();
  });
});
