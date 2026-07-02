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
Received string:  "https://partner-dev.getmelon.co/auth/login"

Call log:
  - Expect "toHaveURL" with timeout 100000ms
    68 × unexpected value "https://partner-dev.getmelon.co/auth/login"

```

```yaml
- main:
  - link:
    - /url: /
  - heading "Welcome Back!" [level=1]
  - paragraph: Log In to your account to continue.
  - paragraph: User not found
  - button:
    - img
  - text: Email Address
  - textbox "Email Address":
    - /placeholder: Enter business email
    - text: melonqabot@yopmail.com
  - text: Password
  - textbox "Enter password": Password@12345
  - button:
    - img
  - text: Forgot password?
  - link "Reset here":
    - /url: /auth/forgot-password
  - button "Log In"
  - paragraph:
    - text: New to Melon?
    - link "Create an account":
      - /url: /auth/create-account
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