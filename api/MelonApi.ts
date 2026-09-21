import { APIRequestContext, expect, test } from "@playwright/test";
import { env } from "../config/environment";
import { logApiCall } from "../utils/networkLogger";

export interface ApiResult<T = any> {
  status: number;
  body: T;
}

/**
 * Thin client over the Melon backend. Merchant calls need `login()` first; the
 * public/customer endpoints (`publicBusiness`, `validatePhone`, `createPaymentLink`,
 * `paymentLink`) don't. Every call is a report step and lands in the test's API activity.
 */
export class MelonApi {
  token?: string;
  businessId!: string;
  memberId!: string;

  constructor(private readonly request: APIRequestContext) {}

  private async send<T = any>(
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    path: string,
    options: { data?: unknown; auth?: boolean } = {}
  ): Promise<ApiResult<T>> {
    return test.step(`API ${method} ${path.split("?")[0]}`, async () => {
      const url = `${env.apiUrl}${path}`;
      const headers: Record<string, string> = {};

      if (options.auth !== false && this.token) {
        headers.Authorization = `Bearer ${this.token}`;
      }

      const response = await this.request.fetch(url, {
        method,
        headers,
        data: options.data as any,
        failOnStatusCode: false,
      });

      const text = await response.text();
      let body: any = text;
      try {
        body = JSON.parse(text);
      } catch {}

      logApiCall(test.info().testId, {
        timestamp: new Date().toISOString(),
        source: "api",
        resourceType: "fetch",
        method,
        url,
        status: response.status(),
        request: {
          headers,
          body: options.data ? JSON.stringify(options.data) : null,
        },
        response: { headers: response.headers(), body: text },
      });

      return { status: response.status(), body };
    });
  }

  // ── Merchant (authenticated) ────────────────────────────────────────────

  async login(email = env.partnerEmail, password = env.partnerPassword) {
    const result = await this.send("POST", "/auth/login-member", {
      data: { email, password },
      auth: false,
    });

    expect(result.status, "merchant login should succeed").toBe(200);

    this.token = result.body.data.token;
    this.businessId = result.body.data.member.default_business;
    this.memberId = result.body.data.member.member_id;

    return result;
  }

  overview() {
    return this.send(`GET`, `/simple-mode/business/${this.businessId}/overview`);
  }

  transactions(page = 1, limit = 10) {
    return this.send(
      "GET",
      `/simple-mode/business/${this.businessId}/transactions?page=${page}&limit=${limit}`
    );
  }

  wallet() {
    return this.send("GET", `/wallets/businesses/${this.businessId}`);
  }

  business() {
    return this.send("GET", `/businesses/${this.businessId}`);
  }

  personal() {
    return this.send("GET", `/businesses/personal/${this.memberId}`);
  }

  updatePersonal(fields: Record<string, unknown>) {
    return this.send("PUT", `/businesses/personal/${this.memberId}`, { data: fields });
  }

  updateBusiness(fields: Record<string, unknown>) {
    return this.send("PUT", `/businesses/${this.businessId}`, { data: fields });
  }

  withdrawals(page = 1, limit = 10) {
    return this.send("GET", `/wallets/withdrawals/${this.businessId}?page=${page}&limit=${limit}`);
  }

  overviewBetween(startDate: string, endDate: string) {
    return this.send(
      "GET",
      `/simple-mode/business/${this.businessId}/overview?startDate=${startDate}&endDate=${endDate}`
    );
  }

  qrCodes() {
    return this.send("GET", `/qr-codes/list/${this.businessId}`);
  }

  // ── Public / customer side (no auth) ────────────────────────────────────

  publicBusiness(slug: string) {
    return this.send("GET", `/details/${slug}`, { auth: false });
  }

  /** Phone is sent without the leading zero, e.g. 7080702920. 200 = known customer, 404 = new. */
  validatePhone(phone: string) {
    return this.send("GET", `/auth/validate-phone/${phone}`, { auth: false });
  }

  createPaymentLink(input: { phone: string; slug: string; amount: string }) {
    return this.send("POST", "/simple-mode/payment-links", {
      data: {
        phone_number: input.phone,
        business_slug: input.slug,
        amount: input.amount,
      },
      auth: false,
    });
  }

  paymentLink(transactionId: string) {
    return this.send("GET", `/simple-mode/payment-links?transactionId=${transactionId}`, {
      auth: false,
    });
  }
}

/** "07080702920" -> "7080702920" (the format the customer API expects). */
export function toApiPhone(localNumber: string) {
  return localNumber.replace(/^0/, "");
}
