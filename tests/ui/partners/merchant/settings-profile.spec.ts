import { ProfileSettingsPage } from "../../../../pages/partners/merchant/settings/ProfileSettingsPage";
import { test, expect } from "../../../../fixtures/baseTest";
import { env } from "../../../../config/environment";

test.describe("@partners @settings @profile", () => {
  test.describe.configure({ mode: "serial" });

  let original: { first_name: string; last_name: string; street: string };

  // Every edit test restores the account through the API, even if the UI part failed midway.
  test.beforeEach(async ({ api }) => {
    await api.login();
    const { body } = await api.personal();
    original = {
      first_name: body.data.first_name,
      last_name: body.data.last_name,
      street: body.data.street,
    };
  });

  test.afterEach(async ({ api }) => {
    const { body } = await api.personal();
    await api.updatePersonal({
      first_name: original.first_name,
      last_name: original.last_name,
      email: body.data.email,
      gender: body.data.gender,
      phone_number: body.data.phone_number,
      street: original.street,
      city: body.data.city,
      state: body.data.state,
      country: body.data.country,
    });
  });

  test("should show the merchant's profile details @smoke", async ({ page, api }) => {
    const profile = new ProfileSettingsPage(page);

    await profile.open();
    await profile.expectSectionMenuVisible();

    const { status, body } = await api.personal();
    expect(status).toBe(200);

    await test.step("Profile table matches the profile API", async () => {
      await expect(profile.valueOf("First name")).toHaveText(body.data.first_name);
      await expect(profile.valueOf("Last name")).toHaveText(body.data.last_name);
      await expect(profile.valueOf("Email")).toHaveText(env.partnerEmail);
      await expect(profile.valueOf("Phone number")).toHaveText(body.data.phone_number);
      await expect(profile.valueOf("Gender")).toHaveText(new RegExp(body.data.gender, "i"));
      await expect(profile.valueOf("Address")).toHaveText(body.data.street);
    });
  });

  test("should save profile changes and persist them after a refresh", async ({ page, api }) => {
    const profile = new ProfileSettingsPage(page);
    const newName = `QaEdit${Date.now().toString().slice(-6)}`;

    await profile.open();
    await profile.startEditing();

    await expect(profile.firstNameInput).toHaveValue(original.first_name);

    const response = await profile.saveChanges({ firstName: newName });
    expect(response.status(), "update profile API").toBe(200);
    expect((await response.json()).message).toBe("Update Personal details");

    await profile.expectToast("Update Personal details");
    await expect(profile.valueOf("First name")).toHaveText(newName);

    await test.step("Change survives a page refresh and is stored by the backend", async () => {
      await page.reload();
      await profile.waitUntilReady();
      await expect(profile.valueOf("First name")).toHaveText(newName);

      const { body } = await api.personal();
      expect(body.data.first_name).toBe(newName);
    });
  });

  test("should discard changes when the edit is cancelled", async ({ page }) => {
    const profile = new ProfileSettingsPage(page);

    await profile.open();
    await profile.startEditing();
    await profile.firstNameInput.fill("ShouldNotBeSaved");
    await profile.cancelButton.click();

    await expect(profile.firstNameInput).toBeHidden();
    await expect(profile.valueOf("First name")).toHaveText(original.first_name);
  });

  test("should reject an empty first name and keep the stored value", async ({ page, api }) => {
    const profile = new ProfileSettingsPage(page);

    await profile.open();
    await profile.startEditing();

    // TODO(dev): the form has no client-side validation, so the empty name is sent and only the
    // API refuses it (422). Once the form validates first, assert an inline "required" message here.
    const response = await profile.saveChanges({ firstName: "" });
    expect(response.status(), "API refuses an empty first name").toBe(422);
    expect((await response.json()).message).toContain("first_name");

    const { body } = await api.personal();
    expect(body.data.first_name).toBe(original.first_name);
  });

  test("should let the merchant move between settings sections", async ({ page }) => {
    const profile = new ProfileSettingsPage(page);

    await profile.open();

    const sections = [
      ["Business Details", /\/simple\/settings\/business/],
      ["Reward Payment Link", /\/simple\/settings\/payment-link/],
      ["Qr Code", /\/simple\/settings\/qrcode/],
      ["Website & Social Media", /\/simple\/settings\/socials/],
      ["Physical Store Location", /\/simple\/settings\/locations/],
      ["Profile", /\/simple\/settings\/profile/],
    ] as const;

    for (const [name, url] of sections) {
      await profile.openSection(name);
      await expect(page).toHaveURL(url);
    }
  });
});
