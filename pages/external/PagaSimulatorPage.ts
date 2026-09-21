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
  readonly senderBankError: Locator;

  constructor(page: Page) {
    super(page);

    this.accountNumberInput = page.getByPlaceholder("e.g. 3728640310");
    this.amountInput = page.getByLabel(/^Amount/);
    this.triggerDepositButton = page.getByRole("button", { name: "Trigger Deposit" });
    this.successMessage = page.getByText("Deposit simulated successfully");
    this.senderBankError = page.getByText(/choose a sender bank/i);
  }

  /** Credits `amount` naira to the generated payment account. Returns Paga's SIM-… reference. */
  async simulateDeposit(accountNumber: string, amount: number): Promise<string> {
    return test.step(`Simulate a ₦${amount} bank deposit to ${accountNumber} on Paga`, async () => {
      await this.page.goto(env.pagaSimulatorUrl, { waitUntil: "networkidle" });
      await expect(this.accountNumberInput).toBeVisible({ timeout: 30_000 });

      // Only two things are ever entered: the account number and the amount, then Trigger Deposit.
      // The portal occasionally answers "Choose a sender bank." if it's clicked before the page has
      // finished setting itself up (nothing is sent in that case), so on that exact message we repeat
      // the same two-field action. We never retry on an unclear outcome, so a deposit can't fire twice.
      for (let attempt = 1; attempt <= 3; attempt++) {
        await this.accountNumberInput.fill(accountNumber);
        await this.amountInput.fill(String(amount));
        await this.triggerDepositButton.click();

        const outcome = await Promise.race([
          this.successMessage.waitFor({ timeout: 30_000 }).then(() => "success" as const),
          this.senderBankError.waitFor({ timeout: 30_000 }).then(() => "validation-error" as const),
        ]);

        if (outcome === "success") break;
        expect(attempt, "Paga kept answering 'Choose a sender bank.'").toBeLessThan(3);
      }

      await expect(this.successMessage).toBeVisible();
      await expect(this.page.getByText("CREDITED", { exact: true })).toBeVisible();

      const text = await this.page.locator("body").innerText();
      return text.match(/SIM-[A-Z0-9]+/)?.[0] ?? "";
    });
  }
}
