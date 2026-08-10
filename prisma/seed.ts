import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const clubs = [
  {
    eaClubId: "3456623",
    name: "Elite XI",
    platform: "Gen5",
    region: "NA",
    division: "Elite Division",
    skillRating: 1868,
    wins: 98,
    draws: 17,
    losses: 19,
    goalsFor: 342,
    goalsAgainst: 126,
    cleanSheets: 42,
  },
  {
    eaClubId: "2104421",
    name: "North London FC",
    platform: "Gen5",
    region: "EU",
    division: "Elite Division",
    skillRating: 1816,
    wins: 91,
    draws: 15,
    losses: 22,
    goalsFor: 304,
    goalsAgainst: 139,
    cleanSheets: 36,
  },
  {
    eaClubId: "9087344",
    name: "Final Third FC",
    platform: "Gen5",
    region: "EU",
    division: "Elite Division",
    skillRating: 1789,
    wins: 84,
    draws: 18,
    losses: 19,
    goalsFor: 286,
    goalsAgainst: 121,
    cleanSheets: 39,
  },
  {
    eaClubId: "6127804",
    name: "Top Bins FC",
    platform: "Old Gen",
    region: "NA",
    division: "Division 1",
    skillRating: 1642,
    wins: 69,
    draws: 16,
    losses: 23,
    goalsFor: 247,
    goalsAgainst: 151,
    cleanSheets: 28,
  },
];

const players = [
  {
    eaPlayerId: "EA-ARYA-001",
    name: "Arya",
    position: "ST",
    platform: "Gen5",
    region: "NA",
    clubEaClubId: "3456623",
    games: 126,
    goals: 158,
    assists: 54,
    averageRating: 8.9,
    winRate: 78,
    redCards: 1,
    tackles: 94,
    tackleSuccessRate: 61,
  },
  {
    eaPlayerId: "EA-SAFWAN-002",
    name: "Safwan",
    position: "CAM",
    platform: "Gen5",
    region: "NA",
    clubEaClubId: "3456623",
    games: 121,
    goals: 69,
    assists: 96,
    averageRating: 8.7,
    winRate: 76,
    redCards: 0,
    tackles: 138,
    tackleSuccessRate: 68,
  },
  {
    eaPlayerId: "EA-LOCKDOWN-003",
    name: "Lockdown",
    position: "CB",
    platform: "Gen5",
    region: "NA",
    clubEaClubId: "3456623",
    games: 113,
    goals: 8,
    assists: 17,
    averageRating: 8.4,
    winRate: 75,
    redCards: 2,
    tackles: 284,
    tackleSuccessRate: 82,
  },
  {
    eaPlayerId: "EA-WALL-004",
    name: "Wall",
    position: "GK",
    platform: "Gen5",
    region: "NA",
    clubEaClubId: "3456623",
    games: 98,
    goals: 0,
    assists: 2,
    averageRating: 8.1,
    winRate: 72,
    redCards: 0,
    tackles: 12,
    tackleSuccessRate: 50,
  },
  {
    eaPlayerId: "EA-TEMPO-005",
    name: "Tempo",
    position: "CDM",
    platform: "Old Gen",
    region: "NA",
    clubEaClubId: "6127804",
    games: 94,
    goals: 19,
    assists: 53,
    averageRating: 7.9,
    winRate: 64,
    redCards: 4,
    tackles: 221,
    tackleSuccessRate: 74,
  },
  {
    eaPlayerId: "EA-CLUTCH-006",
    name: "Clutch",
    position: "RW",
    platform: "Gen5",
    region: "EU",
    clubEaClubId: "2104421",
    games: 102,
    goals: 88,
    assists: 42,
    averageRating: 8.2,
    winRate: 67,
    redCards: 1,
    tackles: 77,
    tackleSuccessRate: 58,
  },
  {
    eaPlayerId: "EA-BOXTOBOX-007",
    name: "BoxToBox",
    position: "CM",
    platform: "Gen5",
    region: "EU",
    clubEaClubId: "9087344",
    games: 109,
    goals: 41,
    assists: 84,
    averageRating: 8.3,
    winRate: 70,
    redCards: 0,
    tackles: 194,
    tackleSuccessRate: 70,
  },
  {
    eaPlayerId: "EA-SWEEPER-008",
    name: "Sweeper",
    position: "CB",
    platform: "Gen5",
    region: "EU",
    clubEaClubId: "2104421",
    games: 104,
    goals: 12,
    assists: 46,
    averageRating: 8.1,
    winRate: 69,
    redCards: 3,
    tackles: 263,
    tackleSuccessRate: 80,
  },
];

