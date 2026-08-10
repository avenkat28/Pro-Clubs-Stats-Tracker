"use client";

import { useEffect, useMemo, useState } from "react";
import CompareCard from "./CompareCard";
import CompareRadarChart, { type RadarMetric } from "./CompareRadarChart";
import CompareSearchBox from "./CompareSearchBox";
import CompareStatRow from "./CompareStatRow";
import CompareSummary from "./CompareSummary";
import CompareTypeTabs from "./CompareTypeTabs";
import type {
  CompareClub,
  CompareMode,
  ComparePlayer,
} from "../lib/compareTypes";

type CompareClientProps = {
  players: ComparePlayer[];
  clubs: CompareClub[];
  leftScopeClubId?: string;
  rightScopeClubId?: string;
  scopedToClubs?: boolean;
};

const emptyPlayer: ComparePlayer = {
  id: "",
  clubId: "",
  name: "Unavailable",
  club: "No club",
  position: "N/A",
  platform: "N/A",
  games: 0,
  goals: 0,
  assists: 0,
  rating: 0,
  winRate: 0,
  redCards: 0,
  tackles: 0,
  tackleRate: 0,
};

const emptyClub: CompareClub = {
  id: "",
  name: "Unavailable",
  division: "N/A",
  platform: "N/A",
  games: 0,
  wins: 0,
  draws: 0,
  losses: 0,
  goalsFor: 0,
  goalsAgainst: 0,
  cleanSheets: 0,
  skillRating: 0,
};

function divisionRank(division: string) {
  if (/elite/i.test(division)) return 0;

  const rank = Number(division.match(/\d+/)?.[0]);
  return Number.isFinite(rank) ? rank : 99;
}

function perGame(value: number, games: number) {
  return games > 0 ? Number((value / games).toFixed(2)) : 0;
}

function clubWinRate(club: CompareClub) {
  return club.games > 0 ? Math.round((club.wins / club.games) * 100) : 0;
}

function normalize(value: number, max: number) {
  return max > 0 ? Math.round((value / max) * 100) : 0;
}

function playerRadar(left: ComparePlayer, right: ComparePlayer): RadarMetric[] {
  const maxGoals = Math.max(left.goals, right.goals, 1);
  const maxAssists = Math.max(left.assists, right.assists, 1);
  const maxRating = Math.max(left.rating, right.rating, 1);
  const maxWinRate = Math.max(left.winRate, right.winRate, 1);
  const maxTackles = Math.max(left.tackles, right.tackles, 1);

  return [
    { label: "Goals", left: normalize(left.goals, maxGoals), right: normalize(right.goals, maxGoals) },
    { label: "Assists", left: normalize(left.assists, maxAssists), right: normalize(right.assists, maxAssists) },
    { label: "Rating", left: normalize(left.rating, maxRating), right: normalize(right.rating, maxRating) },
    { label: "Win %", left: normalize(left.winRate, maxWinRate), right: normalize(right.winRate, maxWinRate) },
    { label: "Tackles", left: normalize(left.tackles, maxTackles), right: normalize(right.tackles, maxTackles) },
  ];
}

function clubRadar(left: CompareClub, right: CompareClub): RadarMetric[] {
  const leftWinRate = clubWinRate(left);
  const rightWinRate = clubWinRate(right);
  const maxWins = Math.max(left.wins, right.wins, 1);
  const maxGoalsFor = Math.max(left.goalsFor, right.goalsFor, 1);
  const maxGoalsAgainst = Math.max(left.goalsAgainst, right.goalsAgainst, 1);
  const maxWinRate = Math.max(leftWinRate, rightWinRate, 1);
  const maxSkillRating = Math.max(left.skillRating, right.skillRating, 1);

  return [
    { label: "Wins", left: normalize(left.wins, maxWins), right: normalize(right.wins, maxWins) },
    { label: "GF", left: normalize(left.goalsFor, maxGoalsFor), right: normalize(right.goalsFor, maxGoalsFor) },
    {
      label: "GA",
      left: 100 - normalize(left.goalsAgainst, maxGoalsAgainst) + 20,
      right: 100 - normalize(right.goalsAgainst, maxGoalsAgainst) + 20,
    },
    { label: "Win %", left: normalize(leftWinRate, maxWinRate), right: normalize(rightWinRate, maxWinRate) },
    { label: "Skill", left: normalize(left.skillRating, maxSkillRating), right: normalize(right.skillRating, maxSkillRating) },
  ];
}

function scopedPlayerOptions(
  players: ComparePlayer[],
  scopedToClubs: boolean,
  primaryClubId?: string,
  fallbackClubId?: string,
) {
  if (!scopedToClubs) {
    return players;
  }

  const clubId = primaryClubId ?? fallbackClubId;

  return clubId
    ? players.filter((player) => player.clubId === clubId)
    : players;
}

