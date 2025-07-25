import { test, expect } from "../../../fixtures/test-fixtures";
import { titles, formElements } from "../../../data/inputs-fields";
import { InputsFields } from "../../../fixtures/index";

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

  test("Validate form input labels and placeholders", async()=>{
    await test.step("Validate input labels", async () => {
      const inputslabels = await inputsFields.getInputLabels();
      expect(inputslabels).toEqual(formElements.labels);
    });
    await test.step("Validate input placeholders", async() =>{
      const inputPlaceHolders = await inputsFields.getInputPlaceHolders()
      expect(inputPlaceHolders).toEqual(formElements.placeHolders)
    })
  })
  
  test("Inputs fields error validations", async()=>{
    await test.step("Validate name error", async ()=>{
      await inputsFields.fillInputName("54321")
      const error = await inputsFields.getErrorLabel()
      expect(error).toBe(formElements.errorLabels.name)
      await inputsFields.clearInputsValues(inputsFields.inputName)
    })
    await test.step("Validate last name error", async() =>{
      await inputsFields.fillInputLastName("9876*^/")
      const error = await inputsFields.getErrorLabel()
      expect(error).toBe(formElements.errorLabels.lastName)
      await inputsFields.clearInputsValues(inputsFields.inputLastName)
    }) 

  })

});


