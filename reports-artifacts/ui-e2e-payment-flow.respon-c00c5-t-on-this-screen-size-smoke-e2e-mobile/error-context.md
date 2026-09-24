# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/e2e/payment-flow.responsive.spec.ts >> @e2e @payment @responsive @partners @storefront >> customer pays and the merchant sees it, on this screen size @smoke
- Location: tests/ui/e2e/payment-flow.responsive.spec.ts:19:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 6559697.6
Received: 6561287.6

Call Log:
- Timeout 45000ms exceeded while waiting on the predicate
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - main [ref=e3]:
    - button "Switch theme" [ref=e8] [cursor=pointer]:
      - img [ref=e9]
    - generic [ref=e15]:
      - generic [ref=e16]:
        - img "Melon QA Bot" [ref=e17]
        - heading "Melon QA Bot" [level=1] [ref=e18]
        - generic [ref=e19]:
          - img [ref=e21]
          - generic [ref=e23]: KYC Approved
        - paragraph [ref=e24]: Where Quality meets Innovation
        - generic [ref=e25]:
          - generic [ref=e26]:
            - generic [ref=e27]: "56"
            - generic [ref=e28]: Payments completed on Melon
          - generic [ref=e29]:
            - generic [ref=e30]: 2 months
            - generic [ref=e31]: KYC verified since Jul 2026
      - generic [ref=e32]:
        - generic [ref=e33]: How much are you paying?
        - generic [ref=e34]:
          - generic [ref=e35]: ₦
          - textbox "0" [ref=e36]
        - button "Continue to pay" [disabled] [ref=e37]
        - paragraph [ref=e38]:
          - text: You'll earn
          - generic [ref=e39]: ₦0.00 in Melon Coins
  - region "Notifications alt+T"
  - region "Notifications Alt+T"
