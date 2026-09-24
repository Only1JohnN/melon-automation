import { Page } from "@playwright/test";
import { MerchantHomePage } from "../../../../pages/partners/merchant/HomePage";
import { MerchantTransactionsPage } from "../../../../pages/partners/merchant/TransactionsPage";
import { test, expect } from "../../../../fixtures/baseTest";
import { env } from "../../../../config/environment";
import { activate, expectResponsive, inLandscape, isTouchLayout, layoutOf } from "../../../../utils/responsive";
import { gotoWithRetry } from "../../../../utils/navigation";

/**
 * Runs at desktop, tablet and phone size (see the merchant / merchant-tablet / merchant-mobile projects).
 * Every screen is found from the live navigation, so a new section is checked without editing this file.
 */

const MERCHANT_LINK = 'a[href^="/simple/"]';

/** Something that shows real data on a screen, so it isn't audited while still a loading skeleton. */
function readyFor(page: Page, path: string) {
  if (path.endsWith("/home") || path.endsWith("/transactions")) {
    return page.getByText(/^MELON-\d+$/).locator("visible=true").first();
  }
  if (path.endsWith("/profile")) return page.getByText("First name", { exact: true });
  if (path.endsWith("/business")) return page.getByText("Business name", { exact: true });
  // Phones show these as cards instead of a table, so wait for whichever is on screen.
  if (path.endsWith("/withdrawal")) {
    return page
      .locator("table tbody tr td")
      .locator("visible=true")
      .or(page.getByText("Account Name", { exact: true }).locator("visible=true"))
      .first();
  }
  if (path.endsWith("/payment-link")) return page.getByText("Your live link");
  if (path.endsWith("/qrcode")) return page.getByAltText("Your reward QR code");
  if (path.endsWith("/socials")) return page.getByText("Your links");
  if (path.endsWith("/locations")) return page.locator("table tbody tr td").first();
  return page.locator("main").first();
}

async function openScreen(page: Page, path: string) {
  await gotoWithRetry(page, `${env.partnerUrl}${path}`);
  await page.waitForLoadState("networkidle").catch(() => undefined);
  await expect(readyFor(page, path)).toBeVisible({ timeout: 45_000 });
  await page.waitForTimeout(600);
}

async function discoverScreens(page: Page): Promise<string[]> {
  const paths = new Set<string>();

  for (const start of ["/simple/home", "/simple/settings/profile"]) {
    await gotoWithRetry(page, `${env.partnerUrl}${start}`);
    await page.waitForLoadState("networkidle").catch(() => undefined);
    await page.waitForTimeout(1500);

    const hrefs = await page.locator(MERCHANT_LINK).evaluateAll((links) =>
      links.map((link) => link.getAttribute("href")!)
    );
    hrefs.forEach((href) => paths.add(href.split("?")[0].replace(/\/$/, "")));
  }

  // /simple/settings alone just redirects to its first section.
  paths.delete("/simple/settings");
  paths.add("/simple/settings/profile");

  return [...paths].sort();
}

