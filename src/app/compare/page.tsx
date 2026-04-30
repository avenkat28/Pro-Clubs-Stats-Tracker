"use client";

import { useMemo, useState } from "react";
import CompareCard from "../../components/CompareCard";
import CompareHeader from "../../components/CompareHeader";
import CompareRadarChart, {
  type RadarMetric,
} from "../../components/CompareRadarChart";
import CompareSearchBox from "../../components/CompareSearchBox";
import CompareStatRow from "../../components/CompareStatRow";
import CompareSummary from "../../components/CompareSummary";
import CompareTypeTabs from "../../components/CompareTypeTabs";
import Navbar from "../../components/Navbar";
import {
  compareClubs,
  comparePlayers,
  type CompareClub,
  type CompareMode,
  type ComparePlayer,
} from "../../lib/compareMockData";

function perGame(value: number, games: number) {
  return Number((value / games).toFixed(2));
}

function clubWinRate(club: CompareClub) {
  return Math.round((club.wins / club.games) * 100);
}

function normalize(value: number, max: number) {
  return Math.round((value / max) * 100);
}

function playerRadar(left: ComparePlayer, right: ComparePlayer): RadarMetric[] {
  const maxGoals = Math.max(left.goals, right.goals, 1);
  const maxAssists = Math.max(left.assists, right.assists, 1);
  const maxRating = Math.max(left.rating, right.rating, 1);
  const maxWinRate = Math.max(left.winRate, right.winRate, 1);
  const maxTackles = Math.max(left.tackles, right.tackles, 1);

  return [
    {
      label: "Goals",
      left: normalize(left.goals, maxGoals),
      right: normalize(right.goals, maxGoals),
    },
    {
      label: "Assists",
      left: normalize(left.assists, maxAssists),
      right: normalize(right.assists, maxAssists),
    },
    {
      label: "Rating",
      left: normalize(left.rating, maxRating),
      right: normalize(right.rating, maxRating),
    },
    {
      label: "Win %",
      left: normalize(left.winRate, maxWinRate),
      right: normalize(right.winRate, maxWinRate),
    },
    {
      label: "Tackles",
      left: normalize(left.tackles, maxTackles),
      right: normalize(right.tackles, maxTackles),
    },
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
    {
      label: "Wins",
      left: normalize(left.wins, maxWins),
      right: normalize(right.wins, maxWins),
    },
    {
      label: "GF",
      left: normalize(left.goalsFor, maxGoalsFor),
      right: normalize(right.goalsFor, maxGoalsFor),
    },
    {
      label: "GA",
      left: 100 - normalize(left.goalsAgainst, maxGoalsAgainst) + 20,
      right: 100 - normalize(right.goalsAgainst, maxGoalsAgainst) + 20,
    },
    {
      label: "Win %",
      left: normalize(leftWinRate, maxWinRate),
      right: normalize(rightWinRate, maxWinRate),
    },
    {
      label: "Skill",
      left: normalize(left.skillRating, maxSkillRating),
      right: normalize(right.skillRating, maxSkillRating),
    },
  ];
}

