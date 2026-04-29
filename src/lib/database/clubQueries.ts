import { prisma } from "../db";

export function getClubByEaId(eaClubId: string) {
  return prisma.club.findUnique({
    where: { eaClubId },
  });
}

export function getClubById(id: string) {
  return prisma.club.findUnique({
    where: { id },
  });
}

export function getTopClubs(limit = 10) {
  return prisma.club.findMany({
    orderBy: [{ skillRating: "desc" }, { wins: "desc" }],
    take: limit,
  });
}

export function getClubWithPlayers(eaClubId: string) {
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
