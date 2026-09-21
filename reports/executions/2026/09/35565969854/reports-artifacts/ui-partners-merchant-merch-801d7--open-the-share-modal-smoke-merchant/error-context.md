# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/merchant/merchant-home.spec.ts >> @partners @home >> should show the payment link in Get Paid and open the share modal @smoke
- Location: tests/ui/partners/merchant/merchant-home.spec.ts:104:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "geotravel.getmelon.shop/stores/pay/melon-qa-bot"
Received: "https://customer.getmelon.co/pay/melon-qa-bot"
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - main [ref=e4]:
    - complementary [ref=e5]:
      - navigation [ref=e9]:
        - link "Home" [ref=e10] [cursor=pointer]:
          - /url: /simple/home
          - img [ref=e12]
          - generic [ref=e15]: Home
        - link "Transactions" [ref=e16] [cursor=pointer]:
          - /url: /simple/transactions
          - img [ref=e17]
          - generic [ref=e19]: Transactions
        - link "Settings" [ref=e20] [cursor=pointer]:
          - /url: /simple/settings
          - img [ref=e21]
          - generic [ref=e24]: Settings
      - heading "Appear here!" [level=1] [ref=e26]
    - main [ref=e28]:
      - generic [ref=e29]:
        - generic [ref=e30]:
          - heading "Good morning, UpdatedFirst-102337 👋" [level=1] [ref=e31]
          - paragraph [ref=e32]: Here's what's happening with your business.
        - generic [ref=e34]:
          - generic [ref=e35]:
            - img [ref=e36]
            - generic [ref=e39]: Help
          - img [ref=e42]
      - generic [ref=e45]:
        - generic [ref=e47]:
          - generic [ref=e48]:
            - generic [ref=e49]:
              - generic [ref=e50]: Available Balance
              - button "Hide balance" [ref=e51] [cursor=pointer]:
                - generic [ref=e52]:
                  - img [ref=e54]
                  - img [ref=e58]
            - generic [ref=e64]:
              - heading "₦2,571,317.60" [level=2] [ref=e66]
              - paragraph [ref=e67]: Settled instantly on every payment
            - generic [ref=e68]:
              - button "Withdraw to bank" [ref=e69] [cursor=pointer]
              - button "View statement" [ref=e70] [cursor=pointer]
          - generic [ref=e72]:
            - paragraph [ref=e73]:
              - text: You have
              - generic [ref=e74]: ₦2,571,317.60
              - text: available. Add a bank account to withdraw anytime.
            - generic [ref=e75]:
              - button "Add bank account" [ref=e76] [cursor=pointer]
              - button [ref=e77] [cursor=pointer]:
                - img [ref=e78]
        - generic [ref=e82]:
          - heading "Get Paid" [level=3] [ref=e83]
          - generic [ref=e84]:
            - button "Share payment link customer.getmelon.co/pay/melon-qa-bot" [ref=e85] [cursor=pointer]:
              - generic [ref=e86]:
                - img [ref=e88]
                - generic [ref=e91]:
                  - paragraph [ref=e92]: Share payment link
                  - paragraph [ref=e93]: customer.getmelon.co/pay/melon-qa-bot
              - img [ref=e94]
            - button "QR code Print or share as an image" [ref=e96] [cursor=pointer]:
              - generic [ref=e97]:
                - img [ref=e99]
                - generic [ref=e105]:
                  - paragraph [ref=e106]: QR code
                  - paragraph [ref=e107]: Print or share as an image
              - img [ref=e108]
      - generic [ref=e111]:
        - generic [ref=e113]:
          - generic [ref=e114]:
            - generic [ref=e115]: Revenue
            - img [ref=e117]
          - generic [ref=e120]:
            - heading "₦2,443,500.00" [level=3] [ref=e121]
            - generic [ref=e124]: No growth data
        - generic [ref=e126]:
          - generic [ref=e127]:
            - generic [ref=e128]: Transactions
            - img [ref=e130]
          - generic [ref=e133]:
            - heading "5.00" [level=3] [ref=e134]
            - generic [ref=e135]: Total successful payments
        - generic [ref=e137]:
          - generic [ref=e138]:
            - generic [ref=e139]: Customers rewarded
            - img [ref=e141]
          - generic [ref=e144]:
            - heading "3.00" [level=3] [ref=e145]
            - generic [ref=e147]:
              - img "coin" [ref=e149]
              - text: 71,750 Coins awarded
        - generic [ref=e151]:
          - generic [ref=e152]:
            - generic [ref=e153]: Repeat customers
            - img [ref=e155]
          - generic [ref=e160]:
            - heading "3.00" [level=3] [ref=e161]
            - generic [ref=e163]: 33.33% returned to pay again
      - generic [ref=e164]:
        - generic [ref=e165]:
          - heading "Recent Transactions" [level=1] [ref=e166]
          - button "View all" [ref=e167] [cursor=pointer]:
            - text: View all
            - img [ref=e168]
        - table [ref=e172]:
          - rowgroup [ref=e173]:
            - row "Customer Reference Amount Reward (Coins) Status" [ref=e174]:
              - columnheader "Customer" [ref=e175]
              - columnheader "Reference" [ref=e176]
              - columnheader "Amount" [ref=e177]
              - columnheader "Reward (Coins)" [ref=e178]
              - columnheader "Status" [ref=e179]
          - rowgroup [ref=e180]:
            - row "JA John Ade MELON-1789968040784 ₦1,500.00 coin-icon +0 pending" [ref=e181]:
              - cell "JA John Ade" [ref=e182]:
                - generic [ref=e183]:
                  - generic [ref=e184]: JA
                  - generic [ref=e185]: John Ade
              - cell "MELON-1789968040784" [ref=e186]
              - cell "₦1,500.00" [ref=e187]
              - cell "coin-icon +0" [ref=e188]:
                - generic [ref=e189]:
                  - img "coin-icon" [ref=e191]
                  - generic [ref=e192]: "+0"
              - cell "pending" [ref=e193]:
                - generic [ref=e194]: pending
            - row "JA John Ade MELON-1789968010592 ₦1,000.00 coin-icon +0 pending" [ref=e196]:
              - cell "JA John Ade" [ref=e197]:
                - generic [ref=e198]:
                  - generic [ref=e199]: JA
                  - generic [ref=e200]: John Ade
              - cell "MELON-1789968010592" [ref=e201]
              - cell "₦1,000.00" [ref=e202]
              - cell "coin-icon +0" [ref=e203]:
                - generic [ref=e204]:
                  - img "coin-icon" [ref=e206]
                  - generic [ref=e207]: "+0"
              - cell "pending" [ref=e208]:
                - generic [ref=e209]: pending
            - row "JA John Ade MELON-1789967972818 ₦1,000.00 coin-icon +0 pending" [ref=e211]:
              - cell "JA John Ade" [ref=e212]:
                - generic [ref=e213]:
                  - generic [ref=e214]: JA
                  - generic [ref=e215]: John Ade
              - cell "MELON-1789967972818" [ref=e216]
              - cell "₦1,000.00" [ref=e217]
              - cell "coin-icon +0" [ref=e218]:
                - generic [ref=e219]:
                  - img "coin-icon" [ref=e221]
                  - generic [ref=e222]: "+0"
              - cell "pending" [ref=e223]:
                - generic [ref=e224]: pending
            - row "JA John Ade MELON-1789967964594 ₦5,000.00 coin-icon +0 pending" [ref=e226]:
              - cell "JA John Ade" [ref=e227]:
                - generic [ref=e228]:
                  - generic [ref=e229]: JA
                  - generic [ref=e230]: John Ade
              - cell "MELON-1789967964594" [ref=e231]
              - cell "₦5,000.00" [ref=e232]
              - cell "coin-icon +0" [ref=e233]:
                - generic [ref=e234]:
                  - img "coin-icon" [ref=e236]
                  - generic [ref=e237]: "+0"
              - cell "pending" [ref=e238]:
                - generic [ref=e239]: pending
            - row "JA John Ade MELON-1789964778212 ₦1,000.00 coin-icon +0 expired" [ref=e241]:
              - cell "JA John Ade" [ref=e242]:
                - generic [ref=e243]:
                  - generic [ref=e244]: JA
                  - generic [ref=e245]: John Ade
              - cell "MELON-1789964778212" [ref=e246]
              - cell "₦1,000.00" [ref=e247]
              - cell "coin-icon +0" [ref=e248]:
                - generic [ref=e249]:
                  - img "coin-icon" [ref=e251]
                  - generic [ref=e252]: "+0"
              - cell "expired" [ref=e253]:
                - generic [ref=e254]: expired
  - region "Notifications Alt+T"
  - region "Notifications alt+T"
