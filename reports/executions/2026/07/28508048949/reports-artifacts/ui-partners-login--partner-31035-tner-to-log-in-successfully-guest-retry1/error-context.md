# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/login.spec.ts >> @partners @auth >> should allow a partner to log in successfully
- Location: tests/ui/partners/login.spec.ts:10:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /get-started/
Received string:  "https://partner-dev.getmelon.co/home"

Call log:
  - Expect "toHaveURL" with timeout 100000ms
    12 × unexpected value "https://partner-dev.getmelon.co/auth/login"
    56 × unexpected value "https://partner-dev.getmelon.co/home"

```

```yaml
- complementary:
  - img "melon logo"
  - link:
    - /url: /home
    - img
  - link:
    - /url: /offers
    - img
  - link:
    - /url: /home
    - img
  - link:
    - /url: /inventory/products
    - img
  - link:
    - /url: /order-mgmt
    - img
  - link:
    - /url: /inventory/warehouse
    - img
  - link:
    - /url: /inventory/category
    - img
  - link:
    - /url: /transactions
    - img
  - link:
    - /url: /settings/profile
    - img
  - link:
    - /url: /home
    - img
  - button "M"
- button:
  - img
- button "M Q"
- main:
  - heading "Turbocharge Your Sales with Melon Offers!" [level=2]
  - paragraph: Get ready to launch irresistible offers that drive customer loyalty, boost engagement, and skyrocket your revenue. Define your rewards, reach the right audience, and watch your business thrive.
  - button "Get Started"
  - heading "Overview" [level=2]
  - heading "Total Customers" [level=3]
  - paragraph: "1"
  - img
  - heading "Total Members" [level=3]
  - paragraph: "2"
  - img
  - heading "Total Transactions processed" [level=3]
  - paragraph: ₦23,220.00
  - img
  - heading "Total Coins processed" [level=3]
  - paragraph: 1,100
  - img
  - heading "Recent Activities" [level=2]
  - button "View all"
  - table:
    - rowgroup:
      - row "Date Reciept ID Melon ID Amount Coin Type Coin Value":
        - columnheader "Date"
        - columnheader "Reciept ID"
        - columnheader "Melon ID"
        - columnheader "Amount"
        - columnheader "Coin Type"
        - columnheader "Coin Value"
        - columnheader
    - rowgroup:
      - row "26/06/2026 ML-TXN-260626444503 8069972717 ₦ 23,220.00 Offer & Standard 1,100":
        - cell "26/06/2026"
        - cell "ML-TXN-260626444503"
        - cell "8069972717"
        - cell "₦ 23,220.00"
        - cell "Offer & Standard"
        - cell "1,100"
        - cell:
          - button:
            - img
- region "Notifications Alt+T"
- region "Notifications alt+T"
```

# Test source

```ts
  1  | import { Applications } from "../../../config/applications";
  2  | import { LoginPage } from "../../../pages/partners/LoginPage";
  3  | 
  4  | import {
  5  |   test,
  6  |   expect,
  7  | } from "../../../fixtures/baseTest";
  8  | 
  9  | test.describe("@partners @auth", () => {
  10 |   test("should allow a partner to log in successfully", async ({
  11 |     page,
  12 |   }) => {
  13 |     const loginPage = new LoginPage(page);
  14 | 
  15 |     await page.goto(Applications.partners.url);
  16 | 
  17 |     await loginPage.login(
  18 |       process.env.PARTNER_EMAIL!,
  19 |       process.env.PARTNER_PASSWORD!
  20 |     );
  21 | 
> 22 |     await expect(page).toHaveURL(/get-started/, {
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  23 |       timeout: 100000,
  24 |     });
  25 |   });
  26 | 
  27 |   test("should display an error message for invalid credentials", async ({
  28 |     page,
  29 |   }) => {
  30 |     const loginPage = new LoginPage(page);
  31 | 
  32 |     await page.goto(Applications.partners.url);
  33 | 
  34 |     await loginPage.login(
  35 |       "invalid.user@yopmail.com",
  36 |       "InvalidPassword123!"
  37 |     );
  38 | 
  39 |     await expect(
  40 |       page.getByText("User not found")
  41 |     ).toBeVisible({
  42 |       timeout: 100000,
  43 |     });
  44 |   });
  45 | 
  46 |   test.describe("@partners", () => {
  47 |     test("should display verification failed page for an invalid verification token and allow navigation to login", async ({
  48 |       page,
  49 |     }) => {
  50 |       const loginPage = new LoginPage(page);
  51 |       await page.goto(
  52 |         `${Applications.partners.url}/auth/email-verified/3264794e-896f-44c4-b709-740470b66073`
  53 |       );
  54 | 
  55 |       await expect(
  56 |         page.getByRole("heading", {
  57 |           name: /verification failed/i,
  58 |         })
  59 |       ).toBeVisible();
  60 | 
  61 |       await page.getByRole("button", {
  62 |         name: /back to log in/i,
  63 |       }).click();
  64 | 
  65 |       await expect(page).toHaveURL(
  66 |         /auth\/login/,
  67 |         {
  68 |           timeout: 100000,
  69 |         }
  70 |       );
  71 | 
  72 |       await expect(
  73 |         loginPage.emailInput
  74 |       ).toBeVisible();
  75 | 
  76 |       await expect(
  77 |         loginPage.passwordInput
  78 |       ).toBeVisible();
  79 |     });
  80 |   });
  81 | });
```