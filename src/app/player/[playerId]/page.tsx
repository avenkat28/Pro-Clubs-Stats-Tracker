import Navbar from "../../../components/Navbar";
import PlayerHeader from "../../../components/PlayerHeader";
import PlayerStatsGrid, {
  type PlayerAwardBadge,
} from "../../../components/PlayerStatsGrid";
import MatchHistory from "../../../components/MatchHistory";
import PerformanceChart from "../../../components/PerformanceChart";
import {
  type EaSquadMember,
  eaPlatformLabels,
  getEaPlayerProfile,
  normalizeEaPlatform,
} from "../../../lib/ea";
import { getPlayerStatComp } from "../../../lib/playerStatComp";

function isClubLeader(
  player: EaSquadMember,
  squad: EaSquadMember[],
  metric: (member: EaSquadMember) => number,
  requirePositive = false,
) {
  const best = Math.max(...squad.map(metric));

  if (requirePositive && best <= 0) {
    return false;
  }

  return metric(player) === best;
}

function getPlayerAwardBadges(
  player: EaSquadMember,
  squad: EaSquadMember[],
): PlayerAwardBadge[] {
  const badgeDefinitions: Array<{
    label: string;
    symbol: string;
    className: string;
    metric: (member: EaSquadMember) => number;
    requirePositive?: boolean;
  }> = [
    {
      label: "Top Scorer",
      symbol: "⚽",
      className: "border-emerald-300/30 bg-emerald-300/12 text-emerald-100",
      metric: (member) => member.goals,
      requirePositive: true,
    },
    {
      label: "Top Assister",
      symbol: "👟",
      className: "border-sky-300/30 bg-sky-300/12 text-sky-100",
      metric: (member) => member.assists,
      requirePositive: true,
    },
    {
      label: "Top Contributor",
      symbol: "✨",
      className: "border-yellow-300/30 bg-yellow-300/12 text-yellow-100",
      metric: (member) => member.goals + member.assists,
      requirePositive: true,
    },
    {
      label: "Top Crashout",
      symbol: "🟥",
      className: "border-red-300/30 bg-red-300/12 text-red-100",
      metric: (member) => member.redCards,
      requirePositive: true,
    },
    {
      label: "Top Defender",
      symbol: "🛡",
      className: "border-violet-300/30 bg-violet-300/12 text-violet-100",
      metric: (member) => member.tackles,
      requirePositive: true,
    },
    {
      label: "Most Consistent",
      symbol: "⭐",
      className: "border-lime-300/30 bg-lime-300/12 text-lime-100",
      metric: (member) => member.rating,
      requirePositive: true,
    },
    {
      label: "Most Appearances",
      symbol: "📅",
      className: "border-pink-300/30 bg-pink-300/12 text-pink-100",
      metric: (member) => member.matches,
      requirePositive: true,
    },
  ];

  return badgeDefinitions
    .filter((badge) =>
      isClubLeader(player, squad, badge.metric, badge.requirePositive),
    )
    .map(({ label, symbol, className }) => ({ label, symbol, className }));
}

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
  const platform = normalizeEaPlatform(resolvedSearchParams.platform);

  if (!clubId) {
    return (
      <main className="min-h-screen bg-black/35 text-white">
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
        <main className="min-h-screen bg-black/35 text-white">
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
    const awardBadges = getPlayerAwardBadges(profile.player, profile.squad);
    const playerStatComp = getPlayerStatComp({
      position: profile.player.position,
      overall: profile.player.overall,
      height: profile.player.height,
      games: profile.player.matches,
      goals: profile.player.goals,
      assists: profile.player.assists,
      averageRating: profile.player.rating,
      winRate: profile.player.winRate,
      tackles: profile.player.tackles,
      tacklePercent: profile.player.tackleSuccessRate,
      passesMade: profile.player.passesMade,
      passAttempts: profile.player.passAttempts,
      passAccuracy: profile.player.passAccuracy,
      motm: profile.player.manOfTheMatch,
      motmPercent: profile.player.manOfTheMatchRate,
      redCards: profile.player.redCards,
      recentMatches: profile.recentMatches,
    });

    return (
      <main className="min-h-screen bg-black/35 text-white">
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
            overall={profile.player.overall}
            height={profile.player.height}
            nationality={profile.player.nationality}
            comp={playerStatComp.primaryComp}
          />

          <PlayerStatsGrid
            games={profile.player.matches}
            overall={profile.player.overall}
            goals={profile.player.goals}
            assists={profile.player.assists}
            averageRating={profile.player.rating}
            winRate={profile.player.winRate}
            redCards={profile.player.redCards}
            tackles={profile.player.tackles}
            tackleSuccessRate={profile.player.tackleSuccessRate}
            passesMade={profile.player.passesMade}
            passAttempts={profile.player.passAttempts}
            passAccuracy={profile.player.passAccuracy}
            manOfTheMatch={profile.player.manOfTheMatch}
            manOfTheMatchRate={profile.player.manOfTheMatchRate}
            recentMatches={profile.recentMatches}
            matchWindow={10}
            awardBadges={awardBadges}
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
      <main className="min-h-screen bg-black/35 text-white">
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
