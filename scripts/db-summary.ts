import "dotenv/config";

import { prisma } from "../src/lib/db";

async function main() {
  const [
    clubs,
    players,
    matches,
    clubSnapshots,
    playerSnapshots,
    leaderboardSnapshots,
    leaderboardClubRows,
    leaderboardPlayerRows,
  ] = await Promise.all([
    prisma.club.count(),
    prisma.player.count(),
    prisma.match.count(),
    prisma.clubSnapshot.count(),
    prisma.playerSnapshot.count(),
    prisma.leaderboardSnapshot.count(),
    prisma.leaderboardClubRow.count(),
    prisma.leaderboardPlayerRow.count(),
  ]);

  console.log(`Clubs: ${clubs}`);
  console.log(`Players: ${players}`);
  console.log(`Matches: ${matches}`);
  console.log(`Club snapshots: ${clubSnapshots}`);
  console.log(`Player snapshots: ${playerSnapshots}`);
  console.log(`Leaderboard snapshots: ${leaderboardSnapshots}`);
  console.log(`Leaderboard club rows: ${leaderboardClubRows}`);
  console.log(`Leaderboard player rows: ${leaderboardPlayerRows}`);
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
