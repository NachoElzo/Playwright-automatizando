import {expect, Page, Locator} from '@playwright/test'

export  default class InputsFields {
  readonly page: Page;
  readonly title: Locator; 
  constructor (page:Page){
    this.page = page;
    this.title = page.locator("h1")

  }

  async validateTtile (expectTitle: string){
    await expect(this.title).toHaveText(expectTitle)

  }

}