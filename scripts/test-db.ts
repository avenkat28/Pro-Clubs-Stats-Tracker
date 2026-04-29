import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const databaseUrl = process.env.DATABASE_URL;
const placeholderParts = ["USER", "PASSWORD", "HOST", "PORT", "DATABASE"];

function validateDatabaseUrl() {
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is missing. Add it to .env before running this script.");
  }

  const unresolvedPlaceholder = placeholderParts.find((part) => databaseUrl.includes(part));

  if (unresolvedPlaceholder) {
    throw new Error(
      `DATABASE_URL still contains the placeholder value ${unresolvedPlaceholder}. Replace it with your real Supabase or Neon PostgreSQL connection string.`
    );
  }

  if (!databaseUrl.startsWith("postgresql://") && !databaseUrl.startsWith("postgres://")) {
    throw new Error("DATABASE_URL must start with postgresql:// or postgres://.");
  }

  try {
    new URL(databaseUrl);
  } catch {
    throw new Error("DATABASE_URL is not a valid URL. Check for an invalid port, missing host, or unescaped special characters in the password.");
  }
}

const prisma = new PrismaClient();

async function main() {
  try {
    validateDatabaseUrl();
    await prisma.$connect();
    console.log("DB connected successfully");
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
