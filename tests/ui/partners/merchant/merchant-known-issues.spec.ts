import { MerchantHomePage } from "../../../../pages/partners/merchant/HomePage";
import { test, expect } from "../../../../fixtures/baseTest";
import { pending } from "../../../../utils/pending";

/**
 * Problems found on the merchant dashboard that are written down as tests, each switched off (pending) with the reason
 * shown in the report and on the results dashboard. Whether each one is a bug or simply not built yet is for the
 * team to say; the test is switched on by removing `.fixme` once the behaviour exists.
 *
 * Desktop only: none of these depend on screen size (the tablet ones live in merchant-screens.responsive.spec.ts).
 */
test.describe("@partners @home @known-issues", () => {
  test.fixme(
    "should show the Melon icon in the QR code modal",
    pending(
      "Observed: the small Melon icon above the heading of the QR code modal is broken. /public/images/melon-icon.png does not exist: the app answers 200 with an HTML page instead of an image. Expected: the icon shows."
    ),
    async ({ page }) => {
      const home = new MerchantHomePage(page);
      await home.open();
      await home.openQrModal();

      const icon = page.getByRole("img", { name: "Melon", exact: true }).first();
      await expect(icon).toBeVisible();
      await expect.poll(() => icon.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
    }
  );

  test.fixme(
    "should not show placeholder text at the bottom of the sidebar",
    pending(
      'Observed: the bottom of the sidebar shows an <h1> reading "Appear here!" at every screen size. It looks like leftover placeholder copy. Expected: nothing, or the intended content.'
    ),
    async ({ page }) => {
      const home = new MerchantHomePage(page);
      await home.open();

      await expect(page.locator("aside").getByText("Appear here!")).toBeHidden();
    }
  );

  test.fixme(
    "should close the share modal with the Escape key",
    pending(
      'Observed: the "Share your payment link" modal does not close when Escape is pressed and has no Close or × button; only clicking the dimmed page behind it dismisses it (the QR code modal does have a Close button). Keyboard and screen-reader users cannot close it. Unclear whether this is intended.'
    ),
    async ({ page }) => {
      const home = new MerchantHomePage(page);
      await home.open();
      await home.openShareModal();

      await page.keyboard.press("Escape");
      await expect(home.shareModalHeading).toBeHidden();
    }
  );

  test.fixme("should open help from the Help control", pending("Observed: \"Help\" in the top bar does nothing when clicked (no dialog, page, popup or request). Unclear whether it is unfinished or broken. Once it works: check that it opens support."), async ({ page }) => {
    const home = new MerchantHomePage(page);
    await home.open();
    await page.getByText("Help", { exact: true }).locator("visible=true").first().click();
    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test.fixme("should show notifications from the bell", pending("Observed: the notification bell (with its red dot) does nothing when clicked and no notifications request is made. Unclear whether it is unfinished or broken. Once it works: check the list and that the unread dot clears."), async ({ page }) => {
    const home = new MerchantHomePage(page);
    await home.open();
    await page.mouse.click((page.viewportSize()?.width ?? 1440) - 36, 47);
    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test.fixme("should preview the same pay page the customer really sees", pending("Observed: the Share modal's \"Preview: what your customer sees\" is out of date. It shows the tagline \"Fresh meals, sides and drinks — daily.\", an \"MQ\" avatar and ₦2,500 / ₦5,000 / ₦12,000 preset chips, while the real pay page shows the business's own tagline (\"Where Quality meets Innovation\"), its logo and no preset chips. Expected: the preview matches the real page."), async ({ page, api }) => {
    const home = new MerchantHomePage(page);
    await home.open();
    await api.login();
    const { body } = await api.business();

    await home.openShareModal();
    await expect(page.getByText(body.data.details.tagline)).toBeVisible();
    await expect(page.getByText("₦12,000")).toBeHidden();
  });
});
