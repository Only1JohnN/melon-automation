# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/partners/merchant/settings-profile.spec.ts >> @partners @settings @profile >> should save profile changes and persist them after a refresh
- Location: tests/ui/partners/merchant/settings-profile.spec.ts:55:7

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('tr').filter({ has: getByText('First name', { exact: true }) }).locator('td').nth(1)
Expected: "QaEdit471997"
Received: "UpdatedFirst-102337"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('tr').filter({ has: getByText('First name', { exact: true }) }).locator('td').nth(1)
    14 × locator resolved to <td class="text-sm text-pashBlack-6 capitalize">UpdatedFirst-102337</td>
       - unexpected value "UpdatedFirst-102337"

```

```yaml
- cell "UpdatedFirst-102337"
```

# Test source

```ts
  1   | import { ProfileSettingsPage } from "../../../../pages/partners/merchant/settings/ProfileSettingsPage";
  2   | import { test, expect } from "../../../../fixtures/baseTest";
  3   | import { env } from "../../../../config/environment";
  4   | 
  5   | test.describe("@partners @settings @profile", () => {
  6   |   test.describe.configure({ mode: "serial" });
  7   | 
  8   |   let original: { first_name: string; last_name: string; street: string };
  9   | 
  10  |   // Every edit test restores the account through the API, even if the UI part failed midway.
  11  |   test.beforeEach(async ({ api }) => {
  12  |     await api.login();
  13  |     const { body } = await api.personal();
  14  |     original = {
  15  |       first_name: body.data.first_name,
  16  |       last_name: body.data.last_name,
  17  |       street: body.data.street,
  18  |     };
  19  |   });
  20  | 
  21  |   test.afterEach(async ({ api }) => {
  22  |     const { body } = await api.personal();
  23  |     await api.updatePersonal({
  24  |       first_name: original.first_name,
  25  |       last_name: original.last_name,
  26  |       email: body.data.email,
  27  |       gender: body.data.gender,
  28  |       phone_number: body.data.phone_number,
  29  |       street: original.street,
  30  |       city: body.data.city,
  31  |       state: body.data.state,
  32  |       country: body.data.country,
  33  |     });
  34  |   });
  35  | 
  36  |   test("should show the merchant's profile details @smoke", async ({ page, api }) => {
  37  |     const profile = new ProfileSettingsPage(page);
  38  | 
  39  |     await profile.open();
  40  |     await profile.expectSectionMenuVisible();
  41  | 
  42  |     const { status, body } = await api.personal();
  43  |     expect(status).toBe(200);
  44  | 
  45  |     await test.step("Profile table matches the profile API", async () => {
  46  |       await expect(profile.valueOf("First name")).toHaveText(body.data.first_name);
  47  |       await expect(profile.valueOf("Last name")).toHaveText(body.data.last_name);
  48  |       await expect(profile.valueOf("Email")).toHaveText(env.partnerEmail);
  49  |       await expect(profile.valueOf("Phone number")).toHaveText(body.data.phone_number);
  50  |       await expect(profile.valueOf("Gender")).toHaveText(new RegExp(body.data.gender, "i"));
  51  |       await expect(profile.valueOf("Address")).toHaveText(body.data.street);
  52  |     });
  53  |   });
  54  | 
  55  |   test("should save profile changes and persist them after a refresh", async ({ page, api }) => {
  56  |     const profile = new ProfileSettingsPage(page);
  57  |     const newName = `QaEdit${Date.now().toString().slice(-6)}`;
  58  | 
  59  |     await profile.open();
  60  |     await profile.startEditing();
  61  | 
  62  |     await expect(profile.firstNameInput).toHaveValue(original.first_name);
  63  | 
  64  |     const response = await profile.saveChanges({ firstName: newName });
  65  |     expect(response.status(), "update profile API").toBe(200);
  66  |     expect((await response.json()).message).toBe("Update Personal details");
  67  | 
  68  |     await profile.expectToast("Update Personal details");
> 69  |     await expect(profile.valueOf("First name")).toHaveText(newName);
      |                                                 ^ Error: expect(locator).toHaveText(expected) failed
  70  | 
  71  |     await test.step("Change survives a page refresh and is stored by the backend", async () => {
  72  |       await page.reload();
  73  |       await profile.waitUntilReady();
  74  |       await expect(profile.valueOf("First name")).toHaveText(newName);
  75  | 
  76  |       const { body } = await api.personal();
  77  |       expect(body.data.first_name).toBe(newName);
  78  |     });
  79  |   });
  80  | 
  81  |   test("should discard changes when the edit is cancelled", async ({ page }) => {
  82  |     const profile = new ProfileSettingsPage(page);
  83  | 
  84  |     await profile.open();
  85  |     await profile.startEditing();
  86  |     await profile.firstNameInput.fill("ShouldNotBeSaved");
  87  |     await profile.cancelButton.click();
  88  | 
  89  |     await expect(profile.firstNameInput).toBeHidden();
  90  |     await expect(profile.valueOf("First name")).toHaveText(original.first_name);
  91  |   });
  92  | 
  93  |   test("should reject an empty first name and keep the stored value", async ({ page, api }) => {
  94  |     const profile = new ProfileSettingsPage(page);
  95  | 
  96  |     await profile.open();
  97  |     await profile.startEditing();
  98  | 
  99  |     // TODO(dev): the form has no client-side validation, so the empty name is sent and only the
  100 |     // API refuses it (422). Once the form validates first, assert an inline "required" message here.
  101 |     const response = await profile.saveChanges({ firstName: "" });
  102 |     expect(response.status(), "API refuses an empty first name").toBe(422);
  103 |     expect((await response.json()).message).toContain("first_name");
  104 | 
  105 |     const { body } = await api.personal();
  106 |     expect(body.data.first_name).toBe(original.first_name);
  107 |   });
  108 | 
  109 |   test("should let the merchant move between settings sections", async ({ page }) => {
  110 |     const profile = new ProfileSettingsPage(page);
  111 | 
  112 |     await profile.open();
  113 | 
  114 |     const sections = [
  115 |       ["Business Details", /\/simple\/settings\/business/],
  116 |       ["Reward Payment Link", /\/simple\/settings\/payment-link/],
  117 |       ["Qr Code", /\/simple\/settings\/qrcode/],
  118 |       ["Website & Social Media", /\/simple\/settings\/socials/],
  119 |       ["Physical Store Location", /\/simple\/settings\/locations/],
  120 |       ["Profile", /\/simple\/settings\/profile/],
  121 |     ] as const;
  122 | 
  123 |     for (const [name, url] of sections) {
  124 |       await profile.openSection(name);
  125 |       await expect(page).toHaveURL(url);
  126 |     }
  127 |   });
  128 | });
  129 | 
```