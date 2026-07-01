# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/products/product.spec.ts >> @partners @products @single-product @without-variant >> should allow exactly five images
- Location: tests/ui/partners/products/product.spec.ts:342:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('img')
Expected: 5
Received: 6

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('img')
    9 × locator resolved to 6 elements
      - unexpected value "6"

```

# Page snapshot

```yaml
- generic:
  - generic:
    - generic:
      - generic:
        - complementary:
          - generic:
            - generic:
              - img
          - generic:
            - generic:
              - generic:
                - generic:
                  - generic:
                    - generic:
                      - link:
                        - /url: /home
                        - generic:
                          - img
                      - link:
                        - /url: /offers
                        - generic:
                          - img
                      - link:
                        - /url: /inventory/products/new
                        - generic:
                          - img
                  - generic:
                    - generic:
                      - link:
                        - /url: /inventory/products
                        - generic:
                          - img
                      - link:
                        - /url: /order-mgmt
                        - generic:
                          - img
                      - link:
                        - /url: /inventory/warehouse
                        - generic:
                          - img
                      - link:
                        - /url: /inventory/category
                        - generic:
                          - img
                  - generic:
                    - generic:
                      - link:
                        - /url: /transactions
                        - generic:
                          - img
                  - generic:
                    - generic:
                      - link:
                        - /url: /settings/profile
                        - generic:
                          - img
                      - link:
                        - /url: /inventory/products/new
                        - generic:
                          - img
          - generic:
            - button:
              - generic:
                - generic:
                  - generic:
                    - generic: M
        - generic:
          - generic:
            - generic:
              - generic:
                - button:
                  - img
                - button:
                  - generic:
                    - generic:
                      - generic:
                        - generic: M Q
          - main:
            - generic:
              - generic:
                - navigation
                - main:
                  - generic:
                    - generic:
                      - button:
                        - img
                      - generic:
                        - heading [level=1]: Add Product
                        - paragraph: Add what you are selling to your inventory for customers to see both online and physically
                    - generic:
                      - button: Preview
                      - button: Add Product
                  - generic:
                    - generic:
                      - generic:
                        - generic:
                          - generic:
                            - generic:
                              - generic:
                                - paragraph: Product Details
                                - generic:
                                  - generic:
                                    - generic: Product name*
                                    - textbox [invalid]:
                                      - /placeholder: Enter the name of your product
                                    - paragraph: Product name is required
                                  - generic:
                                    - generic:
                                      - text: Product description (Optional)
                                      - generic:
                                        - generic:
                                          - generic:
                                            - generic:
                                              - combobox:
                                                - generic:
                                                  - generic:
                                                    - img
                                                    - text: Paragraph
                                                - img
                                              - combobox
                                              - button [disabled]:
                                                - img
                                              - button [disabled]:
                                                - img
                                              - button:
                                                - img
                                              - button:
                                                - img
                                              - button:
                                                - img
                                              - button:
                                                - img
                                              - button:
                                                - img
                                              - button:
                                                - img
                                              - button:
                                                - img
                                              - button:
                                                - img
                                              - button:
                                                - img
                                            - generic:
                                              - textbox:
                                                - paragraph
                                              - generic: Describe your product
                                  - generic:
                                    - generic: Category
                                    - combobox [invalid]:
                                      - generic: Select category
                                      - img
                                    - paragraph: Product category is required
                              - generic:
                                - paragraph: Pricing & Profit
                                - generic:
                                  - generic:
                                    - generic:
                                      - generic:
                                        - text: Selling Price
                                        - textbox [invalid]:
                                          - /placeholder: Enter the price
                                        - paragraph: Selling Price is required
                                      - paragraph: VAT will be added to prices when product is saved so that you can view it in the preview as well.
                                    - generic:
                                      - generic:
                                        - button:
                                          - text: Promo Price (Optional)
                                          - img
                                      - textbox:
                                        - /placeholder: Enter promo price
                                    - generic:
                                      - generic:
                                        - text: Cost Price
                                        - textbox [invalid]:
                                          - /placeholder: Enter the cost price
                                        - paragraph: Cost price is required
                                    - generic:
                                      - generic: Profit
                                      - textbox:
                                        - /placeholder: Profit
                                        - text: ₦0
                                    - generic:
                                      - generic: Margin (%)
                                      - textbox:
                                        - /placeholder: Margin
                                        - text: "0.00"
                                    - generic:
                                      - generic:
                                        - generic:
                                          - button:
                                            - text: Charge Taxes
                                            - img
                                        - textbox [disabled]: VAT INCLUSIVE
                              - generic:
                                - paragraph: Product Inventory
                                - generic:
                                  - generic:
                                    - generic:
                                      - text: Stock Quantity
                                      - spinbutton [invalid]
                                      - paragraph: Stock quantity is required
                                    - generic:
                                      - checkbox
                                      - generic: Enable Low Stock Alert
                                  - generic:
                                    - text: SKU
                                    - textbox [disabled]:
                                      - /placeholder: Enter Product SKU
                                      - text: 52EAMR1WEKIO000
                              - generic:
                                - generic:
                                  - generic: Does this product have variations like sizes and colours?
                                  - generic:
                                    - generic:
                                      - radiogroup:
                                        - generic:
                                          - radio [checked]:
                                            - generic:
                                              - img
                                          - radio [checked]
                                          - generic:
                                            - generic:
                                              - img
                                            - generic: No, it doesn't
                                        - generic:
                                          - radio
                                          - radio
                                          - generic:
                                            - generic: Yes it has
                              - generic:
                                - paragraph: Product Allocation
                                - generic:
                                  - generic:
                                    - generic:
                                      - generic:
                                        - generic:
                                          - text: Select product location
                                          - combobox:
                                            - generic: Select a branch
                                            - img
                                          - combobox
                                        - generic:
                                          - text: Assign Quantity
                                          - generic:
                                            - generic: No products assigned
                                            - img
                                  - button:
                                    - img
                                    - text: Select more locations
                        - generic:
                          - generic:
                            - generic:
                              - img
                              - button:
                                - img
                            - generic:
                              - img
                              - button:
                                - img
                            - generic:
                              - img
                              - button:
                                - img
                            - generic:
                              - img
                              - button:
                                - img
                            - generic:
                              - button:
                                - generic:
                                  - img
                                - generic:
                                  - paragraph: Add Product Image
                                  - paragraph: Click to upload image
      - region "Notifications Alt+T"
      - region "Notifications alt+T"
  - dialog "Add Media" [ref=e2]:
    - generic [ref=e3]:
      - heading "Add Media" [level=2] [ref=e4]
      - button [active] [ref=e5] [cursor=pointer]:
        - img [ref=e6]
    - generic [ref=e12]:
      - generic [ref=e13]:
        - generic [ref=e14]: Insert by URL
        - textbox "Paste image URL" [ref=e15]
        - button "Insert" [ref=e16] [cursor=pointer]
      - generic [ref=e19]: OR
      - generic [ref=e22]:
        - img "Preview" [ref=e23]
        - generic [ref=e24]:
          - img [ref=e25]
          - generic [ref=e27]: Uploading...
      - generic [ref=e30]: OR
```

# Test source

```ts
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
> 352 |     await expect(page.locator('img')).toHaveCount(5);
      |                                       ^ Error: expect(locator).toHaveCount(expected) failed
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
  372 |     await expect(productPage.locationQuantityInput).toHaveValue(
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
```