import { APIResponse, request } from "@playwright/test";

/**
 * Generic POST request function for API calls.
 * @param baseURL - The base URL for the API
 * @param apiPath - The path for the API service
 * @param payload - The data object to send in the request body
 * @param headers - The headers for the API request
 * @returns APIResponse - The response from the API indicating the result of the request
 */
async function post(
  baseURL: string,
  apiPath: string,
  payload: any,
  headers: Record<string, string>
): Promise<APIResponse> {
  const postRequest = await request.newContext({ baseURL });
  return await postRequest.post(apiPath, {
    data: payload,
    headers: headers
  });
}

export default post;