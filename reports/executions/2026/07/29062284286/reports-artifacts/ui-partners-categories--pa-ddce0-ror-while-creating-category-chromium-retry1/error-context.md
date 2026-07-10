# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/categories.spec.ts >> @partners @categories @smoke >> should handle server error while creating category
- Location: tests/ui/partners/categories.spec.ts:521:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Category with this name')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Category with this name')

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
  - textbox "Search by category name"
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
      - row "AUTO-CAT-1783647053642 Trim Validation 0 2026-07-10 01:30:54 AM Open menu":
        - cell "AUTO-CAT-1783647053642"
        - cell "Trim Validation"
        - cell "0"
        - cell "2026-07-10 01:30:54 AM"
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
> 486 |     await expect(this.page.getByText("Category with this name")).toBeVisible();
      |                                                                  ^ Error: expect(locator).toBeVisible() failed
  487 |   }
  488 | 
  489 |   async validateErrorMessage(
  490 |     message: string | RegExp
  491 |   ) {
  492 |     await expect(
  493 |       this.page.getByText(
  494 |         message
  495 |       )
  496 |     ).toBeVisible();
  497 |   }
  498 | }
```