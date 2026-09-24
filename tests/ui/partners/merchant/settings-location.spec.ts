import { LocationSettingsPage } from "../../../../pages/partners/merchant/settings/LocationSettingsPage";
import { test, expect } from "../../../../fixtures/baseTest";

test.describe("@partners @settings @location", () => {
  test("should list the store locations with their address", async ({ page }) => {
    const locations = new LocationSettingsPage(page);

    await locations.open();

    await expect(page.getByText("Store locations")).toBeVisible();
    await expect(locations.rows.first()).toBeVisible();
    expect((await locations.addressOfRow(0)).length).toBeGreaterThan(5);
    await expect(locations.rows.first().getByRole("button", { name: "Edit" })).toBeVisible();
  });

  test("should open the add-location dialog with manager, address and opening hours", async ({
    page,
  }) => {
    const locations = new LocationSettingsPage(page);

    await locations.open();
    await locations.openAddLocation();
    await locations.chooseTradingAddress();

    await expect(page.getByText("Select manager")).toBeVisible();
    await expect(page.getByText(/start typing, then select an address/i)).toBeVisible();

    for (const preset of ["Business hours", "Retail hours", "Restaurant hours", "Custom"]) {
      await expect(page.getByText(preset, { exact: true })).toBeVisible();
    }

    await locations.dialogCancel.click();
    await expect(locations.dialogHeading).toBeHidden();
  });

  test("should open the edit form for a store location with its address filled in", async ({ page }) => {
    const locations = new LocationSettingsPage(page);

    await locations.open();
    const address = await locations.addressOfRow(0);

    await locations.rows.first().getByRole("button", { name: "Edit" }).click();

    await expect(page.getByText("Edit Branch")).toBeVisible();
    await expect(page.getByText("Branch Manager")).toBeVisible();
    await expect(page.getByPlaceholder("Enter address")).toHaveValue(new RegExp(address.split(",")[0], "i"));
    for (const preset of ["Business hours", "Retail hours", "Restaurant hours", "Custom"]) {
      await expect(page.getByText(preset, { exact: true })).toBeVisible();
    }

    await locations.dialogCancel.click();
    await expect(page.getByText("Edit Branch")).toBeHidden();
  });
});
