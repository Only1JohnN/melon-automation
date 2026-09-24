# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/storefront/pay.responsive.spec.ts >> @storefront @pay @responsive >> should fit the screen on every step of the pay flow @smoke
- Location: tests/ui/storefront/pay.responsive.spec.ts:36:7

# Error details

```
Error: phone step (empty) at 412x839

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "small-target: <button> \"← Back\" is only 49x17px",
+ ]
```

```
Error: phone step (incomplete number) at 412x839

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "small-target: <button> \"← Back\" is only 49x17px",
+ ]
```

```
Error: transfer details step at 412x839

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "small-target: <button> \"← Back\" is only 49x17px",
+ ]
```

```
Error: checking the transfer at 412x839

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "small-target: <button> \"← Back\" is only 49x17px",
+ ]
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - main [ref=e3]:
    - button "Switch theme" [ref=e8] [cursor=pointer]:
      - img [ref=e9]
    - generic [ref=e15]:
      - generic [ref=e16]:
        - img "Melon QA Bot" [ref=e17]
        - heading "Melon QA Bot" [level=1] [ref=e18]
        - generic [ref=e19]:
          - img [ref=e21]
          - generic [ref=e23]: KYC Approved
        - paragraph [ref=e24]: Where Quality meets Innovation
        - generic [ref=e25]:
          - generic [ref=e26]:
            - generic [ref=e27]: "49"
            - generic [ref=e28]: Payments completed on Melon
          - generic [ref=e29]:
            - generic [ref=e30]: 2 months
            - generic [ref=e31]: KYC verified since Jul 2026
      - generic [ref=e32]:
        - button "← Back" [ref=e33] [cursor=pointer]
        - generic [ref=e35]: Step 3 of 3
        - generic [ref=e38]: Paying Melon QA Bot
        - generic [ref=e39]: ₦5,000
        - generic [ref=e40]:
          - generic [ref=e41]:
            - generic [ref=e42]: Account Number
            - generic [ref=e43]:
              - generic [ref=e44]: "0685166947"
              - button "Copy" [ref=e45] [cursor=pointer]
          - generic [ref=e46]:
            - generic [ref=e47]: Bank Name
            - generic [ref=e48]: Paga
          - generic [ref=e49]:
            - generic [ref=e50]: Amount
            - generic [ref=e51]: ₦5,000.00
          - generic [ref=e52]: Pay by bank transfer. This account is unique to your payment and expires in 29:58.
        - button "Checking for your transfer…" [disabled] [ref=e53]
        - generic [ref=e54]:
          - img [ref=e55]
          - text: Confirming your transfer with the bank…
        - paragraph [ref=e57]:
          - text: You'll earn
          - generic [ref=e58]: ₦25.00 in Melon Coins
          - text: once this payment is confirmed
  - region "Notifications alt+T"
  - region "Notifications Alt+T"
```

# Test source

