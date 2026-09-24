# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/merchant/merchant-screens.responsive.spec.ts >> @partners @responsive >> should fit the screen on every merchant page @smoke
- Location: tests/ui/partners/merchant/merchant-screens.responsive.spec.ts:164:7

# Error details

```
Error: /simple/home at 412x839

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "small-target: <button> \"View all\" is only 69x20px",
+ ]
```

```
Error: /simple/settings/locations at 412x839

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "small-target: <button> \"Edit\" is only 50x20px",
+ ]
```

```
Error: /simple/settings/profile at 412x839

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "small-target: <button> \"Edit\" is only 51x20px",
+ ]
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - main [ref=e4]:
    - generic [ref=e5]:
      - button "Open Menu" [ref=e7] [cursor=pointer]:
        - generic:
          - img
        - generic:
          - img
      - generic [ref=e9]:
        - img [ref=e11]
        - img [ref=e16]
    - main [ref=e20]:
      - generic [ref=e22]:
        - heading "Good afternoon, Melon QA Bot 👋" [level=1] [ref=e23]
        - paragraph [ref=e24]: Here's what's happening with your business.
      - generic [ref=e25]:
        - generic [ref=e26]:
          - generic [ref=e27]:
            - button "daily" [ref=e28] [cursor=pointer]
            - button "weekly" [ref=e29] [cursor=pointer]
            - button "monthly" [ref=e30] [cursor=pointer]
          - button "All Time" [ref=e31] [cursor=pointer]:
            - img [ref=e32]
            - generic [ref=e34]: All Time
        - generic [ref=e35]:
          - generic [ref=e37]:
            - generic [ref=e38]:
              - generic [ref=e39]: Revenue
              - img [ref=e41]
            - generic [ref=e44]:
              - heading "₦6,389,970.00" [level=3] [ref=e45]
              - generic [ref=e48]: No growth data
          - generic [ref=e50]:
            - generic [ref=e51]:
              - generic [ref=e52]: Transactions
              - img [ref=e54]
            - generic [ref=e57]:
              - heading "49" [level=3] [ref=e58]
              - generic [ref=e59]: Total successful payments
          - generic [ref=e61]:
            - generic [ref=e62]:
              - generic [ref=e63]: Customers rewarded
              - img [ref=e65]
            - generic [ref=e68]:
              - heading "3" [level=3] [ref=e69]
              - generic [ref=e71]:
                - img "coin" [ref=e73]
                - text: 494,983 Coins awarded
          - generic [ref=e75]:
            - generic [ref=e76]:
              - generic [ref=e77]: Repeat customers
              - img [ref=e79]
            - generic [ref=e84]:
              - heading "3" [level=3] [ref=e85]
              - generic [ref=e87]: 33.33% returned to pay again
      - generic [ref=e88]:
        - listitem [ref=e89] [cursor=pointer]: Transaction History
        - listitem [ref=e91] [cursor=pointer]: Withdrawal Requests
      - generic [ref=e93]:
        - heading "Recent Transactions" [level=1] [ref=e95]
        - button "Date" [ref=e98] [cursor=pointer]:
          - generic [ref=e99]: Date
          - img [ref=e100]
        - generic [ref=e102]:
          - generic [ref=e103]:
            - generic [ref=e104]:
              - generic [ref=e105]:
                - generic [ref=e106]: JA
                - generic [ref=e107]: John Ade
              - generic [ref=e108]: pending
            - generic [ref=e110]:
              - generic [ref=e111]: MELON-1790266030932
              - generic [ref=e112]: Sep 24, 2026
            - generic [ref=e113]:
              - generic [ref=e114]:
                - img "coin-icon" [ref=e116]
                - generic [ref=e117]: +0 Coins
              - generic [ref=e118]: ₦1,000.00
          - generic [ref=e119]:
            - generic [ref=e120]:
              - generic [ref=e121]:
                - generic [ref=e122]: JA
                - generic [ref=e123]: John Ade
              - generic [ref=e124]: pending
            - generic [ref=e126]:
              - generic [ref=e127]: MELON-1790265972941
              - generic [ref=e128]: Sep 24, 2026
            - generic [ref=e129]:
              - generic [ref=e130]:
                - img "coin-icon" [ref=e132]
                - generic [ref=e133]: +0 Coins
              - generic [ref=e134]: ₦9,910.00
          - generic [ref=e135]:
            - generic [ref=e136]:
              - generic [ref=e137]:
                - generic [ref=e138]: JA
                - generic [ref=e139]: John Ade
              - generic [ref=e140]: pending
            - generic [ref=e142]:
              - generic [ref=e143]: MELON-1790265858103
              - generic [ref=e144]: Sep 24, 2026
            - generic [ref=e145]:
              - generic [ref=e146]:
                - img "coin-icon" [ref=e148]
                - generic [ref=e149]: +0 Coins
              - generic [ref=e150]: ₦5,000.00
          - generic [ref=e151]:
            - generic [ref=e152]:
              - generic [ref=e153]:
                - generic [ref=e154]: JA
                - generic [ref=e155]: John Ade
              - generic [ref=e156]: pending
            - generic [ref=e158]:
              - generic [ref=e159]: MELON-1790265850300
              - generic [ref=e160]: Sep 24, 2026
            - generic [ref=e161]:
              - generic [ref=e162]:
                - img "coin-icon" [ref=e164]
                - generic [ref=e165]: +0 Coins
              - generic [ref=e166]: ₦5,000.00
          - generic [ref=e167]:
            - generic [ref=e168]:
              - generic [ref=e169]:
                - generic [ref=e170]: JA
                - generic [ref=e171]: John Ade
              - generic [ref=e172]: pending
            - generic [ref=e174]:
              - generic [ref=e175]: MELON-1790265845206
              - generic [ref=e176]: Sep 24, 2026
            - generic [ref=e177]:
              - generic [ref=e178]:
                - img "coin-icon" [ref=e180]
                - generic [ref=e181]: +0 Coins
              - generic [ref=e182]: ₦5,000.00
          - generic [ref=e183]:
            - generic [ref=e184]:
              - generic [ref=e185]:
                - generic [ref=e186]: JA
                - generic [ref=e187]: John Ade
              - generic [ref=e188]: pending
            - generic [ref=e190]:
              - generic [ref=e191]: MELON-1790265838767
              - generic [ref=e192]: Sep 24, 2026
            - generic [ref=e193]:
              - generic [ref=e194]:
                - img "coin-icon" [ref=e196]
                - generic [ref=e197]: +0 Coins
              - generic [ref=e198]: ₦5,000.00
          - generic [ref=e199]:
            - generic [ref=e200]:
              - generic [ref=e201]:
                - generic [ref=e202]: JA
                - generic [ref=e203]: John Ade
              - generic [ref=e204]: pending
            - generic [ref=e206]:
              - generic [ref=e207]: MELON-1790265832259
              - generic [ref=e208]: Sep 24, 2026
            - generic [ref=e209]:
              - generic [ref=e210]:
                - img "coin-icon" [ref=e212]
                - generic [ref=e213]: +0 Coins
              - generic [ref=e214]: ₦5,000.00
          - generic [ref=e215]:
            - generic [ref=e216]:
              - generic [ref=e217]:
                - generic [ref=e218]: JA
                - generic [ref=e219]: John Ade
              - generic [ref=e220]: pending
            - generic [ref=e222]:
              - generic [ref=e223]: MELON-1790265796894
              - generic [ref=e224]: Sep 24, 2026
            - generic [ref=e225]:
              - generic [ref=e226]:
                - img "coin-icon" [ref=e228]
                - generic [ref=e229]: +0 Coins
              - generic [ref=e230]: ₦5,000.00
          - generic [ref=e231]:
            - generic [ref=e232]:
              - generic [ref=e233]:
                - generic [ref=e234]: JA
                - generic [ref=e235]: John Ade
              - generic [ref=e236]: pending
            - generic [ref=e238]:
              - generic [ref=e239]: MELON-1790265787440
              - generic [ref=e240]: Sep 24, 2026
            - generic [ref=e241]:
              - generic [ref=e242]:
                - img "coin-icon" [ref=e244]
                - generic [ref=e245]: +0 Coins
              - generic [ref=e246]: ₦5,000.00
          - generic [ref=e247]:
            - generic [ref=e248]:
              - generic [ref=e249]:
                - generic [ref=e250]: JA
                - generic [ref=e251]: John Ade
              - generic [ref=e252]: pending
            - generic [ref=e254]:
              - generic [ref=e255]: MELON-1790265783603
              - generic [ref=e256]: Sep 24, 2026
            - generic [ref=e257]:
              - generic [ref=e258]:
                - img "coin-icon" [ref=e260]
                - generic [ref=e261]: +0 Coins
              - generic [ref=e262]: ₦5,000.00
        - generic [ref=e264]:
          - button [disabled]:
            - img
          - generic [ref=e265]:
            - button "1" [ref=e266] [cursor=pointer]
            - button "2" [ref=e267] [cursor=pointer]
            - button "3" [ref=e268] [cursor=pointer]
            - generic [ref=e269]: ...
          - button [ref=e270] [cursor=pointer]:
            - img [ref=e271]
  - region "Notifications Alt+T"
  - region "Notifications alt+T"
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
      |      ^ Error: /simple/settings/profile at 412x839
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