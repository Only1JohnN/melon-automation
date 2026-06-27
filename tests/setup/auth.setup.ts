import { test, expect } from "@playwright/test";

test(
  "authenticate partner",
  async ({ page }) => {
    await page.goto(
      `${process.env.PARTNER_URL}/auth/login`
    );

    await page
      .getByRole("textbox", {
        name: "Email Address",
      })
      .fill(
        process.env.PARTNER_EMAIL!
      );

    await page
      .getByRole("textbox", {
        name: "Enter password",
      })
      .fill(
        process.env.PARTNER_PASSWORD!
      );

    await page
      .getByRole("button", {
          name: "Log In",
      })
      .click();
  
    await expect(page).not.toHaveURL(
      /auth\/login/
      );
  
    await page.waitForTimeout(
      5000
      );
  
    await page.context().storageState({
      path: "playwright/.auth/partner.json",
      });
  }
);