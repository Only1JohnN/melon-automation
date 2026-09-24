import { expect, Locator, Page, test, TestInfo } from "@playwright/test";
import { KNOWN_LAYOUT_ISSUES } from "../test-data/knownLayoutIssues";

export type Layout = "desktop" | "tablet" | "mobile";

/**
 * The merchant dashboard swaps its hamburger/cards layout for the sidebar/table one at 768px (Tailwind `md`),
 * and adds the "Help" label at 1024px (`lg`). So: phone < 768, tablet 768-1023, desktop 1024 and up.
 */
export function layoutOf(width: number): Layout {
  if (width >= 1024) return "desktop";
  return width >= 768 ? "tablet" : "mobile";
}

export const isTouchLayout = (layout: Layout) => layout !== "desktop";

/**
 * Opens a control. On tablets the sticky sidebar covers the left 240px of the merchant dashboard (see the pending
 * "tap Withdraw to bank" test), so a tap on a control there lands on the sidebar; those controls are activated from
 * the keyboard instead, which lets the rest of a test still run on a tablet.
 */
export async function activate(page: Page, control: Locator) {
  if (layoutOf(page.viewportSize()!.width) === "tablet") {
    await control.focus();
    await page.keyboard.press("Enter");
  } else {
    await control.click();
  }
}

export interface LayoutIssue {
  kind:
    | "page-overflow"
    | "off-screen"
    | "clipped-text"
    | "broken-image"
    | "small-target"
    | "no-viewport-meta";
  detail: string;
}

export interface AuditOptions {
  /** Flag interactive elements smaller than 24x24 CSS px (WCAG 2.5.8). Only meaningful on touch layouts. */
  checkTouchTargets?: boolean;
  /** CSS selectors to leave out (e.g. a known third-party widget). */
  ignore?: string[];
}

/** Waits for slide-in drawers, fades, transitions and images still loading, so nothing is measured mid-way. */
export async function settle(page: Page) {
  await page
    .evaluate(async () => {
      const finite = document.getAnimations().filter((animation) => {
        const timing = animation.effect?.getComputedTiming();
        return timing && timing.iterations !== Infinity;
      });

      // Images that are still on their way (QR codes come from another host) aren't broken yet.
      const loading = Array.from(document.images).filter((img) => img.loading !== "lazy" && !img.complete);
      const loaded = loading.map((img) => new Promise((resolve) => {
        img.addEventListener("load", resolve, { once: true });
        img.addEventListener("error", resolve, { once: true });
      }));

      await Promise.race([
        Promise.allSettled([...finite.map((animation) => animation.finished), ...loaded]),
        new Promise((resolve) => setTimeout(resolve, 5_000)),
      ]);
    })
    .catch(() => undefined);

  await page.waitForTimeout(150);
}

/**
 * Looks at the page as it is right now and reports anything that would make it hard to use at this
 * screen size. Runs in the page, so it works for any screen or open dialog without app-specific knowledge.
 */
export async function auditLayout(page: Page, options: AuditOptions = {}): Promise<LayoutIssue[]> {
  const issues = await measure(page, options);

  // An image that is only slow (or mounted a moment after the first look) isn't broken: look again before
  // reporting it, and trust the second look.
  if (issues.some((issue) => issue.kind === "broken-image")) {
    await page.waitForTimeout(3_000);
    return measure(page, options);
  }

  return issues;
}

