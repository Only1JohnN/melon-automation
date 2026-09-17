import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../common/BasePage";

export class PayLinkPage extends BasePage {
  readonly amountInput: Locator;
  readonly continueToPayButton: Locator;

  readonly phoneInput: Locator;
  readonly continueButton: Locator;
  readonly phoneErrorText: Locator;

  readonly transferAccountHeading: Locator;
  readonly waitingForTransferText: Locator;

  constructor(page: Page) {
    super(page);

    this.amountInput = page.locator('input[inputmode="numeric"]').first();
    this.continueToPayButton = page.getByRole("button", { name: /continue to pay/i });

    this.phoneInput = page.locator('input[inputmode="tel"]');
    this.continueButton = page.getByRole("button", { name: "Continue", exact: true });
    this.phoneErrorText = page.getByText(/enter a valid nigerian phone number/i);

    this.transferAccountHeading = page.getByText(/transfer to this account/i);
    this.waitingForTransferText = page.getByText(/waiting for your transfer/i);
  }

  async goto(businessSlug: string) {
    await this.page.goto(`${process.env.STOREFRONT_URL}/pay/${businessSlug}`);
  }

  async selectPresetAmount(amount: string) {
    await this.page.getByRole("button", { name: amount, exact: true }).click();
  }

  async enterCustomAmount(amount: string) {
    await this.amountInput.fill(amount);
  }

  async continueToPay() {
    await this.continueToPayButton.click();
  }

  async enterPhoneNumber(phone: string) {
    await expect(this.phoneInput).toBeVisible({ timeout: 20_000 });
    await this.phoneInput.fill(phone);
    await this.continueButton.click();
  }

  async expectTransferDetails() {
    await expect(this.transferAccountHeading).toBeVisible({ timeout: 20_000 });
    await expect(this.waitingForTransferText).toBeVisible();
  }
}
