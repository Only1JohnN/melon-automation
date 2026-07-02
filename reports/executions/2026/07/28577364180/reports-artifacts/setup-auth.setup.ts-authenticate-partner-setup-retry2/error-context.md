# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: setup/auth.setup.ts >> authenticate partner
- Location: tests/setup/auth.setup.ts:3:5

# Error details

```
Error: expect(page).not.toHaveURL(expected) failed

Expected pattern: not /auth\/login/
Received string: "https://partner-dev.getmelon.co/auth/login"
Timeout: 5000ms

Call log:
  - Expect "not toHaveURL" with timeout 5000ms
    14 × unexpected value "https://partner-dev.getmelon.co/auth/login"

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
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test(
  4  |   "authenticate partner",
  5  |   async ({ page }) => {
  6  |     await page.goto(
  7  |       `${process.env.PARTNER_URL}/auth/login`
  8  |     );
  9  | 
  10 |     await page
  11 |       .getByRole("textbox", {
  12 |         name: "Email Address",
  13 |       })
  14 |       .fill(
  15 |         process.env.PARTNER_EMAIL!
  16 |       );
  17 | 
  18 |     await page
  19 |       .getByRole("textbox", {
  20 |         name: "Enter password",
  21 |       })
  22 |       .fill(
  23 |         process.env.PARTNER_PASSWORD!
  24 |       );
  25 | 
  26 |     await page
  27 |       .getByRole("button", {
  28 |           name: "Log In",
  29 |       })
  30 |       .click();
  31 |   
> 32 |     await expect(page).not.toHaveURL(
     |                            ^ Error: expect(page).not.toHaveURL(expected) failed
  33 |       /auth\/login/
  34 |       );
  35 |   
  36 |     await page.waitForTimeout(
  37 |       5000
  38 |       );
  39 |   
  40 |     await page.context().storageState({
  41 |       path: "playwright/.auth/partner.json",
  42 |       });
  43 |   }
  44 | );
```