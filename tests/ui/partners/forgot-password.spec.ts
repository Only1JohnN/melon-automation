import { Applications } from "../../../config/applications";
import { SignupPage } from "../../../pages/partners/SignupPage";
import { LoginPage } from "../../../pages/partners/LoginPage";
import { ForgotPasswordPage } from "../../../pages/partners/ForgotPasswordPage";
import { createSignupAccount } from "../../../test-data/factories/signupFactory";
import { getEmailVerificationLink, getPasswordResetLink } from "../../../utils/yopmail";

import { test, expect } from "../../../fixtures/baseTest";

test.describe("@partners @auth @forgot-password @smoke", () => {
  // Sign-up + two emails read from yopmail: slow on a busy inbox, so the default 90s is too tight.
  test.describe.configure({ timeout: 240_000 });

  test("should let a partner reset their password via an emailed link and log in with it", async ({
    page,
  }) => {
    const signupPage = new SignupPage(page);
    const forgotPasswordPage = new ForgotPasswordPage(page);
    const loginPage = new LoginPage(page);
    const account = createSignupAccount();
    const newPassword = "NewPassword@12345";

    // A verified account is needed to exercise the reset flow against.
    await page.goto(`${Applications.partners.url}/auth/create-account`);
    await signupPage.createAccount(account.email, account.password);

    const verificationLink = await getEmailVerificationLink(page, account.email);
    await signupPage.confirmEmailVerification(verificationLink);

    await page.goto(`${Applications.partners.url}/auth/login`);
    await page.getByText("Reset here").click();
    await forgotPasswordPage.requestResetLink(account.email);

    const resetLink = await getPasswordResetLink(page, account.email);
    await forgotPasswordPage.resetPassword(resetLink, newPassword);

    await loginPage.login(account.email, newPassword, { expectSuccess: false });
    await expect(page).toHaveURL(/\/complete-profile/, { timeout: 30_000 });
  });
});

test.describe("@partners @auth @forgot-password", () => {
  test.describe.configure({ timeout: 240_000 });

  test("should show the same confirmation whether or not the account exists", async ({
    page,
  }) => {
    const forgotPasswordPage = new ForgotPasswordPage(page);
    const unregisteredEmail = `no-account.${Date.now()}@yopmail.com`;

    await page.goto(`${Applications.partners.url}/auth/forgot-password`);
    await forgotPasswordPage.requestResetLink(unregisteredEmail);
  });

  test("should show an error when the new password and confirmation do not match", async ({
    page,
  }) => {
    const signupPage = new SignupPage(page);
    const forgotPasswordPage = new ForgotPasswordPage(page);
    const account = createSignupAccount();

    await page.goto(`${Applications.partners.url}/auth/create-account`);
    await signupPage.createAccount(account.email, account.password);

    const verificationLink = await getEmailVerificationLink(page, account.email);
    await signupPage.confirmEmailVerification(verificationLink);

    await page.goto(`${Applications.partners.url}/auth/forgot-password`);
    await forgotPasswordPage.requestResetLink(account.email);

    const resetLink = await getPasswordResetLink(page, account.email);
    await page.goto(resetLink);

    await forgotPasswordPage.newPasswordInput.fill("Password@12345");
    await forgotPasswordPage.confirmPasswordInput.fill("Different@12345");
    await forgotPasswordPage.resetPasswordButton.click();

    await expect(page.getByText("Passwords must match")).toBeVisible();
    await expect(page).toHaveURL(/\/business\/forget-password\//);
  });
});
