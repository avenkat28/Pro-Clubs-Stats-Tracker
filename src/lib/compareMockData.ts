export type CompareMode = "players" | "clubs";

export type ComparePlayer = {
  id: string;
  name: string;
  club: string;
  position: string;
  platform: string;
  games: number;
  goals: number;
  assists: number;
  rating: number;
  winRate: number;
  redCards: number;
  tackles: number;
  tackleRate: number;
};

export type CompareClub = {
  id: string;
  name: string;
  division: string;
  platform: string;
  games: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  cleanSheets: number;
  skillRating: number;
};

export const comparePlayers: ComparePlayer[] = [
  {
    id: "1",
    name: "Arya",
    club: "Elite XI",
    position: "ST",
    platform: "Gen5",
    games: 126,
    goals: 158,
    assists: 54,
    rating: 8.9,
    winRate: 78,
    redCards: 1,
    tackles: 94,
    tackleRate: 61,
  },
  {
    id: "2",
    name: "Safwan",
    club: "Elite XI",
    position: "CAM",
    platform: "Gen5",
    games: 121,
    goals: 69,
    assists: 96,
    rating: 8.7,
    winRate: 76,
    redCards: 0,
    tackles: 138,
    tackleRate: 68,
  },
  {
    id: "3",
    name: "Lockdown",
    club: "Elite XI",
    position: "CB",
    platform: "Gen5",
    games: 113,
    goals: 8,
    assists: 17,
    rating: 8.4,
    winRate: 75,
    redCards: 2,
    tackles: 284,
    tackleRate: 82,
  },
  {
    id: "4",
    name: "Wall",
    club: "Elite XI",
    position: "GK",
    platform: "Gen5",
    games: 98,
    goals: 0,
    assists: 2,
    rating: 8.1,
    winRate: 72,
    redCards: 0,
    tackles: 12,
    tackleRate: 50,
  },
];

export const compareClubs: CompareClub[] = [
  {
    id: "3456623",
    name: "Elite XI",
    division: "Elite Division",
    platform: "Gen5",
    games: 134,
    wins: 98,
    draws: 17,
    losses: 19,
    goalsFor: 342,
    goalsAgainst: 126,
    cleanSheets: 42,
    skillRating: 1868,
  },
  {
    id: "2104421",
    name: "North London FC",
    division: "Elite Division",
    platform: "Gen5",
    games: 128,
    wins: 91,
    draws: 15,
    losses: 22,
    goalsFor: 304,
    goalsAgainst: 139,
    cleanSheets: 36,
    skillRating: 1816,
  },
  {
    id: "9087344",
    name: "Final Third FC",
    division: "Elite Division",
    platform: "Gen5",
    games: 121,
    wins: 84,
    draws: 18,
    losses: 19,
    goalsFor: 286,
    goalsAgainst: 121,
    cleanSheets: 39,
    skillRating: 1789,
  },
  {
    id: "6127804",
    name: "Top Bins FC",
    division: "Division 1",
    platform: "Old Gen",
    games: 108,
    wins: 69,
    draws: 16,
    losses: 23,
    goalsFor: 247,
    goalsAgainst: 151,
    cleanSheets: 28,
    skillRating: 1642,
  },
];
