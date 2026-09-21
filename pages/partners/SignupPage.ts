import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../common/BasePage";

export interface ProfileDetails {
  firstName: string;
  lastName: string;
  phone: string;
  gender?: "Male" | "Female";
  state?: string;
  city?: string;
  address?: string;
}

export class SignupPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly termsCheckbox: Locator;
  readonly createAccountButton: Locator;

  readonly verifyEmailHeading: Locator;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly phoneInput: Locator;
  readonly genderDropdown: Locator;
  readonly stateDropdown: Locator;
  readonly cityDropdown: Locator;
  readonly addressInput: Locator;
  readonly profileContinueButton: Locator;

  readonly otpInput: Locator;
  readonly verifyOtpButton: Locator;

  constructor(page: Page) {
    super(page);

    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.confirmPasswordInput = page.locator('input[name="confirm_password"]');
    this.termsCheckbox = page.getByRole("checkbox");
    this.createAccountButton = page.getByRole("button", { name: /create account/i });

    this.verifyEmailHeading = page.getByRole("heading", { name: /verify your email/i });

    this.firstNameInput = page.locator('input[name="first_name"]');
    this.lastNameInput = page.locator('input[name="last_name"]');
    this.phoneInput = page.locator('input[name="phone"]');
    this.genderDropdown = page.getByText("Select your gender");
    this.stateDropdown = page.getByText("Select a state");
    this.cityDropdown = page.getByText("Select a city");
    this.addressInput = page.locator('input[name="street"]');
    this.profileContinueButton = page.getByRole("button", { name: /continue/i });

    this.otpInput = page.locator('input[name="otp"]');
    this.verifyOtpButton = page.getByRole("button", { name: "Verify", exact: true });
  }

  async createAccount(email: string, password: string) {
    await expect(this.emailInput).toBeVisible({ timeout: 20_000 });

    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
    await this.termsCheckbox.click({ force: true });
    await this.createAccountButton.click();

    await this.page.waitForURL(/\/auth\/verify-email\//, { timeout: 30_000 });
    await expect(this.verifyEmailHeading).toBeVisible({ timeout: 20_000 });
  }

  async confirmEmailVerification(verificationLink: string) {
    await this.page.goto(verificationLink);

    await expect(
      this.page.getByRole("heading", { name: /account created successfully/i })
    ).toBeVisible({ timeout: 20_000 });
  }

  async completeProfile(details: ProfileDetails) {
    await this.page.waitForURL(/\/complete-profile/, { timeout: 30_000 });
    await expect(this.firstNameInput).toBeVisible({ timeout: 20_000 });

    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.phoneInput.fill(details.phone);

    if (details.gender) {
      await this.genderDropdown.click();
      await this.page.getByRole("option", { name: details.gender, exact: true }).click();
    }

    if (details.state) {
      await this.stateDropdown.click();
      await this.page
        .getByRole("option", { name: details.state, exact: true })
        .first()
        .click();
    }

    if (details.city) {
      await this.cityDropdown.click();
      await this.page
        .getByRole("option", { name: details.city, exact: true })
        .first()
        .click();
    }

    if (details.address) {
      await this.addressInput.fill(details.address);
    }

    await this.profileContinueButton.click();
    await this.page.waitForURL(/\/auth\/verify\//, { timeout: 30_000 });
  }

  async submitPhoneOtp(code: string) {
    await expect(this.otpInput).toBeVisible({ timeout: 20_000 });
    await this.otpInput.fill(code);
    await this.verifyOtpButton.click();
  }
}
