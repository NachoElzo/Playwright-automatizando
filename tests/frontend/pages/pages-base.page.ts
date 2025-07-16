import { Page } from "@playwright/test";

export default abstract class PagesBase {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getTitlesText(titleSelector: string) {
    return {
      getTitle: await this.page.locator(titleSelector).innerText()
    };
  }

  async getSubTitlesText (subTitleSelector: string){
    return {
      getSubTitle: await this.page.locator(subTitleSelector).innerText()
    }  
  }
}