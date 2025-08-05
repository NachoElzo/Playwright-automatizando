import { APIResponse, request } from "@playwright/test";

/**
 * Creates a new user account using the provided username and password.
 * @param userName - The name of the user to be registered
 * @param userPassword - The password of the user to be registered
 * @returns An object containing userId, userName, userPassword, token, and the API response
 */
async function createUser(
  userName: string,
  userPassword: string
): Promise<{
  userId: string;
  userName: string;
  userPassword: string;
  token: string;
  apiResponse: APIResponse;
}> {
  const context = await request.newContext({
    baseURL: "https://automatizando.vercel.app/"
  });

  const apiResponse: APIResponse = await context.post("api/users", {
    data: {
      name: userName,
      password: userPassword
    },
    headers: {
      "Content-Type": "application/json"
    }
  });

  const response = await apiResponse.json();
  
  // Handle error responses (like 429, 400, etc.)
  if (!apiResponse.ok() || response.error || !response.user) {
    return {
      userId: "",
      userName,
      userPassword,
      token: "",
      apiResponse
    };
  }
  const userId = response.user.id;
  const token = response.token;

  return {
    userId,
    userName,
    userPassword,
    token,
    apiResponse
  };
}

export default createUser;
