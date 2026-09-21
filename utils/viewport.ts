import { expect, Locator, Page } from "@playwright/test";

/**
 * The element is fully on screen horizontally (nothing is cut off or needs sideways scrolling).
 * Polls, because sheets/dialogs slide in and are briefly off-screen while animating.
 */
export async function expectFitsViewportWidth(page: Page, locator: Locator, label = "element") {
  const viewport = page.viewportSize()!;
  await expect
    .poll(
      async () => {
        const box = await locator.boundingBox();
        return !!box && box.x >= -1 && box.x + box.width <= viewport.width + 1;
      },
      { message: `${label} is rendered and inside the ${viewport.width}px-wide screen` }
    )
    .toBe(true);
}

/** Comfortable touch target (Material/HIG suggest 44-48px; 40 leaves room for compact designs). */
export async function expectTapTarget(locator: Locator, label = "control", minHeight = 40) {
  const box = await locator.boundingBox();

  expect(box, `${label} is rendered`).not.toBeNull();
  expect(box!.height, `${label} is tall enough to tap`).toBeGreaterThanOrEqual(minHeight);
}

export async function pageOverflowsHorizontally(page: Page) {
  return page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
}
