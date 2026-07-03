"use client";

import { useMemo, useState } from "react";
import type {
  EaClubFormation,
  EaClubMatchPlayer,
  EaClubMatchStats,
  EaClubRecentMatch,
} from "../lib/ea";

type ClubRecentMatchStudioProps = {
  clubName: string;
  matches: EaClubRecentMatch[];
};

type Trend = {
  tone: "good" | "bad" | "neutral";
  title: string;
  detail: string;
};

const statRows: Array<{
  label: string;
  homeKey: keyof EaClubMatchStats;
  awayKey: keyof EaClubMatchStats;
  suffix?: string;
  lowerIsBetter?: boolean;
}> = [
  { label: "Goals", homeKey: "goals", awayKey: "goals" },
  { label: "Shots", homeKey: "shots", awayKey: "shots" },
  { label: "Shot Accuracy", homeKey: "shotAccuracy", awayKey: "shotAccuracy", suffix: "%" },
  { label: "Pass Accuracy", homeKey: "passAccuracy", awayKey: "passAccuracy", suffix: "%" },
  { label: "Passes", homeKey: "passesMade", awayKey: "passesMade" },
  { label: "Tackles Won", homeKey: "tacklesMade", awayKey: "tacklesMade" },
  { label: "Tackle Rate", homeKey: "tackleSuccessRate", awayKey: "tackleSuccessRate", suffix: "%" },
  { label: "Red Cards", homeKey: "redCards", awayKey: "redCards", lowerIsBetter: true },
  { label: "Avg Rating", homeKey: "averageRating", awayKey: "averageRating" },
];

function parseScore(score: string) {
  const [goalsFor, goalsAgainst] = score.split("-").map((value) => Number(value));

  return {
    goalsFor: Number.isFinite(goalsFor) ? goalsFor : 0,
    goalsAgainst: Number.isFinite(goalsAgainst) ? goalsAgainst : 0,
  };
}

function resultLabel(result: EaClubRecentMatch["result"]) {
  if (result === "W") return "Win";
  if (result === "D") return "Draw";
  return "Loss";
}

function resultClassName(result: EaClubRecentMatch["result"]) {
  if (result === "W") return "border-emerald-300/30 bg-emerald-400/12 text-emerald-200";
  if (result === "D") return "border-amber-300/30 bg-amber-400/12 text-amber-200";
  return "border-red-300/30 bg-red-400/12 text-red-200";
}

function formatValue(value: number, suffix = "") {
  if (!Number.isFinite(value)) return `0${suffix}`;

  return `${Number.isInteger(value) ? value : value.toFixed(1)}${suffix}`;
}

function playerSort(left: EaClubMatchPlayer, right: EaClubMatchPlayer) {
  return (
    right.rating - left.rating ||
    right.goals + right.assists - (left.goals + left.assists) ||
    right.goals - left.goals
  );
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "P";
}

function formationRows(players: EaClubMatchPlayer[], formation: EaClubFormation) {
  const groups = {
    forward: players.filter((player) => player.position.toLowerCase().includes("forward")),
    midfielder: players.filter((player) => player.position.toLowerCase().includes("mid")),
    defender: players.filter((player) => player.position.toLowerCase().includes("def")),
    goalkeeper: players.filter((player) => player.position.toLowerCase().includes("goal")),
  };
  const unknown = players.filter((player) => {
    const position = player.position.toLowerCase();
    return !position.includes("forward") && !position.includes("mid") && !position.includes("def") && !position.includes("goal");
  });

  if (players.length === 0) {
    return [];
  }

  return [
    groups.forward.length ? groups.forward : unknown,
    groups.midfielder,
    groups.defender,
    groups.goalkeeper,
  ].filter((row) => row.length > 0 || formation.label !== "Unavailable");
}

