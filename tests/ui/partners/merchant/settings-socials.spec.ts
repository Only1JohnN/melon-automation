import { SocialsSettingsPage } from "../../../../pages/partners/merchant/settings/SocialsSettingsPage";
import { test, expect } from "../../../../fixtures/baseTest";

import { pending } from "../../../../utils/pending";
test.describe("@partners @settings @socials", () => {
  test("should list the website and social links a customer can find", async ({ page }) => {
    const socials = new SocialsSettingsPage(page);

    await socials.open();

    for (const field of ["Website", "Instagram", "Facebook", "TikTok"] as const) {
      await expect(socials.valueOf(field)).toBeVisible();
    }
  });

  test("should open the edit form with all four fields and close it on cancel", async ({ page }) => {
    const socials = new SocialsSettingsPage(page);

    await socials.open();
    await socials.startEditing();

    await expect(socials.websiteInput).toHaveAttribute("placeholder", /yourbusiness/);
    await expect(socials.instagramInput).toBeVisible();
    await expect(socials.facebookInput).toBeVisible();
    await expect(socials.tiktokInput).toBeVisible();

    await socials.cancelButton.click();
    await expect(socials.websiteInput).toBeHidden();
  });

  test.fixme("should save website and social links and show them afterwards", pending("Observed: saving Website & Social Media succeeds (the request returns 200 \"Update Social details\" and the toast says \"Online presence updated successfully\") but nothing is stored: after a reload the page still shows \"--\", the business record has no social fields, and the public details endpoint returns website_link, instagram and facebook as null. Expected: the saved links are stored and shown again."), async ({ page, api }) => {
    const socials = new SocialsSettingsPage(page);
    const links = { website: "https://www.melonqabot.example", instagram: "@melonqabot" };

    await socials.open();
    await socials.startEditing();
    const response = await socials.save(links);
    expect(response.status()).toBe(200);
    await socials.expectToast("Online presence updated successfully");

    await page.reload();
    await socials.waitUntilReady();
    await expect(socials.valueOf("Website")).toHaveText(links.website);
    await expect(socials.valueOf("Instagram")).toHaveText(links.instagram);

    await api.login();
    const { body } = await api.publicBusiness("melon-qa-bot");
    expect(body.data.website_link).toBe(links.website);
    // Cleanup once this passes: clear the links again so the QA merchant stays untouched.
  });

  test.fixme("should show saved social links on the customer pay page", pending("The customer pay page currently shows no website or social links at all. This depends on the save problem in \"should save website and social links and show them afterwards\", and on product confirming where the links should appear."), async () => {
  });
});