```

# Test source

```ts
  17  |     expect(overview.status(), "overview API").toBe(200);
  18  |     expect(transactions.status(), "transactions API").toBe(200);
  19  |     expect(wallet.status(), "wallet API").toBe(200);
  20  | 
  21  |     await expect(home.greeting).toBeVisible();
  22  |     await expect(home.viewStatementButton).toBeVisible();
  23  |     await expect(home.withdrawButton).toBeVisible();
  24  |   });
  25  | 
  26  |   test("should show the wallet balance from the API", async ({ page, api }) => {
  27  |     const home = new MerchantHomePage(page);
  28  |     await home.open();
  29  | 
  30  |     await api.login();
  31  |     const { body } = await api.wallet();
  32  |     const balanceNaira = body.data.balance / 100; // the wallet API returns kobo
  33  | 
  34  |     await expect(home.balanceAmount).toHaveText(formatNaira(balanceNaira));
  35  |     await expect(page.getByText(/settled instantly on every payment/i)).toBeVisible();
  36  |   });
  37  | 
  38  |   test("should hide and show the balance with the eye icon", async ({ page }) => {
  39  |     const home = new MerchantHomePage(page);
  40  |     await home.open();
  41  | 
  42  |     const visibleBalance = await home.balanceAmount.innerText();
  43  |     expect(visibleBalance).toContain("₦");
  44  | 
  45  |     await home.toggleBalanceVisibility();
  46  |     await expect(home.showBalanceButton).toBeVisible();
  47  |     await expect(home.balanceAmount).not.toContainText(/\d/);
  48  |     await expect(home.balanceAmount).not.toContainText("₦");
  49  | 
  50  |     await home.toggleBalanceVisibility();
  51  |     await expect(home.hideBalanceButton).toBeVisible();
  52  |     await expect(home.balanceAmount).toHaveText(visibleBalance);
  53  |   });
  54  | 
  55  |   test("should show revenue, transactions, customers rewarded and repeat customers from the overview API", async ({
  56  |     page,
  57  |     api,
  58  |   }) => {
  59  |     const home = new MerchantHomePage(page);
  60  |     await home.open();
  61  | 
  62  |     await api.login();
  63  |     const { status, body } = await api.overview();
  64  |     expect(status).toBe(200);
  65  |     const stats = body.data;
  66  | 
  67  |     await expect(home.statCard("Revenue").locator("h3")).toHaveText(formatNaira(stats.revenue.amount));
  68  |     expect(await home.statValue("Transactions")).toBe(stats.transactions.count);
  69  |     expect(await home.statValue("Customers rewarded")).toBe(stats.customers_rewarded.count);
  70  |     await expect(home.statCard("Customers rewarded")).toContainText(
  71  |       `${stats.customers_rewarded.coins_awarded.toLocaleString("en-US")} Coins awarded`
  72  |     );
  73  |     expect(await home.statValue("Repeat customers")).toBe(stats.repeat_customers.count);
  74  |     await expect(home.statCard("Repeat customers")).toContainText(
  75  |       `${stats.repeat_customers.repeat_percentage}% returned to pay again`
  76  |     );
  77  |   });
  78  | 
  79  |   test("should list the five most recent transactions exactly as the API returns them", async ({
  80  |     page,
  81  |     api,
  82  |   }) => {
  83  |     const home = new MerchantHomePage(page);
  84  |     await home.open();
  85  | 
  86  |     await api.login();
  87  |     const { body } = await api.transactions(1, 5);
  88  |     const expected = body.data.results;
  89  | 
  90  |     await expect(home.recentRows).toHaveCount(expected.length);
  91  | 
  92  |     for (const [index, transaction] of expected.entries()) {
  93  |       await test.step(`Row ${index + 1} is ${transaction.transaction_id}`, async () => {
  94  |         const row = await home.readRow(home.recentRows.nth(index));
  95  |         expect(row.reference).toBe(transaction.transaction_id);
  96  |         expect(row.amount).toBe(Number(transaction.requesting_amount_in_naira));
  97  |         expect(row.coins).toBe(transaction.reward_coin_amount ?? 0);
  98  |         expect(row.status).toBe(transaction.payment_status);
  99  |         expect(row.customer).toContain(transaction.customer.first_name);
  100 |       });
  101 |     }
  102 |   });
  103 | 
  104 |   test("should show the payment link in Get Paid and open the share modal @smoke", async ({
  105 |     page,
  106 |     context,
  107 |     api,
  108 |   }) => {
  109 |     await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  110 |     const home = new MerchantHomePage(page);
  111 |     await home.open();
  112 | 
  113 |     await api.login();
  114 |     const { body } = await api.business();
  115 |     const link = `${env.storefrontUrl}/pay/${body.data.details.slug}`;
  116 | 
> 117 |     expect(`https://${await home.paymentLinkText()}`).toBe(link);
      |                                                       ^ Error: expect(received).toBe(expected) // Object.is equality
  118 | 
  119 |     await home.openShareModal();
  120 |     await expect(page.getByText(link.replace("https://", ""), { exact: true }).last()).toBeVisible();
  121 |     await expect(page.getByText(/anyone with this link can pay you/i)).toBeVisible();
  122 | 
  123 |     await home.shareModalCopyLink.click();
  124 |     await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(link);
  125 |   });
  126 | 
  127 |   test("should take the merchant to the full list with View all", async ({ page }) => {
  128 |     const home = new MerchantHomePage(page);
  129 |     await home.open();
  130 | 
  131 |     await home.viewAllTransactions.click();
  132 | 
  133 |     await expect(page).toHaveURL(/\/simple\/transactions/);
  134 |   });
  135 | 
  136 |   test("should navigate between Home, Transactions and Settings", async ({ page }) => {
  137 |     const home = new MerchantHomePage(page);
  138 |     await home.open();
  139 | 
  140 |     await home.navigateTo("Transactions");
  141 |     await expect(page).toHaveURL(/\/simple\/transactions/);
  142 | 
  143 |     await home.navigateTo("Settings");
  144 |     await expect(page).toHaveURL(/\/simple\/settings/);
  145 | 
  146 |     await home.navigateTo("Home");
  147 |     await expect(page).toHaveURL(/\/simple\/home/);
  148 |   });
  149 | 
  150 |   // ── Known problems: written down for whoever picks them up ─────────────────
  151 | 
  152 |   test.fixme("should start a withdrawal with Withdraw to bank", async ({ page }) => {
  153 |     // TODO(dev): clicking "Withdraw to bank" does nothing (no dialog, no navigation, no API call).
  154 |     // Expected: a withdrawal flow. Assert the dialog/heading and the withdrawal API once it exists.
  155 |     const home = new MerchantHomePage(page);
  156 |     await home.open();
  157 |     await home.withdrawButton.click();
  158 |     await expect(page.getByRole("dialog")).toBeVisible();
  159 |   });
  160 | 
  161 |   test.fixme("should open the statement with View statement", async ({ page }) => {
  162 |     // TODO(dev): clicking "View statement" does nothing (no dialog, no download, no API call).
  163 |     // Expected: a statement view or a downloadable statement.
  164 |     const home = new MerchantHomePage(page);
  165 |     await home.open();
  166 |     await home.viewStatementButton.click();
  167 |     await expect(page.getByRole("dialog")).toBeVisible();
  168 |   });
  169 | 
  170 |   test.fixme("should add a bank account from the balance card", async ({ page }) => {
  171 |     // TODO(dev): clicking "Add bank account" does nothing. Expected: the add-bank flow
  172 |     // (Settings > Withdrawal Bank has the same "Add Withdrawal Bank" action).
  173 |     const home = new MerchantHomePage(page);
  174 |     await home.open();
  175 |     await home.addBankAccountButton.click();
  176 |     await expect(page.getByRole("dialog")).toBeVisible();
  177 |   });
  178 | 
  179 |   test.fixme("should open the QR code from the Get Paid card", async ({ page }) => {
  180 |     // TODO(dev): clicking the "QR code — Print or share as an image" card does nothing.
  181 |     // Expected: it opens the QR code (modal or Settings > Qr Code).
  182 |     const home = new MerchantHomePage(page);
  183 |     await home.open();
  184 |     await home.qrCodeCard.click();
  185 |     await expect(page.getByAltText("Your reward QR code")).toBeVisible();
  186 |   });
  187 | 
  188 |   test.fixme("should switch the share modal to the QR code", async ({ page }) => {
  189 |     // TODO(dev): "Show the QR code instead" in the Share modal does nothing — the modal keeps showing
  190 |     // the link. Expected: the QR image with Download/Copy.
  191 |     const home = new MerchantHomePage(page);
  192 |     await home.open();
  193 |     await home.openShareModal();
  194 |     await home.shareModalShowQr.click();
  195 |     await expect(page.getByAltText("Your reward QR code")).toBeVisible();
  196 |   });
  197 | 
  198 |   test.fixme("should preview the same pay page the customer really sees", async ({ page, api }) => {
  199 |     // TODO(dev): the Share modal's "Preview: what your customer sees" is out of date. It shows the tagline
  200 |     // "Fresh meals, sides and drinks — daily.", an "MQ" avatar and ₦2,500/₦5,000/₦12,000 preset chips, but
  201 |     // the real page shows the business tagline ("Where Quality meets Innovation"), the logo and no presets.
  202 |     const home = new MerchantHomePage(page);
  203 |     await home.open();
  204 |     await api.login();
  205 |     const { body } = await api.business();
  206 | 
  207 |     await home.openShareModal();
  208 |     await expect(page.getByText(body.data.details.tagline)).toBeVisible();
  209 |     await expect(page.getByText("₦12,000")).toBeHidden();
  210 |   });
  211 | });
  212 | 
```