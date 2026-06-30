# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/products/product.spec.ts >> @partners @products @single-product @without-variant >> should create a product successfully via api
- Location: tests/ui/partners/products/product.spec.ts:461:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForResponse: Test timeout of 30000ms exceeded.
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
            - /url: /inventory/products/new
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
            - img [ref=e53]
        - link [ref=e62] [cursor=pointer]:
          - /url: /transactions
          - img [ref=e64]
        - generic [ref=e69]:
          - link [ref=e70] [cursor=pointer]:
            - /url: /settings/profile
            - img [ref=e72]
          - link [ref=e75]:
            - /url: /inventory/products/new
            - img [ref=e77]
      - button "M" [ref=e84] [cursor=pointer]:
        - generic [ref=e88]: M
    - generic [ref=e89]:
      - generic [ref=e92]:
        - button "9+" [ref=e93] [cursor=pointer]:
          - img [ref=e94]
          - generic [ref=e97]: 9+
        - button "M Q" [ref=e98] [cursor=pointer]:
          - generic [ref=e102]: M Q
      - main [ref=e103]:
        - generic [ref=e105]:
          - navigation [ref=e106]
          - main [ref=e107]:
            - generic [ref=e108]:
              - generic [ref=e109]:
                - button [ref=e110] [cursor=pointer]:
                  - img [ref=e111]
                - generic [ref=e113]:
                  - heading "Add Product" [level=1] [ref=e114]
                  - paragraph [ref=e115]: Add what you are selling to your inventory for customers to see both online and physically
              - generic [ref=e116]:
                - button "Preview" [ref=e117] [cursor=pointer]
                - button "Add Product" [active] [ref=e118] [cursor=pointer]
            - generic [ref=e120]:
              - generic [ref=e123]:
                - paragraph [ref=e124]: You must upload at least one product image
                - button [ref=e125] [cursor=pointer]:
                  - img [ref=e126]
              - generic [ref=e129]:
                - generic [ref=e132]:
                  - generic [ref=e133]:
                    - paragraph [ref=e134]: Product Details
                    - generic [ref=e135]:
                      - generic [ref=e136]:
                        - generic [ref=e137]: Product name*
                        - textbox "Product name*" [ref=e138]:
                          - /placeholder: Enter the name of your product
                          - text: QA Single Product 1782813105933
                      - generic [ref=e140]:
                        - text: Product description (Optional)
                        - generic [ref=e143]:
                          - generic [ref=e144]:
                            - combobox [ref=e145] [cursor=pointer]:
                              - generic:
                                - generic:
                                  - img
                                  - text: Paragraph
                              - img [ref=e146]
                            - combobox [ref=e148]
                            - button "Undo" [disabled] [ref=e150]:
                              - img [ref=e151]
                            - button "Redo" [disabled] [ref=e154]:
                              - img [ref=e155]
                            - button "Format Bold" [ref=e159] [cursor=pointer]:
                              - img [ref=e160]
                            - button "Format Italics" [ref=e162] [cursor=pointer]:
                              - img [ref=e163]
                            - button "Format Underline" [ref=e165] [cursor=pointer]:
                              - img [ref=e166]
                            - button "Format Strikethrough" [ref=e168] [cursor=pointer]:
                              - img [ref=e169]
                            - button "Left Align" [ref=e173] [cursor=pointer]:
                              - img [ref=e174]
                            - button "Center Align" [ref=e175] [cursor=pointer]:
                              - img [ref=e176]
                            - button "Right Align" [ref=e177] [cursor=pointer]:
                              - img [ref=e178]
                            - button "Justify Align" [ref=e179] [cursor=pointer]:
                              - img [ref=e180]
                            - button "Insert Image" [ref=e182] [cursor=pointer]:
                              - img [ref=e183]
                          - generic [ref=e187]:
                            - textbox [ref=e188]:
                              - paragraph [ref=e189]
                            - generic: Describe your product
                      - generic [ref=e190]:
                        - generic [ref=e191]: Category
                        - combobox "Category" [ref=e192] [cursor=pointer]:
                          - generic [ref=e193]: Fashion
                          - img [ref=e194]
                  - generic [ref=e196]:
                    - paragraph [ref=e197]: Pricing & Profit
                    - generic [ref=e199]:
                      - generic [ref=e200]:
                        - generic [ref=e201]:
                          - text: Selling Price
                          - textbox "Selling Price" [ref=e202]:
                            - /placeholder: Enter the price
                            - text: ₦4,640
                        - paragraph [ref=e203]: VAT will be added to prices when product is saved so that you can view it in the preview as well.
                      - generic [ref=e204]:
                        - button "Promo Price (Optional)" [ref=e206] [cursor=pointer]:
                          - text: Promo Price (Optional)
                          - img [ref=e207]
                        - textbox "Promo Price (Optional)" [ref=e209]:
                          - /placeholder: Enter promo price
                          - text: ₦4,169
                      - generic [ref=e211]:
                        - text: Cost Price
                        - textbox "Cost Price" [ref=e212]:
                          - /placeholder: Enter the cost price
                          - text: ₦3,920
                      - generic [ref=e213]:
                        - generic [ref=e214]: Profit
                        - textbox "Profit" [ref=e215]: ₦249
                      - generic [ref=e216]:
                        - generic [ref=e217]: Margin (%)
                        - textbox "Margin" [ref=e218]: "5.97"
                      - generic [ref=e220]:
                        - button "Charge Taxes" [ref=e222] [cursor=pointer]:
                          - text: Charge Taxes
                          - img [ref=e223]
                        - textbox "Charge Taxes" [disabled] [ref=e225]: VAT INCLUSIVE
                  - generic [ref=e226]:
                    - paragraph [ref=e227]: Product Inventory
                    - generic [ref=e228]:
                      - generic [ref=e229]:
                        - generic [ref=e230]:
                          - text: Stock Quantity
                          - spinbutton "Stock Quantity" [ref=e231]: "10"
                        - generic [ref=e232]:
                          - checkbox "Enable Low Stock Alert" [ref=e233]
                          - generic [ref=e234]: Enable Low Stock Alert
                      - generic [ref=e235]:
                        - text: SKU
                        - textbox "SKU" [disabled] [ref=e236]:
                          - /placeholder: Enter Product SKU
                          - text: 52EAMR0GW8Q4000
                  - generic [ref=e238]:
                    - generic [ref=e239]: Does this product have variations like sizes and colours?
                    - radiogroup [ref=e242]:
                      - generic [ref=e243]:
                        - radio "No, it doesn't" [checked] [ref=e244] [cursor=pointer]:
                          - img [ref=e246]
                        - radio [checked]
                        - generic [ref=e248] [cursor=pointer]:
                          - img [ref=e250]
                          - generic [ref=e252]: No, it doesn't
                      - generic [ref=e253]:
                        - radio "Yes it has" [ref=e254] [cursor=pointer]
                        - radio
                        - generic [ref=e257] [cursor=pointer]: Yes it has
                  - generic [ref=e258]:
                    - paragraph [ref=e259]: Product Allocation
                    - generic [ref=e260]:
                      - generic [ref=e263]:
                        - generic [ref=e264]:
                          - text: Select product location
                          - combobox "Select product location" [ref=e265] [cursor=pointer]:
                            - generic: Select a branch
                            - img [ref=e266]
                          - combobox [ref=e268]
                        - generic [ref=e269]:
                          - text: Assign Quantity
                          - generic [ref=e270] [cursor=pointer]:
                            - generic [ref=e271]: No products assigned
                            - img [ref=e272]
                      - button "Select more locations" [ref=e274] [cursor=pointer]:
                        - img [ref=e275]
                        - text: Select more locations
                - button "Add Product Image Click to upload image" [ref=e278] [cursor=pointer]:
                  - img [ref=e280]
                  - generic [ref=e284]:
                    - paragraph [ref=e285]: Add Product Image
                    - paragraph [ref=e286]: Click to upload image
  - region "Notifications Alt+T"
  - region "Notifications alt+T"
```

# Test source

```ts
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
> 465 |     const createProductRequest = page.waitForResponse(
      |                                       ^ Error: page.waitForResponse: Test timeout of 30000ms exceeded.
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