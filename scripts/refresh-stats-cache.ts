import "dotenv/config";

import { refreshStatsCache } from "../src/lib/database/statsRefresh";
import { prisma } from "../src/lib/db";
import { eaPlatforms, normalizeEaPlatform } from "../src/lib/ea";

async function main() {
  const selectedPlatform = process.argv[2];
  const platforms =
    selectedPlatform && selectedPlatform !== "all"
      ? [normalizeEaPlatform(selectedPlatform)]
      : eaPlatforms;
  const clubLimit = Number(process.argv[3] ?? undefined) || undefined;
  const playerClubScanLimit = Number(process.argv[4] ?? undefined) || undefined;
  const maxClubs = Number(process.argv[5] ?? undefined) || undefined;

  const summary = await refreshStatsCache({
    platforms,
    clubLimit,
    playerClubScanLimit,
    maxClubs,
  });

  console.log(summary.message);
  console.log(JSON.stringify(summary, null, 2));
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma?.$disconnect();
  });
