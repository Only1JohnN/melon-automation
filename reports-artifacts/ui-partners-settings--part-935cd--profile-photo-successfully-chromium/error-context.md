# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/settings.spec.ts >> @partners @settings @smoke >> Profile >> should upload a profile photo successfully
- Location: tests/ui/partners/settings.spec.ts:312:9

# Error details

```
Test timeout of 90000ms exceeded.
```

```
Error: locator.click: Test timeout of 90000ms exceeded.
Call log:
  - waiting for locator('label').filter({ hasText: /upload photo/i }).first()
    - locator resolved to <label for="file" class="w-full h-full flex flex-col items-center justify-center gap-2 cursor-pointer">…</label>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
      - waiting 100ms
    208 × waiting for element to be visible, enabled and stable
        - element is not visible
      - retrying click action
        - waiting 500ms

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
            - /url: /settings/profile
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
            - img [ref=e73]
          - link [ref=e76]:
            - /url: /settings/profile
            - img [ref=e78]
      - button [ref=e85] [cursor=pointer]:
        - img [ref=e89]
    - generic [ref=e90]:
      - generic [ref=e93]:
        - button "9+" [ref=e94] [cursor=pointer]:
          - img [ref=e95]
          - generic [ref=e98]: 9+
        - button [ref=e99] [cursor=pointer]:
          - img [ref=e103]
      - main [ref=e104]:
        - generic [ref=e107]:
          - heading "Settings" [level=1] [ref=e109]
          - generic [ref=e110]:
            - generic [ref=e111]:
              - link "Profile" [ref=e113] [cursor=pointer]:
                - /url: /settings/profile
                - img [ref=e114]
                - heading "Profile" [level=1] [ref=e116]
              - link "Business" [ref=e118] [cursor=pointer]:
                - /url: /settings/business
                - img [ref=e119]
                - heading "Business" [level=1] [ref=e122]
              - link "Withdrawal Bank" [ref=e124] [cursor=pointer]:
                - /url: /settings/withdrawal
                - img [ref=e125]
                - heading "Withdrawal Bank" [level=1] [ref=e130]
              - link "User Management" [ref=e132] [cursor=pointer]:
                - /url: /settings/members
                - img [ref=e133]
                - heading "User Management" [level=1] [ref=e138]
              - link "Roles & Permissions" [ref=e140] [cursor=pointer]:
                - /url: /settings/access
                - img [ref=e141]
                - heading "Roles & Permissions" [level=1] [ref=e143]
              - link "Subscription" [ref=e145] [cursor=pointer]:
                - /url: /settings/billing
                - img [ref=e146]
                - heading "Subscription" [level=1] [ref=e148]
              - link "Qr Code" [ref=e150] [cursor=pointer]:
                - /url: /settings/qrcode
                - img [ref=e151]
                - heading "Qr Code" [level=1] [ref=e157]
              - generic [ref=e159]:
                - img [ref=e161]
                - heading "Integration" [level=1] [ref=e168]
            - generic [ref=e170]:
              - generic [ref=e171]:
                - heading "Profile" [level=1] [ref=e172]
                - paragraph [ref=e173]: Individual Profile details
              - generic [ref=e177]:
                - generic [ref=e178]:
                  - paragraph
                  - button "Edit" [ref=e180] [cursor=pointer]:
                    - img [ref=e181]
                    - text: Edit
                - table [ref=e183]:
                  - rowgroup [ref=e184]:
                    - row "First name UpdatedFirst-1783648768291" [ref=e185]:
                      - cell "First name" [ref=e186]
                      - cell "UpdatedFirst-1783648768291" [ref=e187]
                    - row "Last name UpdatedLast-1783648768291" [ref=e188]:
                      - cell "Last name" [ref=e189]
                      - cell "UpdatedLast-1783648768291" [ref=e190]
                    - row "Phone number +2347080702920" [ref=e191]:
                      - cell "Phone number" [ref=e192]
                      - cell "+2347080702920" [ref=e193]
                    - row "Email melonqabot@yopmail.com" [ref=e194]:
                      - cell "Email" [ref=e195]
                      - cell "melonqabot@yopmail.com" [ref=e196]
                    - row "Gender male" [ref=e197]:
                      - cell "Gender" [ref=e198]
                      - cell "male" [ref=e199]
                    - row "Address Araromi" [ref=e200]:
                      - cell "Address" [ref=e201]
                      - cell "Araromi" [ref=e202]
  - region "Notifications Alt+T"
  - region "Notifications alt+T"
```

# Test source

```ts
  63  | 
  64  |     // ─── Profile ────────────────────────────────────────────
  65  |     this.profileEditButton = page.getByRole('button', { name: /edit/i }).first();
  66  |     // The view cells: use the cell's parent row or sibling
  67  |     this.profileFirstName = page.locator('tr:has(td:has-text("First name")) td:nth-child(2)');
  68  |     this.profileLastName = page.locator('tr:has(td:has-text("Last name")) td:nth-child(2)');
  69  |     this.profilePhone = page.locator('tr:has(td:has-text("Phone number")) td:nth-child(2)');
  70  |     this.profileEmail = page.locator('tr:has(td:has-text("Email")) td:nth-child(2)');
  71  |     this.profileGender = page.locator('tr:has(td:has-text("Gender")) td:nth-child(2)');
  72  |     this.profileAddress = page.locator('tr:has(td:has-text("Address")) td:nth-child(2)');
  73  |     this.profilePhotoUpload = page.locator('label').filter({ hasText: /upload photo/i }).first();
  74  |     this.profilePhotoInput = page.locator('input[type="file"]').first();
  75  |     this.profileCancelButton = page.getByRole('button', { name: /cancel/i }).first();
  76  |     this.profileContinueButton = page.getByRole('button', { name: /continue/i }).first();
  77  |     this.profileFirstNameInput = page.getByRole('textbox', { name: /first name/i });
  78  |     this.profileLastNameInput = page.getByRole('textbox', { name: /last name/i });
  79  | 
  80  |     // ─── Business Details ──────────────────────────────────
  81  |     this.businessEditButton = page.getByRole('button', { name: /edit/i }).nth(1);
  82  |     this.businessEmailInput = page.getByRole('textbox', { name: /email address/i });
  83  |     this.businessPhoneInput = page.getByRole('textbox', { name: /business phone/i });
  84  |     this.businessIndustryDropdown = page.getByRole('combobox', { name: /industry/i });
  85  |     this.businessLogoUpload = page.locator('label').filter({ hasText: /upload photo/i }).nth(1);
  86  |     this.businessLogoInput = page.locator('input[type="file"]').nth(1);
  87  |     this.businessCancelButton = page.getByRole('button', { name: /cancel/i }).nth(1);
  88  |     this.businessContinueButton = page.getByRole('button', { name: /continue/i }).nth(1);
  89  | 
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
> 163 |     await this.profilePhotoUpload.click();
      |                                   ^ Error: locator.click: Test timeout of 90000ms exceeded.
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
  190 |     await expect(this.businessContinueButton).toBeVisible();
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
```