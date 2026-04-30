import Navbar from "../../../components/Navbar";
import PlayerHeader from "../../../components/PlayerHeader";
import PlayerStatsGrid from "../../../components/PlayerStatsGrid";
import MatchHistory from "../../../components/MatchHistory";
import PerformanceChart from "../../../components/PerformanceChart";
import {
  eaPlatformLabels,
  getEaPlayerProfile,
  isEaPlatform,
} from "../../../lib/ea";

export default async function PlayerPage({
  params,
  searchParams,
}: {
  params: Promise<{ playerId: string }>;
  searchParams: Promise<{ clubId?: string; platform?: string }>;
}) {
  const [{ playerId }, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  const clubId = resolvedSearchParams.clubId;
  const platform = isEaPlatform(resolvedSearchParams.platform)
    ? resolvedSearchParams.platform
    : "common-gen5";

  if (!clubId) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />
        <section className="mx-auto max-w-4xl px-6 py-16">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">
              Live Player Lookup
            </p>
            <h1 className="mt-3 text-4xl font-bold">Open from a club squad</h1>
            <p className="mt-4 text-gray-400">
              EA player stats are scoped to a club, so this page needs a club ID.
              Open a club profile first, then select a player from Squad Stats.
            </p>
            <p className="mt-4 text-sm text-gray-500">Player ID: {playerId}</p>
          </div>
        </section>
      </main>
    );
  }

  try {
    const profile = await getEaPlayerProfile(clubId, playerId, platform);

    if (!profile.player) {
      return (
        <main className="min-h-screen bg-black text-white">
          <Navbar />
          <section className="mx-auto max-w-4xl px-6 py-16">
            <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-yellow-200">
                Player not found
              </p>
              <h1 className="mt-3 text-4xl font-bold">{profile.club.name}</h1>
              <p className="mt-4 text-gray-300">Player ID: {playerId}</p>
              <p className="mt-2 text-gray-300">Club ID: {clubId}</p>
              <p className="mt-4 text-gray-400">
                EA returned the club, but this player was not present in the
                current member stats response.
              </p>
            </div>
          </section>
        </main>
      );
    }

    const ratings = profile.recentMatches.map((match) => ({
      rating: match.rating,
      matchIndex: match.matchIndex,
    }));

    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <section className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10">
          <p className="text-sm text-gray-500">
            Player ID: {playerId} / Club ID: {clubId}
          </p>

          <PlayerHeader
            name={profile.player.name}
            club={profile.club.name}
            position={profile.player.position}
            platform={eaPlatformLabels[platform]}
          />

          <PlayerStatsGrid
            games={profile.player.matches}
            goals={profile.player.goals}
            assists={profile.player.assists}
            averageRating={profile.player.rating}
            winRate={profile.player.winRate}
            redCards={profile.player.redCards}
            tackles={profile.player.tackles}
            tackleSuccessRate={profile.player.tackleSuccessRate}
          />

          <PerformanceChart ratings={ratings} matchWindow={10} />

          <MatchHistory matches={profile.recentMatches} matchWindow={10} />
        </section>
      </main>
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to load live EA player stats.";

    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />
        <section className="mx-auto max-w-4xl px-6 py-16">
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-red-300">
              Live EA fetch failed
            </p>
            <h1 className="mt-3 text-4xl font-bold">Player Profile</h1>
            <p className="mt-4 text-gray-300">Player ID: {playerId}</p>
            <p className="mt-2 text-gray-300">Club ID: {clubId}</p>
            <p className="mt-4 text-gray-400">{message}</p>
          </div>
        </section>
      </main>
    );
  }
}
