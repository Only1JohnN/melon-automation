# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/settings.spec.ts >> @partners @settings @smoke >> Business >> Directors >> should display director details
- Location: tests/ui/partners/settings.spec.ts:414:11

# Error details

```
Test timeout of 90000ms exceeded.
```

```
Error: locator.click: Test timeout of 90000ms exceeded.
Call log:
  - waiting for getByRole('tab', { name: /directors/i })

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - complementary [ref=e5]:
      - img "melon logo" [ref=e8]
      - generic [ref=e12]:
        - generic [ref=e14]:
          - link [ref=e15] [cursor=pointer]:
            - /url: /home
            - img [ref=e17]
          - link [ref=e20] [cursor=pointer]:
            - /url: /offers
            - img [ref=e22]
          - link [ref=e26]:
            - /url: /settings/business
            - img [ref=e28]
        - generic [ref=e32]:
          - link [ref=e33] [cursor=pointer]:
            - /url: /inventory/products
            - img [ref=e35]
          - link [ref=e38] [cursor=pointer]:
            - /url: /order-mgmt
            - img [ref=e40]
          - link [ref=e45] [cursor=pointer]:
            - /url: /inventory/warehouse
            - img [ref=e47]
          - link [ref=e51] [cursor=pointer]:
            - /url: /inventory/category
            - img [ref=e53]
        - link [ref=e62] [cursor=pointer]:
          - /url: /transactions
          - img [ref=e64]
        - generic [ref=e69]:
          - link [ref=e70] [cursor=pointer]:
            - /url: /settings/profile
            - img [ref=e72]
          - link [ref=e75]:
            - /url: /settings/business
            - img [ref=e77]
      - button [ref=e84] [cursor=pointer]:
        - img [ref=e88]
    - generic [ref=e89]:
      - generic [ref=e92]:
        - button "9+" [ref=e93] [cursor=pointer]:
          - img [ref=e94]
          - generic [ref=e97]: 9+
        - button [ref=e98] [cursor=pointer]:
          - img [ref=e102]
      - main [ref=e103]:
        - generic [ref=e106]:
          - heading "Settings" [level=1] [ref=e108]
          - generic [ref=e109]:
            - generic [ref=e110]:
              - link "Profile" [ref=e112] [cursor=pointer]:
                - /url: /settings/profile
                - img [ref=e113]
                - heading "Profile" [level=1] [ref=e115]
              - link "Business" [ref=e117] [cursor=pointer]:
                - /url: /settings/business
                - img [ref=e118]
                - heading "Business" [level=1] [ref=e121]
              - link "Withdrawal Bank" [ref=e123] [cursor=pointer]:
                - /url: /settings/withdrawal
                - img [ref=e124]
                - heading "Withdrawal Bank" [level=1] [ref=e129]
              - link "User Management" [ref=e131] [cursor=pointer]:
                - /url: /settings/members
                - img [ref=e132]
                - heading "User Management" [level=1] [ref=e137]
              - link "Roles & Permissions" [ref=e139] [cursor=pointer]:
                - /url: /settings/access
                - img [ref=e140]
                - heading "Roles & Permissions" [level=1] [ref=e142]
              - link "Subscription" [ref=e144] [cursor=pointer]:
                - /url: /settings/billing
                - img [ref=e145]
                - heading "Subscription" [level=1] [ref=e147]
              - link "Qr Code" [ref=e149] [cursor=pointer]:
                - /url: /settings/qrcode
                - img [ref=e150]
                - heading "Qr Code" [level=1] [ref=e156]
              - generic [ref=e158]:
                - img [ref=e160]
                - heading "Integration" [level=1] [ref=e167]
            - generic [ref=e169]:
              - generic [ref=e170]:
                - heading "Business" [level=1] [ref=e171]
                - paragraph [ref=e172]: Partner Business Information Settings
              - navigation [ref=e173]:
                - button "Details" [ref=e174] [cursor=pointer]
                - button "Branches" [ref=e175] [cursor=pointer]
                - button "Directors" [ref=e176] [cursor=pointer]
              - generic [ref=e179]:
                - heading "Business logo" [level=1] [ref=e181]
                - button "Edit" [ref=e186] [cursor=pointer]:
                  - button "Edit" [ref=e187]:
                    - img [ref=e188]
                    - text: Edit
                - generic [ref=e190]:
                  - heading "Business details" [level=1] [ref=e191]
                  - generic [ref=e192]:
                    - generic [ref=e193]:
                      - heading "Type" [level=1] [ref=e194]
                      - paragraph [ref=e195]: registered
                    - generic [ref=e196]:
                      - heading "RC number" [level=1] [ref=e197]
                      - paragraph [ref=e198]: RC200042
                    - generic [ref=e199]:
                      - heading "Business name" [level=1] [ref=e200]
                      - paragraph [ref=e201]: Melon QA Bot
                    - generic [ref=e202]:
                      - heading "Business email" [level=1] [ref=e203]
                      - paragraph [ref=e204]: melonqabot@yopmail.com
                    - generic [ref=e205]:
                      - heading "Phone number" [level=1] [ref=e206]
                      - paragraph [ref=e207]: "+2347080702920"
                    - generic [ref=e208]:
                      - heading "Industry" [level=1] [ref=e209]
                      - paragraph [ref=e210]: technology
  - region "Notifications Alt+T"
  - region "Notifications alt+T"
```

