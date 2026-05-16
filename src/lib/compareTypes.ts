export type CompareMode = "players" | "clubs";

export type ComparePlayer = {
  id: string;
  clubId: string;
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
