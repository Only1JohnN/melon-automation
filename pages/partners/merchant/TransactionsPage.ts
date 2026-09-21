import { expect, Locator, Page, test } from "@playwright/test";
import { MerchantPage } from "./MerchantPage";

export type Range = "daily" | "weekly" | "monthly";

export class MerchantTransactionsPage extends MerchantPage {
  readonly path = "/simple/transactions";

  readonly historyTab: Locator;
  readonly withdrawalsTab: Locator;
  readonly rows: Locator;
  readonly nextButton: Locator;
  readonly previousButton: Locator;
  readonly withdrawalHistoryHeading: Locator;
  /** Phone layout: the table becomes cards. */
  readonly cards: Locator;

  constructor(page: Page) {
    super(page);

    this.historyTab = page.getByText("Transaction History", { exact: true });
    this.withdrawalsTab = page.getByText("Withdrawal Requests", { exact: true });
    this.rows = page.locator("table tbody tr");
    this.nextButton = page.getByRole("button", { name: "Next" });
    this.previousButton = page.getByRole("button", { name: "Previous" });
    this.withdrawalHistoryHeading = page.getByText("Withdrawal History");
    this.cards = page.getByText(/^MELON-\d+$/).locator("visible=true").locator("xpath=../..");
  }

  pageButton(n: number) {
    return this.page.getByRole("button", { name: String(n), exact: true });
  }

  async waitUntilReady() {
    // Rows first render as an empty skeleton; wait until real data is in.
    await expect(this.rows.first().locator("td").nth(1)).toContainText("MELON-", { timeout: 30_000 });
  }

  rangeButton(range: Range) {
    return this.page.getByRole("button", { name: new RegExp(`^${range}$`, "i") });
  }

  /** Picks a time range and resolves with the overview API response the page made for it. */
  async selectRange(range: Range) {
    return test.step(`Filter the stats by ${range}`, async () => {
      const [response] = await Promise.all([
        this.page.waitForResponse(
          (res) => /\/overview\?startDate=/.test(res.url()) && res.request().method() === "GET"
        ),
        this.rangeButton(range).click(),
      ]);
      return response;
    });
  }

  async goToPage(n: number) {
    return test.step(`Go to page ${n} of transactions`, async () => {
      const [response] = await Promise.all([
        this.page.waitForResponse((res) => new RegExp(`transactions\\?page=${n}`).test(res.url())),
        this.pageButton(n).click(),
      ]);
      return response;
    });
  }

  async goToNextPage() {
    return test.step("Go to the next page of transactions", async () => {
      const [response] = await Promise.all([
        this.page.waitForResponse((res) => /transactions\?page=2/.test(res.url())),
        this.nextButton.click(),
      ]);
      return response;
    });
  }

  async goToPreviousPage() {
    return test.step("Go back to the previous page of transactions", async () => {
      const [response] = await Promise.all([
        this.page.waitForResponse((res) => /transactions\?page=1/.test(res.url())),
        this.previousButton.click(),
      ]);
      return response;
    });
  }

  async firstReference() {
    return (await this.rows.first().locator("td").nth(1).innerText()).trim();
  }

  async openWithdrawals() {
    await test.step("Open the Withdrawal Requests tab", async () => {
      await this.withdrawalsTab.click();
      await expect(this.withdrawalHistoryHeading).toBeVisible();
    });
  }
}
