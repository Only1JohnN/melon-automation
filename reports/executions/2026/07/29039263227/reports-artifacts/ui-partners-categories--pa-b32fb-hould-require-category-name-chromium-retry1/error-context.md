# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/categories.spec.ts >> @partners @categories @smoke >> should require category name
- Location: tests/ui/partners/categories.spec.ts:279:7

# Error details

```
Test timeout of 90000ms exceeded.
```

```
Error: locator.click: Test timeout of 90000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Add Category', exact: true })
    - locator resolved to <button disabled class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 bg-sweetLime-1 text-pashBlack-1 hover:bg-sweetLime-1/90 border border-darkLime-7 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/9…>Add Category</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not stable
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not stable
    - retrying click action
      - waiting 100ms
    - waiting for element to be visible, enabled and stable
    - element is not stable
  171 × retrying click action
        - waiting 500ms
        - waiting for element to be visible, enabled and stable
        - element is not enabled
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable

```

# Page snapshot

```yaml
- generic:
  - generic:
    - generic:
      - generic:
        - complementary:
          - generic:
            - generic:
              - img
          - generic:
            - generic:
              - generic:
                - generic:
                  - generic:
                    - generic:
                      - link:
                        - /url: /home
                        - generic:
                          - img
                      - link:
                        - /url: /offers
                        - generic:
                          - img
                      - link:
                        - /url: /inventory/category
                        - generic:
                          - img
                  - generic:
                    - generic:
                      - link:
                        - /url: /inventory/products
                        - generic:
                          - img
                      - link:
                        - /url: /order-mgmt
                        - generic:
                          - img
                      - link:
                        - /url: /inventory/warehouse
                        - generic:
                          - img
                      - link:
                        - /url: /inventory/category
                        - generic:
                          - img
                  - generic:
                    - generic:
                      - link:
                        - /url: /transactions
                        - generic:
                          - img
                  - generic:
                    - generic:
                      - link:
                        - /url: /settings/profile
                        - generic:
                          - img
                      - link:
                        - /url: /inventory/category
                        - generic:
                          - img
          - generic:
            - button:
              - generic:
                - generic:
                  - generic:
                    - img
        - generic:
          - generic:
            - generic:
              - generic:
                - button:
                  - img
                  - generic: 9+
                - button:
                  - generic:
                    - generic:
                      - generic:
                        - img
          - main:
            - generic:
              - generic:
                - navigation
                - generic:
                  - generic:
                    - generic:
                      - heading [level=1]: Category
                      - button:
                        - img
                        - text: Add Category
                    - generic:
                      - generic:
                        - generic:
                          - heading [level=3]: Active Categories
                          - paragraph: "2"
                        - generic:
                          - img
                      - generic:
                        - generic:
                          - heading [level=3]: Utilization Rate
                          - paragraph: 20%
                        - generic:
                          - img
                      - generic:
                        - generic:
                          - heading [level=3]: Top Category
                          - paragraph: AUTO-CAT-1783441233025
                        - generic:
                          - img
                  - generic:
                    - generic:
                      - textbox:
                        - /placeholder: Search by category name
                    - generic:
                      - generic:
                        - table:
                          - rowgroup:
                            - row:
                              - columnheader: Category Name
                              - columnheader: Description
                              - columnheader: Quantity of items
                              - columnheader: Date & Time
                              - columnheader
                          - rowgroup:
                            - row:
                              - cell: AUTO-CAT-1783441233025
                              - cell: Trim Validation
                              - cell: "10"
                              - cell: 2026-07-07 04:20:35 PM
                              - cell:
                                - button:
                                  - generic: Open menu
                                  - img
                            - row:
                              - cell: AUTO-CAT-1783501582975
                              - cell: Trim Validation
                              - cell: "1"
                              - cell: 2026-07-08 09:06:25 AM
                              - cell:
                                - button:
                                  - generic: Open menu
                                  - img
                            - row:
                              - cell: AUTO-CAT-1783547141153
                              - cell: Trim Validation
                              - cell: "0"
                              - cell: 2026-07-08 09:45:42 PM
                              - cell:
                                - button:
                                  - generic: Open menu
                                  - img
                            - row:
                              - cell: AUTO-CAT-1783585793608
                              - cell: Trim Validation
                              - cell: "0"
                              - cell: 2026-07-09 08:29:54 AM
                              - cell:
                                - button:
                                  - generic: Open menu
                                  - img
                            - row:
                              - cell: AUTO-CAT-1783590951574
                              - cell: Trim Validation
                              - cell: "0"
                              - cell: 2026-07-09 09:55:53 AM
                              - cell:
                                - button:
                                  - generic: Open menu
                                  - img
                            - row:
                              - cell: AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                              - cell: Description
                              - cell: "0"
                              - cell: 2026-07-07 04:21:10 PM
                              - cell:
                                - button:
                                  - generic: Open menu
                                  - img
                            - row:
                              - cell: AUTO-CAT-1783441113207
                              - cell: Automation description 1783441113207
                              - cell: "0"
                              - cell: 2026-07-07 04:18:36 PM
                              - cell:
                                - button:
                                  - generic: Open menu
                                  - img
                            - row:
                              - cell: AUTO-CAT-1783441132320
                              - cell: Automation description 1783441132320
                              - cell: "0"
                              - cell: 2026-07-07 04:18:55 PM
                              - cell:
                                - button:
                                  - generic: Open menu
                                  - img
                            - row:
                              - cell: AUTO-CAT-1783441136340
                              - cell: Automation description 1783441136340
                              - cell: "0"
                              - cell: 2026-07-07 04:18:59 PM
                              - cell:
                                - button:
                                  - generic: Open menu
                                  - img
                            - row:
                              - cell: AUTO-CAT-1783441153078
                              - cell: Updated 1783441156469
                              - cell: "0"
                              - cell: 2026-07-07 04:19:15 PM
                              - cell:
                                - button:
                                  - generic: Open menu
                                  - img
                    - generic:
                      - generic:
                        - button [disabled]:
                          - img
                          - generic: Previous
                        - generic:
                          - button: "1"
                          - button: "2"
                          - button: "3"
                          - button: "4"
                          - button: "5"
                          - generic: ...
                        - button:
                          - generic: Next
                          - img
      - region "Notifications Alt+T"
      - region "Notifications alt+T"
  - dialog "Add New Category" [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e5]:
        - heading "Add New Category" [level=2] [ref=e6]
        - button [ref=e7] [cursor=pointer]:
          - img [ref=e8]
      - generic [ref=e14]:
        - generic [ref=e15]:
          - generic [ref=e16]: Category Name *
          - textbox "Category Name *" [ref=e17]:
            - /placeholder: Enter category name
        - generic [ref=e18]:
          - text: Description (Optional)
          - textbox "Description (Optional)" [active] [ref=e19]:
            - /placeholder: Enter category description
            - text: Automation Description
      - generic [ref=e20]:
        - button "Add Category" [disabled]
```

