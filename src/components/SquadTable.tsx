"use client";

import Link from "next/link";
import { useState } from "react";
import { ratingBadgeClassName } from "../lib/colorCoding";
import { capitalizeWords } from "../lib/format";

type SquadPlayer = {
  id: string;
  name: string;
  position: string;
  overall: number;
  matches: number;
  goals: number;
  assists: number;
  rating: number;
  winRate: number;
  redCards: number;
  tackles: number;
  tackleSuccessRate: number;
  passesMade: number;
  passAttempts: number;
  passAccuracy: number;
  manOfTheMatch: number;
  manOfTheMatchRate: number;
};

type SquadTableProps = {
  players: SquadPlayer[];
  clubId: string;
  platform: string;
};

type StatMode = "overall" | "perMatch";
type SortKey =
  | "name"
  | "position"
  | "overall"
  | "matches"
  | "goals"
  | "assists"
  | "contributions"
  | "rating"
  | "winRate"
  | "tackles"
  | "passesMade"
  | "passAccuracy"
  | "manOfTheMatch";
type SortDirection = "asc" | "desc";

function perMatch(value: number, matches: number) {
  if (matches <= 0) {
    return 0;
  }

  return value / matches;
}

function formatNumber(value: number, digits = 0) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function sortArrow(isActive: boolean, direction: SortDirection) {
  if (!isActive) {
    return "  ";
  }

  return direction === "desc" ? "v" : "^";
}

