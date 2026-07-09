# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/categories.spec.ts >> @partners @categories @smoke >> should prevent duplicate category names
- Location: tests/ui/partners/categories.spec.ts:126:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('textbox', { name: 'Search by category name' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('textbox', { name: 'Search by category name' })

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
    - text: AUTO-CAT-1783620360087
  - text: Description (Optional)
  - textbox "Description (Optional)":
    - /placeholder: Enter category description
    - text: Automation description 1783620360087
  - button "Add Category"
```

# Test source

```ts
  41  | 
  42  |   readonly table: Locator;
  43  |   readonly modal: Locator;
  44  |   readonly topCategoryWidget: Locator;
  45  | 
  46  |   constructor(page: Page) {
  47  |     this.page = page;
  48  | 
  49  |     // Navigation
  50  |     this.categoriesLink = page.getByRole("link", {
  51  |       name: "Categories",
  52  |     });
  53  | 
  54  |     // Buttons
  55  |     this.addCategoryButton = page.getByRole("button", {
  56  |       name: "Add Category",
  57  |     });
  58  | 
  59  |     this.submitCategoryButton = page.getByRole("button", {
  60  |       name: "Add Category",
  61  |       exact: true,
  62  |     });
  63  | 
  64  |     this.updateCategoryButton = page.getByRole("button", {
  65  |       name: "Update Category",
  66  |     });
  67  | 
  68  |     this.cancelButton = page.getByRole("button", {
  69  |       name: "Cancel",
  70  |     });
  71  | 
  72  |     this.nextButton = page.getByRole("button", {
  73  |       name: "Next",
  74  |     });
  75  | 
  76  |     this.previousButton = page.getByRole("button", {
  77  |       name: "Previous",
  78  |     });
  79  | 
  80  |     // Inputs
  81  |     this.categoryNameInput = page.getByRole("textbox", {
  82  |       name: "Category Name *",
  83  |     });
  84  | 
  85  |     this.descriptionInput = page.getByRole("textbox", {
  86  |       name: "Description (Optional)",
  87  |     });
  88  | 
  89  |     this.searchInput = page.getByRole("textbox", {
  90  |       name: "Search by category name",
  91  |     });
  92  | 
  93  |     // Containers
  94  |     this.table = page.locator("table");
  95  | 
  96  |     this.modal = page.getByRole("dialog");
  97  | 
  98  |     this.topCategoryWidget = page
  99  |       .locator("div")
  100 |       .filter({
  101 |         hasText: /^Top Category/,
  102 |       })
  103 |       .first();
  104 |   }
  105 | 
  106 |   // ============================================================
  107 |   // Navigation
  108 |   // ============================================================
  109 | 
  110 |   async goto() {
  111 |     this.page.once("popup", async (popup) => {
  112 |       await popup.close();
  113 |     });
  114 | 
  115 |     const categoriesUrl = new URL(
  116 |       "inventory/category",
  117 |       process.env.PARTNER_URL!
  118 |     ).toString();
  119 | 
  120 |     await this.page.goto(categoriesUrl, {
  121 |       waitUntil: "domcontentloaded",
  122 |     });
  123 |     await this.page.waitForURL(/inventory\/category/, { timeout: 15000 });
  124 |     await this.page.waitForLoadState("networkidle", { timeout: 30000 });
  125 |     await this.addCategoryButton.waitFor({ state: "visible", timeout: 30000 });
  126 |     await this.searchInput.waitFor({ state: "visible", timeout: 30000 });
  127 |     await this.table.waitFor({ state: "visible", timeout: 30000 });
  128 |   }
  129 | 
  130 |   async waitForPageLoad() {
  131 |     await expect(this.page).toHaveURL(
  132 |       /inventory\/category/
  133 |     );
  134 | 
  135 |     await expect(
  136 |       this.addCategoryButton
  137 |     ).toBeVisible();
  138 | 
  139 |     await expect(
  140 |       this.searchInput
> 141 |     ).toBeVisible();
      |       ^ Error: expect(locator).toBeVisible() failed
  142 | 
  143 |     await expect(
  144 |       this.table
  145 |     ).toBeVisible();
  146 |   }
  147 | 
  148 |   // ============================================================
  149 |   // Category CRUD
  150 |   // ============================================================
  151 | 
  152 |   async createCategory(
  153 |     name: string,
  154 |     description = ""
  155 |   ): Promise<Response> {
  156 |     await this.openCreateModal();
  157 | 
  158 |     await this.categoryNameInput.fill(
  159 |       name
  160 |     );
  161 | 
  162 |     if (description) {
  163 |       await this.descriptionInput.fill(
  164 |         description
  165 |       );
  166 |     }
  167 | 
  168 |     const [response] =
  169 |       await Promise.all([
  170 |         this.page.waitForResponse(
  171 |           (response) =>
  172 |             response.url().includes(
  173 |               "/categories"
  174 |             ) &&
  175 |             response.request().method() ===
  176 |               "POST"
  177 |         ),
  178 | 
  179 |         this.submitCategoryButton.click(),
  180 |       ]);
  181 | 
  182 |     await this.waitForPageLoad();
  183 | 
  184 |     return response;
  185 |   }
  186 | 
  187 |   async editCategory(
  188 |     categoryName: string,
  189 |     description: string
  190 |   ): Promise<Response> {
  191 |     await this.openActionsMenu(
  192 |       categoryName
  193 |     );
  194 | 
  195 |     await this.page
  196 |       .getByRole("menuitem", {
  197 |         name: "Edit",
  198 |       })
  199 |       .click();
  200 | 
  201 |     await expect(
  202 |       this.categoryNameInput
  203 |     ).toBeVisible();
  204 | 
  205 |     await this.descriptionInput.fill(
  206 |       description
  207 |     );
  208 | 
  209 |     const [response] =
  210 |       await Promise.all([
  211 |         this.page.waitForResponse(
  212 |           (response) =>
  213 |             response.url().includes(
  214 |               "/categories"
  215 |             ) &&
  216 |             [
  217 |               "PUT",
  218 |               "PATCH",
  219 |             ].includes(
  220 |               response.request().method()
  221 |             )
  222 |         ),
  223 | 
  224 |         this.updateCategoryButton.click(),
  225 |       ]);
  226 | 
  227 |     return response;
  228 |   }
  229 | 
  230 |   async deleteCategory(
  231 |     categoryName: string
  232 |   ): Promise<void> {
  233 |     await this.openActionsMenu(
  234 |       categoryName
  235 |     );
  236 | 
  237 |     await this.page
  238 |       .getByRole("menuitem", {
  239 |         name: "Delete",
  240 |       })
  241 |       .click();
```