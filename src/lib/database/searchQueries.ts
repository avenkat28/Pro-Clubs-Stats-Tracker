import { prisma } from "../db";

export function searchPlayers(query: string, limit = 10) {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return Promise.resolve([]);
  }

  return prisma.player.findMany({
    where: {
      OR: [
        { name: { contains: normalizedQuery, mode: "insensitive" } },
        { eaPlayerId: { contains: normalizedQuery, mode: "insensitive" } },
        { position: { contains: normalizedQuery, mode: "insensitive" } },
        { club: { name: { contains: normalizedQuery, mode: "insensitive" } } },
      ],
    },
    include: {
      club: true,
    },
    orderBy: [{ averageRating: "desc" }, { goals: "desc" }],
    take: limit,
  });
}

export function searchClubs(query: string, limit = 10) {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return Promise.resolve([]);
  }

  return prisma.club.findMany({
    where: {
      OR: [
        { name: { contains: normalizedQuery, mode: "insensitive" } },
        { eaClubId: { contains: normalizedQuery, mode: "insensitive" } },
        { platform: { contains: normalizedQuery, mode: "insensitive" } },
        { division: { contains: normalizedQuery, mode: "insensitive" } },
      ],
    },
    orderBy: [{ skillRating: "desc" }, { wins: "desc" }],
    take: limit,
  });
}

export async function searchAll(query: string) {
  const [players, clubs] = await Promise.all([
    searchPlayers(query),
    searchClubs(query),
  ]);

  return {
    players,
    clubs,
  };
}