# Test source

```ts
  238 | 
  239 |     // Some flows require an extra "Continue" – we add a safety click if present
  240 |     const continueBtn = this.page.getByRole('button', { name: /continue/i }).last();
  241 |     if (await continueBtn.isVisible({ timeout: 2000 })) {
  242 |       await continueBtn.click();
  243 |     }
  244 | 
  245 |     return response;
  246 |   }
  247 | 
  248 |   /**
  249 |    * Creates an offline branch with a trading address.
  250 |    * @param manager - the full name of the manager to select
  251 |    * @param searchAddress - e.g., "Ikeja, Lagos" – will be autocompleted
  252 |    * @returns the POST response
  253 |    */
  254 |   async createOfflineBranch(manager: string, searchAddress: string): Promise<Response> {
  255 |     await this.addLocationButton.click();
  256 |     await this.tradingAddressOption.click();
  257 | 
  258 |     // Select manager
  259 |     await this.branchManagerDropdown.click();
  260 |     await this.page.getByRole('option', { name: manager }).click();
  261 | 
  262 |     // Fill address and choose first suggestion
  263 |     await this.branchAddressInput.fill(searchAddress);
  264 |     // Wait for suggestions and click the first one
  265 |     await this.branchAddressSuggestion.waitFor({ state: 'visible', timeout: 10000 });
  266 |     await this.branchAddressSuggestion.click();
  267 | 
  268 |     // Optionally pick a hours preset (click the first available)
  269 |     if (await this.branchHoursPreset.isVisible()) {
  270 |       await this.branchHoursPreset.click();
  271 |     }
  272 | 
  273 |     const [response] = await Promise.all([
  274 |       this.page.waitForResponse(
  275 |         (res) => res.url().includes('/branches') && res.request().method() === 'POST'
  276 |       ),
  277 |       this.branchContinueButton.click(),
  278 |     ]);
  279 | 
  280 |     return response;
  281 |   }
  282 | 
  283 |   /**
  284 |    * Get the list of branch names from the table.
  285 |    * Adjust selector to target the branch name column.
  286 |    */
  287 |   async getBranchNames(): Promise<string[]> {
  288 |     const rows = this.branchList.locator('tbody tr');
  289 |     const count = await rows.count();
  290 |     const names: string[] = [];
  291 |     for (let i = 0; i < count; i++) {
  292 |       // assume name is in first column
  293 |       const name = await rows.nth(i).locator('td').first().textContent();
  294 |       if (name) names.push(name.trim());
  295 |     }
  296 |     return names;
  297 |   }
  298 | 
  299 |   /**
  300 |    * Get any error message for duplicate online branch.
  301 |    */
  302 |   async getBranchError(): Promise<string | null> {
  303 |     const error = this.page.getByText(/already has an online presence|duplicate/i);
  304 |     if (await error.isVisible()) {
  305 |       return await error.textContent();
  306 |     }
  307 |     return null;
  308 |   }
  309 | 
  310 |   /**
  311 |    * Selects a random manager from the dropdown, excluding placeholder.
  312 |    * @returns the manager's full name
  313 |    */
  314 |   async getRandomManager(): Promise<string> {
  315 |     await this.branchManagerDropdown.click();
  316 |     const options = this.page.getByRole('option');
  317 |     const count = await options.count();
  318 |     // find first non-placeholder (skip first if it's "Select..." etc.)
  319 |     let start = 0;
  320 |     for (let i = 0; i < count; i++) {
  321 |       const text = await options.nth(i).textContent();
  322 |       if (!text || /select/i.test(text)) continue;
  323 |       start = i;
  324 |       break;
  325 |     }
  326 |     const randomIndex = Math.floor(Math.random() * (count - start)) + start;
  327 |     const manager = await options.nth(randomIndex).textContent();
  328 |     // Close dropdown
  329 |     await this.page.keyboard.press('Escape');
  330 |     return manager?.trim() || '';
  331 |   }
  332 | 
  333 |   // ============================================================
  334 |   // Directors
  335 |   // ============================================================
  336 | 
  337 |   async goToDirectors() {
> 338 |     await this.directorsTab.click();
      |                             ^ Error: locator.click: Test timeout of 90000ms exceeded.
  339 |     await expect(this.directorsHeading).toBeVisible();
  340 |   }
  341 | 
  342 |   async getDirectorsCount(): Promise<number> {
  343 |     const rows = this.directorsTable.locator('tbody tr');
  344 |     return await rows.count();
  345 |   }
  346 | 
  347 |   // ============================================================
  348 |   // Helpers
  349 |   // ============================================================
  350 | 
  351 |   async waitForToast(text: string | RegExp): Promise<void> {
  352 |     await expect(this.toast).toContainText(text, { timeout: 10000 });
  353 |   }
  354 | 
  355 |   async waitForToastToDisappear(): Promise<void> {
  356 |     await expect(this.toast).not.toBeVisible({ timeout: 10000 });
  357 |   }
  358 | }
```