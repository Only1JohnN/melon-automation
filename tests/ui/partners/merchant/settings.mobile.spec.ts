import { ProfileSettingsPage } from "../../../../pages/partners/merchant/settings/ProfileSettingsPage";
import { PaymentLinkSettingsPage } from "../../../../pages/partners/merchant/settings/PaymentLinkSettingsPage";
import { QrCodeSettingsPage } from "../../../../pages/partners/merchant/settings/QrCodeSettingsPage";
import { BusinessSettingsPage } from "../../../../pages/partners/merchant/settings/BusinessSettingsPage";
import { SocialsSettingsPage } from "../../../../pages/partners/merchant/settings/SocialsSettingsPage";
import { LocationSettingsPage } from "../../../../pages/partners/merchant/settings/LocationSettingsPage";
import { test, expect } from "../../../../fixtures/baseTest";
import { expectFitsViewportWidth, pageOverflowsHorizontally } from "../../../../utils/viewport";

test.describe("@partners @settings @mobile", () => {
  test("should list every settings section and open each one @smoke", async ({ page }) => {
    const profile = new ProfileSettingsPage(page);
    await profile.open();

    await profile.expectSectionMenuVisible();

    const sections = [
      ["Business Details", /business$/],
      ["Reward Payment Link", /payment-link$/],
      ["Qr Code", /qrcode$/],
      ["Website & Social Media", /socials$/],
      ["Physical Store Location", /locations$/],
      ["Profile", /profile$/],
    ] as const;

    for (const [name, url] of sections) {
      await profile.sectionLink(name).scrollIntoViewIfNeeded();
      await profile.openSection(name);
      await expect(page).toHaveURL(url);
      expect(await pageOverflowsHorizontally(page), `${name}: no sideways scrolling`).toBe(false);
    }
  });

  test("should show the profile and let the merchant open and cancel the edit form", async ({ page }) => {
    const profile = new ProfileSettingsPage(page);
    await profile.open();

    await expectFitsViewportWidth(page, profile.valueOf("Email"), "email value");
    await expect(profile.valueOf("Email")).toHaveText(/@/);

    await profile.startEditing();
    await expectFitsViewportWidth(page, profile.firstNameInput, "first name field");
    await profile.continueButton.scrollIntoViewIfNeeded();
    await expectFitsViewportWidth(page, profile.continueButton, "Continue button");

    await profile.cancelButton.click();
    await expect(profile.firstNameInput).toBeHidden();
  });

  test("should show business details, the payment link and the QR code within the screen", async ({ page }) => {
    const business = new BusinessSettingsPage(page);
    const paymentLink = new PaymentLinkSettingsPage(page);
    const qr = new QrCodeSettingsPage(page);

    await business.open();
    await expectFitsViewportWidth(page, business.valueOf("Business email"), "business email");

    await paymentLink.open();
    await expectFitsViewportWidth(page, paymentLink.liveLink, "payment link");

    await qr.open();
    await expect(qr.qrImage).toBeVisible();
    await expectFitsViewportWidth(page, qr.qrImage, "QR code image");
    await expect(qr.downloadButton).toBeVisible();
    await expect(qr.copyLinkButton).toBeVisible();
  });

  test("should open the social links form and the add-location dialog on a phone", async ({ page }) => {
    const socials = new SocialsSettingsPage(page);
    const locations = new LocationSettingsPage(page);

    await socials.open();
    await socials.startEditing();
    await expectFitsViewportWidth(page, socials.websiteInput, "website field");
    await socials.cancelButton.click();

    await locations.open();
    expect(await pageOverflowsHorizontally(page)).toBe(false);
    await locations.openAddLocation();
    await expectFitsViewportWidth(page, locations.addTradingAddressButton, "Add Trading Address");
    await locations.dialogCancel.click();
  });
});
