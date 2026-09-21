import { expect, Locator, Page, test } from "@playwright/test";
import { SettingsSection } from "./SettingsSection";

export type SocialField = "Website" | "Instagram" | "Facebook" | "TikTok";

export class SocialsSettingsPage extends SettingsSection {
  readonly path = "/simple/settings/socials";

  readonly editButton: Locator;
  readonly websiteInput: Locator;
  readonly instagramInput: Locator;
  readonly facebookInput: Locator;
  readonly tiktokInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page);

    this.editButton = page.getByRole("button", { name: "Edit" }).last();
    this.websiteInput = page.locator('input[name="website"]');
    this.instagramInput = page.locator('input[name="instagram"]');
    this.facebookInput = page.locator('input[name="facebook"]');
    this.tiktokInput = page.locator('input[name="tiktok"]');
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });
  }

  async waitUntilReady() {
    await expect(this.page.getByText("Your links")).toBeVisible({ timeout: 30_000 });
  }

  valueOf(field: SocialField): Locator {
    return this.page
      .locator("h1")
      .filter({ hasText: new RegExp(`^${field}$`) })
      .locator("xpath=following-sibling::p");
  }

  async startEditing() {
    await test.step("Open the Edit Website & Social Media form", async () => {
      await this.editButton.click();
      await expect(this.websiteInput).toBeVisible();
    });
  }

  async save(links: { website?: string; instagram?: string; facebook?: string; tiktok?: string }) {
    return test.step("Fill in the social links and save", async () => {
      if (links.website !== undefined) await this.websiteInput.fill(links.website);
      if (links.instagram !== undefined) await this.instagramInput.fill(links.instagram);
      if (links.facebook !== undefined) await this.facebookInput.fill(links.facebook);
      if (links.tiktok !== undefined) await this.tiktokInput.fill(links.tiktok);

      return this.waitForSave("PUT", "/businesses/socials", () => this.saveButton.click());
    });
  }
}
