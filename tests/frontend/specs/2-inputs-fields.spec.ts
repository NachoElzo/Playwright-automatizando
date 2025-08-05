import { test, expect } from "../../../fixtures/fixtures-frontend";
import { titles, formElements } from "../../../data/inputs-fields";
import { InputsFields } from "../../../fixtures/index";
import { randomValues, randomInformation} from "../../../data/random-data";

test.describe.configure({ mode: 'serial' });

test.describe('Verify inputs fields page components @regression', () => {
  let inputsFields: InputsFields;

  test.beforeAll(async ({ newBrowser }) => {
    await newBrowser.page.goto("/inputs-fields");
    inputsFields = new InputsFields(newBrowser.page);
  });

  test("Inputs fields page displays correct heading content", async () => {
    await test.step("Validate title", async () => {
      const getTitle = await inputsFields.getTitle();
      expect(getTitle).toBe(titles.titleText);
    });
    await test.step("Validate header", async () => {
      const getHeader = await inputsFields.getHeader();
      expect(getHeader).toBe(titles.headerText);
    });
    await test.step("Validate subtitle", async () => {
      const getSubTitle = await inputsFields.getSubTitle();
      expect(getSubTitle).toBe(titles.subTitleText);
    });
  });

  test("Validate form input labels and placeholders", async () => {
    await test.step("Validate input labels", async () => {
      const inputslabels = await inputsFields.getInputLabels();
      expect(inputslabels).toEqual(formElements.labels);
    });
    await test.step("Validate input placeholders", async () => {
      const inputPlaceHolders = await inputsFields.getInputPlaceHolders();
      expect(inputPlaceHolders).toEqual(formElements.placeHolders);
    });
  });

  test("Inputs fields error validations", async () => {
    await test.step("Validate name error", async () => {
      const nameError = await inputsFields.validateInputError(
        inputsFields.inputName,
        randomValues.stringChars
      );
      expect(nameError).toBe(formElements.errorLabels.name);
    });
    await test.step("Validate last name error", async () => {
      const lastNameError = await inputsFields.validateInputError(
        inputsFields.inputLastName,
        randomValues.stringChars
      );
      expect(lastNameError).toBe(formElements.errorLabels.lastName);
    });
    await test.step("Validate age error", async()=>{
      const ageError = await inputsFields.validateInputError(
        inputsFields.inputAge,randomValues.numbersToString)
      expect(ageError).toBe(formElements.errorLabels.age)
    })
    await test.step("Validate email error", async()=>{
      const emailError = await inputsFields.validateInputError(
        inputsFields.inputEmail,randomValues.stringChars)
      expect(emailError).toBe(formElements.errorLabels.email)
    })
    await test.step("Validate phone errors", async()=>{
      const phoneError = await inputsFields.validateInputError(
        // Slice the generated random number string to 4 characters to ensure it triggers the phone error
        inputsFields.inputPhone,randomValues.numbersToString.slice(0,-4))
      expect(phoneError).toBe(formElements.errorLabels.phone1)

      const phoneError2 = await inputsFields.validateInputError(
        inputsFields.inputPhone,randomValues.string)
      expect(phoneError2).toBe(formElements.errorLabels.phone2)
    })
    await test.step("Validate country error", async()=>{
      const countryError = await inputsFields.validateInputError(
        inputsFields.inputCountry,randomValues.numbersToString)
      expect(countryError).toBe(formElements.errorLabels.country)
    })
    await test.step("Validate country error", async()=>{
      const cityError = await inputsFields.validateInputError(
        inputsFields.inputCity,randomValues.numbersToString)
      expect(cityError).toBe(formElements.errorLabels.city)
    })
    await test.step("Button send is disabled", async()=>{
      await expect(inputsFields.sendButton).toBeDisabled()
    })

  });
  test("Send form with valid values", async()=>{
    await test.step("Fill valid inputs values", async()=>{
      const name = randomInformation.name;
      const lastName = randomInformation.lastName;
      await inputsFields.fillInputs(inputsFields.inputName,name)
      await inputsFields.fillInputs(inputsFields.inputLastName,lastName)
      await inputsFields.fillInputs(inputsFields.inputAge,randomValues.numbersToString.slice(4,-5))
      await inputsFields.fillInputs(inputsFields.inputEmail,`${name}_${lastName}${randomInformation.domain}`)
      await inputsFields.fillInputs(inputsFields.inputPhone, randomValues.numbersToString)
      await inputsFields.fillInputs(inputsFields.inputCountry,randomInformation.country)
      await inputsFields.fillInputs(inputsFields.inputCity, randomInformation.city)
      await expect(inputsFields.sendButton).toBeEnabled()
      await inputsFields.sendForm()
    })
  })
  
});


