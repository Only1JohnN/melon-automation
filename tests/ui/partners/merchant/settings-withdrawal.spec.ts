import { test, expect } from "../../../../fixtures/baseTest";
import { env } from "../../../../config/environment";

test.describe("@partners @settings @withdrawal-bank", () => {
  test("should list the withdrawal bank accounts exactly as the API returns them", async ({ page, api }) => {
    await page.goto(`${env.partnerUrl}/simple/settings/withdrawal`);
    await api.login();

    const accounts = (await api.accounts()).body.data.result as any[];
    const rows = page.locator("table tbody tr");

    await expect(rows.first()).toBeVisible({ timeout: 30_000 });
    for (const column of ["Bank name", "Account number", "Account name", "Status"]) {
      await expect(page.getByRole("columnheader", { name: column })).toBeVisible();
    }

    // The page lists 10 per page, newest first; the API has them all.
    const firstPage = accounts.slice(0, 10);
    await expect(rows).toHaveCount(Math.min(10, accounts.length));

    for (const [index, account] of firstPage.entries()) {
      const cells = await rows.nth(index).locator("td").allInnerTexts();
      // The page capitalises every word of the bank name ("United Bank For Africa").
      expect(cells[0].trim().toLowerCase(), `row ${index + 1} bank`).toBe(account.bank_name.toLowerCase());
      expect(cells[1].trim(), `row ${index + 1} account number`).toBe(account.account_number);
      expect(cells[2].trim(), `row ${index + 1} account name`).toBe(account.account_name);
      expect(cells[3].trim().toLowerCase(), `row ${index + 1} status`).toBe(account.status);
    }
  });

  test("should only use the known statuses", async ({ page }) => {
    await page.goto(`${env.partnerUrl}/simple/settings/withdrawal`);
    const rows = page.locator("table tbody tr");
    await expect(rows.first()).toBeVisible({ timeout: 30_000 });

    // Rows first appear as empty placeholders; read the statuses once they have filled in.
    await expect(async () => {
      const statuses = (await rows.locator("td:nth-child(4)").allInnerTexts()).map((s) => s.trim().toLowerCase());
      expect(statuses.length).toBeGreaterThan(0);
      for (const status of statuses) {
        expect(["pending", "verified", "deactivated"]).toContain(status);
      }
    }).toPass({ timeout: 20_000 });
  });

  test("should page through the bank accounts when there are more than ten", async ({ page, api }) => {
    await page.goto(`${env.partnerUrl}/simple/settings/withdrawal`);
    await api.login();
    const total = ((await api.accounts()).body.data.result as any[]).length;
    test.skip(total <= 10, "Only one page of bank accounts");

    const rows = page.locator("table tbody tr");
    await expect(rows.first()).toBeVisible({ timeout: 30_000 });
    const firstOnPageOne = (await rows.first().innerText()).trim();

    await page.getByRole("button", { name: "2", exact: true }).click();
    await expect.poll(async () => (await rows.first().innerText()).trim()).not.toBe(firstOnPageOne);
    await expect(rows).toHaveCount(total - 10 > 10 ? 10 : total - 10);

    await page.getByRole("button", { name: "Previous" }).click();
    await expect.poll(async () => (await rows.first().innerText()).trim()).toBe(firstOnPageOne);
  });

  test("should open the add-bank form from Add Withdrawal Bank", async ({ page }) => {
    await page.goto(`${env.partnerUrl}/simple/settings/withdrawal`);
    await expect(page.locator("table tbody tr").first()).toBeVisible({ timeout: 30_000 });

    await page.getByRole("button", { name: "Add Withdrawal Bank" }).click();

    await expect(page.getByText("Enter details to connect your withdrawal bank account.")).toBeVisible();
    await expect(page.getByPlaceholder("Enter 10-digit account number")).toBeDisabled();
    await expect(page.getByRole("button", { name: "Add Bank", exact: true })).toBeDisabled();
  });

});
