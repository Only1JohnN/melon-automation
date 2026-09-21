import { expect, Locator, Page } from "@playwright/test";
import { SettingsSection } from "./SettingsSection";

export class PaymentLinkSettingsPage extends SettingsSection {
  readonly path = "/simple/settings/payment-link";

  readonly liveLink: Locator;
  readonly copyButton: Locator;
  readonly howItWorks: Locator;

  constructor(page: Page) {
    super(page);

    const linkBlock = page.getByText("Your live link").locator("xpath=..");
    this.liveLink = linkBlock.locator("p");
    this.copyButton = linkBlock.getByRole("button");
    this.howItWorks = page.getByText("How it works");
  }

  async waitUntilReady() {
    await expect(this.liveLink).toContainText("/pay/", { timeout: 30_000 });
  }

  async link(): Promise<string> {
    return (await this.liveLink.innerText()).trim();
  }
}
