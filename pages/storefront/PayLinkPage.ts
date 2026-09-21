import { expect, Locator, Page, test } from "@playwright/test";
import { env } from "../../config/environment";
import { BasePage } from "../common/BasePage";
import { parseNaira } from "../../utils/money";

export interface TransferDetails {
  accountNumber: string;
  bankName: string;
  amount: number;
  reference: string;
}

export class PayLinkPage extends BasePage {
  readonly amountInput: Locator;
  readonly continueToPayButton: Locator;
  readonly rewardText: Locator;

  readonly phoneInput: Locator;
  readonly continueButton: Locator;
  readonly backButton: Locator;

  readonly otpHeading: Locator;
  readonly otpInput: Locator;

  readonly transferHeading: Locator;
  readonly waitingForTransferText: Locator;

  readonly paymentCompletedCard: Locator;
  readonly kycSinceCard: Locator;

  constructor(page: Page) {
    super(page);

    this.amountInput = page.locator('input[inputmode="numeric"]').first();
    this.continueToPayButton = page.getByRole("button", { name: /continue to pay/i });
    this.rewardText = page.getByText(/you'll earn/i);

    this.phoneInput = page.locator('input[inputmode="tel"]');
    this.continueButton = page.getByRole("button", { name: "Continue", exact: true });
    this.backButton = page.getByRole("button", { name: /back$/i });

    this.otpHeading = page.getByText("Confirm your number");
    this.otpInput = page.getByText(/enter the 4-digit code/i);

    // Labels are upper-cased with CSS; the DOM text is "Account number".
    this.transferHeading = page.getByText(/^account number$/i);
    this.waitingForTransferText = page.getByText(/waiting for your transfer/i);

    this.paymentCompletedCard = page.getByText("Payments completed on Melon").locator("xpath=..");
    this.kycSinceCard = page.getByText(/KYC verified since/i).locator("xpath=..");
  }

  async goto(businessSlug: string) {
    await test.step(`Open the pay link for "${businessSlug}"`, async () => {
      await this.page.goto(`${env.storefrontUrl}/pay/${businessSlug}`);
      await expect(this.amountInput).toBeVisible({ timeout: 30_000 });
    });
  }

  async enterAmount(amount: string) {
    await test.step(`Enter amount ₦${amount}`, async () => {
      await this.amountInput.fill(amount);
    });
  }

  async continueToPay() {
    await test.step("Continue to pay", async () => {
      await this.continueToPayButton.click();
    });
  }

  step(n: 1 | 2 | 3) {
    return this.page.getByText(new RegExp(`^step ${n} of 3$`, "i"));
  }

  /** Types into the phone field. Continue only enables for a valid 11-digit Nigerian number. */
  async typePhoneNumber(phone: string) {
    await test.step(`Type phone number ${phone}`, async () => {
      await expect(this.phoneInput).toBeVisible({ timeout: 20_000 });
      await this.phoneInput.fill(phone);
    });
  }

  async enterPhoneNumber(phone: string) {
    await test.step(`Enter phone number ${phone} and continue`, async () => {
      await expect(this.phoneInput).toBeVisible({ timeout: 20_000 });
      // The step re-renders right after it mounts and can wipe a value typed too early, so retry.
      await expect(async () => {
        await this.phoneInput.fill(phone);
        await expect(this.continueButton).toBeEnabled({ timeout: 1_500 });
      }).toPass({ timeout: 20_000 });
      await this.continueButton.click();
    });
  }

  /** The "You'll earn ₦X in Melon Coins" figure currently on screen, in naira. */
  async displayedRewardNaira(): Promise<number> {
    const text = (await this.rewardText.first().innerText()) ?? "";
    return parseNaira(text.replace(/you'll earn/i, ""));
  }

  /** How many payments the "Payments completed on Melon" card claims. */
  async paymentsCompleted(): Promise<number> {
    const text = await this.paymentCompletedCard.innerText();
    return Number(text.split("\n")[0].replace(/[^0-9]/g, ""));
  }

  async readTransferDetails(): Promise<TransferDetails> {
    return test.step("Read the generated transfer details", async () => {
      await expect(this.transferHeading).toBeVisible({ timeout: 30_000 });
      await expect(this.waitingForTransferText).toBeVisible();

      const text = await this.page.locator("body").innerText();
      const accountNumber = text.match(/ACCOUNT NUMBER\s*\n\s*(\d{10})/i)?.[1];
      const bankName = text.match(/BANK NAME\s*\n\s*(.+)/i)?.[1]?.trim();
      const amount = text.match(/\nAMOUNT\s*\n\s*(₦[\d,.]+)/i)?.[1];
      // The "Secure payment · MELON-…" header is hidden on phones, so read the raw DOM text.
      const reference = (await this.page.locator("body").textContent())?.match(/(MELON-\d+)/)?.[1];

      expect(accountNumber, "a 10-digit account number is generated").toBeTruthy();
      expect(reference, "a MELON-… payment reference is shown").toBeTruthy();

      return {
        accountNumber: accountNumber!,
        bankName: bankName ?? "",
        amount: parseNaira(amount ?? "0"),
        reference: reference!,
      };
    });
  }

  async expectOtpRequested() {
    await test.step("A new number is asked for a 4-digit OTP", async () => {
      await expect(this.otpHeading).toBeVisible({ timeout: 20_000 });
      await expect(this.otpInput).toBeVisible();
    });
  }

  async expectPaymentConfirmed(amount: number, rewardNaira: number) {
    await test.step("Payment is confirmed on the customer side", async () => {
      await expect(this.page.getByText(/received$/i)).toBeVisible({ timeout: 90_000 });
      await expect(this.page.getByText(/your payment to .* is confirmed/i)).toBeVisible();
      await expect(this.page.getByText(/in melon coins earned/i)).toBeVisible();

      const text = await this.page.locator("body").innerText();
      expect(parseNaira(text.match(/(₦[\d,.]+) received/i)?.[1] ?? "0")).toBe(amount);
      expect(parseNaira(text.match(/(₦[\d,.]+) in melon coins earned/i)?.[1] ?? "0")).toBe(
        rewardNaira
      );
    });
  }
}
