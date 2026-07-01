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
        - button [ref=e93] [cursor=pointer]:
          - img [ref=e94]
        - button "M Q" [ref=e97] [cursor=pointer]:
          - generic [ref=e101]: M Q
      - main [ref=e102]:
        - generic [ref=e104]:
          - navigation [ref=e105]
          - main [ref=e106]:
            - generic [ref=e107]:
              - generic [ref=e108]:
                - button [ref=e109] [cursor=pointer]:
                  - img [ref=e110]
                - generic [ref=e112]:
                  - heading "Add Product" [level=1] [ref=e113]
                  - paragraph [ref=e114]: Add what you are selling to your inventory for customers to see both online and physically
              - generic [ref=e115]:
                - button "Preview" [ref=e116] [cursor=pointer]
                - button "Add Product" [active] [ref=e117] [cursor=pointer]
            - generic [ref=e119]:
              - generic [ref=e122]:
                - paragraph [ref=e123]: You must upload at least one product image
                - button [ref=e124] [cursor=pointer]:
                  - img [ref=e125]
              - generic [ref=e128]:
                - generic [ref=e131]:
                  - generic [ref=e132]:
                    - paragraph [ref=e133]: Product Details
                    - generic [ref=e134]:
                      - generic [ref=e135]:
                        - generic [ref=e136]: Product name*
                        - textbox "Product name*" [ref=e137]:
                          - /placeholder: Enter the name of your product
                          - text: QA Single Product 1782900240608
                      - generic [ref=e139]:
                        - text: Product description (Optional)
                        - generic [ref=e142]:
                          - generic [ref=e143]:
                            - combobox [ref=e144] [cursor=pointer]:
                              - generic:
                                - generic:
                                  - img
                                  - text: Paragraph
                              - img [ref=e145]
                            - combobox [ref=e147]
                            - button "Undo" [disabled] [ref=e149]:
                              - img [ref=e150]
                            - button "Redo" [disabled] [ref=e153]:
                              - img [ref=e154]
                            - button "Format Bold" [ref=e158] [cursor=pointer]:
                              - img [ref=e159]
                            - button "Format Italics" [ref=e161] [cursor=pointer]:
                              - img [ref=e162]
                            - button "Format Underline" [ref=e164] [cursor=pointer]:
                              - img [ref=e165]
                            - button "Format Strikethrough" [ref=e167] [cursor=pointer]:
                              - img [ref=e168]
                            - button "Left Align" [ref=e172] [cursor=pointer]:
                              - img [ref=e173]
                            - button "Center Align" [ref=e174] [cursor=pointer]:
                              - img [ref=e175]
                            - button "Right Align" [ref=e176] [cursor=pointer]:
                              - img [ref=e177]
                            - button "Justify Align" [ref=e178] [cursor=pointer]:
                              - img [ref=e179]
                            - button "Insert Image" [ref=e181] [cursor=pointer]:
                              - img [ref=e182]
                          - generic [ref=e186]:
                            - textbox [ref=e187]:
                              - paragraph [ref=e188]
                            - generic: Describe your product
                      - generic [ref=e189]:
                        - generic [ref=e190]: Category
                        - combobox "Category" [ref=e191] [cursor=pointer]:
                          - generic [ref=e192]: Fashion
                          - img [ref=e193]
                  - generic [ref=e195]:
                    - paragraph [ref=e196]: Pricing & Profit
                    - generic [ref=e198]:
                      - generic [ref=e199]:
                        - generic [ref=e200]:
                          - text: Selling Price
                          - textbox "Selling Price" [ref=e201]:
                            - /placeholder: Enter the price
                            - text: ₦5,469
                        - paragraph [ref=e202]: VAT will be added to prices when product is saved so that you can view it in the preview as well.
                      - generic [ref=e203]:
                        - button "Promo Price (Optional)" [ref=e205] [cursor=pointer]:
                          - text: Promo Price (Optional)
                          - img [ref=e206]
                        - textbox "Promo Price (Optional)" [ref=e208]:
                          - /placeholder: Enter promo price
                          - text: ₦5,065
                      - generic [ref=e210]:
                        - text: Cost Price
                        - textbox "Cost Price" [ref=e211]:
                          - /placeholder: Enter the cost price
                          - text: ₦4,691
                      - generic [ref=e212]:
                        - generic [ref=e213]: Profit
                        - textbox "Profit" [ref=e214]: ₦374
                      - generic [ref=e215]:
                        - generic [ref=e216]: Margin (%)
                        - textbox "Margin" [ref=e217]: "7.38"
                      - generic [ref=e219]:
                        - button "Charge Taxes" [ref=e221] [cursor=pointer]:
                          - text: Charge Taxes
                          - img [ref=e222]
                        - textbox "Charge Taxes" [disabled] [ref=e224]: VAT INCLUSIVE
                  - generic [ref=e225]:
                    - paragraph [ref=e226]: Product Inventory
                    - generic [ref=e227]:
                      - generic [ref=e228]:
                        - generic [ref=e229]:
                          - text: Stock Quantity
                          - spinbutton "Stock Quantity" [ref=e230]: "10"
                        - generic [ref=e231]:
                          - checkbox "Enable Low Stock Alert" [ref=e232]
                          - generic [ref=e233]: Enable Low Stock Alert
                      - generic [ref=e234]:
                        - text: SKU
                        - textbox "SKU" [disabled] [ref=e235]:
                          - /placeholder: Enter Product SKU
                          - text: 52EAMR1WRTPQ000
                  - generic [ref=e237]:
                    - generic [ref=e238]: Does this product have variations like sizes and colours?
                    - radiogroup [ref=e241]:
                      - generic [ref=e242]:
                        - radio "No, it doesn't" [checked] [ref=e243] [cursor=pointer]:
                          - img [ref=e245]
                        - radio [checked]
                        - generic [ref=e247] [cursor=pointer]:
                          - img [ref=e249]
                          - generic [ref=e251]: No, it doesn't
                      - generic [ref=e252]:
                        - radio "Yes it has" [ref=e253] [cursor=pointer]
                        - radio
                        - generic [ref=e256] [cursor=pointer]: Yes it has
                  - generic [ref=e257]:
                    - paragraph [ref=e258]: Product Allocation
                    - generic [ref=e259]:
                      - generic [ref=e262]:
                        - generic [ref=e263]:
                          - text: Select product location
                          - combobox "Select product location" [ref=e264] [cursor=pointer]:
                            - generic: Select a branch
                            - img [ref=e265]
                          - combobox [ref=e267]
                        - generic [ref=e268]:
                          - text: Assign Quantity
                          - generic [ref=e269] [cursor=pointer]:
                            - generic [ref=e270]: No products assigned
                            - img [ref=e271]
                      - button "Select more locations" [ref=e273] [cursor=pointer]:
                        - img [ref=e274]
                        - text: Select more locations
                - button "Add Product Image Click to upload image" [ref=e277] [cursor=pointer]:
                  - img [ref=e279]
                  - generic [ref=e283]:
                    - paragraph [ref=e284]: Add Product Image
                    - paragraph [ref=e285]: Click to upload image
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