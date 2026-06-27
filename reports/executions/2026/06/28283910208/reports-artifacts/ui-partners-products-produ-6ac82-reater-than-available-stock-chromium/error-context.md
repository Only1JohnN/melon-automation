# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/products/product.spec.ts >> @partners @products @single-product @without-variant >> should prevent assigning quantity greater than available stock
- Location: tests/ui/partners/products/product.spec.ts:358:7

# Error details

```
Error: expect(locator).toHaveValue(expected) failed

Locator: getByPlaceholder(/Enter quantity/)
Expected: "5"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveValue" with timeout 5000ms
  - waiting for getByPlaceholder(/Enter quantity/)

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
      - text: QA Single Product 1782549891068
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
      - text: ₦4,478
    - paragraph: VAT will be added to prices when product is saved so that you can view it in the preview as well.
    - button "Promo Price (Optional)":
      - text: Promo Price (Optional)
      - img
    - textbox "Promo Price (Optional)":
      - /placeholder: Enter promo price
      - text: ₦4,046
    - text: Cost Price
    - textbox "Cost Price":
      - /placeholder: Enter the cost price
      - text: ₦3,469
    - text: Profit
    - textbox "Profit": ₦577
    - text: Margin (%)
    - textbox "Margin": "14.26"
    - button "Charge Taxes":
      - text: Charge Taxes
      - img
    - textbox "Charge Taxes" [disabled]: VAT INCLUSIVE
    - paragraph: Product Inventory
    - text: Stock Quantity
    - spinbutton "Stock Quantity": "5"
    - checkbox "Enable Low Stock Alert"
    - text: Enable Low Stock Alert SKU
    - textbox "SKU" [disabled]:
      - /placeholder: Enter Product SKU
      - text: 52EAMQW46MDE000
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
    - text: Assign Quantity QA Single Produ... (5)
    - button:
      - img
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
  315 |     // attempt sixth
  316 |     await productPage.uploadImage();
  317 | 
  318 |     await expect(productPage.addImageButton).not.toBeVisible();
  319 |   });
  320 | 
  321 |   test('should remove uploaded image successfully', async ({ page }) => {
  322 |     const productPage = new ProductPage(page);
  323 | 
  324 |     await productPage.goto();
  325 |     await productPage.startSingleProduct();
  326 |     await productPage.uploadImage();
  327 |     await productPage.removeUploadedImage();
  328 | 
  329 |     await expect(page.locator('img')).toHaveCount(0);
  330 |   });
  331 | 
  332 |   test('should prevent invalid image url upload', async ({ page }) => {
  333 |     const productPage = new ProductPage(page);
  334 | 
  335 |     await productPage.goto();
  336 |     await productPage.startSingleProduct();
  337 |     await productPage.addImageByUrl('invalid-url');
  338 | 
  339 |     await expect(page.getByText('Please enter a valid image')).toBeVisible();
  340 |   });
  341 | 
  342 |   test('should allow exactly five images', async ({ page }) => {
  343 |     const productPage = new ProductPage(page);
  344 | 
  345 |     await productPage.goto();
  346 |     await productPage.startSingleProduct();
  347 | 
  348 |     for (let i = 0; i < 5; i++) {
  349 |       await productPage.uploadImage();
  350 |     }
  351 | 
  352 |     await expect(page.locator('img')).toHaveCount(5);
  353 |   });
  354 | 
  355 |   // ─────────────────────────────────────────────
  356 |   //  Location & inventory allocation
  357 |   // ─────────────────────────────────────────────
  358 |   test('should prevent assigning quantity greater than available stock', async ({ page }) => {
  359 |     const productPage = new ProductPage(page);
  360 |     const product = createSimpleProduct();
  361 | 
  362 |     product.stockQuantity = 5;
  363 | 
  364 |     await productPage.goto();
  365 |     await productPage.startSingleProduct();
  366 |     await productPage.fillProductDetails(product);
  367 | 
  368 |     // Try to assign more than the available stock
  369 |     await productPage.assignInvalidQuantity(product.stockQuantity + 5);
  370 | 
  371 |     // The application should automatically cap it at the maximum stock
> 372 |     await expect(productPage.locationQuantityInput).toHaveValue(
      |                                                     ^ Error: expect(locator).toHaveValue(expected) failed
  373 |       product.stockQuantity.toString()
  374 |     );
  375 |   });
  376 | 
  377 |   test('should assign stock across multiple locations', async ({ page }) => {
  378 |     const productPage = new ProductPage(page);
  379 |     const product = createSimpleProduct();
  380 |     product.stockQuantity = 10;
  381 | 
  382 |     await productPage.goto();
  383 |     await productPage.startSingleProduct();
  384 |     await productPage.fillProductDetails(product);
  385 |     await productPage.assignLocation(5);
  386 |     await productPage.addAnotherLocation(5);
  387 | 
  388 |     await expect(page.getByText('(5)').first()).toBeVisible();
  389 |   });
  390 | 
  391 |   test('should remove assigned location successfully', async ({ page }) => {
  392 |     const productPage = new ProductPage(page);
  393 |     const product = createSimpleProduct();
  394 | 
  395 |     await productPage.goto();
  396 |     await productPage.startSingleProduct();
  397 |     await productPage.fillProductDetails(product);
  398 |     await productPage.assignLocation(5);
  399 |     await productPage.removeAssignedLocation();
  400 | 
  401 |     await expect(page.getByText(/no products assigned/i)).toBeVisible();
  402 |   });
  403 | 
  404 |   test('should prevent allocation exceeding stock quantity across branches', async ({ page }) => {
  405 |     const productPage = new ProductPage(page);
  406 |     const product = createSimpleProduct();
  407 |     product.stockQuantity = 10;
  408 | 
  409 |     await productPage.goto();
  410 |     await productPage.startSingleProduct();
  411 |     await productPage.fillProductDetails(product);
  412 |     await productPage.assignLocation(8);
  413 |     await productPage.addAnotherLocation(5);
  414 | 
  415 |     await expect(page.getByText(/quantity/i)).toBeVisible();
  416 |   });
  417 | 
  418 |   // ─────────────────────────────────────────────
  419 |   //  UI, modals, and navigation
  420 |   // ─────────────────────────────────────────────
  421 |   test('should cancel product creation', async ({ page }) => {
  422 |     const productPage = new ProductPage(page);
  423 | 
  424 |     await productPage.goto();
  425 |     await productPage.startSingleProduct();
  426 |     await page.getByRole('button', { name: 'Cancel' }).click();
  427 | 
  428 |     await expect(page).toHaveURL(/inventory\/products/);
  429 |   });
  430 | 
  431 |   test('should display correct product information in preview modal', async ({ page }) => {
  432 |     const productPage = new ProductPage(page);
  433 |     const product = createSimpleProduct();
  434 | 
  435 |     await productPage.goto();
  436 |     await productPage.startSingleProduct();
  437 |     await productPage.fillProductDetails(product);
  438 |     await productPage.previewProduct();
  439 | 
  440 |     await expect(page.getByText(product.name)).toBeVisible();
  441 |     await expect(page.getByText(product.category)).toBeVisible();
  442 |     await expect(page.getByText(product.sellingPrice.toString())).toBeVisible();
  443 |   });
  444 | 
  445 |   test('should close product preview modal', async ({ page }) => {
  446 |     const productPage = new ProductPage(page);
  447 |     const product = createSimpleProduct();
  448 | 
  449 |     await productPage.goto();
  450 |     await productPage.startSingleProduct();
  451 |     await productPage.fillProductDetails(product);
  452 |     await productPage.previewProduct();
  453 |     await page.getByRole('button').first().click();
  454 | 
  455 |     await expect(page.getByRole('heading', { name: 'Product Preview' })).not.toBeVisible();
  456 |   });
  457 | 
  458 |   // ─────────────────────────────────────────────
  459 |   //  API & integration checks
  460 |   // ─────────────────────────────────────────────
  461 |   test('should create a product successfully via api', async ({ page }) => {
  462 |     const productPage = new ProductPage(page);
  463 |     const product = createSimpleProduct();
  464 | 
  465 |     const createProductRequest = page.waitForResponse(
  466 |       response => response.url().includes('/products') && response.request().method() === 'POST'
  467 |     );
  468 | 
  469 |     await productPage.createSingleProductWithoutVariant(product);
  470 | 
  471 |     const response = await createProductRequest;
  472 |     expect(response.status()).toBe(201);
```