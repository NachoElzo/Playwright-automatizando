import { test as base } from './newBrowser';
import { HomePage, InputsFields } from './index';

/**
 * Custom test fixtures for automatic page object instantiation.
 * 
 * Purpose:
 * - Eliminates need to manually create page objects in each test with "new HomePage(page)"
 * - Automatically injects pre-configured page object instances into test functions
 * - Reduces boilerplate code and ensures consistent page object initialization
 * - Provides clean, readable test syntax by making page objects available as parameters
 */

// Define custom test fixtures type - specifies which page objects will be available in tests
type MyFixtures = {
    homePage: HomePage;        
    inputsFields: InputsFields; 
}

// Extend Playwright's base test with page object fixtures - auto-injects page objects into tests
export const test = base.extend<MyFixtures>({
  // Regular fixtures (per test) - creates fresh instances for each test
  homePage: async ({ page }, use) => {
    await use(new HomePage(page)); // Create HomePage instance with current page
  },
  inputsFields: async ({ page }, use) => {
    await use(new InputsFields(page)); // Create InputsFields instance with current page
  }
});

// Export commonly used Playwright utilities
export { expect } from "@playwright/test";

// Re-export all page classes for convenient single-source imports
// This allows importing everything from one file instead of multiple imports:
// Instead of: import { HomePage } from './pages/HomePage'; import { InputsFields } from './pages/InputsFields';
// You can do: import { HomePage, InputsFields, test, expect } from './fixtures/test-fixtures';
export * from './index';