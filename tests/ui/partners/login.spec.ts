import { Applications } from "../../../config/applications";
import { LoginPage } from "../../../pages/partners/LoginPage";

import {
  test,
  expect,
  loginAsPartner,
} from "../../../fixtures/baseTest";

test.describe("@partners @auth", () => {
  test("should allow a partner to log in successfully", async ({
    page,
  }) => {
    await loginAsPartner(page);

    await expect(page).toHaveURL(/get-started/, {
      timeout: 100000,
    });
  });

  test("should display an error message for invalid credentials", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    await page.goto(`${Applications.partners.url}/auth/login`);

    await loginPage.login(
      "invalid.user@yopmail.com",
      "InvalidPassword123!",
      { expectSuccess: false }
    );

    await expect(
      page.getByText("User not found")
    ).toBeVisible({
      timeout: 100000,
    });
  });

  test.describe("@partners", () => {
    test("should display verification failed page for an invalid verification token and allow navigation to login", async ({
      page,
    }) => {
      const loginPage = new LoginPage(page);
      await page.goto(
        `${Applications.partners.url}/auth/email-verified/3264794e-896f-44c4-b709-740470b66073`
      );

      await expect(
        page.getByRole("heading", {
          name: /verification failed/i,
        })
      ).toBeVisible();

      await page.getByRole("button", {
        name: /back to log in/i,
      }).click();

      await expect(page).toHaveURL(
        /auth\/login/,
        {
          timeout: 100000,
        }
      );

      await expect(
        loginPage.emailInput
      ).toBeVisible();

      await expect(
        loginPage.passwordInput
      ).toBeVisible();
    });
  });
});