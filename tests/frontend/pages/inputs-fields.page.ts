import { Page, Locator } from '@playwright/test';
import PagesBase from './pages-base.page';

export default class InputsFields extends PagesBase {
  readonly inputsLabels: Locator;
  readonly placeHolders: Locator;
  readonly errorLabel: Locator;
  readonly inputName: Locator;
  readonly inputLastName : Locator;


  constructor(page: Page) {
    super(page);
    this.inputsLabels = page.locator(".form-container label");
    //[placeholder] is an attribute selector. It selects any element within ".form-container"
    this.placeHolders = page.locator(".form-container [placeholder]");
    this.errorLabel = page.locator(".error-message")
    this.inputName = page.locator("#name")
    this.inputLastName = page.locator("#lastName")
  }

  async getTitle() {
    return await super.getTileText();
  }

  async getHeader() {
    return await super.getHeaderText("h1");
  }

  async getSubTitle() {
    return await super.getSubTitlesText(".subtitle");
  }

  async getInputLabels() {
    return await this.inputsLabels.allInnerTexts();
  }

  // Retrieves the placeholder attribute values from input elements.
  async getInputPlaceHolders() {
    return await this.placeHolders.evaluateAll(elements =>
      elements.map(el => el.getAttribute('placeholder'))
    );
  }
  async fillInputName (value: any){
    await this.inputName.fill(value)
  }
  async fillInputLastName (value: any){
    await this.inputLastName.fill(value)
  }

  async getErrorLabel() {
    await this.errorLabel.waitFor({ state: "visible" });
    const errorText = await this.errorLabel.innerText();
    //After validation will clear input value
    return errorText;
  }
  // The provided locator parameter is used to clear the  input field after error validation.
  async clearInputsValues (locator: Locator){
    await locator.clear()
  }
}