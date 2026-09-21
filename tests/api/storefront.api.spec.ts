import { test, expect } from "../../fixtures/baseTest";
import { env } from "../../config/environment";
import { toApiPhone } from "../../api/MelonApi";

const SLUG = env.testStoreSlug;
// Lookup only — a GET on this endpoint never sends anything to the number.
const UNREGISTERED_PHONE = "8011122233";

test.describe("@storefront @api", () => {
  test("should return the public business details for a pay link slug @smoke", async ({ api }) => {
    const { status, body } = await api.publicBusiness(SLUG);

    expect(status).toBe(200);
    expect(body.data.name).toBeTruthy();
    expect(body.data.slug ?? SLUG).toBe(SLUG);
    expect(body.data.tagline).toBeTruthy();
    expect(body.data.logo).toMatch(/^https:\/\//);
    expect(new Date(body.data.created_at).getTime()).not.toBeNaN();
  });

  test("should answer 404 for a business that does not exist", async ({ api }) => {
    const { status, body } = await api.publicBusiness("this-business-does-not-exist");

    expect(status).toBe(404);
    expect(body.message).toBe("Business not found");
  });

  test("should recognise an existing customer's phone number", async ({ api }) => {
    test.skip(!env.testPhoneNumber, "Set TEST_PHONE_NUMBER");
    const { status, body } = await api.validatePhone(toApiPhone(env.testPhoneNumber!));

    expect(status).toBe(200);
    expect(body.message).toBe("User found");
    expect(body.data.user.phone_number).toBe(toApiPhone(env.testPhoneNumber!));
    expect(body.data.user.disable).toBe(false);
  });

  test("should answer 404 for a phone number that is new to Melon (the UI then asks for an OTP)", async ({ api }) => {
    const { status, body } = await api.validatePhone(UNREGISTERED_PHONE);

    expect(status).toBe(404);
    expect(body.message).toBe("User not found");
  });

  test("should create a payment link with a unique account and a 30 minute expiry", async ({ api }) => {
    test.skip(!env.testPhoneNumber, "Set TEST_PHONE_NUMBER");

    const { status, body } = await api.createPaymentLink({
      phone: toApiPhone(env.testPhoneNumber!),
      slug: SLUG,
      amount: "1500",
    });

    expect(status).toBe(201);
    const { dynamic_account: account, payment_link: link } = body.data;

    expect(link.transaction_id).toMatch(/^MELON-\d+$/);
    expect(link.account_number).toMatch(/^\d{10}$/);
    expect(link.payment_status).toBe("pending");
    expect(account.requestAmount).toBe(1500);
    expect(account.totalPaymentAmount).toBe(1500);
    expect(account.paymentMethods.some((m: any) => m.properties.AccountNumber === link.account_number)).toBe(true);

    // expiryDateTimeUTC comes without a "Z", which JS would read as local time — pin it to UTC.
    const expiry = String(account.expiryDateTimeUTC);
    const expiresIn = new Date(/[zZ]|[+-]\d\d:?\d\d$/.test(expiry) ? expiry : `${expiry}Z`).getTime() - Date.now();
    expect(expiresIn).toBeGreaterThan(20 * 60 * 1000);
    expect(expiresIn).toBeLessThanOrEqual(31 * 60 * 1000);

    await test.step("Looking the link up by its reference returns the same pending payment", async () => {
      const lookup = await api.paymentLink(link.transaction_id);
      expect(lookup.status).toBe(200);
      expect(lookup.body.data.account_number).toBe(link.account_number);
      expect(lookup.body.data.payment_status).toBe("pending");
      expect(lookup.body.data.reward_coin_amount).toBeNull();
      expect(lookup.body.data.paid_amount_in_naira).toBeNull();
    });
  });

  test("should refuse a payment link request with missing fields, an unknown business or an unknown customer", async ({
    api,
  }) => {
    test.skip(!env.testPhoneNumber, "Set TEST_PHONE_NUMBER");
    const phone = toApiPhone(env.testPhoneNumber!);
    const cases = [
      { name: "empty amount", input: { phone, slug: SLUG, amount: "" }, status: 422, message: /amount/ },
      { name: "unknown business", input: { phone, slug: "this-business-does-not-exist", amount: "1000" }, status: 404, message: /Business not found/ },
      { name: "unknown customer", input: { phone: UNREGISTERED_PHONE, slug: SLUG, amount: "1000" }, status: 404, message: /User not found/ },
    ];

    for (const c of cases) {
      const { status, body } = await api.createPaymentLink(c.input);
      expect(status, c.name).toBe(c.status);
      expect(body.message, c.name).toMatch(c.message);
      expect(body.data, `${c.name}: no payment link is created`).toBeUndefined();
    }
  });

  test("should never create a payment link for an amount of 0, a negative amount or text", async ({ api }) => {
    test.skip(!env.testPhoneNumber, "Set TEST_PHONE_NUMBER");
    const phone = toApiPhone(env.testPhoneNumber!);

    for (const amount of ["0", "-500", "abc"]) {
      const { status, body } = await api.createPaymentLink({ phone, slug: SLUG, amount });
      expect(status, `amount "${amount}" is refused`).toBeGreaterThanOrEqual(400);
      expect(body.data?.payment_link, `amount "${amount}" creates no payment link`).toBeUndefined();
    }
  });

  test.fixme("should answer an invalid amount with a 422 validation error", async ({ api }) => {
    // TODO(dev): amount "0", "-500" and "abc" make POST /simple-mode/payment-links return HTTP 500 and
    // leak Paga's raw error ("Invalid request hash…", "Invalid amount -- amount must…"). An empty or missing
    // amount correctly gets 422 `"amount" is not allowed to be empty`. Expected: 422 with a friendly message
    // for every invalid amount, never a 500. (The UI can't send these — the button stays disabled — so only
    // direct API callers hit it.)
    const phone = toApiPhone(env.testPhoneNumber!);

    for (const amount of ["0", "-500", "abc"]) {
      const { status, body } = await api.createPaymentLink({ phone, slug: SLUG, amount });
      expect(status, `amount "${amount}"`).toBe(422);
      expect(JSON.stringify(body), "no upstream provider text leaks").not.toMatch(/hash|Paga/i);
    }
  });

  test("should answer 404 when looking up a payment reference that does not exist", async ({ api }) => {
    const { status } = await api.paymentLink("MELON-000000000000");

    expect(status).toBe(404);
  });
});
