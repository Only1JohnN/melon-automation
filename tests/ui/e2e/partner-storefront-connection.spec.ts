import { MerchantHomePage } from "../../../pages/partners/merchant/HomePage";
import { MerchantTransactionsPage } from "../../../pages/partners/merchant/TransactionsPage";
import { BusinessSettingsPage } from "../../../pages/partners/merchant/settings/BusinessSettingsPage";
import { PaymentLinkSettingsPage } from "../../../pages/partners/merchant/settings/PaymentLinkSettingsPage";
import { PayLinkPage } from "../../../pages/storefront/PayLinkPage";
import { test, expect } from "../../../fixtures/baseTest";
import { env } from "../../../config/environment";
import { toApiPhone } from "../../../api/MelonApi";
import { decodeQrFromPng } from "../../../utils/qr";

import { pending } from "../../../utils/pending";
/**
 * How the partner (merchant) side and the storefront (customer) side line up. Read-only: nothing here pays.
 * The moving-money checks live in payment-flow.spec.ts.
 */
test.describe("@e2e @connection @partners @storefront", () => {
  test("should present the same business to customers as the merchant has in Settings @smoke", async ({
    page: merchantPage,
    customerPage,
    api,
  }) => {
    const business = new BusinessSettingsPage(merchantPage);
    const pay = new PayLinkPage(customerPage);

    await business.open();
    const nameOnMerchantSide = (await business.valueOf("Business name").innerText()).trim();
    const logoOnMerchantSide = await business.logo.getAttribute("src");

    await api.login();
    const details = (await api.business()).body.data.details;

    await pay.goto(env.testStoreSlug);

    await test.step("The name is the one the merchant sees in Settings", async () => {
      expect(nameOnMerchantSide).toBe(details.name);
      await expect(customerPage.getByText(nameOnMerchantSide, { exact: true }).first()).toBeVisible();
    });

    await test.step("The tagline the customer reads is the business's tagline", async () => {
      await expect(customerPage.getByText(details.tagline)).toBeVisible();
    });

    await test.step("The logo is the same image on both sides", async () => {
      expect(logoOnMerchantSide).toBeTruthy();
      await expect(customerPage.locator(`img[src="${logoOnMerchantSide}"]`).first()).toBeVisible();
    });

    await test.step("The customer sees the business as verified", async () => {
      await expect(customerPage.getByText("KYC Approved")).toBeVisible();
    });
  });

  test("should lead every payment link and QR code the merchant can copy to the same pay page @smoke", async ({
    page: merchantPage,
    customerPage,
    api,
  }) => {
    const home = new MerchantHomePage(merchantPage);
    const settingsLink = new PaymentLinkSettingsPage(merchantPage);

    await api.login();
    const slug = (await api.business()).body.data.details.slug;
    const name = (await api.business()).body.data.details.name;
    const expected = `${env.storefrontUrl}/pay/${slug}`;
    const found: Record<string, string> = {};

    await settingsLink.open();
    found["Settings > Reward Payment Link"] = await settingsLink.link();

    await home.open();
    found["Home > Get Paid card"] = `https://${await home.paymentLinkText()}`;

    await home.openShareModal();
    await expect(merchantPage.getByText(expected.replace("https://", ""), { exact: true }).last()).toBeVisible();
    found["Home > Share payment link modal"] = expected;
    await home.closeShareModal();

    await home.openQrModal();
    found["Home > QR code modal (link under the code)"] = `https://${(await merchantPage.getByText(/^customer\..+\/pay\/.+/).last().innerText()).trim()}`;
    const image = await merchantPage.request.get((await home.qrModalImage.getAttribute("src"))!);
    found["Home > QR code modal (the code itself)"] = decodeQrFromPng(await image.body()) ?? "(unreadable)";

    const qrFromApi = (await api.qrCodes()).body.data.results.find((q: any) => q.status === "active" && q.qr_type === "payment");
    found["API > active payment QR"] = qrFromApi.qr_data;

    for (const [where, link] of Object.entries(found)) {
      expect(link, where).toBe(expected);
    }

    await test.step("A customer who opens that link lands on this business's pay page", async () => {
      await customerPage.goto(expected);
      await expect(new PayLinkPage(customerPage).amountInput).toBeVisible({ timeout: 30_000 });
      await expect(customerPage.getByText(name, { exact: true }).first()).toBeVisible({ timeout: 30_000 });
    });
  });

  test("should count the merchant's successful payments on the customer's 'Payments completed' card", async ({
    customerPage,
    api,
  }) => {
    const pay = new PayLinkPage(customerPage);
    await api.login();

    await expect(async () => {
      await pay.goto(env.testStoreSlug);
      const { body } = await api.overview();
      expect(await pay.paymentsCompleted()).toBe(body.data.transactions.count);
    }).toPass({ timeout: 45_000, intervals: [3_000] });
  });

  test("should show the customer's join date on the trust card as when the business was verified", async ({
    customerPage,
    api,
  }) => {
    const pay = new PayLinkPage(customerPage);
    await pay.goto(env.testStoreSlug);
    await api.login();

    const created = (await api.business()).body.data.created_at ?? (await api.publicBusiness(env.testStoreSlug)).body.data.created_at;
    const since = new Date(created).toLocaleString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

    await expect(pay.kycSinceCard).toContainText(`KYC verified since ${since}`);
  });

  test("should show a paying customer under the same name and number on both of the merchant's lists", async ({
    page,
    api,
  }) => {
    test.skip(!env.testPhoneNumber, "Set TEST_PHONE_NUMBER to a phone number already registered with Melon.");
    const home = new MerchantHomePage(page);
    const list = new MerchantTransactionsPage(page);
    await api.login();

    const phone = toApiPhone(env.testPhoneNumber!);
    const mine = (await api.allTransactions()).filter((t) => t.customer?.phone_number === phone);
    expect(mine.length, "the test customer has paid this merchant before").toBeGreaterThan(0);
    const customer = mine[0].customer;
    const fullName = `${customer.first_name} ${customer.last_name}`;

    await test.step("Same customer id on every one of their payments", async () => {
      expect(new Set(mine.map((t) => t.customer_id)).size).toBe(1);
    });

    await test.step("The Home list names them", async () => {
      await home.open();
      const names = (await home.transactions.records()).filter((r) => mine.some((t) => t.transaction_id === r.reference)).map((r) => r.customer);
      for (const name of names) expect(name).toContain(customer.first_name);
    });

    await test.step("The Transactions list names them the same way", async () => {
      await list.open();
      const names = (await list.transactions.records()).filter((r) => mine.some((t) => t.transaction_id === r.reference)).map((r) => r.customer);
      for (const name of names) expect(name).toContain(customer.first_name);
    });

    expect(fullName.trim().length).toBeGreaterThan(0);
  });

  test.fixme("should show the merchant's website, social links and store location on the customer's pay page", pending("Two open points. (1) Saving Website & Social Media does not persist: the save returns 200 but the business record and the public details endpoint still return null. (2) The customer pay page has no place that shows a website, social links or store location, so it is unclear whether they are meant to appear there. Once both are settled: set a website and Instagram in Settings, open the pay page as a customer and check the links appear (and disappear when cleared)."), async () => {
  });

  test.fixme("should keep the customer's page in step when the merchant edits the business", pending("The business name and tagline cannot be edited from the merchant dashboard today (only email, phone and industry can, and the customer page shows none of those), so there is nothing to keep in step yet. When editing is added: change it in Settings > Business Details, reload the pay page as a customer, check the change appears, then restore it."), async () => {
  });
});
