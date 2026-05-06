"use client";

import { useState } from "react";
import {
  teamStrengthBarClassName,
  teamStrengthGlowClassName,
  teamStrengthTextClassName,
} from "../lib/colorCoding";
import { StatLabel } from "./StatIcon";

type ClubStatsGridProps = {
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  cleanSheets: number;
  recentMatches: {
    result: "W" | "D" | "L";
    score: string;
  }[];
  appearanceBreakdown: {
    total: number;
    league: number;
    playoff: number;
    bestPlayoffFinish: {
      badgeLevel: number | null;
      label: string;
    };
  };
};

type PerformanceStatLine = {
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
};

type PerformanceTab = "overall" | "last10";

function parseScore(score: string) {
  const [goalsFor, goalsAgainst] = score
    .split("-")
    .map((value) => Number(value.trim()));

  return {
    goalsFor: Number.isFinite(goalsFor) ? goalsFor : 0,
    goalsAgainst: Number.isFinite(goalsAgainst) ? goalsAgainst : 0,
  };
}

function getOverallStoryline({
  matches,
  wins,
  draws,
  losses,
  winRate,
  goalsPerMatch,
  concededPerMatch,
  goalDifference,
}: {
  matches: number;
  wins: number;
  draws: number;
  losses: number;
  winRate: number;
  goalsPerMatch: number;
  concededPerMatch: number;
  goalDifference: number;
}) {
  if (matches === 0) {
    return "No completed club matches are available yet, so the overall profile is still waiting for a real sample.";
  }

  const recordNote =
    winRate >= 65
      ? "The overall record points to a dominant side that turns most matches into wins."
      : winRate >= 50
        ? "The overall record is strong, with enough wins to keep the club clearly above water."
        : winRate >= 35
          ? "The overall record is mixed, with results still swinging week to week."
          : "The overall record is under pressure, and the club needs a steadier route to wins.";

  const attackNote =
    goalsPerMatch >= 2.5
      ? "The attack is the main strength, producing goals at a high clip."
      : goalsPerMatch >= 1.5
        ? "The attack is serviceable and gives the team a platform most nights."
        : "Chance creation looks like the biggest area to improve.";

  const defenseNote =
    concededPerMatch <= 1
      ? "Defensively, they are keeping matches controlled."
      : concededPerMatch <= 2
        ? "Defensively, they are competitive but still giving opponents chances."
        : "Defensive stability is the clearest concern.";

  const balanceNote =
    goalDifference > 20
      ? "That production is showing up in the margins too."
      : goalDifference >= 0
        ? "The margins are manageable, but there is not much cushion yet."
        : "The negative margin shows the performances are not matching the target yet.";

  const formattedGoalDifference =
    goalDifference > 0 ? `+${goalDifference}` : goalDifference.toString();
  const recordWithNumbers = `${recordNote} Through ${matches} matches, that comes out to ${wins}W - ${draws}D - ${losses}L and a ${winRate}% win rate.`;
  const attackWithNumbers = `${attackNote} They are scoring ${goalsPerMatch.toFixed(2)} per match.`;
  const defenseWithNumbers = `${defenseNote} They are conceding ${concededPerMatch.toFixed(2)} per match.`;
  const balanceWithNumbers = `${balanceNote} The overall goal difference sits at ${formattedGoalDifference}.`;

  return `${recordWithNumbers} ${attackWithNumbers} ${defenseWithNumbers} ${balanceWithNumbers}`;
}

