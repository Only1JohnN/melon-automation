# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/storefront.api.spec.ts >> @storefront @api >> should return the public business details for a pay link slug @smoke
- Location: tests/api/storefront.api.spec.ts:10:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
```

# Test source

```ts
  1   | import { test, expect } from "../../fixtures/baseTest";
  2   | import { env } from "../../config/environment";
  3   | import { toApiPhone } from "../../api/MelonApi";
  4   | 
  5   | const SLUG = env.testStoreSlug;
  6   | // Lookup only — a GET on this endpoint never sends anything to the number.
  7   | const UNREGISTERED_PHONE = "8011122233";
  8   | 
  9   | test.describe("@storefront @api", () => {
  10  |   test("should return the public business details for a pay link slug @smoke", async ({ api }) => {
  11  |     const { status, body } = await api.publicBusiness(SLUG);
  12  | 
> 13  |     expect(status).toBe(200);
      |                    ^ Error: expect(received).toBe(expected) // Object.is equality
  14  |     expect(body.data.name).toBeTruthy();
  15  |     expect(body.data.slug ?? SLUG).toBe(SLUG);
  16  |     expect(body.data.tagline).toBeTruthy();
  17  |     expect(body.data.logo).toMatch(/^https:\/\//);
  18  |     expect(new Date(body.data.created_at).getTime()).not.toBeNaN();
  19  |   });
  20  | 
  21  |   test("should answer 404 for a business that does not exist", async ({ api }) => {
  22  |     const { status, body } = await api.publicBusiness("this-business-does-not-exist");
  23  | 
  24  |     expect(status).toBe(404);
  25  |     expect(body.message).toBe("Business not found");
  26  |   });
  27  | 
  28  |   test("should recognise an existing customer's phone number", async ({ api }) => {
  29  |     test.skip(!env.testPhoneNumber, "Set TEST_PHONE_NUMBER");
  30  |     const { status, body } = await api.validatePhone(toApiPhone(env.testPhoneNumber!));
  31  | 
  32  |     expect(status).toBe(200);
  33  |     expect(body.message).toBe("User found");
  34  |     expect(body.data.user.phone_number).toBe(toApiPhone(env.testPhoneNumber!));
  35  |     expect(body.data.user.disable).toBe(false);
  36  |   });
  37  | 
  38  |   test("should answer 404 for a phone number that is new to Melon (the UI then asks for an OTP)", async ({ api }) => {
  39  |     const { status, body } = await api.validatePhone(UNREGISTERED_PHONE);
  40  | 
  41  |     expect(status).toBe(404);
  42  |     expect(body.message).toBe("User not found");
  43  |   });
  44  | 
  45  |   test("should create a payment link with a unique account and a 30 minute expiry", async ({ api }) => {
  46  |     test.skip(!env.testPhoneNumber, "Set TEST_PHONE_NUMBER");
  47  | 
  48  |     const { status, body } = await api.createPaymentLink({
  49  |       phone: toApiPhone(env.testPhoneNumber!),
  50  |       slug: SLUG,
  51  |       amount: "1500",
  52  |     });
  53  | 
  54  |     expect(status).toBe(201);
  55  |     const { dynamic_account: account, payment_link: link } = body.data;
  56  | 
  57  |     expect(link.transaction_id).toMatch(/^MELON-\d+$/);
  58  |     expect(link.account_number).toMatch(/^\d{10}$/);
  59  |     expect(link.payment_status).toBe("pending");
  60  |     expect(account.requestAmount).toBe(1500);
  61  |     expect(account.totalPaymentAmount).toBe(1500);
  62  |     expect(account.paymentMethods.some((m: any) => m.properties.AccountNumber === link.account_number)).toBe(true);
  63  | 
  64  |     // expiryDateTimeUTC comes without a "Z", which JS would read as local time — pin it to UTC.
  65  |     const expiry = String(account.expiryDateTimeUTC);
  66  |     const expiresIn = new Date(/[zZ]|[+-]\d\d:?\d\d$/.test(expiry) ? expiry : `${expiry}Z`).getTime() - Date.now();
  67  |     expect(expiresIn).toBeGreaterThan(20 * 60 * 1000);
  68  |     expect(expiresIn).toBeLessThanOrEqual(31 * 60 * 1000);
  69  | 
  70  |     await test.step("Looking the link up by its reference returns the same pending payment", async () => {
  71  |       const lookup = await api.paymentLink(link.transaction_id);
  72  |       expect(lookup.status).toBe(200);
  73  |       expect(lookup.body.data.account_number).toBe(link.account_number);
  74  |       expect(lookup.body.data.payment_status).toBe("pending");
  75  |       expect(lookup.body.data.reward_coin_amount).toBeNull();
  76  |       expect(lookup.body.data.paid_amount_in_naira).toBeNull();
  77  |     });
  78  |   });
  79  | 
  80  |   test("should refuse a payment link request with missing fields, an unknown business or an unknown customer", async ({
  81  |     api,
  82  |   }) => {
  83  |     test.skip(!env.testPhoneNumber, "Set TEST_PHONE_NUMBER");
  84  |     const phone = toApiPhone(env.testPhoneNumber!);
  85  |     const cases = [
  86  |       { name: "empty amount", input: { phone, slug: SLUG, amount: "" }, status: 422, message: /amount/ },
  87  |       { name: "unknown business", input: { phone, slug: "this-business-does-not-exist", amount: "1000" }, status: 404, message: /Business not found/ },
  88  |       { name: "unknown customer", input: { phone: UNREGISTERED_PHONE, slug: SLUG, amount: "1000" }, status: 404, message: /User not found/ },
  89  |     ];
  90  | 
  91  |     for (const c of cases) {
  92  |       const { status, body } = await api.createPaymentLink(c.input);
  93  |       expect(status, c.name).toBe(c.status);
  94  |       expect(body.message, c.name).toMatch(c.message);
  95  |       expect(body.data, `${c.name}: no payment link is created`).toBeUndefined();
  96  |     }
  97  |   });
  98  | 
  99  |   test("should never create a payment link for an amount of 0, a negative amount or text", async ({ api }) => {
  100 |     test.skip(!env.testPhoneNumber, "Set TEST_PHONE_NUMBER");
  101 |     const phone = toApiPhone(env.testPhoneNumber!);
  102 | 
  103 |     for (const amount of ["0", "-500", "abc"]) {
  104 |       const { status, body } = await api.createPaymentLink({ phone, slug: SLUG, amount });
  105 |       expect(status, `amount "${amount}" is refused`).toBeGreaterThanOrEqual(400);
  106 |       expect(body.data?.payment_link, `amount "${amount}" creates no payment link`).toBeUndefined();
  107 |     }
  108 |   });
  109 | 
  110 |   test.fixme("should answer an invalid amount with a 422 validation error", async ({ api }) => {
  111 |     // TODO(dev): amount "0", "-500" and "abc" make POST /simple-mode/payment-links return HTTP 500 and
  112 |     // leak Paga's raw error ("Invalid request hash…", "Invalid amount -- amount must…"). An empty or missing
  113 |     // amount correctly gets 422 `"amount" is not allowed to be empty`. Expected: 422 with a friendly message
```