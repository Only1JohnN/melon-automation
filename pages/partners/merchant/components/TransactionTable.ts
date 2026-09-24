import { Locator, Page } from "@playwright/test";
import { parseNaira } from "../../../../utils/money";

export interface TransactionRecord {
  customer: string;
  reference: string;
  amount: number;
  coins: number;
  /** "Date Updated" as displayed (e.g. "2026-09-23 23:54"), null if the layout doesn't show one. */
  date: string | null;
  status: string;
}

const STATUS = /successful|pending|expired|failed/i;

/**
 * The merchant's transaction list, however it is laid out. Desktop/tablet render a <table>; phones swap
 * it for cards. Columns are found by header name, so a new column (like "Date Updated") can't shift
 * the others, and every test can read the same TransactionRecord in either layout.
 */
export class TransactionTable {
  readonly table: Locator;
  readonly rows: Locator;
  readonly cards: Locator;

  constructor(private readonly page: Page, scope?: Locator) {
    const root = scope ?? page.locator("body");

    this.table = root.locator("table:visible").first();
    this.rows = root.locator("table:visible tbody tr");
    // One card per reference; the card is the block that holds reference+date, coins+amount and customer+status.
    this.cards = root.getByText(/^MELON-\d+$/).locator("visible=true").locator("xpath=../..");
  }

  async usesCards() {
    return (await this.table.count()) === 0;
  }

  async count() {
    return (await this.usesCards()) ? this.cards.count() : this.rows.count();
  }

  async headers(): Promise<string[]> {
    const texts = await this.table.locator("thead th").allInnerTexts();
    return texts.map((text) => text.trim().toLowerCase());
  }

  async record(index: number): Promise<TransactionRecord> {
    return (await this.usesCards()) ? this.readCard(this.cards.nth(index)) : this.readRow(this.rows.nth(index));
  }

  async records(limit?: number): Promise<TransactionRecord[]> {
    const total = await this.count();
    const count = limit === undefined ? total : Math.min(limit, total);
    const records: TransactionRecord[] = [];

    for (let i = 0; i < count; i++) {
      records.push(await this.record(i));
    }

    return records;
  }

  /** The row/card for one reference (undefined if it isn't on screen). */
  async find(reference: string): Promise<TransactionRecord | undefined> {
    return (await this.records()).find((record) => record.reference === reference);
  }

  private async readRow(row: Locator): Promise<TransactionRecord> {
    const headers = await this.headers();
    const cells = await row.locator("td").allInnerTexts();
    const cell = (...names: string[]) => {
      const index = headers.findIndex((header) => names.some((name) => header.includes(name)));
      return index >= 0 ? (cells[index] ?? "").trim() : "";
    };

    return {
      customer: cell("customer").replace(/^[A-Z]{1,2}\s+/, "").trim(),
      reference: cell("reference"),
      amount: parseNaira(cell("amount") || "0"),
      coins: parseNaira(cell("reward", "coin") || "0"),
      date: cell("date") || null,
      status: cell("status").toLowerCase(),
    };
  }

  private async readCard(card: Locator): Promise<TransactionRecord> {
    const text = await card.innerText();
    const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);

    return {
      customer: lines[1] ?? "",
      reference: text.match(/MELON-\d+/)?.[0] ?? "",
      amount: parseNaira(text.match(/₦[\d,.]+/)?.[0] ?? "0"),
      coins: parseNaira(text.match(/\+([\d,.]+)\s*Coins/i)?.[1] ?? "0"),
      date:
        text.match(/\d{4}-\d{2}-\d{2}(?:\s+\d{2}:\d{2})?/)?.[0] ??
        text.match(/[A-Z][a-z]{2} \d{1,2}, \d{4}/)?.[0] ??
        null,
      status: (text.match(STATUS)?.[0] ?? "").toLowerCase(),
    };
  }
}
