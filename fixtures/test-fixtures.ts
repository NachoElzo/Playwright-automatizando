import { test as base } from './newBrowser';
import { HomePage, InputsFields } from './index';

// Define custom test fixtures type - specifies which page objects will be available in tests
type MyFixtures = {
    homePage: HomePage;        
    inputsFields: InputsFields; 
}

// Extend Playwright's base test with page object fixtures - auto-injects page objects into tests
export const test = base.extend<MyFixtures>({
  // Regular fixtures (per test)
  homePage: async ({ page }, use) => {
    await use(new HomePage(page)); // Create HomePage instance with current page
  },
  inputsFields: async ({ page }, use) => {
    await use(new InputsFields(page)); // Create InputsFields instance with current page
  }
});

// Export commonly used Playwright utilities
export { expect } from "@playwright/test";

// Re-export all page classes
export * from './index';