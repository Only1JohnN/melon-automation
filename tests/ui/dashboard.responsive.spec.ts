import { test, expect } from "@playwright/test";

// NOTE: These tests assume the dashboard dev server is running at http://localhost:3000
// Run with: `npm --prefix dashboard run dev` then `npx playwright test tests/ui/dashboard.responsive.spec.ts`

const viewports = [
  { name: "mobile", width: 375, height: 812, expectMenu: true },
  { name: "tablet", width: 768, height: 1024, expectMenu: true },
  { name: "desktop", width: 1366, height: 768, expectMenu: false },
];

for (const vp of viewports) {
  test.describe(`${vp.name} viewport`, () => {
    test(`${vp.name} sidebar behavior`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      await page.goto("http://localhost:3000/");

      // Menu toggle should be visible on small screens
      const menuButton = page.getByRole("button", { name: /toggle menu/i });

      if (vp.expectMenu) {
        await expect(menuButton).toBeVisible();
      } else {
        await expect(menuButton).toBeHidden();
      }

      // Capture a screenshot for visual review
      await page.screenshot({ path: `test-results/screenshot-${vp.name}.png`, fullPage: true });
    });
  });
}
