export const featuredStats = [
  { label: "Clubs Tracked", value: "1,248" },
  { label: "Players Indexed", value: "18,932" },
  { label: "Matches Logged", value: "42,610" },
  { label: "Live Updates", value: "Soon" },
];

export const features = [
  {
    title: "Advanced Club Analytics",
    description:
      "Track win rate, form, goals per match, skill rating trends, and more.",
  },
  {
    title: "Player Performance Ratings",
    description:
      "Compare goals, assists, match ratings, consistency, and impact scores.",
  },
  {
    title: "Leaderboards",
    description:
      "Find the top clubs, players, attackers, midfielders, defenders, and goalkeepers.",
  },
];

export const mockClub = {
  id: "3456623",
  name: "Elite XI",
  platform: "Gen 5",
  record: {
    wins: 88,
    draws: 12,
    losses: 20,
  },
  skillRating: 1820,
  division: "Division 1",
  goalsFor: 312,
  goalsAgainst: 118,
  cleanSheets: 34,
  recentForm: ["W", "W", "D", "L", "W"],
  squad: [
    {
      id: "1",
      name: "Arya",
      position: "ST",
      matches: 120,
      goals: 146,
      assists: 52,
      rating: 8.7,
    },
    {
      id: "2",
      name: "Safwan",
      position: "CAM",
      matches: 115,
      goals: 64,
      assists: 91,
      rating: 8.5,
    },
    {
      id: "3",
      name: "Lockdown",
      position: "CB",
      matches: 108,
      goals: 6,
      assists: 14,
      rating: 7.9,
    },
    {
      id: "4",
      name: "Wall",
      position: "GK",
      matches: 96,
      goals: 0,
      assists: 2,
      rating: 8.1,
    },
  ],
};