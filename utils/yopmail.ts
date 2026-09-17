import { Page } from "@playwright/test";

const DEFAULT_TIMEOUT_MS = 60_000;
const POLL_INTERVAL_MS = 3_000;

/**
 * Reads a yopmail inbox and extracts a link containing `pathFragment` from
 * the first email whose subject matches `subjectPattern`. Yopmail is the
 * disposable inbox already used for the QA bot account (see PARTNER_EMAIL),
 * so this needs no mailbox API or credentials.
 */
async function getLinkFromEmail(
  page: Page,
  email: string,
  subjectPattern: RegExp,
  pathFragment: string,
  timeoutMs: number = DEFAULT_TIMEOUT_MS
): Promise<string> {
  const username = email.split("@")[0];

  await page.goto("https://yopmail.com/en/");
  await page.locator("#login").fill(username);
  await page.keyboard.press("Enter");
  await page.waitForTimeout(1_500);

  const inboxFrame = page.frameLocator('iframe[name="ifinbox"]');
  const mailFrame = page.frameLocator('iframe[name="ifmail"]');
  const latestMail = inboxFrame.getByText(subjectPattern).first();

  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    if (await latestMail.isVisible().catch(() => false)) {
      await latestMail.click();

      const hrefs = await mailFrame
        .locator("a[href]")
        .evaluateAll((anchors) => anchors.map((a) => (a as HTMLAnchorElement).href))
        .catch(() => [] as string[]);
      const hrefMatch = hrefs.find((href) => href.includes(pathFragment));
      if (hrefMatch) return hrefMatch;

      const bodyText = await mailFrame.locator("body").innerText().catch(() => "");
      const textMatch = bodyText
        .match(/https:\/\/\S+/g)
        ?.find((url) => url.includes(pathFragment));
      if (textMatch) return textMatch.replace(/[),.]+$/, "");
    }

    await page
      .locator("#refresh")
      .click()
      .catch(() => {});
    await page.waitForTimeout(POLL_INTERVAL_MS);
  }

  throw new Error(`Timed out waiting for an email matching ${subjectPattern} at ${email}`);
}

export async function getEmailVerificationLink(
  page: Page,
  email: string,
  timeoutMs?: number
): Promise<string> {
  return getLinkFromEmail(page, email, /verify your email/i, "/auth/email-verified/", timeoutMs);
}

export async function getPasswordResetLink(
  page: Page,
  email: string,
  timeoutMs?: number
): Promise<string> {
  return getLinkFromEmail(
    page,
    email,
    /password reset request/i,
    "/business/forget-password/",
    timeoutMs
  );
}
