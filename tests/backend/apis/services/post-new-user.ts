import { APIResponse } from "@playwright/test";
import { apiConfig } from "../../../../data/api-config";
import post from '../requests/post';

/**
 * Creates a new user account using the provided username and password.
 * @param userName - The name of the user to be registered
 * @param userPassword - The password of the user to be registered
 * @returns An object containing userId, token, and the API response
 */
async function postUser(
  userName: string,
  userPassword: string
): Promise<{ userId: string; token: string; apiResponse: APIResponse }> {
  
  // Define the payload for user creation
  const userPayload = {
    name: userName,
    password: userPassword
  };

  // Use the generic post function - no HTTP logic duplication
  const apiResponse = await post(
    apiConfig.baseURL,
    apiConfig.usersPath,
    userPayload,
    apiConfig.headers
  );

  // Handle error responses
  if (!apiResponse.ok()) {
    return { userId: "", token: "", apiResponse };
  }

  // Parse response and extract user-specific data
  const response = await apiResponse.json();
  const userId = response.user.id.toString();
  const token = response.token;

  return { userId, token, apiResponse };
}

export default postUser;

