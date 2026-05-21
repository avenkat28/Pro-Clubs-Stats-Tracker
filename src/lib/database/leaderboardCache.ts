import { prisma } from "../db";
import type {
  EaLeaderboardClub,
  EaLeaderboardPlayer,
  EaLeaderboards,
  EaPlatform,
} from "../ea";

const DEFAULT_LEADERBOARD_CACHE_TTL_MS = 10 * 60 * 1000;

function getCacheTtlMs(envKey: string, fallbackMs: number) {
  const value = Number(process.env[envKey] ?? process.env.EA_CACHE_TTL_SECONDS);

  if (!Number.isFinite(value) || value <= 0) {
    return fallbackMs;
  }

  return value * 1000;
}

function leaderboardPlatformToEaPlatform(platform: string): EaPlatform {
  if (platform === "Old Gen") {
    return "common-gen4";
  }

  if (platform === "Switch") {
    return "nx";
  }

  return "common-gen5";
}

export async function cacheEaLeaderboards({
  platform,
  clubLimit,
  playerClubScanLimit,
  leaderboards,
}: {
  platform: EaPlatform;
  clubLimit: number;
  playerClubScanLimit: number;
  leaderboards: EaLeaderboards;
}) {
  const snapshot = await prisma.leaderboardSnapshot.create({
    data: {
      platform,
      clubLimit,
      playerClubScanLimit,
      clubs: {
        create: leaderboards.clubs.map((club) => ({
          eaClubId: club.id,
          rank: club.rank,
          name: club.name,
          division: club.division,
          platform: club.platform,
          region: club.region,
          games: club.games,
          wins: club.wins,
          draws: club.draws,
          losses: club.losses,
          goalsFor: club.goalsFor,
          goalsAgainst: club.goalsAgainst,
          cleanSheets: club.cleanSheets,
          skillRating: club.skillRating,
        })),
      },
      players: {
        create: leaderboards.players.map((player) => ({
          eaPlayerId: player.id,
          clubEaClubId: player.clubId,
          rank: player.rank,
          name: player.name,
          club: player.club,
          position: player.position,
          platform: player.platform,
          region: player.region,
          games: player.games,
          goals: player.goals,
          assists: player.assists,
          rating: player.rating,
          winRate: player.winRate,
          redCards: player.redCards,
          tackles: player.tackles,
          tackleRate: player.tackleRate,
        })),
      },
    },
    select: {
      id: true,
    },
  });

  await Promise.all(
    leaderboards.clubs.map((club) =>
      prisma.club.upsert({
        where: {
          eaClubId: club.id,
        },
        update: {
          name: club.name,
          platform,
          division: club.division,
          skillRating: club.skillRating,
          wins: club.wins,
          draws: club.draws,
          losses: club.losses,
          goalsFor: club.goalsFor,
          goalsAgainst: club.goalsAgainst,
          cleanSheets: club.cleanSheets,
        },
        create: {
          eaClubId: club.id,
          name: club.name,
          platform,
          division: club.division,
          skillRating: club.skillRating,
          wins: club.wins,
          draws: club.draws,
          losses: club.losses,
          goalsFor: club.goalsFor,
          goalsAgainst: club.goalsAgainst,
          cleanSheets: club.cleanSheets,
        },
      }),
    ),
  );

  const clubsByEaId = new Map(
    (
      await prisma.club.findMany({
        where: {
          eaClubId: {
            in: leaderboards.players.map((player) => player.clubId),
          },
        },
        select: {
          id: true,
          eaClubId: true,
        },
      })
    ).map((club) => [club.eaClubId, club.id]),
  );

  await Promise.all(
    leaderboards.players.map((player) =>
      prisma.player.upsert({
        where: {
          eaPlayerId: player.id,
        },
        update: {
          name: player.name,
          position: player.position,
          platform,
          clubId: clubsByEaId.get(player.clubId),
          games: player.games,
          goals: player.goals,
          assists: player.assists,
          averageRating: player.rating,
          winRate: player.winRate,
          redCards: player.redCards,
          tackles: player.tackles,
          tackleSuccessRate: player.tackleRate,
        },
        create: {
          eaPlayerId: player.id,
          name: player.name,
          position: player.position,
          platform,
          clubId: clubsByEaId.get(player.clubId),
          games: player.games,
          goals: player.goals,
          assists: player.assists,
          averageRating: player.rating,
          winRate: player.winRate,
          redCards: player.redCards,
          tackles: player.tackles,
          tackleSuccessRate: player.tackleRate,
        },
      }),
    ),
  );

  return snapshot.id;
}

export async function getCachedEaLeaderboards(
  platform: EaPlatform,
): Promise<EaLeaderboards | null> {
  const snapshot = await prisma.leaderboardSnapshot.findFirst({
    where: {
      platform,
    },
    orderBy: {
      capturedAt: "desc",
    },
    include: {
      clubs: {
        orderBy: {
          rank: "asc",
        },
      },
      players: {
        orderBy: {
          rank: "asc",
        },
      },
    },
  });

  if (!snapshot) {
    return null;
  }

  return {
    clubs: snapshot.clubs.map<EaLeaderboardClub>((club) => ({
      id: club.eaClubId,
      rank: club.rank,
      name: club.name,
      division: club.division,
      platform: club.platform as EaLeaderboardClub["platform"],
      region: club.region as EaLeaderboardClub["region"],
      games: club.games,
      wins: club.wins,
      draws: club.draws,
      losses: club.losses,
      goalsFor: club.goalsFor,
      goalsAgainst: club.goalsAgainst,
      cleanSheets: club.cleanSheets,
      skillRating: club.skillRating,
    })),
    players: snapshot.players.map<EaLeaderboardPlayer>((player) => ({
      id: player.eaPlayerId,
      clubId: player.clubEaClubId,
      rank: player.rank,
      name: player.name,
      club: player.club,
      position: player.position,
      platform: player.platform as EaLeaderboardPlayer["platform"],
      region: player.region as EaLeaderboardPlayer["region"],
      games: player.games,
      goals: player.goals,
      assists: player.assists,
      rating: player.rating,
      winRate: player.winRate,
      redCards: player.redCards,
      tackles: player.tackles,
      tackleRate: player.tackleRate,
    })),
  };
}

export async function isCachedEaLeaderboardsFresh(platform: EaPlatform) {
  const snapshot = await prisma.leaderboardSnapshot.findFirst({
    where: {
      platform,
    },
    orderBy: {
      capturedAt: "desc",
    },
    select: {
      capturedAt: true,
    },
  });

  if (!snapshot) {
    return false;
  }

  const ttlMs = getCacheTtlMs(
    "EA_LEADERBOARD_CACHE_TTL_SECONDS",
    DEFAULT_LEADERBOARD_CACHE_TTL_MS,
  );

  return Date.now() - snapshot.capturedAt.getTime() < ttlMs;
}

export function getEaPlatformFromLeaderboardLabel(platform: string) {
  return leaderboardPlatformToEaPlatform(platform);
}
