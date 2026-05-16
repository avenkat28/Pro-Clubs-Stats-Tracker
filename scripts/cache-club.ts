import "dotenv/config";

import { cacheEaClubProfile } from "../src/lib/database/eaProfileCache";
import {
  eaPlatformLabels,
  getEaClubProfile,
  normalizeEaClubId,
  normalizeEaPlatform,
} from "../src/lib/ea";
import { prisma } from "../src/lib/db";

async function main() {
  const clubId = normalizeEaClubId(process.argv[2] ?? "");
  const platform = normalizeEaPlatform(process.argv[3]);

  console.log(`Fetching ${clubId} on ${eaPlatformLabels[platform]} from EA...`);

  const profile = await getEaClubProfile(clubId, platform);
  await cacheEaClubProfile(profile);

  console.log(
    `Cached ${profile.club.name}: ${profile.squad.length} players, ${profile.club.wins}W-${profile.club.draws}D-${profile.club.losses}L.`,
  );
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
