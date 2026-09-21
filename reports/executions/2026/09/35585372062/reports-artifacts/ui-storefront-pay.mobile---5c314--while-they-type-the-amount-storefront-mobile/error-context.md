# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/storefront/pay.mobile.spec.ts >> @storefront @pay @mobile >> should show the coins the customer will earn while they type the amount
- Location: tests/ui/storefront/pay.mobile.spec.ts:39:7

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "geotravel.getmelon.shop/stores/pay/", waiting until "load"

```

# Test source

```ts
  1   | import { expect, Locator, Page, test } from "@playwright/test";
  2   | import { env } from "../../config/environment";
  3   | import { BasePage } from "../common/BasePage";
  4   | import { parseNaira } from "../../utils/money";
  5   | 
  6   | export interface TransferDetails {
  7   |   accountNumber: string;
  8   |   bankName: string;
  9   |   amount: number;
  10  |   reference: string;
  11  | }
  12  | 
  13  | export class PayLinkPage extends BasePage {
  14  |   readonly amountInput: Locator;
  15  |   readonly continueToPayButton: Locator;
  16  |   readonly rewardText: Locator;
  17  | 
  18  |   readonly phoneInput: Locator;
  19  |   readonly continueButton: Locator;
  20  |   readonly backButton: Locator;
  21  | 
  22  |   readonly otpHeading: Locator;
  23  |   readonly otpInput: Locator;
  24  | 
  25  |   readonly transferHeading: Locator;
  26  |   readonly waitingForTransferText: Locator;
  27  | 
  28  |   readonly paymentCompletedCard: Locator;
  29  |   readonly kycSinceCard: Locator;
  30  | 
  31  |   constructor(page: Page) {
  32  |     super(page);
  33  | 
  34  |     this.amountInput = page.locator('input[inputmode="numeric"]').first();
  35  |     this.continueToPayButton = page.getByRole("button", { name: /continue to pay/i });
  36  |     this.rewardText = page.getByText(/you'll earn/i);
  37  | 
  38  |     this.phoneInput = page.locator('input[inputmode="tel"]');
  39  |     this.continueButton = page.getByRole("button", { name: "Continue", exact: true });
  40  |     this.backButton = page.getByRole("button", { name: /back$/i });
  41  | 
  42  |     this.otpHeading = page.getByText("Confirm your number");
  43  |     this.otpInput = page.getByText(/enter the 4-digit code/i);
  44  | 
  45  |     // Labels are upper-cased with CSS; the DOM text is "Account number".
  46  |     this.transferHeading = page.getByText(/^account number$/i);
  47  |     this.waitingForTransferText = page.getByText(/waiting for your transfer/i);
  48  | 
  49  |     this.paymentCompletedCard = page.getByText("Payments completed on Melon").locator("xpath=..");
  50  |     this.kycSinceCard = page.getByText(/KYC verified since/i).locator("xpath=..");
  51  |   }
  52  | 
  53  |   async goto(businessSlug: string) {
  54  |     await test.step(`Open the pay link for "${businessSlug}"`, async () => {
> 55  |       await this.page.goto(`${env.storefrontUrl}/pay/${businessSlug}`);
      |                       ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  56  |       await expect(this.amountInput).toBeVisible({ timeout: 30_000 });
  57  |     });
  58  |   }
  59  | 
  60  |   async enterAmount(amount: string) {
  61  |     await test.step(`Enter amount ₦${amount}`, async () => {
  62  |       await this.amountInput.fill(amount);
  63  |     });
  64  |   }
  65  | 
  66  |   async continueToPay() {
  67  |     await test.step("Continue to pay", async () => {
  68  |       await this.continueToPayButton.click();
  69  |     });
  70  |   }
  71  | 
  72  |   step(n: 1 | 2 | 3) {
  73  |     return this.page.getByText(new RegExp(`^step ${n} of 3$`, "i"));
  74  |   }
  75  | 
  76  |   /** Types into the phone field. Continue only enables for a valid 11-digit Nigerian number. */
  77  |   async typePhoneNumber(phone: string) {
  78  |     await test.step(`Type phone number ${phone}`, async () => {
  79  |       await expect(this.phoneInput).toBeVisible({ timeout: 20_000 });
  80  |       await this.phoneInput.fill(phone);
  81  |     });
  82  |   }
  83  | 
  84  |   async enterPhoneNumber(phone: string) {
  85  |     await test.step(`Enter phone number ${phone} and continue`, async () => {
  86  |       await expect(this.phoneInput).toBeVisible({ timeout: 20_000 });
  87  |       // The step re-renders right after it mounts and can wipe a value typed too early, so retry.
  88  |       await expect(async () => {
  89  |         await this.phoneInput.fill(phone);
  90  |         await expect(this.continueButton).toBeEnabled({ timeout: 1_500 });
  91  |       }).toPass({ timeout: 20_000 });
  92  |       await this.continueButton.click();
  93  |     });
  94  |   }
  95  | 
  96  |   /** The "You'll earn ₦X in Melon Coins" figure currently on screen, in naira. */
  97  |   async displayedRewardNaira(): Promise<number> {
  98  |     const text = (await this.rewardText.first().innerText()) ?? "";
  99  |     return parseNaira(text.replace(/you'll earn/i, ""));
  100 |   }
  101 | 
  102 |   /** How many payments the "Payments completed on Melon" card claims. */
  103 |   async paymentsCompleted(): Promise<number> {
  104 |     const text = await this.paymentCompletedCard.innerText();
  105 |     return Number(text.split("\n")[0].replace(/[^0-9]/g, ""));
  106 |   }
  107 | 
  108 |   async readTransferDetails(): Promise<TransferDetails> {
  109 |     return test.step("Read the generated transfer details", async () => {
  110 |       await expect(this.transferHeading).toBeVisible({ timeout: 30_000 });
  111 |       await expect(this.waitingForTransferText).toBeVisible();
  112 | 
  113 |       const text = await this.page.locator("body").innerText();
  114 |       const accountNumber = text.match(/ACCOUNT NUMBER\s*\n\s*(\d{10})/i)?.[1];
  115 |       const bankName = text.match(/BANK NAME\s*\n\s*(.+)/i)?.[1]?.trim();
  116 |       const amount = text.match(/\nAMOUNT\s*\n\s*(₦[\d,.]+)/i)?.[1];
  117 |       // The "Secure payment · MELON-…" header is hidden on phones, so read the raw DOM text.
  118 |       const reference = (await this.page.locator("body").textContent())?.match(/(MELON-\d+)/)?.[1];
  119 | 
  120 |       expect(accountNumber, "a 10-digit account number is generated").toBeTruthy();
  121 |       expect(reference, "a MELON-… payment reference is shown").toBeTruthy();
  122 | 
  123 |       return {
  124 |         accountNumber: accountNumber!,
  125 |         bankName: bankName ?? "",
  126 |         amount: parseNaira(amount ?? "0"),
  127 |         reference: reference!,
  128 |       };
  129 |     });
  130 |   }
  131 | 
  132 |   async expectOtpRequested() {
  133 |     await test.step("A new number is asked for a 4-digit OTP", async () => {
  134 |       await expect(this.otpHeading).toBeVisible({ timeout: 20_000 });
  135 |       await expect(this.otpInput).toBeVisible();
  136 |     });
  137 |   }
  138 | 
  139 |   async expectPaymentConfirmed(amount: number, rewardNaira: number) {
  140 |     await test.step("Payment is confirmed on the customer side", async () => {
  141 |       await expect(this.page.getByText(/received$/i)).toBeVisible({ timeout: 90_000 });
  142 |       await expect(this.page.getByText(/your payment to .* is confirmed/i)).toBeVisible();
  143 |       await expect(this.page.getByText(/in melon coins earned/i)).toBeVisible();
  144 | 
  145 |       const text = await this.page.locator("body").innerText();
  146 |       expect(parseNaira(text.match(/(₦[\d,.]+) received/i)?.[1] ?? "0")).toBe(amount);
  147 |       expect(parseNaira(text.match(/(₦[\d,.]+) in melon coins earned/i)?.[1] ?? "0")).toBe(
  148 |         rewardNaira
  149 |       );
  150 |     });
  151 |   }
  152 | }
  153 | 
```