```

# Test source

```ts
  38  |     if (idsOf(first) === idsOf(second)) {
  39  |       return {
  40  |         balance: wallet.balance / 100, // the wallet API returns kobo
  41  |         revenue: overview.revenue.amount,
  42  |         transactions: overview.transactions.count,
  43  |         customersRewarded: overview.customers_rewarded.count,
  44  |         coinsAwarded: overview.customers_rewarded.coins_awarded,
  45  |         successful: second,
  46  |       };
  47  |     }
  48  | 
  49  |     await new Promise((resolve) => setTimeout(resolve, 1_500));
  50  |   }
  51  | 
  52  |   throw new Error("The merchant's numbers kept changing while taking a snapshot");
  53  | }
  54  | 
  55  | /** Naira to the kobo, so sums like 39.05 + 0 don't come out as 39.050000000000004. */
  56  | const money = (naira: number) => Math.round(naira * 100) / 100;
  57  | 
  58  | /** What the totals must be now, given the payments that turned successful since `before`. */
  59  | export function expectedTotals(before: MerchantSnapshot, now: MerchantSnapshot) {
  60  |   const added = [...now.successful.values()].filter((t) => !before.successful.has(t.transaction_id));
  61  |   const paid = added.reduce((sum, t) => sum + Number(t.paid_amount_in_naira), 0);
  62  |   const coins = added.reduce((sum, t) => sum + Number(t.reward_coin_amount ?? 0), 0);
  63  | 
  64  |   return {
  65  |     added,
  66  |     revenue: money(before.revenue + paid),
  67  |     transactions: before.transactions + added.length,
  68  |     coinsAwarded: before.coinsAwarded + coins,
  69  |     balance: money(before.balance + paid),
  70  |   };
  71  | }
  72  | 
  73  | export interface PaymentContext {
  74  |   merchantPage: Page;
  75  |   customerPage: Page;
  76  |   /** Any page in the merchant's browser context, used for the Paga simulator. */
  77  |   pagaPage: Page;
  78  |   api: MelonApi;
  79  |   /** Called at each screen so a caller can run extra checks (e.g. a layout audit) on it. */
  80  |   onScreen?: (page: Page, label: string) => Promise<void>;
  81  | }
  82  | 
  83  | export interface PaymentOptions {
  84  |   amount: number;
  85  |   /**
  86  |    * True (default): reward and coins must equal the documented rule (0.5%, capped at ₦500, 100 coins per ₦1).
  87  |    * False: for amounts whose reward isn't a whole number of coins the rounding isn't documented, so only internal
  88  |    * consistency is asserted (coins = 100 x the reward, within one coin) and the actual figures are then tracked.
  89  |    */
  90  |   exactReward?: boolean;
  91  |   /** Tap "I've made the transfer" after paying instead of waiting for the automatic check. */
  92  |   tapMadeTransfer?: boolean;
  93  | }
  94  | 
  95  | export interface PaymentResult {
  96  |   reference: string;
  97  |   accountNumber: string;
  98  |   coins: number;
  99  |   rewardNaira: number;
  100 | }
  101 | 
  102 | /**
  103 |  * The whole money loop, with the numbers taken BEFORE and checked AFTER on every surface:
  104 |  * customer pays -> Paga credits the account -> customer sees it -> the payment, the merchant's stats/balance,
  105 |  * the merchant's lists (home + transactions) and the customer's "payments completed" card all move by exactly
  106 |  * this payment. Anything that isn't instant is re-read after a refresh.
  107 |  */
  108 | export async function payAndVerify(context: PaymentContext, options: PaymentOptions): Promise<PaymentResult> {
  109 |   const { merchantPage, customerPage, pagaPage, api, onScreen } = context;
  110 |   const { amount } = options;
  111 |   const home = new MerchantHomePage(merchantPage);
  112 |   const transactions = new MerchantTransactionsPage(merchantPage);
  113 |   const pay = new PayLinkPage(customerPage);
  114 |   const simulator = new PagaSimulatorPage(pagaPage);
  115 | 
  116 |   const exact = options.exactReward ?? true;
  117 |   let rewardNaira = expectedRewardNaira(amount);
  118 |   let coins = expectedCoins(amount);
  119 |   const phone = env.testPhoneNumber!;
  120 | 
  121 |   await api.login();
  122 | 
  123 |   // ── Before ─────────────────────────────────────────────────────────────────
  124 |   const before = await test.step("BEFORE: the merchant's numbers (API)", () => merchantSnapshot(api));
  125 | 
  126 |   const customerCardBefore = await test.step("BEFORE: the customer's 'Payments completed' card", async () => {
  127 |     await pay.goto(env.testStoreSlug);
  128 |     await onScreen?.(customerPage, "pay link (before)");
  129 |     return pay.paymentsCompleted();
  130 |   });
  131 | 
  132 |   await test.step("BEFORE: the merchant dashboard shows those same numbers", async () => {
  133 |     await expect(async () => {
  134 |       await home.open();
  135 |       expect(await home.balance()).toBe(before.balance);
  136 |       await expect(home.statCard("Revenue").locator("h3")).toHaveText(formatNaira(before.revenue));
  137 |       expect(await home.statValue("Transactions")).toBe(before.transactions);
> 138 |     }).toPass({ timeout: 45_000 });
      |        ^ Error: expect(received).toBe(expected) // Object.is equality
  139 |   });
  140 | 
  141 |   // ── Customer pays ──────────────────────────────────────────────────────────
  142 |   await test.step(`Customer enters ₦${amount.toLocaleString()} and sees what they'll earn`, async () => {
  143 |     await pay.enterAmount(String(amount));
  144 |     if (exact) {
  145 |       await expect(pay.rewardText).toContainText(formatNaira(rewardNaira));
  146 |       expect(await pay.displayedRewardNaira()).toBe(rewardNaira);
  147 |     } else {
  148 |       expect(Math.abs((await pay.displayedRewardNaira()) - rewardNaira)).toBeLessThanOrEqual(0.01);
  149 |     }
  150 |     await onScreen?.(customerPage, "amount entered");
  151 |     await pay.continueToPay();
  152 |     await onScreen?.(customerPage, "phone step");
  153 |     await pay.enterPhoneNumber(phone);
  154 |   });
  155 | 
  156 |   const transfer = await pay.readTransferDetails();
  157 |   await onScreen?.(customerPage, "transfer details");
  158 | 
  159 |   await test.step("The payment starts as pending with no reward (API) and the merchant sees it as pending", async () => {
  160 |     const { body } = await api.paymentLink(transfer.reference);
  161 |     expect(body.data.payment_status).toBe("pending");
  162 |     expect(body.data.reward_coin_amount).toBeNull();
  163 |     expect(body.data.paid_amount_in_naira).toBeNull();
  164 |     expect(transfer.amount).toBe(amount);
  165 | 
  166 |     await expect(async () => {
  167 |       await transactions.open();
  168 |       const row = await transactions.transactions.find(transfer.reference);
  169 |       expect(row, "the pending payment is listed").toBeTruthy();
  170 |       expect(row).toMatchObject({ amount, coins: 0, status: "pending" });
  171 |     }).toPass({ timeout: 45_000, intervals: [3_000] });
  172 |   });
  173 | 
  174 |   // ── Paga credits the account ───────────────────────────────────────────────
  175 |   await simulator.simulateDeposit(transfer.accountNumber, amount);
  176 | 
  177 |   await test.step("Customer sees the payment confirmed with the coins earned", async () => {
  178 |     if (options.tapMadeTransfer) {
  179 |       await pay.madeTransferButton.click();
  180 |     }
  181 |     await pay.expectPaymentConfirmed(amount, exact ? rewardNaira : undefined);
  182 |     await pay.expectClaimCoinsCta();
  183 |     await onScreen?.(customerPage, "payment confirmed");
  184 |   });
  185 | 
  186 |   // ── After: the payment itself ──────────────────────────────────────────────
  187 |   await test.step("AFTER: the backend records it as successful with the right reward (API)", async () => {
  188 |     await expect
  189 |       .poll(async () => (await api.paymentLink(transfer.reference)).body.data.payment_status, { timeout: 60_000 })
  190 |       .toBe("successful");
  191 | 
  192 |     const payment = (await api.paymentLink(transfer.reference)).body.data;
  193 |     expect(Number(payment.paid_amount_in_naira)).toBe(amount);
  194 |     expect(payment.reward_status).toBe("successful");
  195 | 
  196 |     if (exact) {
  197 |       expect(Number(payment.reward_naira_amount)).toBe(rewardNaira);
  198 |       expect(payment.reward_coin_amount, "100 coins = ₦1 of reward").toBe(coins);
  199 |     } else {
  200 |       const actualReward = Number(payment.reward_naira_amount);
  201 |       // How far the coins are from 100 x the recorded reward (0 when they agree).
  202 |       const drift = money(payment.reward_coin_amount - actualReward * 100);
  203 |       expect(Number.isInteger(payment.reward_coin_amount), "coins are a whole number").toBe(true);
  204 |       expect(Math.abs(drift), "coins are within one coin of 100 x the reward").toBeLessThanOrEqual(1);
  205 |       expect(Math.abs(actualReward - rewardNaira), "reward is within a cent of 0.5%").toBeLessThanOrEqual(0.01);
  206 |       rewardNaira = actualReward;
  207 |       coins = payment.reward_coin_amount;
  208 |       test.info().annotations.push({
  209 |         type: "rounding",
  210 |         description: `₦${amount.toLocaleString()}: exact 0.5% is ₦${amount * 0.005}; the reward is recorded as ₦${actualReward} and ${coins} coins were credited.`,
  211 |       });
  212 | 
  213 |       // A one-coin gap isn't asserted away: it is written down so someone can say which figure is right.
  214 |       if (drift !== 0) {
  215 |         test.info().annotations.push({
  216 |           type: "needs-decision",
  217 |           description: `The reward is recorded as ₦${actualReward} but ${coins.toLocaleString()} coins were credited, which is ₦${coins / 100}: the two are rounded in different directions (exact reward ₦${amount * 0.005}). Which figure is intended?`,
  218 |         });
  219 |       }
  220 |     }
  221 |     expect(payment.rewarded_at).toBeTruthy();
  222 |     expect(payment.expired).toBe(false);
  223 |   });
  224 | 
  225 |   // ── After: the merchant's totals ───────────────────────────────────────────
  226 |   const after = await test.step("AFTER: every merchant total moved by exactly the payments that landed (API)", async () => {
  227 |     let snapshot!: MerchantSnapshot;
  228 | 
  229 |     await expect(async () => {
  230 |       snapshot = await merchantSnapshot(api);
  231 |       const expected = expectedTotals(before, snapshot);
  232 | 
  233 |       expect(expected.added.map((t) => t.transaction_id), "this payment counts as successful").toContain(transfer.reference);
  234 |       expect(snapshot.revenue, "revenue").toBe(expected.revenue);
  235 |       expect(snapshot.transactions, "transaction count").toBe(expected.transactions);
  236 |       expect(snapshot.coinsAwarded, "coins awarded").toBe(expected.coinsAwarded);
  237 |       expect(snapshot.balance, "wallet balance").toBe(expected.balance);
  238 |     }).toPass({ timeout: 90_000, intervals: [3_000] });
```