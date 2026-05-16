"use client";

import Link from "next/link";
import { useState } from "react";
import { ratingBadgeClassName } from "../lib/colorCoding";
import { capitalizeWords } from "../lib/format";

type SquadPlayer = {
  id: string;
  name: string;
  position: string;
  nationality: string | null;
  overall: number;
  matches: number;
  goals: number;
  assists: number;
  shotSuccessRate: number;
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
  | "manOfTheMatch"
  | "winRate"
  | "shotSuccessRate"
  | "passing"
  | "tackles"
  | "tackleSuccessRate";
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
    return "";
  }

  return direction === "desc" ? "v" : "^";
}

function getNationalityFlag(nationality: string | null) {
  if (!nationality) {
    return null;
  }

  const [flag] = nationality.split(" ");

  return flag || null;
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
        case "manOfTheMatch":
          return statMode === "perMatch"
            ? player.manOfTheMatchRate
            : player.manOfTheMatch;
        case "winRate":
          return player.winRate;
        case "shotSuccessRate":
          return player.shotSuccessRate;
        case "passing":
          return statMode === "perMatch"
            ? perMatch(player.passesMade, player.matches)
            : player.passAccuracy;
        case "tackles":
          return statMode === "perMatch"
            ? perMatch(player.tackles, player.matches)
            : player.tackles;
        case "tackleSuccessRate":
          return player.tackleSuccessRate;
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
    manOfTheMatch: statMode === "overall" ? "MOTM" : "MOTM %",
    winRate: "Win Rate",
    shotSuccessRate: "Shot Success",
    passing: statMode === "overall" ? "Pass Accuracy" : "Passes / Match",
    tackles: statMode === "perMatch" ? "Tackles / Match" : "Tackles",
    tackleSuccessRate: "Tackle Success",
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
    align?: "left" | "center" | "right";
  }) {
    const isActive = sortKey === columnKey;

    return (
      <button
        type="button"
        onClick={() => handleSort(columnKey)}
        className={`flex w-full items-center font-semibold transition ${
          align === "right"
            ? "justify-end"
            : align === "center"
              ? "justify-center"
              : "justify-start"
        } ${isActive ? "text-emerald-100" : "text-white/45 hover:text-white/80"}`}
      >
        <span>{label}</span>
        {isActive ? (
          <span className="pointer-events-none ml-1.5 text-[10px] uppercase text-white/35">
            {sortArrow(true, sortDirection)}
          </span>
        ) : null}
      </button>
    );
  }

  return (
    <section className="club-profile-panel squad-table-panel min-w-0 rounded-[1.35rem] border border-emerald-400/10 bg-[#07100c]/80 p-4 shadow-[0_22px_45px_rgba(0,0,0,0.2)] ring-1 ring-white/[0.03] sm:p-6">
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
          <div className="club-segmented-control inline-flex w-fit rounded-full border border-emerald-300/15 bg-black/35 p-1">
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
        <div className="club-profile-tile mt-6 rounded-[1.5rem] border border-dashed border-white/12 bg-black/20 px-6 py-10 text-center">
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

      <div className="squad-table-scroll mt-6 overflow-x-auto overscroll-x-contain">
        <table className="w-full min-w-[1160px] table-fixed text-left text-sm">
          <colgroup>
            <col className="w-[18rem]" />
            <col className="w-[8rem]" />
            <col className="w-[5rem]" />
            <col className="w-[6rem]" />
            <col className="w-[6.5rem]" />
            <col className="w-[7rem]" />
            <col className="w-[6rem]" />
            <col className="w-[7rem]" />
            <col className="w-[6rem]" />
            <col className="w-[6rem]" />
            <col className="w-[6rem]" />
            <col className="w-[6rem]" />
            <col className="w-[6rem]" />
          </colgroup>
          <thead className="text-white/45">
            <tr className="border-b border-white/10">
              <th className="pb-4">
                <HeaderButton columnKey="name" label="Player" />
              </th>
              <th className="pb-4">
                <HeaderButton columnKey="position" label="POS" />
              </th>
              <th className="pb-4 pr-2 text-right">
                <HeaderButton columnKey="overall" label="OVR" align="right" />
              </th>
              <th className="pb-4 pr-2 text-right">
                <HeaderButton columnKey="matches" label="Apps" align="right" />
              </th>
              <th className="pb-4 pr-2 text-right">
                <HeaderButton
                  columnKey="goals"
                  label={statMode === "overall" ? "Goals" : "G/Match"}
                  align="right"
                />
              </th>
              <th className="pb-4 pr-2 text-right">
                <HeaderButton
                  columnKey="assists"
                  label={statMode === "overall" ? "Assists" : "A/Match"}
                  align="right"
                />
              </th>
              <th className="pb-4 pr-2 text-right">
                <HeaderButton
                  columnKey="contributions"
                  label={statMode === "overall" ? "G+A" : "G+A/Match"}
                  align="right"
                />
              </th>
              <th className="pb-4 pr-2 text-right">
                <HeaderButton columnKey="rating" label="Rating" align="right" />
              </th>
              <th className="pb-4 pr-2 text-right">
                <HeaderButton
                  columnKey="manOfTheMatch"
                  label={statMode === "overall" ? "MOTM" : "MOTM %"}
                  align="right"
                />
              </th>
              <th className="pb-4 pr-2 text-right">
                <HeaderButton columnKey="winRate" label="Win %" align="right" />
              </th>
              <th className="pb-4 pr-2 text-right">
                <HeaderButton
                  columnKey="shotSuccessRate"
                  label="Shot %"
                  align="right"
                />
              </th>
              <th className="pb-4 pr-2 text-right">
                <HeaderButton
                  columnKey="passing"
                  label={statMode === "overall" ? "Pass %" : "Pass/Match"}
                  align="right"
                />
              </th>
              <th className="pb-4 pr-2 text-right">
                <HeaderButton
                  columnKey={statMode === "overall" ? "tackleSuccessRate" : "tackles"}
                  label={statMode === "overall" ? "Tackle %" : "Tkl/Match"}
                  align="right"
                />
              </th>
            </tr>
          </thead>

          <tbody>
            {sortablePlayers.map((player) => {
              const nationalityFlag = getNationalityFlag(player.nationality);
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
                  ? `${formatNumber(player.tackleSuccessRate)}%`
                  : formatNumber(perMatch(player.tackles, player.matches), 2);
              const passesValue =
                statMode === "overall"
                  ? `${formatNumber(player.passAccuracy)}%`
                  : formatNumber(perMatch(player.passesMade, player.matches), 2);
              const motmValue =
                statMode === "overall"
                  ? formatNumber(player.manOfTheMatch)
                  : `${formatNumber(player.manOfTheMatchRate)}%`;

              return (
                <tr
                  key={player.id}
                  className="squad-table-row border-b border-white/8 text-white transition hover:bg-white/[0.03]"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="squad-avatar flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.45),_rgba(255,255,255,0.02))] text-xs font-black uppercase text-white/85">
                        {player.name.slice(0, 2)}
                      </div>
                      <div className="grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)_2.75rem] items-center gap-3">
                        <Link
                          href={playerHref}
                          className="truncate font-semibold transition hover:text-emerald-300"
                        >
                          {player.name}
                        </Link>
                        <span
                          className="text-right text-lg leading-none text-white/70"
                          aria-label={player.nationality ?? "Nationality unavailable"}
                          title={player.nationality ?? "Nationality unavailable"}
                        >
                          {nationalityFlag ?? "--"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-white/55">
                    <span className="inline-block pl-1">{capitalizeWords(player.position)}</span>
                  </td>
                  <td className="py-4 pr-2 text-right font-semibold tabular-nums text-blue-200">
                    {player.overall > 0 ? player.overall : "--"}
                  </td>
                  <td className="py-4 pr-2 text-right tabular-nums">{formatNumber(player.matches)}</td>
                  <td className="py-4 pr-2 text-right tabular-nums">{goalsValue}</td>
                  <td className="py-4 pr-2 text-right tabular-nums">{assistsValue}</td>
                  <td className="py-4 pr-2 text-right font-semibold tabular-nums text-emerald-200">
                    {contributionsValue}
                  </td>
                  <td className="py-4 pr-2 text-right">
                    <span
                      className={`inline-flex min-w-16 items-center justify-center rounded-full border px-2.5 py-1 font-bold ${ratingBadgeClassName(player.rating)}`}
                    >
                      {player.rating > 0 ? player.rating.toFixed(1) : "--"}
                    </span>
                  </td>
                  <td className="py-4 pr-2 text-right tabular-nums">{motmValue}</td>
                  <td className="py-4 pr-2 text-right tabular-nums">{formatNumber(player.winRate)}%</td>
                  <td className="py-4 pr-2 text-right tabular-nums">{formatNumber(player.shotSuccessRate)}%</td>
                  <td className="py-4 pr-2 text-right tabular-nums">{passesValue}</td>
                  <td className="py-4 pr-2 text-right tabular-nums">{tacklesValue}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {hasUsablePlayers ? (
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-white/40">
          <span className="club-profile-tile rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
            Totals view shows raw production and usage.
          </span>
          <span className="club-profile-tile rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
            Per-match view normalizes scoring, creation, passing volume, tackles, and MOTM impact.
          </span>
        </div>
      ) : null}
    </section>
  );
}
