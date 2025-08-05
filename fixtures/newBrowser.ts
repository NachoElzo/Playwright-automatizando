import { test as base } from '@playwright/test';

/**
 * Custom fixture to share browser context across multiple tests.
 * 
 * Why this is needed instead of test.beforeAll():
 * - test.beforeAll() runs in test scope, but browser contexts created there
 *   cannot be properly shared across individual test functions
 * - Playwright's built-in { page } fixture creates a new context per test,
 *   which doesn't allow data persistence between tests
 * - Worker-scoped fixtures solve this by creating the context at worker level,
 *   making it available to all tests in the same worker process
 * - This enables sharing data (like logged-in sessions, created users, etc.)
 *   across multiple tests without recreating the context each time
 */

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