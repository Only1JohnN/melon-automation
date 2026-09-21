# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/merchant.api.spec.ts >> @partners @api >> should list an active payment QR code for the reward link
- Location: tests/api/merchant.api.spec.ts:155:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "geotravel.getmelon.shop/stores/pay/"
Received: "https://customer.getmelon.co/pay/melon-qa-bot"
```

# Test source

```ts
  65  |     expect(overview.repeat_customers.repeat_percentage).toBeLessThanOrEqual(100);
  66  |     expect(overview.customers_rewarded.count).toBeLessThanOrEqual(overview.transactions.count);
  67  |   });
  68  | 
  69  |   test("should narrow the overview to a date range", async ({ api }) => {
  70  |     await api.login();
  71  |     const today = new Date().toISOString().slice(0, 10);
  72  |     const monthStart = `${today.slice(0, 8)}01`;
  73  | 
  74  |     const allTime = (await api.overview()).body.data;
  75  |     const month = await api.overviewBetween(monthStart, today);
  76  |     const day = await api.overviewBetween(today, today);
  77  | 
  78  |     expect(month.status).toBe(200);
  79  |     expect(day.status).toBe(200);
  80  |     expect(day.body.data.revenue.amount).toBeLessThanOrEqual(month.body.data.revenue.amount);
  81  |     expect(month.body.data.revenue.amount).toBeLessThanOrEqual(allTime.revenue.amount);
  82  |     expect(day.body.data.transactions.count).toBeLessThanOrEqual(allTime.transactions.count);
  83  |   });
  84  | 
  85  |   test("should page through transactions, newest first", async ({ api }) => {
  86  |     await api.login();
  87  |     const first = await api.transactions(1, 10);
  88  |     const second = await api.transactions(2, 10);
  89  | 
  90  |     expect(first.status).toBe(200);
  91  |     expect(first.body.data.results.length).toBeLessThanOrEqual(10);
  92  |     expect(first.body.data.paginate).toBeTruthy();
  93  | 
  94  |     const firstIds = first.body.data.results.map((t: any) => t.transaction_id);
  95  |     const secondIds = second.body.data.results.map((t: any) => t.transaction_id);
  96  |     expect(secondIds.filter((id: string) => firstIds.includes(id))).toEqual([]);
  97  | 
  98  |     const dates = first.body.data.results.map((t: any) => new Date(t.created_at).getTime());
  99  |     expect([...dates].sort((a, b) => b - a)).toEqual(dates);
  100 |   });
  101 | 
  102 |   test("should reward exactly 100 coins per ₦1 of reward on every successful payment, and nothing otherwise", async ({
  103 |     api,
  104 |   }) => {
  105 |     await api.login();
  106 |     const all: any[] = [];
  107 |     for (let page = 1; page <= 5; page++) {
  108 |       const { body } = await api.transactions(page, 20);
  109 |       all.push(...body.data.results);
  110 |       if (body.data.results.length < 20) break;
  111 |     }
  112 |     expect(all.length).toBeGreaterThan(0);
  113 | 
  114 |     for (const t of all) {
  115 |       if (t.payment_status === "successful") {
  116 |         const paid = Number(t.paid_amount_in_naira);
  117 |         expect(paid, `${t.transaction_id} paid amount`).toBe(Number(t.requesting_amount_in_naira));
  118 |         expect(t.reward_coin_amount, `${t.transaction_id} coins`).toBe(expectedCoins(paid));
  119 |         expect(Number(t.reward_naira_amount), `${t.transaction_id} reward ₦`).toBe(expectedRewardNaira(paid));
  120 |         expect(t.reward_status).toBe("successful");
  121 |       } else {
  122 |         expect(["pending", "expired", "failed"], `${t.transaction_id} status`).toContain(t.payment_status);
  123 |         expect(t.reward_coin_amount ?? 0, `${t.transaction_id} coins`).toBe(0);
  124 |       }
  125 |     }
  126 |   });
  127 | 
  128 |   test("should return the merchant wallet in kobo", async ({ api }) => {
  129 |     await api.login();
  130 |     const { status, body } = await api.wallet();
  131 |     const business = (await api.business()).body.data;
  132 | 
  133 |     expect(status).toBe(200);
  134 |     expect(Number.isInteger(body.data.balance)).toBe(true);
  135 |     expect(body.data.account_name).toBe(business.details.name);
  136 |     expect(body.data.provider).toBe("paga");
  137 |     expect(body.data.account_number).toMatch(/^\d{10}$/);
  138 |   });
  139 | 
  140 |   test("should return the business and personal profile", async ({ api }) => {
  141 |     await api.login();
  142 |     const business = await api.business();
  143 |     const personal = await api.personal();
  144 | 
  145 |     expect(business.status).toBe(200);
  146 |     expect(business.body.data.details.slug).toBe(env.testStoreSlug);
  147 |     expect(business.body.data.details.type).toBe("registered");
  148 | 
  149 |     expect(personal.status).toBe(200);
  150 |     expect(personal.body.data.email).toBe(env.partnerEmail);
  151 |     expect(personal.body.data.phone_verified).toBe(true);
  152 |     expect(personal.body.data.profile_completed).toBe(true);
  153 |   });
  154 | 
  155 |   test("should list an active payment QR code for the reward link", async ({ api }) => {
  156 |     await api.login();
  157 |     const { status, body } = await api.qrCodes();
  158 |     expect(status).toBe(200);
  159 | 
  160 |     const link = `${env.storefrontUrl}/pay/${env.testStoreSlug}`;
  161 |     const active = body.data.results.filter((q: any) => q.status === "active" && q.qr_type === "payment");
  162 | 
  163 |     expect(active.length).toBeGreaterThan(0);
  164 |     for (const qr of active) {
> 165 |       expect(qr.qr_data).toBe(link);
      |                          ^ Error: expect(received).toBe(expected) // Object.is equality
  166 |       expect(qr.qr_image_url).toMatch(/^https:\/\/.+\.png$/);
  167 |       expect(typeof qr.scan_count).toBe("number");
  168 |     }
  169 |   });
  170 | 
  171 |   test("should return the withdrawal history", async ({ api }) => {
  172 |     await api.login();
  173 |     const { status, body } = await api.withdrawals(1, 10);
  174 | 
  175 |     expect(status).toBe(200);
  176 |     expect(Array.isArray(body.data.results)).toBe(true);
  177 |     expect(body.data.paginate).toBeTruthy();
  178 |   });
  179 | });
  180 | 
```