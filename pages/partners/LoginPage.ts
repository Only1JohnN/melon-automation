import { Locator, Page } from "@playwright/test";
import { BasePage } from "../common/BasePage";

export class LoginPage extends BasePage {
  readonly loginLink: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);

    this.loginLink = page.getByRole("button", {
      name: "Login",
    });

    this.emailInput = page.getByRole("textbox", {
      name: "Email Address",
    });

    this.passwordInput = page.getByRole("textbox", {
      name: "Enter password",
    });

    this.loginButton = page.getByRole("button", {
      name: "Log In",
    });
  }

  async login(email: string, password: string) {
    await this.loginLink.click();

    await this.emailInput.fill(email);

    await this.passwordInput.fill(password);

    await this.loginButton.click();
  }
}