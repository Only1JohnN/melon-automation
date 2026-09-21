import { PaymentLinkSettingsPage } from "../../../../pages/partners/merchant/settings/PaymentLinkSettingsPage";
import { MerchantHomePage } from "../../../../pages/partners/merchant/HomePage";
import { PayLinkPage } from "../../../../pages/storefront/PayLinkPage";
import { test, expect } from "../../../../fixtures/baseTest";
import { env } from "../../../../config/environment";

test.describe("@partners @settings @payment-link", () => {
  test("should show the reward payment link for the business @smoke", async ({ page, api }) => {
    const paymentLink = new PaymentLinkSettingsPage(page);

    await paymentLink.open();
    await expect(paymentLink.howItWorks).toBeVisible();

    await api.login();
    const { body } = await api.business();
    const expected = `${env.storefrontUrl}/pay/${body.data.details.slug}`;

    expect(await paymentLink.link()).toBe(expected);
  });

  test("should point to a link that is reachable and opens this business's pay page @smoke", async ({
    page,
    customerPage,
    api,
  }) => {
    const paymentLink = new PaymentLinkSettingsPage(page);
    await paymentLink.open();
    const link = await paymentLink.link();

    await test.step("The link answers with HTTP 200", async () => {
      const response = await page.request.get(link);
      expect(response.status()).toBe(200);
    });

    await test.step("A customer opening it lands on this business's pay page", async () => {
      await customerPage.goto(link);
      const payLinkPage = new PayLinkPage(customerPage);
      await expect(payLinkPage.amountInput).toBeVisible({ timeout: 30_000 });

      await api.login();
      const { body } = await api.business();
      await expect(customerPage.getByText(body.data.details.name, { exact: true }).first()).toBeVisible();
    });
  });

  test("should show the same link as the Get Paid card on the dashboard home", async ({ page }) => {
    const paymentLink = new PaymentLinkSettingsPage(page);
    const home = new MerchantHomePage(page);

    await paymentLink.open();
    const settingsLink = await paymentLink.link();

    await home.open();
    expect(`https://${await home.paymentLinkText()}`).toBe(settingsLink);
  });

  test("should copy the link with the copy button", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    const paymentLink = new PaymentLinkSettingsPage(page);

    await paymentLink.open();
    const link = await paymentLink.link();
    await paymentLink.copyButton.click();

    await expect
      .poll(() => page.evaluate(() => navigator.clipboard.readText()))
      .toBe(link);
  });
});
