import { expect, Locator, Page, test } from "@playwright/test";
import { SettingsSection } from "./SettingsSection";

export type ProfileField = "First name" | "Last name" | "Phone number" | "Email" | "Gender" | "Address";

export class ProfileSettingsPage extends SettingsSection {
  readonly path = "/simple/settings/profile";

  readonly editButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly streetInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly countryInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly avatarUpload: Locator;

  constructor(page: Page) {
    super(page);

    this.editButton = page.getByRole("button", { name: "Edit" }).first();
    this.firstNameInput = page.locator('input[name="first_name"]');
    this.lastNameInput = page.locator('input[name="last_name"]');
    this.emailInput = page.locator('input[name="email"]');
    this.phoneInput = page.locator('input[name="phone"]');
    this.streetInput = page.locator('input[name="street"]');
    this.cityInput = page.locator('input[name="city"]');
    this.stateInput = page.locator('input[name="state"]');
    this.countryInput = page.locator('input[name="country"]');
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });
    this.avatarUpload = page.locator('input[type="file"]').first();
  }

  async waitUntilReady() {
    await expect(this.editButton).toBeVisible({ timeout: 30_000 });
    await expect(this.valueOf("Email")).not.toBeEmpty({ timeout: 30_000 });
  }

  valueOf(field: ProfileField): Locator {
    return this.page
      .locator("tr")
      .filter({ has: this.page.getByText(field, { exact: true }) })
      .locator("td")
      .nth(1);
  }

  async startEditing() {
    await test.step("Open the Edit Profile form", async () => {
      await this.editButton.click();
      // The form is populated asynchronously; typing before that gets overwritten.
      await expect(this.firstNameInput).not.toHaveValue("");
    });
  }

  /** Fills the given fields, saves, and resolves with the PUT response. */
  async saveChanges(changes: { firstName?: string; lastName?: string; street?: string }) {
    return test.step("Edit the profile and save", async () => {
      if (changes.firstName !== undefined) await this.firstNameInput.fill(changes.firstName);
      if (changes.lastName !== undefined) await this.lastNameInput.fill(changes.lastName);
      if (changes.street !== undefined) await this.streetInput.fill(changes.street);

      return this.waitForSave("PUT", "/businesses/personal/", () => this.continueButton.click());
    });
  }
}