function getTrends(matches: EaClubRecentMatch[]): Trend[] {
  const lastTen = matches.slice(0, 10);
  const games = lastTen.length;

  if (games === 0) {
    return [
      {
        tone: "neutral",
        title: "No recent match sample",
        detail: "EA did not return recent club matches for this view.",
      },
    ];
  }

  const wins = lastTen.filter((match) => match.result === "W").length;
  const draws = lastTen.filter((match) => match.result === "D").length;
  const losses = lastTen.filter((match) => match.result === "L").length;
  const totals = lastTen.reduce(
    (sum, match) => {
      const score = parseScore(match.score);
      return {
        goalsFor: sum.goalsFor + score.goalsFor,
        goalsAgainst: sum.goalsAgainst + score.goalsAgainst,
        redCards: sum.redCards + match.stats.redCards,
      };
    },
    { goalsFor: 0, goalsAgainst: 0, redCards: 0 },
  );
  const trends: Trend[] = [
    {
      tone: wins / games >= 0.6 ? "good" : wins / games <= 0.3 ? "bad" : "neutral",
      title: `${wins}W - ${draws}D - ${losses}L in the last ${games}`,
      detail:
        wins / games >= 0.6
          ? "Recent results are trending positively."
          : wins / games <= 0.3
            ? "Recent results are dragging below target."
            : "Recent results are balanced without a clear streak.",
    },
  ];
  const goalsPerGame = totals.goalsFor / games;
  const concededPerGame = totals.goalsAgainst / games;

  if (goalsPerGame >= 2.5) {
    trends.push({
      tone: "good",
      title: "Attack is producing",
      detail: `${goalsPerGame.toFixed(1)} goals per match across the recent window.`,
    });
  } else if (goalsPerGame < 1.2) {
    trends.push({
      tone: "bad",
      title: "Scoring has cooled off",
      detail: `${goalsPerGame.toFixed(1)} goals per match leaves little margin for errors.`,
    });
  }

  if (concededPerGame <= 1) {
    trends.push({
      tone: "good",
      title: "Defensive control",
      detail: `${concededPerGame.toFixed(1)} conceded per match is keeping games manageable.`,
    });
  } else if (concededPerGame >= 2.2) {
    trends.push({
      tone: "bad",
      title: "Too many goals allowed",
      detail: `${concededPerGame.toFixed(1)} conceded per match is pressuring the attack.`,
    });
  }

  const playerMap = new Map<string, { name: string; apps: number; wins: number; losses: number; nonWins: number; rating: number; redCards: number; ga: number }>();

  for (const match of lastTen) {
    for (const player of match.players) {
      const current =
        playerMap.get(player.id) ??
        { name: player.name, apps: 0, wins: 0, losses: 0, nonWins: 0, rating: 0, redCards: 0, ga: 0 };

      current.apps += 1;
      current.wins += match.result === "W" ? 1 : 0;
      current.losses += match.result === "L" ? 1 : 0;
      current.nonWins += match.result === "W" ? 0 : 1;
      current.rating += player.rating;
      current.redCards += player.redCards;
      current.ga += player.goals + player.assists;
      playerMap.set(player.id, current);
    }
  }

  const players = Array.from(playerMap.values()).filter((player) => player.apps >= Math.min(3, games));
  const concern = players
    .map((player) => ({ ...player, averageRating: player.rating / player.apps }))
    .filter((player) => player.nonWins / player.apps >= 0.6 && (player.averageRating < 6.8 || player.redCards > 0))
    .sort((left, right) => right.nonWins / right.apps - left.nonWins / left.apps)[0];
  const lowWinPlayers = players
    .map((player) => ({
      ...player,
      averageRating: player.rating / player.apps,
      winRate: player.wins / player.apps,
    }))
    .filter((player) => player.apps >= Math.min(4, games) && player.winRate <= 0.4)
    .sort(
      (left, right) =>
        left.winRate - right.winRate ||
        right.losses - left.losses ||
        left.averageRating - right.averageRating,
    )
    .filter((player) => player.name !== concern?.name)
    .slice(0, 2);
  const standout = players
    .map((player) => ({ ...player, averageRating: player.rating / player.apps }))
    .filter((player) => player.averageRating >= 8 || player.ga >= 3)
    .sort((left, right) => right.averageRating - left.averageRating || right.ga - left.ga)[0];

  if (concern) {
    trends.push({
      tone: "bad",
      title: `${concern.name} is tied to low-result games`,
      detail: `${concern.nonWins}/${concern.apps} recent appearances were not wins, with a ${concern.averageRating.toFixed(1)} average rating.`,
    });
  }

  for (const player of lowWinPlayers) {
    trends.push({
      tone: "bad",
      title: `${player.name} has a low recent win rate`,
      detail: `${player.wins}/${player.apps} wins (${Math.round(player.winRate * 100)}%) with ${player.losses} loss${player.losses === 1 ? "" : "es"} in their recent appearances.`,
    });
  }

  if (standout) {
    trends.push({
      tone: "good",
      title: `${standout.name} is a positive trend`,
      detail: `${standout.averageRating.toFixed(1)} average rating with ${standout.ga} goal contributions in the recent sample.`,
    });
  }

  if (totals.redCards > 0) {
    trends.push({
      tone: "bad",
      title: "Discipline warning",
      detail: `${totals.redCards} red card${totals.redCards === 1 ? "" : "s"} in the last ${games} matches.`,
    });
  }

  return trends.slice(0, 8);
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function createMatchSvg(clubName: string, match: EaClubRecentMatch) {
  const topPlayers = match.players.slice().sort(playerSort).slice(0, 4);
  const scorerText = match.players
    .filter((player) => player.goals > 0)
    .sort((left, right) => right.goals - left.goals)
    .map((player) => `${player.name} (${player.goals})`)
    .join(", ") || "No scorer data";
  const assistText = match.players
    .filter((player) => player.assists > 0)
    .sort((left, right) => right.assists - left.assists)
    .map((player) => `${player.name} (${player.assists})`)
    .join(", ") || "No assist data";
  const rows = topPlayers
    .map((player, index) => `<text x="92" y="${690 + index * 34}" fill="#d7dee9" font-size="22">${escapeXml(player.name)}  ${player.rating.toFixed(1)} rating  ${player.goals}G ${player.assists}A</text>`)
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  <rect width="1080" height="1350" fill="#121820"/>
  <rect x="54" y="54" width="972" height="1242" rx="34" fill="#1d2633" stroke="#39506d" stroke-width="2"/>
  <text x="90" y="140" fill="#8da2bd" font-family="Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="8">RECENT MATCH REPORT</text>
  <text x="90" y="238" fill="#ffffff" font-family="Georgia, serif" font-size="56" font-weight="700">${escapeXml(clubName)}</text>
  <text x="90" y="304" fill="#9ba8ba" font-family="Arial, sans-serif" font-size="30">vs ${escapeXml(match.opponent)}</text>
  <text x="90" y="475" fill="#ffffff" font-family="Georgia, serif" font-size="132" font-weight="700">${match.goalsFor} - ${match.goalsAgainst}</text>
  <text x="92" y="530" fill="${match.result === "W" ? "#22c55e" : match.result === "D" ? "#f59e0b" : "#fb7185"}" font-family="Arial, sans-serif" font-size="30" font-weight="800">${resultLabel(match.result).toUpperCase()}</text>
  <line x1="90" y1="590" x2="990" y2="590" stroke="#39506d" stroke-width="2"/>
  <text x="90" y="640" fill="#8da2bd" font-family="Arial, sans-serif" font-size="22" font-weight="800" letter-spacing="5">KEY PLAYERS</text>
  ${rows}
  <text x="90" y="880" fill="#8da2bd" font-family="Arial, sans-serif" font-size="22" font-weight="800" letter-spacing="5">GOAL SCORERS</text>
  <text x="90" y="925" fill="#ffffff" font-family="Arial, sans-serif" font-size="24">${escapeXml(scorerText).slice(0, 92)}</text>
  <text x="90" y="1005" fill="#8da2bd" font-family="Arial, sans-serif" font-size="22" font-weight="800" letter-spacing="5">ASSISTS</text>
  <text x="90" y="1050" fill="#ffffff" font-family="Arial, sans-serif" font-size="24">${escapeXml(assistText).slice(0, 92)}</text>
  <text x="90" y="1190" fill="#8da2bd" font-family="Arial, sans-serif" font-size="22">Formation: ${escapeXml(match.formation.label)}  •  Match ID ${escapeXml(match.id)}</text>
</svg>`;
}

function downloadMatchImage(clubName: string, match: EaClubRecentMatch) {
  const svg = createMatchSvg(clubName, match);
  const image = new Image();
  const svgUrl = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));

  image.onload = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = 1080;
    canvas.height = 1350;
    context?.drawImage(image, 0, 0);
    URL.revokeObjectURL(svgUrl);
    canvas.toBlob((blob) => {
      if (!blob) return;

      const pngUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = pngUrl;
      link.download = `${clubName}-${match.opponent}-match-report.png`
        .toLowerCase()
        .replace(/[^a-z0-9.]+/g, "-");
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(pngUrl);
    }, "image/png");
  };

  image.onerror = () => URL.revokeObjectURL(svgUrl);
  image.src = svgUrl;
}

function StatCompareRow({
  label,
  home,
  away,
  suffix,
  lowerIsBetter,
}: {
  label: string;
  home: number;
  away: number;
  suffix?: string;
  lowerIsBetter?: boolean;
}) {
  const max = Math.max(home, away, 1);
  const homeWins = lowerIsBetter ? home < away : home > away;
  const awayWins = lowerIsBetter ? away < home : away > home;

  return (
    <div className="grid grid-cols-[4.25rem_1fr_7rem_1fr_4.25rem] items-center gap-3">
      <p className={`text-right text-sm font-bold tabular-nums ${homeWins ? "text-emerald-500" : "match-report-muted"}`}>
        {formatValue(home, suffix)}
      </p>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className="ml-auto h-full rounded-full bg-emerald-400" style={{ width: `${Math.max(4, (home / max) * 100)}%` }} />
      </div>
      <p className="match-report-subtle text-center text-[11px] font-black uppercase tracking-[0.18em]">{label}</p>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-sky-400" style={{ width: `${Math.max(4, (away / max) * 100)}%` }} />
      </div>
      <p className={`text-sm font-bold tabular-nums ${awayWins ? "text-sky-500" : "match-report-muted"}`}>
        {formatValue(away, suffix)}
      </p>
    </div>
  );
}

function FormationBoard({
  title,
  formation,
  players,
}: {
  title: string;
  formation: EaClubFormation;
  players: EaClubMatchPlayer[];
}) {
  const rows = formationRows(players, formation);

  return (
    <div className="match-report-field-card rounded-2xl border p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h4 className="font-bold">{title}</h4>
        <span className="rounded-full bg-black/35 px-3 py-1 text-xs font-black text-emerald-200">
          {formation.label}
        </span>
      </div>

      <div className="relative min-h-[17rem] overflow-hidden rounded-xl border border-white/10 bg-[linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(180deg,#0b8f3b,#087031)] bg-[size:33.333%_100%,100%_33.333%,100%_100%] p-4">
        {rows.length === 0 ? (
          <div className="flex h-[15rem] items-center justify-center text-center text-sm font-semibold text-white/62">
            EA did not return lineup data for this match.
          </div>
        ) : (
          <div className="flex h-[15rem] flex-col justify-between">
            {rows.map((row, rowIndex) => (
              <div key={`${title}-${rowIndex}`} className="flex justify-center gap-3">
                {row.slice(0, 5).map((player) => (
                  <div key={player.id} className="flex w-16 flex-col items-center gap-1">
                    <div className="grid h-9 w-9 place-items-center rounded-full border border-white/70 bg-purple-700 text-[10px] font-black text-white shadow-lg">
                      {getInitials(player.name)}
                    </div>
                    <p className="max-w-16 truncate rounded bg-black/55 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                      {player.name}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ClubRecentMatchStudio({
  clubName,
  matches,
}: ClubRecentMatchStudioProps) {
  const recentMatches = matches.slice(0, 10);
  const [selectedMatchId, setSelectedMatchId] = useState(recentMatches[0]?.id ?? "");
  const selectedMatch =
    recentMatches.find((match) => match.id === selectedMatchId) ?? recentMatches[0];
  const trends = useMemo(() => getTrends(recentMatches), [recentMatches]);
  const topPlayers = selectedMatch?.players.slice().sort(playerSort).slice(0, 8) ?? [];
  const scorers = selectedMatch?.players.filter((player) => player.goals > 0).sort((a, b) => b.goals - a.goals) ?? [];
  const assisters = selectedMatch?.players.filter((player) => player.assists > 0).sort((a, b) => b.assists - a.assists) ?? [];

  return (
    <section className="match-report-studio rounded-[1.25rem] border p-4 shadow-[0_18px_44px_rgba(0,0,0,0.16)] sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-emerald-500/75">
            Last 10 Club Matches
          </p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Match Report Studio</h2>
          <p className="match-report-muted mt-2 max-w-3xl text-sm leading-6">
            Review the last 10 live EA matches, export a match image, and scan result trends, box scores, player impact, and formations.
          </p>
        </div>

        {selectedMatch ? (
          <button
            type="button"
            onClick={() => downloadMatchImage(clubName, selectedMatch)}
            className="app-button-primary min-w-[11rem]"
          >
            Download PNG
          </button>
        ) : null}
      </div>

      {recentMatches.length === 0 || !selectedMatch ? (
        <div className="match-report-panel match-report-muted mt-6 rounded-2xl border border-dashed p-8 text-center">
          EA did not return recent club matches for this club.
        </div>
      ) : (
        <>
          <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
            {recentMatches.map((match) => (
              <button
                key={match.id}
                type="button"
                onClick={() => setSelectedMatchId(match.id)}
                className={`min-w-[10rem] rounded-xl border px-3 py-2 text-left transition ${
                  selectedMatch.id === match.id
                    ? "border-emerald-400/50 bg-emerald-400/12"
                    : "match-report-card hover:border-emerald-400/30"
                }`}
              >
                <p className="match-report-subtle text-xs font-black uppercase tracking-[0.16em]">
                  {resultLabel(match.result)}
                </p>
                <p className="mt-1 truncate text-sm font-bold">
                  {match.score} vs {match.opponent}
                </p>
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1.05fr]">
            <div className="match-report-card rounded-2xl border p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="match-report-subtle text-xs font-black uppercase tracking-[0.22em]">
                    Share Card
                  </p>
                  <h3 className="mt-3 text-2xl font-black">{clubName}</h3>
                </div>
                <span className={`rounded-full border px-3 py-1 text-sm font-black ${resultClassName(selectedMatch.result)}`}>
                  {resultLabel(selectedMatch.result)}
                </span>
              </div>

              <div className="my-8 text-center">
                <p className="match-report-subtle text-sm font-bold uppercase tracking-[0.18em]">
                  vs {selectedMatch.opponent}
                </p>
                <p className="mt-4 text-6xl font-black tracking-tight">
                  {selectedMatch.goalsFor} - {selectedMatch.goalsAgainst}
                </p>
              </div>

              <div className="match-report-divider space-y-4 border-t pt-5">
                <div>
                  <p className="match-report-subtle text-xs font-black uppercase tracking-[0.18em]">
                    Goal Scorers
                  </p>
                  <p className="match-report-muted mt-2 text-sm">
                    {scorers.length > 0
                      ? scorers.map((player) => `${player.name} (${player.goals})`).join(", ")
                      : "No scorer data from EA"}
                  </p>
                </div>
                <div>
                  <p className="match-report-subtle text-xs font-black uppercase tracking-[0.18em]">
                    Assists
                  </p>
                  <p className="match-report-muted mt-2 text-sm">
                    {assisters.length > 0
                      ? assisters.map((player) => `${player.name} (${player.assists})`).join(", ")
                      : "No assist data from EA"}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              {trends.map((trend) => (
                <div
                  key={`${trend.title}-${trend.detail}`}
                  className={`rounded-2xl border p-4 ${
                    trend.tone === "good"
                      ? "border-emerald-300/16 bg-emerald-300/[0.06]"
                      : trend.tone === "bad"
                        ? "border-red-300/16 bg-red-400/[0.06]"
                        : "match-report-card"
                  }`}
                >
                  <p className="font-bold">{trend.title}</p>
                  <p className="match-report-muted mt-1 text-sm leading-6">{trend.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="match-report-panel mt-6 rounded-2xl border p-4">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="text-xl font-bold">Box Score</h3>
              <p className="match-report-muted text-sm font-semibold">
                {clubName} vs {selectedMatch.opponent}
              </p>
            </div>
            <div className="space-y-4">
              {statRows.map((row) => (
                <StatCompareRow
                  key={row.label}
                  label={row.label}
                  home={Number(selectedMatch.stats[row.homeKey])}
                  away={Number(selectedMatch.opponentStats[row.awayKey])}
                  suffix={row.suffix}
                  lowerIsBetter={row.lowerIsBetter}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-2">
            <FormationBoard
              title={clubName}
              formation={selectedMatch.formation}
              players={selectedMatch.players}
            />
            <FormationBoard
              title={selectedMatch.opponent}
              formation={selectedMatch.opponentFormation}
              players={selectedMatch.opponentPlayers}
            />
          </div>

          <div className="match-report-panel mt-6 rounded-2xl border p-4">
            <h3 className="text-xl font-bold">Player Box Score</h3>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="match-report-subtle text-left text-xs uppercase tracking-[0.16em]">
                  <tr>
                    <th className="py-3 pr-4">Player</th>
                    <th className="px-3 py-3">Pos</th>
                    <th className="px-3 py-3 text-right">Rating</th>
                    <th className="px-3 py-3 text-right">G</th>
                    <th className="px-3 py-3 text-right">A</th>
                    <th className="px-3 py-3 text-right">Shots</th>
                    <th className="px-3 py-3 text-right">Pass %</th>
                    <th className="px-3 py-3 text-right">Tackle %</th>
                  </tr>
                </thead>
                <tbody>
                  {topPlayers.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="match-report-muted py-6 text-center">
                        EA did not return player-level box-score data for this match.
                      </td>
                    </tr>
                  ) : (
                    topPlayers.map((player) => (
                      <tr key={player.id} className="match-report-divider border-t">
                        <td className="py-3 pr-4 font-semibold">{player.name}</td>
                        <td className="match-report-muted px-3 py-3">{player.position}</td>
                        <td className="px-3 py-3 text-right font-bold tabular-nums">{player.rating.toFixed(1)}</td>
                        <td className="px-3 py-3 text-right tabular-nums text-emerald-300">{player.goals}</td>
                        <td className="px-3 py-3 text-right tabular-nums text-sky-300">{player.assists}</td>
                        <td className="px-3 py-3 text-right tabular-nums">{player.shots}</td>
                        <td className="px-3 py-3 text-right tabular-nums">{player.passAccuracy}%</td>
                        <td className="px-3 py-3 text-right tabular-nums">{player.tackleSuccessRate}%</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
