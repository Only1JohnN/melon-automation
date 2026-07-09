# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/categories.spec.ts >> @partners @categories @smoke >> should increase category quantity after product creation
- Location: tests/ui/partners/categories.spec.ts:627:7

# Error details

```
Test timeout of 90000ms exceeded.
```

```
Error: locator.textContent: Test timeout of 90000ms exceeded.
Call log:
  - waiting for locator('table').locator('tr:has-text("AUTO-CAT-1783621389473")').locator('td').first()

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
            - /url: /inventory/category
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
            - img [ref=e54]
        - link [ref=e63] [cursor=pointer]:
          - /url: /transactions
          - img [ref=e65]
        - generic [ref=e70]:
          - link [ref=e71] [cursor=pointer]:
            - /url: /settings/profile
            - img [ref=e73]
          - link [ref=e76]:
            - /url: /inventory/category
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
        - generic [ref=e106]:
          - navigation [ref=e107]
          - generic [ref=e108]:
            - generic [ref=e109]:
              - generic [ref=e110]:
                - heading "Category" [level=1] [ref=e111]
                - button "Add Category" [ref=e112] [cursor=pointer]:
                  - img [ref=e113]
                  - text: Add Category
              - generic [ref=e114]:
                - generic [ref=e115]:
                  - generic [ref=e116]:
                    - heading "Active Categories" [level=3] [ref=e117]
                    - paragraph [ref=e118]: "2"
                  - img [ref=e120]
                - generic [ref=e123]:
                  - generic [ref=e124]:
                    - heading "Utilization Rate" [level=3] [ref=e125]
                    - paragraph [ref=e126]: 20%
                  - img [ref=e128]
                - generic [ref=e131]:
                  - generic [ref=e132]:
                    - heading "Top Category" [level=3] [ref=e133]
                    - paragraph [ref=e134]: AUTO-CAT-1783441233025
                  - img [ref=e136]
            - generic [ref=e140]:
              - textbox "Search by category name" [ref=e142]
              - table [ref=e145]:
                - rowgroup [ref=e146]:
                  - row "Category Name Description Quantity of items Date & Time" [ref=e147]:
                    - columnheader "Category Name" [ref=e148]
                    - columnheader "Description" [ref=e149]
                    - columnheader "Quantity of items" [ref=e150]
                    - columnheader "Date & Time" [ref=e151]
                    - columnheader [ref=e152]
                - rowgroup [ref=e153]:
                  - row "AUTO-CAT-1783441233025 Trim Validation 10 2026-07-07 04:20:35 PM Open menu" [ref=e154]:
                    - cell "AUTO-CAT-1783441233025" [ref=e155]
                    - cell "Trim Validation" [ref=e156]
                    - cell "10" [ref=e157]
                    - cell "2026-07-07 04:20:35 PM" [ref=e158]
                    - cell "Open menu" [ref=e159]:
                      - button "Open menu" [ref=e160] [cursor=pointer]:
                        - generic [ref=e161]: Open menu
                        - img [ref=e162]
                  - row "AUTO-CAT-1783501582975 Trim Validation 1 2026-07-08 09:06:25 AM Open menu" [ref=e166]:
                    - cell "AUTO-CAT-1783501582975" [ref=e167]
                    - cell "Trim Validation" [ref=e168]
                    - cell "1" [ref=e169]
                    - cell "2026-07-08 09:06:25 AM" [ref=e170]
                    - cell "Open menu" [ref=e171]:
                      - button "Open menu" [ref=e172] [cursor=pointer]:
                        - generic [ref=e173]: Open menu
                        - img [ref=e174]
                  - row "AUTO-CAT-1783547141153 Trim Validation 0 2026-07-08 09:45:42 PM Open menu" [ref=e178]:
                    - cell "AUTO-CAT-1783547141153" [ref=e179]
                    - cell "Trim Validation" [ref=e180]
                    - cell "0" [ref=e181]
                    - cell "2026-07-08 09:45:42 PM" [ref=e182]
                    - cell "Open menu" [ref=e183]:
                      - button "Open menu" [ref=e184] [cursor=pointer]:
                        - generic [ref=e185]: Open menu
                        - img [ref=e186]
                  - row "AUTO-CAT-1783585793608 Trim Validation 0 2026-07-09 08:29:54 AM Open menu" [ref=e190]:
                    - cell "AUTO-CAT-1783585793608" [ref=e191]
                    - cell "Trim Validation" [ref=e192]
                    - cell "0" [ref=e193]
                    - cell "2026-07-09 08:29:54 AM" [ref=e194]
                    - cell "Open menu" [ref=e195]:
                      - button "Open menu" [ref=e196] [cursor=pointer]:
                        - generic [ref=e197]: Open menu
                        - img [ref=e198]
                  - row "AUTO-CAT-1783590951574 Trim Validation 0 2026-07-09 09:55:53 AM Open menu" [ref=e202]:
                    - cell "AUTO-CAT-1783590951574" [ref=e203]
                    - cell "Trim Validation" [ref=e204]
                    - cell "0" [ref=e205]
                    - cell "2026-07-09 09:55:53 AM" [ref=e206]
                    - cell "Open menu" [ref=e207]:
                      - button "Open menu" [ref=e208] [cursor=pointer]:
                        - generic [ref=e209]: Open menu
                        - img [ref=e210]
                  - row "AUTO-CAT-1783620616425 Trim Validation 0 2026-07-09 06:10:17 PM Open menu" [ref=e214]:
                    - cell "AUTO-CAT-1783620616425" [ref=e215]
                    - cell "Trim Validation" [ref=e216]
                    - cell "0" [ref=e217]
                    - cell "2026-07-09 06:10:17 PM" [ref=e218]
                    - cell "Open menu" [ref=e219]:
                      - button "Open menu" [ref=e220] [cursor=pointer]:
                        - generic [ref=e221]: Open menu
                        - img [ref=e222]
                  - row "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA Description 0 2026-07-07 04:21:10 PM Open menu" [ref=e226]:
                    - cell "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" [ref=e227]
                    - cell "Description" [ref=e228]
                    - cell "0" [ref=e229]
                    - cell "2026-07-07 04:21:10 PM" [ref=e230]
                    - cell "Open menu" [ref=e231]:
                      - button "Open menu" [ref=e232] [cursor=pointer]:
                        - generic [ref=e233]: Open menu
                        - img [ref=e234]
                  - row "AUTO-CAT-1783441113207 Automation description 1783441113207 0 2026-07-07 04:18:36 PM Open menu" [ref=e238]:
                    - cell "AUTO-CAT-1783441113207" [ref=e239]
                    - cell "Automation description 1783441113207" [ref=e240]
                    - cell "0" [ref=e241]
                    - cell "2026-07-07 04:18:36 PM" [ref=e242]
                    - cell "Open menu" [ref=e243]:
                      - button "Open menu" [ref=e244] [cursor=pointer]:
                        - generic [ref=e245]: Open menu
                        - img [ref=e246]
                  - row "AUTO-CAT-1783441132320 Automation description 1783441132320 0 2026-07-07 04:18:55 PM Open menu" [ref=e250]:
                    - cell "AUTO-CAT-1783441132320" [ref=e251]
                    - cell "Automation description 1783441132320" [ref=e252]
                    - cell "0" [ref=e253]
                    - cell "2026-07-07 04:18:55 PM" [ref=e254]
                    - cell "Open menu" [ref=e255]:
                      - button "Open menu" [ref=e256] [cursor=pointer]:
                        - generic [ref=e257]: Open menu
                        - img [ref=e258]
                  - row "AUTO-CAT-1783441136340 Automation description 1783441136340 0 2026-07-07 04:18:59 PM Open menu" [ref=e262]:
                    - cell "AUTO-CAT-1783441136340" [ref=e263]
                    - cell "Automation description 1783441136340" [ref=e264]
                    - cell "0" [ref=e265]
                    - cell "2026-07-07 04:18:59 PM" [ref=e266]
                    - cell "Open menu" [ref=e267]:
                      - button "Open menu" [ref=e268] [cursor=pointer]:
                        - generic [ref=e269]: Open menu
                        - img [ref=e270]
              - generic [ref=e275]:
                - button "Previous" [disabled]:
                  - img
                  - generic: Previous
                - generic [ref=e276]:
                  - button "1" [ref=e277] [cursor=pointer]
                  - button "2" [ref=e278] [cursor=pointer]
                  - button "3" [ref=e279] [cursor=pointer]
                  - button "4" [ref=e280] [cursor=pointer]
                  - button "5" [ref=e281] [cursor=pointer]
                  - generic [ref=e282]: ...
                - button "Next" [ref=e283] [cursor=pointer]:
                  - generic [ref=e284]: Next
                  - img [ref=e285]
  - region "Notifications Alt+T"
  - region "Notifications alt+T"
```

