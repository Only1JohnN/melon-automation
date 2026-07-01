# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/products/product.spec.ts >> @partners @products @single-product @without-variant >> should prevent product name exceeding maximum length
- Location: tests/ui/partners/products/product.spec.ts:205:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/maximum/i)
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText(/maximum/i)

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
    - /url: /inventory/products/new
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
    - /url: /inventory/products/new
    - img
  - button "M"
- button:
  - img
- button "M Q"
- main:
  - navigation
  - main:
    - button:
      - img
    - heading "Add Product" [level=1]
    - paragraph: Add what you are selling to your inventory for customers to see both online and physically
    - button "Preview"
    - button "Add Product"
    - paragraph: Product Details
    - text: Product name*
    - textbox "Product name*":
      - /placeholder: Enter the name of your product
      - text: AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    - text: Product description (Optional)
    - combobox:
      - img
      - text: Paragraph
    - button "Undo" [disabled]:
      - img
    - button "Redo" [disabled]:
      - img
    - button "Format Bold":
      - img
    - button "Format Italics":
      - img
    - button "Format Underline":
      - img
    - button "Format Strikethrough":
      - img
    - button "Left Align":
      - img
    - button "Center Align":
      - img
    - button "Right Align":
      - img
    - button "Justify Align":
      - img
    - button "Insert Image":
      - img
    - textbox:
      - paragraph
    - text: Category
    - combobox "Category":
      - text: Fashion
      - img
    - paragraph: Pricing & Profit
    - text: Selling Price
    - textbox "Selling Price":
      - /placeholder: Enter the price
      - text: ₦6,223
    - paragraph: VAT will be added to prices when product is saved so that you can view it in the preview as well.
    - button "Promo Price (Optional)":
      - text: Promo Price (Optional)
      - img
    - textbox "Promo Price (Optional)":
      - /placeholder: Enter promo price
      - text: ₦5,753
    - text: Cost Price
    - textbox "Cost Price":
      - /placeholder: Enter the cost price
      - text: ₦4,892
    - text: Profit
    - textbox "Profit": ₦861
    - text: Margin (%)
    - textbox "Margin": "14.97"
    - button "Charge Taxes":
      - text: Charge Taxes
      - img
    - textbox "Charge Taxes" [disabled]: VAT INCLUSIVE
    - paragraph: Product Inventory
    - text: Stock Quantity
    - spinbutton "Stock Quantity": "10"
    - checkbox "Enable Low Stock Alert"
    - text: Enable Low Stock Alert SKU
    - textbox "SKU" [disabled]:
      - /placeholder: Enter Product SKU
      - text: 52EAMR1W59SN000
    - text: Does this product have variations like sizes and colours?
    - radiogroup:
      - radio "No, it doesn't" [checked]:
        - img
      - img
      - text: No, it doesn't
      - radio "Yes it has"
      - text: Yes it has
    - paragraph: Product Allocation
    - text: Select product location
    - combobox "Select product location": Select a branch
    - text: Assign Quantity No products assigned
    - img
    - button "Select more locations":
      - img
      - text: Select more locations
    - button "Add Product Image Click to upload image":
      - img
      - paragraph: Add Product Image
      - paragraph: Click to upload image
