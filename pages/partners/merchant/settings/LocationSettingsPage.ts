import { expect, Locator, Page, test } from "@playwright/test";
import { SettingsSection } from "./SettingsSection";

export class LocationSettingsPage extends SettingsSection {
  readonly path = "/simple/settings/locations";

  readonly addLocationButton: Locator;
  readonly rows: Locator;
  readonly dialogHeading: Locator;
  readonly addTradingAddressButton: Locator;
  readonly dialogCancel: Locator;
  readonly dialogContinue: Locator;

  constructor(page: Page) {
    super(page);

    this.addLocationButton = page.getByRole("button", { name: "Add another location" });
    this.rows = page.locator("table tbody tr");
    this.dialogHeading = page.getByText("Create Branches");
    this.addTradingAddressButton = page.getByRole("button", { name: "Add Trading Address" });
    this.dialogCancel = page.getByRole("button", { name: "Cancel" });
    this.dialogContinue = page.getByRole("button", { name: "Continue" });
  }

  async waitUntilReady() {
    await expect(this.addLocationButton).toBeVisible({ timeout: 30_000 });
    await expect(this.rows.first()).toBeVisible({ timeout: 30_000 });
  }

  async addressOfRow(index = 0): Promise<string> {
    return (await this.rows.nth(index).locator("td").first().innerText()).trim();
  }

  async openAddLocation() {
    await test.step("Open the Add another location dialog", async () => {
      await this.addLocationButton.click();
      await expect(this.dialogHeading).toBeVisible();
    });
  }

  /** The dialog first asks what kind of location to add; "Trading Address" reveals the real form. */
  async chooseTradingAddress() {
    await test.step("Choose Add Trading Address", async () => {
      await this.addTradingAddressButton.click();
      await expect(this.page.getByText("Select manager")).toBeVisible();
    });
  }
}
