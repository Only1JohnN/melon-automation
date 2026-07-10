import { expect, Locator, Page, Response } from '@playwright/test';

export class SettingsPage {
  readonly page: Page;

  // ── Navigation ──────────────────────────────────────────────
  readonly profileTab: Locator;
  readonly businessTab: Locator;

  // ── Profile view / edit ────────────────────────────────────
  readonly profileEditButton: Locator;
  readonly profileFirstName: Locator;
  readonly profileLastName: Locator;
  readonly profilePhone: Locator;
  readonly profileEmail: Locator;
  readonly profileGender: Locator;
  readonly profileAddress: Locator;
  readonly profilePhotoUpload: Locator;
  readonly profilePhotoInput: Locator;
  readonly profileCancelButton: Locator;
  readonly profileContinueButton: Locator;
  readonly profileFirstNameInput: Locator;
  readonly profileLastNameInput: Locator;

  // ── Business Details ──────────────────────────────────────
  readonly businessEditButton: Locator;
  readonly businessEmailInput: Locator;
  readonly businessPhoneInput: Locator;
  readonly businessIndustryDropdown: Locator;
  readonly businessLogoUpload: Locator;
  readonly businessLogoInput: Locator;
  readonly businessCancelButton: Locator;
  readonly businessContinueButton: Locator;

  // ── Branches ──────────────────────────────────────────────
  readonly branchesTab: Locator;
  readonly addLocationButton: Locator;
  readonly onlineStorefrontOption: Locator;
  readonly tradingAddressOption: Locator;
  readonly storeNameInput: Locator;
  readonly addStoreButton: Locator;
  readonly branchManagerDropdown: Locator;
  readonly branchAddressInput: Locator;
  readonly branchAddressSuggestion: Locator; // first suggestion
  readonly branchHoursPreset: Locator;
  readonly branchContinueButton: Locator;
  readonly branchList: Locator;

  // ── Directors ──────────────────────────────────────────────
  readonly directorsTab: Locator;
  readonly directorsHeading: Locator;
  readonly directorsTable: Locator;

  // ── Common ────────────────────────────────────────────────
  readonly toast: Locator;

  constructor(page: Page) {
    this.page = page;

    // ─── Navigation ──────────────────────────────────────────
    this.profileTab = page.getByRole('tab', { name: /profile/i });
    this.businessTab = page.getByRole('tab', { name: /business/i });

    // ─── Profile ────────────────────────────────────────────
    this.profileEditButton = page.getByRole('button', { name: /edit/i }).first();
    // The view cells: use the cell's parent row or sibling
    this.profileFirstName = page.locator('tr:has(td:has-text("First name")) td:nth-child(2)');
    this.profileLastName = page.locator('tr:has(td:has-text("Last name")) td:nth-child(2)');
    this.profilePhone = page.locator('tr:has(td:has-text("Phone number")) td:nth-child(2)');
    this.profileEmail = page.locator('tr:has(td:has-text("Email")) td:nth-child(2)');
    this.profileGender = page.locator('tr:has(td:has-text("Gender")) td:nth-child(2)');
    this.profileAddress = page.locator('tr:has(td:has-text("Address")) td:nth-child(2)');
    this.profilePhotoUpload = page.locator('label').filter({ hasText: /upload photo/i }).first();
    this.profilePhotoInput = page.locator('input[type="file"]').first();
    this.profileCancelButton = page.getByRole('button', { name: /cancel/i }).first();
    this.profileContinueButton = page.getByRole('button', { name: /continue/i }).first();
    this.profileFirstNameInput = page.getByRole('textbox', { name: /first name/i });
    this.profileLastNameInput = page.getByRole('textbox', { name: /last name/i });

    // ─── Business Details ──────────────────────────────────
    this.businessEditButton = page.getByRole('button', { name: /edit/i }).nth(1);
    this.businessEmailInput = page.getByRole('textbox', { name: /email address/i });
    this.businessPhoneInput = page.getByRole('textbox', { name: /business phone/i });
    this.businessIndustryDropdown = page.getByRole('combobox', { name: /industry/i });
    this.businessLogoUpload = page.locator('label').filter({ hasText: /upload photo/i }).nth(1);
    this.businessLogoInput = page.locator('input[type="file"]').nth(1);
    this.businessCancelButton = page.getByRole('button', { name: /cancel/i }).nth(1);
    this.businessContinueButton = page.getByRole('button', { name: /continue/i }).nth(1);

    // ─── Branches ──────────────────────────────────────────
    this.branchesTab = page.getByRole('tab', { name: /branches/i });
    this.addLocationButton = page.getByRole('button', { name: /add another location/i });
    this.onlineStorefrontOption = page.getByRole('button', { name: /create online storefront/i });
    this.tradingAddressOption = page.getByRole('button', { name: /add trading address/i });
    this.storeNameInput = page.getByRole('textbox', { name: /your-store-name/i });
    this.addStoreButton = page.getByRole('button', { name: /add/i, exact: true });
    this.branchManagerDropdown = page.getByRole('combobox').first(); // may need refinement
    this.branchAddressInput = page.getByRole('textbox', { name: /enter address/i });
    // First suggestion from Google Maps – usually the first list item or button
    this.branchAddressSuggestion = page.locator('[role="option"]').first(); // or .locator('.suggestion-item').first()
    this.branchHoursPreset = page.locator('text=/business hours|retail hours|restaurant hours/i').first();
    this.branchContinueButton = page.getByRole('button', { name: /continue/i }).last();
    this.branchList = page.locator('table').last(); // adjust to branch table

    // ─── Directors ──────────────────────────────────────────
    this.directorsTab = page.getByRole('tab', { name: /directors/i });
    this.directorsHeading = page.getByRole('heading', { name: /director details/i });
    this.directorsTable = page.locator('table').nth(1); // adjust

    // ─── Common ────────────────────────────────────────────
    this.toast = page.getByRole('alert');
  }

