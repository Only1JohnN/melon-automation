# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/products/product.spec.ts >> @partners @products @single-product @without-variant >> should display correct product information in preview modal
- Location: tests/ui/partners/products/product.spec.ts:431:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Fashion')
Expected: visible
Error: strict mode violation: getByText('Fashion') resolved to 2 elements:
    1) <span class="text-pashBlack-5">Fashion</span> aka getByLabel('Category')
    2) <span class="px-3 py-1 text-sm rounded-lg bg-gray-100 border border-gray-300 text-gray-700">Fashion</span> aka getByLabel('Product Preview').getByText('Fashion')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Fashion')

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
                  - generic: 9+
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
                                    - textbox:
                                      - /placeholder: Enter the name of your product
                                      - text: QA Single Product 1782689692083
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
                                    - combobox:
                                      - generic: Fashion
                                      - img
                              - generic:
                                - paragraph: Pricing & Profit
                                - generic:
                                  - generic:
                                    - generic:
                                      - generic:
                                        - text: Selling Price
                                        - textbox:
                                          - /placeholder: Enter the price
                                          - text: ₦7,218
                                      - paragraph: VAT will be added to prices when product is saved so that you can view it in the preview as well.
                                    - generic:
                                      - generic:
                                        - button:
                                          - text: Promo Price (Optional)
                                          - img
                                      - textbox:
                                        - /placeholder: Enter promo price
                                        - text: ₦6,471
                                    - generic:
                                      - generic:
                                        - text: Cost Price
                                        - textbox:
                                          - /placeholder: Enter the cost price
                                          - text: ₦4,411
                                    - generic:
                                      - generic: Profit
                                      - textbox:
                                        - /placeholder: Profit
                                        - text: ₦2,060
                                    - generic:
                                      - generic: Margin (%)
                                      - textbox:
                                        - /placeholder: Margin
                                        - text: "31.83"
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
                                      - spinbutton: "10"
                                    - generic:
                                      - checkbox
                                      - generic: Enable Low Stock Alert
                                  - generic:
                                    - text: SKU
                                    - textbox [disabled]:
                                      - /placeholder: Enter Product SKU
                                      - text: 52EAMQYFF13A000
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
                            - button:
                              - generic:
                                - img
                              - generic:
                                - paragraph: Add Product Image
                                - paragraph: Click to upload image
      - region "Notifications Alt+T"
      - region "Notifications alt+T"
  - dialog "Product Preview" [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e5]:
          - heading "Product Preview" [level=2] [ref=e6]
          - paragraph [ref=e7]: This is what your customers see
        - button [active] [ref=e8] [cursor=pointer]:
          - img [ref=e9]
      - generic [ref=e12]:
        - generic [ref=e13]:
          - img "QA Single Product 1782689692083" [ref=e16]
          - generic [ref=e18]:
            - generic [ref=e19]:
              - heading "QA Single Product 1782689692083" [level=1] [ref=e20]
              - generic [ref=e21]:
                - generic [ref=e22]: ₦6,956.33
                - generic [ref=e23]: ₦7,759.35
                - generic [ref=e24]: Save 10%
              - generic [ref=e25]:
                - img [ref=e26]
                - generic [ref=e28]: VAT Inclusive (₦485.32)
            - generic [ref=e29]:
              - generic [ref=e30]:
                - button [disabled]:
                  - img
                - generic [ref=e31]: "1"
                - button [ref=e32] [cursor=pointer]:
                  - img [ref=e33]
              - paragraph [ref=e34]: 10 in stock
            - generic [ref=e35]:
              - heading "Category" [level=3] [ref=e36]
              - generic [ref=e38]: Fashion
            - button "Add to Cart" [ref=e40] [cursor=pointer]
        - generic [ref=e41]:
          - heading "Item Description" [level=3] [ref=e42]
          - paragraph [ref=e45]
```

# Test source

```ts
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
> 441 |     await expect(page.getByText(product.category)).toBeVisible();
      |                                                    ^ Error: expect(locator).toBeVisible() failed
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
  473 |     const body = await response.json();
  474 |     expect(body.status).toBe('success');
  475 |   });
  476 | 
  477 |   test('should display correct product details in pending approval', async ({ page }) => {
  478 |     const productPage = new ProductPage(page);
  479 |     const product = createSimpleProduct();
  480 | 
  481 |     await productPage.createSingleProductWithoutVariant(product);
  482 |     await page.getByRole('tab', { name: 'Pending Approval' }).click();
  483 | 
  484 |     await expect(
  485 |       page.getByRole('cell', { name: new RegExp(product.name, 'i') })
  486 |     ).toBeVisible();
  487 |   });
  488 | });
```