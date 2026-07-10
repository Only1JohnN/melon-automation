# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/categories.spec.ts >> @partners @categories @smoke >> should close modal using Cancel button
- Location: tests/ui/partners/categories.spec.ts:407:7

# Error details

```
Test timeout of 90000ms exceeded.
```

```
Error: locator.click: Test timeout of 90000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Cancel' })

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
                              - cell: "13"
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
                              - cell: AUTO-CAT-1783620616425
                              - cell: Trim Validation
                              - cell: "0"
                              - cell: 2026-07-09 06:10:17 PM
                              - cell:
                                - button:
                                  - generic: Open menu
                                  - img
                            - row:
                              - cell: AUTO-CAT-1783647053642
                              - cell: Trim Validation
                              - cell: "0"
                              - cell: 2026-07-10 01:30:54 AM
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
        - button [active] [ref=e7] [cursor=pointer]:
          - img [ref=e8]
      - generic [ref=e14]:
        - generic [ref=e15]:
          - generic [ref=e16]: Category Name *
          - textbox "Category Name *" [ref=e17]:
            - /placeholder: Enter category name
        - generic [ref=e18]:
          - text: Description (Optional)
          - textbox "Description (Optional)" [ref=e19]:
            - /placeholder: Enter category description
      - generic [ref=e20]:
        - button "Add Category" [disabled]
```

# Test source

```ts
  240 |       })
  241 |       .click();
  242 | 
  243 |     await this.page
  244 |       .getByRole("button", {
  245 |         name: /confirm/i,
  246 |       })
  247 |       .click();
  248 |   }
  249 | 
  250 |   // ============================================================
  251 |   // Search
  252 |   // ============================================================
  253 | 
  254 |   async search(
  255 |     searchTerm: string
  256 |   ) {
  257 |     await this.searchInput.fill(
  258 |       searchTerm
  259 |     );
  260 | 
  261 |     await Promise.all([
  262 |       this.page.waitForResponse(
  263 |         (response) =>
  264 |           response.url().includes(
  265 |             "/categories"
  266 |           ) &&
  267 |           response.request().method() ===
  268 |             "GET"
  269 |       ),
  270 | 
  271 |       this.searchInput.press(
  272 |         "Enter"
  273 |       ),
  274 |     ]);
  275 |   }
  276 | 
  277 |   async clearSearch() {
  278 |     await this.searchInput.clear();
  279 | 
  280 |     await this.searchInput.press(
  281 |       "Enter"
  282 |     );
  283 |   }
  284 | 
  285 |   // ============================================================
  286 |   // Pagination
  287 |   // ============================================================
  288 | 
  289 |   async goToNextPage() {
  290 |     if (
  291 |       await this.nextButton.isDisabled()
  292 |     ) {
  293 |       return;
  294 |     }
  295 | 
  296 |     await Promise.all([
  297 |       this.page.waitForResponse(
  298 |         (response) =>
  299 |           response.url().includes(
  300 |             "/categories"
  301 |           )
  302 |       ),
  303 | 
  304 |       this.nextButton.click(),
  305 |     ]);
  306 |   }
  307 | 
  308 |   async goToPreviousPage() {
  309 |     if (
  310 |       await this.previousButton.isDisabled()
  311 |     ) {
  312 |       return;
  313 |     }
  314 | 
  315 |     await Promise.all([
  316 |       this.page.waitForResponse(
  317 |         (response) =>
  318 |           response.url().includes(
  319 |             "/categories"
  320 |           )
  321 |       ),
  322 | 
  323 |       this.previousButton.click(),
  324 |     ]);
  325 |   }
  326 | 
  327 |   // ============================================================
  328 |   // Modal
  329 |   // ============================================================
  330 | 
  331 |   async openCreateModal() {
  332 |     await this.addCategoryButton.click();
  333 | 
  334 |     await expect(
  335 |       this.categoryNameInput
  336 |     ).toBeVisible();
  337 |   }
  338 | 
  339 |   async closeModalViaCancel() {
> 340 |     await this.cancelButton.click();
      |                             ^ Error: locator.click: Test timeout of 90000ms exceeded.
  341 | 
  342 |     await this.modalIsClosed();
  343 |   }
  344 | 
  345 |   async closeModalViaEscape() {
  346 |     await this.page.keyboard.press(
  347 |       "Escape"
  348 |     );
  349 | 
  350 |     await this.modalIsClosed();
  351 |   }
  352 | 
  353 |   async modalIsOpen() {
  354 |     await expect(
  355 |       this.categoryNameInput
  356 |     ).toBeVisible();
  357 |   }
  358 | 
  359 |   async modalIsClosed() {
  360 |     await expect(
  361 |       this.categoryNameInput
  362 |     ).not.toBeVisible();
  363 |   }
  364 | 
  365 |   // ============================================================
  366 |   // Table
  367 |   // ============================================================
  368 | 
  369 |   getRowByName(
  370 |     categoryName: string
  371 |   ) {
  372 |     return this.table.locator(
  373 |       `tr:has-text("${categoryName}")`
  374 |     );
  375 |   }
  376 | 
  377 |   async openActionsMenu(
  378 |     categoryName: string
  379 |   ) {
  380 |     await this.getRowByName(
  381 |       categoryName
  382 |     )
  383 |       .getByRole("cell", {
  384 |         name: "Open menu",
  385 |       })
  386 |       .click();
  387 |   }
  388 | 
  389 |   async getRowData(
  390 |     categoryName: string
  391 |   ) {
  392 |     const row =
  393 |       this.getRowByName(
  394 |         categoryName
  395 |       );
  396 | 
  397 |     return {
  398 |       name:
  399 |         (
  400 |           await row
  401 |             .locator("td")
  402 |             .nth(0)
  403 |             .textContent()
  404 |         )?.trim() ?? "",
  405 | 
  406 |       description:
  407 |         (
  408 |           await row
  409 |             .locator("td")
  410 |             .nth(1)
  411 |             .textContent()
  412 |         )?.trim() ?? "",
  413 | 
  414 |       quantity: Number(
  415 |         (
  416 |           await row
  417 |             .locator("td")
  418 |             .nth(2)
  419 |             .textContent()
  420 |         )?.trim() ?? "0"
  421 |       ),
  422 | 
  423 |       createdAt:
  424 |         (
  425 |           await row
  426 |             .locator("td")
  427 |             .nth(3)
  428 |             .textContent()
  429 |         )?.trim() ?? "",
  430 |     };
  431 |   }
  432 | 
  433 |   async getQuantity(
  434 |     categoryName: string
  435 |   ) {
  436 |     return (
  437 |       await this.getRowData(
  438 |         categoryName
  439 |       )
  440 |     ).quantity;
```