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
- generic [ref=e1]:
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
        - button [ref=e84] [cursor=pointer]:
          - img [ref=e88]
      - generic [ref=e89]:
        - generic [ref=e92]:
          - button [ref=e93] [cursor=pointer]:
            - img [ref=e94]
          - button [ref=e97] [cursor=pointer]:
            - img [ref=e101]
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
                  - button "Add Product" [ref=e117] [cursor=pointer]
              - generic [ref=e120]:
                - generic [ref=e123]:
                  - generic [ref=e124]:
                    - paragraph [ref=e125]: Product Details
                    - generic [ref=e126]:
                      - generic [ref=e127]:
                        - generic [ref=e128]: Product name*
                        - textbox "Product name*" [ref=e129]:
                          - /placeholder: Enter the name of your product
                          - text: QA Single Product 1783071842177
                      - generic [ref=e131]:
                        - text: Product description (Optional)
                        - generic [ref=e134]:
                          - generic [ref=e135]:
                            - combobox [ref=e136] [cursor=pointer]:
                              - generic:
                                - generic:
                                  - img
                                  - text: Paragraph
                              - img [ref=e137]
                            - combobox [ref=e139]
                            - button "Undo" [disabled] [ref=e141]:
                              - img [ref=e142]
                            - button "Redo" [disabled] [ref=e145]:
                              - img [ref=e146]
                            - button "Format Bold" [ref=e150] [cursor=pointer]:
                              - img [ref=e151]
                            - button "Format Italics" [ref=e153] [cursor=pointer]:
                              - img [ref=e154]
                            - button "Format Underline" [ref=e156] [cursor=pointer]:
                              - img [ref=e157]
                            - button "Format Strikethrough" [ref=e159] [cursor=pointer]:
                              - img [ref=e160]
                            - button "Left Align" [ref=e164] [cursor=pointer]:
                              - img [ref=e165]
                            - button "Center Align" [ref=e166] [cursor=pointer]:
                              - img [ref=e167]
                            - button "Right Align" [ref=e168] [cursor=pointer]:
                              - img [ref=e169]
                            - button "Justify Align" [ref=e170] [cursor=pointer]:
                              - img [ref=e171]
                            - button "Insert Image" [ref=e173] [cursor=pointer]:
                              - img [ref=e174]
                          - generic [ref=e178]:
                            - textbox [ref=e179]:
                              - paragraph [ref=e180]
                            - generic: Describe your product
                      - generic [ref=e181]:
                        - generic [ref=e182]: Category
                        - combobox "Category" [expanded] [ref=e183] [cursor=pointer]:
                          - generic [ref=e184]: Select category
                          - img [ref=e185]
                  - generic [ref=e187]:
                    - paragraph [ref=e188]: Pricing & Profit
                    - generic [ref=e190]:
                      - generic [ref=e191]:
                        - generic [ref=e192]:
                          - text: Selling Price
                          - textbox "Selling Price" [ref=e193]:
                            - /placeholder: Enter the price
                        - paragraph [ref=e194]: Prices will be saved as entered
                      - generic [ref=e195]:
                        - button "Promo Price (Optional)" [ref=e197] [cursor=pointer]:
                          - text: Promo Price (Optional)
                          - img [ref=e198]
                        - textbox "Promo Price (Optional)" [ref=e200]:
                          - /placeholder: Enter promo price
                      - generic [ref=e202]:
                        - text: Cost Price
                        - textbox "Cost Price" [ref=e203]:
                          - /placeholder: Enter the cost price
                      - generic [ref=e204]:
                        - generic [ref=e205]: Profit
                        - textbox "Profit" [ref=e206]: ₦0
                      - generic [ref=e207]:
                        - generic [ref=e208]: Margin (%)
                        - textbox "Margin" [ref=e209]: "0.00"
                      - generic [ref=e211]:
                        - button "Charge Taxes" [ref=e213] [cursor=pointer]:
                          - text: Charge Taxes
                          - img [ref=e214]
                        - textbox "Charge Taxes" [disabled] [ref=e216]: NO VAT
                  - generic [ref=e217]:
                    - paragraph [ref=e218]: Product Inventory
                    - generic [ref=e219]:
                      - generic [ref=e220]:
                        - generic [ref=e221]:
                          - text: Stock Quantity
                          - spinbutton "Stock Quantity" [ref=e222]
                        - generic [ref=e223]:
                          - checkbox "Enable Low Stock Alert" [ref=e224]
                          - generic [ref=e225]: Enable Low Stock Alert
                      - generic [ref=e226]:
                        - text: SKU
                        - textbox "SKU" [disabled] [ref=e227]:
                          - /placeholder: Enter Product SKU
                          - text: 7C09MR4QXV14000
                  - generic [ref=e229]:
                    - generic [ref=e230]: Does this product have variations like sizes and colours?
                    - radiogroup [ref=e233]:
                      - generic [ref=e234]:
                        - radio "No, it doesn't" [checked] [ref=e235] [cursor=pointer]:
                          - img [ref=e237]
                        - radio [checked]
                        - generic [ref=e239] [cursor=pointer]:
                          - img [ref=e241]
                          - generic [ref=e243]: No, it doesn't
                      - generic [ref=e244]:
                        - radio "Yes it has" [ref=e245] [cursor=pointer]
                        - radio
                        - generic [ref=e248] [cursor=pointer]: Yes it has
                  - generic [ref=e249]:
                    - paragraph [ref=e250]: Product Allocation
                    - generic [ref=e251]:
                      - generic [ref=e254]:
                        - generic [ref=e255]:
                          - text: Select product location
                          - combobox "Select product location" [ref=e256] [cursor=pointer]:
                            - generic: Select a branch
                            - img [ref=e257]
                          - combobox [ref=e259]
                        - generic [ref=e260]:
                          - text: Assign Quantity
                          - generic [ref=e261] [cursor=pointer]:
                            - generic [ref=e262]: No products assigned
                            - img [ref=e263]
                      - button "Select more locations" [ref=e265] [cursor=pointer]:
                        - img [ref=e266]
                        - text: Select more locations
                - button "Add Product Image Click to upload image" [ref=e269] [cursor=pointer]:
                  - img [ref=e271]
                  - generic [ref=e275]:
                    - paragraph [ref=e276]: Add Product Image
                    - paragraph [ref=e277]: Click to upload image
    - region "Notifications Alt+T"
    - region "Notifications alt+T"
  - dialog [active] [ref=e279]:
    - listbox "Suggestions" [ref=e282]:
      - group [ref=e284]:
        - option "Add Category" [selected] [ref=e285]:
          - img
          - text: Add Category
        - option "Gaming" [ref=e286]: Gaming
        - option "Mobile Phones" [ref=e288]: Mobile Phones
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