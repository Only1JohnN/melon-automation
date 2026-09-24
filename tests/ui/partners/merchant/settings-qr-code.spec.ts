import { QrCodeSettingsPage } from "../../../../pages/partners/merchant/settings/QrCodeSettingsPage";
import { PaymentLinkSettingsPage } from "../../../../pages/partners/merchant/settings/PaymentLinkSettingsPage";
import { PayLinkPage } from "../../../../pages/storefront/PayLinkPage";
import { test, expect } from "../../../../fixtures/baseTest";
import { decodeQrFromPng } from "../../../../utils/qr";

test.describe("@partners @settings @qr-code", () => {
  test("should show a QR code that encodes the reward payment link @smoke", async ({
    page,
    customerPage,
    api,
  }) => {
    const qr = new QrCodeSettingsPage(page);
    const paymentLinkPage = new PaymentLinkSettingsPage(page);

    await paymentLinkPage.open();
    const paymentLink = await paymentLinkPage.link();

    await qr.open();

    await test.step("Create a QR code if the merchant doesn't have one yet", async () => {
      if (!(await qr.hasQrCode())) {
        // TODO(qa): the empty state has never been seen (the QA merchant already has a code), so the
        // create control is a guess. Confirm the real button/label and the API it calls, then tighten.
        await qr.generateButton.click();
        await expect(qr.qrImage).toBeVisible({ timeout: 30_000 });
      }
    });

    const imageUrl = await qr.qrImageUrl();

    await test.step("The QR image renders", async () => {
      await expect(qr.qrImage).toBeVisible();
      await expect
        .poll(() => qr.qrImage.evaluate((img: HTMLImageElement) => img.naturalWidth))
        .toBeGreaterThan(0);
    });

    await test.step("The QR code encodes the reward payment link", async () => {
      const image = await page.request.get(imageUrl);
      expect(image.status(), "QR image is downloadable").toBe(200);

      const decoded = decodeQrFromPng(await image.body());
      expect(decoded, "QR image contains a readable code").not.toBeNull();
      expect(decoded).toBe(paymentLink);
    });

    await test.step("The linked page is reachable and is this business's pay page", async () => {
      const response = await page.request.get(paymentLink);
      expect(response.status()).toBe(200);

      await customerPage.goto(paymentLink);
      await expect(new PayLinkPage(customerPage).amountInput).toBeVisible({ timeout: 30_000 });
    });

    await test.step("The backend lists this QR as an active payment code", async () => {
      await api.login();
      const { status, body } = await api.qrCodes();
      expect(status).toBe(200);

      const active = body.data.results.find(
        (item: any) => item.qr_type === "payment" && item.status === "active" && item.qr_data === paymentLink
      );
      expect(active, "an active payment QR for the reward link exists").toBeTruthy();
      expect(active.qr_image_url).toBe(imageUrl);
    });
  });

  test("should copy the scan link", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    const qr = new QrCodeSettingsPage(page);
    const paymentLinkPage = new PaymentLinkSettingsPage(page);

    await paymentLinkPage.open();
    const paymentLink = await paymentLinkPage.link();

    await qr.open();
    await qr.copyLinkButton.click();

    await qr.expectToast("Scan link copied");
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(paymentLink);
  });

  test("should explain what the QR code is for", async ({ page }) => {
    const qr = new QrCodeSettingsPage(page);

    await qr.open();

    await expect(page.getByText("Reward customers in store")).toBeVisible();
    await expect(page.getByText(/customers scan this code in your store/i)).toBeVisible();
  });

  test("should open the QR image when Download is clicked", async ({ page, api }) => {
    const qr = new QrCodeSettingsPage(page);
    await qr.open();

    // Download now opens the QR image in a new tab rather than saving a file.
    const openedUrl = await qr.downloadQr();

    await api.login();
    const active = (await api.qrCodes()).body.data.results.find((q: any) => q.status === "active" && q.qr_type === "payment");
    expect(openedUrl).toBe(active.qr_image_url);
  });
});
