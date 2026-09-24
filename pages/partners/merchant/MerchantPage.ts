import { expect, Locator, Page, test } from "@playwright/test";
import { env } from "../../../config/environment";
import { BasePage } from "../../common/BasePage";
import { gotoWithRetry } from "../../../utils/navigation";

/** Shared behaviour for every logged-in merchant screen (desktop sidebar / mobile menu). */
export abstract class MerchantPage extends BasePage {
  abstract readonly path: string;

  readonly toast: Locator;
  readonly menuButton: Locator;

  constructor(page: Page) {
    super(page);

    this.toast = page.locator("[data-sonner-toast]");
    this.menuButton = page.getByRole("button", { name: "Open Menu" });
  }

  abstract waitUntilReady(): Promise<void>;

  async open() {
    await test.step(`Open ${this.path}`, async () => {
      await gotoWithRetry(this.page, `${env.partnerUrl}${this.path}`);
      await this.waitUntilReady();
    });
  }

  navLink(name: string) {
    return this.page.getByRole("link", { name, exact: true });
  }

  /** On mobile the nav links live behind the hamburger button. */
  async navigateTo(name: string) {
    await test.step(`Go to "${name}" from the navigation`, async () => {
      if (await this.menuButton.isVisible()) {
        await this.menuButton.click();
      }
      await this.navLink(name).click();
    });
  }

  async expectToast(text: string | RegExp) {
    await test.step(`Toast says "${text}"`, async () => {
      await expect(this.toast.filter({ hasText: text }).first()).toBeVisible({ timeout: 15_000 });
    });
  }

  async hasHorizontalOverflow() {
    return this.page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
  }
}
