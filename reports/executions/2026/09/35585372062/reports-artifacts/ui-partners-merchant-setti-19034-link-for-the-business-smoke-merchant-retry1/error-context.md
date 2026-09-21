# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/merchant/settings-payment-link.spec.ts >> @partners @settings @payment-link >> should show the reward payment link for the business @smoke
- Location: tests/ui/partners/merchant/settings-payment-link.spec.ts:8:7

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
          - img [ref=e11]
          - generic [ref=e14]: Home
        - link "Transactions" [ref=e15] [cursor=pointer]:
          - /url: /simple/transactions
          - img [ref=e16]
          - generic [ref=e18]: Transactions
        - link "Settings" [ref=e19] [cursor=pointer]:
          - /url: /simple/settings
          - img [ref=e20]
          - generic [ref=e23]: Settings
      - heading "Appear here!" [level=1] [ref=e25]
    - generic [ref=e27]:
      - heading "Settings" [level=1] [ref=e29]
      - generic [ref=e30]:
        - generic [ref=e31]:
          - link "Profile" [ref=e32] [cursor=pointer]:
            - /url: /simple/settings/profile
            - img [ref=e33]
            - heading "Profile" [level=1] [ref=e35]
          - link "Business Details" [ref=e36] [cursor=pointer]:
            - /url: /simple/settings/business
            - img [ref=e37]
            - heading "Business Details" [level=1] [ref=e40]
          - link "Withdrawal Bank" [ref=e41] [cursor=pointer]:
            - /url: /simple/settings/withdrawal
            - img [ref=e42]
            - heading "Withdrawal Bank" [level=1] [ref=e47]
          - link "Reward Payment Link" [ref=e48] [cursor=pointer]:
            - /url: /simple/settings/payment-link
            - img [ref=e49]
            - heading "Reward Payment Link" [level=1] [ref=e52]
          - link "Qr Code" [ref=e53] [cursor=pointer]:
            - /url: /simple/settings/qrcode
            - img [ref=e54]
            - heading "Qr Code" [level=1] [ref=e60]
          - link "Website & Social Media" [ref=e61] [cursor=pointer]:
            - /url: /simple/settings/socials
            - img [ref=e62]
            - heading "Website & Social Media" [level=1] [ref=e65]
          - link "Physical Store Location" [ref=e66] [cursor=pointer]:
            - /url: /simple/settings/locations
            - img [ref=e67]
            - heading "Physical Store Location" [level=1] [ref=e70]
        - generic [ref=e72]:
          - generic [ref=e73]:
            - heading "Reward Payment Link" [level=1] [ref=e74]
            - paragraph [ref=e75]: The link customers use to pay you and earn Melon Coins
          - generic [ref=e76]:
            - generic [ref=e77]:
              - heading "Link details" [level=1] [ref=e78]
              - generic [ref=e79]:
                - heading "Your live link" [level=1] [ref=e80]
                - generic [ref=e81]:
                  - paragraph [ref=e82]: https://customer.getmelon.co/pay/melon-qa-bot
                  - button [ref=e83] [cursor=pointer]:
                    - img [ref=e84]
            - generic [ref=e87]:
              - heading "How it works" [level=1] [ref=e88]
              - paragraph [ref=e90]: Customers who pay you through this link earn Melon Coins on every eligible payment. It is the same link behind your QR code and the Get Paid card on your dashboard.
  - region "Notifications Alt+T"
  - region "Notifications alt+T"
```

# Test source

```ts
  1  | import { PaymentLinkSettingsPage } from "../../../../pages/partners/merchant/settings/PaymentLinkSettingsPage";
  2  | import { MerchantHomePage } from "../../../../pages/partners/merchant/HomePage";
  3  | import { PayLinkPage } from "../../../../pages/storefront/PayLinkPage";
  4  | import { test, expect } from "../../../../fixtures/baseTest";
  5  | import { env } from "../../../../config/environment";
  6  | 
  7  | test.describe("@partners @settings @payment-link", () => {
  8  |   test("should show the reward payment link for the business @smoke", async ({ page, api }) => {
  9  |     const paymentLink = new PaymentLinkSettingsPage(page);
  10 | 
  11 |     await paymentLink.open();
  12 |     await expect(paymentLink.howItWorks).toBeVisible();
  13 | 
  14 |     await api.login();
  15 |     const { body } = await api.business();
  16 |     const expected = `${env.storefrontUrl}/pay/${body.data.details.slug}`;
  17 | 
> 18 |     expect(await paymentLink.link()).toBe(expected);
     |                                      ^ Error: expect(received).toBe(expected) // Object.is equality
  19 |   });
  20 | 
  21 |   test("should point to a link that is reachable and opens this business's pay page @smoke", async ({
  22 |     page,
  23 |     customerPage,
  24 |     api,
  25 |   }) => {
  26 |     const paymentLink = new PaymentLinkSettingsPage(page);
  27 |     await paymentLink.open();
  28 |     const link = await paymentLink.link();
  29 | 
  30 |     await test.step("The link answers with HTTP 200", async () => {
  31 |       const response = await page.request.get(link);
  32 |       expect(response.status()).toBe(200);
  33 |     });
  34 | 
  35 |     await test.step("A customer opening it lands on this business's pay page", async () => {
  36 |       await customerPage.goto(link);
  37 |       const payLinkPage = new PayLinkPage(customerPage);
  38 |       await expect(payLinkPage.amountInput).toBeVisible({ timeout: 30_000 });
  39 | 
  40 |       await api.login();
  41 |       const { body } = await api.business();
  42 |       await expect(customerPage.getByText(body.data.details.name, { exact: true }).first()).toBeVisible();
  43 |     });
  44 |   });
  45 | 
  46 |   test("should show the same link as the Get Paid card on the dashboard home", async ({ page }) => {
  47 |     const paymentLink = new PaymentLinkSettingsPage(page);
  48 |     const home = new MerchantHomePage(page);
  49 | 
  50 |     await paymentLink.open();
  51 |     const settingsLink = await paymentLink.link();
  52 | 
  53 |     await home.open();
  54 |     expect(`https://${await home.paymentLinkText()}`).toBe(settingsLink);
  55 |   });
  56 | 
  57 |   test("should copy the link with the copy button", async ({ page, context }) => {
  58 |     await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  59 |     const paymentLink = new PaymentLinkSettingsPage(page);
  60 | 
  61 |     await paymentLink.open();
  62 |     const link = await paymentLink.link();
  63 |     await paymentLink.copyButton.click();
  64 | 
  65 |     await expect
  66 |       .poll(() => page.evaluate(() => navigator.clipboard.readText()))
  67 |       .toBe(link);
  68 |   });
  69 | });
  70 | 
```