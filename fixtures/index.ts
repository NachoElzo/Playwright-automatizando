// Export all page object classes
export { default as HomePage } from "../tests/frontend/pages/home.page";
export { default as InputsFields } from "../tests/frontend/pages/inputs-fields.page";

// Export all backend API request functions for convenient single-source imports
// This allows importing everything from one file instead of multiple imports:
// Instead of: import post from './requests/post'; import get from './requests/get';
// You can do: import { post, get, put, patch, deleteRequest } from './fixtures/index-backend';

// Export all service functions
export { default as createUser } from "../tests/backend/apis/services/post-new-user";
// Add more services as they're created:
// export { default as loginUser } from "../tests/backend/apis/services/login-user";
// export { default as deleteUser } from "../tests/backend/apis/services/delete-user";
