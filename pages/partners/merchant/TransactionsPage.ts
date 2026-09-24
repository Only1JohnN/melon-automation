import { expect, Locator, Page, test } from "@playwright/test";
import { MerchantPage } from "./MerchantPage";
import { TransactionTable } from "./components/TransactionTable";
import { parseNaira } from "../../../utils/money";
import { activate } from "../../../utils/responsive";

export type Range = "daily" | "weekly" | "monthly";

export interface WithdrawalRecord {
  date: string;
  reference: string;
  bank: string;
  amount: number;
  status: string;
}

export class MerchantTransactionsPage extends MerchantPage {
  readonly path = "/simple/transactions";

  readonly historyTab: Locator;
  readonly withdrawalsTab: Locator;
  readonly withdrawalHistoryHeading: Locator;
  readonly transactions: TransactionTable;
  readonly nextButton: Locator;
  readonly previousButton: Locator;

  /** The stats period control: reads "All Time" until a range is chosen, then e.g. "24 Sep 2026 – 24 Sep 2026". */
  readonly rangeControl: Locator;
  /** The list's date filter: reads "Date" until a day is picked, then e.g. "Sep 24, 2026". */
  readonly dateFilter: Locator;
  readonly calendar: Locator;

  readonly searchInput: Locator;
  readonly statusFilter: Locator;

  constructor(page: Page) {
    super(page);

    this.historyTab = page.getByText("Transaction History", { exact: true });
    this.withdrawalsTab = page.getByText("Withdrawal Requests", { exact: true });
    this.withdrawalHistoryHeading = page.getByText("Withdrawal History");
    this.transactions = new TransactionTable(page);
    this.nextButton = page.getByRole("button", { name: "Next" });
    this.previousButton = page.getByRole("button", { name: "Previous" });

    this.rangeControl = page.getByRole("button", {
      name: /^(all time|\d{1,2} [A-Za-z]{3} \d{4}\s*[–-]\s*\d{1,2} [A-Za-z]{3} \d{4})$/i,
    });
    // The withdrawal tab keeps its own (hidden) date button in the page, so only the one on screen counts.
    this.dateFilter = page.getByRole("button", { name: /^(date|[a-z]{3} \d{1,2}, \d{4}.*)$/i }).filter({ visible: true });
    this.calendar = page.getByRole("dialog");

    this.searchInput = page.getByPlaceholder("Search by reference");
    this.statusFilter = page.getByRole("combobox").first();
  }

  async waitUntilReady() {
    await expect(this.page.getByText(/^MELON-\d+$/).locator("visible=true").first()).toBeVisible({
      timeout: 30_000,
    });
  }

  rangeButton(range: Range) {
    return this.page.getByRole("button", { name: new RegExp(`^${range}$`, "i") });
  }

  pageButton(n: number) {
    return this.page.getByRole("button", { name: String(n), exact: true });
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

  // The list re-renders when its data arrives, which can close a popover that was opened a moment too early,
  // so open it again until the calendar stays up.
  async openDateFilter() {
    await this.openCalendarWith(() => this.dateFilter.first());
  }

  async openRangeControl() {
    await this.openCalendarWith(() => this.rangeControl);
  }

  private async openCalendarWith(control: () => Locator) {
    await expect(async () => {
      if (!(await this.calendar.isVisible())) {
        await activate(this.page, control());
      }
      await expect(this.calendar).toBeVisible({ timeout: 2_000 });
    }).toPass({ timeout: 20_000 });
  }

  /**
   * Finds a payment by reference, looking at the next pages when it isn't on the first one: other tests that run at
   * the same time create payment links too, and each new link pushes older rows further down the list.
   */
  async findReference(reference: string, maxPages = 4) {
    for (let n = 1; n <= maxPages; n++) {
      if (n > 1) {
        if ((await this.pageButton(n).count()) === 0) break;
        await this.goToPage(n);
      }

      const row = await this.transactions.find(reference);
      if (row) return row;
    }

    return undefined;
  }

  async firstReference() {
    return (await this.transactions.record(0)).reference;
  }

  async openWithdrawals() {
    await test.step("Open the Withdrawal Requests tab", async () => {
      await this.withdrawalsTab.click();
      await expect(this.withdrawalHistoryHeading).toBeVisible();
    });
  }

  /**
   * Picks a day in the range calendar (first click = start, second = end, same day twice = one day).
   * Only days 4-27 are unambiguous: the calendar also shows the neighbouring months' days around the edges.
   */
  async pickDays(startDay: number, endDay = startDay) {
    await test.step(`Pick ${startDay === endDay ? `day ${startDay}` : `days ${startDay}–${endDay}`} in the calendar`, async () => {
      const month = this.calendar.locator("table").first();
      await month.getByRole("gridcell", { name: String(startDay), exact: true }).first().click();
      await month.getByRole("gridcell", { name: String(endDay), exact: true }).first().click();
    });
  }

  /** The withdrawal requests on screen, read from the table on large screens and from the cards on phones. */
  async withdrawalRecords(): Promise<WithdrawalRecord[]> {
    const table = this.page.locator("table:visible").first();
    return (await table.count()) > 0 ? this.withdrawalRowsFromTable(table) : this.withdrawalRecordsFromCards();
  }

  private async withdrawalRowsFromTable(table: Locator): Promise<WithdrawalRecord[]> {
    const headers = (await table.locator("thead th").allInnerTexts()).map((h) => h.trim().toLowerCase());
    const rows = await table.locator("tbody tr").all();
    const records: WithdrawalRecord[] = [];

    for (const row of rows) {
      const cells = await row.locator("td").allInnerTexts();
      const cell = (name: string) => {
        const index = headers.findIndex((h) => h.includes(name));
        return index >= 0 ? (cells[index] ?? "").trim() : "";
      };

      if (!cell("reference")) continue; // empty-state / skeleton row

      records.push({
        date: cell("date"),
        reference: cell("reference"),
        bank: cell("bank"),
        amount: parseNaira(cell("amount") || "0"),
        status: cell("status").toLowerCase(),
      });
    }

    return records;
  }

  /** A phone card reads: reference, status, bank ("N/A" when none), "Aug 19, 2026 • 06:46 AM", amount. */
  private async withdrawalRecordsFromCards(): Promise<WithdrawalRecord[]> {
    const cards = this.page.locator("div.md\\:hidden > div").filter({ hasText: /ML-\w+-\d+/ }).filter({ visible: true });
    const records: WithdrawalRecord[] = [];

    for (const card of await cards.all()) {
      const lines = (await card.innerText()).split("\n").map((l) => l.trim()).filter(Boolean);
      const reference = lines.find((l) => /^ML-\w+-\d+$/.test(l));
      const status = lines.find((l) => /^(success(ful)?|pending|failed)$/i.test(l));
      const date = lines.find((l) => /\d{4}/.test(l) && /\d{1,2}:\d{2}/.test(l));
      const amount = lines.find((l) => l.includes("₦"));
      if (!reference) continue;

      const bank = lines.find((l) => ![reference, status, date, amount].includes(l));

      records.push({
        date: date ?? "",
        reference,
        bank: bank ?? "",
        amount: parseNaira(amount ?? "0"),
        status: (status ?? "").toLowerCase(),
      });
    }

    return records;
  }
}
