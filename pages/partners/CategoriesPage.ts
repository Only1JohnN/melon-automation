// pages/partners/CategoriesPage.ts

import {
  expect,
  Locator,
  Page,
  Response
} from "@playwright/test";

export class CategoriesPage {
  readonly page: Page;

  // ============================================================
  // Navigation
  // ============================================================

  readonly categoriesLink: Locator;

  // ============================================================
  // Buttons
  // ============================================================

  readonly addCategoryButton: Locator;
  readonly submitCategoryButton: Locator;
  readonly updateCategoryButton: Locator;
  readonly cancelButton: Locator;
  readonly nextButton: Locator;
  readonly previousButton: Locator;

  // ============================================================
  // Inputs
  // ============================================================

  readonly categoryNameInput: Locator;
  readonly descriptionInput: Locator;
  readonly searchInput: Locator;

  // ============================================================
  // Containers
  // ============================================================

  readonly table: Locator;
  readonly modal: Locator;
  readonly topCategoryWidget: Locator;

  constructor(page: Page) {
    this.page = page;

    // Navigation
    this.categoriesLink = page.getByRole("link", {
      name: "Categories",
    });

    // Buttons
    this.addCategoryButton = page.getByRole("button", {
      name: "Add Category",
    });

    this.submitCategoryButton = page.getByRole("button", {
      name: "Add Category",
      exact: true,
    });

    this.updateCategoryButton = page.getByRole("button", {
      name: "Update Category",
    });

    this.cancelButton = page.getByRole("button", {
      name: "Cancel",
    });

    this.nextButton = page.getByRole("button", {
      name: "Next",
    });

    this.previousButton = page.getByRole("button", {
      name: "Previous",
    });

    // Inputs
    this.categoryNameInput = page.getByRole("textbox", {
      name: "Category Name *",
    });

    this.descriptionInput = page.getByRole("textbox", {
      name: "Description (Optional)",
    });

    this.searchInput = page.getByRole("textbox", {
      name: "Search by category name",
    });

    // Containers
    this.table = page.locator("table");

    this.modal = page.getByRole("dialog");

    this.topCategoryWidget = page
      .locator("div")
      .filter({
        hasText: /^Top Category/,
      })
      .first();
  }

  // ============================================================
  // Navigation
  // ============================================================

  async goto() {
    this.page.once("popup", async (popup) => {
      await popup.close();
    });

    const categoriesUrl = new URL(
      "inventory/category",
      process.env.PARTNER_URL!
    ).toString();

    await this.page.goto(categoriesUrl, {
      waitUntil: "domcontentloaded",
    });
    await this.page.waitForURL(/inventory\/category/, { timeout: 15000 });
    await this.page.waitForLoadState("networkidle", { timeout: 30000 });
    await this.addCategoryButton.waitFor({ state: "visible", timeout: 30000 });
    await this.searchInput.waitFor({ state: "visible", timeout: 30000 });
    await this.table.waitFor({ state: "visible", timeout: 30000 });
  }

  async waitForPageLoad() {
    await expect(this.page).toHaveURL(
      /inventory\/category/
    );

    await expect(
      this.addCategoryButton
    ).toBeVisible();

    await expect(
      this.searchInput
    ).toBeVisible();

    await expect(
      this.table
    ).toBeVisible();
  }

  // ============================================================
  // Category CRUD
  // ============================================================

  async createCategory(
    name: string,
    description = ""
  ): Promise<Response> {
    await this.openCreateModal();

    await this.categoryNameInput.fill(
      name
    );

    if (description) {
      await this.descriptionInput.fill(
        description
      );
    }

    const [response] =
      await Promise.all([
        this.page.waitForResponse(
          (response) =>
            response.url().includes(
              "/categories"
            ) &&
            response.request().method() ===
              "POST"
        ),

        this.submitCategoryButton.click(),
      ]);

    await this.waitForPageLoad();

    return response;
  }

  async editCategory(
    categoryName: string,
    description: string
  ): Promise<Response> {
    await this.openActionsMenu(
      categoryName
    );

    await this.page
      .getByRole("menuitem", {
        name: "Edit",
      })
      .click();

    await expect(
      this.categoryNameInput
    ).toBeVisible();

    await this.descriptionInput.fill(
      description
    );

    const [response] =
      await Promise.all([
        this.page.waitForResponse(
          (response) =>
            response.url().includes(
              "/categories"
            ) &&
            [
              "PUT",
              "PATCH",
            ].includes(
              response.request().method()
            )
        ),

        this.updateCategoryButton.click(),
      ]);

    return response;
  }

