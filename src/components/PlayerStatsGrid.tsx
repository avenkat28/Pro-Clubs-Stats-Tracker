 "use client";

import { useState } from "react";
import { StatLabel } from "./StatIcon";

type RecentPlayerMatch = {
  rating: number;
  goals: number;
  assists: number;
};

type PlayerFormBadge = {
  label: "Hot" | "Reliable" | "Slumping" | "Absent" | "New Signing";
  summary: string;
  className: string;
  symbol: string;
  symbolClassName: string;
};

export type PlayerAwardBadge = {
  label: string;
  symbol: string;
  className: string;
  description: string;
};

type PlayerStatsGridProps = {
  position?: string;
  games: number;
  overall?: number;
  goals: number;
  assists: number;
  saves?: number;
  saveSuccessRate?: number;
  goalsAgainst?: number;
  cleanSheets?: number;
  averageRating: number;
  winRate: number;
  redCards: number;
  shotSuccessRate?: number;
  tackles?: number;
  tackleSuccessRate?: number;
  passesMade?: number;
  passAttempts?: number;
  passAccuracy?: number;
  manOfTheMatch?: number;
  manOfTheMatchRate?: number;
  recentMatches?: RecentPlayerMatch[];
  matchWindow?: number;
  awardBadges?: PlayerAwardBadge[];
};

function getPlayerFormBadge({
  games,
  recentMatches = [],
  matchWindow,
  isGoalkeeper = false,
  averageRating,
  saveSuccessRate,
}: {
  games: number;
  recentMatches?: RecentPlayerMatch[];
  matchWindow: number;
  isGoalkeeper?: boolean;
  averageRating?: number;
  saveSuccessRate?: number;
}): PlayerFormBadge {
  if (games < 10) {
    return {
      label: "New Signing",
      summary: `${games} overall apps`,
      className: "border-pink-300/30 bg-pink-400/10 text-pink-100",
      symbol: "✦",
      symbolClassName: "bg-pink-300/20 text-pink-100 ring-pink-200/25",
    };
  }

  if (recentMatches.length === 0) {
    if (isGoalkeeper) {
      const keeperSummary =
        saveSuccessRate !== undefined
          ? `${saveSuccessRate}% save rate, ${averageRating?.toFixed(1) ?? "N/A"} AVG`
          : `${averageRating?.toFixed(1) ?? "N/A"} AVG`;

      if ((averageRating ?? 0) >= 8.3 || (saveSuccessRate ?? 0) >= 75) {
        return {
          label: "Hot",
          summary: keeperSummary,
          className: "border-orange-300/35 bg-orange-400/12 text-orange-100",
          symbol: "🔥",
          symbolClassName: "bg-orange-300/20 text-orange-100 ring-orange-200/30",
        };
      }

      if ((averageRating ?? 0) < 7.2 && (saveSuccessRate ?? 100) < 62) {
        return {
          label: "Slumping",
          summary: keeperSummary,
          className: "border-sky-200/30 bg-sky-300/10 text-sky-100",
          symbol: "❄",
          symbolClassName: "bg-sky-200/20 text-sky-100 ring-sky-100/25",
        };
      }
    }

    return {
      label: "Absent",
      summary: `0 apps in last ${matchWindow}`,
      className: "border-zinc-400/20 bg-zinc-400/10 text-zinc-300",
      symbol: "○",
      symbolClassName: "bg-zinc-300/10 text-zinc-300 ring-zinc-200/15",
    };
  }

  const totalGoalContributions = recentMatches.reduce(
    (total, match) => total + match.goals + match.assists,
    0,
  );
  const goalContributionsPerGame =
    totalGoalContributions / recentMatches.length;
  const averageRecentRating =
    recentMatches.reduce((total, match) => total + match.rating, 0) /
    recentMatches.length;

  if (isGoalkeeper) {
    const summary =
      saveSuccessRate !== undefined
        ? `${saveSuccessRate}% save rate, ${averageRecentRating.toFixed(1)} AVG`
        : `${averageRecentRating.toFixed(1)} AVG`;

    if (averageRecentRating >= 8.2 || (saveSuccessRate ?? 0) >= 75) {
      return {
        label: "Hot",
        summary,
        className: "border-orange-300/35 bg-orange-400/12 text-orange-100",
        symbol: "🔥",
        symbolClassName: "bg-orange-300/20 text-orange-100 ring-orange-200/30",
      };
    }

    if (averageRecentRating < 7 || (saveSuccessRate ?? 100) < 62) {
      return {
        label: "Slumping",
        summary,
        className: "border-sky-200/30 bg-sky-300/10 text-sky-100",
        symbol: "❄",
        symbolClassName: "bg-sky-200/20 text-sky-100 ring-sky-100/25",
      };
    }

    return {
      label: "Reliable",
      summary,
      className: "border-lime-300/25 bg-lime-300/10 text-lime-100",
      symbol: "✓",
      symbolClassName: "bg-lime-300/20 text-lime-100 ring-lime-200/25",
    };
  }

  if (goalContributionsPerGame >= 2 && averageRecentRating >= 8.5) {
    return {
      label: "Hot",
      summary: `${goalContributionsPerGame.toFixed(2)} G/A, ${averageRecentRating.toFixed(1)} AVG`,
      className: "border-orange-300/35 bg-orange-400/12 text-orange-100",
      symbol: "🔥",
      symbolClassName: "bg-orange-300/20 text-orange-100 ring-orange-200/30",
    };
  }

  if (goalContributionsPerGame >= 1 && averageRecentRating >= 7) {
    return {
      label: "Reliable",
      summary: `${goalContributionsPerGame.toFixed(2)} G/A, ${averageRecentRating.toFixed(1)} AVG`,
      className: "border-lime-300/30 bg-lime-300/12 text-lime-100",
      symbol: "✓",
      symbolClassName: "bg-lime-300/20 text-lime-100 ring-lime-200/25",
    };
  }

  if (goalContributionsPerGame < 1 && averageRecentRating < 7) {
    return {
      label: "Slumping",
      summary: `${goalContributionsPerGame.toFixed(2)} G/A, ${averageRecentRating.toFixed(1)} AVG`,
      className: "border-sky-200/30 bg-sky-300/10 text-sky-100",
      symbol: "❄",
      symbolClassName: "bg-sky-200/20 text-sky-100 ring-sky-100/25",
    };
  }

  return {
    label: "Reliable",
    summary: `${goalContributionsPerGame.toFixed(2)} G/A, ${averageRecentRating.toFixed(1)} AVG`,
    className: "border-lime-300/25 bg-lime-300/10 text-lime-100",
    symbol: "✓",
    symbolClassName: "bg-lime-300/20 text-lime-100 ring-lime-200/25",
  };
}