export default function ComparePage() {
  const [mode, setMode] = useState<CompareMode>("players");
  const [leftPlayerId, setLeftPlayerId] = useState(comparePlayers[0].id);
  const [rightPlayerId, setRightPlayerId] = useState(comparePlayers[1].id);
  const [leftClubId, setLeftClubId] = useState(compareClubs[0].id);
  const [rightClubId, setRightClubId] = useState(compareClubs[1].id);

  const leftPlayer =
    comparePlayers.find((player) => player.id === leftPlayerId) ??
    comparePlayers[0];
  const rightPlayer =
    comparePlayers.find((player) => player.id === rightPlayerId) ??
    comparePlayers[1];
  const leftClub =
    compareClubs.find((club) => club.id === leftClubId) ?? compareClubs[0];
  const rightClub =
    compareClubs.find((club) => club.id === rightClubId) ?? compareClubs[1];

  const leftItem = mode === "players" ? leftPlayer : leftClub;
  const rightItem = mode === "players" ? rightPlayer : rightClub;
  const options = mode === "players" ? comparePlayers : compareClubs;
  const leftId = mode === "players" ? leftPlayerId : leftClubId;
  const rightId = mode === "players" ? rightPlayerId : rightClubId;
  const radarMetrics = useMemo(() => {
    return mode === "players"
      ? playerRadar(leftPlayer, rightPlayer)
      : clubRadar(leftClub, rightClub);
  }, [leftClub, leftPlayer, mode, rightClub, rightPlayer]);

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

  return (
    <main className="min-h-screen bg-black/35 text-white">
      <Navbar />

      <section className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:py-10">
        <CompareHeader />

        <CompareTypeTabs activeMode={mode} onModeChange={setMode} />

        <CompareSearchBox
          mode={mode}
          options={options}
          leftId={leftId}
          rightId={rightId}
          onLeftChange={handleLeftChange}
          onRightChange={handleRightChange}
        />

        <CompareSummary mode={mode} left={leftItem} right={rightItem} />

        <div className="grid gap-4 lg:grid-cols-2">
          <CompareCard mode={mode} item={leftItem} side="left" />
          <CompareCard mode={mode} item={rightItem} side="right" />
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
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
      </section>
    </main>
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
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-blue-950/10 backdrop-blur">
      <div className="border-b border-white/10 px-5 py-4">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
          Stat Breakdown
        </p>
        <h2 className="mt-1 text-2xl font-black text-white">
          Main Comparison
        </h2>
      </div>

      <div className="max-h-[720px] overflow-auto">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur">
            <tr className="border-b border-white/10">
              <th className="px-4 py-4 text-left text-xs font-black uppercase tracking-[0.14em] text-gray-500">
                {mode === "players" ? leftPlayer.name : leftClub.name}
              </th>
              <th className="px-4 py-4 text-center text-xs font-black uppercase tracking-[0.14em] text-gray-500">
                Stat
              </th>
              <th className="px-4 py-4 text-right text-xs font-black uppercase tracking-[0.14em] text-gray-500">
                {mode === "players" ? rightPlayer.name : rightClub.name}
              </th>
            </tr>
          </thead>
          <tbody>
            {mode === "players" ? (
              <>
                <CompareStatRow
                  label="Games"
                  leftValue={leftPlayer.games}
                  rightValue={rightPlayer.games}
                  leftScore={leftPlayer.games}
                  rightScore={rightPlayer.games}
                />
                <CompareStatRow
                  label="Goals"
                  leftValue={leftPlayer.goals}
                  rightValue={rightPlayer.goals}
                  leftScore={leftPlayer.goals}
                  rightScore={rightPlayer.goals}
                />
                <CompareStatRow
                  label="Assists"
                  leftValue={leftPlayer.assists}
                  rightValue={rightPlayer.assists}
                  leftScore={leftPlayer.assists}
                  rightScore={rightPlayer.assists}
                />
                <CompareStatRow
                  label="G/A"
                  leftValue={leftPlayer.goals + leftPlayer.assists}
                  rightValue={rightPlayer.goals + rightPlayer.assists}
                  leftScore={leftPlayer.goals + leftPlayer.assists}
                  rightScore={rightPlayer.goals + rightPlayer.assists}
                />
                <CompareStatRow
                  label="Goals/Game"
                  leftValue={perGame(leftPlayer.goals, leftPlayer.games)}
                  rightValue={perGame(rightPlayer.goals, rightPlayer.games)}
                  leftScore={perGame(leftPlayer.goals, leftPlayer.games)}
                  rightScore={perGame(rightPlayer.goals, rightPlayer.games)}
                />
                <CompareStatRow
                  label="Assists/Game"
                  leftValue={perGame(leftPlayer.assists, leftPlayer.games)}
                  rightValue={perGame(rightPlayer.assists, rightPlayer.games)}
                  leftScore={perGame(leftPlayer.assists, leftPlayer.games)}
                  rightScore={perGame(rightPlayer.assists, rightPlayer.games)}
                />
                <CompareStatRow
                  label="Avg Rating"
                  leftValue={leftPlayer.rating.toFixed(1)}
                  rightValue={rightPlayer.rating.toFixed(1)}
                  leftScore={leftPlayer.rating}
                  rightScore={rightPlayer.rating}
                />
                <CompareStatRow
                  label="Win %"
                  leftValue={`${leftPlayer.winRate}%`}
                  rightValue={`${rightPlayer.winRate}%`}
                  leftScore={leftPlayer.winRate}
                  rightScore={rightPlayer.winRate}
                />
                <CompareStatRow
                  label="Red Cards"
                  leftValue={leftPlayer.redCards}
                  rightValue={rightPlayer.redCards}
                  leftScore={leftPlayer.redCards}
                  rightScore={rightPlayer.redCards}
                  lowerIsBetter
                />
                <CompareStatRow
                  label="Tackles"
                  leftValue={leftPlayer.tackles}
                  rightValue={rightPlayer.tackles}
                  leftScore={leftPlayer.tackles}
                  rightScore={rightPlayer.tackles}
                />
                <CompareStatRow
                  label="Tackle %"
                  leftValue={`${leftPlayer.tackleRate}%`}
                  rightValue={`${rightPlayer.tackleRate}%`}
                  leftScore={leftPlayer.tackleRate}
                  rightScore={rightPlayer.tackleRate}
                />
              </>
            ) : (
              <>
                <CompareStatRow
                  label="Games"
                  leftValue={leftClub.games}
                  rightValue={rightClub.games}
                  leftScore={leftClub.games}
                  rightScore={rightClub.games}
                />
                <CompareStatRow
                  label="Wins"
                  leftValue={leftClub.wins}
                  rightValue={rightClub.wins}
                  leftScore={leftClub.wins}
                  rightScore={rightClub.wins}
                />
                <CompareStatRow
                  label="Draws"
                  leftValue={leftClub.draws}
                  rightValue={rightClub.draws}
                  leftScore={leftClub.draws}
                  rightScore={rightClub.draws}
                />
                <CompareStatRow
                  label="Losses"
                  leftValue={leftClub.losses}
                  rightValue={rightClub.losses}
                  leftScore={leftClub.losses}
                  rightScore={rightClub.losses}
                  lowerIsBetter
                />
                <CompareStatRow
                  label="Win %"
                  leftValue={`${clubWinRate(leftClub)}%`}
                  rightValue={`${clubWinRate(rightClub)}%`}
                  leftScore={clubWinRate(leftClub)}
                  rightScore={clubWinRate(rightClub)}
                />
                <CompareStatRow
                  label="Goals For"
                  leftValue={leftClub.goalsFor}
                  rightValue={rightClub.goalsFor}
                  leftScore={leftClub.goalsFor}
                  rightScore={rightClub.goalsFor}
                />
                <CompareStatRow
                  label="Goals Against"
                  leftValue={leftClub.goalsAgainst}
                  rightValue={rightClub.goalsAgainst}
                  leftScore={leftClub.goalsAgainst}
                  rightScore={rightClub.goalsAgainst}
                  lowerIsBetter
                />
                <CompareStatRow
                  label="Clean Sheets"
                  leftValue={leftClub.cleanSheets}
                  rightValue={rightClub.cleanSheets}
                  leftScore={leftClub.cleanSheets}
                  rightScore={rightClub.cleanSheets}
                />
                <CompareStatRow
                  label="Skill Rating"
                  leftValue={leftClub.skillRating}
                  rightValue={rightClub.skillRating}
                  leftScore={leftClub.skillRating}
                  rightScore={rightClub.skillRating}
                />
                <CompareStatRow
                  label="Division"
                  leftValue={leftClub.division}
                  rightValue={rightClub.division}
                  leftScore={Number(leftClub.division.replace(/\D/g, ""))}
                  rightScore={Number(rightClub.division.replace(/\D/g, ""))}
                  lowerIsBetter
                />
              </>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
