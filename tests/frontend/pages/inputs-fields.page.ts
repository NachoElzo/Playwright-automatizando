import { Page, Locator } from '@playwright/test';
import PagesBase from './pages-base.page';

export default class InputsFields extends PagesBase {
  public page: Page;
  readonly inputsLabels: Locator;
  readonly placeHolders: Locator;
  readonly errorLabel: Locator;
  readonly inputName: Locator;
  readonly inputLastName: Locator;
  readonly inputAge: Locator;
  readonly inputEmail: Locator;
  readonly inputPhone: Locator;
  readonly inputCountry: Locator;
  readonly inputCity: Locator;
  readonly sendButton:Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.inputsLabels = page.locator(".form-container label");
    // Using [placeholder] as an attribute selector retrieves any element having the placeholder attribute within ".form-container".
    this.placeHolders = page.locator(".form-container [placeholder]");
    this.errorLabel = page.locator(".error-message");
    this.inputName = page.locator("#name");
    this.inputLastName = page.locator("#lastName");
    this.inputAge = page.locator("#age");
    this.inputEmail = page.locator("#email")
    this.inputPhone = page.locator("#phone");
    this.inputCountry = page.locator("#country");
    this.inputCity = page.locator("#city")
    this.sendButton = page.locator(".submit-button").getByText("Send",{exact: true})

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

  // Retrieves the placeholder attribute values from each input element.
  // Note: Placeholders are attributes, not visible inner text.
  async getInputPlaceHolders() {
    return await this.placeHolders.evaluateAll(elements =>
      elements.map(el => el.getAttribute('placeholder'))
    );
  }

  async fillInputs(locator: Locator, value: any) {
    await locator.fill(value);
  }

  async getErrorLabel() {
    await this.errorLabel.waitFor({ state: "visible" });
    const errorText = await this.errorLabel.innerText();
    return errorText;
  }

  // The provided locator parameter is used to clear the input field after error validation.
  async clearInputsValues(locator: Locator) {
    await locator.clear();
  }

  // Centralized method to validate an error message.
  async validateInputError(input: Locator, invalidValue: any): Promise<string> {
    await this.fillInputs(input, invalidValue);
    const errorText = await this.getErrorLabel();
    await this.clearInputsValues(input);
    return errorText;
  }
  async sendForm(){
    await this.sendButton.click()
  }
}