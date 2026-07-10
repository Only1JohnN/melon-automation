# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/categories.spec.ts >> @partners @categories @smoke >> should display Delete option from action menu
- Location: tests/ui/partners/categories.spec.ts:593:7

# Error details

```
Test timeout of 90000ms exceeded.
```

```
Error: locator.click: Test timeout of 90000ms exceeded.
Call log:
  - waiting for locator('table').locator('tr:has-text("AUTO-CAT-1783647703347")').getByRole('button', { name: /open menu/i })

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
                  - row "AUTO-CAT-1783441233025 Trim Validation 13 2026-07-07 04:20:35 PM Open menu" [ref=e154]:
                    - cell "AUTO-CAT-1783441233025" [ref=e155]
                    - cell "Trim Validation" [ref=e156]
                    - cell "13" [ref=e157]
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
                  - row "AUTO-CAT-1783647053642 Trim Validation 0 2026-07-10 01:30:54 AM Open menu" [ref=e226]:
                    - cell "AUTO-CAT-1783647053642" [ref=e227]
                    - cell "Trim Validation" [ref=e228]
                    - cell "0" [ref=e229]
                    - cell "2026-07-10 01:30:54 AM" [ref=e230]
                    - cell "Open menu" [ref=e231]:
                      - button "Open menu" [ref=e232] [cursor=pointer]:
                        - generic [ref=e233]: Open menu
                        - img [ref=e234]
                  - row "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA Description 0 2026-07-07 04:21:10 PM Open menu" [ref=e238]:
                    - cell "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" [ref=e239]
                    - cell "Description" [ref=e240]
                    - cell "0" [ref=e241]
                    - cell "2026-07-07 04:21:10 PM" [ref=e242]
                    - cell "Open menu" [ref=e243]:
                      - button "Open menu" [ref=e244] [cursor=pointer]:
                        - generic [ref=e245]: Open menu
                        - img [ref=e246]
                  - row "AUTO-CAT-1783441113207 Automation description 1783441113207 0 2026-07-07 04:18:36 PM Open menu" [ref=e250]:
                    - cell "AUTO-CAT-1783441113207" [ref=e251]
                    - cell "Automation description 1783441113207" [ref=e252]
                    - cell "0" [ref=e253]
                    - cell "2026-07-07 04:18:36 PM" [ref=e254]
                    - cell "Open menu" [ref=e255]:
                      - button "Open menu" [ref=e256] [cursor=pointer]:
                        - generic [ref=e257]: Open menu
                        - img [ref=e258]
                  - row "AUTO-CAT-1783441132320 Automation description 1783441132320 0 2026-07-07 04:18:55 PM Open menu" [ref=e262]:
                    - cell "AUTO-CAT-1783441132320" [ref=e263]
                    - cell "Automation description 1783441132320" [ref=e264]
                    - cell "0" [ref=e265]
                    - cell "2026-07-07 04:18:55 PM" [ref=e266]
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
  599 |       category.description
  600 |     );
  601 |   
  602 |     const row =
  603 |       categoriesPage.getRowByName(
  604 |         category.name
  605 |       );
  606 |   
  607 |     await row
  608 |       .getByRole("button", {
  609 |         name: /open menu/i,
  610 |       })
> 611 |       .click();
      |        ^ Error: locator.click: Test timeout of 90000ms exceeded.
  612 |   
  613 |     await expect(
  614 |       categoriesPage.page.getByRole(
  615 |         "menuitem",
  616 |         {
  617 |           name: "Delete",
  618 |         }
  619 |       )
  620 |     ).toBeVisible();
  621 |   });
  622 | 
  623 |   // --------------------------------------------------
  624 |   // Product Integration
  625 |   // --------------------------------------------------
  626 |   
  627 |   test("should increase category quantity after product creation", async ({
  628 |     page,
  629 |   }) => {
  630 |     const category = createCategory();
  631 |   
  632 |     await categoriesPage.createCategory(
  633 |       category.name,
  634 |       category.description
  635 |     );
  636 |   
  637 |     const initialQuantity =
  638 |       await categoriesPage.getQuantity(
  639 |         category.name
  640 |       );
  641 |   
  642 |     await page.goto(
  643 |       `${process.env.PARTNER_URL}/inventory/products`
  644 |     );
  645 |   
  646 |     await page.getByRole("button", {
  647 |       name: "Add Product",
  648 |     }).click();
  649 |   
  650 |     await page.getByRole("button", {
  651 |       name: "Single Product",
  652 |     }).click();
  653 |   
  654 |     const productName =
  655 |       `AUTO-PRODUCT-${Date.now()}`;
  656 |   
  657 |     await page
  658 |       .getByRole("textbox", {
  659 |         name: /Product name/i,
  660 |       })
  661 |       .fill(productName);
  662 |   
  663 |     await page
  664 |       .getByRole("combobox", {
  665 |         name: /Category/i,
  666 |       })
  667 |       .selectOption({
  668 |         label: category.name,
  669 |       });
  670 |   
  671 |     await page
  672 |       .getByRole("spinbutton", {
  673 |         name: /Cost Price/i,
  674 |       })
  675 |       .fill("1000");
  676 |   
  677 |     await page
  678 |       .getByRole("spinbutton", {
  679 |         name: /Selling Price/i,
  680 |       })
  681 |       .fill("1500");
  682 |   
  683 |     await page
  684 |       .getByRole("spinbutton", {
  685 |         name: /Stock Quantity/i,
  686 |       })
  687 |       .fill("20");
  688 |   
  689 |     const createProduct =
  690 |       page.waitForResponse(
  691 |         response =>
  692 |           response.url().includes("/products") &&
  693 |           response.request().method() ===
  694 |             "POST"
  695 |       );
  696 |   
  697 |     await page
  698 |       .getByRole("button", {
  699 |         name: /Add Product/i,
  700 |         exact: true,
  701 |       })
  702 |       .click();
  703 |   
  704 |     const response =
  705 |       await createProduct;
  706 |   
  707 |     expect(
  708 |       response.status()
  709 |     ).toBe(201);
  710 |   
  711 |     await categoriesPage.goto();
```