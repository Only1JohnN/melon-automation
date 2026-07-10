# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/categories.spec.ts >> @partners @categories @smoke >> should submit category with Enter key
- Location: tests/ui/partners/categories.spec.ts:454:7

# Error details

```
Test timeout of 90000ms exceeded.
```

```
Error: page.waitForResponse: Test timeout of 90000ms exceeded.
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
        - button [ref=e7] [cursor=pointer]:
          - img [ref=e8]
      - generic [ref=e14]:
        - generic [ref=e15]:
          - generic [ref=e16]: Category Name *
          - textbox "Category Name *" [ref=e17]:
            - /placeholder: Enter category name
            - text: AUTO-CAT-1783647455487
        - generic [ref=e18]:
          - text: Description (Optional)
          - textbox "Description (Optional)" [active] [ref=e19]:
            - /placeholder: Enter category description
            - text: Automation description 1783647455487
      - button "Add Category" [ref=e21] [cursor=pointer]
```

# Test source

```ts
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
  387 |   
  388 |     expect(
  389 |       row.description
  390 |     ).toContain(
  391 |       "@#$%^"
  392 |     );
  393 |   });
  394 |   
  395 |   // --------------------------------------------------
  396 |   // Modal Behaviour
  397 |   // --------------------------------------------------
  398 |   
  399 |   test("should focus category name when modal opens", async () => {
  400 |     await categoriesPage.addCategoryButton.click();
  401 |   
  402 |     await expect(
  403 |       categoriesPage.categoryNameInput
  404 |     ).toBeFocused();
  405 |   });
  406 |   
  407 |   test("should close modal using Cancel button", async () => {
  408 |     await categoriesPage.addCategoryButton.click();
  409 |   
  410 |     await categoriesPage.closeModalViaCancel();
  411 |   
  412 |     await categoriesPage.modalIsClosed();
  413 |   });
  414 |   
  415 |   test("should close modal using Escape key", async () => {
  416 |     await categoriesPage.addCategoryButton.click();
  417 |   
  418 |     await categoriesPage.closeModalViaEscape();
  419 |   
  420 |     await categoriesPage.modalIsClosed();
  421 |   });
  422 |   
  423 |   test("should preserve entered values until modal closes", async () => {
  424 |     const category =
  425 |       createCategory();
  426 |   
  427 |     await categoriesPage.addCategoryButton.click();
  428 |   
  429 |     await categoriesPage.categoryNameInput.fill(
  430 |       category.name
  431 |     );
  432 |   
  433 |     await categoriesPage.descriptionInput.fill(
  434 |       category.description!
  435 |     );
  436 |   
  437 |     await expect(
  438 |       categoriesPage.categoryNameInput
  439 |     ).toHaveValue(
  440 |       category.name
  441 |     );
  442 |   
  443 |     await expect(
  444 |       categoriesPage.descriptionInput
  445 |     ).toHaveValue(
  446 |       category.description!
  447 |     );
  448 |   });
  449 |   
  450 |   // --------------------------------------------------
  451 |   // Keyboard Behaviour
  452 |   // --------------------------------------------------
  453 |   
  454 |   test("should submit category with Enter key", async () => {
  455 |     const category =
  456 |       createCategory();
  457 |   
  458 |     await categoriesPage.addCategoryButton.click();
  459 |   
  460 |     await categoriesPage.categoryNameInput.fill(
  461 |       category.name
  462 |     );
  463 |   
  464 |     await categoriesPage.descriptionInput.fill(
  465 |       category.description!
  466 |     );
  467 |   
  468 |     const responsePromise =
> 469 |       categoriesPage.page.waitForResponse(
      |                           ^ Error: page.waitForResponse: Test timeout of 90000ms exceeded.
  470 |         response =>
  471 |           response.url().includes("/categories") &&
  472 |           response.request().method() === "POST"
  473 |       );
  474 |   
  475 |     await categoriesPage.descriptionInput.press(
  476 |       "Enter"
  477 |     );
  478 |   
  479 |     const response =
  480 |       await responsePromise;
  481 |   
  482 |     expect(
  483 |       response.status()
  484 |     ).toBe(201);
  485 |   
  486 |     await expect(
  487 |       categoriesPage.getRowByName(
  488 |         category.name
  489 |       )
  490 |     ).toBeVisible();
  491 |   });
  492 |   
  493 |   test("should tab through category modal correctly", async () => {
  494 |     await categoriesPage.addCategoryButton.click();
  495 |   
  496 |     await expect(
  497 |       categoriesPage.categoryNameInput
  498 |     ).toBeFocused();
  499 |   
  500 |     await categoriesPage.page.keyboard.press(
  501 |       "Tab"
  502 |     );
  503 |   
  504 |     await expect(
  505 |       categoriesPage.descriptionInput
  506 |     ).toBeFocused();
  507 |   
  508 |     await categoriesPage.page.keyboard.press(
  509 |       "Tab"
  510 |     );
  511 |   
  512 |     await expect(
  513 |       categoriesPage.submitCategoryButton
  514 |     ).toBeFocused();
  515 |   });
  516 |   
  517 |   // --------------------------------------------------
  518 |   // Server Error Handling
  519 |   // --------------------------------------------------
  520 |   
  521 |   test("should handle server error while creating category", async ({
  522 |     page,
  523 |   }) => {
  524 |     await page.route(
  525 |       "**/categories",
  526 |       async route => {
  527 |         await route.fulfill({
  528 |           status: 500,
  529 |           contentType:
  530 |             "application/json",
  531 |           body: JSON.stringify({
  532 |             message:
  533 |               "Internal Server Error",
  534 |           }),
  535 |         });
  536 |       }
  537 |     );
  538 |   
  539 |     const category =
  540 |       createCategory();
  541 |   
  542 |     await categoriesPage.addCategoryButton.click();
  543 |   
  544 |     await categoriesPage.categoryNameInput.fill(
  545 |       category.name
  546 |     );
  547 |   
  548 |     await categoriesPage.descriptionInput.fill(
  549 |       category.description!
  550 |     );
  551 |   
  552 |     await categoriesPage.submitCategoryButton.click();
  553 |   
  554 |     await categoriesPage.validateErrorToast();
  555 |   
  556 |     await categoriesPage.modalIsOpen();
  557 |   });
  558 |   
  559 |   // --------------------------------------------------
  560 |   // Actions Menu
  561 |   // --------------------------------------------------
  562 |   
  563 |   test("should display Edit option from action menu", async () => {
  564 |     const category =
  565 |       createCategory();
  566 |   
  567 |     await categoriesPage.createCategory(
  568 |       category.name,
  569 |       category.description
```