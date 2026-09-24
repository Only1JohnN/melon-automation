import { activate } from "../../../utils/responsive";
import { expect, Locator, Page, test } from "@playwright/test";
import { MerchantPage } from "./MerchantPage";
import { TransactionTable } from "./components/TransactionTable";
import { parseNaira } from "../../../utils/money";

export type StatLabel = "Revenue" | "Transactions" | "Customers rewarded" | "Repeat customers";

export class MerchantHomePage extends MerchantPage {
  readonly path = "/simple/home";

  readonly greeting: Locator;
  readonly balanceCard: Locator;
  readonly balanceAmount: Locator;
  readonly hideBalanceButton: Locator;
  readonly showBalanceButton: Locator;
  readonly withdrawButton: Locator;
  readonly viewStatementButton: Locator;

  // Shown inside the balance card after "Withdraw to bank" when there is no verified bank account.
  readonly noBankTitle: Locator;
  readonly addBankAccountButton: Locator;
  readonly addBankIntro: Locator;
  readonly bankSelect: Locator;
  readonly bankSearch: Locator;
  readonly accountNumberInput: Locator;
  readonly addBankSubmit: Locator;

  readonly sharePaymentLinkCard: Locator;
  readonly qrCodeCard: Locator;

  readonly shareModalHeading: Locator;
  readonly shareModalCopyLink: Locator;
  readonly shareModalShare: Locator;
  readonly shareModalShowQr: Locator;

  readonly qrModalHeading: Locator;
  readonly qrModalImage: Locator;
  readonly qrModalPrint: Locator;
  readonly qrModalDownload: Locator;
  readonly qrModalClose: Locator;
  readonly qrModalTips: Locator;

  readonly viewAllTransactions: Locator;
  readonly transactions: TransactionTable;

  constructor(page: Page) {
    super(page);

    this.greeting = page.getByText(/^Good (morning|afternoon|evening)/i);
    this.balanceCard = page.getByText("Available Balance").locator("xpath=../..");
    this.balanceAmount = this.balanceCard.locator("h2");
    this.hideBalanceButton = page.getByRole("button", { name: "Hide balance" });
    this.showBalanceButton = page.getByRole("button", { name: "Show balance" });
    this.withdrawButton = page.getByRole("button", { name: "Withdraw to bank" });
    this.viewStatementButton = page.getByRole("button", { name: "View statement" });

    this.noBankTitle = page.getByText("No active bank accounts");
    this.addBankAccountButton = page.getByRole("button", { name: "Add Bank Account" });
    this.addBankIntro = page.getByText("Enter details to connect your withdrawal bank account.");
    // A searchable combobox (cmdk): the trigger reads "Select", the list has a "Search banks..." box.
    this.bankSelect = page.getByText("Select Bank", { exact: true }).locator("xpath=..").getByRole("combobox");
    this.bankSearch = page.getByPlaceholder("Search banks...");
    this.accountNumberInput = page.getByPlaceholder("Enter 10-digit account number");
    this.addBankSubmit = page.getByRole("button", { name: "Add Bank", exact: true });

    this.sharePaymentLinkCard = page.getByRole("button", { name: /^Share payment link/ });
    this.qrCodeCard = page.getByRole("button", { name: /^QR code/ });

    this.shareModalHeading = page.getByText("Share your payment link");
    this.shareModalCopyLink = page.getByRole("button", { name: "Copy link" });
    this.shareModalShare = page.getByRole("button", { name: "Share", exact: true });
    this.shareModalShowQr = page.getByText("Show the QR code instead");

    this.qrModalHeading = page.getByRole("heading", { name: "Your Melon QR code" });
    this.qrModalImage = page.getByAltText("Payment QR Code");
    this.qrModalPrint = page.getByRole("button", { name: "Print QR" });
    this.qrModalDownload = page.getByRole("button", { name: "Download" });
    this.qrModalClose = this.qrModalHeading.locator("xpath=../../button");
    this.qrModalTips = page.getByText("Where to use it");

    this.viewAllTransactions = page.getByRole("button", { name: "View all" });
    this.transactions = new TransactionTable(page);
  }

  async waitUntilReady() {
    await expect(this.balanceAmount).toBeVisible({ timeout: 30_000 });
    // Rows/cards render as empty skeletons first; wait until real data is in.
    await expect(this.page.getByText(/^MELON-\d+$/).locator("visible=true").first()).toBeVisible({
      timeout: 30_000,
    });
  }

  /** The name after "Good evening, " (currently the business name; it used to be the member's first name). */
  async greetingName(): Promise<string> {
    const text = await this.greeting.innerText();

    return text
      .replace(/^Good \w+,\s*/i, "")
      .replace(/[\p{Extended_Pictographic}\s]+$/u, "")
      .trim();
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

  /**
   * The share modal has no Close button and Escape doesn't close it, so it is dismissed by clicking the dimmed
   * page behind it (see the pending "close the share modal with the keyboard" test).
   */
  async closeShareModal() {
    await test.step("Close the Share payment link modal", async () => {
      await this.page.mouse.click(5, 5);
      await expect(this.shareModalHeading).toBeHidden();
    });
  }

  async openQrModal() {
    await test.step("Open the QR code modal from the Get Paid card", async () => {
      await this.qrCodeCard.click();
      await expect(this.qrModalHeading).toBeVisible();
    });
  }

  async closeQrModal() {
    await test.step("Close the QR code modal", async () => {
      await this.qrModalClose.click();
      await expect(this.qrModalHeading).toBeHidden();
    });
  }

  /** "Withdraw to bank" with no verified bank account opens the "No active bank accounts" state. */
  async openWithdraw() {
    await test.step("Click Withdraw to bank", async () => {
      await activate(this.page, this.withdrawButton);
    });
  }

  async openAddBankForm() {
    await test.step("Open the Add Bank Account form", async () => {
      await this.addBankAccountButton.click();
      await expect(this.addBankIntro).toBeVisible();
    });
  }
}