export default function PlayerStatsGrid({
  position,
  games,
  overall,
  goals,
  assists,
  saves,
  saveSuccessRate,
  goalsAgainst,
  cleanSheets,
  averageRating,
  winRate,
  redCards,
  shotSuccessRate,
  tackles,
  tackleSuccessRate,
  passesMade,
  passAttempts,
  passAccuracy,
  manOfTheMatch,
  manOfTheMatchRate,
  recentMatches = [],
  matchWindow = 10,
  awardBadges = [],
}: PlayerStatsGridProps) {
  const [statMode, setStatMode] = useState<"overall" | "perMatch">("overall");
  const normalizedPosition = (position ?? "").toLowerCase();
  const isGoalkeeper =
    normalizedPosition.includes("gk") ||
    normalizedPosition.includes("keeper") ||
    normalizedPosition.includes("goalkeeper");
  const ga = goals + assists;
  const formBadge = getPlayerFormBadge({
    games,
    recentMatches,
    matchWindow,
    isGoalkeeper,
    averageRating,
    saveSuccessRate,
  });

  const goalsPerGame = games > 0 ? (goals / games).toFixed(2) : "0.00";
  const assistsPerGame = games > 0 ? (assists / games).toFixed(2) : "0.00";
  const gaPerGame = games > 0 ? (ga / games).toFixed(2) : "0.00";
  const redCardsRate = games > 0 ? Math.round((redCards / games) * 100) : 0;
  const passesMadePerGame =
    games > 0 && passesMade !== undefined ? (passesMade / games).toFixed(2) : "N/A";
  const passAttemptsPerGame =
    games > 0 && passAttempts !== undefined ? (passAttempts / games).toFixed(2) : "N/A";
  const tacklesPerGame =
    games > 0 && tackles !== undefined ? (tackles / games).toFixed(2) : "N/A";
  const savesPerGame =
    games > 0 && saves !== undefined ? (saves / games).toFixed(2) : "N/A";
  const goalsAgainstPerGame =
    games > 0 && goalsAgainst !== undefined
      ? (goalsAgainst / games).toFixed(2)
      : "N/A";
  const cleanSheetRate =
    games > 0 && cleanSheets !== undefined
      ? `${Math.round((cleanSheets / games) * 100)}%`
      : "N/A";

  const sharedStats = isGoalkeeper
    ? [
        { label: "Overall", value: overall && overall > 0 ? overall : "N/A" },
        { label: "Games", value: games },
        { label: "Avg Rating", value: averageRating },
        { label: "Win Rate", value: `${winRate}%` },
        {
          label: "Save %",
          value: saveSuccessRate !== undefined ? `${saveSuccessRate}%` : "N/A",
        },
        {
          label: "Pass %",
          value: passAccuracy !== undefined ? `${passAccuracy}%` : "N/A",
        },
        { label: "Clean Sheets", value: cleanSheets ?? "N/A" },
      ]
    : [
    { label: "Overall", value: overall && overall > 0 ? overall : "N/A" },
    { label: "Games", value: games },
    { label: "Avg Rating", value: averageRating },
    { label: "Win Rate", value: `${winRate}%` },
    {
      label: "Shot %",
      value: shotSuccessRate !== undefined ? `${shotSuccessRate}%` : "N/A",
    },
    {
      label: "Pass %",
      value: passAccuracy !== undefined ? `${passAccuracy}%` : "N/A",
    },
    {
      label: "Tackle %",
      value:
        tackleSuccessRate !== undefined
          ? `${tackleSuccessRate}%`
          : "N/A",
    },
  ];

  const modeStats =
    isGoalkeeper && statMode === "overall"
      ? [
          { label: "Saves", value: saves ?? "N/A" },
          {
            label: "Save %",
            value: saveSuccessRate !== undefined ? `${saveSuccessRate}%` : "N/A",
          },
          { label: "Goals Against", value: goalsAgainst ?? "N/A" },
          { label: "Clean Sheets", value: cleanSheets ?? "N/A" },
          { label: "MOTM", value: manOfTheMatch ?? "N/A" },
          { label: "Pass Attempts", value: passAttempts ?? "N/A" },
          { label: "Passes Made", value: passesMade ?? "N/A" },
          { label: "Red Cards", value: redCards },
        ]
      : isGoalkeeper
        ? [
            { label: "Saves / Match", value: savesPerGame },
            {
              label: "Goals Against / Match",
              value: goalsAgainstPerGame,
            },
            { label: "Clean Sheet %", value: cleanSheetRate },
            {
              label: "MOTM %",
              value:
                manOfTheMatchRate !== undefined
                  ? `${manOfTheMatchRate}%`
                  : "N/A",
            },
            { label: "Pass Attempts / Match", value: passAttemptsPerGame },
            { label: "Passes Made / Match", value: passesMadePerGame },
            {
              label: "Pass %",
              value: passAccuracy !== undefined ? `${passAccuracy}%` : "N/A",
            },
            { label: "Red Card %", value: `${redCardsRate}%` },
          ]
        : statMode === "overall"
      ? [
          { label: "Goals", value: goals },
          { label: "Assists", value: assists },
          { label: "G/A", value: ga },
          { label: "MOTM", value: manOfTheMatch ?? "N/A" },
          { label: "Pass Attempts", value: passAttempts ?? "N/A" },
          { label: "Passes Made", value: passesMade ?? "N/A" },
          { label: "Tackles", value: tackles ?? "N/A" },
          { label: "Red Cards", value: redCards },
        ]
      : [
          { label: "Goals / Match", value: goalsPerGame },
          { label: "Assists / Match", value: assistsPerGame },
          { label: "G/A / Match", value: gaPerGame },
          {
            label: "MOTM %",
            value:
              manOfTheMatchRate !== undefined
                ? `${manOfTheMatchRate}%`
                : "N/A",
          },
          { label: "Pass Attempts / Match", value: passAttemptsPerGame },
          { label: "Passes Made / Match", value: passesMadePerGame },
          { label: "Tackles / Match", value: tacklesPerGame },
          { label: "Red Card %", value: `${redCardsRate}%` },
        ];

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {awardBadges.length > 0 ? (
        <div className="player-stat-panel rounded-2xl border border-emerald-300/20 bg-[linear-gradient(135deg,rgba(16,185,129,0.16),rgba(14,165,233,0.08),rgba(236,72,153,0.08))] p-6 text-white shadow-[0_18px_45px_rgba(0,0,0,0.2)] md:col-span-3 lg:col-span-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">
            Club Badges
          </p>
          <div className="mt-4 flex flex-wrap gap-3 overflow-visible">
            {awardBadges.map((badge) => (
              <div key={badge.label} className="group relative overflow-visible">
                <span
                  aria-label={`${badge.label}: ${badge.description}`}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-black shadow-[0_10px_24px_rgba(0,0,0,0.18)] ${badge.className}`}
                >
                  <span aria-hidden="true">{badge.symbol}</span>
                  {badge.label}
                </span>
                <div className="club-meter-tooltip pointer-events-none absolute bottom-[calc(100%+0.65rem)] left-0 z-20 w-max max-w-[18rem] rounded-[1.1rem] border border-white/10 bg-black px-4 py-3 text-left text-sm font-semibold text-white opacity-0 shadow-[0_18px_45px_rgba(0,0,0,0.38)] transition duration-150 ease-out group-hover:opacity-100">
                  <p className="text-base font-black text-white">{badge.label}</p>
                  <p className="mt-1 text-sm font-medium text-white/80">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div
        className={`rounded-2xl border p-6 text-white shadow-[0_18px_45px_rgba(0,0,0,0.18)] ${formBadge.className}`}
      >
        <p className="text-sm opacity-75">
          <StatLabel label="Form" />
        </p>
        <div className="mt-2 flex items-center gap-3">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl font-black ring-1 ${formBadge.symbolClassName}`}
            aria-hidden="true"
          >
            {formBadge.symbol}
          </span>
          <p className="text-3xl font-black tracking-[-0.04em]">
            {formBadge.label}
          </p>
        </div>
        <p className="mt-2 text-sm font-semibold opacity-70">
          {formBadge.summary}
        </p>
      </div>

      {sharedStats.map((stat) => (
        <div
          key={stat.label}
          className="player-stat-panel rounded-2xl border border-white/10 bg-white/5 p-6 text-white"
        >
          <p className="text-sm text-gray-400">
            <StatLabel label={stat.label} />
          </p>
          <p className="mt-2 text-3xl font-bold">{stat.value}</p>
        </div>
      ))}

      <div className="player-stat-panel rounded-2xl border border-white/10 bg-white/5 p-4 text-white md:col-span-3 lg:col-span-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">
            Player Stats
          </p>
          <div className="club-segmented-control inline-flex w-fit rounded-full border border-emerald-300/15 bg-black/35 p-1">
            {[
              { label: "Overall", value: "overall" as const },
              { label: "Per Match", value: "perMatch" as const },
            ].map((tab) => {
              const isActive = statMode === tab.value;

              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setStatMode(tab.value)}
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

      {modeStats.map((stat) => (
        <div
          key={stat.label}
          className="player-stat-panel rounded-2xl border border-white/10 bg-white/5 p-6 text-white"
        >
          <p className="text-sm text-gray-400">
            <StatLabel label={stat.label} />
          </p>
          <p className="mt-2 text-3xl font-bold">{stat.value}</p>
        </div>
      ))}
    </section>
  );
}
