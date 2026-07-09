# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/categories.spec.ts >> @partners @categories @smoke >> should prevent category name exceeding maximum length
- Location: tests/ui/partners/categories.spec.ts:310:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/maximum|max length/i)
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText(/maximum|max length/i)

```

```yaml
- region "Notifications Alt+T"
- region "Notifications alt+T"
- dialog "Add New Category":
  - heading "Add New Category" [level=2]
  - button:
    - img
  - text: Category Name *
  - textbox "Category Name *":
    - /placeholder: Enter category name
    - text: AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
  - text: Description (Optional)
  - textbox "Description (Optional)":
    - /placeholder: Enter category description
    - text: Description
  - button "Add Category"
```

# Test source

```ts
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
> 500 |     ).toBeVisible();
      |       ^ Error: expect(locator).toBeVisible() failed
  501 |   }
  502 | }
```