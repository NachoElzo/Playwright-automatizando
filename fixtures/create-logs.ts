import { writeFileSync, mkdirSync, existsSync, readFileSync } from "fs";
import path from "path";

/**
 * Saves relevant API response data to a file as an array of logs with timestamp.
 * @param result Object with API response data.
 */
export function saveRelevantApiResponse(result: any) {
  const dirPath = path.resolve(__dirname, "../data");
  const filePath = path.join(dirPath, "api-logs.ts");

  // Create directory if it doesn't exist
  mkdirSync(dirPath, { recursive: true });

  const apiResponse = result.apiResponse;
  const initializer = apiResponse?._initializer || {};
  
  // Create timestamp for when the test was executed
  const now = new Date();
  const timestamp = {
    date: `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`,
    time: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
  };

  const relevant = {
    userId: result.userId,
    userName: result.userName,
    userPassword: result.userPassword,
    token: result.token,
    apiResponse: {
      status: initializer.status,
      statusText: initializer.statusText,
      url: initializer.url,
      fetchUid: initializer.fetchUid
    },
    executedAt: {
      date: timestamp.date,     // Format: DD/MM/YYYY
      time: timestamp.time      // Format: HH:MM:SS
    }
  };

  // Read existing logs if file exists
  let logs: any[] = [];
  if (existsSync(filePath)) {
    const fileContent = readFileSync(filePath, "utf-8");
    // Use [\s\S]* instead of .* and remove 's' flag
    const match = fileContent.match(/export const apiLog = ([\s\S]*);/);
    if (match) {
      try {
        logs = JSON.parse(match[1]);
      } catch {
        logs = [];
      }
    }
  }

  // Add new log entry
  logs.push(relevant);

  // Save updated array
  const jsonContent = `// filepath: ${filePath}\n\nexport const apiLog = ${JSON.stringify(logs, null, 2)};\n`;
  writeFileSync(filePath, jsonContent, { encoding: "utf-8" });
}