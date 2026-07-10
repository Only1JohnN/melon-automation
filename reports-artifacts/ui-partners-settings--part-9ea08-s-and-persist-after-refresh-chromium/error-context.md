# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/settings.spec.ts >> @partners @settings @smoke >> Profile >> should save profile changes and persist after refresh
- Location: tests/ui/partners/settings.spec.ts:294:9

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: getByRole('alert')
Expected pattern: /saved|success/i
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for getByRole('alert')

```

```yaml
- complementary:
  - img "melon logo"
  - link:
    - /url: /home
    - img
  - link:
    - /url: /offers
    - img
  - link:
    - /url: /settings/profile
    - img
  - link:
    - /url: /inventory/products
    - img
  - link:
    - /url: /order-mgmt
    - img
  - link:
    - /url: /inventory/warehouse
    - img
  - link:
    - /url: /inventory/category
    - img
  - link:
    - /url: /transactions
    - img
  - link:
    - /url: /settings/profile
    - img
  - link:
    - /url: /settings/profile
    - img
  - button:
    - img
- button "9+":
  - img
  - text: 9+
- button:
  - img
- main:
  - heading "Settings" [level=1]
  - link "Profile":
    - /url: /settings/profile
    - img
    - heading "Profile" [level=1]
  - link "Business":
    - /url: /settings/business
    - img
    - heading "Business" [level=1]
  - link "Withdrawal Bank":
    - /url: /settings/withdrawal
    - img
    - heading "Withdrawal Bank" [level=1]
  - link "User Management":
    - /url: /settings/members
    - img
    - heading "User Management" [level=1]
  - link "Roles & Permissions":
    - /url: /settings/access
    - img
    - heading "Roles & Permissions" [level=1]
  - link "Subscription":
    - /url: /settings/billing
    - img
    - heading "Subscription" [level=1]
  - link "Qr Code":
    - /url: /settings/qrcode
    - img
    - heading "Qr Code" [level=1]
  - img
  - heading "Integration" [level=1]
  - heading "Profile" [level=1]
  - paragraph: Individual Profile details
  - paragraph
  - button "Edit":
    - img
    - text: Edit
  - table:
    - rowgroup:
      - row "First name UpdatedFirst-1783648768291":
        - cell "First name"
        - cell "UpdatedFirst-1783648768291"
      - row "Last name UpdatedLast-1783648768291":
        - cell "Last name"
        - cell "UpdatedLast-1783648768291"
      - row "Phone number +2347080702920":
        - cell "Phone number"
        - cell "+2347080702920"
      - row "Email melonqabot@yopmail.com":
        - cell "Email"
        - cell "melonqabot@yopmail.com"
      - row "Gender male":
        - cell "Gender"
        - cell "male"
      - row "Address Araromi":
        - cell "Address"
        - cell "Araromi"
- region "Notifications Alt+T"
- region "Notifications alt+T"
```

# Test source

```ts
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
  338 |     await this.directorsTab.click();
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
> 352 |     await expect(this.toast).toContainText(text, { timeout: 10000 });
      |                              ^ Error: expect(locator).toContainText(expected) failed
  353 |   }
  354 | 
  355 |   async waitForToastToDisappear(): Promise<void> {
  356 |     await expect(this.toast).not.toBeVisible({ timeout: 10000 });
  357 |   }
  358 | }
```