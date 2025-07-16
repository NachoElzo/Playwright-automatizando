import { test as base } from '@playwright/test';
import { HomePage, InputsFields } from './index';

// Define custom test fixtures type - specifies which page objects will be available in tests
type MyFixtures = {
    homePage: HomePage;        
    inputsFields: InputsFields; 
}

// Define worker-scoped fixtures for shared context
type WorkerFixtures = {
    newBrowser: { page: any, homePage: HomePage };
}

// Extend Playwright's base test with page object fixtures - auto-injects page objects into tests
export const test = base.extend<MyFixtures, WorkerFixtures>({
  // Regular fixtures (per test)
  homePage: async ({ page }, use) => {
    await use(new HomePage(page)); // Create HomePage instance with current page
  },
  inputsFields: async ({ page }, use) => {
    await use(new InputsFields(page)); // Create InputsFields instance with current page
  },
  
  // Worker-scoped fixture for shared context without navigation
  newBrowser: [async ({ browser }, use) => {
    // Create new context manually for shared use across tests
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const homePage = new HomePage(page);
    
    // Return page and homePage without navigation
    await use({ page, homePage });
    
    // Cleanup after all tests in this worker complete
    await context.close();
  }, { scope: 'worker' }]
});

// Export commonly used Playwright utilities
export { expect } from "@playwright/test";

// Re-export all page classes
export * from './index';