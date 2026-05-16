import { prisma } from "../db";
import type {
  EaClubSearchResult,
  EaLeaderboardPlayer,
  EaPlatform,
} from "../ea";

const SEARCH_LIMIT = 24;

type CachedClubResult = EaClubSearchResult;

type CachedPlayerResult = {
  id: string;
  clubId?: string;
  name: string;
  position: string;
  club: string;
  platform: EaPlatform;
  rating: number;
  goals: number;
  assists: number;
};

function getClubRecord(club: {
  wins: number;
  draws: number;
  losses: number;
}) {
  return `${club.wins}W - ${club.draws}D - ${club.losses}L`;
}

function isNumericSearch(query: string) {
  return /^\d+$/.test(query.trim());
}

export async function searchCachedClubs(
  query: string,
  platform: EaPlatform,
): Promise<CachedClubResult[]> {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return [];
  }

  const clubs = await prisma.club.findMany({
    where: {
      platform,
      OR: [
        {
          name: {
            contains: normalizedQuery,
            mode: "insensitive",
          },
        },
        ...(isNumericSearch(normalizedQuery)
          ? [
              {
                eaClubId: normalizedQuery,
              },
            ]
          : []),
      ],
    },
    orderBy: [
      {
        skillRating: "desc",
      },
      {
        wins: "desc",
      },
      {
        name: "asc",
      },
    ],
    take: SEARCH_LIMIT,
  });

  return clubs.map((club) => ({
    id: club.eaClubId,
    name: club.name,
    platform,
    division: club.division ?? "Club profile",
    record: getClubRecord(club),
    skillRating: club.skillRating ?? 0,
  }));
}

export async function searchCachedPlayers(
  query: string,
  platform: EaPlatform,
): Promise<CachedPlayerResult[]> {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return [];
  }

  const players = await prisma.player.findMany({
    where: {
      platform,
      OR: [
        {
          name: {
            contains: normalizedQuery,
            mode: "insensitive",
          },
        },
        {
          position: {
            contains: normalizedQuery,
            mode: "insensitive",
          },
        },
        {
          eaPlayerId: {
            contains: normalizedQuery,
          },
        },
        {
          club: {
            name: {
              contains: normalizedQuery,
              mode: "insensitive",
            },
          },
        },
      ],
    },
    include: {
      club: {
        select: {
          eaClubId: true,
          name: true,
        },
      },
    },
    orderBy: [
      {
        averageRating: "desc",
      },
      {
        goals: "desc",
      },
      {
        assists: "desc",
      },
    ],
    take: SEARCH_LIMIT,
  });

  return players.map((player) => ({
    id: player.eaPlayerId,
    clubId: player.club?.eaClubId,
    name: player.name,
    position: player.position ?? "Unknown",
    club: player.club?.name ?? "Unknown Club",
    platform,
    rating: player.averageRating ?? 0,
    goals: player.goals,
    assists: player.assists,
  }));
}

export async function cacheSearchClubs(
  clubs: EaClubSearchResult[],
  platform: EaPlatform,
) {
  await Promise.all(
    clubs.map((club) =>
      prisma.club.upsert({
        where: {
          eaClubId: club.id,
        },
        update: {
          name: club.name,
          platform,
          division: club.division,
          skillRating: club.skillRating,
        },
        create: {
          eaClubId: club.id,
          name: club.name,
          platform,
          division: club.division,
          skillRating: club.skillRating,
        },
      }),
    ),
  );
}

export function leaderboardPlayersToSearchResults(
  players: EaLeaderboardPlayer[],
  platform: EaPlatform,
): CachedPlayerResult[] {
  return players.slice(0, SEARCH_LIMIT).map((player) => ({
    id: player.id,
    clubId: player.clubId,
    name: player.name,
    position: player.position,
    club: player.club,
    platform,
    rating: player.rating,
    goals: player.goals,
    assists: player.assists,
  }));
}
