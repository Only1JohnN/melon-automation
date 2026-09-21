import { expect, Locator, Page, test } from "@playwright/test";
import { env } from "../../config/environment";
import { BasePage } from "../common/BasePage";

/**
 * Paga's QA developer-portal tool that credits a sandbox account as if a real bank
 * transfer had arrived. External to Melon: we only drive it, never assert on its design.
 */
export class PagaSimulatorPage extends BasePage {
  readonly accountNumberInput: Locator;
  readonly amountInput: Locator;
  readonly triggerDepositButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.accountNumberInput = page.getByPlaceholder("e.g. 3728640310");
    this.amountInput = page.getByLabel(/^Amount/);
    this.triggerDepositButton = page.getByRole("button", { name: "Trigger Deposit" });
    this.successMessage = page.getByText("Deposit simulated successfully");
  }

  /** Credits `amount` naira to the generated payment account. Returns Paga's SIM-… reference. */
  async simulateDeposit(accountNumber: string, amount: number): Promise<string> {
    return test.step(`Simulate a ₦${amount} bank deposit to ${accountNumber} on Paga`, async () => {
      await this.page.goto(env.pagaSimulatorUrl);
      await expect(this.accountNumberInput).toBeVisible({ timeout: 30_000 });

      await this.accountNumberInput.fill(accountNumber);
      await this.amountInput.fill(String(amount));
      await this.triggerDepositButton.click();

      await expect(this.successMessage).toBeVisible({ timeout: 30_000 });
      await expect(this.page.getByText("CREDITED", { exact: true })).toBeVisible();

      const text = await this.page.locator("body").innerText();
      return text.match(/SIM-[A-Z0-9]+/)?.[0] ?? "";
    });
  }
}
