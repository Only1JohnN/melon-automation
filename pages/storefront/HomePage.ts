import { expect, Locator, Page } from "@playwright/test";
import { env } from "@config/environment";

export class HomePage {
  readonly page: Page;

  readonly startShoppingButton: Locator;
  readonly addToCartButton: Locator;
  readonly cartButton: Locator;
  readonly checkoutButton: Locator;
  readonly phoneInput: Locator;
  readonly continueButton: Locator;
  readonly pickupOption: Locator;
  readonly onlinePaymentOption: Locator;

  constructor(page: Page) {
    this.page = page;

    this.startShoppingButton = page.getByRole("button", {
      name: /start shopping/i,
    });

    this.addToCartButton = page.getByRole("button", {
      name: /add to cart/i,
    });

    this.cartButton = page.getByText("Your Cart");

    this.checkoutButton = page.getByRole("button", {
      name: /checkout/i,
    });

    this.phoneInput = page.getByRole("textbox", {
      name: /melon id|phone number/i,
    });

    this.continueButton = page.getByRole("button", {
      name: /^continue$/i,
    });

    this.pickupOption = page.getByText(/pick up/i);

    this.onlinePaymentOption = page.getByText(/online payments/i);
  }

  async goto() {
    await this.page.goto(
    `${env.storefrontUrl}/stores/melonqabot`
    );
  }

  async startShopping() {
    await this.startShoppingButton.click();
  }

  async addFirstProductToCart() {
    await this.addToCartButton.first().click();
  }

  async openCart() {
    await this.cartButton.click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async enterPhone(phone: string) {
    await this.phoneInput.fill(phone);
    await this.continueButton.click();
  }

  async choosePickup() {
    await this.pickupOption.click();
    await this.continueButton.click();
  }

  async chooseOnlinePayment() {
    await this.onlinePaymentOption.click();
    await this.continueButton.click();
  }

  async expectRedirectedToPaga() {
    await expect(this.page).toHaveURL(/beta-checkout\.paga\.com/i);
  }
}