import { test } from "../../../fixtures/test-fixtures";

test.describe("Verify home page components", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("Validate Home page title", async ({homePage}) =>{
    await homePage.validateTitles()
  })
  test("Validate home page cards", async ({ homePage }) => {
    await homePage.validateCards();

    await test.step("Validate cards titles", async () => {
      await homePage.validateCardsTitles();
    });

    await test.step("Validate cards labels", async () => {
      await homePage.validateCardsLabels();
    });
  });
});