  // ============================================================
  // Navigation
  // ============================================================

  async gotoProfile() {
    await this.page.goto(`${process.env.PARTNER_URL}/settings/profile`);
    await this.page.waitForLoadState('networkidle');
    await expect(this.profileEditButton).toBeVisible({ timeout: 15000 });
  }

  async gotoBusiness() {
    await this.page.goto(`${process.env.PARTNER_URL}/settings/business`);
    await this.page.waitForLoadState('networkidle');
    await expect(this.businessEditButton).toBeVisible({ timeout: 15000 });
  }

  // ============================================================
  // Profile
  // ============================================================

  async getProfileFields() {
    return {
      firstName: (await this.profileFirstName.textContent())?.trim() || '',
      lastName: (await this.profileLastName.textContent())?.trim() || '',
      phone: (await this.profilePhone.textContent())?.trim() || '',
      email: (await this.profileEmail.textContent())?.trim() || '',
      gender: (await this.profileGender.textContent())?.trim() || '',
      address: (await this.profileAddress.textContent())?.trim() || '',
    };
  }

  async editProfile(firstName: string, lastName: string): Promise<void> {
    await this.profileEditButton.click();
    await expect(this.profileContinueButton).toBeVisible();
    await this.profileFirstNameInput.fill(firstName);
    await this.profileLastNameInput.fill(lastName);
  }

  async saveProfile(): Promise<void> {
    await this.profileContinueButton.click();
    await this.waitForToast(/saved|success/i);
  }

  async cancelProfileEdit(): Promise<void> {
    await this.profileCancelButton.click();
    // modal closes, no toast
  }

  async uploadProfilePhoto(filePath: string): Promise<void> {
    await this.profilePhotoUpload.click();
    await this.profilePhotoInput.setInputFiles(filePath);
    await expect(this.page.locator('img[alt*="profile"]')).toBeVisible({ timeout: 10000 });
  }

  // ============================================================
  // Business Details
  // ============================================================

  /**
   * Get current business fields from view mode.
   * Assumes the fields are in a table or labelled divs.
   * Customize selectors to match your DOM.
   */
  async getBusinessFields() {
    const emailCell = this.page.locator('tr:has(td:has-text("Email")) td:nth-child(2)');
    const phoneCell = this.page.locator('tr:has(td:has-text("Phone")) td:nth-child(2)');
    const industryCell = this.page.locator('tr:has(td:has-text("Industry")) td:nth-child(2)');
    return {
      email: (await emailCell.textContent())?.trim() || '',
      phone: (await phoneCell.textContent())?.trim() || '',
      industry: (await industryCell.textContent())?.trim() || '',
    };
  }

  async editBusiness(email: string, phone: string, industry: string): Promise<void> {
    await this.businessEditButton.click();
    await expect(this.businessContinueButton).toBeVisible();

    await this.businessEmailInput.fill(email);
    await this.businessPhoneInput.fill(phone);
    await this.businessIndustryDropdown.click();
    await this.page.getByRole('option', { name: industry }).click();
  }

  async saveBusiness(): Promise<void> {
    await this.businessContinueButton.click();
    await this.waitForToast(/saved|success/i);
  }

