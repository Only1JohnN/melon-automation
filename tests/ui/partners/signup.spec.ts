import { Applications } from "../../../config/applications";
import { SignupPage } from "../../../pages/partners/SignupPage";
import { LoginPage } from "../../../pages/partners/LoginPage";
import { createSignupAccount } from "../../../test-data/factories/signupFactory";
import { getEmailVerificationLink } from "../../../utils/yopmail";

import { test, expect } from "../../../fixtures/baseTest";

test.describe("@partners @auth @signup", () => {
  test("should allow a new partner to create an account and verify their email @smoke", async ({
    page,
  }) => {
    const signupPage = new SignupPage(page);
    const loginPage = new LoginPage(page);
    const account = createSignupAccount();

    await page.goto(`${Applications.partners.url}/auth/create-account`);
    await signupPage.createAccount(account.email, account.password);

    const verificationLink = await getEmailVerificationLink(page, account.email);
    await signupPage.confirmEmailVerification(verificationLink);

    await page.goto(`${Applications.partners.url}/auth/login`);
    await loginPage.login(account.email, account.password, { expectSuccess: false });

    await expect(page).toHaveURL(/\/complete-profile/, { timeout: 30_000 });
    await expect(signupPage.firstNameInput).toBeVisible({ timeout: 20_000 });
    await expect(signupPage.phoneInput).toBeVisible();
  });

  test("should show an error when the password and confirmation do not match", async ({
    page,
  }) => {
    const signupPage = new SignupPage(page);
    const account = createSignupAccount();

    await page.goto(`${Applications.partners.url}/auth/create-account`);
    await signupPage.emailInput.fill(account.email);
    await signupPage.passwordInput.fill(account.password);
    await signupPage.confirmPasswordInput.fill("SomethingElse@12345");
    await signupPage.termsCheckbox.click({ force: true });
    await signupPage.createAccountButton.click();

    await expect(page.getByText("Passwords must match")).toBeVisible();
    await expect(page).toHaveURL(/\/auth\/create-account/);
  });

  test("should show an error for a password that does not meet the strength requirements", async ({
    page,
  }) => {
    const signupPage = new SignupPage(page);
    const account = createSignupAccount();

    await page.goto(`${Applications.partners.url}/auth/create-account`);
    await signupPage.emailInput.fill(account.email);
    await signupPage.passwordInput.fill("weak");
    await signupPage.confirmPasswordInput.fill("weak");
    await signupPage.termsCheckbox.click({ force: true });
    await signupPage.createAccountButton.click();

    await expect(
      page.getByText("Password must be at least 6 characters long.", { exact: true }).first()
    ).toBeVisible();
    await expect(page).toHaveURL(/\/auth\/create-account/);
  });

  test("should require agreeing to the terms before creating an account", async ({ page }) => {
    const signupPage = new SignupPage(page);
    const account = createSignupAccount();

    await page.goto(`${Applications.partners.url}/auth/create-account`);
    await signupPage.emailInput.fill(account.email);
    await signupPage.passwordInput.fill(account.password);
    await signupPage.confirmPasswordInput.fill(account.password);
    await signupPage.createAccountButton.click({ force: true });

    await expect(page.getByText("Please agree to the terms.")).toBeVisible();
    await expect(page).toHaveURL(/\/auth\/create-account/);
  });

  test("should not submit the create-account form for an invalid email format", async ({
    page,
  }) => {
    const signupPage = new SignupPage(page);
    const account = createSignupAccount();

    await page.goto(`${Applications.partners.url}/auth/create-account`);
    await signupPage.emailInput.fill("not-an-email");
    await signupPage.passwordInput.fill(account.password);
    await signupPage.confirmPasswordInput.fill(account.password);
    await signupPage.termsCheckbox.click({ force: true });
    await signupPage.createAccountButton.click();

    await expect(page).toHaveURL(/\/auth\/create-account/);
    await expect(signupPage.emailInput).toBeVisible();
  });
});

// Requires a real SMS OTP, so it's excluded from CI (see package.json's
// test:pre-release:ci) and only runs when someone supplies both env vars
// after checking the phone that received the code, e.g.:
//   TEST_PHONE_NUMBER=07080702920 SIGNUP_OTP=1234 npx playwright test --grep @manual
test.describe("@partners @auth @signup @manual", () => {
  test("should verify a phone number by OTP and reach business type selection", async ({
    page,
  }) => {
    test.skip(
      !process.env.TEST_PHONE_NUMBER || !process.env.SIGNUP_OTP,
      "Set TEST_PHONE_NUMBER and SIGNUP_OTP (the code received by SMS) to run this test."
    );

    const signupPage = new SignupPage(page);
    const loginPage = new LoginPage(page);
    const account = createSignupAccount({ phone: process.env.TEST_PHONE_NUMBER });

    await page.goto(`${Applications.partners.url}/auth/create-account`);
    await signupPage.createAccount(account.email, account.password);

    const verificationLink = await getEmailVerificationLink(page, account.email);
    await signupPage.confirmEmailVerification(verificationLink);

    await page.goto(`${Applications.partners.url}/auth/login`);
    await loginPage.login(account.email, account.password, { expectSuccess: false });

    await signupPage.completeProfile({
      firstName: account.firstName,
      lastName: account.lastName,
      phone: account.phone,
      gender: "Male",
      state: "Lagos",
      city: "Ikeja",
      address: "123 Test Street",
    });

    await signupPage.submitPhoneOtp(process.env.SIGNUP_OTP!);

    await expect(page).toHaveURL(/\/select-business-type/, { timeout: 20_000 });
  });
});