```ts
  156 |             }
  157 |             if (flagged.has(p)) {
  158 |               contained = true;
  159 |               break;
  160 |             }
  161 |           }
  162 | 
  163 |           if (!contained && getComputedStyle(el).position !== "fixed") {
  164 |             flagged.add(el);
  165 |             add("off-screen", `${describe(el)} spans ${Math.round(rect.left)}px to ${Math.round(rect.right)}px of a ${viewportWidth}px screen`);
  166 |           }
  167 |         }
  168 | 
  169 |         // Text that is cut off with no ellipsis to say so.
  170 |         const style = getComputedStyle(el);
  171 |         if (
  172 |           (style.overflowX === "hidden" || style.overflowX === "clip") &&
  173 |           el.scrollWidth > el.clientWidth + 2 &&
  174 |           style.textOverflow !== "ellipsis" &&
  175 |           ((el as HTMLElement).innerText ?? "").trim().length > 0 &&
  176 |           el.children.length === 0
  177 |         ) {
  178 |           add("clipped-text", `${describe(el)} needs ${el.scrollWidth}px but is ${el.clientWidth}px wide`);
  179 |         }
  180 | 
  181 |         if (el.tagName === "IMG") {
  182 |           const img = el as HTMLImageElement;
  183 |           if (img.loading !== "lazy" && (!img.complete || img.naturalWidth === 0)) {
  184 |             add("broken-image", `image ${img.currentSrc || img.src || "(no src)"} did not load`);
  185 |           }
  186 |         }
  187 | 
  188 |         if (checkTouchTargets) {
  189 |           const interactive = el.matches('a[href], button, input:not([type="hidden"]), select, textarea, [role="button"], [role="tab"]');
  190 |           if (interactive && (rect.width < 24 || rect.height < 24)) {
  191 |             // Links sitting inside a sentence are exempt from the minimum size.
  192 |             const inline = el.tagName === "A" && getComputedStyle(el).display === "inline";
  193 |             const isFileInput = el.tagName === "INPUT" && (el as HTMLInputElement).type === "file";
  194 |             if (!inline && !isFileInput) {
  195 |               add("small-target", `${describe(el)} is only ${Math.round(rect.width)}x${Math.round(rect.height)}px`);
  196 |             }
  197 |           }
  198 |         }
  199 |       }
  200 | 
  201 |       return issues;
  202 |     },
  203 |     { checkTouchTargets: options.checkTouchTargets ?? false, ignore: options.ignore ?? [] }
  204 |   ) as Promise<LayoutIssue[]>;
  205 | }
  206 | 
  207 | /**
  208 |  * Audits the current screen and records any problems as (soft) failures, so one run reports every broken
  209 |  * screen instead of stopping at the first. A screenshot is attached when something is wrong.
  210 |  */
  211 | export async function expectResponsive(
  212 |   page: Page,
  213 |   label: string,
  214 |   testInfo: TestInfo,
  215 |   options: AuditOptions = {}
  216 | ) {
  217 |   const viewport = page.viewportSize()!;
  218 |   const layout = layoutOf(viewport.width);
  219 |   const app = page.url().includes("customer.") ? "storefront" : "partners";
  220 |   const found = await auditLayout(page, {
  221 |     checkTouchTargets: isTouchLayout(layout),
  222 |     ...options,
  223 |   });
  224 | 
  225 |   // Problems the team already knows about (see test-data/knownLayoutIssues.ts) are recorded, not failed on, so a
  226 |   // new problem still fails while a known one stays visible in the report until it is fixed.
  227 |   const issues: LayoutIssue[] = [];
  228 |   for (const issue of found) {
  229 |     const text = `${issue.kind}: ${issue.detail}`;
  230 |     const known = KNOWN_LAYOUT_ISSUES.find(
  231 |       (k) => k.app === app && k.match.test(text) && (!k.layouts || k.layouts.includes(layout))
  232 |     );
  233 | 
  234 |     if (known) {
  235 |       testInfo.annotations.push({
  236 |         type: "known-layout-issue",
  237 |         description: `${label} (${layout}): ${text} — ${known.note}`,
  238 |       });
  239 |     } else {
  240 |       issues.push(issue);
  241 |     }
  242 |   }
  243 | 
  244 |   if (issues.length > 0) {
  245 |     const safe = label.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  246 |     const path = testInfo.outputPath(`${safe}-${viewport.width}x${viewport.height}.png`);
  247 |     await page.screenshot({ path, fullPage: true }).catch(() => undefined);
  248 |     await testInfo.attach(`layout: ${label}`, { path, contentType: "image/png" }).catch(() => undefined);
  249 |   }
  250 | 
  251 |   expect
  252 |     .soft(
  253 |       issues.map((issue) => `${issue.kind}: ${issue.detail}`),
  254 |       `${label} at ${viewport.width}x${viewport.height}`
  255 |     )
> 256 |     .toEqual([]);
      |      ^ Error: checking the transfer at 412x839
  257 | }
  258 | 
  259 | /** Runs `body` with the screen turned on its side (phone/tablet landscape), then restores it. */
  260 | export async function inLandscape(page: Page, body: () => Promise<void>) {
  261 |   const original = page.viewportSize()!;
  262 | 
  263 |   await test.step(`Rotate to landscape (${original.height}x${original.width})`, async () => {
  264 |     await page.setViewportSize({ width: original.height, height: original.width });
  265 |     await page.waitForTimeout(400);
  266 |     try {
  267 |       await body();
  268 |     } finally {
  269 |       await page.setViewportSize(original);
  270 |     }
  271 |   });
  272 | }
  273 | 
```