- region "Notifications Alt+T"
- region "Notifications alt+T"
```

# Test source

```ts
  114 |     await productPage.enableLowStockAlert(15);
  115 | 
  116 |     await expect(page.getByText('Low stock threshold can\'t be higher than stock quantity')).toBeVisible();
  117 |   });
  118 | 
  119 |   test('should prevent low stock threshold greater than stock quantity (case 2)', async ({ page }) => {
  120 |     const productPage = new ProductPage(page);
  121 |     const product = createSimpleProduct();
  122 |     product.stockQuantity = 5;
  123 | 
  124 |     await productPage.goto();
  125 |     await productPage.startSingleProduct();
  126 |     await productPage.fillProductDetails(product);
  127 |     await productPage.enableLowStockAlert(10);
  128 | 
  129 |     await expect(page.getByText('Low stock threshold can\'t be higher than stock quantity')).toBeVisible();
  130 |   });
  131 | 
  132 |   test('should validate threshold equal to stock quantity', async ({ page }) => {
  133 |     const productPage = new ProductPage(page);
  134 |     const product = createSimpleProduct();
  135 |     product.stockQuantity = 10;
  136 | 
  137 |     await productPage.goto();
  138 |     await productPage.startSingleProduct();
  139 |     await productPage.fillProductDetails(product);
  140 |     await productPage.enableLowStockAlert(10);
  141 | 
  142 |     await expect(page.getByText('Low stock threshold can\'t be equal to stock quantity')).toBeVisible();
  143 |   });
  144 | 
  145 |   test('should prevent stock quantity of zero', async ({ page }) => {
  146 |     const productPage = new ProductPage(page);
  147 |     const product = createSimpleProduct();
  148 |     product.stockQuantity = 0;
  149 | 
  150 |     await productPage.goto();
  151 |     await productPage.startSingleProduct();
  152 |     await productPage.fillProductDetails(product);
  153 |     await productPage.submitProduct();
  154 | 
  155 |     await expect(page.getByText('Stock quantity must be at')).toBeVisible();
  156 |   });
  157 | 
  158 |   test('should prevent negative stock quantity', async ({ page }) => {
  159 |     const productPage = new ProductPage(page);
  160 | 
  161 |     await productPage.goto();
  162 |     await productPage.startSingleProduct();
  163 |     await productPage.stockQuantity.fill('-10');
  164 |     await productPage.submitProduct();
  165 | 
  166 |     const message = await productPage.stockQuantity.evaluate(
  167 |       (el: HTMLInputElement) => {
  168 |         el.reportValidity();          // triggers validation
  169 |         return el.validationMessage;
  170 |       }
  171 |     );
  172 |     console.log('Validation message:', JSON.stringify(message));
  173 | 
  174 |     expect(message).toContain('greater than or equal to 0');
  175 |   });
  176 | 
  177 |   // ─────────────────────────────────────────────
  178 |   //  Field requirement & length validations
  179 |   // ─────────────────────────────────────────────
  180 |   test('should require product name when creating a single product without variant', async ({ page }) => {
  181 |     const productPage = new ProductPage(page);
  182 |     const product = createSimpleProduct();
  183 |     product.name = '';
  184 | 
  185 |     await productPage.goto();
  186 |     await productPage.startSingleProduct();
  187 |     await productPage.fillProductDetails(product);
  188 |     await productPage.submitProduct();
  189 | 
  190 |     await expect(page.getByText('Product name is required')).toBeVisible();
  191 |   });
  192 | 
  193 |   test('should require category', async ({ page }) => {
  194 |     const productPage = new ProductPage(page);
  195 |     const product = createSimpleProduct();
  196 | 
  197 |     await productPage.goto();
  198 |     await productPage.startSingleProduct();
  199 |     await productPage.fillProductDetailsWithoutCategory(product);
  200 |     await productPage.submitProduct();
  201 | 
  202 |     await expect(page.getByText('Product category is required')).toBeVisible();
  203 |   });
  204 | 
  205 |   test('should prevent product name exceeding maximum length', async ({ page }) => {
  206 |     const productPage = new ProductPage(page);
  207 |     const product = createSimpleProduct();
  208 |     product.name = 'A'.repeat(256);
  209 | 
  210 |     await productPage.goto();
  211 |     await productPage.startSingleProduct();
  212 |     await productPage.fillProductDetails(product);
  213 | 
> 214 |     await expect(page.getByText(/maximum/i)).toBeVisible();
      |                                              ^ Error: expect(locator).toBeVisible() failed
  215 |   });
  216 | 
  217 |   test('should trim leading and trailing spaces from product name', async ({ page }) => {
  218 |     const productPage = new ProductPage(page);
  219 |     const product = createSimpleProduct();
  220 |     product.name = '    Test Product    ';
  221 | 
  222 |     await productPage.createSingleProductWithoutVariant(product);
  223 |     await productPage.verifyProductInPendingApproval('Test Product');
  224 |   });
  225 | 
  226 |   test('should prevent description exceeding maximum length', async ({ page }) => {
  227 |     const productPage = new ProductPage(page);
  228 |     const description = 'A'.repeat(5001);
  229 | 
  230 |     await productPage.goto();
  231 |     await productPage.startSingleProduct();
  232 |     await productPage.description.fill(description);
  233 | 
  234 |     await expect(page.getByText(/maximum/i)).toBeVisible();
  235 |   });
  236 | 
  237 |   // ─────────────────────────────────────────────
  238 |   //  Numeric‑only & negative value checks
  239 |   // ─────────────────────────────────────────────
  240 |   test('should prevent non numeric values in cost price', async ({ page }) => {
  241 |     const productPage = new ProductPage(page);
  242 | 
  243 |     await productPage.goto();
  244 |     await productPage.startSingleProduct();
  245 |     await productPage.costPrice.fill('abc');
  246 | 
  247 |     await expect(productPage.costPrice).toHaveValue('');
  248 |   });
  249 | 
  250 |   test('should prevent non numeric values in selling price', async ({ page }) => {
  251 |     const productPage = new ProductPage(page);
  252 | 
  253 |     await productPage.goto();
  254 |     await productPage.startSingleProduct();
  255 |     await productPage.sellingPrice.fill('abc');
  256 | 
  257 |     await expect(productPage.sellingPrice).toHaveValue('');
  258 |   });
  259 | 
  260 |   test('should prevent non numeric values in promo price', async ({ page }) => {
  261 |     const productPage = new ProductPage(page);
  262 | 
  263 |     await productPage.goto();
  264 |     await productPage.startSingleProduct();
  265 |     await productPage.promoPrice.fill('abc');
  266 | 
  267 |     await expect(productPage.promoPrice).toHaveValue('');
  268 |   });
  269 | 
  270 |   test('should prevent negative cost price', async ({ page }) => {
  271 |     const productPage = new ProductPage(page);
  272 | 
  273 |     await productPage.goto();
  274 |     await productPage.startSingleProduct();
  275 | 
  276 |     await productPage.costPrice.fill('-100');
  277 | 
  278 |     await expect(productPage.costPrice).not.toHaveValue(/-/);
  279 |   });
  280 | 
  281 |   test('should prevent negative selling price', async ({ page }) => {
  282 |     const productPage = new ProductPage(page);
  283 | 
  284 |     await productPage.goto();
  285 |     await productPage.startSingleProduct();
  286 | 
  287 |     await productPage.sellingPrice.fill('-100');
  288 | 
  289 |     await expect(productPage.sellingPrice).not.toHaveValue(/-/);
  290 |   });
  291 | 
  292 |   test('should prevent negative promo price', async ({ page }) => {
  293 |     const productPage = new ProductPage(page);
  294 | 
  295 |     await productPage.goto();
  296 |     await productPage.startSingleProduct();
  297 | 
  298 |     await productPage.promoPrice.fill('-100');
  299 | 
  300 |     await expect(productPage.promoPrice).not.toHaveValue(/-/);
  301 |   });
  302 | 
  303 |   // ─────────────────────────────────────────────
  304 |   //  Image handling
  305 |   // ─────────────────────────────────────────────
  306 |   test('should enforce maximum of five images', async ({ page }) => {
  307 |     const productPage = new ProductPage(page);
  308 | 
  309 |     await productPage.goto();
  310 |     await productPage.startSingleProduct();
  311 | 
  312 |     for (let i = 0; i < 5; i++) {
  313 |       await productPage.uploadImage();
  314 |     }
```