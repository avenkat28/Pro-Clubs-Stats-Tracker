"use client";

import { useMemo, useState } from "react";
import type { TopClub, TopPlayer } from "../lib/mockData";
import LeaderboardFilters, {
  type PlatformFilter,
  type RegionFilter,
  type SortKey,
} from "./LeaderboardFilters";
import LeaderboardTable from "./LeaderboardTable";
import LeaderboardTabs, { type LeaderboardTab } from "./LeaderboardTabs";
import { StatLabel } from "./StatIcon";
import TopThreePodium from "./TopThreePodium";

type LeaderboardsClientProps = {
  players: TopPlayer[];
  clubs: TopClub[];
};

function playerSortValue(player: TopPlayer, sortBy: SortKey) {
  if (sortBy === "goalContributions") {
    return player.goals + player.assists;
  }

  if (sortBy in player) {
    const value = player[sortBy as keyof TopPlayer];
    return typeof value === "number" ? value : 0;
  }

  return player.rank;
}

function clubWinRate(club: TopClub) {
  return club.games > 0 ? Math.round((club.wins / club.games) * 100) : 0;
}

function clubSortValue(club: TopClub, sortBy: SortKey) {
  if (sortBy === "winRate") {
    return clubWinRate(club);
  }

  if (sortBy in club) {
    const value = club[sortBy as keyof TopClub];
    return typeof value === "number" ? value : 0;
  }

  return club.rank;
}

export default function LeaderboardsClient({
  players,
  clubs,
}: LeaderboardsClientProps) {
  if (players.length === 0 && clubs.length === 0) {
    return (
      <div className="app-empty-state text-white">
        <h2 className="text-2xl font-semibold">Leaderboards unavailable</h2>
        <p className="mt-2 text-white/55">
          EA did not return leaderboard data for this view. Try another platform shortly.
        </p>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState<LeaderboardTab>("players");
  const [platform, setPlatform] = useState<PlatformFilter>("all");
  const [region, setRegion] = useState<RegionFilter>("all");
  const [sortBy, setSortBy] = useState<SortKey>("rank");

  const filteredPlayers = useMemo(() => {
    return players
      .filter((player) => platform === "all" || player.platform === platform)
      .filter((player) => region === "all" || player.region === region)
      .toSorted((first, second) => {
        if (sortBy === "rank" || sortBy === "redCards") {
          return playerSortValue(first, sortBy) - playerSortValue(second, sortBy);
        }

        return playerSortValue(second, sortBy) - playerSortValue(first, sortBy);
      });
  }, [platform, players, region, sortBy]);

  const filteredClubs = useMemo(() => {
    return clubs
      .filter((club) => platform === "all" || club.platform === platform)
      .filter((club) => region === "all" || club.region === region)
      .toSorted((first, second) => {
        if (sortBy === "rank" || sortBy === "goalsAgainst") {
          return clubSortValue(first, sortBy) - clubSortValue(second, sortBy);
        }

        return clubSortValue(second, sortBy) - clubSortValue(first, sortBy);
      });
  }, [clubs, platform, region, sortBy]);

  const activePlayers = activeTab === "players" ? filteredPlayers : players;
  const activeClubs = activeTab === "clubs" ? filteredClubs : clubs;
  const featuredPlayer = filteredPlayers[0] ?? players[0];
  const featuredClub = filteredClubs[0] ?? clubs[0];

  function handleTabChange(tab: LeaderboardTab) {
    setActiveTab(tab);
    setSortBy("rank");
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="app-surface p-5">
          <p className="text-sm text-white/45">
            <StatLabel label="Top Player" />
          </p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {featuredPlayer?.name ?? "Unavailable"}
          </p>
          <p className="mt-1 text-sm font-semibold text-emerald-300">
            <StatLabel
              label={
                featuredPlayer
                  ? `${featuredPlayer.goals + featuredPlayer.assists} G/A`
                  : "Waiting for EA"
              }
              iconClassName="text-yellow-300"
            />
          </p>
        </div>
        <div className="app-surface p-5">
          <p className="text-sm text-white/45">
            <StatLabel label="Best Club" />
          </p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {featuredClub?.name ?? "Unavailable"}
          </p>
          <p className="mt-1 text-sm font-semibold text-emerald-300">
            <StatLabel
              label={
                featuredClub
                  ? `${featuredClub.skillRating} Skill Rating`
                  : "Waiting for EA"
              }
              iconClassName="text-yellow-300"
            />
          </p>
        </div>
        <div className="app-surface p-5">
          <p className="text-sm text-white/45">Active View</p>
          <p className="mt-2 text-2xl font-semibold capitalize text-white">
            {activeTab}
          </p>
          <p className="mt-1 text-sm font-semibold text-white/45">
            Sorted by {sortBy}
          </p>
        </div>
      </div>

      <LeaderboardTabs activeTab={activeTab} onTabChange={handleTabChange} />

      <LeaderboardFilters
        activeTab={activeTab}
        platform={platform}
        region={region}
        sortBy={sortBy}
        onPlatformChange={setPlatform}
        onRegionChange={setRegion}
        onSortChange={setSortBy}
      />

      <TopThreePodium
        activeTab={activeTab}
        players={activePlayers}
        clubs={activeClubs}
      />

      <LeaderboardTable
        activeTab={activeTab}
        players={filteredPlayers}
        clubs={filteredClubs}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
    </>
  );
}
