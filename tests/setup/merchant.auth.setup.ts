import { test as setup } from "@playwright/test";
import { LoginPage } from "../../pages/partners/LoginPage";
import { env } from "../../config/environment";

const MERCHANT_STATE = "playwright/.auth/merchant.json";

setup("@setup authenticate merchant", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await setup.step("Log in as the QA merchant", async () => {
    await page.goto(`${env.partnerUrl}/auth/login`);
    await loginPage.login(env.partnerEmail, env.partnerPassword);
  });

  await setup.step("Save the authenticated session", async () => {
    await page.context().storageState({ path: MERCHANT_STATE });
  });
});