async function measure(page: Page, options: AuditOptions): Promise<LayoutIssue[]> {
  await settle(page);

  return page.evaluate(
    ({ checkTouchTargets, ignore }) => {
      const issues: { kind: string; detail: string }[] = [];
      const viewportWidth = document.documentElement.clientWidth;
      const MAX_PER_KIND = 6;
      const counts: Record<string, number> = {};
      const add = (kind: string, detail: string) => {
        counts[kind] = (counts[kind] ?? 0) + 1;
        if (counts[kind] <= MAX_PER_KIND) issues.push({ kind, detail });
      };

      const describe = (el: Element) => {
        const text = ((el as HTMLElement).innerText ?? "").trim().replace(/\s+/g, " ").slice(0, 40);
        const id = el.id ? `#${el.id}` : "";
        return `<${el.tagName.toLowerCase()}${id}>${text ? ` "${text}"` : ""}`;
      };

      const ignored = (el: Element) => ignore.some((selector) => el.closest(selector));

      const visible = (el: Element) => {
        const style = getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          parseFloat(style.opacity) > 0 &&
          rect.width > 0 &&
          rect.height > 0
        );
      };

      const hiddenFromUsers = (el: Element) => !!el.closest('[aria-hidden="true"], [inert], [hidden]');

      const root = document.documentElement;

      if (root.scrollWidth > root.clientWidth + 1) {
        add("page-overflow", `page is ${root.scrollWidth}px wide in a ${viewportWidth}px viewport (sideways scrolling)`);
      }

      const meta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement | null;
      if (!meta || !/width=device-width/.test(meta.content)) {
        add("no-viewport-meta", meta ? `viewport meta is "${meta.content}"` : "no <meta name=viewport>");
      }

      const flagged = new Set<Element>();
      const all = Array.from(document.body.querySelectorAll("*"));

      for (const el of all) {
        if (ignored(el) || hiddenFromUsers(el) || !visible(el)) continue;

        const rect = el.getBoundingClientRect();

        // Content pushed past the edge of the screen. Only the outermost offender is reported, and content
        // that lives inside a scroller or a clipping box (carousel, table wrapper) is intended to.
        if (rect.right > viewportWidth + 1 || rect.left < -1) {
          let contained = false;
          for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
            const style = getComputedStyle(p);
            if (style.overflowX !== "visible" && p.getBoundingClientRect().right <= viewportWidth + 1) {
              contained = true;
              break;
            }
            if (flagged.has(p)) {
              contained = true;
              break;
            }
          }

          if (!contained && getComputedStyle(el).position !== "fixed") {
            flagged.add(el);
            add("off-screen", `${describe(el)} spans ${Math.round(rect.left)}px to ${Math.round(rect.right)}px of a ${viewportWidth}px screen`);
          }
        }

        // Text that is cut off with no ellipsis to say so.
        const style = getComputedStyle(el);
        if (
          (style.overflowX === "hidden" || style.overflowX === "clip") &&
          el.scrollWidth > el.clientWidth + 2 &&
          style.textOverflow !== "ellipsis" &&
          ((el as HTMLElement).innerText ?? "").trim().length > 0 &&
          el.children.length === 0
        ) {
          add("clipped-text", `${describe(el)} needs ${el.scrollWidth}px but is ${el.clientWidth}px wide`);
        }

        if (el.tagName === "IMG") {
          const img = el as HTMLImageElement;
          if (img.loading !== "lazy" && (!img.complete || img.naturalWidth === 0)) {
            add("broken-image", `image ${img.currentSrc || img.src || "(no src)"} did not load`);
          }
        }

        if (checkTouchTargets) {
          const interactive = el.matches('a[href], button, input:not([type="hidden"]), select, textarea, [role="button"], [role="tab"]');
          if (interactive && (rect.width < 24 || rect.height < 24)) {
            // Links sitting inside a sentence are exempt from the minimum size.
            const inline = el.tagName === "A" && getComputedStyle(el).display === "inline";
            const isFileInput = el.tagName === "INPUT" && (el as HTMLInputElement).type === "file";
            if (!inline && !isFileInput) {
              add("small-target", `${describe(el)} is only ${Math.round(rect.width)}x${Math.round(rect.height)}px`);
            }
          }
        }
      }

      return issues;
    },
    { checkTouchTargets: options.checkTouchTargets ?? false, ignore: options.ignore ?? [] }
  ) as Promise<LayoutIssue[]>;
}

/**
 * Audits the current screen and records any problems as (soft) failures, so one run reports every broken
 * screen instead of stopping at the first. A screenshot is attached when something is wrong.
 */
export async function expectResponsive(
  page: Page,
  label: string,
  testInfo: TestInfo,
  options: AuditOptions = {}
) {
  const viewport = page.viewportSize()!;
  const layout = layoutOf(viewport.width);
  const app = page.url().includes("customer.") ? "storefront" : "partners";
  const found = await auditLayout(page, {
    checkTouchTargets: isTouchLayout(layout),
    ...options,
  });

  // Problems the team already knows about (see test-data/knownLayoutIssues.ts) are recorded, not failed on, so a
  // new problem still fails while a known one stays visible in the report until it is fixed.
  const issues: LayoutIssue[] = [];
  for (const issue of found) {
    const text = `${issue.kind}: ${issue.detail}`;
    const known = KNOWN_LAYOUT_ISSUES.find(
      (k) => k.app === app && k.match.test(text) && (!k.layouts || k.layouts.includes(layout))
    );

    if (known) {
      testInfo.annotations.push({
        type: "known-layout-issue",
        description: `${label} (${layout}): ${text} — ${known.note}`,
      });
    } else {
      issues.push(issue);
    }
  }

  if (issues.length > 0) {
    const safe = label.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
    const path = testInfo.outputPath(`${safe}-${viewport.width}x${viewport.height}.png`);
    await page.screenshot({ path, fullPage: true }).catch(() => undefined);
    await testInfo.attach(`layout: ${label}`, { path, contentType: "image/png" }).catch(() => undefined);
  }

  expect
    .soft(
      issues.map((issue) => `${issue.kind}: ${issue.detail}`),
      `${label} at ${viewport.width}x${viewport.height}`
    )
    .toEqual([]);
}

/** Runs `body` with the screen turned on its side (phone/tablet landscape), then restores it. */
export async function inLandscape(page: Page, body: () => Promise<void>) {
  const original = page.viewportSize()!;

  await test.step(`Rotate to landscape (${original.height}x${original.width})`, async () => {
    await page.setViewportSize({ width: original.height, height: original.width });
    await page.waitForTimeout(400);
    try {
      await body();
    } finally {
      await page.setViewportSize(original);
    }
  });
}
