# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/categories.spec.ts >> @partners @categories @smoke >> should clear search and restore full category list
- Location: tests/ui/partners/categories.spec.ts:987:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('table').locator('tr:has-text("AUTO-CAT-1783621939128")')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('table').locator('tr:has-text("AUTO-CAT-1783621939128")')

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
  - textbox "Search by category name": AUTO-CAT-1783621939128
  - table:
    - rowgroup:
      - row "Category Name Description Quantity of items Date & Time":
        - columnheader "Category Name"
        - columnheader "Description"
        - columnheader "Quantity of items"
        - columnheader "Date & Time"
        - columnheader
    - rowgroup:
      - row "AUTO-CAT-1783441233025 Trim Validation 10 2026-07-07 04:20:35 PM Open menu":
        - cell "AUTO-CAT-1783441233025"
        - cell "Trim Validation"
        - cell "10"
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
      - row "AUTO-CAT-1783441136340 Automation description 1783441136340 0 2026-07-07 04:18:59 PM Open menu":
        - cell "AUTO-CAT-1783441136340"
        - cell "Automation description 1783441136340"
        - cell "0"
        - cell "2026-07-07 04:18:59 PM"
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
  954  |     ).toContainText(
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
> 1004 |     ).toBeVisible();
       |       ^ Error: expect(locator).toBeVisible() failed
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
  1055 |   
  1056 |     await categoriesPage.editCategory(
  1057 |       category.name,
  1058 |       updated
  1059 |     );
  1060 |   
  1061 |     await categoriesPage.page.reload();
  1062 |   
  1063 |     const row =
  1064 |       await categoriesPage.getRowData(
  1065 |         category.name
  1066 |       );
  1067 |   
  1068 |     expect(
  1069 |       row.description
  1070 |     ).toContain(updated);
  1071 |   });
  1072 |   
  1073 |   // --------------------------------------------------
  1074 |   // API Integrity
  1075 |   // --------------------------------------------------
  1076 |   
  1077 |   test("should return correct payload after category creation", async () => {
  1078 |     const category =
  1079 |       createCategory();
  1080 |   
  1081 |     const response =
  1082 |       await categoriesPage.createCategory(
  1083 |         category.name,
  1084 |         category.description
  1085 |       );
  1086 |   
  1087 |     const body =
  1088 |       await response.json();
  1089 |   
  1090 |     expect(body.status).toBe(
  1091 |       "success"
  1092 |     );
  1093 |   
  1094 |     expect(
  1095 |       body.data.id
  1096 |     ).toBeDefined();
  1097 |   
  1098 |     expect(
  1099 |       body.data.name
  1100 |     ).toBe(category.name);
  1101 |   
  1102 |     expect(
  1103 |       body.data.description
  1104 |     ).toBe(
```