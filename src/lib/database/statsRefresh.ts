import {
  eaPlatformLabels,
  eaPlatforms,
  getEaClubProfile,
  getEaLeaderboards,
  normalizeEaPlatform,
  type EaPlatform,
} from "../ea";
import { prisma } from "../db";
import { cacheEaClubProfile } from "./eaProfileCache";
import { cacheEaLeaderboards } from "./leaderboardCache";

type RefreshStatsCacheOptions = {
  platforms?: readonly EaPlatform[];
  clubLimit?: number;
  playerClubScanLimit?: number;
  maxClubs?: number;
};

type ClubRefreshTarget = {
  eaClubId: string;
  platform: EaPlatform;
};

function positiveNumber(value: number | string | undefined, fallback: number) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return Math.floor(parsed);
}

export async function refreshStatsCache({
  platforms = eaPlatforms,
  clubLimit = positiveNumber(process.env.EA_REFRESH_CLUB_LIMIT, 30),
  playerClubScanLimit = positiveNumber(
    process.env.EA_REFRESH_PLAYER_CLUB_SCAN_LIMIT,
    20,
  ),
  maxClubs = positiveNumber(process.env.EA_REFRESH_MAX_CLUBS, 25),
}: RefreshStatsCacheOptions = {}) {
  const totalClubRefreshLimit = maxClubs * platforms.length;
  const summary = {
    leaderboards: [] as Array<{
      platform: EaPlatform;
      clubs?: number;
      players?: number;
      snapshotId?: string;
      error?: string;
    }>,
    clubs: [] as Array<{
      clubId: string;
      platform: EaPlatform;
      name?: string;
      players?: number;
      error?: string;
    }>,
  };
  const leaderboardClubTargets = new Map<string, ClubRefreshTarget>();

  for (const platform of platforms) {
    try {
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

      summary.leaderboards.push({
        platform,
        clubs: leaderboards.clubs.length,
        players: leaderboards.players.length,
        snapshotId,
      });

      for (const club of leaderboards.clubs.slice(0, maxClubs)) {
        leaderboardClubTargets.set(`${platform}:${club.id}`, {
          eaClubId: club.id,
          platform,
        });
      }
    } catch (error) {
      summary.leaderboards.push({
        platform,
        error:
          error instanceof Error ? error.message : "Unable to refresh leaderboard",
      });
    }
  }

  const staleClubs = await prisma.club.findMany({
    orderBy: {
      updatedAt: "asc",
    },
    take: totalClubRefreshLimit,
    select: {
      eaClubId: true,
      platform: true,
    },
  });
  const clubTargets = new Map(leaderboardClubTargets);

  for (const club of staleClubs) {
    const platform = normalizeEaPlatform(club.platform);

    clubTargets.set(`${platform}:${club.eaClubId}`, {
      eaClubId: club.eaClubId,
      platform,
    });
  }

  for (const club of Array.from(clubTargets.values()).slice(0, totalClubRefreshLimit)) {
    const platform = normalizeEaPlatform(club.platform);

    try {
      const profile = await getEaClubProfile(club.eaClubId, platform);
      await cacheEaClubProfile(profile);
      summary.clubs.push({
        clubId: club.eaClubId,
        platform,
        name: profile.club.name,
        players: profile.squad.length,
      });
    } catch (error) {
      summary.clubs.push({
        clubId: club.eaClubId,
        platform,
        error: error instanceof Error ? error.message : "Unable to refresh club",
      });
    }
  }

  return {
    ...summary,
    message: `Refreshed ${summary.leaderboards.length} leaderboard set(s) and ${summary.clubs.length} club profile(s).`,
    platforms: platforms.map((platform) => eaPlatformLabels[platform]),
  };
}
