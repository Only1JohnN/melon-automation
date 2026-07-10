# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/categories.spec.ts >> @partners @categories @smoke >> should return empty results when category does not exist
- Location: tests/ui/partners/categories.spec.ts:239:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/No results/i)
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText(/No results/i)

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
    - /url: /inventory/category
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
    - /url: /inventory/category
    - img
  - button:
    - img
- button "9+":
  - img
  - text: 9+
- button:
  - img
- main:
  - navigation
  - heading "Category" [level=1]
  - button "Add Category":
    - img
    - text: Add Category
  - heading "Active Categories" [level=3]
  - paragraph: "2"
  - img
  - heading "Utilization Rate" [level=3]
  - paragraph: 20%
  - img
  - heading "Top Category" [level=3]
  - paragraph: AUTO-CAT-1783441233025
  - img
  - textbox "Search by category name": INVALID-1783646893291
  - table:
    - rowgroup:
      - row "Category Name Description Quantity of items Date & Time":
        - columnheader "Category Name"
        - columnheader "Description"
        - columnheader "Quantity of items"
        - columnheader "Date & Time"
        - columnheader
    - rowgroup:
      - row "AUTO-CAT-1783441233025 Trim Validation 13 2026-07-07 04:20:35 PM Open menu":
        - cell "AUTO-CAT-1783441233025"
        - cell "Trim Validation"
        - cell "13"
        - cell "2026-07-07 04:20:35 PM"
        - cell "Open menu":
          - button "Open menu":
            - text: Open menu
            - img
      - row "AUTO-CAT-1783501582975 Trim Validation 1 2026-07-08 09:06:25 AM Open menu":
        - cell "AUTO-CAT-1783501582975"
        - cell "Trim Validation"
        - cell "1"
        - cell "2026-07-08 09:06:25 AM"
        - cell "Open menu":
          - button "Open menu":
            - text: Open menu
            - img
      - row "AUTO-CAT-1783547141153 Trim Validation 0 2026-07-08 09:45:42 PM Open menu":
        - cell "AUTO-CAT-1783547141153"
        - cell "Trim Validation"
        - cell "0"
        - cell "2026-07-08 09:45:42 PM"
        - cell "Open menu":
          - button "Open menu":
            - text: Open menu
            - img
      - row "AUTO-CAT-1783585793608 Trim Validation 0 2026-07-09 08:29:54 AM Open menu":
        - cell "AUTO-CAT-1783585793608"
        - cell "Trim Validation"
        - cell "0"
        - cell "2026-07-09 08:29:54 AM"
        - cell "Open menu":
          - button "Open menu":
            - text: Open menu
            - img
      - row "AUTO-CAT-1783590951574 Trim Validation 0 2026-07-09 09:55:53 AM Open menu":
        - cell "AUTO-CAT-1783590951574"
        - cell "Trim Validation"
        - cell "0"
        - cell "2026-07-09 09:55:53 AM"
        - cell "Open menu":
          - button "Open menu":
            - text: Open menu
            - img
      - row "AUTO-CAT-1783620616425 Trim Validation 0 2026-07-09 06:10:17 PM Open menu":
        - cell "AUTO-CAT-1783620616425"
        - cell "Trim Validation"
        - cell "0"
        - cell "2026-07-09 06:10:17 PM"
        - cell "Open menu":
          - button "Open menu":
            - text: Open menu
            - img
      - row "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA Description 0 2026-07-07 04:21:10 PM Open menu":
        - cell "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
        - cell "Description"
        - cell "0"
        - cell "2026-07-07 04:21:10 PM"
        - cell "Open menu":
          - button "Open menu":
            - text: Open menu
            - img
      - row "AUTO-CAT-1783441113207 Automation description 1783441113207 0 2026-07-07 04:18:36 PM Open menu":
        - cell "AUTO-CAT-1783441113207"
        - cell "Automation description 1783441113207"
        - cell "0"
        - cell "2026-07-07 04:18:36 PM"
        - cell "Open menu":
          - button "Open menu":
            - text: Open menu
            - img
      - row "AUTO-CAT-1783441132320 Automation description 1783441132320 0 2026-07-07 04:18:55 PM Open menu":
        - cell "AUTO-CAT-1783441132320"
        - cell "Automation description 1783441132320"
        - cell "0"
        - cell "2026-07-07 04:18:55 PM"
        - cell "Open menu":
          - button "Open menu":
            - text: Open menu
            - img
      - row "AUTO-CAT-1783441136340 Automation description 1783441136340 0 2026-07-07 04:18:59 PM Open menu":
        - cell "AUTO-CAT-1783441136340"
        - cell "Automation description 1783441136340"
        - cell "0"
        - cell "2026-07-07 04:18:59 PM"
        - cell "Open menu":
          - button "Open menu":
            - text: Open menu
            - img
  - button "Previous" [disabled]:
    - img
    - text: Previous
  - button "1"
  - button "2"
  - button "3"
  - button "4"
  - button "5"
  - text: ...
  - button "Next":
    - text: Next
    - img
