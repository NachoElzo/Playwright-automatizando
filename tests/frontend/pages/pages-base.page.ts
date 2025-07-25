import { Page } from "@playwright/test";

export default abstract class PagesBase {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getTileText() {
    return await this.page.title()
  }

  async getHeaderText(headerSelector: string) {
    return await this.page.locator(headerSelector).innerText();
  }

  async getSubTitlesText(subTitleSelector: string) {
    return await this.page.locator(subTitleSelector).innerText();
  }
}