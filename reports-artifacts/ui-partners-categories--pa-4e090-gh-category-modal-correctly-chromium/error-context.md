# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/categories.spec.ts >> @partners @categories @smoke >> should tab through category modal correctly
- Location: tests/ui/partners/categories.spec.ts:493:7

# Error details

```
Error: expect(locator).toBeFocused() failed

Locator:  getByRole('textbox', { name: 'Category Name *' })
Expected: focused
Received: inactive
Timeout:  5000ms

Call log:
  - Expect "toBeFocused" with timeout 5000ms
  - waiting for getByRole('textbox', { name: 'Category Name *' })
    14 × locator resolved to <input id="name" name="name" placeholder="Enter category name" class="flex h-12 rounded-md border border-mountainAsh-6 bg-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-pashBlack-6 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-darkLime-7 focus-visible:ring-offset-0 focus-visible:bg-sweetLime-10 disabled:cursor-not-allowed disabled:bg-mountainAsh-10 disabled:text-pashBlack-6 text-pashBlack-1 dark:border-gray-800 dark:bg-gra…/>
       - unexpected value "inactive"

```

```yaml
- textbox "Category Name *":
  - /placeholder: Enter category name
```

# Test source

```ts
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
  469 |       categoriesPage.page.waitForResponse(
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
> 498 |     ).toBeFocused();
      |       ^ Error: expect(locator).toBeFocused() failed
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
  570 |     );
  571 |   
  572 |     const row =
  573 |       categoriesPage.getRowByName(
  574 |         category.name
  575 |       );
  576 |   
  577 |     await row
  578 |       .getByRole("button", {
  579 |         name: /open menu/i,
  580 |       })
  581 |       .click();
  582 |   
  583 |     await expect(
  584 |       categoriesPage.page.getByRole(
  585 |         "menuitem",
  586 |         {
  587 |           name: "Edit",
  588 |         }
  589 |       )
  590 |     ).toBeVisible();
  591 |   });
  592 |   
  593 |   test("should display Delete option from action menu", async () => {
  594 |     const category =
  595 |       createCategory();
  596 |   
  597 |     await categoriesPage.createCategory(
  598 |       category.name,
```