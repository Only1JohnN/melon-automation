import { MerchantHomePage } from "../../../../pages/partners/merchant/HomePage";
import { MerchantTransactionsPage } from "../../../../pages/partners/merchant/TransactionsPage";
import { test, expect } from "../../../../fixtures/baseTest";
import { env } from "../../../../config/environment";
import { formatNaira } from "../../../../utils/money";
import { decodeQrFromPng } from "../../../../utils/qr";
import { localDateTime, shortDate } from "../../../../utils/dates";

/** The dashboard prints a transaction's date as "2026-09-23 23:54" on desktop and "Sep 23, 2026" on phones. */
function expectDateMatches(shown: string | null, iso: string) {
  expect(shown, "a date is shown").toBeTruthy();
  const wanted = /^\d{4}-\d{2}-\d{2}/.test(shown!) ? localDateTime(iso) : shortDate(iso);
  expect(shown!.startsWith(wanted.slice(0, shown!.length > 10 ? 16 : 10)) || shown === wanted).toBe(true);
}

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

  test("should greet the merchant by name", async ({ page, api }) => {
    const home = new MerchantHomePage(page);
    await home.open();

    await api.login();
    const business = (await api.business()).body.data.details.name;
    const firstName = (await api.personal()).body.data.first_name;

    // The greeting has used the member's first name and now uses the business name; accept either, not a stranger.
    const shown = await home.greetingName();
    expect([business, firstName], `greeting name "${shown}"`).toContain(shown);
  });

  test("should show the wallet balance from the API", async ({ page, api }) => {
    const home = new MerchantHomePage(page);
    await home.open();

    await api.login();
    const { body } = await api.wallet();
    const balanceNaira = body.data.balance / 100; // the wallet API returns kobo

    // A payment landing mid-test moves the balance, so compare against a fresh read.
    await expect(async () => {
      await page.reload();
      await home.waitUntilReady();
      const fresh = (await api.wallet()).body.data.balance / 100;
      expect(await home.balance()).toBe(fresh);
    }).toPass({ timeout: 30_000 });

    expect(typeof balanceNaira).toBe("number");
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

    await expect(async () => {
      await page.reload();
      await home.waitUntilReady();
      const stats = (await api.overview()).body.data;

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
    }).toPass({ timeout: 30_000 });
  });

  test("should list the five most recent transactions exactly as the API returns them", async ({
    page,
    api,
  }) => {
    const home = new MerchantHomePage(page);
    await api.login();

    await expect(async () => {
      await home.open();
      const expected = (await api.transactions(1, 5)).body.data.results;
      const shown = await home.transactions.records();

      expect(shown.map((t) => t.reference)).toEqual(expected.map((t: any) => t.transaction_id));

      for (const [index, transaction] of expected.entries()) {
        const row = shown[index];
        expect(row.amount, `${row.reference} amount`).toBe(Number(transaction.requesting_amount_in_naira));
        expect(row.coins, `${row.reference} coins`).toBe(transaction.reward_coin_amount ?? 0);
        expect(row.status, `${row.reference} status`).toBe(transaction.payment_status);
        expect(row.customer, `${row.reference} customer`).toContain(transaction.customer.first_name);
        expectDateMatches(row.date, transaction.updated_at);
      }
    }).toPass({ timeout: 45_000 });
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

  test("should open the QR code from the Get Paid card and show the reward link's QR @smoke", async ({
    page,
    api,
  }) => {
    const home = new MerchantHomePage(page);
    await home.open();
    await api.login();

    const link = `${env.storefrontUrl}/pay/${(await api.business()).body.data.details.slug}`;
    const qrFromApi = (await api.qrCodes()).body.data.results.find(
      (q: any) => q.status === "active" && q.qr_type === "payment" && q.qr_data === link
    );
    expect(qrFromApi, "the merchant has an active payment QR code").toBeTruthy();

    await home.openQrModal();

    await expect(page.getByText(/customers scan this to pay you and earn coins/i)).toBeVisible();
    await expect(home.qrModalImage).toBeVisible();
    await expect(home.qrModalImage).toHaveAttribute("src", qrFromApi.qr_image_url);
    await expect(page.getByText(link.replace("https://", ""), { exact: true }).last()).toBeVisible();

    await test.step("The QR image is the reward link", async () => {
      const image = await page.request.get(qrFromApi.qr_image_url);
      expect(decodeQrFromPng(await image.body())).toBe(link);
    });

    await test.step("It explains where to use it", async () => {
      await expect(home.qrModalTips).toBeVisible();
      for (const tip of ["On the counter", "On receipts and packaging", "In your bio"]) {
        await expect(page.getByRole("heading", { name: tip })).toBeVisible();
      }
    });

    await home.closeQrModal();
  });

  test("should print and download the QR code from the modal", async ({ page }) => {
    const home = new MerchantHomePage(page);
    await home.open();
    await home.openQrModal();

    await test.step("Print QR opens a print tab", async () => {
      const [printTab] = await Promise.all([page.waitForEvent("popup"), home.qrModalPrint.click()]);
      expect(printTab).toBeTruthy();
      await printTab.close();
    });

    await test.step("Download opens the QR image", async () => {
      const [imageTab] = await Promise.all([page.waitForEvent("popup"), home.qrModalDownload.click()]);
      await imageTab.waitForLoadState("domcontentloaded");
      expect(imageTab.url()).toMatch(/image\.getmelon\.co\/QR-CODES-.+\.png/);
      await imageTab.close();
    });
  });

  test("should switch the share modal to the QR code", async ({ page }) => {
    const home = new MerchantHomePage(page);
    await home.open();
    await home.openShareModal();

    await home.shareModalShowQr.click();

    await expect(home.qrModalHeading).toBeVisible();
    await expect(home.qrModalImage).toBeVisible();
  });

  test("should tell the merchant a bank account is needed before withdrawing", async ({ page, api }) => {
    const home = new MerchantHomePage(page);
    await home.open();
    await api.login();

    const banks = (await api.accounts()).body.data.result as any[];
    const hasVerifiedBank = banks.some((b) => b.status === "verified");

    // With a verified bank the flow is a real withdrawal, which nobody has mapped yet.
    test.fixme(
      hasVerifiedBank,
      "TODO(qa): a verified withdrawal bank exists now, so Withdraw to bank starts a real withdrawal. Map that flow (amount, confirmation, wallet debit, withdrawal history) and assert it here."
    );

    await home.openWithdraw();

    await expect(home.noBankTitle).toBeVisible();
    await expect(page.getByText(/you need at least one verified withdrawal bank account to proceed/i)).toBeVisible();
    await expect(home.addBankAccountButton).toBeVisible();
  });

  test("should open the add-bank form, keep the account number locked until a bank is chosen, and only accept 10 digits", async ({
    page,
    api,
  }) => {
    const home = new MerchantHomePage(page);
    await home.open();
    await api.login();

    const bankList = (await api.banks()).body.data.banks as any[];

    await home.openWithdraw();
    await home.openAddBankForm();

    await expect(home.addBankSubmit).toBeDisabled();
    await expect(home.accountNumberInput).toBeDisabled();

    await test.step("The bank list comes from the API and can be searched", async () => {
      await home.bankSelect.click();
      await expect(page.getByRole("option")).toHaveCount(bankList.length);

      await home.bankSearch.fill(bankList[0].name.slice(0, 4));
      await expect(page.getByRole("option").filter({ hasText: bankList[0].name }).first()).toBeVisible();

      await home.bankSearch.fill("zzzzzzzz-no-such-bank");
      await expect(page.getByRole("option")).toHaveCount(0);

      await home.bankSearch.fill(bankList[0].name);
    });

    await test.step("Choosing a bank unlocks the account number", async () => {
      await page.getByRole("option").filter({ hasText: bankList[0].name }).first().click();
      await expect(home.accountNumberInput).toBeEnabled();
    });

    // The form sends its request as soon as the 10th digit is typed, which adds a bank record to the shared QA
    // merchant, so this test never types a full number: it checks the 10-digit limit from the field instead.
    await test.step("Only digits are accepted, up to 10", async () => {
      await home.accountNumberInput.fill("abc");
      await expect(home.accountNumberInput).toHaveValue("");
      await expect(home.accountNumberInput).toHaveAttribute("maxlength", "10");
      await home.accountNumberInput.fill("123456789");
      await expect(home.accountNumberInput).toHaveValue("123456789");
    });

    await test.step("Add Bank stays disabled until the account number is complete", async () => {
      await home.accountNumberInput.fill("12345");
      await expect(home.addBankSubmit).toBeDisabled();
    });
  });

  test("should take the merchant to the withdrawal history with View statement", async ({ page }) => {
    const home = new MerchantHomePage(page);
    await home.open();

    const withdrawalsCall = page.waitForResponse((r) => /\/wallets\/withdrawals\//.test(r.url()));
    await home.viewStatementButton.click();

    await expect(page).toHaveURL(/\/simple\/transactions/);
    expect((await withdrawalsCall).status()).toBe(200);
    await expect(new MerchantTransactionsPage(page).withdrawalHistoryHeading).toBeVisible();
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
});
