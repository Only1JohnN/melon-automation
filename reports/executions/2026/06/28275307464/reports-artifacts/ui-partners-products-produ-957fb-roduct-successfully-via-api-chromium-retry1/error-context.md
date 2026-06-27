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
        - generic [ref=e61]:
          - link [ref=e62] [cursor=pointer]:
            - /url: /settings/profile
            - img [ref=e64]
          - link [ref=e67]:
            - /url: /inventory/products/new
            - img [ref=e69]
      - button "M" [ref=e76] [cursor=pointer]:
        - generic [ref=e80]: M
    - generic [ref=e81]:
      - generic [ref=e84]:
        - button "9+" [ref=e85] [cursor=pointer]:
          - img [ref=e86]
          - generic [ref=e89]: 9+
        - button "M Q" [ref=e90] [cursor=pointer]:
          - generic [ref=e94]: M Q
      - main [ref=e95]:
        - generic [ref=e97]:
          - navigation [ref=e98]
          - main [ref=e99]:
            - generic [ref=e100]:
              - generic [ref=e101]:
                - button [ref=e102] [cursor=pointer]:
                  - img [ref=e103]
                - generic [ref=e105]:
                  - heading "Add Product" [level=1] [ref=e106]
                  - paragraph [ref=e107]: Add what you are selling to your inventory for customers to see both online and physically
              - generic [ref=e108]:
                - button "Preview" [ref=e109] [cursor=pointer]
                - button "Add Product" [active] [ref=e110] [cursor=pointer]
            - generic [ref=e112]:
              - generic [ref=e115]:
                - paragraph [ref=e116]: You must upload at least one product image
                - button [ref=e117] [cursor=pointer]:
                  - img [ref=e118]
              - generic [ref=e121]:
                - generic [ref=e124]:
                  - generic [ref=e125]:
                    - paragraph [ref=e126]: Product Details
                    - generic [ref=e127]:
                      - generic [ref=e128]:
                        - generic [ref=e129]: Product name*
                        - textbox "Product name*" [ref=e130]:
                          - /placeholder: Enter the name of your product
                          - text: QA Single Product 1782527190260
                      - generic [ref=e132]:
                        - text: Product description (Optional)
                        - generic [ref=e135]:
                          - generic [ref=e136]:
                            - combobox [ref=e137] [cursor=pointer]:
                              - generic:
                                - generic:
                                  - img
                                  - text: Paragraph
                              - img [ref=e138]
                            - combobox [ref=e140]
                            - button "Undo" [disabled] [ref=e142]:
                              - img [ref=e143]
                            - button "Redo" [disabled] [ref=e146]:
                              - img [ref=e147]
                            - button "Format Bold" [ref=e151] [cursor=pointer]:
                              - img [ref=e152]
                            - button "Format Italics" [ref=e154] [cursor=pointer]:
                              - img [ref=e155]
                            - button "Format Underline" [ref=e157] [cursor=pointer]:
                              - img [ref=e158]
                            - button "Format Strikethrough" [ref=e160] [cursor=pointer]:
                              - img [ref=e161]
                            - button "Left Align" [ref=e165] [cursor=pointer]:
                              - img [ref=e166]
                            - button "Center Align" [ref=e167] [cursor=pointer]:
                              - img [ref=e168]
                            - button "Right Align" [ref=e169] [cursor=pointer]:
                              - img [ref=e170]
                            - button "Justify Align" [ref=e171] [cursor=pointer]:
                              - img [ref=e172]
                            - button "Insert Image" [ref=e174] [cursor=pointer]:
                              - img [ref=e175]
                          - generic [ref=e179]:
                            - textbox [ref=e180]:
                              - paragraph [ref=e181]
                            - generic: Describe your product
                      - generic [ref=e182]:
                        - generic [ref=e183]: Category
                        - combobox "Category" [ref=e184] [cursor=pointer]:
                          - generic [ref=e185]: Fashion
                          - img [ref=e186]
                  - generic [ref=e188]:
                    - paragraph [ref=e189]: Pricing & Profit
                    - generic [ref=e191]:
                      - generic [ref=e192]:
                        - generic [ref=e193]:
                          - text: Selling Price
                          - textbox "Selling Price" [ref=e194]:
                            - /placeholder: Enter the price
                            - text: ₦7,422
                        - paragraph [ref=e195]: VAT will be added to prices when product is saved so that you can view it in the preview as well.
                      - generic [ref=e196]:
                        - button "Promo Price (Optional)" [ref=e198] [cursor=pointer]:
                          - text: Promo Price (Optional)
                          - img [ref=e199]
                        - textbox "Promo Price (Optional)" [ref=e201]:
                          - /placeholder: Enter promo price
                          - text: ₦7,395
                      - generic [ref=e203]:
                        - text: Cost Price
                        - textbox "Cost Price" [ref=e204]:
                          - /placeholder: Enter the cost price
                          - text: ₦4,595
                      - generic [ref=e205]:
                        - generic [ref=e206]: Profit
                        - textbox "Profit" [ref=e207]: ₦2,800
                      - generic [ref=e208]:
                        - generic [ref=e209]: Margin (%)
                        - textbox "Margin" [ref=e210]: "37.86"
                      - generic [ref=e212]:
                        - button "Charge Taxes" [ref=e214] [cursor=pointer]:
                          - text: Charge Taxes
                          - img [ref=e215]
                        - textbox "Charge Taxes" [disabled] [ref=e217]: VAT INCLUSIVE
                  - generic [ref=e218]:
                    - paragraph [ref=e219]: Product Inventory
                    - generic [ref=e220]:
                      - generic [ref=e221]:
                        - generic [ref=e222]:
                          - text: Stock Quantity
                          - spinbutton "Stock Quantity" [ref=e223]: "10"
                        - generic [ref=e224]:
                          - checkbox "Enable Low Stock Alert" [ref=e225]
                          - generic [ref=e226]: Enable Low Stock Alert
                      - generic [ref=e227]:
                        - text: SKU
                        - textbox "SKU" [disabled] [ref=e228]:
                          - /placeholder: Enter Product SKU
                          - text: 52EAMQVQO2LO000
                  - generic [ref=e230]:
                    - generic [ref=e231]: Does this product have variations like sizes and colours?
                    - radiogroup [ref=e234]:
                      - generic [ref=e235]:
                        - radio "No, it doesn't" [checked] [ref=e236] [cursor=pointer]:
                          - img [ref=e238]
                        - radio [checked]
                        - generic [ref=e240] [cursor=pointer]:
                          - img [ref=e242]
                          - generic [ref=e244]: No, it doesn't
                      - generic [ref=e245]:
                        - radio "Yes it has" [ref=e246] [cursor=pointer]
                        - radio
                        - generic [ref=e249] [cursor=pointer]: Yes it has
                  - generic [ref=e250]:
                    - paragraph [ref=e251]: Product Allocation
                    - generic [ref=e252]:
                      - generic [ref=e255]:
                        - generic [ref=e256]:
                          - text: Select product location
                          - combobox "Select product location" [ref=e257] [cursor=pointer]:
                            - generic: Select a branch
                            - img [ref=e258]
                          - combobox [ref=e260]
                        - generic [ref=e261]:
                          - text: Assign Quantity
                          - generic [ref=e262] [cursor=pointer]:
                            - generic [ref=e263]: No products assigned
                            - img [ref=e264]
                      - button "Select more locations" [ref=e266] [cursor=pointer]:
                        - img [ref=e267]
                        - text: Select more locations
                - button "Add Product Image Click to upload image" [ref=e270] [cursor=pointer]:
                  - img [ref=e272]
                  - generic [ref=e276]:
                    - paragraph [ref=e277]: Add Product Image
                    - paragraph [ref=e278]: Click to upload image
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