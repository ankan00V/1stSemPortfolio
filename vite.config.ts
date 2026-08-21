import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

declare const process: {
  cwd(): string;
  env: Record<string, string | undefined>;
};

type DevRequest = {
  method?: string;
  body?: unknown;
  setEncoding(encoding: string): void;
  on(event: "data", listener: (chunk: string) => void): void;
  on(event: "end", listener: () => void): void;
};

type DevResponse = {
  statusCode: number;
  setHeader(name: string, value: string): void;
  end(payload: string): void;
};

type BobHandler = (
  request: DevRequest,
  response: {
    setHeader(name: string, value: string): void;
    status(code: number): { json(payload: unknown): void };
    json(payload: unknown): void;
  }
) => Promise<void>;

function bobDevApi(env: Record<string, string>): Plugin {
  return {
    name: "bob-dev-api",
    configureServer(server) {
      server.middlewares.use("/api/bob", (request, response, next) => {
        const devRequest = request as DevRequest;
        const devResponse = response as DevResponse;

        if (devRequest.method !== "POST") {
          next();
          return;
        }

        let rawBody = "";
        devRequest.setEncoding("utf8");
        devRequest.on("data", (chunk) => {
          rawBody += chunk;
        });
        devRequest.on("end", async () => {
          try {
            process.env.NVIDIA_API_KEY ||= env.NVIDIA_API_KEY;
            process.env.NVIDIA_MODEL ||= env.NVIDIA_MODEL;

            const handlerModule = (await import("./api/bob.js" as string)) as {
              default: BobHandler;
            };
            const apiRequest = Object.assign(devRequest, {
              body: rawBody ? JSON.parse(rawBody) : {},
            });
            const apiResponse = {
              setHeader(name: string, value: string) {
                devResponse.setHeader(name, value);
              },
              status(code: number) {
                devResponse.statusCode = code;
                return this;
              },
              json(payload: unknown) {
                devResponse.setHeader("Content-Type", "application/json");
                devResponse.end(JSON.stringify(payload));
              },
            };

            await handlerModule.default(apiRequest, apiResponse);
          } catch (error) {
            devResponse.statusCode = 500;
            devResponse.setHeader("Content-Type", "application/json");
            devResponse.end(
              JSON.stringify({
                error:
                  error instanceof Error
                    ? error.message
                    : "Unexpected Bob dev server error",
              })
            );
          }
        });
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), bobDevApi(env)],
  };
});
