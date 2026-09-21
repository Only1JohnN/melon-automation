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

  test.fixme("should add a new store location", async ({ page }) => {
    // TODO(qa): not run because it creates permanent data — the UI has no delete/remove for a location,
    // so every run would add another branch to the shared QA merchant. Also depends on the Google Places
    // address suggestions. Cover it once there is a delete (or a throwaway merchant): open "Add another
    // location" -> pick a manager -> type an address and choose the first suggestion -> pick an opening
    // hours preset -> Continue -> the new address appears in the table and in GET /branches.
    const locations = new LocationSettingsPage(page);
    await locations.open();
    await locations.openAddLocation();
    await locations.chooseTradingAddress();
  });

  test.fixme("should edit an existing store location", async () => {
    // TODO(qa): the row's Edit button is present but the edit form hasn't been walked through yet.
  });
});
