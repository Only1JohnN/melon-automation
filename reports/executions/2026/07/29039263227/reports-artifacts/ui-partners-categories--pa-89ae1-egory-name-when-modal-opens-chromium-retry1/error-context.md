# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/categories.spec.ts >> @partners @categories @smoke >> should focus category name when modal opens
- Location: tests/ui/partners/categories.spec.ts:399:7

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
> 404 |     ).toBeFocused();
      |       ^ Error: expect(locator).toBeFocused() failed
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
  498 |     ).toBeFocused();
  499 |   
  500 |     await categoriesPage.page.keyboard.press(
  501 |       "Tab"
  502 |     );
  503 |   
  504 |     await expect(
```