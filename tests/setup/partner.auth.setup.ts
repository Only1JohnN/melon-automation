import { test } from "@playwright/test";
import { LoginPage } from "../../pages/partners/LoginPage";

test("authenticate partner", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto(`${process.env.PARTNER_URL}/auth/login`);
  await loginPage.login(process.env.PARTNER_EMAIL!, process.env.PARTNER_PASSWORD!);

  await page.context().storageState({ path: "playwright/.auth/partner.json" });
  console.log('✅ Storage state saved.');
});