  async deleteCategory(
    categoryName: string
  ): Promise<void> {
    await this.openActionsMenu(
      categoryName
    );

    await this.page
      .getByRole("menuitem", {
        name: "Delete",
      })
      .click();

    await this.page
      .getByRole("button", {
        name: /confirm/i,
      })
      .click();
  }

  // ============================================================
  // Search
  // ============================================================

  async search(
    searchTerm: string
  ) {
    await this.searchInput.fill(
      searchTerm
    );

    await Promise.all([
      this.page.waitForResponse(
        (response) =>
          response.url().includes(
            "/categories"
          ) &&
          response.request().method() ===
            "GET"
      ),

      this.searchInput.press(
        "Enter"
      ),
    ]);
  }

  async clearSearch() {
    await this.searchInput.clear();

    await this.searchInput.press(
      "Enter"
    );
  }

  // ============================================================
  // Pagination
  // ============================================================

  async goToNextPage() {
    if (
      await this.nextButton.isDisabled()
    ) {
      return;
    }

    await Promise.all([
      this.page.waitForResponse(
        (response) =>
          response.url().includes(
            "/categories"
          )
      ),

      this.nextButton.click(),
    ]);
  }

  async goToPreviousPage() {
    if (
      await this.previousButton.isDisabled()
    ) {
      return;
    }

    await Promise.all([
      this.page.waitForResponse(
        (response) =>
          response.url().includes(
            "/categories"
          )
      ),

      this.previousButton.click(),
    ]);
  }

  // ============================================================
  // Modal
  // ============================================================

  async openCreateModal() {
    await this.addCategoryButton.click();

    await expect(
      this.categoryNameInput
    ).toBeVisible();
  }

  async closeModalViaCancel() {
    await this.cancelButton.click();

    await this.modalIsClosed();
  }

  async closeModalViaEscape() {
    await this.page.keyboard.press(
      "Escape"
    );

    await this.modalIsClosed();
  }

  async modalIsOpen() {
    await expect(
      this.categoryNameInput
    ).toBeVisible();
  }

  async modalIsClosed() {
    await expect(
      this.categoryNameInput
    ).not.toBeVisible();
  }

  // ============================================================
  // Table
  // ============================================================

  getRowByName(
    categoryName: string
  ) {
    return this.table.locator(
      `tr:has-text("${categoryName}")`
    );
  }

  async openActionsMenu(
    categoryName: string
  ) {
    await this.getRowByName(
      categoryName
    )
      .getByRole("button", {
        name: "Open menu",
      })
      .click();
  }

  async getRowData(
    categoryName: string
  ) {
    const row =
      this.getRowByName(
        categoryName
      );

    return {
      name:
        (
          await row
            .locator("td")
            .nth(0)
            .textContent()
        )?.trim() ?? "",

      description:
        (
          await row
            .locator("td")
            .nth(1)
            .textContent()
        )?.trim() ?? "",

      quantity: Number(
        (
          await row
            .locator("td")
            .nth(2)
            .textContent()
        )?.trim() ?? "0"
      ),

      createdAt:
        (
          await row
            .locator("td")
            .nth(3)
            .textContent()
        )?.trim() ?? "",
    };
  }

  async getQuantity(
    categoryName: string
  ) {
    return (
      await this.getRowData(
        categoryName
      )
    ).quantity;
  }

  // ============================================================
  // Top Category
  // ============================================================

  async getTopCategoryInfo() {
    const name =
      (
        await this.topCategoryWidget
          .getByRole("paragraph")
          .textContent()
      )?.trim() ?? "";

    const quantityText =
      await this.topCategoryWidget
        .locator("span")
        .last()
        .textContent();

    return {
      name,

      quantity: Number(
        quantityText?.replace(
          /\D/g,
          ""
        ) ?? "0"
      ),
    };
  }

  // ============================================================
  // Validation
  // ============================================================

  async validateSuccessToast() {
    await expect(
      this.page.getByRole("alert")
    ).toContainText(
      /success/i
    );
  }

  async validateErrorToast() {
    await expect(
      this.page.getByRole("alert")
    ).toContainText(
      /error|failed|exists/i
    );
  }

  async validateErrorMessage(
    message: string | RegExp
  ) {
    await expect(
      this.page.getByText(
        message
      )
    ).toBeVisible();
  }
}