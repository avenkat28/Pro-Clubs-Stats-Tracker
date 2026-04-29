import Navbar from "../../../components/Navbar";
import PlayerHeader from "../../../components/PlayerHeader";
import PlayerStatsGrid from "../../../components/PlayerStatsGrid";
import MatchHistory from "../../../components/MatchHistory";
import PerformanceChart from "../../../components/PerformanceChart";

const mockPlayer = {
  id: "12345",
  name: "Arya",
  club: "Elite XI",
  position: "ST",
  platform: "Gen 5",
  games: 120,
  goals: 146,
  assists: 52,
  averageRating: 8.7,
  winRate: 74,
  redCards: 2,
  tackles: 84,
  tackleSuccessRate: 61,
  recentRatings: [8.9, 9.1, 8.3, 8.8, 9.4],
  recentMatches: [
    {
      id: "1",
      opponent: "Final Third FC",
      result: "W",
      score: "3-1",
      rating: 9.1,
      goals: 2,
      assists: 1,
      tackles: 3,
      passAccuracy: 91,
      redCards: 0,
    },
    {
      id: "2",
      opponent: "North London FC",
      result: "D",
      score: "2-2",
      rating: 8.3,
      goals: 1,
      assists: 0,
      tackles: 2,
      passAccuracy: 87,
      redCards: 0,
    },
    {
      id: "3",
      opponent: "Elite Ballers",
      result: "W",
      score: "4-0",
      rating: 9.4,
      goals: 3,
      assists: 1,
      tackles: 1,
      passAccuracy: 94,
      redCards: 0,
    },
  ],
};

export default function PlayerPage({
  params,
}: {
  params: { playerId: string };
}) {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10">
        <p className="text-sm text-gray-500">Player ID: {params.playerId}</p>

        <PlayerHeader
          name={mockPlayer.name}
          club={mockPlayer.club}
          position={mockPlayer.position}
          platform={mockPlayer.platform}
        />

        <PlayerStatsGrid
          games={mockPlayer.games}
          goals={mockPlayer.goals}
          assists={mockPlayer.assists}
          averageRating={mockPlayer.averageRating}
          winRate={mockPlayer.winRate}
          redCards={mockPlayer.redCards}
          tackles={mockPlayer.tackles}
          tackleSuccessRate={mockPlayer.tackleSuccessRate}
        />

        <PerformanceChart ratings={mockPlayer.recentRatings} />

        <MatchHistory matches={mockPlayer.recentMatches} />
      </section>
    </main>
  );
}