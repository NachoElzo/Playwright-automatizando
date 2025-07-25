import { test, expect } from "../../../fixtures/test-fixtures";
import { titles, cards } from "../../../data/home-page-data";
import { HomePage } from "../../../fixtures/index";

// Forces tests to run sequentially in a single worker to share the same browser context and homepage instance
test.describe.configure({ mode: 'serial' });

test.describe("Verify home page components @regression", () => {
  let homePage: HomePage;

  test.beforeAll(async ({ newBrowser }) => {
    // Use shared context since page/context fixtures are not available in beforeAll
    await newBrowser.page.goto("");
    // Initialize HomePage using the shared browser context
    homePage = new HomePage(newBrowser.page);
  });

  test("Home page displays correct heading content", async () => {
    await test.step("Validate page title", async () => {
      const getTitle = await homePage.getTitle();
      expect(getTitle).toBe(titles.titleText);
    });
    await test.step("Validate page header", async () => {
      const getHeader = await homePage.getHeader();
      expect(getHeader).toBe(titles.headerText);
    });
    await test.step("Validate page subtitle", async () => {
      const getSubTitle = await homePage.getSubTitle();
      expect(getSubTitle).toBe(titles.subtitleText);
    });
  });

  test("Home page navigation cards have correct content and properties", async () => {
    await test.step("Validate number of navigation cards", async () => {
      const cardsCount = await homePage.cardsCount();
      expect(cardsCount).toBe(15);
    });

    await test.step("Validate navigation card headers", async () => {
      const cardsHeaders = await homePage.getAllCardsHeaders();
      expect(cardsHeaders).toEqual(cards.headers);
    });

    await test.step("Validate navigation card descriptions", async () => {
      const cardsLabels = await homePage.getAllCardsDescriptions();
      expect(cardsLabels).toEqual(cards.descriptions);
    });

    await test.step("Validate navigation cards are functional links", async () => {
      const cardsAreLinks = await homePage.getCardsAttribute();
      expect(cardsAreLinks).toBe(true);
    });
  });
});