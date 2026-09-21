import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../common/BasePage";

export class ForgotPasswordPage extends BasePage {
  readonly emailInput: Locator;
  readonly sendResetLinkButton: Locator;
  readonly resetSentHeading: Locator;

  readonly newPasswordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly resetPasswordButton: Locator;

  constructor(page: Page) {
    super(page);

    this.emailInput = page.locator('input[name="email"]');
    this.sendResetLinkButton = page.getByRole("button", { name: /get password reset link/i });
    this.resetSentHeading = page.getByRole("heading", { name: /reset password mail sent/i });

    this.newPasswordInput = page.locator('input[name="password1"]');
    this.confirmPasswordInput = page.locator('input[name="password2"]');
    this.resetPasswordButton = page.getByRole("button", { name: /reset password/i });
  }

  async requestResetLink(email: string) {
    await expect(this.emailInput).toBeVisible({ timeout: 20_000 });

    await this.emailInput.fill(email);
    await this.sendResetLinkButton.click();

    await this.page.waitForURL(/\/auth\/forgot-password\//, { timeout: 30_000 });
    await expect(this.resetSentHeading).toBeVisible({ timeout: 20_000 });
  }

  async resetPassword(resetLink: string, newPassword: string) {
    await this.page.goto(resetLink);

    await expect(this.newPasswordInput).toBeVisible({ timeout: 20_000 });
    await this.newPasswordInput.fill(newPassword);
    await this.confirmPasswordInput.fill(newPassword);
    await this.resetPasswordButton.click();

    await this.page.waitForURL(/\/auth\/login/, { timeout: 30_000 });
  }
}
