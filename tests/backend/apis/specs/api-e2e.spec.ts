import { test, expect } from "../../../../fixtures/fixtures-backend";
import { randomValues, randomInformation } from "../../../../data/random-data";
import { saveRelevantApiResponse } from "../../../../fixtures/create-logs";

test.describe("API E2E Tests @api", () => {
  // Shared variable between tests
  let createdUser: {
    userId: string;
    token: string;
  };
  
  test.beforeAll("Create a valid user", async ({ postUser }) => { // ← Cambio aquí
    // Create user once for all tests
    const userName = randomInformation.name;
    const userPassword = randomValues.stringChars;

    const result = await postUser(userName, userPassword); // ← Sin apiServices
    await expect(result.apiResponse).toBeOK();
    
    // Store essential data for reuse
    createdUser = {
      userId: result.userId,
      token: result.token
    };
    
    // Create result object for logging with original input data
    const logResult = {
      userId: result.userId,
      userName: userName,
      userPassword: userPassword,
      token: result.token,
      apiResponse: result.apiResponse
    };
    
    // Save only relevant data to a JSON file
    saveRelevantApiResponse(logResult);
    expect(createdUser.userId).toBeTruthy();
    expect(createdUser.token).toBeTruthy();
  });

  test("Verify user was created successfully", async () => {
    // This test runs after beforeAll and can use the createdUser data
    expect(createdUser.userId).toBeTruthy();
    expect(createdUser.token).toBeTruthy();
  });
});