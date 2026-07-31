import { test } from "@playwright/test";

test("authenticate storefront", async ({ page }) => {
  await page.goto(`${process.env.STOREFRONT_URL}/stores/melonqabot`);

  await page.context().storageState({
    path: "playwright/.auth/storefront.json",
  });

  console.log("✅ Storefront storage state saved.");
});