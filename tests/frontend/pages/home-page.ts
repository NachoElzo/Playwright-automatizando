import {expect, Page, Locator} from '@playwright/test'
import {title, subTitle, cardsTitles,cardsLabels} from "../../../data/home-page"

export default class HomePage {

  readonly page: Page;
  readonly title: Locator;
  readonly subTitle:Locator
  readonly cards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator("h1");
    this.subTitle = page.locator(".subtitle")
    this.cards = page.locator(".grid-container a")

  }

  async validateTitles() {
    await expect(this.title).toHaveText(title);
    await expect(this.subTitle).toHaveText(subTitle);

  }

  async validateCards (){
    await expect(this.cards).toHaveCount(15);
  }

  async validateCardsTitles (){
    const titles = await this.cards.locator("h3").allTextContents();
    expect(titles).toEqual(cardsTitles);
  }

  async validateCardsLabels (){
    const labels = await this.cards.locator("p").allTextContents()
    expect (labels).toEqual(cardsLabels)
  }
}