export default function CompareClient({
  players,
  clubs,
  leftScopeClubId,
  rightScopeClubId,
  scopedToClubs = false,
}: CompareClientProps) {
  const leftPlayerOptions = useMemo(
    () =>
      scopedPlayerOptions(
        players,
        scopedToClubs,
        leftScopeClubId,
        rightScopeClubId,
      ),
    [leftScopeClubId, players, rightScopeClubId, scopedToClubs],
  );
  const rightPlayerOptions = useMemo(
    () =>
      scopedPlayerOptions(
        players,
        scopedToClubs,
        rightScopeClubId,
        leftScopeClubId,
      ),
    [leftScopeClubId, players, rightScopeClubId, scopedToClubs],
  );
  const usesSharedPlayerPool =
    !scopedToClubs ||
    !leftScopeClubId ||
    !rightScopeClubId ||
    leftScopeClubId === rightScopeClubId;
  const [mode, setMode] = useState<CompareMode>(
    players.length >= 2 ? "players" : "clubs",
  );
  const [leftPlayerId, setLeftPlayerId] = useState(leftPlayerOptions[0]?.id ?? "");
  const [rightPlayerId, setRightPlayerId] = useState(
    rightPlayerOptions[1]?.id ?? rightPlayerOptions[0]?.id ?? "",
  );
  const [leftClubId, setLeftClubId] = useState(clubs[0]?.id ?? "");
  const [rightClubId, setRightClubId] = useState(clubs[1]?.id ?? clubs[0]?.id ?? "");

  const leftPlayer =
    leftPlayerOptions.find((player) => player.id === leftPlayerId) ??
    leftPlayerOptions[0] ??
    emptyPlayer;
  const rightPlayer =
    rightPlayerOptions.find((player) => player.id === rightPlayerId) ??
    rightPlayerOptions[1] ??
    rightPlayerOptions[0] ??
    emptyPlayer;
  const leftClub = clubs.find((club) => club.id === leftClubId) ?? clubs[0] ?? emptyClub;
  const rightClub =
    clubs.find((club) => club.id === rightClubId) ?? clubs[1] ?? clubs[0] ?? emptyClub;

  const hasPlayerComparison =
    leftPlayerOptions.length > 0 &&
    rightPlayerOptions.length > 0 &&
    (!usesSharedPlayerPool ||
      leftPlayerOptions.length > 1 ||
      rightPlayerOptions.length > 1 ||
      leftPlayer.id !== rightPlayer.id);
  const hasClubComparison = clubs.length >= 2;
  const canCompare = mode === "players" ? hasPlayerComparison : hasClubComparison;
  const leftOptions = mode === "players" ? leftPlayerOptions : clubs;
  const rightOptions = mode === "players" ? rightPlayerOptions : clubs;
  const leftId = mode === "players" ? leftPlayerId : leftClubId;
  const rightId = mode === "players" ? rightPlayerId : rightClubId;

  useEffect(() => {
    if (
      mode === "players" &&
      leftPlayerOptions.length > 0 &&
      !leftPlayerOptions.some((player) => player.id === leftPlayerId)
    ) {
      setLeftPlayerId(leftPlayerOptions[0].id);
    }
  }, [leftPlayerId, leftPlayerOptions, mode]);

  useEffect(() => {
    if (
      mode === "players" &&
      rightPlayerOptions.length > 0 &&
      !rightPlayerOptions.some((player) => player.id === rightPlayerId)
    ) {
      setRightPlayerId(rightPlayerOptions[0].id);
    }
  }, [mode, rightPlayerId, rightPlayerOptions]);

  const radarMetrics = useMemo(() => {
    if (!canCompare) {
      return [];
    }

    return mode === "players"
      ? playerRadar(leftPlayer, rightPlayer)
      : clubRadar(leftClub, rightClub);
  }, [canCompare, leftClub, leftPlayer, mode, rightClub, rightPlayer]);

  function handleLeftChange(id: string) {
    if (mode === "players") {
      setLeftPlayerId(id);
    } else {
      setLeftClubId(id);
    }
  }

  function handleRightChange(id: string) {
    if (mode === "players") {
      setRightPlayerId(id);
    } else {
      setRightClubId(id);
    }
  }

  function handleRandomPlayers() {
    if (!hasPlayerComparison) {
      return;
    }

    const leftIndex = Math.floor(Math.random() * leftPlayerOptions.length);
    let rightIndex = Math.floor(Math.random() * rightPlayerOptions.length);

    if (usesSharedPlayerPool && rightPlayerOptions.length > 1) {
      while (rightPlayerOptions[rightIndex].id === leftPlayerOptions[leftIndex].id) {
        rightIndex = Math.floor(Math.random() * rightPlayerOptions.length);
      }
    }

    setMode("players");
    setLeftPlayerId(leftPlayerOptions[leftIndex].id);
    setRightPlayerId(rightPlayerOptions[rightIndex].id);
  }

  return (
    <>
      <CompareTypeTabs activeMode={mode} onModeChange={setMode} />

      {leftOptions.length > 0 || rightOptions.length > 0 ? (
        <div className="rounded-lg border border-white/10 bg-[#080b0a] p-4">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/45">
                Select matchup
              </p>
              <p className="mt-1 text-sm text-white/50">
                {mode === "players"
                  ? `${leftPlayerOptions.length} left / ${rightPlayerOptions.length} right player options loaded`
                  : `${clubs.length} club options loaded`}
              </p>
            </div>
            <button
              type="button"
              onClick={handleRandomPlayers}
              disabled={!hasPlayerComparison}
              className="rounded-md border border-white/10 px-4 py-2 text-sm font-semibold text-white/75 transition hover:border-emerald-300/45 hover:text-emerald-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Random players
            </button>
          </div>
          <CompareSearchBox
            mode={mode}
            leftOptions={leftOptions}
            rightOptions={rightOptions}
            leftId={leftId}
            rightId={rightId}
            onLeftChange={handleLeftChange}
            onRightChange={handleRightChange}
          />
        </div>
      ) : null}

      {!canCompare ? (
        <div className="rounded-lg border border-yellow-500/25 bg-yellow-500/10 p-5 text-yellow-100">
          <p className="text-sm font-semibold uppercase tracking-wide text-yellow-300">
            Not enough live EA data
          </p>
          <p className="mt-2 text-sm text-yellow-100/80">
            EA returned fewer than two {mode}. Try another platform.
          </p>
        </div>
      ) : null}

      {canCompare && mode === "players" ? (
        <CompareLayout
          mode={mode}
          leftPlayer={leftPlayer}
          rightPlayer={rightPlayer}
          leftClub={leftClub}
          rightClub={rightClub}
          radarMetrics={radarMetrics}
        />
      ) : null}

      {canCompare && mode === "clubs" ? (
        <CompareLayout
          mode={mode}
          leftPlayer={leftPlayer}
          rightPlayer={rightPlayer}
          leftClub={leftClub}
          rightClub={rightClub}
          radarMetrics={radarMetrics}
        />
      ) : null}
    </>
  );
}

