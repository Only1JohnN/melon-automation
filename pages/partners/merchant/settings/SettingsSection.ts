import { expect, Locator, Page, test } from "@playwright/test";
import { MerchantPage } from "../MerchantPage";

export type SectionName =
  | "Profile"
  | "Business Details"
  | "Withdrawal Bank"
  | "Reward Payment Link"
  | "Qr Code"
  | "Website & Social Media"
  | "Physical Store Location";

/** A page under /simple/settings/* — they all share the section menu. */
export abstract class SettingsSection extends MerchantPage {
  readonly title: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByText("Settings", { exact: true }).first();
  }

  sectionLink(name: SectionName) {
    return this.page.getByRole("link", { name, exact: true });
  }

  async openSection(name: SectionName) {
    await test.step(`Open the "${name}" settings section`, async () => {
      await this.sectionLink(name).click();
    });
  }

  protected async editSuccessfullySaved(button: Locator, toast: string | RegExp) {
    await button.click();
    await this.expectToast(toast);
  }

  protected async waitForSave(method: "PUT" | "POST", urlPart: string, action: () => Promise<void>) {
    const [response] = await Promise.all([
      this.page.waitForResponse(
        (res) => res.request().method() === method && res.url().includes(urlPart)
      ),
      action(),
    ]);
    return response;
  }

  async expectSectionMenuVisible() {
    await expect(this.sectionLink("Profile")).toBeVisible();
    await expect(this.sectionLink("Business Details")).toBeVisible();
    await expect(this.sectionLink("Reward Payment Link")).toBeVisible();
    await expect(this.sectionLink("Qr Code")).toBeVisible();
    await expect(this.sectionLink("Website & Social Media")).toBeVisible();
    await expect(this.sectionLink("Physical Store Location")).toBeVisible();
  }
}
