"use client";

import { useMemo, useState } from "react";
import Navbar from "../../components/Navbar";
import LeaderboardFilters, {
  type PlatformFilter,
  type RegionFilter,
  type SortKey,
} from "../../components/LeaderboardFilters";
import LeaderboardHeader from "../../components/LeaderboardHeader";
import LeaderboardTable from "../../components/LeaderboardTable";
import LeaderboardTabs, {
  type LeaderboardTab,
} from "../../components/LeaderboardTabs";
import { StatLabel } from "../../components/StatIcon";
import TopThreePodium from "../../components/TopThreePodium";
import {
  topClubs,
  topPlayers,
  type TopClub,
  type TopPlayer,
} from "../../lib/mockData";

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
  return Math.round((club.wins / club.games) * 100);
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

export default function LeaderboardsPage() {
  const [activeTab, setActiveTab] = useState<LeaderboardTab>("players");
  const [platform, setPlatform] = useState<PlatformFilter>("all");
  const [region, setRegion] = useState<RegionFilter>("all");
  const [sortBy, setSortBy] = useState<SortKey>("rank");

  const filteredPlayers = useMemo(() => {
    return topPlayers
      .filter((player) => platform === "all" || player.platform === platform)
      .filter((player) => region === "all" || player.region === region)
      .toSorted((first, second) => {
        if (sortBy === "rank" || sortBy === "redCards") {
          return playerSortValue(first, sortBy) - playerSortValue(second, sortBy);
        }

        return playerSortValue(second, sortBy) - playerSortValue(first, sortBy);
      });
  }, [platform, region, sortBy]);

  const filteredClubs = useMemo(() => {
    return topClubs
      .filter((club) => platform === "all" || club.platform === platform)
      .filter((club) => region === "all" || club.region === region)
      .toSorted((first, second) => {
        if (sortBy === "rank" || sortBy === "goalsAgainst") {
          return clubSortValue(first, sortBy) - clubSortValue(second, sortBy);
        }

        return clubSortValue(second, sortBy) - clubSortValue(first, sortBy);
      });
  }, [platform, region, sortBy]);

  const activePlayers = activeTab === "players" ? filteredPlayers : topPlayers;
  const activeClubs = activeTab === "clubs" ? filteredClubs : topClubs;
  const featuredPlayer = filteredPlayers[0] ?? topPlayers[0];
  const featuredClub = filteredClubs[0] ?? topClubs[0];

  function handleTabChange(tab: LeaderboardTab) {
    setActiveTab(tab);
    setSortBy("rank");
  }

  return (
    <main className="min-h-screen bg-black/35 text-white">
      <Navbar />

      <section className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:py-10">
        <LeaderboardHeader
          totalPlayers={topPlayers.length}
          totalClubs={topClubs.length}
        />

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm text-gray-400">
              <StatLabel label="Top Player" />
            </p>
            <p className="mt-2 text-2xl font-black text-white">
              {featuredPlayer.name}
            </p>
            <p className="mt-1 text-sm font-semibold text-green-400">
              <StatLabel
                label={`${featuredPlayer.goals + featuredPlayer.assists} G/A`}
                iconClassName="text-yellow-300"
              />
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm text-gray-400">
              <StatLabel label="Best Club" />
            </p>
            <p className="mt-2 text-2xl font-black text-white">
              {featuredClub.name}
            </p>
            <p className="mt-1 text-sm font-semibold text-blue-300">
              <StatLabel
                label={`${featuredClub.skillRating} Skill Rating`}
                iconClassName="text-yellow-300"
              />
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm text-gray-400">Active View</p>
            <p className="mt-2 text-2xl font-black capitalize text-white">
              {activeTab}
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-400">
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
      </section>
    </main>
  );
}
