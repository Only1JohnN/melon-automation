# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/products/product.spec.ts >> @partners @products @single-product @without-variant >> should prevent low stock threshold greater than stock quantity (case 1)
- Location: tests/ui/partners/products/product.spec.ts:106:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Low stock threshold can\'t be higher than stock quantity')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Low stock threshold can\'t be higher than stock quantity')

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
    - /url: /settings/profile
    - img
  - link:
    - /url: /inventory/products/new
    - img
  - button "M"
- button "9+":
  - img
  - text: 9+
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
      - text: QA Single Product 1782516541397
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
      - text: ₦3,861
    - paragraph: VAT will be added to prices when product is saved so that you can view it in the preview as well.
    - button "Promo Price (Optional)":
      - text: Promo Price (Optional)
      - img
    - textbox "Promo Price (Optional)":
      - /placeholder: Enter promo price
      - text: ₦2,461
    - text: Cost Price
    - textbox "Cost Price":
      - /placeholder: Enter the cost price
      - text: ₦2,049
    - text: Profit
    - textbox "Profit": ₦412
    - text: Margin (%)
    - textbox "Margin": "16.74"
    - button "Charge Taxes":
      - text: Charge Taxes
      - img
    - textbox "Charge Taxes" [disabled]: VAT INCLUSIVE
    - paragraph: Product Inventory
    - text: Stock Quantity
    - spinbutton "Stock Quantity": "10"
    - checkbox "Enable Low Stock Alert" [checked]
    - text: Enable Low Stock Alert Low Stock Threshold
    - spinbutton "Low Stock Threshold": "15"
    - text: SKU
    - textbox "SKU" [disabled]:
      - /placeholder: Enter Product SKU
      - text: 52EAMQVKBT9S000
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
  16  |     await productPage.fillProductDetails(product);
  17  |   });
  18  | 
  19  |   test('should create a single product without variant successfully (full journey)', async ({ page }) => {
  20  |     const loginPage = new LoginPage(page);
  21  |     const productPage = new ProductPage(page);
  22  |     const product = createSimpleProduct();
  23  | 
  24  |     await loginPage.login(process.env.PARTNER_EMAIL!, process.env.PARTNER_PASSWORD!);
  25  | 
  26  |     await productPage.goto();
  27  |     await productPage.startSingleProduct();
  28  |     await productPage.fillProductDetails(product);
  29  |     await productPage.enableLowStockAlert(10);
  30  |     await productPage.validateMarginReadonly();
  31  |     await productPage.validateSkuGenerated();
  32  |     await productPage.validateNoVariantSelected();
  33  |     await productPage.uploadImage();
  34  |     await productPage.assignLocationToBranch('https://melon-qa-bot.getmelon.shop', 5);
  35  |     await productPage.validateLocationAssigned(5);
  36  |     await productPage.previewProduct();
  37  |     await productPage.submitProduct();
  38  |     await productPage.goToProducts();
  39  |     await productPage.verifyProductInPendingApproval(product.name);
  40  |   });
  41  | 
  42  |   // ─────────────────────────────────────────────
  43  |   //  Price validations
  44  |   // ─────────────────────────────────────────────
  45  |   test('should prevent selling price less than cost price (case 1)', async ({ page }) => {
  46  |     const productPage = new ProductPage(page);
  47  |     const product = createSimpleProduct();
  48  |     product.costPrice = 1000;
  49  |     product.sellingPrice = 500;
  50  |     product.promoPrice = 0;
  51  | 
  52  |     await productPage.goto();
  53  |     await productPage.startSingleProduct();
  54  |     await productPage.fillProductDetails(product);
  55  | 
  56  |     await expect(page.getByText('Cost price is greater than')).toBeVisible();
  57  |   });
  58  | 
  59  |   test('should prevent promo price greater than selling price (case 1)', async ({ page }) => {
  60  |     const productPage = new ProductPage(page);
  61  |     const product = createSimpleProduct();
  62  |     product.costPrice = 1000;
  63  |     product.sellingPrice = 1500;
  64  |     product.promoPrice = 2000;
  65  | 
  66  |     await productPage.goto();
  67  |     await productPage.startSingleProduct();
  68  |     await productPage.fillProductDetails(product);
  69  |     await productPage.submitProduct();
  70  | 
  71  |     await expect(page.getByText('The promo price must be less')).toBeVisible();
  72  |   });
  73  | 
  74  |   test('should prevent selling price less than cost price (case 2)', async ({ page }) => {
  75  |     const productPage = new ProductPage(page);
  76  |     const product = createSimpleProduct();
  77  |     product.costPrice = 2000;
  78  |     product.sellingPrice = 1000;
  79  |     product.promoPrice = 0;
  80  | 
  81  |     await productPage.goto();
  82  |     await productPage.startSingleProduct();
  83  |     await productPage.fillProductDetails(product);
  84  | 
  85  |     await expect(page.getByText('Cost price is greater than')).toBeVisible();
  86  |   });
  87  | 
  88  |   test('should prevent promo price greater than selling price (case 2)', async ({ page }) => {
  89  |     const productPage = new ProductPage(page);
  90  |     const product = createSimpleProduct();
  91  |     product.costPrice = 1000;
  92  |     product.sellingPrice = 2000;
  93  |     product.promoPrice = 2500;
  94  | 
  95  |     await productPage.goto();
  96  |     await productPage.startSingleProduct();
  97  |     await productPage.fillProductDetails(product);
  98  |     await productPage.submitProduct();
  99  | 
  100 |     await expect(page.getByText('The promo price must be less')).toBeVisible();
  101 |   });
  102 | 
  103 |   // ─────────────────────────────────────────────
  104 |   //  Stock & threshold validations
  105 |   // ─────────────────────────────────────────────
  106 |   test('should prevent low stock threshold greater than stock quantity (case 1)', async ({ page }) => {
  107 |     const productPage = new ProductPage(page);
  108 |     const product = createSimpleProduct();
  109 |     product.stockQuantity = 10;
  110 | 
  111 |     await productPage.goto();
  112 |     await productPage.startSingleProduct();
  113 |     await productPage.fillProductDetails(product);
  114 |     await productPage.enableLowStockAlert(15);
  115 | 
> 116 |     await expect(page.getByText('Low stock threshold can\'t be higher than stock quantity')).toBeVisible();
      |                                                                                              ^ Error: expect(locator).toBeVisible() failed
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
  214 |     await expect(page.getByText(/maximum/i)).toBeVisible();
  215 |   });
  216 | 
```