# Test source

```ts
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
  340 |     await this.cancelButton.click();
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
  383 |       .getByRole("button", {
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
> 403 |             .textContent()
      |              ^ Error: locator.textContent: Test timeout of 90000ms exceeded.
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
  441 |   }
  442 | 
  443 |   // ============================================================
  444 |   // Top Category
  445 |   // ============================================================
  446 | 
  447 |   async getTopCategoryInfo() {
  448 |     const name =
  449 |       (
  450 |         await this.topCategoryWidget
  451 |           .getByRole("paragraph")
  452 |           .textContent()
  453 |       )?.trim() ?? "";
  454 | 
  455 |     const quantityText =
  456 |       await this.topCategoryWidget
  457 |         .locator("span")
  458 |         .last()
  459 |         .textContent();
  460 | 
  461 |     return {
  462 |       name,
  463 | 
  464 |       quantity: Number(
  465 |         quantityText?.replace(
  466 |           /\D/g,
  467 |           ""
  468 |         ) ?? "0"
  469 |       ),
  470 |     };
  471 |   }
  472 | 
  473 |   // ============================================================
  474 |   // Validation
  475 |   // ============================================================
  476 | 
  477 |   async validateSuccessToast() {
  478 |     await expect(
  479 |       this.page.getByRole("alert")
  480 |     ).toContainText(
  481 |       /success/i
  482 |     );
  483 |   }
  484 | 
  485 |   async validateErrorToast() {
  486 |     await expect(
  487 |       this.page.getByRole("alert")
  488 |     ).toContainText(
  489 |       /error|failed|exists/i
  490 |     );
  491 |   }
  492 | 
  493 |   async validateErrorMessage(
  494 |     message: string | RegExp
  495 |   ) {
  496 |     await expect(
  497 |       this.page.getByText(
  498 |         message
  499 |       )
  500 |     ).toBeVisible();
  501 |   }
  502 | }
```