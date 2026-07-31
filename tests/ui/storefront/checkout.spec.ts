import { test } from "@playwright/test";
import { HomePage } from "@pages/storefront/HomePage";

test("customer can reach payment page", async ({ page }) => {
  const home = new HomePage(page);

  await home.goto();

  await home.startShopping();

  await home.addFirstProductToCart();

  await home.openCart();

  await home.checkout();

  await home.enterPhone("07080702920");

  await home.choosePickup();

  await home.chooseOnlinePayment();

  await home.expectRedirectedToPaga();
});