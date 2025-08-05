import { writeFileSync, mkdirSync, existsSync, readFileSync } from "fs";
import path from "path";

/**
 * Guarda los datos relevantes de la respuesta en un archivo como array de logs.
 * @param result Objeto con los datos de la respuesta del API.
 */
export function saveRelevantApiResponse(result: any) {
  const dirPath = path.resolve(__dirname, "../data");
  const filePath = path.join(dirPath, "api-logs.ts");

  // Crea la carpeta si no existe
  mkdirSync(dirPath, { recursive: true });

  const apiResponse = result.apiResponse;
  const initializer = apiResponse?._initializer || {};
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
    }
  };

  // Leer logs existentes si el archivo existe
  let logs: any[] = [];
  if (existsSync(filePath)) {
    const fileContent = readFileSync(filePath, "utf-8");
    // Usar [\s\S]* en vez de .* y quitar el flag 's'
    const match = fileContent.match(/export const apiLog = ([\s\S]*);/);
    if (match) {
      try {
        logs = JSON.parse(match[1]);
      } catch {
        logs = [];
      }
    }
  }

  // Agregar el nuevo log
  logs.push(relevant);

  // Guardar el array actualizado
  const jsonContent = `// filepath: ${filePath}\n\nexport const apiLog = ${JSON.stringify(logs, null, 2)};\n`;
  writeFileSync(filePath, jsonContent, { encoding: "utf-8" });
}