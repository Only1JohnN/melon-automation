# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/settings.spec.ts >> @partners @settings @smoke >> Business >> Details >> should save business details successfully
- Location: tests/ui/partners/settings.spec.ts:352:11

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: /continue/i }).nth(1)
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('button', { name: /continue/i }).nth(1)

```

```yaml
- region "Notifications Alt+T"
- region "Notifications alt+T"
- dialog "Edit Business Details":
  - heading "Edit Business Details" [level=2]
  - text: Email Address
  - textbox "Email Address":
    - /placeholder: Enter business email
    - text: melonqabot@yopmail.com
  - text: Phone Number
  - textbox "Enter business phone number": "07080702920"
  - text: Industry
  - combobox "Industry":
    - text: Technology
    - img
  - button "Cancel"
  - button "Continue"
```

# Test source

```ts
  90  |     // ─── Branches ──────────────────────────────────────────
  91  |     this.branchesTab = page.getByRole('tab', { name: /branches/i });
  92  |     this.addLocationButton = page.getByRole('button', { name: /add another location/i });
  93  |     this.onlineStorefrontOption = page.getByRole('button', { name: /create online storefront/i });
  94  |     this.tradingAddressOption = page.getByRole('button', { name: /add trading address/i });
  95  |     this.storeNameInput = page.getByRole('textbox', { name: /your-store-name/i });
  96  |     this.addStoreButton = page.getByRole('button', { name: /add/i, exact: true });
  97  |     this.branchManagerDropdown = page.getByRole('combobox').first(); // may need refinement
  98  |     this.branchAddressInput = page.getByRole('textbox', { name: /enter address/i });
  99  |     // First suggestion from Google Maps – usually the first list item or button
  100 |     this.branchAddressSuggestion = page.locator('[role="option"]').first(); // or .locator('.suggestion-item').first()
  101 |     this.branchHoursPreset = page.locator('text=/business hours|retail hours|restaurant hours/i').first();
  102 |     this.branchContinueButton = page.getByRole('button', { name: /continue/i }).last();
  103 |     this.branchList = page.locator('table').last(); // adjust to branch table
  104 | 
  105 |     // ─── Directors ──────────────────────────────────────────
  106 |     this.directorsTab = page.getByRole('tab', { name: /directors/i });
  107 |     this.directorsHeading = page.getByRole('heading', { name: /director details/i });
  108 |     this.directorsTable = page.locator('table').nth(1); // adjust
  109 | 
  110 |     // ─── Common ────────────────────────────────────────────
  111 |     this.toast = page.getByRole('alert');
  112 |   }
  113 | 
  114 |   // ============================================================
  115 |   // Navigation
  116 |   // ============================================================
  117 | 
  118 |   async gotoProfile() {
  119 |     await this.page.goto(`${process.env.PARTNER_URL}/settings/profile`);
  120 |     await this.page.waitForLoadState('networkidle');
  121 |     await expect(this.profileEditButton).toBeVisible({ timeout: 15000 });
  122 |   }
  123 | 
  124 |   async gotoBusiness() {
  125 |     await this.page.goto(`${process.env.PARTNER_URL}/settings/business`);
  126 |     await this.page.waitForLoadState('networkidle');
  127 |     await expect(this.businessEditButton).toBeVisible({ timeout: 15000 });
  128 |   }
  129 | 
  130 |   // ============================================================
  131 |   // Profile
  132 |   // ============================================================
  133 | 
  134 |   async getProfileFields() {
  135 |     return {
  136 |       firstName: (await this.profileFirstName.textContent())?.trim() || '',
  137 |       lastName: (await this.profileLastName.textContent())?.trim() || '',
  138 |       phone: (await this.profilePhone.textContent())?.trim() || '',
  139 |       email: (await this.profileEmail.textContent())?.trim() || '',
  140 |       gender: (await this.profileGender.textContent())?.trim() || '',
  141 |       address: (await this.profileAddress.textContent())?.trim() || '',
  142 |     };
  143 |   }
  144 | 
  145 |   async editProfile(firstName: string, lastName: string): Promise<void> {
  146 |     await this.profileEditButton.click();
  147 |     await expect(this.profileContinueButton).toBeVisible();
  148 |     await this.profileFirstNameInput.fill(firstName);
  149 |     await this.profileLastNameInput.fill(lastName);
  150 |   }
  151 | 
  152 |   async saveProfile(): Promise<void> {
  153 |     await this.profileContinueButton.click();
  154 |     await this.waitForToast(/saved|success/i);
  155 |   }
  156 | 
  157 |   async cancelProfileEdit(): Promise<void> {
  158 |     await this.profileCancelButton.click();
  159 |     // modal closes, no toast
  160 |   }
  161 | 
  162 |   async uploadProfilePhoto(filePath: string): Promise<void> {
  163 |     await this.profilePhotoUpload.click();
  164 |     await this.profilePhotoInput.setInputFiles(filePath);
  165 |     await expect(this.page.locator('img[alt*="profile"]')).toBeVisible({ timeout: 10000 });
  166 |   }
  167 | 
  168 |   // ============================================================
  169 |   // Business Details
  170 |   // ============================================================
  171 | 
  172 |   /**
  173 |    * Get current business fields from view mode.
  174 |    * Assumes the fields are in a table or labelled divs.
  175 |    * Customize selectors to match your DOM.
  176 |    */
  177 |   async getBusinessFields() {
  178 |     const emailCell = this.page.locator('tr:has(td:has-text("Email")) td:nth-child(2)');
  179 |     const phoneCell = this.page.locator('tr:has(td:has-text("Phone")) td:nth-child(2)');
  180 |     const industryCell = this.page.locator('tr:has(td:has-text("Industry")) td:nth-child(2)');
  181 |     return {
  182 |       email: (await emailCell.textContent())?.trim() || '',
  183 |       phone: (await phoneCell.textContent())?.trim() || '',
  184 |       industry: (await industryCell.textContent())?.trim() || '',
  185 |     };
  186 |   }
  187 | 
  188 |   async editBusiness(email: string, phone: string, industry: string): Promise<void> {
  189 |     await this.businessEditButton.click();
> 190 |     await expect(this.businessContinueButton).toBeVisible();
      |                                               ^ Error: expect(locator).toBeVisible() failed
  191 | 
  192 |     await this.businessEmailInput.fill(email);
  193 |     await this.businessPhoneInput.fill(phone);
  194 |     await this.businessIndustryDropdown.click();
  195 |     await this.page.getByRole('option', { name: industry }).click();
  196 |   }
  197 | 
  198 |   async saveBusiness(): Promise<void> {
  199 |     await this.businessContinueButton.click();
  200 |     await this.waitForToast(/saved|success/i);
  201 |   }
  202 | 
  203 |   async cancelBusinessEdit(): Promise<void> {
  204 |     await this.businessCancelButton.click();
  205 |   }
  206 | 
  207 |   async uploadBusinessLogo(filePath: string): Promise<void> {
  208 |     await this.businessLogoUpload.click();
  209 |     await this.businessLogoInput.setInputFiles(filePath);
  210 |     await expect(this.page.locator('img[alt*="business"]')).toBeVisible({ timeout: 10000 });
  211 |   }
  212 | 
  213 |   // ============================================================
  214 |   // Branches
  215 |   // ============================================================
  216 | 
  217 |   async goToBranches() {
  218 |     await this.branchesTab.click();
  219 |     await expect(this.addLocationButton).toBeVisible({ timeout: 10000 });
  220 |   }
  221 | 
  222 |   /**
  223 |    * Creates an online storefront branch.
  224 |    * @param storeName - unique store name
  225 |    * @returns the POST response
  226 |    */
  227 |   async createOnlineBranch(storeName: string): Promise<Response> {
  228 |     await this.addLocationButton.click();
  229 |     await this.onlineStorefrontOption.click();
  230 |     await this.storeNameInput.fill(storeName);
  231 | 
  232 |     const [response] = await Promise.all([
  233 |       this.page.waitForResponse(
  234 |         (res) => res.url().includes('/branches') && res.request().method() === 'POST'
  235 |       ),
  236 |       this.addStoreButton.click(),
  237 |     ]);
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
```