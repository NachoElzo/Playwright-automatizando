import { test } from "../../../fixtures/test-fixtures";

test("validate title", async ({page, inputsFields})=>{
  await page.goto("/inputs-fields")
  await inputsFields.validateTtile("Inputs Practice")
})