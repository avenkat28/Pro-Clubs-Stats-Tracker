import { prisma } from "../db";
import { normalizePlayerRecentMatches } from "../ea";
import type {
  EaClubProfile,
  EaClubRecentMatch,
  EaPlayerMatch,
  EaSquadMember,
} from "../ea";

const DEFAULT_PROFILE_CACHE_TTL_MS = 5 * 60 * 1000;

function getCacheTtlMs(envKey: string, fallbackMs: number) {
  const value = Number(process.env[envKey] ?? process.env.EA_CACHE_TTL_SECONDS);

  if (!Number.isFinite(value) || value <= 0) {
    return fallbackMs;
  }

  return value * 1000;
}

function getTotalMatches(wins: number, draws: number, losses: number) {
  return wins + draws + losses;
}

function clampPercent(value: number | null | undefined) {
  if (!Number.isFinite(value ?? Number.NaN)) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round(value as number)));
}

function getResult(goalsFor: number, goalsAgainst: number): "W" | "D" | "L" {
  if (goalsFor > goalsAgainst) {
    return "W";
  }

  if (goalsFor === goalsAgainst) {
    return "D";
  }

  return "L";
}

function parseScore(score: string) {
  const [goalsFor, goalsAgainst] = score
    .split("-")
    .map((value) => Number.parseInt(value, 10));

  return {
    goalsFor: Number.isFinite(goalsFor) ? goalsFor : 0,
    goalsAgainst: Number.isFinite(goalsAgainst) ? goalsAgainst : 0,
  };
}

export async function cacheEaClubProfile(profile: EaClubProfile) {
  const { club } = profile;
  const savedClub = await prisma.club.upsert({
    where: {
      eaClubId: club.id,
    },
    update: {
      name: club.name,
      platform: club.platform,
      badgeUrl: club.badgeUrl,
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
      platform: club.platform,
      badgeUrl: club.badgeUrl,
      division: club.division,
      skillRating: club.skillRating,
      wins: club.wins,
      draws: club.draws,
      losses: club.losses,
      goalsFor: club.goalsFor,
      goalsAgainst: club.goalsAgainst,
      cleanSheets: club.cleanSheets,
    },
    select: {
      id: true,
    },
  });

  await prisma.clubSnapshot.create({
    data: {
      clubId: savedClub.id,
      wins: club.wins,
      draws: club.draws,
      losses: club.losses,
      goalsFor: club.goalsFor,
      goalsAgainst: club.goalsAgainst,
      cleanSheets: club.cleanSheets,
      skillRating: club.skillRating,
    },
  });

  const savedMatches = new Map<string, { id: string }>();

  for (const [index, match] of profile.recentClubMatches.entries()) {
    const { goalsFor, goalsAgainst } = parseScore(match.score);
    const matchCacheId = `${club.id}:${match.id}`;
    const savedMatch = await prisma.match.upsert({
      where: {
        eaMatchId: matchCacheId,
      },
      update: {
        clubId: savedClub.id,
        opponentName: match.opponent,
        result: match.result,
        goalsFor,
        goalsAgainst,
        playedAt: new Date(Date.now() - index * 1000),
      },
      create: {
        eaMatchId: matchCacheId,
        clubId: savedClub.id,
        opponentName: match.opponent,
        result: match.result,
        goalsFor,
        goalsAgainst,
        playedAt: new Date(Date.now() - index * 1000),
      },
      select: {
        id: true,
      },
    });

    savedMatches.set(match.id, savedMatch);
  }

  const cachedPlayers = profile.squad.filter(
    (player) => player.id && player.name && player.name !== "Unknown",
  );

  await Promise.all(
    cachedPlayers.map(async (player) => {
      const savedPlayer = await prisma.player.upsert({
        where: {
          eaPlayerId: player.id,
        },
        update: {
          name: player.name,
          position: player.position,
          platform: club.platform,
          height: player.height,
          nationality: player.nationality,
          overall: player.overall,
          clubId: savedClub.id,
          games: player.matches,
          goals: player.goals,
          assists: player.assists,
          shots: player.shots,
          shotSuccessRate: player.shotSuccessRate,
          saves: player.saves,
          saveSuccessRate: player.saveSuccessRate,
          goalsAgainst: player.goalsAgainst,
          cleanSheets: player.cleanSheets,
          averageRating: player.rating,
          winRate: player.winRate,
          redCards: player.redCards,
          tackles: player.tackles,
          tackleSuccessRate: player.tackleSuccessRate,
          passesMade: player.passesMade,
          passAttempts: player.passAttempts,
          passAccuracy: player.passAccuracy,
          manOfTheMatch: player.manOfTheMatch,
          manOfTheMatchRate: player.manOfTheMatchRate,
        },
        create: {
          eaPlayerId: player.id,
          name: player.name,
          position: player.position,
          platform: club.platform,
          height: player.height,
          nationality: player.nationality,
          overall: player.overall,
          clubId: savedClub.id,
          games: player.matches,
          goals: player.goals,
          assists: player.assists,
          shots: player.shots,
          shotSuccessRate: player.shotSuccessRate,
          saves: player.saves,
          saveSuccessRate: player.saveSuccessRate,
          goalsAgainst: player.goalsAgainst,
          cleanSheets: player.cleanSheets,
          averageRating: player.rating,
          winRate: player.winRate,
          redCards: player.redCards,
          tackles: player.tackles,
          tackleSuccessRate: player.tackleSuccessRate,
          passesMade: player.passesMade,
          passAttempts: player.passAttempts,
          passAccuracy: player.passAccuracy,
          manOfTheMatch: player.manOfTheMatch,
          manOfTheMatchRate: player.manOfTheMatchRate,
        },
        select: {
          id: true,
        },
      });

      await prisma.playerSnapshot.create({
        data: {
          playerId: savedPlayer.id,
          games: player.matches,
          goals: player.goals,
          assists: player.assists,
          averageRating: player.rating,
          winRate: player.winRate,
          redCards: player.redCards,
          tackles: player.tackles,
          tackleSuccessRate: player.tackleSuccessRate,
        },
      });

      const recentMatches = normalizePlayerRecentMatches(
        profile.recentMatches,
        club.id,
        player.id,
        player.name,
      );

      await Promise.all(
        recentMatches.map(async (match) => {
          const savedMatch = savedMatches.get(match.id);

          if (!savedMatch) {
            return;
          }

          await prisma.playerMatchStat.deleteMany({
            where: {
              playerId: savedPlayer.id,
              matchId: savedMatch.id,
            },
          });

          await prisma.playerMatchStat.create({
            data: {
              playerId: savedPlayer.id,
              matchId: savedMatch.id,
              rating: match.rating,
              goals: match.goals,
              assists: match.assists,
              tackles: match.tackles,
              passAccuracy: match.passAccuracy,
              redCards: match.redCards,
            },
          });
        }),
      );
    }),
  );
}

