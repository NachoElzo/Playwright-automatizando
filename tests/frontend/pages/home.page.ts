import { Page, Locator } from "@playwright/test";
import PagesBase from "./pages-base.page";

export default class HomePage extends PagesBase {
  readonly title: Locator;
  readonly subtitle: Locator;
  readonly cards: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator("h1");
    this.subtitle = page.locator(".subtitle");
    this.cards = page.locator(".grid-container a");
  }

  async getTitle() {
    return await super.getTitlesText("h1");
  }
  async getSubTitle() {
    return await super.getSubTitlesText(".subtitle");
  }

  async cardsCount(){
    const cardsCount = await this.cards.count()
    return cardsCount
  }
  async getAllCardsTitles (){
    let cardsTitles = await this.cards.locator("h3").allTextContents()
    return cardsTitles
  }
  async getAllCardsDescriptions (){
    let cardsDescription = await this.cards.locator(".card-description").allTextContents()
    return cardsDescription
  }
 
  async getCardsAttribute() {
    const cardsCount = await this.cards.count();
      
    for (let i = 0; i < cardsCount; i++) {
      const card = this.cards.nth(i);
      const href = await card.getAttribute('href');
        
      if (!href) {
        return false; 
      }
    }
    return true;
  }
}