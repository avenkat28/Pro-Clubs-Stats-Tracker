import "dotenv/config";

import {
  eaPlatformLabels,
  eaPlatforms,
  getEaLeaderboards,
  normalizeEaPlatform,
} from "../src/lib/ea";
import { cacheEaLeaderboards } from "../src/lib/database/leaderboardCache";
import { prisma } from "../src/lib/db";

async function main() {
  const selectedPlatform = process.argv[2];
  const platforms =
    selectedPlatform && selectedPlatform !== "all"
      ? [normalizeEaPlatform(selectedPlatform)]
      : eaPlatforms;
  const clubLimit = Number(process.argv[3] ?? 50);
  const playerClubScanLimit = Number(process.argv[4] ?? 20);

  for (const platform of platforms) {
    console.log(`Fetching ${eaPlatformLabels[platform]} leaderboards...`);
    const leaderboards = await getEaLeaderboards(
      platform,
      clubLimit,
      playerClubScanLimit,
    );
    const snapshotId = await cacheEaLeaderboards({
      platform,
      clubLimit,
      playerClubScanLimit,
      leaderboards,
    });

    console.log(
      `Cached ${leaderboards.clubs.length} clubs and ${leaderboards.players.length} players for ${eaPlatformLabels[platform]} (${snapshotId}).`,
    );
  }
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