export async function isCachedEaClubProfileFresh(eaClubId: string) {
  const cachedClub = await prisma.club.findUnique({
    where: {
      eaClubId,
    },
    select: {
      updatedAt: true,
    },
  });

  if (!cachedClub) {
    return false;
  }

  const ttlMs = getCacheTtlMs(
    "EA_PROFILE_CACHE_TTL_SECONDS",
    DEFAULT_PROFILE_CACHE_TTL_MS,
  );

  return Date.now() - cachedClub.updatedAt.getTime() < ttlMs;
}

export async function getCachedEaClubProfile(
  eaClubId: string,
): Promise<EaClubProfile | null> {
  const cachedClub = await prisma.club.findUnique({
    where: {
      eaClubId,
    },
    include: {
      matches: {
        orderBy: [
          {
            playedAt: "desc",
          },
          {
            createdAt: "desc",
          },
        ],
        take: 10,
      },
      players: {
        orderBy: [
          {
            games: "desc",
          },
          {
            goals: "desc",
          },
          {
            assists: "desc",
          },
        ],
      },
    },
  });

  if (!cachedClub) {
    return null;
  }

  const totalMatches = getTotalMatches(
    cachedClub.wins,
    cachedClub.draws,
    cachedClub.losses,
  );
  const recentClubMatches: EaClubRecentMatch[] = cachedClub.matches.map(
    (match) => ({
      id: match.eaMatchId ?? match.id,
      result: getResult(match.goalsFor, match.goalsAgainst),
      score: `${match.goalsFor}-${match.goalsAgainst}`,
      opponent: match.opponentName,
    }),
  );
  const squad: EaSquadMember[] = cachedClub.players.map((player) => ({
    id: player.eaPlayerId,
    name: player.name,
    position: player.position ?? "Unknown",
    height: player.height,
    nationality: player.nationality,
    overall: player.overall,
    matches: player.games,
    goals: player.goals,
    assists: player.assists,
    shots: player.shots,
    shotSuccessRate: clampPercent(player.shotSuccessRate),
    saves: player.saves,
    saveSuccessRate: clampPercent(player.saveSuccessRate),
    goalsAgainst: player.goalsAgainst,
    cleanSheets: player.cleanSheets,
    rating: player.averageRating ?? 0,
    winRate: clampPercent(player.winRate),
    redCards: player.redCards,
    tackles: player.tackles ?? 0,
    tackleSuccessRate: clampPercent(player.tackleSuccessRate),
    passesMade: player.passesMade,
    passAttempts: player.passAttempts,
    passAccuracy: clampPercent(player.passAccuracy),
    manOfTheMatch: player.manOfTheMatch,
    manOfTheMatchRate: clampPercent(player.manOfTheMatchRate),
  }));

  return {
    club: {
      id: cachedClub.eaClubId,
      name: cachedClub.name,
      platform: cachedClub.platform,
      badgeUrl: cachedClub.badgeUrl,
      division: cachedClub.division ?? "Club profile",
      skillRating: cachedClub.skillRating ?? 0,
      wins: cachedClub.wins,
      draws: cachedClub.draws,
      losses: cachedClub.losses,
      goalsFor: cachedClub.goalsFor,
      goalsAgainst: cachedClub.goalsAgainst,
      cleanSheets: cachedClub.cleanSheets,
      appearanceBreakdown: {
        total: totalMatches,
        league: totalMatches,
        playoff: 0,
        bestPlayoffFinish: {
          badgeLevel: null,
          label: "Not cached",
        },
      },
    },
    squad,
    recentMatches: [],
    recentClubMatches,
  };
}

