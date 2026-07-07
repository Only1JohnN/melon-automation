import { test, expect, loginAsPartner } from "@fixtures/baseTest";
import { CategoriesPage } from "@pages/partners/CategoriesPage";
import { createCategory } from "@test-data/factories/categoryFactory";

test.use({ storageState: 'playwright/.auth/partner.json' });

test.describe("@partners @categories @smoke", () => {
  let categoriesPage: CategoriesPage;

  test.beforeEach(async ({ page }) => {
    // await loginAsPartner(page);

    categoriesPage = new CategoriesPage(page);
    await categoriesPage.goto();
  });

  // --------------------------------------------------
  // Navigation
  // --------------------------------------------------

  test("should navigate to Categories page successfully", async ({
    page,
  }) => {
    await expect(page).toHaveURL(/inventory\/category/);

    await expect(
      categoriesPage.addCategoryButton
    ).toBeVisible();

    await expect(
      categoriesPage.searchInput
    ).toBeVisible();

    await expect(
      categoriesPage.table
    ).toBeVisible();
  });

  // --------------------------------------------------
  // Create Category
  // --------------------------------------------------

  test("should create category successfully", async () => {
    const category = createCategory();

    const response =
      await categoriesPage.createCategory(
        category.name,
        category.description
      );

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.status).toBe("success");

    const row =
      categoriesPage.getRowByName(
        category.name
      );

    await expect(row).toBeVisible();

    const rowData =
      await categoriesPage.getRowData(
        category.name
      );

    expect(
      rowData.description
    ).toContain(
      category.description!
    );

    expect(
      rowData.quantity
    ).toBe(0);

    expect(
      rowData.createdAt
    ).toContain(
      new Date()
        .toISOString()
        .split("T")[0]
    );
  });

  // --------------------------------------------------
  // API Validation
  // --------------------------------------------------

  test("should create category successfully via API", async () => {
    const category = createCategory();

    const response =
      await categoriesPage.createCategory(
        category.name,
        category.description
      );

    expect(response.status()).toBe(201);

    const body =
      await response.json();

    expect(body.status).toBe("success");

    expect(
      body.data.name
    ).toBe(category.name);

    expect(
      body.data.description
    ).toBe(category.description);

    expect(
      body.data
    ).toHaveProperty("id");
  });

  // --------------------------------------------------
  // Duplicate Validation
  // --------------------------------------------------

  test("should prevent duplicate category names", async () => {
    const category =
      createCategory();

    await categoriesPage.createCategory(
      category.name,
      category.description
    );

    const response =
      await categoriesPage.createCategory(
        category.name,
        category.description
      );

    expect(
      response.status()
    ).toBeGreaterThanOrEqual(400);

    const body =
      await response.json();

    expect(
      body.message
    ).toMatch(
      /already exists|duplicate/i
    );

    await categoriesPage.validateErrorToast();
  });

  // --------------------------------------------------
  // Edit Category
  // --------------------------------------------------

  test("should edit category description successfully", async () => {
    const category =
      createCategory();

    await categoriesPage.createCategory(
      category.name,
      category.description
    );

    const newDescription =
      `Updated ${Date.now()}`;

    const response =
      await categoriesPage.editCategory(
        category.name,
        newDescription
      );

    expect(
      response.status()
    ).toBe(200);

    const row =
      await categoriesPage.getRowData(
        category.name
      );

    expect(
      row.description
    ).toContain(
      newDescription
    );
  });

  // --------------------------------------------------
  // Search
  // --------------------------------------------------

  test("should search category using full name", async () => {
    const category =
      createCategory();

    await categoriesPage.createCategory(
      category.name,
      category.description
    );

    await categoriesPage.search(
      category.name
    );

    await expect(
      categoriesPage.getRowByName(
        category.name
      )
    ).toBeVisible();
  });

  test("should search category using partial name", async () => {
    const category =
      createCategory();

    await categoriesPage.createCategory(
      category.name,
      category.description
    );

    await categoriesPage.search(
      "AUTO-CAT"
    );

    await expect(
      categoriesPage.getRowByName(
        category.name
      )
    ).toBeVisible();
  });

  test("should return empty results when category does not exist", async () => {
    await categoriesPage.search(
      `INVALID-${Date.now()}`
    );

    await expect(
      categoriesPage.page.getByText(
        /No results/i
      )
    ).toBeVisible();
  });

  // --------------------------------------------------
  // Pagination
  // --------------------------------------------------

  test("should navigate between pages", async () => {
    if (
      await categoriesPage.nextButton.isDisabled()
    ) {
      test.skip();
    }

    await categoriesPage.goToNextPage();

    await expect(
      categoriesPage.previousButton
    ).toBeEnabled();

    await categoriesPage.goToPreviousPage();

    await expect(
      categoriesPage.nextButton
    ).toBeVisible();
  });

  // --------------------------------------------------
  // Form Validations
  // --------------------------------------------------
  
  test("should require category name", async () => {
    await categoriesPage.addCategoryButton.click();
  
    await categoriesPage.descriptionInput.fill(
      "Automation Description"
    );
  
    await categoriesPage.submitCategoryButton.click();
  
    await categoriesPage.validateErrorMessage(
      /category name/i
    );
  
    await categoriesPage.modalIsOpen();
  });
  
  test("should trim leading and trailing spaces from category name", async () => {
    const rawName = `   AUTO-CAT-${Date.now()}   `;
  
    await categoriesPage.createCategory(
      rawName,
      "Trim Validation"
    );
  
    await expect(
      categoriesPage.getRowByName(
        rawName.trim()
      )
    ).toBeVisible();
  });
  
  test("should prevent category name exceeding maximum length", async () => {
    const longName =
      "A".repeat(256);
  
    await categoriesPage.addCategoryButton.click();
  
    await categoriesPage.categoryNameInput.fill(
      longName
    );
  
    await categoriesPage.descriptionInput.fill(
      "Description"
    );
  
    await categoriesPage.submitCategoryButton.click();
  
    await categoriesPage.validateErrorMessage(
      /maximum|max length/i
    );
  });
  
  test("should prevent description exceeding maximum length", async () => {
    const category =
      createCategory();
  
    const description =
      "A".repeat(5001);
  
    await categoriesPage.addCategoryButton.click();
  
    await categoriesPage.categoryNameInput.fill(
      category.name
    );
  
    await categoriesPage.descriptionInput.fill(
      description
    );
  
    await categoriesPage.submitCategoryButton.click();
  
    await categoriesPage.validateErrorMessage(
      /maximum|max length/i
    );
  });
  
  test("should prevent creating category with only spaces", async () => {
    await categoriesPage.addCategoryButton.click();
  
    await categoriesPage.categoryNameInput.fill(
      "       "
    );
  
    await categoriesPage.submitCategoryButton.click();
  
    await categoriesPage.validateErrorMessage(
      /required|invalid/i
    );
  });
  
  test("should allow special characters in description", async () => {
    const category =
      createCategory();
  
    const response =
      await categoriesPage.createCategory(
        category.name,
        "@#$%^&*()_+?><:{}[]"
      );
  
    expect(
      response.status()
    ).toBe(201);
  
    const row =
      await categoriesPage.getRowData(
        category.name
      );
  
    expect(
      row.description
    ).toContain(
      "@#$%^"
    );
  });
  
  // --------------------------------------------------
  // Modal Behaviour
  // --------------------------------------------------
  
  test("should focus category name when modal opens", async () => {
    await categoriesPage.addCategoryButton.click();
  
    await expect(
      categoriesPage.categoryNameInput
    ).toBeFocused();
  });
  
  test("should close modal using Cancel button", async () => {
    await categoriesPage.addCategoryButton.click();
  
    await categoriesPage.closeModalViaCancel();
  
    await categoriesPage.modalIsClosed();
  });
  
  test("should close modal using Escape key", async () => {
    await categoriesPage.addCategoryButton.click();
  
    await categoriesPage.closeModalViaEscape();
  
    await categoriesPage.modalIsClosed();
  });
  
  test("should preserve entered values until modal closes", async () => {
    const category =
      createCategory();
  
    await categoriesPage.addCategoryButton.click();
  
    await categoriesPage.categoryNameInput.fill(
      category.name
    );
  
    await categoriesPage.descriptionInput.fill(
      category.description!
    );
  
    await expect(
      categoriesPage.categoryNameInput
    ).toHaveValue(
      category.name
    );
  
    await expect(
      categoriesPage.descriptionInput
    ).toHaveValue(
      category.description!
    );
  });
  
  // --------------------------------------------------
  // Keyboard Behaviour
  // --------------------------------------------------
  
  test("should submit category with Enter key", async () => {
    const category =
      createCategory();
  
    await categoriesPage.addCategoryButton.click();
  
    await categoriesPage.categoryNameInput.fill(
      category.name
    );
  
    await categoriesPage.descriptionInput.fill(
      category.description!
    );
  
    const responsePromise =
      categoriesPage.page.waitForResponse(
        response =>
          response.url().includes("/categories") &&
          response.request().method() === "POST"
      );
  
    await categoriesPage.descriptionInput.press(
      "Enter"
    );
  
    const response =
      await responsePromise;
  
    expect(
      response.status()
    ).toBe(201);
  
    await expect(
      categoriesPage.getRowByName(
        category.name
      )
    ).toBeVisible();
  });
  
  test("should tab through category modal correctly", async () => {
    await categoriesPage.addCategoryButton.click();
  
    await expect(
      categoriesPage.categoryNameInput
    ).toBeFocused();
  
    await categoriesPage.page.keyboard.press(
      "Tab"
    );
  
    await expect(
      categoriesPage.descriptionInput
    ).toBeFocused();
  
    await categoriesPage.page.keyboard.press(
      "Tab"
    );
  
    await expect(
      categoriesPage.submitCategoryButton
    ).toBeFocused();
  });
  
  // --------------------------------------------------
  // Server Error Handling
  // --------------------------------------------------
  
  test("should handle server error while creating category", async ({
    page,
  }) => {
    await page.route(
      "**/categories",
      async route => {
        await route.fulfill({
          status: 500,
          contentType:
            "application/json",
          body: JSON.stringify({
            message:
              "Internal Server Error",
          }),
        });
      }
    );
  
    const category =
      createCategory();
  
    await categoriesPage.addCategoryButton.click();
  
    await categoriesPage.categoryNameInput.fill(
      category.name
    );
  
    await categoriesPage.descriptionInput.fill(
      category.description!
    );
  
    await categoriesPage.submitCategoryButton.click();
  
    await categoriesPage.validateErrorToast();
  
    await categoriesPage.modalIsOpen();
  });
  
  // --------------------------------------------------
  // Actions Menu
  // --------------------------------------------------
  
  test("should display Edit option from action menu", async () => {
    const category =
      createCategory();
  
    await categoriesPage.createCategory(
      category.name,
      category.description
    );
  
    const row =
      categoriesPage.getRowByName(
        category.name
      );
  
    await row
      .getByRole("button", {
        name: /open menu/i,
      })
      .click();
  
    await expect(
      categoriesPage.page.getByRole(
        "menuitem",
        {
          name: "Edit",
        }
      )
    ).toBeVisible();
  });
  
  test("should display Delete option from action menu", async () => {
    const category =
      createCategory();
  
    await categoriesPage.createCategory(
      category.name,
      category.description
    );
  
    const row =
      categoriesPage.getRowByName(
        category.name
      );
  
    await row
      .getByRole("button", {
        name: /open menu/i,
      })
      .click();
  
    await expect(
      categoriesPage.page.getByRole(
        "menuitem",
        {
          name: "Delete",
        }
      )
    ).toBeVisible();
  });

  // --------------------------------------------------
  // Product Integration
  // --------------------------------------------------
  
  test("should increase category quantity after product creation", async ({
    page,
  }) => {
    const category = createCategory();
  
    await categoriesPage.createCategory(
      category.name,
      category.description
    );
  
    const initialQuantity =
      await categoriesPage.getQuantity(
        category.name
      );
  
    await page.goto(
      `${process.env.PARTNER_URL}/inventory/products`
    );
  
    await page.getByRole("button", {
      name: "Add Product",
    }).click();
  
    await page.getByRole("button", {
      name: "Single Product",
    }).click();
  
    const productName =
      `AUTO-PRODUCT-${Date.now()}`;
  
    await page
      .getByRole("textbox", {
        name: /Product name/i,
      })
      .fill(productName);
  
    await page
      .getByRole("combobox", {
        name: /Category/i,
      })
      .selectOption({
        label: category.name,
      });
  
    await page
      .getByRole("spinbutton", {
        name: /Cost Price/i,
      })
      .fill("1000");
  
    await page
      .getByRole("spinbutton", {
        name: /Selling Price/i,
      })
      .fill("1500");
  
    await page
      .getByRole("spinbutton", {
        name: /Stock Quantity/i,
      })
      .fill("20");
  
    const createProduct =
      page.waitForResponse(
        response =>
          response.url().includes("/products") &&
          response.request().method() ===
            "POST"
      );
  
    await page
      .getByRole("button", {
        name: /Add Product/i,
        exact: true,
      })
      .click();
  
    const response =
      await createProduct;
  
    expect(
      response.status()
    ).toBe(201);
  
    await categoriesPage.goto();
  
    const updatedQuantity =
      await categoriesPage.getQuantity(
        category.name
      );
  
    expect(
      updatedQuantity
    ).toBeGreaterThan(
      initialQuantity
    );
  });
  
  // --------------------------------------------------
  // Quantity Integrity
  // --------------------------------------------------
  
  test("should keep quantity at zero when category has no products", async () => {
    const category =
      createCategory();
  
    await categoriesPage.createCategory(
      category.name,
      category.description
    );
  
    const quantity =
      await categoriesPage.getQuantity(
        category.name
      );
  
    expect(quantity).toBe(0);
  });
  
  test("should display correct quantity after multiple product creations", async ({
    page,
  }) => {
    const category =
      createCategory();
  
    await categoriesPage.createCategory(
      category.name,
      category.description
    );
  
    for (
      let i = 0;
      i < 2;
      i++
    ) {
      await page.goto(
        `${process.env.PARTNER_URL}/inventory/products`
      );
  
      await page.getByRole(
        "button",
        {
          name:
            "Add Product",
        }
      ).click();
  
      await page.getByRole(
        "button",
        {
          name:
            "Single Product",
        }
      ).click();
  
      await page
        .getByRole(
          "textbox",
          {
            name: /Product name/i,
          }
        )
        .fill(
          `AUTO-${Date.now()}-${i}`
        );
  
      await page
        .getByRole(
          "combobox",
          {
            name:
              /Category/i,
          }
        )
        .selectOption({
          label:
            category.name,
        });
  
      await page
        .getByRole(
          "spinbutton",
          {
            name:
              /Cost Price/i,
          }
        )
        .fill("1000");
  
      await page
        .getByRole(
          "spinbutton",
          {
            name:
              /Selling Price/i,
          }
        )
        .fill("1500");
  
      await page
        .getByRole(
          "spinbutton",
          {
            name:
              /Stock Quantity/i,
          }
        )
        .fill("10");
  
      await Promise.all([
        page.waitForResponse(
          response =>
            response
              .url()
              .includes(
                "/products"
              ) &&
            response.request().method() ===
              "POST"
        ),
        page
          .getByRole(
            "button",
            {
              name:
                /Add Product/i,
              exact: true,
            }
          )
          .click(),
      ]);
    }
  
    await categoriesPage.goto();
  
    const quantity =
      await categoriesPage.getQuantity(
        category.name
      );
  
    expect(
      quantity
    ).toBeGreaterThanOrEqual(
      2
    );
  });
  
  // --------------------------------------------------
  // Top Category Widget
  // --------------------------------------------------
  
  test("should display category with highest quantity as Top Category", async ({
    page,
  }) => {
    const category =
      createCategory();
  
    await categoriesPage.createCategory(
      category.name,
      category.description
    );
  
    // create several products here
    // (reuse your ProductPage helper instead)
  
    await categoriesPage.goto();
  
    const top =
      await categoriesPage.getTopCategoryInfo();
  
    expect(top.name).toBe(
      category.name
    );
  
    expect(
      top.quantity
    ).toBeGreaterThan(0);
  });
  
  // --------------------------------------------------
  // Date Validation
  // --------------------------------------------------
  
  test("should display today's creation date", async () => {
    const category =
      createCategory();
  
    await categoriesPage.createCategory(
      category.name,
      category.description
    );
  
    const row =
      await categoriesPage.getRowData(
        category.name
      );
  
    const today =
      new Date()
        .toISOString()
        .split("T")[0];
  
    expect(
      row.createdAt
    ).toContain(today);
  });
  
  // --------------------------------------------------
  // Sorting
  // --------------------------------------------------
  
  test("should keep newest category at the top after creation", async () => {
    const category =
      createCategory();
  
    await categoriesPage.createCategory(
      category.name,
      category.description
    );
  
    const firstRow =
      categoriesPage.table
        .locator("tbody tr")
        .first();
  
    await expect(
      firstRow
    ).toContainText(
      category.name
    );
  });
  
  // --------------------------------------------------
  // Refresh Persistence
  // --------------------------------------------------
  
  test("should persist created category after page refresh", async () => {
    const category =
      createCategory();
  
    await categoriesPage.createCategory(
      category.name,
      category.description
    );
  
    await categoriesPage.page.reload();
  
    await categoriesPage.waitForPageLoad();
  
    await expect(
      categoriesPage.getRowByName(
        category.name
      )
    ).toBeVisible();
  });
  
  // --------------------------------------------------
  // Search Persistence
  // --------------------------------------------------
  
  test("should clear search and restore full category list", async () => {
    const category =
      createCategory();
  
    await categoriesPage.createCategory(
      category.name,
      category.description
    );
  
    await categoriesPage.search(
      category.name
    );
  
    await expect(
      categoriesPage.getRowByName(
        category.name
      )
    ).toBeVisible();
  
    await categoriesPage.searchInput.clear();
  
    await categoriesPage.searchInput.press(
      "Enter"
    );
  
    await expect(
      categoriesPage.table
        .locator("tbody tr")
        .first()
    ).toBeVisible();
  });
  
  // --------------------------------------------------
  // Regression
  // --------------------------------------------------
  
  test("should not duplicate category after browser refresh", async () => {
    const category =
      createCategory();
  
    await categoriesPage.createCategory(
      category.name,
      category.description
    );
  
    await categoriesPage.page.reload();
  
    const rows =
      categoriesPage
        .getRowByName(
          category.name
        );
  
    await expect(rows)
      .toHaveCount(1);
  });
  
  test("should retain updated description after refresh", async () => {
    const category =
      createCategory();
  
    await categoriesPage.createCategory(
      category.name,
      category.description
    );
  
    const updated =
      `Updated-${Date.now()}`;
  
    await categoriesPage.editCategory(
      category.name,
      updated
    );
  
    await categoriesPage.page.reload();
  
    const row =
      await categoriesPage.getRowData(
        category.name
      );
  
    expect(
      row.description
    ).toContain(updated);
  });
  
  // --------------------------------------------------
  // API Integrity
  // --------------------------------------------------
  
  test("should return correct payload after category creation", async () => {
    const category =
      createCategory();
  
    const response =
      await categoriesPage.createCategory(
        category.name,
        category.description
      );
  
    const body =
      await response.json();
  
    expect(body.status).toBe(
      "success"
    );
  
    expect(
      body.data.id
    ).toBeDefined();
  
    expect(
      body.data.name
    ).toBe(category.name);
  
    expect(
      body.data.description
    ).toBe(
      category.description
    );
  });
  
  test("should return updated payload after editing category", async () => {
    const category =
      createCategory();
  
    await categoriesPage.createCategory(
      category.name,
      category.description
    );
  
    const updated =
      `Automation-${Date.now()}`;
  
    const response =
      await categoriesPage.editCategory(
        category.name,
        updated
      );
  
    const body =
      await response.json();
  
    expect(body.status).toBe(
      "success"
    );
  
    expect(
      body.data.description
    ).toBe(updated);
  });
});