function CompareLayout({
  mode,
  leftPlayer,
  rightPlayer,
  leftClub,
  rightClub,
  radarMetrics,
}: {
  mode: CompareMode;
  leftPlayer: ComparePlayer;
  rightPlayer: ComparePlayer;
  leftClub: CompareClub;
  rightClub: CompareClub;
  radarMetrics: RadarMetric[];
}) {
  const leftItem = mode === "players" ? leftPlayer : leftClub;
  const rightItem = mode === "players" ? rightPlayer : rightClub;

  return (
    <>
      <CompareSummary mode={mode} left={leftItem} right={rightItem} />

      <div className="grid gap-4 lg:grid-cols-2">
        <CompareCard mode={mode} item={leftItem} side="left" />
        <CompareCard mode={mode} item={rightItem} side="right" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
        <ComparisonTable
          mode={mode}
          leftPlayer={leftPlayer}
          rightPlayer={rightPlayer}
          leftClub={leftClub}
          rightClub={rightClub}
        />

        <CompareRadarChart
          leftName={leftItem.name}
          rightName={rightItem.name}
          metrics={radarMetrics}
        />
      </div>
    </>
  );
}

function ComparisonTable({
  mode,
  leftPlayer,
  rightPlayer,
  leftClub,
  rightClub,
}: {
  mode: CompareMode;
  leftPlayer: ComparePlayer;
  rightPlayer: ComparePlayer;
  leftClub: CompareClub;
  rightClub: CompareClub;
}) {
  return (
    <section className="overflow-hidden rounded-lg border border-white/10 bg-[#080b0a]">
      <div className="border-b border-white/10 px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300/80">
          Stat Breakdown
        </p>
        <h2 className="mt-1 text-xl font-semibold text-white">
          Main Comparison
        </h2>
      </div>

      <div className="max-h-[720px] overflow-auto">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-[#080b0a]/95 backdrop-blur">
            <tr className="border-b border-white/10">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-white/45">
                {mode === "players" ? leftPlayer.name : leftClub.name}
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.12em] text-white/45">
                Stat
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.12em] text-white/45">
                {mode === "players" ? rightPlayer.name : rightClub.name}
              </th>
            </tr>
          </thead>
          <tbody>
            {mode === "players" ? (
              <>
                <CompareStatRow label="Games" leftValue={leftPlayer.games} rightValue={rightPlayer.games} leftScore={leftPlayer.games} rightScore={rightPlayer.games} />
                <CompareStatRow label="Goals" leftValue={leftPlayer.goals} rightValue={rightPlayer.goals} leftScore={leftPlayer.goals} rightScore={rightPlayer.goals} />
                <CompareStatRow label="Assists" leftValue={leftPlayer.assists} rightValue={rightPlayer.assists} leftScore={leftPlayer.assists} rightScore={rightPlayer.assists} />
                <CompareStatRow label="G/A" leftValue={leftPlayer.goals + leftPlayer.assists} rightValue={rightPlayer.goals + rightPlayer.assists} leftScore={leftPlayer.goals + leftPlayer.assists} rightScore={rightPlayer.goals + rightPlayer.assists} />
                <CompareStatRow label="Goals/Game" leftValue={perGame(leftPlayer.goals, leftPlayer.games)} rightValue={perGame(rightPlayer.goals, rightPlayer.games)} leftScore={perGame(leftPlayer.goals, leftPlayer.games)} rightScore={perGame(rightPlayer.goals, rightPlayer.games)} />
                <CompareStatRow label="Assists/Game" leftValue={perGame(leftPlayer.assists, leftPlayer.games)} rightValue={perGame(rightPlayer.assists, rightPlayer.games)} leftScore={perGame(leftPlayer.assists, leftPlayer.games)} rightScore={perGame(rightPlayer.assists, rightPlayer.games)} />
                <CompareStatRow label="Avg Rating" leftValue={leftPlayer.rating.toFixed(1)} rightValue={rightPlayer.rating.toFixed(1)} leftScore={leftPlayer.rating} rightScore={rightPlayer.rating} />
                <CompareStatRow label="Win %" leftValue={`${leftPlayer.winRate}%`} rightValue={`${rightPlayer.winRate}%`} leftScore={leftPlayer.winRate} rightScore={rightPlayer.winRate} />
                <CompareStatRow label="Red Cards" leftValue={leftPlayer.redCards} rightValue={rightPlayer.redCards} leftScore={leftPlayer.redCards} rightScore={rightPlayer.redCards} lowerIsBetter />
                <CompareStatRow label="Tackles" leftValue={leftPlayer.tackles} rightValue={rightPlayer.tackles} leftScore={leftPlayer.tackles} rightScore={rightPlayer.tackles} />
                <CompareStatRow label="Tackle %" leftValue={`${leftPlayer.tackleRate}%`} rightValue={`${rightPlayer.tackleRate}%`} leftScore={leftPlayer.tackleRate} rightScore={rightPlayer.tackleRate} />
              </>
            ) : (
              <>
                <CompareStatRow label="Games" leftValue={leftClub.games} rightValue={rightClub.games} leftScore={leftClub.games} rightScore={rightClub.games} />
                <CompareStatRow label="Wins" leftValue={leftClub.wins} rightValue={rightClub.wins} leftScore={leftClub.wins} rightScore={rightClub.wins} />
                <CompareStatRow label="Draws" leftValue={leftClub.draws} rightValue={rightClub.draws} leftScore={leftClub.draws} rightScore={rightClub.draws} />
                <CompareStatRow label="Losses" leftValue={leftClub.losses} rightValue={rightClub.losses} leftScore={leftClub.losses} rightScore={rightClub.losses} lowerIsBetter />
                <CompareStatRow label="Win %" leftValue={`${clubWinRate(leftClub)}%`} rightValue={`${clubWinRate(rightClub)}%`} leftScore={clubWinRate(leftClub)} rightScore={clubWinRate(rightClub)} />
                <CompareStatRow label="Goals For" leftValue={leftClub.goalsFor} rightValue={rightClub.goalsFor} leftScore={leftClub.goalsFor} rightScore={rightClub.goalsFor} />
                <CompareStatRow label="Goals Against" leftValue={leftClub.goalsAgainst} rightValue={rightClub.goalsAgainst} leftScore={leftClub.goalsAgainst} rightScore={rightClub.goalsAgainst} lowerIsBetter />
                <CompareStatRow label="Clean Sheets" leftValue={leftClub.cleanSheets} rightValue={rightClub.cleanSheets} leftScore={leftClub.cleanSheets} rightScore={rightClub.cleanSheets} />
                <CompareStatRow label="Skill Rating" leftValue={leftClub.skillRating} rightValue={rightClub.skillRating} leftScore={leftClub.skillRating} rightScore={rightClub.skillRating} />
                <CompareStatRow label="Division" leftValue={leftClub.division} rightValue={rightClub.division} leftScore={divisionRank(leftClub.division)} rightScore={divisionRank(rightClub.division)} lowerIsBetter />
              </>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
