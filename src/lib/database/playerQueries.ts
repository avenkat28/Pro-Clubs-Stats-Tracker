import { prisma } from "../db";

export function getPlayerByEaId(eaPlayerId: string) {
  return prisma.player.findUnique({
    where: { eaPlayerId },
  });
}

export function getPlayerById(id: string) {
  return prisma.player.findUnique({
    where: { id },
  });
}

export function getTopPlayers(limit = 10) {
  return prisma.player.findMany({
    include: {
      club: true,
    },
    orderBy: [{ averageRating: "desc" }, { goals: "desc" }, { assists: "desc" }],
    take: limit,
  });
}

export function getPlayerWithClub(eaPlayerId: string) {
  return prisma.player.findUnique({
    where: { eaPlayerId },
    include: {
      club: true,
    },
  });
}

export function getPlayerRecentMatchStats(playerId: string) {
  return prisma.playerMatchStat.findMany({
    where: { playerId },
    include: {
      match: {
        include: {
          club: true,
        },
      },
    },
    orderBy: [{ match: { playedAt: "desc" } }, { createdAt: "desc" }],
    take: 10,
  });
}
