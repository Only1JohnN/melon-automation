# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/categories.spec.ts >> @partners @categories @smoke >> should keep newest category at the top after creation
- Location: tests/ui/partners/categories.spec.ts:938:7

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('table').locator('tbody tr').first()
Expected substring: "AUTO-CAT-1783648310667"
Received string:    "   AUTO-CAT-1783441233025   Trim Validation13 2026-07-07 04:20:35 PMOpen menu"
Timeout: 5000ms

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('table').locator('tbody tr').first()
    14 × locator resolved to <tr class="border-b transition-colors hover:bg-mountainAsh-10 data-[state=selected]:bg-gray-100 dark:hover:bg-gray-800/50 dark:data-[state=selected]:bg-gray-800 items-start">…</tr>
       - unexpected value "   AUTO-CAT-1783441233025   Trim Validation13 2026-07-07 04:20:35 PMOpen menu"

```

```yaml
- row "AUTO-CAT-1783441233025 Trim Validation 13 2026-07-07 04:20:35 PM Open menu":
  - cell "AUTO-CAT-1783441233025"
  - cell "Trim Validation"
  - cell "13"
  - cell "2026-07-07 04:20:35 PM"
  - cell "Open menu":
    - button "Open menu":
      - text: Open menu
      - img
```

# Test source

```ts
  854  |             }
  855  |           )
  856  |           .click(),
  857  |       ]);
  858  |     }
  859  |   
  860  |     await categoriesPage.goto();
  861  |   
  862  |     const quantity =
  863  |       await categoriesPage.getQuantity(
  864  |         category.name
  865  |       );
  866  |   
  867  |     expect(
  868  |       quantity
  869  |     ).toBeGreaterThanOrEqual(
  870  |       2
  871  |     );
  872  |   });
  873  |   
  874  |   // --------------------------------------------------
  875  |   // Top Category Widget
  876  |   // --------------------------------------------------
  877  |   
  878  |   test("should display category with highest quantity as Top Category", async ({
  879  |     page,
  880  |   }) => {
  881  |     const category =
  882  |       createCategory();
  883  |   
  884  |     await categoriesPage.createCategory(
  885  |       category.name,
  886  |       category.description
  887  |     );
  888  |   
  889  |     // create several products here
  890  |     // (reuse your ProductPage helper instead)
  891  |   
  892  |     await categoriesPage.goto();
  893  |   
  894  |     const top =
  895  |       await categoriesPage.getTopCategoryInfo();
  896  |   
  897  |     expect(top.name).toBe(
  898  |       category.name
  899  |     );
  900  |   
  901  |     expect(
  902  |       top.quantity
  903  |     ).toBeGreaterThan(0);
  904  |   });
  905  |   
  906  |   // --------------------------------------------------
  907  |   // Date Validation
  908  |   // --------------------------------------------------
  909  |   
  910  |   test("should display today's creation date", async () => {
  911  |     const category =
  912  |       createCategory();
  913  |   
  914  |     await categoriesPage.createCategory(
  915  |       category.name,
  916  |       category.description
  917  |     );
  918  |   
  919  |     const row =
  920  |       await categoriesPage.getRowData(
  921  |         category.name
  922  |       );
  923  |   
  924  |     const today =
  925  |       new Date()
  926  |         .toISOString()
  927  |         .split("T")[0];
  928  |   
  929  |     expect(
  930  |       row.createdAt
  931  |     ).toContain(today);
  932  |   });
  933  |   
  934  |   // --------------------------------------------------
  935  |   // Sorting
  936  |   // --------------------------------------------------
  937  |   
  938  |   test("should keep newest category at the top after creation", async () => {
  939  |     const category =
  940  |       createCategory();
  941  |   
  942  |     await categoriesPage.createCategory(
  943  |       category.name,
  944  |       category.description
  945  |     );
  946  |   
  947  |     const firstRow =
  948  |       categoriesPage.table
  949  |         .locator("tbody tr")
  950  |         .first();
  951  |   
  952  |     await expect(
  953  |       firstRow
> 954  |     ).toContainText(
       |       ^ Error: expect(locator).toContainText(expected) failed
  955  |       category.name
  956  |     );
  957  |   });
  958  |   
  959  |   // --------------------------------------------------
  960  |   // Refresh Persistence
  961  |   // --------------------------------------------------
  962  |   
  963  |   test("should persist created category after page refresh", async () => {
  964  |     const category =
  965  |       createCategory();
  966  |   
  967  |     await categoriesPage.createCategory(
  968  |       category.name,
  969  |       category.description
  970  |     );
  971  |   
  972  |     await categoriesPage.page.reload();
  973  |   
  974  |     await categoriesPage.waitForPageLoad();
  975  |   
  976  |     await expect(
  977  |       categoriesPage.getRowByName(
  978  |         category.name
  979  |       )
  980  |     ).toBeVisible();
  981  |   });
  982  |   
  983  |   // --------------------------------------------------
  984  |   // Search Persistence
  985  |   // --------------------------------------------------
  986  |   
  987  |   test("should clear search and restore full category list", async () => {
  988  |     const category =
  989  |       createCategory();
  990  |   
  991  |     await categoriesPage.createCategory(
  992  |       category.name,
  993  |       category.description
  994  |     );
  995  |   
  996  |     await categoriesPage.search(
  997  |       category.name
  998  |     );
  999  |   
  1000 |     await expect(
  1001 |       categoriesPage.getRowByName(
  1002 |         category.name
  1003 |       )
  1004 |     ).toBeVisible();
  1005 |   
  1006 |     await categoriesPage.searchInput.clear();
  1007 |   
  1008 |     await categoriesPage.searchInput.press(
  1009 |       "Enter"
  1010 |     );
  1011 |   
  1012 |     await expect(
  1013 |       categoriesPage.table
  1014 |         .locator("tbody tr")
  1015 |         .first()
  1016 |     ).toBeVisible();
  1017 |   });
  1018 |   
  1019 |   // --------------------------------------------------
  1020 |   // Regression
  1021 |   // --------------------------------------------------
  1022 |   
  1023 |   test("should not duplicate category after browser refresh", async () => {
  1024 |     const category =
  1025 |       createCategory();
  1026 |   
  1027 |     await categoriesPage.createCategory(
  1028 |       category.name,
  1029 |       category.description
  1030 |     );
  1031 |   
  1032 |     await categoriesPage.page.reload();
  1033 |   
  1034 |     const rows =
  1035 |       categoriesPage
  1036 |         .getRowByName(
  1037 |           category.name
  1038 |         );
  1039 |   
  1040 |     await expect(rows)
  1041 |       .toHaveCount(1);
  1042 |   });
  1043 |   
  1044 |   test("should retain updated description after refresh", async () => {
  1045 |     const category =
  1046 |       createCategory();
  1047 |   
  1048 |     await categoriesPage.createCategory(
  1049 |       category.name,
  1050 |       category.description
  1051 |     );
  1052 |   
  1053 |     const updated =
  1054 |       `Updated-${Date.now()}`;
```