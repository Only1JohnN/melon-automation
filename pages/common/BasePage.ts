import { Locator, Page } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async click(locator: Locator) {
    await locator.click();
  }

  async fill(locator: Locator, value: string) {
    await locator.fill(value);
  }

  async getText(locator: Locator) {
    return locator.textContent();
  }

  async wait(seconds: number) {
    await this.page.waitForTimeout(seconds * 1000);
  }
}