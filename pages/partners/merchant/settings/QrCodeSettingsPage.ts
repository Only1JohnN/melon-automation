import { expect, Locator, Page } from "@playwright/test";
import { SettingsSection } from "./SettingsSection";

export class QrCodeSettingsPage extends SettingsSection {
  readonly path = "/simple/settings/qrcode";

  readonly qrImage: Locator;
  readonly downloadButton: Locator;
  readonly copyLinkButton: Locator;
  /** Not seen in the UI yet (the QA merchant always has a code) — adjust once the empty state is known. */
  readonly generateButton: Locator;

  constructor(page: Page) {
    super(page);

    this.qrImage = page.getByAltText("Your reward QR code");
    this.downloadButton = page.getByRole("button", { name: "Download" });
    this.copyLinkButton = page.getByRole("button", { name: "Copy link" });
    this.generateButton = page.getByRole("button", { name: /generate|create/i });
  }

  /** Resolves once either a QR image or a way to create one is on screen. */
  async waitUntilReady() {
    await expect(this.qrImage.or(this.generateButton).first()).toBeVisible({ timeout: 45_000 });
  }

  async hasQrCode() {
    return this.qrImage.isVisible();
  }

  async qrImageUrl(): Promise<string> {
    return (await this.qrImage.getAttribute("src")) ?? "";
  }
}
