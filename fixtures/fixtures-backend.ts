import { test as base } from '@playwright/test';
import postUser from '../tests/backend/apis/services/post-new-user';

/**
 * Simple backend fixtures - direct service injection like frontend fixtures.
 * Each service is available directly without wrapper objects.
 */

// Define simple backend fixtures type - services available directly
type BackendFixtures = {
  postUser: typeof postUser;
  // Add more services here directly as they're created:
  // loginUser: typeof loginUser;
  // deleteUser: typeof deleteUser;
};

// Extend Playwright's base test with direct service injection
export const test = base.extend<BackendFixtures>({
  // Direct service injection - no wrapper objects
  postUser: async ({}, use) => {
    await use(postUser);
  }
  // Add more services here:
  // loginUser: async ({}, use) => {
  //   await use(loginUser);
  // }
});

export { expect } from "@playwright/test";
export * from './index';