export default function SquadTable({ players, clubId, platform }: SquadTableProps) {
  const [statMode, setStatMode] = useState<StatMode>("overall");
  const [sortKey, setSortKey] = useState<SortKey>("matches");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const hasUsablePlayers = players.some(
    (player) => player.name !== "Unknown" || player.matches > 0,
  );

  const sortablePlayers = [...players].sort((left, right) => {
    const getValue = (player: SquadPlayer) => {
      const contributions = player.goals + player.assists;

      switch (sortKey) {
        case "name":
          return player.name.toLowerCase();
        case "position":
          return player.position.toLowerCase();
        case "overall":
          return player.overall;
        case "matches":
          return player.matches;
        case "goals":
          return statMode === "perMatch"
            ? perMatch(player.goals, player.matches)
            : player.goals;
        case "assists":
          return statMode === "perMatch"
            ? perMatch(player.assists, player.matches)
            : player.assists;
        case "contributions":
          return statMode === "perMatch"
            ? perMatch(contributions, player.matches)
            : contributions;
        case "rating":
          return player.rating;
        case "winRate":
          return player.winRate;
        case "tackles":
          return statMode === "perMatch"
            ? perMatch(player.tackles, player.matches)
            : player.tackles;
        case "passesMade":
          return statMode === "perMatch"
            ? perMatch(player.passesMade, player.matches)
            : player.passesMade;
        case "passAccuracy":
          return player.passAccuracy;
        case "manOfTheMatch":
          return statMode === "perMatch"
            ? player.manOfTheMatchRate
            : player.manOfTheMatch;
      }
    };

    const leftValue = getValue(left);
    const rightValue = getValue(right);

    if (typeof leftValue === "string" && typeof rightValue === "string") {
      const comparison = leftValue.localeCompare(rightValue);

      return sortDirection === "asc" ? comparison : -comparison;
    }

    const comparison = Number(leftValue) - Number(rightValue);

    if (comparison !== 0) {
      return sortDirection === "asc" ? comparison : -comparison;
    }

    return right.matches - left.matches || right.rating - left.rating;
  });

  const sortConfigLabel = {
    name: "Player",
    position: "Position",
    overall: "OVR",
    matches: "Appearances",
    goals: statMode === "overall" ? "Goals" : "Goals / Match",
    assists: statMode === "overall" ? "Assists" : "Assists / Match",
    contributions: statMode === "overall" ? "G+A" : "G+A / Match",
    rating: "Rating",
    winRate: "Win Rate",
    tackles: statMode === "overall" ? "Tackles" : "Tackles / Match",
    passesMade: statMode === "overall" ? "Passes" : "Passes / Match",
    passAccuracy: "Pass Accuracy",
    manOfTheMatch: statMode === "overall" ? "MOTM" : "MOTM Rate",
  } satisfies Record<SortKey, string>;

  function handleSort(nextKey: SortKey) {
    if (sortKey === nextKey) {
      setSortDirection((current) => (current === "desc" ? "asc" : "desc"));
      return;
    }

    setSortKey(nextKey);
    setSortDirection(nextKey === "name" || nextKey === "position" ? "asc" : "desc");
  }

  function HeaderButton({
    columnKey,
    label,
    align = "left",
  }: {
    columnKey: SortKey;
    label: string;
    align?: "left" | "right";
  }) {
    const isActive = sortKey === columnKey;

    return (
      <button
        type="button"
        onClick={() => handleSort(columnKey)}
        className={`inline-flex w-full items-center gap-2 font-semibold transition ${
          align === "right" ? "justify-end" : "justify-start"
        } ${isActive ? "text-emerald-100" : "text-white/45 hover:text-white/80"}`}
      >
        <span>{label}</span>
        <span className="w-3 text-center text-[10px] uppercase text-white/35">
          {sortArrow(isActive, sortDirection)}
        </span>
      </button>
    );
  }

  return (
    <section className="min-w-0 rounded-[1.35rem] border border-emerald-400/10 bg-[#07100c]/80 p-4 shadow-[0_22px_45px_rgba(0,0,0,0.2)] ring-1 ring-white/[0.03] sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
            Squad Overview
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-white">
            Squad Stats
          </h2>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          <div className="inline-flex w-fit rounded-full border border-emerald-300/15 bg-black/35 p-1">
            {[
              { label: "Overall Totals", value: "overall" as const },
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

          <p className="text-sm text-white/50">
            {hasUsablePlayers
              ? `Sorted by ${sortConfigLabel[sortKey]} (${sortDirection === "desc" ? "highest first" : "lowest first"}).`
              : "No squad member data is available from the live EA response yet."}
          </p>
        </div>
      </div>

      {!hasUsablePlayers ? (
        <div className="mt-6 rounded-[1.5rem] border border-dashed border-white/12 bg-black/20 px-6 py-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl text-white/70">
            +
          </div>
          <p className="mt-4 text-lg font-semibold text-white">Squad stats are warming up</p>
          <p className="mt-2 text-sm text-white/55">
            EA returned the club profile, but not a usable squad listing for this
            team on the selected platform yet.
          </p>
          <p className="mt-2 text-sm text-white/40">
            Player rows should appear once the live member feed returns match data.
          </p>
        </div>
      ) : null}

      <div className="mt-6 overflow-x-auto overscroll-x-contain">
        <table className="w-full min-w-[1250px] text-left text-sm">
          <thead className="text-white/45">
            <tr className="border-b border-white/10">
              <th className="pb-4">
                <HeaderButton columnKey="name" label="Player" />
              </th>
              <th className="pb-4">
                <HeaderButton columnKey="position" label="POS" />
              </th>
              <th className="pb-4 text-right">
                <HeaderButton columnKey="overall" label="OVR" align="right" />
              </th>
              <th className="pb-4 text-right">
                <HeaderButton columnKey="matches" label="Apps" align="right" />
              </th>
              <th className="pb-4 text-right">
                <HeaderButton
                  columnKey="goals"
                  label={statMode === "overall" ? "Goals" : "G/Match"}
                  align="right"
                />
              </th>
              <th className="pb-4 text-right">
                <HeaderButton
                  columnKey="assists"
                  label={statMode === "overall" ? "Assists" : "A/Match"}
                  align="right"
                />
              </th>
              <th className="pb-4 text-right">
                <HeaderButton
                  columnKey="contributions"
                  label={statMode === "overall" ? "G+A" : "G+A/Match"}
                  align="right"
                />
              </th>
              <th className="pb-4 text-right">
                <HeaderButton columnKey="rating" label="Rating" align="right" />
              </th>
              <th className="pb-4 text-right">
                <HeaderButton columnKey="winRate" label="Win %" align="right" />
              </th>
              <th className="pb-4 text-right">
                <HeaderButton
                  columnKey="tackles"
                  label={statMode === "overall" ? "Tackles" : "Tkl/Match"}
                  align="right"
                />
              </th>
              <th className="pb-4 text-right">
                <HeaderButton
                  columnKey="passesMade"
                  label={statMode === "overall" ? "Passes" : "Pass/Match"}
                  align="right"
                />
              </th>
              <th className="pb-4 text-right">
                <HeaderButton columnKey="passAccuracy" label="Pass %" align="right" />
              </th>
              <th className="pb-4 text-right">
                <HeaderButton
                  columnKey="manOfTheMatch"
                  label={statMode === "overall" ? "MOTM" : "MOTM %"}
                  align="right"
                />
              </th>
            </tr>
          </thead>

          <tbody>
            {sortablePlayers.map((player) => {
              const playerHref = `/player/${encodeURIComponent(player.id)}?clubId=${encodeURIComponent(
                clubId,
              )}&platform=${encodeURIComponent(platform)}`;
              const contributions = player.goals + player.assists;
              const goalsValue =
                statMode === "overall"
                  ? formatNumber(player.goals)
                  : formatNumber(perMatch(player.goals, player.matches), 2);
              const assistsValue =
                statMode === "overall"
                  ? formatNumber(player.assists)
                  : formatNumber(perMatch(player.assists, player.matches), 2);
              const contributionsValue =
                statMode === "overall"
                  ? formatNumber(contributions)
                  : formatNumber(perMatch(contributions, player.matches), 2);
              const tacklesValue =
                statMode === "overall"
                  ? formatNumber(player.tackles)
                  : formatNumber(perMatch(player.tackles, player.matches), 2);
              const passesValue =
                statMode === "overall"
                  ? formatNumber(player.passesMade)
                  : formatNumber(perMatch(player.passesMade, player.matches), 2);
              const motmValue =
                statMode === "overall"
                  ? formatNumber(player.manOfTheMatch)
                  : `${formatNumber(player.manOfTheMatchRate)}%`;

              return (
                <tr
                  key={player.id}
                  className="border-b border-white/8 text-white transition hover:bg-white/[0.03]"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.45),_rgba(255,255,255,0.02))] text-xs font-black uppercase text-white/85">
                        {player.name.slice(0, 2)}
                      </div>
                      <Link
                        href={playerHref}
                        className="font-semibold transition hover:text-blue-300"
                      >
                        {player.name}
                      </Link>
                    </div>
                  </td>
                  <td className="py-4 text-white/55">{capitalizeWords(player.position)}</td>
                  <td className="py-4 text-right font-semibold text-blue-200">
                    {player.overall > 0 ? player.overall : "--"}
                  </td>
                  <td className="py-4 text-right">{formatNumber(player.matches)}</td>
                  <td className="py-4 text-right">{goalsValue}</td>
                  <td className="py-4 text-right">{assistsValue}</td>
                  <td className="py-4 text-right font-semibold text-emerald-200">
                    {contributionsValue}
                  </td>
                  <td className="py-4 text-right">
                    <span
                      className={`inline-flex min-w-16 items-center justify-center rounded-full border px-2.5 py-1 font-bold ${ratingBadgeClassName(player.rating)}`}
                    >
                      {player.rating > 0 ? player.rating.toFixed(1) : "--"}
                    </span>
                  </td>
                  <td className="py-4 text-right">{formatNumber(player.winRate)}%</td>
                  <td className="py-4 text-right">{tacklesValue}</td>
                  <td className="py-4 text-right">{passesValue}</td>
                  <td className="py-4 text-right">{formatNumber(player.passAccuracy)}%</td>
                  <td className="py-4 text-right">{motmValue}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {hasUsablePlayers ? (
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-white/40">
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
            Totals view shows raw production and usage.
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
            Per-match view normalizes scoring, creation, tackles, passing, and MOTM impact.
          </span>
        </div>
      ) : null}
    </section>
  );
}
