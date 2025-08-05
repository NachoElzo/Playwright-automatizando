import { test, expect } from "@playwright/test";
import createUser from "../services/post-new-user";

const delay = (ms: number = 1000) => new Promise(resolve => setTimeout(resolve, ms));

test("Cannot create user with empty credentials", async () => {
  await test.step("Attempt to create user with empty credentials", async () => {
    await delay();
    
    const result = await createUser("", "");

    expect(result.apiResponse.status()).toBe(400);
    const responseBody = await result.apiResponse.json();
    expect(responseBody.error).toBe("Name and password are required.");
    expect(result.userId).toBe("");
    expect(result.token).toBe("");
  });
});