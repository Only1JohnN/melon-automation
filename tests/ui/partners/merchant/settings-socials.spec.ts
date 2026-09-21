import { SocialsSettingsPage } from "../../../../pages/partners/merchant/settings/SocialsSettingsPage";
import { test, expect } from "../../../../fixtures/baseTest";

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

  test.fixme("should save website and social links and show them afterwards", async ({ page, api }) => {
    // TODO(dev): the save call succeeds (PUT /businesses/socials -> 200 "Update Social details", toast
    // "Online presence updated successfully") but NOTHING is persisted: the view still shows "--" after a
    // reload, GET /businesses/{id} has no social fields and the public GET /details/{slug} returns
    // website_link/instagram/facebook as null. Un-fixme once the links are stored and displayed.
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

  test.fixme("should show saved social links on the customer pay page", async () => {
    // TODO(dev): depends on the persistence bug above. Customer page (customer.getmelon.co/pay/{slug})
    // currently renders no website/social links at all; confirm with product where they should appear.
  });
});
