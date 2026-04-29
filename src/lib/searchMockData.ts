export const mockSearchPlayers = [
  {
    id: "12345",
    name: "Arya",
    type: "player",
    position: "ST",
    club: "Elite XI",
    platform: "Gen 5",
    rating: 8.7,
    goals: 146,
    assists: 52,
  },
  {
    id: "67890",
    name: "Safwan",
    type: "player",
    position: "CAM",
    club: "Elite XI",
    platform: "Gen 5",
    rating: 8.5,
    goals: 64,
    assists: 91,
  },
];

export const mockSearchClubs = [
  {
    id: "3456623",
    name: "Elite XI",
    type: "club",
    platform: "Gen 5",
    division: "Division 1",
    record: "88W - 12D - 20L",
    skillRating: 1820,
  },
  {
    id: "778899",
    name: "North London FC",
    type: "club",
    platform: "Gen 5",
    division: "Division 2",
    record: "74W - 18D - 25L",
    skillRating: 1715,
  },
];

export function searchMockData(query: string) {
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) {
    return {
      players: [],
      clubs: [],
    };
  }

  const players = mockSearchPlayers.filter((player) =>
    [player.name, player.club, player.position, player.platform]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery)
  );

  const clubs = mockSearchClubs.filter((club) =>
    [club.name, club.division, club.platform, club.id]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery)
  );

  return {
    players,
    clubs,
  };
}