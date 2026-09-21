import { expect, Locator, Page, test } from "@playwright/test";
import { MerchantPage } from "./MerchantPage";
import { parseNaira } from "../../../utils/money";

export type StatLabel = "Revenue" | "Transactions" | "Customers rewarded" | "Repeat customers";

export interface TransactionRow {
  customer: string;
  reference: string;
  amount: number;
  coins: number;
  status: string;
}

export interface TransactionCard extends TransactionRow {
  date: string;
}

export class MerchantHomePage extends MerchantPage {
  readonly path = "/simple/home";

  readonly greeting: Locator;
  readonly balanceCard: Locator;
  readonly balanceAmount: Locator;
  readonly hideBalanceButton: Locator;
  readonly showBalanceButton: Locator;
  readonly withdrawButton: Locator;
  readonly viewStatementButton: Locator;
  readonly addBankAccountButton: Locator;

  readonly sharePaymentLinkCard: Locator;
  readonly qrCodeCard: Locator;

  readonly shareModalHeading: Locator;
  readonly shareModalCopyLink: Locator;
  readonly shareModalShare: Locator;
  readonly shareModalShowQr: Locator;

  readonly viewAllTransactions: Locator;
  readonly recentRows: Locator;
  /** On phones the table is swapped for cards: reference + date, coins + amount, customer + status. */
  readonly recentCards: Locator;

  constructor(page: Page) {
    super(page);

    this.greeting = page.getByText(/^Good (morning|afternoon|evening)/i);
    this.balanceCard = page.getByText("Available Balance").locator("xpath=../..");
    this.balanceAmount = this.balanceCard.locator("h2");
    this.hideBalanceButton = page.getByRole("button", { name: "Hide balance" });
    this.showBalanceButton = page.getByRole("button", { name: "Show balance" });
    this.withdrawButton = page.getByRole("button", { name: "Withdraw to bank" });
    this.viewStatementButton = page.getByRole("button", { name: "View statement" });
    this.addBankAccountButton = page.getByRole("button", { name: "Add bank account" });

    this.sharePaymentLinkCard = page.getByRole("button", { name: /^Share payment link/ });
    this.qrCodeCard = page.getByRole("button", { name: /^QR code/ });

    this.shareModalHeading = page.getByText("Share your payment link");
    this.shareModalCopyLink = page.getByRole("button", { name: "Copy link" });
    this.shareModalShare = page.getByRole("button", { name: "Share", exact: true });
    this.shareModalShowQr = page.getByText("Show the QR code instead");

    this.viewAllTransactions = page.getByRole("button", { name: "View all" });
    this.recentRows = page.locator("table tbody tr");
    this.recentCards = page
      .getByText(/^MELON-\d+$/)
      .locator("visible=true")
      .locator("xpath=../..");
  }

  async waitUntilReady() {
    await expect(this.balanceAmount).toBeVisible({ timeout: 30_000 });
    await expect(this.recentRows.first().locator("td").nth(1)).toContainText("MELON-", { timeout: 30_000 });
  }

  /**
   * The card = the innermost block holding both the label and a value (<h3>). The label text alone is
   * ambiguous: the navigation (rendered inside <main> on phones) also says "Transactions".
   */
  statCard(label: StatLabel): Locator {
    return this.page
      .locator("div")
      .filter({ has: this.page.locator("h3") })
      .filter({ has: this.page.getByText(label, { exact: true }) })
      .last();
  }

  async statValue(label: StatLabel): Promise<number> {
    return parseNaira(await this.statCard(label).locator("h3").innerText());
  }

  async balance(): Promise<number> {
    return parseNaira(await this.balanceAmount.innerText());
  }

  /** "customer.getmelon.co/pay/melon-qa-bot" as shown on the Get Paid card (no protocol). */
  async paymentLinkText(): Promise<string> {
    const text = await this.sharePaymentLinkCard.innerText();
    return text.match(/customer\.\S+/)?.[0] ?? "";
  }

  rowFor(reference: string): Locator {
    return this.recentRows.filter({ hasText: reference });
  }

  async readRow(row: Locator): Promise<TransactionRow> {
    const cells = row.locator("td");
    return {
      customer: (await cells.nth(0).innerText()).replace(/^[A-Z]{2}\s*/, "").trim(),
      reference: (await cells.nth(1).innerText()).trim(),
      amount: parseNaira(await cells.nth(2).innerText()),
      coins: parseNaira(await cells.nth(3).innerText()),
      status: (await cells.nth(4).innerText()).trim().toLowerCase(),
    };
  }

  async readCard(card: Locator): Promise<TransactionCard> {
    const text = await card.innerText();
    const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);

    return {
      customer: lines[1] ?? "",
      reference: text.match(/MELON-\d+/)?.[0] ?? "",
      date: text.match(/[A-Z][a-z]{2} \d{1,2}, \d{4}/)?.[0] ?? "",
      amount: parseNaira(text.match(/₦[\d,.]+/)?.[0] ?? "0"),
      coins: parseNaira(text.match(/\+([\d,.]+) Coins/)?.[1] ?? "0"),
      status: (text.match(/successful|pending|expired|failed/i)?.[0] ?? "").toLowerCase(),
    };
  }

  async toggleBalanceVisibility() {
    await test.step("Toggle balance visibility (eye icon)", async () => {
      if (await this.hideBalanceButton.isVisible()) {
        await this.hideBalanceButton.click();
      } else {
        await this.showBalanceButton.click();
      }
      // The amount cross-fades, so for a moment both the old and new <h2> exist.
      await expect(this.balanceAmount).toHaveCount(1);
    });
  }

  async openShareModal() {
    await test.step("Open the Share payment link modal", async () => {
      await this.sharePaymentLinkCard.click();
      await expect(this.shareModalHeading).toBeVisible();
    });
  }
}
