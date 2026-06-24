import dotenv from "dotenv";
import fs from "fs";
import path from "path";

export type AppEnvironment = "staging" | "pre-release" | "production";

const normalizeEnvironment = (value?: string): AppEnvironment => {
  const normalized = value?.trim().toLowerCase() ?? "pre-release";

  switch (normalized) {
    case "staging":
    case "stage":
      return "staging";
    case "production":
    case "prod":
    case "live":
      return "production";
    case "pre-release":
    case "prerelease":
    case "pre_release":
    case "preview":
    case "development":
    default:
      return "pre-release";
  }
};

const rootDir = process.cwd();
const selectedEnvironment = normalizeEnvironment(
  process.env.APP_ENV || process.env.ENVIRONMENT || process.env.NODE_ENV
);

process.env.APP_ENV = selectedEnvironment;
process.env.ENVIRONMENT = selectedEnvironment;

const envFileCandidates = [`.env.${selectedEnvironment}`, ".env.local", ".env"];

for (const candidate of envFileCandidates) {
  const envPath = path.resolve(rootDir, candidate);

  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    break;
  }
}

export const appEnvironment = selectedEnvironment;
export const isStaging = appEnvironment === "staging";
export const isPreRelease = appEnvironment === "pre-release";
export const isProduction = appEnvironment === "production";

export const env = {
  environment: appEnvironment,
  headless: process.env.HEADLESS === "true",
  slowMo: Number(process.env.SLOW_MO) || 0,
  timeout: Number(process.env.TIMEOUT) || 1200000,

  adminUrl: process.env.ADMIN_URL!,
  partnerUrl: process.env.PARTNER_URL!,
  storefrontUrl: process.env.STOREFRONT_URL!,
  stackUrl: process.env.STACK_URL!,
};