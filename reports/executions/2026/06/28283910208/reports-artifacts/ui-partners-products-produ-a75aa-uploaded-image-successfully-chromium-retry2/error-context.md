# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/products/product.spec.ts >> @partners @products @single-product @without-variant >> should remove uploaded image successfully
- Location: tests/ui/partners/products/product.spec.ts:321:7

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('img')
Expected: 0
Received: 1
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('img')
    14 × locator resolved to 1 element
       - unexpected value "1"

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
                - button "Add Product" [ref=e110] [cursor=pointer]
            - generic [ref=e113]:
              - generic [ref=e116]:
                - generic [ref=e117]:
                  - paragraph [ref=e118]: Product Details
                  - generic [ref=e119]:
                    - generic [ref=e120]:
                      - generic [ref=e121]: Product name*
                      - textbox "Product name*" [invalid] [ref=e122]:
                        - /placeholder: Enter the name of your product
                      - paragraph [ref=e123]: Product name is required
                    - generic [ref=e125]:
                      - text: Product description (Optional)
                      - generic [ref=e128]:
                        - generic [ref=e129]:
                          - combobox [ref=e130] [cursor=pointer]:
                            - generic:
                              - generic:
                                - img
                                - text: Paragraph
                            - img [ref=e131]
                          - combobox [ref=e133]
                          - button "Undo" [disabled] [ref=e135]:
                            - img [ref=e136]
                          - button "Redo" [disabled] [ref=e139]:
                            - img [ref=e140]
                          - button "Format Bold" [ref=e144] [cursor=pointer]:
                            - img [ref=e145]
                          - button "Format Italics" [ref=e147] [cursor=pointer]:
                            - img [ref=e148]
                          - button "Format Underline" [ref=e150] [cursor=pointer]:
                            - img [ref=e151]
                          - button "Format Strikethrough" [ref=e153] [cursor=pointer]:
                            - img [ref=e154]
                          - button "Left Align" [ref=e158] [cursor=pointer]:
                            - img [ref=e159]
                          - button "Center Align" [ref=e160] [cursor=pointer]:
                            - img [ref=e161]
                          - button "Right Align" [ref=e162] [cursor=pointer]:
                            - img [ref=e163]
                          - button "Justify Align" [ref=e164] [cursor=pointer]:
                            - img [ref=e165]
                          - button "Insert Image" [ref=e167] [cursor=pointer]:
                            - img [ref=e168]
                        - generic [ref=e172]:
                          - textbox [ref=e173]:
                            - paragraph [ref=e174]
                          - generic: Describe your product
                    - generic [ref=e175]:
                      - generic [ref=e176]: Category
                      - combobox "Category" [invalid] [ref=e177] [cursor=pointer]:
                        - generic [ref=e178]: Select category
                        - img [ref=e179]
                      - paragraph [ref=e181]: Product category is required
                - generic [ref=e182]:
                  - paragraph [ref=e183]: Pricing & Profit
                  - generic [ref=e185]:
                    - generic [ref=e186]:
                      - generic [ref=e187]:
                        - text: Selling Price
                        - textbox "Selling Price" [invalid] [ref=e188]:
                          - /placeholder: Enter the price
                        - paragraph [ref=e189]: Selling Price is required
                      - paragraph [ref=e190]: VAT will be added to prices when product is saved so that you can view it in the preview as well.
                    - generic [ref=e191]:
                      - button "Promo Price (Optional)" [ref=e193] [cursor=pointer]:
                        - text: Promo Price (Optional)
                        - img [ref=e194]
                      - textbox "Promo Price (Optional)" [ref=e196]:
                        - /placeholder: Enter promo price
                    - generic [ref=e198]:
                      - text: Cost Price
                      - textbox "Cost Price" [invalid] [ref=e199]:
                        - /placeholder: Enter the cost price
                      - paragraph [ref=e200]: Cost price is required
                    - generic [ref=e201]:
                      - generic [ref=e202]: Profit
                      - textbox "Profit" [ref=e203]: ₦0
                    - generic [ref=e204]:
                      - generic [ref=e205]: Margin (%)
                      - textbox "Margin" [ref=e206]: "0.00"
                    - generic [ref=e208]:
                      - button "Charge Taxes" [ref=e210] [cursor=pointer]:
                        - text: Charge Taxes
                        - img [ref=e211]
                      - textbox "Charge Taxes" [disabled] [invalid] [ref=e213]: VAT INCLUSIVE
                - generic [ref=e214]:
                  - paragraph [ref=e215]: Product Inventory
                  - generic [ref=e216]:
                    - generic [ref=e217]:
                      - generic [ref=e218]:
                        - text: Stock Quantity
                        - spinbutton "Stock Quantity" [invalid] [ref=e219]
                        - paragraph [ref=e220]: Stock quantity is required
                      - generic [ref=e221]:
                        - checkbox "Enable Low Stock Alert" [ref=e222]
                        - generic [ref=e223]: Enable Low Stock Alert
                    - generic [ref=e224]:
                      - text: SKU
                      - textbox "SKU" [disabled] [ref=e225]:
                        - /placeholder: Enter Product SKU
                        - text: 52EAMQW44HUB000
                - generic [ref=e227]:
                  - generic [ref=e228]: Does this product have variations like sizes and colours?
                  - radiogroup [ref=e231]:
                    - generic [ref=e232]:
                      - radio "No, it doesn't" [checked] [ref=e233] [cursor=pointer]:
                        - img [ref=e235]
                      - radio [checked]
                      - generic [ref=e237] [cursor=pointer]:
                        - img [ref=e239]
                        - generic [ref=e241]: No, it doesn't
                    - generic [ref=e242]:
                      - radio "Yes it has" [ref=e243] [cursor=pointer]
                      - radio
                      - generic [ref=e246] [cursor=pointer]: Yes it has
                - generic [ref=e247]:
                  - paragraph [ref=e248]: Product Allocation
                  - generic [ref=e249]:
                    - generic [ref=e252]:
                      - generic [ref=e253]:
                        - text: Select product location
                        - combobox "Select product location" [ref=e254] [cursor=pointer]:
                          - generic: Select a branch
                          - img [ref=e255]
                        - combobox [ref=e257]
                      - generic [ref=e258]:
                        - text: Assign Quantity
                        - generic [ref=e259] [cursor=pointer]:
                          - generic [ref=e260]: No products assigned
                          - img [ref=e261]
                    - button "Select more locations" [ref=e263] [cursor=pointer]:
                      - img [ref=e264]
                      - text: Select more locations
              - button "Add Product Image Click to upload image" [ref=e267] [cursor=pointer]:
                - img [ref=e269]
                - generic [ref=e273]:
                  - paragraph [ref=e274]: Add Product Image
                  - paragraph [ref=e275]: Click to upload image
  - region "Notifications Alt+T"
  - region "Notifications alt+T"
```

# Test source

```ts
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
> 329 |     await expect(page.locator('img')).toHaveCount(0);
      |                                       ^ Error: expect(locator).toHaveCount(expected) failed
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
```