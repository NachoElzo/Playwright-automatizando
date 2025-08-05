import { test, expect } from "@playwright/test";
import createUser from "../services/post-new-user";
import { randomValues, randomInformation } from "../../../../data/random-data";
import { saveRelevantApiResponse } from "../../../../fixtures/create-logs";

// Utility delay to avoid API rate limiting or security throttling between requests
// const delay = (ms: number = 1000) => new Promise(resolve => setTimeout(resolve, ms));

test.describe("API E2E Tests @api", () => {
  // shared variable between tests
  let createdUser: {
    userId: string;
    userName: string;
    userPassword: string;
    token: string;
  };
  
  test.beforeAll("Create a valid user", async () => {
    // Crear usuario una vez para todos los tests
    const userName = randomInformation.name;
    const userPassword = randomValues.stringChars;

    const result = await createUser(userName, userPassword);
    await expect(result.apiResponse).toBeOK();
    // Guardar datos para reutilizar
    createdUser = {
      userId: result.userId,
      userName: result.userName,
      userPassword: result.userPassword,
      token: result.token
    };
    
    // Guardar solo los datos relevantes en un archivo JSON
    saveRelevantApiResponse(result);

    console.log(`User created successfully:`, createdUser);
    expect(createdUser.userId).toBeTruthy();
    expect(createdUser.userName).toBeTruthy();
    expect(createdUser.userPassword).toBeTruthy();
    expect(createdUser.token).toBeTruthy();

    
  });
});