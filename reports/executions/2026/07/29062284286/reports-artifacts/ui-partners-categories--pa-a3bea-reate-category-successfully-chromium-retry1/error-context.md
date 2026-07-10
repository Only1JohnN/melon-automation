# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/categories.spec.ts >> @partners @categories @smoke >> should create category successfully
- Location: tests/ui/partners/categories.spec.ts:43:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('table').locator('tr:has-text("AUTO-CAT-1783646810317")')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('table').locator('tr:has-text("AUTO-CAT-1783646810317")')

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
  1   | import { test, expect, loginAsPartner } from "@fixtures/baseTest";
  2   | import { CategoriesPage } from "@pages/partners/CategoriesPage";
  3   | import { createCategory } from "@test-data/factories/categoryFactory";
  4   | 
  5   | test.use({ storageState: 'playwright/.auth/partner.json' });
  6   | 
  7   | test.describe("@partners @categories @smoke", () => {
  8   |   let categoriesPage: CategoriesPage;
  9   | 
  10  |   test.beforeEach(async ({ page }) => {
  11  |     // await loginAsPartner(page);
  12  | 
  13  |     categoriesPage = new CategoriesPage(page);
  14  |     await categoriesPage.goto();
  15  |   });
  16  | 
  17  |   // --------------------------------------------------
  18  |   // Navigation
  19  |   // --------------------------------------------------
  20  | 
  21  |   test("should navigate to Categories page successfully", async ({
  22  |     page,
  23  |   }) => {
  24  |     await expect(page).toHaveURL(/inventory\/category/);
  25  | 
  26  |     await expect(
  27  |       categoriesPage.addCategoryButton
  28  |     ).toBeVisible();
  29  | 
  30  |     await expect(
  31  |       categoriesPage.searchInput
  32  |     ).toBeVisible();
  33  | 
  34  |     await expect(
  35  |       categoriesPage.table
  36  |     ).toBeVisible();
  37  |   });
  38  | 
  39  |   // --------------------------------------------------
  40  |   // Create Category
  41  |   // --------------------------------------------------
  42  | 
  43  |   test("should create category successfully", async () => {
  44  |     const category = createCategory();
  45  | 
  46  |     const response =
  47  |       await categoriesPage.createCategory(
  48  |         category.name,
  49  |         category.description
  50  |       );
  51  | 
  52  |     expect(response.status()).toBe(201);
  53  | 
  54  |     const body = await response.json();
  55  | 
  56  |     expect(body.status).toBe("success");
  57  | 
  58  |     const row =
  59  |       categoriesPage.getRowByName(
  60  |         category.name
  61  |       );
  62  | 
> 63  |     await expect(row).toBeVisible();
      |                       ^ Error: expect(locator).toBeVisible() failed
  64  | 
  65  |     const rowData =
  66  |       await categoriesPage.getRowData(
  67  |         category.name
  68  |       );
  69  | 
  70  |     expect(
  71  |       rowData.description
  72  |     ).toContain(
  73  |       category.description!
  74  |     );
  75  | 
  76  |     expect(
  77  |       rowData.quantity
  78  |     ).toBe(0);
  79  | 
  80  |     expect(
  81  |       rowData.createdAt
  82  |     ).toContain(
  83  |       new Date()
  84  |         .toISOString()
  85  |         .split("T")[0]
  86  |     );
  87  |   });
  88  | 
  89  |   // --------------------------------------------------
  90  |   // API Validation
  91  |   // --------------------------------------------------
  92  | 
  93  |   test("should create category successfully via API", async () => {
  94  |     const category = createCategory();
  95  | 
  96  |     const response =
  97  |       await categoriesPage.createCategory(
  98  |         category.name,
  99  |         category.description
  100 |       );
  101 | 
  102 |     expect(response.status()).toBe(201);
  103 | 
  104 |     const body =
  105 |       await response.json();
  106 | 
  107 |     expect(body.status).toBe("success");
  108 | 
  109 |     expect(
  110 |       body.data.name
  111 |     ).toBe(category.name);
  112 | 
  113 |     expect(
  114 |       body.data.description
  115 |     ).toBe(category.description);
  116 | 
  117 |     expect(
  118 |       body.data
  119 |     ).toHaveProperty("id");
  120 |   });
  121 | 
  122 |   // --------------------------------------------------
  123 |   // Duplicate Validation
  124 |   // --------------------------------------------------
  125 | 
  126 |   test("should prevent duplicate category names", async () => {
  127 |     const category =
  128 |       createCategory();
  129 | 
  130 |     await categoriesPage.createCategory(
  131 |       category.name,
  132 |       category.description
  133 |     );
  134 | 
  135 |     const response =
  136 |       await categoriesPage.createCategory(
  137 |         category.name,
  138 |         category.description
  139 |       );
  140 | 
  141 |     expect(
  142 |       response.status()
  143 |     ).toBeGreaterThanOrEqual(400);
  144 | 
  145 |     const body =
  146 |       await response.json();
  147 | 
  148 |     expect(
  149 |       body.message
  150 |     ).toMatch(
  151 |       "Category with this name already exists"
  152 |     );
  153 | 
  154 |     await categoriesPage.validateErrorToast();
  155 |   });
  156 | 
  157 |   // --------------------------------------------------
  158 |   // Edit Category
  159 |   // --------------------------------------------------
  160 | 
  161 |   test("should edit category description successfully", async () => {
  162 |     const category =
  163 |       createCategory();
```