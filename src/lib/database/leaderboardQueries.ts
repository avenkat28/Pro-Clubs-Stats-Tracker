import { prisma } from "../db";

export function getPlayerLeaderboard(limit = 25) {
  return prisma.player.findMany({
    include: {
      club: true,
    },
    orderBy: [{ averageRating: "desc" }, { goals: "desc" }, { assists: "desc" }],
    take: limit,
  });
}

export function getClubLeaderboard(limit = 25) {
  return prisma.club.findMany({
    orderBy: [{ skillRating: "desc" }, { wins: "desc" }, { goalsFor: "desc" }],
    take: limit,
  });
}
