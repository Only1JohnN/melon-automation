import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../common/BasePage";

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);

    this.emailInput = page
      .locator('input[type="email"], input[name="email"], input[placeholder*="email" i]')
      .first();

    this.passwordInput = page
      .locator('input[type="password"], input[name="password"], input[placeholder*="password" i]')
      .first();

    this.loginButton = page
      .locator('button[type="submit"], button')
      .filter({ hasText: /log in/i })
      .first();
  }

  async login(
    email: string,
    password: string,
    options?: { expectSuccess?: boolean }
  ) {
    await expect(this.emailInput).toBeVisible({ timeout: 20_000 });
    await expect(this.passwordInput).toBeVisible({ timeout: 20_000 });

    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();

    if (options?.expectSuccess ?? true) {
      await this.page.waitForURL(/^(?!.*\/auth\/login).*$/, { timeout: 30000 });
      await this.page.waitForURL(/\/get-started/, { timeout: 30_000 });
      await expect(this.page.getByRole("button", { name: /skip to dashboard/i })).toBeVisible({
        timeout: 20_000,
      });
    }
  }
}