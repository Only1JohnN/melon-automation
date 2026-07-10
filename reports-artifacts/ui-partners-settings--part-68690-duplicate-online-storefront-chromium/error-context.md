# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/settings.spec.ts >> @partners @settings @smoke >> Business >> Branches >> should prevent duplicate online storefront
- Location: tests/ui/partners/settings.spec.ts:381:11

# Error details

```
Test timeout of 90000ms exceeded while running "beforeEach" hook.
```

```
Error: locator.click: Test timeout of 90000ms exceeded.
Call log:
  - waiting for getByRole('tab', { name: /branches/i })

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
> 218 |     await this.branchesTab.click();
      |                            ^ Error: locator.click: Test timeout of 90000ms exceeded.
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
```