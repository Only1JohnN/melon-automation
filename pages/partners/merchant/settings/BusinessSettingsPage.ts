import { expect, Locator, Page, test } from "@playwright/test";
import { SettingsSection } from "./SettingsSection";

export type BusinessField =
  | "Type"
  | "RC number"
  | "Business name"
  | "Business email"
  | "Phone number"
  | "Industry";

export class BusinessSettingsPage extends SettingsSection {
  readonly path = "/simple/settings/business";

  readonly logo: Locator;
  readonly logoUpload: Locator;
  readonly editDetailsButton: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page);

    this.logo = page.getByText("Business logo").locator("xpath=..").locator("img").first();
    this.logoUpload = page.locator('input[type="file"]').first();
    // The first Edit belongs to the logo; the last one to the business details.
    this.editDetailsButton = page.getByRole("button", { name: "Edit" }).last();
    this.emailInput = page.locator('input[name="business_email"]');
    this.phoneInput = page.locator('input[name="phone_number"]');
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });
  }

  async waitUntilReady() {
    await expect(this.valueOf("Business name")).toBeVisible({ timeout: 30_000 });
    await expect(this.valueOf("Business name")).not.toBeEmpty();
  }

  valueOf(field: BusinessField): Locator {
    return this.page
      .locator("h1")
      .filter({ hasText: new RegExp(`^${field}$`) })
      .locator("xpath=following-sibling::p");
  }

  async startEditing() {
    await test.step("Open the Edit Business Details form", async () => {
      await this.editDetailsButton.click();
      await expect(this.emailInput).toBeVisible();
    });
  }

  async savePhoneNumber(phone: string) {
    return test.step(`Change the business phone to ${phone} and save`, async () => {
      await this.phoneInput.fill(phone);
      return this.waitForSave("PUT", "/businesses/", () => this.continueButton.click());
    });
  }
}
