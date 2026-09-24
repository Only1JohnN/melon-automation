# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/merchant/merchant-screens.responsive.spec.ts >> @partners @responsive >> should fit the screen on every merchant page @smoke
- Location: tests/ui/partners/merchant/merchant-screens.responsive.spec.ts:164:7

# Error details

```
Error: /simple/home at 820x1180

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "small-target: <button> \"View all\" is only 67x20px",
+ ]
```

```
Error: /simple/settings/locations at 820x1180

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "small-target: <button> \"Edit\" is only 48x20px",
+ ]
```

```
Error: /simple/settings/profile at 820x1180

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "small-target: <button> \"Edit\" is only 48x20px",
+ ]
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - main [ref=e4]:
    - complementary [ref=e5]:
      - navigation [ref=e9]:
        - link "Home" [ref=e10] [cursor=pointer]:
          - /url: /simple/home
          - img [ref=e11]
          - generic [ref=e14]: Home
        - link "Transactions" [ref=e15] [cursor=pointer]:
          - /url: /simple/transactions
          - img [ref=e17]
          - generic [ref=e19]: Transactions
        - link "Settings" [ref=e20] [cursor=pointer]:
          - /url: /simple/settings
          - img [ref=e21]
          - generic [ref=e24]: Settings
      - heading "Appear here!" [level=1] [ref=e26]
    - main [ref=e28]:
      - generic [ref=e30]:
        - heading "Good afternoon, Melon QA Bot 👋" [level=1] [ref=e31]
        - paragraph [ref=e32]: Here's what's happening with your business.
      - generic [ref=e33]:
        - generic [ref=e34]:
          - generic [ref=e35]:
            - button "daily" [ref=e36] [cursor=pointer]
            - button "weekly" [ref=e37] [cursor=pointer]
            - button "monthly" [ref=e38] [cursor=pointer]
          - button "All Time" [ref=e39] [cursor=pointer]:
            - img [ref=e40]
            - generic [ref=e42]: All Time
        - generic [ref=e43]:
          - generic [ref=e45]:
            - generic [ref=e46]:
              - generic [ref=e47]: Revenue
              - img [ref=e49]
            - generic [ref=e52]:
              - heading "₦6,389,970.00" [level=3] [ref=e53]
              - generic [ref=e56]: No growth data
          - generic [ref=e58]:
            - generic [ref=e59]:
              - generic [ref=e60]: Transactions
              - img [ref=e62]
            - generic [ref=e65]:
              - heading "49" [level=3] [ref=e66]
              - generic [ref=e67]: Total successful payments
          - generic [ref=e69]:
            - generic [ref=e70]:
              - generic [ref=e71]: Customers rewarded
              - img [ref=e73]
            - generic [ref=e76]:
              - heading "3" [level=3] [ref=e77]
              - generic [ref=e79]:
                - img "coin" [ref=e81]
                - text: 494,983 Coins awarded
          - generic [ref=e83]:
            - generic [ref=e84]:
              - generic [ref=e85]: Repeat customers
              - img [ref=e87]
            - generic [ref=e92]:
              - heading "3" [level=3] [ref=e93]
              - generic [ref=e95]: 33.33% returned to pay again
      - generic [ref=e96]:
        - listitem [ref=e97] [cursor=pointer]: Transaction History
        - listitem [ref=e99] [cursor=pointer]: Withdrawal Requests
      - generic [ref=e101]:
        - heading "Recent Transactions" [level=1] [ref=e103]
        - button "Date" [ref=e106] [cursor=pointer]:
          - generic [ref=e107]: Date
          - img [ref=e108]
        - table [ref=e112]:
          - rowgroup [ref=e113]:
            - row "Customer Reference Amount Reward (Coins) Date Updated Status" [ref=e114]:
              - columnheader "Customer" [ref=e115]
              - columnheader "Reference" [ref=e116]
              - columnheader "Amount" [ref=e117]
              - columnheader "Reward (Coins)" [ref=e118]
              - columnheader "Date Updated" [ref=e119]
              - columnheader "Status" [ref=e120]
          - rowgroup [ref=e121]:
            - row "JA John Ade MELON-1790265972941 ₦9,910.00 coin-icon +0 2026-09-24 16:06 pending" [ref=e122]:
              - cell "JA John Ade" [ref=e123]:
                - generic [ref=e124]:
                  - generic [ref=e125]: JA
                  - generic [ref=e126]: John Ade
              - cell "MELON-1790265972941" [ref=e127]
              - cell "₦9,910.00" [ref=e128]
              - cell "coin-icon +0" [ref=e129]:
                - generic [ref=e130]:
                  - img "coin-icon" [ref=e132]
                  - generic [ref=e133]: "+0"
              - cell "2026-09-24 16:06" [ref=e134]
              - cell "pending" [ref=e135]:
                - generic [ref=e136]: pending
            - row "JA John Ade MELON-1790265858103 ₦5,000.00 coin-icon +0 2026-09-24 16:04 pending" [ref=e138]:
              - cell "JA John Ade" [ref=e139]:
                - generic [ref=e140]:
                  - generic [ref=e141]: JA
                  - generic [ref=e142]: John Ade
              - cell "MELON-1790265858103" [ref=e143]
              - cell "₦5,000.00" [ref=e144]
              - cell "coin-icon +0" [ref=e145]:
                - generic [ref=e146]:
                  - img "coin-icon" [ref=e148]
                  - generic [ref=e149]: "+0"
              - cell "2026-09-24 16:04" [ref=e150]
              - cell "pending" [ref=e151]:
                - generic [ref=e152]: pending
            - row "JA John Ade MELON-1790265850300 ₦5,000.00 coin-icon +0 2026-09-24 16:04 pending" [ref=e154]:
              - cell "JA John Ade" [ref=e155]:
                - generic [ref=e156]:
                  - generic [ref=e157]: JA
                  - generic [ref=e158]: John Ade
              - cell "MELON-1790265850300" [ref=e159]
              - cell "₦5,000.00" [ref=e160]
              - cell "coin-icon +0" [ref=e161]:
                - generic [ref=e162]:
                  - img "coin-icon" [ref=e164]
                  - generic [ref=e165]: "+0"
              - cell "2026-09-24 16:04" [ref=e166]
              - cell "pending" [ref=e167]:
                - generic [ref=e168]: pending
            - row "JA John Ade MELON-1790265845206 ₦5,000.00 coin-icon +0 2026-09-24 16:04 pending" [ref=e170]:
              - cell "JA John Ade" [ref=e171]:
                - generic [ref=e172]:
                  - generic [ref=e173]: JA
                  - generic [ref=e174]: John Ade
              - cell "MELON-1790265845206" [ref=e175]
              - cell "₦5,000.00" [ref=e176]
              - cell "coin-icon +0" [ref=e177]:
                - generic [ref=e178]:
                  - img "coin-icon" [ref=e180]
                  - generic [ref=e181]: "+0"
              - cell "2026-09-24 16:04" [ref=e182]
              - cell "pending" [ref=e183]:
                - generic [ref=e184]: pending
            - row "JA John Ade MELON-1790265838767 ₦5,000.00 coin-icon +0 2026-09-24 16:03 pending" [ref=e186]:
              - cell "JA John Ade" [ref=e187]:
                - generic [ref=e188]:
                  - generic [ref=e189]: JA
                  - generic [ref=e190]: John Ade
              - cell "MELON-1790265838767" [ref=e191]
              - cell "₦5,000.00" [ref=e192]
              - cell "coin-icon +0" [ref=e193]:
                - generic [ref=e194]:
                  - img "coin-icon" [ref=e196]
                  - generic [ref=e197]: "+0"
              - cell "2026-09-24 16:03" [ref=e198]
              - cell "pending" [ref=e199]:
                - generic [ref=e200]: pending
            - row "JA John Ade MELON-1790265832259 ₦5,000.00 coin-icon +0 2026-09-24 16:03 pending" [ref=e202]:
              - cell "JA John Ade" [ref=e203]:
                - generic [ref=e204]:
                  - generic [ref=e205]: JA
                  - generic [ref=e206]: John Ade
              - cell "MELON-1790265832259" [ref=e207]
              - cell "₦5,000.00" [ref=e208]
              - cell "coin-icon +0" [ref=e209]:
                - generic [ref=e210]:
                  - img "coin-icon" [ref=e212]
                  - generic [ref=e213]: "+0"
              - cell "2026-09-24 16:03" [ref=e214]
              - cell "pending" [ref=e215]:
                - generic [ref=e216]: pending
            - row "JA John Ade MELON-1790265796894 ₦5,000.00 coin-icon +0 2026-09-24 16:03 pending" [ref=e218]:
              - cell "JA John Ade" [ref=e219]:
                - generic [ref=e220]:
                  - generic [ref=e221]: JA
                  - generic [ref=e222]: John Ade
              - cell "MELON-1790265796894" [ref=e223]
              - cell "₦5,000.00" [ref=e224]
              - cell "coin-icon +0" [ref=e225]:
                - generic [ref=e226]:
                  - img "coin-icon" [ref=e228]
                  - generic [ref=e229]: "+0"
              - cell "2026-09-24 16:03" [ref=e230]
              - cell "pending" [ref=e231]:
                - generic [ref=e232]: pending
            - row "JA John Ade MELON-1790265787440 ₦5,000.00 coin-icon +0 2026-09-24 16:03 pending" [ref=e234]:
              - cell "JA John Ade" [ref=e235]:
                - generic [ref=e236]:
                  - generic [ref=e237]: JA
                  - generic [ref=e238]: John Ade
              - cell "MELON-1790265787440" [ref=e239]
              - cell "₦5,000.00" [ref=e240]
              - cell "coin-icon +0" [ref=e241]:
                - generic [ref=e242]:
                  - img "coin-icon" [ref=e244]
                  - generic [ref=e245]: "+0"
              - cell "2026-09-24 16:03" [ref=e246]
              - cell "pending" [ref=e247]:
                - generic [ref=e248]: pending
            - row "JA John Ade MELON-1790265783603 ₦5,000.00 coin-icon +0 2026-09-24 16:03 pending" [ref=e250]:
              - cell "JA John Ade" [ref=e251]:
                - generic [ref=e252]:
                  - generic [ref=e253]: JA
                  - generic [ref=e254]: John Ade
              - cell "MELON-1790265783603" [ref=e255]
              - cell "₦5,000.00" [ref=e256]
              - cell "coin-icon +0" [ref=e257]:
                - generic [ref=e258]:
                  - img "coin-icon" [ref=e260]
                  - generic [ref=e261]: "+0"
              - cell "2026-09-24 16:03" [ref=e262]
              - cell "pending" [ref=e263]:
                - generic [ref=e264]: pending
            - row "JA John Ade MELON-1790265781048 ₦5,000.00 coin-icon +0 2026-09-24 16:03 pending" [ref=e266]:
              - cell "JA John Ade" [ref=e267]:
                - generic [ref=e268]:
                  - generic [ref=e269]: JA
                  - generic [ref=e270]: John Ade
              - cell "MELON-1790265781048" [ref=e271]
              - cell "₦5,000.00" [ref=e272]
              - cell "coin-icon +0" [ref=e273]:
                - generic [ref=e274]:
                  - img "coin-icon" [ref=e276]
                  - generic [ref=e277]: "+0"
              - cell "2026-09-24 16:03" [ref=e278]
              - cell "pending" [ref=e279]:
                - generic [ref=e280]: pending
        - generic [ref=e283]:
          - button "Previous" [disabled]:
            - img
            - generic: Previous
          - generic [ref=e284]:
            - button "1" [ref=e285] [cursor=pointer]
            - button "2" [ref=e286] [cursor=pointer]
            - button "3" [ref=e287] [cursor=pointer]
            - button "4" [ref=e288] [cursor=pointer]
            - button "5" [ref=e289] [cursor=pointer]
            - generic [ref=e290]: ...
          - button "Next" [ref=e291] [cursor=pointer]:
            - generic [ref=e292]: Next
            - img [ref=e293]
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
      |      ^ Error: /simple/settings/profile at 820x1180
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