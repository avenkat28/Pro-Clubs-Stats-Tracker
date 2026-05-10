"use client";

import { useState } from "react";
import PerformanceChart from "./PerformanceChart";
import { StatLabel } from "./StatIcon";

type RecentPlayerMatch = {
  id: string;
  matchIndex: number;
  rating: number;
  goals: number;
  assists: number;
  shots: number;
  shotSuccessRate: number;
  tackleAttempts: number;
  tacklesMade: number;
  tackleSuccessRate: number;
  passesMade: number;
  passAttempts: number;
  passAccuracy: number;
  manOfTheMatch: boolean;
  redCards: number;
};

type RecentPlayerSectionProps = {
  matches: RecentPlayerMatch[];
  matchWindow?: number;
};

type RecentView = "trend" | "stats";
type StatsMode = "overall" | "perMatch";

function getPercentage(numerator: number, denominator: number) {
  if (denominator <= 0) {
    return 0;
  }

  return Math.round((numerator / denominator) * 100);
}

function formatPerMatch(value: number, matches: number) {
  if (matches <= 0) {
    return "0.00";
  }

  return (value / matches).toFixed(2);
}

function statCard(label: string, value: string | number) {
  return (
    <div
      key={label}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white"
    >
      <p className="text-sm text-gray-400">
        <StatLabel label={label} />
      </p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}

export default function RecentPlayerSection({
  matches,
  matchWindow = 10,
}: RecentPlayerSectionProps) {
  const [recentView, setRecentView] = useState<RecentView>("trend");
  const [statsMode, setStatsMode] = useState<StatsMode>("overall");

  const ratings = matches.map((match) => ({
    rating: match.rating,
    matchIndex: match.matchIndex,
    matchId: match.id,
  }));
  const gamesPlayed = matches.length;
  const totalGoals = matches.reduce((sum, match) => sum + match.goals, 0);
  const totalAssists = matches.reduce((sum, match) => sum + match.assists, 0);
  const totalShots = matches.reduce((sum, match) => sum + match.shots, 0);
  const totalPassAttempts = matches.reduce((sum, match) => sum + match.passAttempts, 0);
  const totalPassesMade = matches.reduce((sum, match) => sum + match.passesMade, 0);
  const totalTackleAttempts = matches.reduce(
    (sum, match) => sum + match.tackleAttempts,
    0,
  );
  const totalTacklesMade = matches.reduce((sum, match) => sum + match.tacklesMade, 0);
  const totalMotm = matches.reduce(
    (sum, match) => sum + (match.manOfTheMatch ? 1 : 0),
    0,
  );
  const totalRedCards = matches.reduce((sum, match) => sum + match.redCards, 0);
  const totalGoalContributions = totalGoals + totalAssists;
  const averageRating =
    gamesPlayed > 0
      ? (
          matches.reduce((sum, match) => sum + match.rating, 0) / gamesPlayed
        ).toFixed(1)
      : "0.0";
  const shotPercentage = `${getPercentage(totalGoals, totalShots)}%`;
  const passPercentage = `${getPercentage(totalPassesMade, totalPassAttempts)}%`;
  const tacklePercentage = `${getPercentage(totalTacklesMade, totalTackleAttempts)}%`;
  const motmRate = `${getPercentage(totalMotm, gamesPlayed)}%`;
  const redCardRate = `${getPercentage(totalRedCards, gamesPlayed)}%`;

  const sharedStats = [
    { label: "Games Played", value: gamesPlayed },
    { label: "Average Rating", value: averageRating },
    { label: "Shot %", value: shotPercentage },
    { label: "Pass %", value: passPercentage },
    { label: "Tackle %", value: tacklePercentage },
  ];

  const overallRows = [
    [
      { label: "Goals", value: totalGoals },
      { label: "Assists", value: totalAssists },
      { label: "G/A", value: totalGoalContributions },
      { label: "MOTM", value: totalMotm },
      { label: "Red Cards", value: totalRedCards },
    ],
    [
      { label: "Shots", value: totalShots },
      { label: "Pass Attempts", value: totalPassAttempts },
      { label: "Passes Made", value: totalPassesMade },
      { label: "Tackle Attempts", value: totalTackleAttempts },
      { label: "Tackles Made", value: totalTacklesMade },
    ],
  ];

  const perMatchRows = [
    [
      { label: "Goals / Match", value: formatPerMatch(totalGoals, gamesPlayed) },
      { label: "Assists / Match", value: formatPerMatch(totalAssists, gamesPlayed) },
      { label: "G/A / Match", value: formatPerMatch(totalGoalContributions, gamesPlayed) },
      { label: "MOTM %", value: motmRate },
      { label: "Red Card %", value: redCardRate },
    ],
    [
      { label: "Shots / Match", value: formatPerMatch(totalShots, gamesPlayed) },
      {
        label: "Pass Attempts / Match",
        value: formatPerMatch(totalPassAttempts, gamesPlayed),
      },
      {
        label: "Passes Made / Match",
        value: formatPerMatch(totalPassesMade, gamesPlayed),
      },
      {
        label: "Tackle Attempts / Match",
        value: formatPerMatch(totalTackleAttempts, gamesPlayed),
      },
      {
        label: "Tackles Made / Match",
        value: formatPerMatch(totalTacklesMade, gamesPlayed),
      },
    ],
  ];

  const statRows = statsMode === "overall" ? overallRows : perMatchRows;

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Recent Player Form</h2>
          <p className="text-sm text-gray-400">Last {matchWindow} matches</p>
        </div>

        <div className="inline-flex w-fit rounded-full border border-emerald-300/15 bg-black/35 p-1">
          {[
            { label: "Rating Trend", value: "trend" as const },
            { label: "Match Stats", value: "stats" as const },
          ].map((tab) => {
            const isActive = recentView === tab.value;

            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setRecentView(tab.value)}
                className={`rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] transition ${
                  isActive
                    ? "bg-emerald-300 text-black shadow-[0_0_24px_rgba(110,231,183,0.22)]"
                    : "text-white/45 hover:text-emerald-100"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {recentView === "trend" ? (
        <div className="mt-6">
          <PerformanceChart ratings={ratings} matchWindow={matchWindow} />
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {sharedStats.map((stat) => statCard(stat.label, stat.value))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">
                Recent Match Stats
              </p>
              <div className="inline-flex w-fit rounded-full border border-emerald-300/15 bg-black/35 p-1">
                {[
                  { label: "Overall", value: "overall" as const },
                  { label: "Per Match", value: "perMatch" as const },
                ].map((tab) => {
                  const isActive = statsMode === tab.value;

                  return (
                    <button
                      key={tab.value}
                      type="button"
                      onClick={() => setStatsMode(tab.value)}
                      className={`rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] transition ${
                        isActive
                          ? "bg-emerald-300 text-black shadow-[0_0_24px_rgba(110,231,183,0.22)]"
                          : "text-white/45 hover:text-emerald-100"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
            {statRows[0].map((stat) => statCard(stat.label, stat.value))}
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
            {statRows[1].map((stat) => statCard(stat.label, stat.value))}
          </div>
        </div>
      )}
    </section>
  );
}
