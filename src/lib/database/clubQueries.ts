import { prisma } from "../db";

export function getClubByEaId(eaClubId: string) {
  if (!prisma) {
    return Promise.resolve(null);
  }

  return prisma.club.findUnique({
    where: { eaClubId },
  });
}

export function getClubById(id: string) {
  if (!prisma) {
    return Promise.resolve(null);
  }

  return prisma.club.findUnique({
    where: { id },
  });
}

export function getTopClubs(limit = 10) {
  if (!prisma) {
    return Promise.resolve([]);
  }

  return prisma.club.findMany({
    orderBy: [{ skillRating: "desc" }, { wins: "desc" }],
    take: limit,
  });
}

export function getClubWithPlayers(eaClubId: string) {
  if (!prisma) {
    return Promise.resolve(null);
  }

  return prisma.club.findUnique({
    where: { eaClubId },
    include: {
      players: {
        orderBy: [{ averageRating: "desc" }, { goals: "desc" }],
      },
    },
  });
}

export function getRecentClubMatches(clubId: string) {
  if (!prisma) {
    return Promise.resolve([]);
  }

  return prisma.match.findMany({
    where: { clubId },
    include: {
      playerStats: {
        include: {
          player: true,
        },
        orderBy: [{ rating: "desc" }, { goals: "desc" }],
      },
    },
    orderBy: [{ playedAt: "desc" }, { createdAt: "desc" }],
    take: 10,
  });
}