const matches = [
  {
    eaMatchId: "MATCH-ELITE-001",
    clubEaClubId: "3456623",
    opponentName: "Final Third FC",
    opponentEaClubId: "9087344",
    result: "W",
    goalsFor: 3,
    goalsAgainst: 1,
    playedAt: new Date("2026-04-22T20:15:00.000Z"),
  },
  {
    eaMatchId: "MATCH-ELITE-002",
    clubEaClubId: "3456623",
    opponentName: "North London FC",
    opponentEaClubId: "2104421",
    result: "D",
    goalsFor: 2,
    goalsAgainst: 2,
    playedAt: new Date("2026-04-23T21:30:00.000Z"),
  },
  {
    eaMatchId: "MATCH-ELITE-003",
    clubEaClubId: "3456623",
    opponentName: "Top Bins FC",
    opponentEaClubId: "6127804",
    result: "W",
    goalsFor: 4,
    goalsAgainst: 0,
    playedAt: new Date("2026-04-24T19:45:00.000Z"),
  },
  {
    eaMatchId: "MATCH-NLFC-001",
    clubEaClubId: "2104421",
    opponentName: "Elite XI",
    opponentEaClubId: "3456623",
    result: "D",
    goalsFor: 2,
    goalsAgainst: 2,
    playedAt: new Date("2026-04-23T21:30:00.000Z"),
  },
  {
    eaMatchId: "MATCH-FTFC-001",
    clubEaClubId: "9087344",
    opponentName: "Top Bins FC",
    opponentEaClubId: "6127804",
    result: "W",
    goalsFor: 2,
    goalsAgainst: 0,
    playedAt: new Date("2026-04-25T18:20:00.000Z"),
  },
  {
    eaMatchId: "MATCH-TBFC-001",
    clubEaClubId: "6127804",
    opponentName: "North London FC",
    opponentEaClubId: "2104421",
    result: "L",
    goalsFor: 1,
    goalsAgainst: 3,
    playedAt: new Date("2026-04-26T22:05:00.000Z"),
  },
];

const playerMatchStats = [
  ["MATCH-ELITE-001", "EA-ARYA-001", 9.1, 2, 1, 3, 91, 0],
  ["MATCH-ELITE-001", "EA-SAFWAN-002", 8.6, 1, 2, 5, 88, 0],
  ["MATCH-ELITE-001", "EA-LOCKDOWN-003", 8.0, 0, 0, 11, 84, 0],
  ["MATCH-ELITE-001", "EA-WALL-004", 7.9, 0, 0, 1, 76, 0],
  ["MATCH-ELITE-002", "EA-ARYA-001", 8.3, 1, 0, 2, 87, 0],
  ["MATCH-ELITE-002", "EA-SAFWAN-002", 8.8, 0, 2, 7, 92, 0],
  ["MATCH-ELITE-002", "EA-LOCKDOWN-003", 7.4, 0, 0, 9, 81, 1],
  ["MATCH-ELITE-003", "EA-ARYA-001", 9.4, 3, 1, 1, 94, 0],
  ["MATCH-ELITE-003", "EA-SAFWAN-002", 8.9, 1, 2, 4, 90, 0],
  ["MATCH-NLFC-001", "EA-CLUTCH-006", 8.2, 1, 1, 3, 86, 0],
  ["MATCH-NLFC-001", "EA-SWEEPER-008", 7.8, 0, 0, 12, 83, 0],
  ["MATCH-FTFC-001", "EA-BOXTOBOX-007", 8.7, 1, 1, 8, 89, 0],
  ["MATCH-TBFC-001", "EA-TEMPO-005", 7.1, 0, 1, 10, 85, 0],
] as const;

