import { expect, Locator, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

  

export interface ProductData {
  name: string;
  category: string;
  sellingPrice: number;
  costPrice: number;
  promoPrice: number;
  stockQuantity: number;
}

export class ProductPage {
  readonly page: Page;

  // ── Buttons ──────────────────────────────────────
  readonly addProductButton: Locator;
  readonly singleProductButton: Locator;
  readonly addImageButton: Locator;
  readonly previewButton: Locator;
  readonly cancelButton: Locator;
  readonly submitProductButton: Locator;
  readonly goToProductsButton: Locator;
  readonly selectMoreLocationsButton: Locator;
  readonly removeImageButton: Locator;
  readonly removeLocationButton: Locator;
  readonly closePreviewButton: Locator;

  // ── Form fields ──────────────────────────────────
  readonly productName: Locator;
  readonly categoryDropdown: Locator;
  readonly sellingPrice: Locator;
  readonly costPrice: Locator;
  readonly promoPrice: Locator;
  readonly stockQuantity: Locator;
  readonly description: Locator;
  readonly sku: Locator;
  readonly margin: Locator;

  // ── Checkbox & thresholds ────────────────────────
  readonly lowStockAlert: Locator;
  readonly lowStockThreshold: Locator;
  readonly noVariantOption: Locator;

  // ── Image handling ───────────────────────────────
  readonly imageUrlInput: Locator;
  readonly insertImageButton: Locator;
  readonly fileInput: Locator;
  readonly imagePreview: Locator;

  // ── Location assignment ─────────────────────────
  readonly locationDropdown: Locator;
  readonly locationEmptyState: Locator;
  readonly locationQuantityInput: Locator;
  readonly locationSubmitButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Buttons
    this.addProductButton = page.getByRole('button', { name: 'Add Product' });
    this.singleProductButton = page.getByRole('button', { name: 'Single Product' });
    this.addImageButton = page.getByRole('button', { name: 'Add Product Image' });
    this.previewButton = page.getByRole('button', { name: 'Preview' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.submitProductButton = page.getByRole('button', { name: 'Add Product', exact: true });
    this.goToProductsButton = page.getByRole('button', { name: 'Go to Products' });
    this.selectMoreLocationsButton = page.getByRole('button', { name: 'Select more locations' });
    this.removeImageButton = page.getByRole('button', { name: 'Remove image 1' })
    this.removeLocationButton = page.locator('.ml-2').first();
    this.closePreviewButton = page.getByRole('button').first(); // may need refinement

    // Form fields
    this.productName = page.getByRole('textbox', { name: 'Product name*' });
    this.categoryDropdown = page.getByRole('combobox', { name: 'Category' });
    this.sellingPrice = page.getByRole('textbox', { name: 'Selling Price' });
    this.costPrice = page.getByRole('textbox', { name: 'Cost Price' });
    this.promoPrice = page.getByRole('textbox', { name: 'Promo Price (Optional)' });
    this.stockQuantity = page.getByRole('spinbutton', { name: 'Stock Quantity' });
    this.description = page.locator('textarea');
    this.sku = page.getByRole('textbox', { name: 'SKU' });
    this.margin = page.getByRole('textbox', { name: 'Margin' });

    // Checkbox & thresholds
    this.lowStockAlert = page.getByRole('checkbox', { name: 'Enable Low Stock Alert' });
    this.lowStockThreshold = page.getByRole('spinbutton', { name: 'Low Stock Threshold' });
    this.noVariantOption = page.locator('label').filter({ hasText: "No, it doesn't" });

    // Image
    this.imageUrlInput = page.getByRole('textbox', { name: 'Paste image URL' });
    this.insertImageButton = page.getByRole('button', { name: 'Insert' });
    this.fileInput = page.locator('input[type="file"]');
    this.imagePreview = page.locator('img').first();

    // Location
    this.locationDropdown = page.getByRole('combobox', { name: 'Select product location' });
    this.locationEmptyState = page.locator('div').filter({ hasText: /^No products assigned$/ });
    this.locationQuantityInput = page.getByPlaceholder(/Enter quantity/);
    this.locationSubmitButton = page.getByRole('button', { name: 'Submit' });
  }

  // ============================================================
  // Navigation
  // ============================================================

  async goto() {
    await this.page.goto(
        `${process.env.PARTNER_URL}/inventory/products`
    );

    await this.page.waitForLoadState(
        "networkidle"
    );

    if (
        this.page.url().includes(
        "/auth/login"
        )
    ) {
        throw new Error(
        "Authentication expired. Re-run auth setup."
        );
    }

    await expect(
        this.page
    ).toHaveURL(
        /inventory\/products/
    );
    }

  async goToProducts(): Promise<void> {
    await this.goToProductsButton.click();
    await expect(this.page).toHaveURL(/inventory\/products/);
  }

  // ============================================================
  // High‑level flows
  // ============================================================

  async startSingleProduct(): Promise<void> {
    await this.addProductButton.click();
    await this.singleProductButton.click();
  }

  async createSingleProductWithoutVariant(product: ProductData): Promise<void> {
    await this.goto();
    await this.startSingleProduct();
    await this.fillProductDetails(product);
    await this.submitProduct();
  }

  // ============================================================
  // Form interaction
  // ============================================================

  async selectCategory(category: string): Promise<void> {
    await this.categoryDropdown.click();
    await this.page.getByRole('option', { name: category }).click();
  }

  async fillProductDetails(product: ProductData): Promise<void> {
    await this.productName.fill(product.name);
    await this.selectCategory(product.category);
    await this.sellingPrice.fill(String(product.sellingPrice));
    await this.costPrice.fill(String(product.costPrice));
    await this.promoPrice.fill(String(product.promoPrice));
    await this.stockQuantity.fill(String(product.stockQuantity));
  }

  async fillProductDetailsWithoutCategory(product: ProductData): Promise<void> {
    await this.productName.fill(product.name);
    await this.sellingPrice.fill(String(product.sellingPrice));
    await this.costPrice.fill(String(product.costPrice));
    await this.stockQuantity.fill(String(product.stockQuantity));
  }

  async enableLowStockAlert(threshold: number): Promise<void> {
    await this.lowStockAlert.check();
    await expect(this.lowStockThreshold).toBeVisible();
    await this.lowStockThreshold.fill(threshold.toString());
  }

  // ============================================================
  // Image handling
  // ============================================================

  async addImageByUrl(imageUrl: string): Promise<void> {
    await this.addImageButton.click();
    await this.imageUrlInput.fill(imageUrl);
    await this.insertImageButton.click();
  }

  private availableImages = fs
    .readdirSync(path.join(process.cwd(), 'fixtures/images'))
    .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));

  async uploadImage(): Promise<void> {
    if (this.availableImages.length === 0) {
      throw new Error('No more images available to upload.');
    }

    const index = Math.floor(Math.random() * this.availableImages.length);
    const image = this.availableImages.splice(index, 1)[0];

    await this.addImageButton.click();
    await this.fileInput.setInputFiles(
      path.join(process.cwd(), 'fixtures/images', image)
    );
  }

  async removeUploadedImage(): Promise<void> {
    await this.removeImageButton.click();
  }

  async validateImagePreview(): Promise<void> {
    await expect(this.imagePreview).toBeVisible();
  }

  // ============================================================
  // Location / inventory assignment
  // ============================================================

  /**
   * Assigns stock to the first available branch.
   * @returns the name of the branch that was selected.
   */
  async assignLocation(quantity: number): Promise<string> {
    const branch = await this.selectFirstAvailableBranch();
    await this.locationEmptyState.click();
    await this.locationQuantityInput.fill(quantity.toString());
    await this.locationSubmitButton.click();
    return branch;
  }

  /**
   * Assigns stock to a specific branch.
   */
  async assignLocationToBranch(branch: string, quantity: number): Promise<void> {
    await this.locationDropdown.click();
    await this.page.getByRole('option', { name: branch }).click();
    await this.locationEmptyState.click();
    await this.locationQuantityInput.fill(quantity.toString());
    await this.locationSubmitButton.click();
  }

  async addAnotherLocation(quantity: number): Promise<void> {
    await this.selectMoreLocationsButton.click();
    const option = this.page.getByRole('option').first();
    await option.click();
    await this.locationEmptyState.click();
    await this.locationQuantityInput.fill(quantity.toString());
    await this.locationSubmitButton.click();
  }

  async assignInvalidQuantity(quantity: number): Promise<void> {
    await this.locationEmptyState.click();
    await this.locationQuantityInput.fill(quantity.toString());
    await this.locationSubmitButton.click();
  }

  async removeAssignedLocation(): Promise<void> {
    await this.removeLocationButton.click();
  }

  async validateLocationAssigned(quantity: number): Promise<void> {
    await expect(this.page.locator(`text=(${quantity})`)).toBeVisible();
  }

  private async selectFirstAvailableBranch(): Promise<string> {
    await this.locationDropdown.click();
    const firstOption = this.page.getByRole('option').first();
    const branchName = await firstOption.textContent();
    await firstOption.click();
    return branchName ?? '';
  }

  // ============================================================
  // Preview & submission
  // ============================================================

  async previewProduct(): Promise<void> {
    await this.previewButton.click();
    await expect(this.page.getByRole('heading', { name: 'Product Preview' })).toBeVisible();
  }

  async validatePreviewDetails(product: ProductData): Promise<void> {
    await expect(this.page.getByText(product.name)).toBeVisible();
    await expect(this.page.getByText(product.category)).toBeVisible();
    await expect(this.page.getByText(String(product.sellingPrice))).toBeVisible();
  }

  async submitProduct(): Promise<void> {
    await this.submitProductButton.click();
  }

  async validateSuccessModal(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Product Created Successfully' })).toBeVisible();
    await expect(this.goToProductsButton).toBeVisible();
  }

  async closePreviewModal(): Promise<void> {
    await this.closePreviewButton.click();
    await expect(this.page.getByRole('heading', { name: 'Product Preview' })).not.toBeVisible();
  }

  // ============================================================
  // Post‑creation verification
  // ============================================================

  async verifyProductInPendingApproval(productName: string): Promise<void> {
    await this.page.getByRole('tab', { name: 'Pending Approval' }).click();
    await expect(
      this.page.getByRole('cell', { name: new RegExp(productName, 'i') })
    ).toBeVisible();
  }

  // ============================================================
  // Validation helpers
  // ============================================================

  async validateNoVariantSelected(): Promise<void> {
    await expect(this.noVariantOption).toBeVisible();
  }

  async validateSkuGenerated(): Promise<void> {
    await expect(this.sku).not.toHaveValue('');
  }

  async validateMarginReadonly(): Promise<void> {
    await expect(this.margin).toBeDisabled();
  }

  async validateErrorMessage(text: RegExp): Promise<void> {
    await expect(this.page.getByText(text)).toBeVisible();
  }

  async validateFieldHasValue(locator: Locator, value: string): Promise<void> {
    await expect(locator).toHaveValue(value);
  }

  async validateFieldEmpty(locator: Locator): Promise<void> {
    await expect(locator).toHaveValue('');
  }
}