export async function getCachedEaPlayerProfile(
  eaClubId: string,
  eaPlayerId: string,
): Promise<{
  club: EaClubProfile["club"];
  player: EaSquadMember | null;
  squad: EaSquadMember[];
  recentMatches: EaPlayerMatch[];
} | null> {
  const profile = await getCachedEaClubProfile(eaClubId);

  if (!profile) {
    return null;
  }

  const cachedPlayer = await prisma.player.findFirst({
    where: {
      OR: [
        {
          eaPlayerId,
        },
        {
          name: {
            equals: eaPlayerId,
            mode: "insensitive",
          },
        },
      ],
      club: {
        eaClubId,
      },
    },
    include: {
      matchStats: {
        include: {
          match: true,
        },
        orderBy: [
          {
            match: {
              playedAt: "desc",
            },
          },
          {
            createdAt: "desc",
          },
        ],
        take: 10,
      },
    },
  });

  const recentMatches: EaPlayerMatch[] =
    cachedPlayer?.matchStats.map((stat, index) => ({
      id: stat.match.eaMatchId ?? stat.match.id,
      matchIndex: 10 - index,
      opponent: stat.match.opponentName,
      result: stat.match.result as EaPlayerMatch["result"],
      score: `${stat.match.goalsFor}-${stat.match.goalsAgainst}`,
      rating: stat.rating ?? 0,
      goals: stat.goals,
      assists: stat.assists,
      shots: 0,
      shotSuccessRate: 0,
      tackles: stat.tackles ?? 0,
      tackleAttempts: stat.tackles ?? 0,
      tacklesMade: stat.tackles ?? 0,
      tackleSuccessRate: stat.tackles && stat.tackles > 0 ? 100 : 0,
      passesMade: 0,
      passAttempts: 0,
      passAccuracy: stat.passAccuracy ? Math.round(stat.passAccuracy) : 0,
      manOfTheMatch: false,
      redCards: stat.redCards,
    })) ?? [];

  return {
    club: profile.club,
    player:
      profile.squad.find((player) => player.id === eaPlayerId) ??
      profile.squad.find(
        (player) => player.name.toLowerCase() === eaPlayerId.toLowerCase(),
      ) ??
      null,
    squad: profile.squad,
    recentMatches,
  };
}