# Test source

```ts
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
  248 |     ).toBeVisible();
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
> 286 |     await categoriesPage.submitCategoryButton.click();
      |                                               ^ Error: locator.click: Test timeout of 90000ms exceeded.
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
  349 |   
  350 |     await categoriesPage.validateErrorMessage(
  351 |       /maximum|max length/i
  352 |     );
  353 |   });
  354 |   
  355 |   test("should prevent creating category with only spaces", async () => {
  356 |     await categoriesPage.addCategoryButton.click();
  357 |   
  358 |     await categoriesPage.categoryNameInput.fill(
  359 |       "       "
  360 |     );
  361 |   
  362 |     await categoriesPage.submitCategoryButton.click();
  363 |   
  364 |     await categoriesPage.validateErrorMessage(
  365 |       /required|invalid/i
  366 |     );
  367 |   });
  368 |   
  369 |   test("should allow special characters in description", async () => {
  370 |     const category =
  371 |       createCategory();
  372 |   
  373 |     const response =
  374 |       await categoriesPage.createCategory(
  375 |         category.name,
  376 |         "@#$%^&*()_+?><:{}[]"
  377 |       );
  378 |   
  379 |     expect(
  380 |       response.status()
  381 |     ).toBe(201);
  382 |   
  383 |     const row =
  384 |       await categoriesPage.getRowData(
  385 |         category.name
  386 |       );
```