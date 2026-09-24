# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/e2e/payment-flow.responsive.spec.ts >> @e2e @payment @responsive @partners @storefront >> customer pays and the merchant sees it, on this screen size @smoke
- Location: tests/ui/e2e/payment-flow.responsive.spec.ts:19:7

# Error details

```
Error: merchant home (after) at 820x1180

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "small-target: <button> \"View all\" is only 67x20px",
+ ]
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - complementary [ref=e4]:
    - link "Paga Paga Developer Portal" [ref=e5] [cursor=pointer]:
      - /url: /simulate
      - img "Paga" [ref=e6]
      - generic [ref=e7]:
        - generic [ref=e8]: Paga
        - generic [ref=e9]: Developer Portal
    - navigation [ref=e10]:
      - generic [ref=e11]:
        - generic [ref=e12]:
          - generic [ref=e13]: Simulation Tools
          - link "All tools" [ref=e14] [cursor=pointer]:
            - /url: /simulate
        - list [ref=e15]:
          - listitem [ref=e16]:
            - link "Inbound Bank Deposit" [ref=e17] [cursor=pointer]:
              - /url: /simulate/inbound-bank-deposit
              - img [ref=e18]
              - generic [ref=e21]: Inbound Bank Deposit
    - generic [ref=e22]:
      - generic [ref=e23]:
        - img [ref=e24]
        - text: Tip
      - text: Switch environments in the top-right to target sandbox, QA, or production data.
  - generic [ref=e26]:
    - banner [ref=e27]:
      - generic [ref=e28]:
        - link "pagaengine.com ↗" [ref=e29] [cursor=pointer]:
          - /url: https://pagaengine.com
        - generic [ref=e30]:
          - combobox "Test environment" [ref=e31]:
            - option "QA1"
            - option "QA2"
            - option "Beta" [selected]
          - img
    - main [ref=e32]:
      - generic [ref=e33]:
        - link "Simulation Tools" [ref=e34] [cursor=pointer]:
          - /url: /simulate
          - img [ref=e35]
          - text: Simulation Tools
        - generic [ref=e37]:
          - img [ref=e39]
          - generic [ref=e42]:
            - heading "Simulate Inbound Bank Deposit" [level=1] [ref=e43]
            - paragraph [ref=e44]: Credits a sandbox Paga account as if a real bank deposit had arrived. Triggers any configured deposit webhooks.
        - generic [ref=e45]:
          - generic [ref=e46]:
            - generic [ref=e47]: Target environment
            - generic [ref=e48]:
              - text: Beta
              - generic [ref=e49]: · https://beta.pagaengine.com
          - generic [ref=e50]:
            - generic [ref=e51]:
              - generic [ref=e52]: Recipient Paga account number *
              - textbox "Recipient Paga account number *" [ref=e53]:
                - /placeholder: e.g. 3728640310
                - text: "3409423470"
            - generic [ref=e54]:
              - generic [ref=e55]: Amount *
              - textbox "Amount *" [ref=e56]: "9550"
            - generic [ref=e57]:
              - generic [ref=e58]: Currency
              - combobox "Currency" [ref=e59]:
                - option "NGN" [selected]
                - option "USD"
                - option "GBP"
                - option "EUR"
            - generic [ref=e60]:
              - generic [ref=e61]: Sender bank *
              - combobox "Sender bank *" [ref=e62]:
                - option "Access Bank" [selected]
                - option "Paga"
            - generic [ref=e63]:
              - generic [ref=e64]: Sender name
              - textbox "Sender name" [ref=e65]: John Doe
            - generic [ref=e66]:
              - generic [ref=e67]: Sender account number
              - textbox "Sender account number" [ref=e68]: "0123456789"
            - generic [ref=e69]:
              - generic [ref=e70]: Narration
              - textbox "Narration" [ref=e71]: Test inbound deposit
            - generic [ref=e72]:
              - button "Reset" [ref=e73] [cursor=pointer]
              - button "Trigger Deposit" [ref=e74] [cursor=pointer]
        - generic [ref=e75]:
          - generic [ref=e76]:
            - img [ref=e77]
            - text: Deposit simulated successfully
          - generic [ref=e79]:
            - term [ref=e80]: Reference
            - definition [ref=e81]: SIM-DDC4340CC0064918A7
            - term [ref=e82]: Status
            - definition [ref=e83]: CREDITED
            - term [ref=e84]: Environment
            - definition [ref=e85]: beta
            - term [ref=e86]: Submitted
            - definition [ref=e87]: 2026-09-24T16:11:19.291Z
          - group [ref=e88]:
            - generic "Payload" [ref=e89] [cursor=pointer]
          - paragraph [ref=e90]:
            - text: Forwarded to
            - code [ref=e91]: /paga-webservices/banking-rest/secured/poolAccountActivityNotification
            - text: via the developer backend.
    - contentinfo [ref=e92]:
      - generic [ref=e93]:
        - generic [ref=e94]: © 2026 Paga · Developer Portal
        - generic [ref=e95]: pagaengine.com
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
      |      ^ Error: merchant home (after) at 820x1180
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