  async cancelBusinessEdit(): Promise<void> {
    await this.businessCancelButton.click();
  }

  async uploadBusinessLogo(filePath: string): Promise<void> {
    await this.businessLogoUpload.click();
    await this.businessLogoInput.setInputFiles(filePath);
    await expect(this.page.locator('img[alt*="business"]')).toBeVisible({ timeout: 10000 });
  }

  // ============================================================
  // Branches
  // ============================================================

  async goToBranches() {
    await this.branchesTab.click();
    await expect(this.addLocationButton).toBeVisible({ timeout: 10000 });
  }

  /**
   * Creates an online storefront branch.
   * @param storeName - unique store name
   * @returns the POST response
   */
  async createOnlineBranch(storeName: string): Promise<Response> {
    await this.addLocationButton.click();
    await this.onlineStorefrontOption.click();
    await this.storeNameInput.fill(storeName);

    const [response] = await Promise.all([
      this.page.waitForResponse(
        (res) => res.url().includes('/branches') && res.request().method() === 'POST'
      ),
      this.addStoreButton.click(),
    ]);

    // Some flows require an extra "Continue" – we add a safety click if present
    const continueBtn = this.page.getByRole('button', { name: /continue/i }).last();
    if (await continueBtn.isVisible({ timeout: 2000 })) {
      await continueBtn.click();
    }

    return response;
  }

  /**
   * Creates an offline branch with a trading address.
   * @param manager - the full name of the manager to select
   * @param searchAddress - e.g., "Ikeja, Lagos" – will be autocompleted
   * @returns the POST response
   */
  async createOfflineBranch(manager: string, searchAddress: string): Promise<Response> {
    await this.addLocationButton.click();
    await this.tradingAddressOption.click();

    // Select manager
    await this.branchManagerDropdown.click();
    await this.page.getByRole('option', { name: manager }).click();

    // Fill address and choose first suggestion
    await this.branchAddressInput.fill(searchAddress);
    // Wait for suggestions and click the first one
    await this.branchAddressSuggestion.waitFor({ state: 'visible', timeout: 10000 });
    await this.branchAddressSuggestion.click();

    // Optionally pick a hours preset (click the first available)
    if (await this.branchHoursPreset.isVisible()) {
      await this.branchHoursPreset.click();
    }

    const [response] = await Promise.all([
      this.page.waitForResponse(
        (res) => res.url().includes('/branches') && res.request().method() === 'POST'
      ),
      this.branchContinueButton.click(),
    ]);

    return response;
  }

  /**
   * Get the list of branch names from the table.
   * Adjust selector to target the branch name column.
   */
  async getBranchNames(): Promise<string[]> {
    const rows = this.branchList.locator('tbody tr');
    const count = await rows.count();
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      // assume name is in first column
      const name = await rows.nth(i).locator('td').first().textContent();
      if (name) names.push(name.trim());
    }
    return names;
  }

  /**
   * Get any error message for duplicate online branch.
   */
  async getBranchError(): Promise<string | null> {
    const error = this.page.getByText(/already has an online presence|duplicate/i);
    if (await error.isVisible()) {
      return await error.textContent();
    }
    return null;
  }

  /**
   * Selects a random manager from the dropdown, excluding placeholder.
   * @returns the manager's full name
   */
  async getRandomManager(): Promise<string> {
    await this.branchManagerDropdown.click();
    const options = this.page.getByRole('option');
    const count = await options.count();
    // find first non-placeholder (skip first if it's "Select..." etc.)
    let start = 0;
    for (let i = 0; i < count; i++) {
      const text = await options.nth(i).textContent();
      if (!text || /select/i.test(text)) continue;
      start = i;
      break;
    }
    const randomIndex = Math.floor(Math.random() * (count - start)) + start;
    const manager = await options.nth(randomIndex).textContent();
    // Close dropdown
    await this.page.keyboard.press('Escape');
    return manager?.trim() || '';
  }

  // ============================================================
  // Directors
  // ============================================================

  async goToDirectors() {
    await this.directorsTab.click();
    await expect(this.directorsHeading).toBeVisible();
  }

  async getDirectorsCount(): Promise<number> {
    const rows = this.directorsTable.locator('tbody tr');
    return await rows.count();
  }

  // ============================================================
  // Helpers
  // ============================================================

  async waitForToast(text: string | RegExp): Promise<void> {
    await expect(this.toast).toContainText(text, { timeout: 10000 });
  }

  async waitForToastToDisappear(): Promise<void> {
    await expect(this.toast).not.toBeVisible({ timeout: 10000 });
  }
}