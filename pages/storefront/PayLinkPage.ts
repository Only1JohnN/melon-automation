import { expect, Locator, Page, test } from "@playwright/test";
import { env } from "../../config/environment";
import { BasePage } from "../common/BasePage";
import { parseNaira } from "../../utils/money";
import { gotoWithRetry } from "../../utils/navigation";

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
  readonly madeTransferButton: Locator;
  readonly checkingTransferText: Locator;
  readonly checkingTransferButton: Locator;
  readonly themeToggle: Locator;

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
    this.madeTransferButton = page.getByRole("button", { name: /made the transfer/i });
    // After the tap the button relabels itself ("Checking for your transfer…", disabled) and a status line appears.
    this.checkingTransferText = page.getByText(/confirming your transfer with the bank/i);
    this.checkingTransferButton = page.getByRole("button", { name: /checking for your transfer/i });
    // Icon-only button in the header (it has no accessible name), so it's found by being the one without text.
    this.themeToggle = page.locator("header button").filter({ hasNotText: /./ }).first();

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
      await gotoWithRetry(this.page, `${env.storefrontUrl}/pay/${businessSlug}`);
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
      const started = Date.now();
      await expect(this.transferHeading).toBeVisible({ timeout: 90_000 });

      // Generating the bank account is slow now and then; write down how long it took so a slow one is visible.
      const seconds = Math.round((Date.now() - started) / 1000);
      if (seconds > 15) {
        test.info().annotations.push({
          type: "slow-response",
          description: `"Generating your payment details" took about ${seconds}s before the account number appeared.`,
        });
      }
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

  /** The page background colour, which is what flips between light and dark. */
  async backgroundColor() {
    return this.page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  }

  async expectClaimCoinsCta() {
    await test.step("Success screen invites the customer to claim their Coins in the Melon app", async () => {
      await expect(this.page.getByText(/claim your coins in the melon app/i)).toBeVisible();
      await expect(this.page.getByRole("link", { name: "App Store" })).toHaveAttribute("href", /apps\.apple\.com/);
      await expect(this.page.getByRole("link", { name: "Google Play" })).toHaveAttribute("href", /play\.google\.com/);
    });
  }

  async expectOtpRequested() {
    await test.step("A new number is asked for a 4-digit OTP", async () => {
      await expect(this.otpHeading).toBeVisible({ timeout: 20_000 });
      await expect(this.otpInput).toBeVisible();
    });
  }

  async expectPaymentConfirmed(amount: number, rewardNaira?: number) {
    await test.step("Payment is confirmed on the customer side", async () => {
      await expect(this.page.getByText(/received$/i)).toBeVisible({ timeout: 90_000 });
      await expect(this.page.getByText(/your payment to .* is confirmed/i)).toBeVisible();
      await expect(this.page.getByText(/in melon coins earned/i)).toBeVisible();

      const text = await this.page.locator("body").innerText();
      expect(parseNaira(text.match(/(₦[\d,.]+) received/i)?.[1] ?? "0")).toBe(amount);
      const shownReward = parseNaira(text.match(/(₦[\d,.]+) in melon coins earned/i)?.[1] ?? "0");
      if (rewardNaira !== undefined) {
        expect(shownReward).toBe(rewardNaira);
      } else {
        expect(shownReward, "a reward is shown").toBeGreaterThan(0);
      }
    });
  }
}