export default function ClubStatsGrid({
  wins,
  draws,
  losses,
  goalsFor,
  goalsAgainst,
  cleanSheets,
  recentMatches,
  appearanceBreakdown,
}: ClubStatsGridProps) {
  const [activePerformanceTab, setActivePerformanceTab] =
    useState<PerformanceTab>("overall");
  const matches = wins + draws + losses;
  const winRate = matches > 0 ? Math.round((wins / matches) * 100) : 0;
  const goalDifference = goalsFor - goalsAgainst;
  const formattedGoalDifference =
    goalDifference > 0 ? `+${goalDifference}` : goalDifference.toString();
  const cleanSheetRate =
    matches > 0 ? Math.round((cleanSheets / matches) * 100) : 0;
  const goalsPerMatchValue = matches > 0 ? goalsFor / matches : 0;
  const concededPerMatchValue = matches > 0 ? goalsAgainst / matches : 0;
  const goalsPerMatch = goalsPerMatchValue.toFixed(2);
  const concededPerMatch = concededPerMatchValue.toFixed(2);

  const goalDifferenceTone =
    goalDifference > 0
      ? "text-emerald-300"
      : goalDifference < 0
        ? "text-red-300"
        : "text-lime-200";
  const cleanSheetTone = cleanSheets > 0 ? "text-emerald-300" : "text-white";

  const attackStrength =
    matches > 0 ? Math.min(100, Math.round((goalsFor / matches) * 24)) : 0;
  const defenseStrength =
    matches > 0
      ? Math.max(0, Math.min(100, Math.round(100 - (goalsAgainst / matches) * 20)))
      : 0;
  const lastTenResults = recentMatches.slice(0, 10);
  const formPoints = lastTenResults.reduce((total, match) => {
    if (match.result === "W") {
      return total + 3;
    }

    if (match.result === "D") {
      return total + 1;
    }

    return total;
  }, 0);
  const formMaxPoints = lastTenResults.length * 3;
  const formStrength =
    formMaxPoints > 0 ? Math.round((formPoints / formMaxPoints) * 100) : 0;
  const recentWins = lastTenResults.filter((match) => match.result === "W").length;
  const recentDraws = lastTenResults.filter((match) => match.result === "D").length;
  const recentLosses = lastTenResults.filter((match) => match.result === "L").length;
  const recentGoals = lastTenResults.reduce(
    (totals, match) => {
      const parsedScore = parseScore(match.score);

      return {
        goalsFor: totals.goalsFor + parsedScore.goalsFor,
        goalsAgainst: totals.goalsAgainst + parsedScore.goalsAgainst,
      };
    },
    { goalsFor: 0, goalsAgainst: 0 },
  );
  const recentGoalDifference = recentGoals.goalsFor - recentGoals.goalsAgainst;
  const formattedRecentGoalDifference =
    recentGoalDifference > 0
      ? `+${recentGoalDifference}`
      : recentGoalDifference.toString();
  const lastTenStats: PerformanceStatLine = {
    wins: recentWins,
    draws: recentDraws,
    losses: recentLosses,
    goalsFor: recentGoals.goalsFor,
    goalsAgainst: recentGoals.goalsAgainst,
    goalDifference: recentGoalDifference,
  };
  const overallStats: PerformanceStatLine = {
    wins,
    draws,
    losses,
    goalsFor,
    goalsAgainst,
    goalDifference,
  };
  const overallStoryline = getOverallStoryline({
    matches,
    wins,
    draws,
    losses,
    winRate,
    goalsPerMatch: goalsPerMatchValue,
    concededPerMatch: concededPerMatchValue,
    goalDifference,
  });

  const activeStats =
    activePerformanceTab === "overall" ? overallStats : lastTenStats;
  const activeMatches = activeStats.wins + activeStats.draws + activeStats.losses;
  const activeTabLabel =
    activePerformanceTab === "overall" ? "Overall" : "Last 10";
  const activeWinRate =
    activeMatches > 0 ? Math.round((activeStats.wins / activeMatches) * 100) : 0;
  const activeDrawRate =
    activeMatches > 0 ? Math.round((activeStats.draws / activeMatches) * 100) : 0;
  const activeLossRate =
    activeMatches > 0 ? Math.round((activeStats.losses / activeMatches) * 100) : 0;
  const activeWinBarWidth =
    activeMatches > 0 ? (activeStats.wins / activeMatches) * 100 : 0;
  const activeDrawBarWidth =
    activeMatches > 0 ? (activeStats.draws / activeMatches) * 100 : 0;
  const activeLossBarWidth =
    activeMatches > 0 ? (activeStats.losses / activeMatches) * 100 : 0;
  const activeGoalDifference =
    activeStats.goalDifference > 0
      ? `+${activeStats.goalDifference}`
      : activeStats.goalDifference.toString();
  const activeGoalsForPerMatch =
    activeMatches > 0 ? (activeStats.goalsFor / activeMatches).toFixed(2) : "0.00";
  const activeGoalsAgainstPerMatch =
    activeMatches > 0 ? (activeStats.goalsAgainst / activeMatches).toFixed(2) : "0.00";
  const activeWinRateTone =
    activeWinRate >= 60
      ? "text-emerald-300"
      : activeWinRate >= 40
        ? "text-lime-200"
        : "text-red-300";
  const strengthMeters = [
    {
      label: "Attack",
      value: attackStrength,
      details: [`Goals scored: ${goalsFor}`, `Goals scored per match: ${goalsPerMatch}`],
    },
    {
      label: "Defense",
      value: defenseStrength,
      details: [
        `Goals conceded: ${goalsAgainst}`,
        `Goals conceded per match: ${concededPerMatch}`,
      ],
    },
    {
      label: "Form",
      value: formStrength,
      details: [
        `Last 10 record: ${recentWins}W - ${recentDraws}D - ${recentLosses}L`,
        `Goals scored: ${recentGoals.goalsFor}`,
        `Goals conceded: ${recentGoals.goalsAgainst}`,
        `Goal differential: ${formattedRecentGoalDifference}`,
      ],
    },
  ];
  const panelClassName =
    "min-w-0 rounded-[1.35rem] border border-emerald-400/10 bg-[#07100c]/80 p-4 text-white shadow-[0_18px_45px_rgba(0,0,0,0.22)] ring-1 ring-white/[0.03] sm:p-5";
  const tileClassName =
    "min-w-0 rounded-2xl border border-white/[0.06] bg-black/25 p-3 ring-1 ring-white/[0.02] sm:p-4";

  return (
    <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1.12fr_0.88fr_0.9fr]">
      <div className={panelClassName}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-200/55">
            Performance
          </p>
          <div className="inline-flex w-fit rounded-full border border-emerald-300/15 bg-black/35 p-1">
            {[
              { label: "Overall", value: "overall" as const },
              { label: "Last 10", value: "last10" as const },
            ].map((tab) => {
              const isActive = activePerformanceTab === tab.value;

              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActivePerformanceTab(tab.value)}
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

        <div className="club-record-row mt-5">
          <div className="min-w-0">
            <p className="text-sm text-white/45">{activeTabLabel} Record</p>
            <p className="club-record-value mt-2">
              {activeStats.wins}W <span className="text-white/25">/</span> {activeStats.draws}D{" "}
              <span className="text-white/25">/</span> {activeStats.losses}L
            </p>
          </div>
          <div className="sm:text-right">
            <p className="text-sm text-white/45">Win Rate</p>
            <p className={`club-win-rate-value mt-2 ${activeWinRateTone}`}>
              {activeWinRate}%
            </p>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-full bg-white/10">
          <div className="flex h-2.5 w-full" aria-label="Wins, draws, and losses split">
            <div className="h-full bg-emerald-400" style={{ width: `${activeWinBarWidth}%` }} />
            <div className="h-full bg-white/35" style={{ width: `${activeDrawBarWidth}%` }} />
            <div className="h-full bg-red-400" style={{ width: `${activeLossBarWidth}%` }} />
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Wins {activeWinRate}%
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white/35" />
            Draws {activeDrawRate}%
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-400" />
            Losses {activeLossRate}%
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          <div className={tileClassName}>
            <p className="text-xs text-white/45">
              <StatLabel label="Matches" iconClassName="h-3.5 w-3.5" />
            </p>
            <p className="mt-2 text-[clamp(1.35rem,6vw,1.5rem)] font-black tracking-[-0.04em]">{activeMatches}</p>
          </div>
          <div className={tileClassName}>
            <p className="text-xs text-white/45">
              <StatLabel label="GF" iconClassName="h-3.5 w-3.5" />
            </p>
            <p className="mt-2 text-[clamp(1.35rem,6vw,1.5rem)] font-black tracking-[-0.04em] text-emerald-300">
              {activeStats.goalsFor}
            </p>
            <p className="mt-1 text-xs text-white/35">{activeGoalsForPerMatch}/match</p>
          </div>
          <div className={tileClassName}>
            <p className="text-xs text-white/45">
              <StatLabel label="GA" iconClassName="h-3.5 w-3.5" />
            </p>
            <p className="mt-2 text-[clamp(1.35rem,6vw,1.5rem)] font-black tracking-[-0.04em] text-red-300">
              {activeStats.goalsAgainst}
            </p>
            <p className="mt-1 text-xs text-white/35">{activeGoalsAgainstPerMatch}/match</p>
          </div>
          <div className={tileClassName}>
            <p className="text-xs text-white/45">
              <StatLabel label="GD" iconClassName="h-3.5 w-3.5" />
            </p>
            <p
              className={`mt-2 text-[clamp(1.35rem,6vw,1.5rem)] font-black tracking-[-0.04em] ${
                activeStats.goalDifference >= 0 ? "text-emerald-300" : "text-red-300"
              }`}
            >
              {activeGoalDifference}
            </p>
          </div>
        </div>

        {activePerformanceTab === "overall" ? (
          <div className="mt-5 grid gap-3 border-t border-white/[0.07] pt-4 sm:grid-cols-3">
            <div>
              <p className="text-xs text-white/40">League Apps</p>
              <p className="mt-1 text-2xl font-black tracking-[-0.04em]">
                {appearanceBreakdown.league}
              </p>
            </div>
            <div>
              <p className="text-xs text-white/40">Playoff Apps</p>
              <p className="mt-1 text-2xl font-black tracking-[-0.04em]">
                {appearanceBreakdown.playoff}
              </p>
            </div>
            <div>
              <p className="text-xs text-white/40">Best Finish</p>
              <div className="mt-1 flex items-center gap-2">
                {appearanceBreakdown.bestPlayoffFinish.badgeLevel ? (
                  <span className="flex h-8 w-7 items-center justify-center rounded-lg border border-lime-200/30 bg-lime-300/15 text-sm font-black text-lime-100">
                    {appearanceBreakdown.bestPlayoffFinish.badgeLevel}
                  </span>
                ) : null}
                <p className="min-w-0 text-base font-black tracking-[-0.04em] text-white sm:text-lg">
                  {appearanceBreakdown.bestPlayoffFinish.label}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className={panelClassName}>
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-200/55">
          Attack / Defense
        </p>
        <div className="mt-5 grid gap-3">
          <div className="rounded-2xl bg-emerald-400/[0.06] p-4 ring-1 ring-emerald-300/10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-white/50">
                  <StatLabel label="Goals For" />
                </p>
                <p className="mt-2 text-[clamp(2.6rem,11vw,3rem)] font-black tracking-[-0.07em] text-emerald-300">
                  {goalsFor}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-200/70">
                  Attack
                </p>
                <p className="mt-2 text-sm font-semibold text-white/45">{goalsPerMatch}/match</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-red-400/[0.055] p-4 ring-1 ring-red-300/10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-white/50">
                  <StatLabel label="Goals Against" />
                </p>
                <p className="mt-2 text-[clamp(2.6rem,11vw,3rem)] font-black tracking-[-0.07em] text-red-300">
                  {goalsAgainst}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-red-200/70">
                  Defense
                </p>
                <p className="mt-2 text-sm font-semibold text-white/45">{concededPerMatch}/match</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className={tileClassName}>
              <p className="text-xs text-white/45">
                <StatLabel label="Goal Difference" iconClassName="h-3.5 w-3.5" />
              </p>
              <p className={`mt-2 text-3xl font-black tracking-[-0.06em] ${goalDifferenceTone}`}>
                {formattedGoalDifference}
              </p>
            </div>
            <div className={tileClassName}>
              <p className="text-xs text-white/45">
                <StatLabel label="Clean Sheets" iconClassName="h-3.5 w-3.5" />
              </p>
              <p className={`mt-2 text-3xl font-black tracking-[-0.06em] ${cleanSheetTone}`}>
                {cleanSheets}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-emerald-200/50">
                {cleanSheetRate}% rate
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={panelClassName}>
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-200/55">
          Team Strength
        </p>
        <div className="mt-5 space-y-4">
          {strengthMeters.map((meter) => (
            <div key={meter.label} className="group relative">
              <div className="flex items-center justify-between text-sm">
                <p className="font-semibold text-white/68">{meter.label}</p>
                <p className={`font-black ${teamStrengthTextClassName(meter.value)}`}>
                  {meter.value}
                </p>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full ${teamStrengthBarClassName(meter.value)} ${teamStrengthGlowClassName(meter.value)}`}
                  style={{ width: `${meter.value}%` }}
                />
              </div>
              <div className="pointer-events-none absolute bottom-full left-0 z-20 mb-3 w-64 rounded-2xl border border-emerald-300/10 bg-black/95 px-4 py-3 text-xs text-white/75 opacity-0 shadow-[0_16px_40px_rgba(0,0,0,0.45)] transition group-hover:opacity-100">
                <p className="font-semibold text-white">{meter.label}</p>
                <div className="mt-2 space-y-1">
                  {meter.details.map((detail) => (
                    <p key={detail}>{detail}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-white/[0.07] pt-4">
          <p className="text-sm font-semibold text-white/55">Storyline</p>
          <p className="mt-3 text-sm leading-6 text-white/62">{overallStoryline}</p>
        </div>
      </div>
    </section>
  );
}
