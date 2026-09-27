import { registerOTel } from "@vercel/otel";

export function register() {
  registerOTel({
    serviceName: "boundary-first-labs-web",
  });
}
