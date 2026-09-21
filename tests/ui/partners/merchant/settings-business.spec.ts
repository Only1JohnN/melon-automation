import { BusinessSettingsPage } from "../../../../pages/partners/merchant/settings/BusinessSettingsPage";
import { test, expect } from "../../../../fixtures/baseTest";

test.describe("@partners @settings @business", () => {
  test.describe.configure({ mode: "serial" });

  let originalPhone: string;
  let originalEmail: string;
  let originalIndustry: string;

  test.beforeEach(async ({ api }) => {
    await api.login();
    const { body } = await api.business();
    originalPhone = body.data.details.phone_number;
    originalEmail = body.data.details.business_email;
    originalIndustry = body.data.details.industry;
  });

  test.afterEach(async ({ api }) => {
    await api.updateBusiness({
      business_email: originalEmail,
      phone_number: originalPhone,
      industry: originalIndustry,
    });
  });

  test("should show the business details @smoke", async ({ page, api }) => {
    const business = new BusinessSettingsPage(page);

    await business.open();

    const { status, body } = await api.business();
    expect(status).toBe(200);
    const details = body.data.details;

    await test.step("Business details match the business API", async () => {
      await expect(business.valueOf("Business name")).toHaveText(details.name);
      await expect(business.valueOf("Business email")).toHaveText(details.business_email);
      await expect(business.valueOf("Phone number")).toHaveText(details.phone_number);
      await expect(business.valueOf("Industry")).toHaveText(new RegExp(details.industry, "i"));
      await expect(business.valueOf("Type")).toHaveText(new RegExp(details.type, "i"));
      await expect(business.valueOf("RC number")).toHaveText(details.rc_number);
    });
  });

  test("should display the business logo", async ({ page }) => {
    const business = new BusinessSettingsPage(page);

    await business.open();
    await expect(business.logo).toBeVisible();

    await test.step("Logo image actually loads", async () => {
      await expect
        .poll(() => business.logo.evaluate((img: HTMLImageElement) => img.naturalWidth), {
          message: "logo should have rendered pixels",
        })
        .toBeGreaterThan(0);
    });
  });

  test("should save a new business phone number and persist it", async ({ page, api }) => {
    const business = new BusinessSettingsPage(page);
    const newPhone = "+2348099999999";

    await business.open();
    await business.startEditing();
    await expect(business.phoneInput).not.toHaveValue("");

    const response = await business.savePhoneNumber("08099999999");
    expect(response.status(), "update business API").toBe(200);
    expect((await response.json()).message).toBe("Update Business");

    await business.expectToast("Business details updated successfully");
    await expect(business.valueOf("Phone number")).toHaveText(newPhone);

    await test.step("Backend stored the new phone", async () => {
      const { body } = await api.business();
      expect(body.data.details.phone_number).toBe(newPhone);
    });
  });

  test("should discard changes when the edit is cancelled", async ({ page }) => {
    const business = new BusinessSettingsPage(page);

    await business.open();
    await business.startEditing();
    await expect(business.phoneInput).not.toHaveValue("");
    await business.phoneInput.fill("08000000000");
    await business.cancelButton.click();

    await expect(business.phoneInput).toBeHidden();
    await expect(business.valueOf("Phone number")).toHaveText(originalPhone);
  });

  test("should not submit an invalid business email", async ({ page }) => {
    const business = new BusinessSettingsPage(page);
    const saveRequests: string[] = [];
    page.on("request", (req) => {
      if (req.method() === "PUT" && /\/businesses\//.test(req.url())) saveRequests.push(req.url());
    });

    await business.open();
    await business.startEditing();
    await expect(business.emailInput).not.toHaveValue("");
    await business.emailInput.fill("not-an-email");
    await business.continueButton.click();

    await expect(business.emailInput).toBeVisible();
    expect(saveRequests, "no update request is sent for an invalid email").toHaveLength(0);
  });

  test.fixme("should upload a new business logo", async () => {
    // TODO(qa): needs a small PNG fixture (fixtures/images was removed with the old dashboard tests).
    // Flow: business.logoUpload.setInputFiles(<png>) -> expect the logo <img> src to change and a
    // success toast; then restore the previous logo via API so the QA merchant keeps its branding.
  });
});