- region "Notifications Alt+T"
- region "Notifications alt+T"
```

# Test source

```ts
  148 |     expect(
  149 |       body.message
  150 |     ).toMatch(
  151 |       "Category with this name already exists"
  152 |     );
  153 | 
  154 |     await categoriesPage.validateErrorToast();
  155 |   });
  156 | 
  157 |   // --------------------------------------------------
  158 |   // Edit Category
  159 |   // --------------------------------------------------
  160 | 
  161 |   test("should edit category description successfully", async () => {
  162 |     const category =
  163 |       createCategory();
  164 | 
  165 |     await categoriesPage.createCategory(
  166 |       category.name,
  167 |       category.description
  168 |     );
  169 | 
  170 |     const newDescription =
  171 |       `Updated ${Date.now()}`;
  172 | 
  173 |     const response =
  174 |       await categoriesPage.editCategory(
  175 |         category.name,
  176 |         newDescription
  177 |       );
  178 | 
  179 |     expect(
  180 |       response.status()
  181 |     ).toBe(200);
  182 | 
  183 |     const row =
  184 |       await categoriesPage.getRowData(
  185 |         category.name
  186 |       );
  187 | 
  188 |     expect(
  189 |       row.description
  190 |     ).toContain(
  191 |       newDescription
  192 |     );
  193 |   });
  194 | 
  195 |   // --------------------------------------------------
  196 |   // Search
  197 |   // --------------------------------------------------
  198 | 
  199 |   test("should search category using full name", async () => {
  200 |     const category =
  201 |       createCategory();
  202 | 
  203 |     await categoriesPage.createCategory(
  204 |       category.name,
  205 |       category.description
  206 |     );
  207 | 
  208 |     await categoriesPage.search(
  209 |       category.name
  210 |     );
  211 | 
  212 |     await expect(
  213 |       categoriesPage.getRowByName(
  214 |         category.name
  215 |       )
  216 |     ).toBeVisible();
  217 |   });
  218 | 
  219 |   test("should search category using partial name", async () => {
  220 |     const category =
  221 |       createCategory();
  222 | 
  223 |     await categoriesPage.createCategory(
  224 |       category.name,
  225 |       category.description
  226 |     );
  227 | 
  228 |     await categoriesPage.search(
  229 |       "AUTO-CAT"
  230 |     );
  231 | 
  232 |     await expect(
  233 |       categoriesPage.getRowByName(
  234 |         category.name
  235 |       )
  236 |     ).toBeVisible();
  237 |   });
  238 | 
  239 |   test("should return empty results when category does not exist", async () => {
  240 |     await categoriesPage.search(
  241 |       `INVALID-${Date.now()}`
  242 |     );
  243 | 
  244 |     await expect(
  245 |       categoriesPage.page.getByText(
  246 |         /No results/i
  247 |       )
> 248 |     ).toBeVisible();
      |       ^ Error: expect(locator).toBeVisible() failed
  249 |   });
  250 | 
  251 |   // --------------------------------------------------
  252 |   // Pagination
  253 |   // --------------------------------------------------
  254 | 
  255 |   test("should navigate between pages", async () => {
  256 |     if (
  257 |       await categoriesPage.nextButton.isDisabled()
  258 |     ) {
  259 |       test.skip();
  260 |     }
  261 | 
  262 |     await categoriesPage.goToNextPage();
  263 | 
  264 |     await expect(
  265 |       categoriesPage.previousButton
  266 |     ).toBeEnabled();
  267 | 
  268 |     await categoriesPage.goToPreviousPage();
  269 | 
  270 |     await expect(
  271 |       categoriesPage.nextButton
  272 |     ).toBeVisible();
  273 |   });
  274 | 
  275 |   // --------------------------------------------------
  276 |   // Form Validations
  277 |   // --------------------------------------------------
  278 |   
  279 |   test("should require category name", async () => {
  280 |     await categoriesPage.addCategoryButton.click();
  281 |   
  282 |     await categoriesPage.descriptionInput.fill(
  283 |       "Automation Description"
  284 |     );
  285 |   
  286 |     await categoriesPage.submitCategoryButton.click();
  287 |   
  288 |     await categoriesPage.validateErrorMessage(
  289 |       /category name/i
  290 |     );
  291 |   
  292 |     await categoriesPage.modalIsOpen();
  293 |   });
  294 |   
  295 |   test("should trim leading and trailing spaces from category name", async () => {
  296 |     const rawName = `   AUTO-CAT-${Date.now()}   `;
  297 |   
  298 |     await categoriesPage.createCategory(
  299 |       rawName,
  300 |       "Trim Validation"
  301 |     );
  302 |   
  303 |     await expect(
  304 |       categoriesPage.getRowByName(
  305 |         rawName.trim()
  306 |       )
  307 |     ).toBeVisible();
  308 |   });
  309 |   
  310 |   test("should prevent category name exceeding maximum length", async () => {
  311 |     const longName =
  312 |       "A".repeat(256);
  313 |   
  314 |     await categoriesPage.addCategoryButton.click();
  315 |   
  316 |     await categoriesPage.categoryNameInput.fill(
  317 |       longName
  318 |     );
  319 |   
  320 |     await categoriesPage.descriptionInput.fill(
  321 |       "Description"
  322 |     );
  323 |   
  324 |     await categoriesPage.submitCategoryButton.click();
  325 |   
  326 |     await categoriesPage.validateErrorMessage(
  327 |       /maximum|max length/i
  328 |     );
  329 |   });
  330 |   
  331 |   test("should prevent description exceeding maximum length", async () => {
  332 |     const category =
  333 |       createCategory();
  334 |   
  335 |     const description =
  336 |       "A".repeat(5001);
  337 |   
  338 |     await categoriesPage.addCategoryButton.click();
  339 |   
  340 |     await categoriesPage.categoryNameInput.fill(
  341 |       category.name
  342 |     );
  343 |   
  344 |     await categoriesPage.descriptionInput.fill(
  345 |       description
  346 |     );
  347 |   
  348 |     await categoriesPage.submitCategoryButton.click();
```