test.describe("@partners @responsive", () => {
  test.setTimeout(300_000);

  test("should show the right navigation for this screen size @smoke", async ({ page }) => {
    const home = new MerchantHomePage(page);
    await home.open();

    const layout = layoutOf(page.viewportSize()!.width);

    if (layout === "mobile") {
      await test.step("Phone: navigation sits behind the menu button", async () => {
        await expect(home.menuButton).toBeVisible();
        await expect(home.navLink("Transactions")).toBeHidden();

        await home.menuButton.click();
        for (const name of ["Home", "Transactions", "Settings"]) {
          await expect(home.navLink(name)).toBeVisible();
        }
      });
    } else {
      await test.step(`${layout}: the sidebar is always there and there is no menu button`, async () => {
        for (const name of ["Home", "Transactions", "Settings"]) {
          await expect(home.navLink(name)).toBeVisible();
        }
        await expect(home.menuButton).toBeHidden();
      });
    }

    await test.step("Every top-level link works from here", async () => {
      await home.navigateTo("Transactions");
      await expect(page).toHaveURL(/\/simple\/transactions/);
      await home.navigateTo("Settings");
      await expect(page).toHaveURL(/\/simple\/settings/);
      await home.navigateTo("Home");
      await expect(page).toHaveURL(/\/simple\/home/);
    });
  });

  test("should put the page content on the first screen, not below the navigation @smoke", async ({ page }) => {
    const { width, height } = page.viewportSize()!;

    // Between 768px and 1023px the dashboard shows the desktop sidebar but only lays out side by side from 1024px,
    // so the sidebar fills the whole first screen and the page starts ~1,200px further down.
    test.fixme(
      width >= 768 && width < 1024,
      "TODO(dev): at 768-1023px wide the sidebar is shown but the layout is still stacked (it goes side-by-side at 1024px), so the sidebar takes the whole first screen and the dashboard content starts about 1,200px down. Either show the hamburger below 1024px or switch to the side-by-side layout from 768px."
    );

    const home = new MerchantHomePage(page);
    await home.open();

    const top = await home.balanceCard.evaluate((el) => el.getBoundingClientRect().top);
    expect(top, `the balance card starts ${Math.round(top)}px down a ${height}px-tall screen`).toBeLessThan(height * 0.6);
  });

  test("should let the merchant tap 'Withdraw to bank' after scrolling to it", async ({ page }) => {
    const layout = layoutOf(page.viewportSize()!.width);

    test.fixme(
      layout === "tablet",
      "TODO(dev): at 768-1023px the sticky full-height sidebar sits on top of the page content once you scroll, so \"Withdraw to bank\" (and anything else in the left 240px) can't be tapped: the sidebar receives the tap. Fix together with the stacked-layout bug above."
    );

    const home = new MerchantHomePage(page);
    await home.open();
    await home.withdrawButton.scrollIntoViewIfNeeded();

    const covered = await home.withdrawButton.evaluate((button) => {
      const box = button.getBoundingClientRect();
      const top = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2);
      return !!top && !button.contains(top) && !top.contains(button);
    });

    expect(covered, "something else sits on top of the Withdraw to bank button").toBe(false);
  });

  test("should show every column of the recent transactions table without sideways scrolling", async ({ page }) => {
    const layout = layoutOf(page.viewportSize()!.width);

    test.skip(layout === "mobile", "Phones show cards instead of a table");
    test.fixme(
      layout === "tablet",
      "TODO(dev): at tablet width the recent transactions table needs about 785px but its card is 754px wide, so the Status column is cut off (\"Successfu\") until the card is scrolled sideways. Let the columns shrink, or show cards below 1024px."
    );

    const home = new MerchantHomePage(page);
    await home.open();
    await home.waitUntilReady();

    const overflow = await page.locator("table").first().evaluate((table) => {
      let wrapper: HTMLElement | null = table.parentElement;
      while (wrapper && getComputedStyle(wrapper).overflowX === "visible") wrapper = wrapper.parentElement;
      return wrapper ? wrapper.scrollWidth - wrapper.clientWidth : 0;
    });

    expect(overflow, "pixels of the table hidden to the right of its card").toBeLessThanOrEqual(1);
  });

  test("should fit the screen on every merchant page @smoke", async ({ page }, testInfo) => {
    const screens = await test.step("Find every page from the navigation", () => discoverScreens(page));

    // The dashboard has these today; if one disappears from the navigation the discovery would silently shrink.
    for (const expected of ["/simple/home", "/simple/transactions", "/simple/settings/profile"]) {
      expect(screens, "navigation still lists the core pages").toContain(expected);
    }

    for (const path of screens) {
      await test.step(`${path}`, async () => {
        await openScreen(page, path);
        await expectResponsive(page, path, testInfo);
      });
    }
  });

  test("should fit the screen in every dialog, panel and picker", async ({ page }, testInfo) => {
    const home = new MerchantHomePage(page);
    const transactions = new MerchantTransactionsPage(page);

    await test.step("Home: share payment link modal", async () => {
      await home.open();
      await home.openShareModal();
      await expectResponsive(page, "share payment link modal", testInfo);
      await home.closeShareModal();
    });

    await test.step("Home: QR code modal", async () => {
      await home.open();
      await home.openQrModal();
      // The QR image is fetched from another host after the modal opens.
      await expect.poll(() => home.qrModalImage.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth)).toBeGreaterThan(0);
      await expectResponsive(page, "QR code modal", testInfo);
      await home.closeQrModal();
    });

    await test.step("Home: withdraw panel and add-bank form", async () => {
      await home.open();
      if (layoutOf(page.viewportSize()!.width) === "tablet") {
        // The sidebar covers this button on tablets (see the "tap Withdraw to bank" test above), so open
        // the panel from the keyboard to still check how the panel itself looks.
        await home.withdrawButton.focus();
        await page.keyboard.press("Enter");
      } else {
        await home.openWithdraw();
      }
      await expect(home.noBankTitle.or(home.addBankIntro)).toBeVisible();
      await expectResponsive(page, "withdraw panel", testInfo);

      if (await home.addBankAccountButton.isVisible()) {
        await home.openAddBankForm();
        await expectResponsive(page, "add bank form", testInfo);

        await activate(page, home.bankSelect);
        await expect(page.getByRole("option").first()).toBeVisible();
        await expectResponsive(page, "bank picker", testInfo);
        await page.keyboard.press("Escape");
      }
    });

    await test.step("Transactions: period picker", async () => {
      await transactions.open();
      await activate(page, transactions.rangeControl);
      await expect(transactions.calendar).toBeVisible();
      await expectResponsive(page, "period picker", testInfo);
      await page.keyboard.press("Escape");
    });

    await test.step("Transactions: date filter", async () => {
      await transactions.open();
      await activate(page, transactions.dateFilter.first());
      await expect(transactions.calendar).toBeVisible();
      await expectResponsive(page, "date filter", testInfo);
      await page.keyboard.press("Escape");
    });

    await test.step("Transactions: withdrawal requests tab and its status filter", async () => {
      await transactions.open();
      await transactions.openWithdrawals();
      await expectResponsive(page, "withdrawal requests tab", testInfo);

      await activate(page, transactions.statusFilter);
      await expect(page.getByRole("option").first()).toBeVisible();
      await expectResponsive(page, "withdrawal status filter", testInfo);
      await page.keyboard.press("Escape");
    });

    await test.step("Settings > Profile: edit form", async () => {
      await openScreen(page, "/simple/settings/profile");
      await activate(page, page.getByRole("button", { name: "Edit" }).first());
      await expect(page.locator('input[name="first_name"]')).toBeVisible();
      await expectResponsive(page, "edit profile form", testInfo);
      await page.getByRole("button", { name: "Cancel" }).click();
    });

    await test.step("Settings > Business: edit form", async () => {
      await openScreen(page, "/simple/settings/business");
      await activate(page, page.getByRole("button", { name: "Edit" }).last());
      await expect(page.locator('input[name="business_email"]')).toBeVisible();
      await expectResponsive(page, "edit business form", testInfo);
      await page.getByRole("button", { name: "Cancel" }).click();
    });

    await test.step("Settings > Website & Social Media: edit form", async () => {
      await openScreen(page, "/simple/settings/socials");
      await activate(page, page.getByRole("button", { name: "Edit" }).last());
      await expect(page.locator('input[name="website"]')).toBeVisible();
      await expectResponsive(page, "edit socials form", testInfo);
      await page.getByRole("button", { name: "Cancel" }).click();
    });

    await test.step("Settings > Physical Store Location: add and edit dialogs", async () => {
      await openScreen(page, "/simple/settings/locations");
      await activate(page, page.getByRole("button", { name: "Add another location" }));
      await expect(page.getByText("Create Branches")).toBeVisible();
      await expectResponsive(page, "add location dialog", testInfo);
      await activate(page, page.getByRole("button", { name: "Add Trading Address" }));
      await expect(page.getByText("Select manager")).toBeVisible();
      await expectResponsive(page, "add trading address form", testInfo);
      await page.getByRole("button", { name: "Cancel" }).click();

      await activate(page, page.locator("table tbody tr").first().getByRole("button", { name: "Edit" }));
      await expect(page.getByText("Edit Branch")).toBeVisible();
      await expectResponsive(page, "edit location dialog", testInfo);
      await page.getByRole("button", { name: "Cancel" }).click();
    });

    await test.step("Settings > Withdrawal Bank: add bank panel", async () => {
      await openScreen(page, "/simple/settings/withdrawal");
      await activate(page, page.getByRole("button", { name: "Add Withdrawal Bank" }));
      await expect(page.getByText("Enter details to connect your withdrawal bank account.")).toBeVisible();
      await expectResponsive(page, "add withdrawal bank panel", testInfo);
    });
  });

  test("should fit the screen when turned on its side", async ({ page }, testInfo) => {
    test.skip(!isTouchLayout(layoutOf(page.viewportSize()!.width)), "Landscape only matters on phones and tablets");

    await inLandscape(page, async () => {
      for (const path of ["/simple/home", "/simple/transactions", "/simple/settings/profile", "/simple/settings/qrcode"]) {
        await test.step(`${path} (landscape)`, async () => {
          await openScreen(page, path);
          await expectResponsive(page, `${path} landscape`, testInfo);
        });
      }
    });
  });
});