async function main() {
  const clubByEaId = new Map<string, { id: string }>();
  const playerByEaId = new Map<string, { id: string }>();
  const matchByEaId = new Map<string, { id: string }>();

  for (const club of clubs) {
    const savedClub = await prisma.club.upsert({
      where: { eaClubId: club.eaClubId },
      update: club,
      create: club,
      select: { id: true },
    });

    clubByEaId.set(club.eaClubId, savedClub);
  }

  for (const player of players) {
    const { clubEaClubId, ...playerData } = player;
    const club = clubByEaId.get(clubEaClubId);

    if (!club) {
      throw new Error(`Missing seeded club ${clubEaClubId}`);
    }

    const savedPlayer = await prisma.player.upsert({
      where: { eaPlayerId: player.eaPlayerId },
      update: {
        ...playerData,
        clubId: club.id,
      },
      create: {
        ...playerData,
        clubId: club.id,
      },
      select: { id: true },
    });

    playerByEaId.set(player.eaPlayerId, savedPlayer);
  }

  for (const match of matches) {
    const { clubEaClubId, ...matchData } = match;
    const club = clubByEaId.get(clubEaClubId);

    if (!club) {
      throw new Error(`Missing seeded club ${clubEaClubId}`);
    }

    const savedMatch = await prisma.match.upsert({
      where: { eaMatchId: match.eaMatchId },
      update: {
        ...matchData,
        clubId: club.id,
      },
      create: {
        ...matchData,
        clubId: club.id,
      },
      select: { id: true },
    });

    matchByEaId.set(match.eaMatchId, savedMatch);
  }

  const seededMatchIds = Array.from(matchByEaId.values()).map((match) => match.id);
  const seededClubIds = Array.from(clubByEaId.values()).map((club) => club.id);
  const seededPlayerIds = Array.from(playerByEaId.values()).map((player) => player.id);

  await prisma.playerMatchStat.deleteMany({
    where: {
      matchId: {
        in: seededMatchIds,
      },
    },
  });

  await prisma.playerMatchStat.createMany({
    data: playerMatchStats.map(
      ([
        eaMatchId,
        eaPlayerId,
        rating,
        goals,
        assists,
        tackles,
        passAccuracy,
        redCards,
      ]) => {
        const match = matchByEaId.get(eaMatchId);
        const player = playerByEaId.get(eaPlayerId);

        if (!match || !player) {
          throw new Error(`Missing seeded match stat relation ${eaMatchId}/${eaPlayerId}`);
        }

        return {
          matchId: match.id,
          playerId: player.id,
          rating,
          goals,
          assists,
          tackles,
          passAccuracy,
          redCards,
        };
      }
    ),
  });

  await prisma.clubSnapshot.deleteMany({
    where: {
      clubId: {
        in: seededClubIds,
      },
    },
  });

  await prisma.clubSnapshot.createMany({
    data: clubs.map((club) => {
      const savedClub = clubByEaId.get(club.eaClubId);

      if (!savedClub) {
        throw new Error(`Missing seeded club snapshot ${club.eaClubId}`);
      }

      return {
        clubId: savedClub.id,
        wins: club.wins,
        draws: club.draws,
        losses: club.losses,
        goalsFor: club.goalsFor,
        goalsAgainst: club.goalsAgainst,
        cleanSheets: club.cleanSheets,
        skillRating: club.skillRating,
      };
    }),
  });

  await prisma.playerSnapshot.deleteMany({
    where: {
      playerId: {
        in: seededPlayerIds,
      },
    },
  });

  await prisma.playerSnapshot.createMany({
    data: players.map((player) => {
      const savedPlayer = playerByEaId.get(player.eaPlayerId);

      if (!savedPlayer) {
        throw new Error(`Missing seeded player snapshot ${player.eaPlayerId}`);
      }

      return {
        playerId: savedPlayer.id,
        games: player.games,
        goals: player.goals,
        assists: player.assists,
        averageRating: player.averageRating,
        winRate: player.winRate,
        redCards: player.redCards,
        tackles: player.tackles,
        tackleSuccessRate: player.tackleSuccessRate,
      };
    }),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
