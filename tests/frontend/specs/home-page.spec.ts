import { test, expect } from "../../../fixtures/test-fixtures";
import { titleText, subtitleText, cardsTitlesText, cardsDescriptionsText } from "../../../data/home-page-data";
import { HomePage } from "../../../fixtures/index";

// Forces tests to run sequentially in a single worker to share the same browser context and homepage instance
test.describe.configure({ mode: 'serial' });

test.describe("Verify home page components @regression", () => {
  let homePage: HomePage;

  test.beforeAll(async ({ newBrowser }) => {
    // Navigate to home page in the test
    await newBrowser.page.goto("");
    // Use the shared browser context from fixture
    homePage = newBrowser.homePage;
  });

  test("Validate title", async () => {
    const { getTitle } = await homePage.getTitle();
    expect(getTitle).toBe(titleText);
  });

  test("Validate subtitle", async () => {
    const { getSubTitle } = await homePage.getSubTitle();
    expect(getSubTitle).toBe(subtitleText);
  });

  test("Validate number of cards", async () => {
    const cardsCount = await homePage.cardsCount();
    expect(cardsCount).toBe(15);
  });

  test("Validates cards titles", async () => {
    const cardsTitles = await homePage.getAllCardsTitles();
    expect(cardsTitles).toEqual(cardsTitlesText);
  });

  test("Validates cards labels", async () => {
    const cardsLabels = await homePage.getAllCardsDescriptions();
    expect(cardsLabels).toEqual(cardsDescriptionsText);
  });

  test("Validate cards as link", async () => {
    const cardsAreLinks = await homePage.getCardsAttribute();
    expect(cardsAreLinks).toBe(true);
  });
});