import "dotenv/config";

import { refreshStatsCache } from "../src/lib/database/statsRefresh";
import { prisma } from "../src/lib/db";
import { eaPlatforms, normalizeEaPlatform } from "../src/lib/ea";

const DEFAULT_REFRESH_INTERVAL_MS = 5 * 60 * 1000;

function getRefreshIntervalMs() {
  const seconds = Number(process.env.EA_REFRESH_INTERVAL_SECONDS);

  if (!Number.isFinite(seconds) || seconds <= 0) {
    return DEFAULT_REFRESH_INTERVAL_MS;
  }

  return seconds * 1000;
}

async function refreshOnce() {
  const selectedPlatform = process.argv[2];
  const platforms =
    selectedPlatform && selectedPlatform !== "all"
      ? [normalizeEaPlatform(selectedPlatform)]
      : eaPlatforms;
  const startedAt = new Date();

  console.log(`[${startedAt.toISOString()}] Refreshing EA stats...`);

  const summary = await refreshStatsCache({ platforms });

  console.log(`[${new Date().toISOString()}] ${summary.message}`);
}

async function main() {
  const intervalMs = getRefreshIntervalMs();

  await refreshOnce();

  const interval = setInterval(() => {
    refreshOnce().catch((error) => {
      console.error(error instanceof Error ? error.message : error);
    });
  }, intervalMs);

  const shutdown = async () => {
    clearInterval(interval);
    await prisma.$disconnect();
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

main().catch(async (error) => {
  console.error(error instanceof Error ? error.message : error);
  await prisma.$disconnect();
  process.exitCode = 1;
});
