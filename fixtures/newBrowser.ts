import { test as base } from '@playwright/test';

// Define worker-scoped fixtures for shared context
type WorkerFixtures = {
    newBrowser: { context: any, page: any };
}

// Extend Playwright's base test with shared context fixture
export const test = base.extend<{}, WorkerFixtures>({
  // Base shared context - reusable for any page object
  newBrowser: [async ({ browser }, use) => {
    // Create new context manually for shared use across tests
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await use({ context, page });
    
    // Cleanup after all tests in this worker complete
    await context.close();
  }, { scope: 'worker' }]
});

// Export commonly used Playwright utilities
export { expect } from "@playwright/test";