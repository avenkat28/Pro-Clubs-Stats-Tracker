import { prisma } from "../db";
import type {
  EaClubProfile,
  EaClubRecentMatch,
  EaPlayerMatch,
  EaSquadMember,
} from "../ea";

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
    }),
  );
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
      division: cachedClub.division ?? "Cached profile",
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

  return {
    club: profile.club,
    player:
      profile.squad.find((player) => player.id === eaPlayerId) ??
      profile.squad.find(
        (player) => player.name.toLowerCase() === eaPlayerId.toLowerCase(),
      ) ??
      null,
    squad: profile.squad,
    recentMatches: [],
  };
}
