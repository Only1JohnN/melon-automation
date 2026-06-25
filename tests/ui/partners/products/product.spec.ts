import { test, expect } from '@fixtures/baseTest';
import { LoginPage } from '@pages/partners/LoginPage';
import { ProductPage } from '@pages/partners/products/ProductPage';
import { createSimpleProduct } from '@test-data/factories/productFactory';

test.describe('@partners @products @single-product @without-variant', () => {
  // ─────────────────────────────────────────────
  //  Successful creation (full flow + API)
  // ─────────────────────────────────────────────
  test('should create a single product without variant successfully (basic)', async ({ page }) => {
    const product = createSimpleProduct();
    const productPage = new ProductPage(page);

    await productPage.goto();
    await productPage.startSingleProduct();
    await productPage.fillProductDetails(product);
  });

  test('should create a single product without variant successfully (full journey)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const product = createSimpleProduct();

    await loginPage.login(process.env.PARTNER_EMAIL!, process.env.PARTNER_PASSWORD!);

    await productPage.goto();
    await productPage.startSingleProduct();
    await productPage.fillProductDetails(product);
    await productPage.enableLowStockAlert(10);
    await productPage.validateMarginReadonly();
    await productPage.validateSkuGenerated();
    await productPage.validateNoVariantSelected();
    await productPage.uploadImage();
    await productPage.assignLocationToBranch('https://melon-qa-bot.getmelon.shop', 5);
    await productPage.validateLocationAssigned(5);
    await productPage.previewProduct();
    await productPage.submitProduct();
    await productPage.goToProducts();
    await productPage.verifyProductInPendingApproval(product.name);
  });

  // ─────────────────────────────────────────────
  //  Price validations
  // ─────────────────────────────────────────────
  test('should prevent selling price less than cost price (case 1)', async ({ page }) => {
    const productPage = new ProductPage(page);
    const product = createSimpleProduct();
    product.costPrice = 1000;
    product.sellingPrice = 500;
    product.promoPrice = 0;

    await productPage.goto();
    await productPage.startSingleProduct();
    await productPage.fillProductDetails(product);

    await expect(page.getByText('Cost price is greater than')).toBeVisible();
  });

  test('should prevent promo price greater than selling price (case 1)', async ({ page }) => {
    const productPage = new ProductPage(page);
    const product = createSimpleProduct();
    product.costPrice = 1000;
    product.sellingPrice = 1500;
    product.promoPrice = 2000;

    await productPage.goto();
    await productPage.startSingleProduct();
    await productPage.fillProductDetails(product);
    await productPage.submitProduct();

    await expect(page.getByText('The promo price must be less')).toBeVisible();
  });

  test('should prevent selling price less than cost price (case 2)', async ({ page }) => {
    const productPage = new ProductPage(page);
    const product = createSimpleProduct();
    product.costPrice = 2000;
    product.sellingPrice = 1000;
    product.promoPrice = 0;

    await productPage.goto();
    await productPage.startSingleProduct();
    await productPage.fillProductDetails(product);

    await expect(page.getByText('Cost price is greater than')).toBeVisible();
  });

  test('should prevent promo price greater than selling price (case 2)', async ({ page }) => {
    const productPage = new ProductPage(page);
    const product = createSimpleProduct();
    product.costPrice = 1000;
    product.sellingPrice = 2000;
    product.promoPrice = 2500;

    await productPage.goto();
    await productPage.startSingleProduct();
    await productPage.fillProductDetails(product);
    await productPage.submitProduct();

    await expect(page.getByText('The promo price must be less')).toBeVisible();
  });

  // ─────────────────────────────────────────────
  //  Stock & threshold validations
  // ─────────────────────────────────────────────
  test('should prevent low stock threshold greater than stock quantity (case 1)', async ({ page }) => {
    const productPage = new ProductPage(page);
    const product = createSimpleProduct();
    product.stockQuantity = 10;

    await productPage.goto();
    await productPage.startSingleProduct();
    await productPage.fillProductDetails(product);
    await productPage.enableLowStockAlert(15);

    await expect(page.getByText('Low stock threshold can\'t be higher than stock quantity')).toBeVisible();
  });

  test('should prevent low stock threshold greater than stock quantity (case 2)', async ({ page }) => {
    const productPage = new ProductPage(page);
    const product = createSimpleProduct();
    product.stockQuantity = 5;

    await productPage.goto();
    await productPage.startSingleProduct();
    await productPage.fillProductDetails(product);
    await productPage.enableLowStockAlert(10);

    await expect(page.getByText('Low stock threshold can\'t be higher than stock quantity')).toBeVisible();
  });

  test('should validate threshold equal to stock quantity', async ({ page }) => {
    const productPage = new ProductPage(page);
    const product = createSimpleProduct();
    product.stockQuantity = 10;

    await productPage.goto();
    await productPage.startSingleProduct();
    await productPage.fillProductDetails(product);
    await productPage.enableLowStockAlert(10);

    await expect(page.getByText('Low stock threshold can\'t be equal to stock quantity')).toBeVisible();
  });

  test('should prevent stock quantity of zero', async ({ page }) => {
    const productPage = new ProductPage(page);
    const product = createSimpleProduct();
    product.stockQuantity = 0;

    await productPage.goto();
    await productPage.startSingleProduct();
    await productPage.fillProductDetails(product);
    await productPage.submitProduct();

    await expect(page.getByText('Stock quantity must be at')).toBeVisible();
  });

  test('should prevent negative stock quantity', async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.goto();
    await productPage.startSingleProduct();
    await productPage.stockQuantity.fill('-10');
    await productPage.submitProduct();

    const message = await productPage.stockQuantity.evaluate(
      (el: HTMLInputElement) => {
        el.reportValidity();          // triggers validation
        return el.validationMessage;
      }
    );
    console.log('Validation message:', JSON.stringify(message));

    expect(message).toContain('greater than or equal to 0');
  });

  // ─────────────────────────────────────────────
  //  Field requirement & length validations
  // ─────────────────────────────────────────────
  test('should require product name when creating a single product without variant', async ({ page }) => {
    const productPage = new ProductPage(page);
    const product = createSimpleProduct();
    product.name = '';

    await productPage.goto();
    await productPage.startSingleProduct();
    await productPage.fillProductDetails(product);
    await productPage.submitProduct();

    await expect(page.getByText('Product name is required')).toBeVisible();
  });

  test('should require category', async ({ page }) => {
    const productPage = new ProductPage(page);
    const product = createSimpleProduct();

    await productPage.goto();
    await productPage.startSingleProduct();
    await productPage.fillProductDetailsWithoutCategory(product);
    await productPage.submitProduct();

    await expect(page.getByText('Product category is required')).toBeVisible();
  });

  test('should prevent product name exceeding maximum length', async ({ page }) => {
    const productPage = new ProductPage(page);
    const product = createSimpleProduct();
    product.name = 'A'.repeat(256);

    await productPage.goto();
    await productPage.startSingleProduct();
    await productPage.fillProductDetails(product);

    await expect(page.getByText(/maximum/i)).toBeVisible();
  });

  test('should trim leading and trailing spaces from product name', async ({ page }) => {
    const productPage = new ProductPage(page);
    const product = createSimpleProduct();
    product.name = '    Test Product    ';

    await productPage.createSingleProductWithoutVariant(product);
    await productPage.verifyProductInPendingApproval('Test Product');
  });

  test('should prevent description exceeding maximum length', async ({ page }) => {
    const productPage = new ProductPage(page);
    const description = 'A'.repeat(5001);

    await productPage.goto();
    await productPage.startSingleProduct();
    await productPage.description.fill(description);

    await expect(page.getByText(/maximum/i)).toBeVisible();
  });

  // ─────────────────────────────────────────────
  //  Numeric‑only & negative value checks
  // ─────────────────────────────────────────────
  test('should prevent non numeric values in cost price', async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.goto();
    await productPage.startSingleProduct();
    await productPage.costPrice.fill('abc');

    await expect(productPage.costPrice).toHaveValue('');
  });

  test('should prevent non numeric values in selling price', async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.goto();
    await productPage.startSingleProduct();
    await productPage.sellingPrice.fill('abc');

    await expect(productPage.sellingPrice).toHaveValue('');
  });

  test('should prevent non numeric values in promo price', async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.goto();
    await productPage.startSingleProduct();
    await productPage.promoPrice.fill('abc');

    await expect(productPage.promoPrice).toHaveValue('');
  });

  test('should prevent negative cost price', async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.goto();
    await productPage.startSingleProduct();

    await productPage.costPrice.fill('-100');

    await expect(productPage.costPrice).not.toHaveValue(/-/);
  });

  test('should prevent negative selling price', async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.goto();
    await productPage.startSingleProduct();

    await productPage.sellingPrice.fill('-100');

    await expect(productPage.sellingPrice).not.toHaveValue(/-/);
  });

  test('should prevent negative promo price', async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.goto();
    await productPage.startSingleProduct();

    await productPage.promoPrice.fill('-100');

    await expect(productPage.promoPrice).not.toHaveValue(/-/);
  });

  // ─────────────────────────────────────────────
  //  Image handling
  // ─────────────────────────────────────────────
  test('should enforce maximum of five images', async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.goto();
    await productPage.startSingleProduct();

    for (let i = 0; i < 5; i++) {
      await productPage.uploadImage();
    }
    // attempt sixth
    await productPage.uploadImage();

    await expect(productPage.addImageButton).not.toBeVisible();
  });

  test('should remove uploaded image successfully', async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.goto();
    await productPage.startSingleProduct();
    await productPage.uploadImage();
    await productPage.removeUploadedImage();

    await expect(page.locator('img')).toHaveCount(0);
  });

  test('should prevent invalid image url upload', async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.goto();
    await productPage.startSingleProduct();
    await productPage.addImageByUrl('invalid-url');

    await expect(page.getByText('Please enter a valid image')).toBeVisible();
  });

  test('should allow exactly five images', async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.goto();
    await productPage.startSingleProduct();

    for (let i = 0; i < 5; i++) {
      await productPage.uploadImage();
    }

    await expect(page.locator('img')).toHaveCount(5);
  });

  // ─────────────────────────────────────────────
  //  Location & inventory allocation
  // ─────────────────────────────────────────────
  test('should prevent assigning quantity greater than available stock', async ({ page }) => {
    const productPage = new ProductPage(page);
    const product = createSimpleProduct();

    product.stockQuantity = 5;

    await productPage.goto();
    await productPage.startSingleProduct();
    await productPage.fillProductDetails(product);

    // Try to assign more than the available stock
    await productPage.assignInvalidQuantity(product.stockQuantity + 5);

    // The application should automatically cap it at the maximum stock
    await expect(productPage.locationQuantityInput).toHaveValue(
      product.stockQuantity.toString()
    );
  });

  test('should assign stock across multiple locations', async ({ page }) => {
    const productPage = new ProductPage(page);
    const product = createSimpleProduct();
    product.stockQuantity = 10;

    await productPage.goto();
    await productPage.startSingleProduct();
    await productPage.fillProductDetails(product);
    await productPage.assignLocation(5);
    await productPage.addAnotherLocation(5);

    await expect(page.getByText('(5)').first()).toBeVisible();
  });

  test('should remove assigned location successfully', async ({ page }) => {
    const productPage = new ProductPage(page);
    const product = createSimpleProduct();

    await productPage.goto();
    await productPage.startSingleProduct();
    await productPage.fillProductDetails(product);
    await productPage.assignLocation(5);
    await productPage.removeAssignedLocation();

    await expect(page.getByText(/no products assigned/i)).toBeVisible();
  });

  test('should prevent allocation exceeding stock quantity across branches', async ({ page }) => {
    const productPage = new ProductPage(page);
    const product = createSimpleProduct();
    product.stockQuantity = 10;

    await productPage.goto();
    await productPage.startSingleProduct();
    await productPage.fillProductDetails(product);
    await productPage.assignLocation(8);
    await productPage.addAnotherLocation(5);

    await expect(page.getByText(/quantity/i)).toBeVisible();
  });

  // ─────────────────────────────────────────────
  //  UI, modals, and navigation
  // ─────────────────────────────────────────────
  test('should cancel product creation', async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.goto();
    await productPage.startSingleProduct();
    await page.getByRole('button', { name: 'Cancel' }).click();

    await expect(page).toHaveURL(/inventory\/products/);
  });

  test('should display correct product information in preview modal', async ({ page }) => {
    const productPage = new ProductPage(page);
    const product = createSimpleProduct();

    await productPage.goto();
    await productPage.startSingleProduct();
    await productPage.fillProductDetails(product);
    await productPage.previewProduct();

    await expect(page.getByText(product.name)).toBeVisible();
    await expect(page.getByText(product.category)).toBeVisible();
    await expect(page.getByText(product.sellingPrice.toString())).toBeVisible();
  });

  test('should close product preview modal', async ({ page }) => {
    const productPage = new ProductPage(page);
    const product = createSimpleProduct();

    await productPage.goto();
    await productPage.startSingleProduct();
    await productPage.fillProductDetails(product);
    await productPage.previewProduct();
    await page.getByRole('button').first().click();

    await expect(page.getByRole('heading', { name: 'Product Preview' })).not.toBeVisible();
  });

  // ─────────────────────────────────────────────
  //  API & integration checks
  // ─────────────────────────────────────────────
  test('should create a product successfully via api', async ({ page }) => {
    const productPage = new ProductPage(page);
    const product = createSimpleProduct();

    const createProductRequest = page.waitForResponse(
      response => response.url().includes('/products') && response.request().method() === 'POST'
    );

    await productPage.createSingleProductWithoutVariant(product);

    const response = await createProductRequest;
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.status).toBe('success');
  });

  test('should display correct product details in pending approval', async ({ page }) => {
    const productPage = new ProductPage(page);
    const product = createSimpleProduct();

    await productPage.createSingleProductWithoutVariant(product);
    await page.getByRole('tab', { name: 'Pending Approval' }).click();

    await expect(
      page.getByRole('cell', { name: new RegExp(product.name, 'i') })
    ).toBeVisible();
  });
});