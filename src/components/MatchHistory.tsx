"use client";

import { useEffect, useState } from "react";
import { StatLabel } from "./StatIcon";

type Match = {
  id: string;
  opponent: string;
  result: string;
  score: string;
  rating: number;
  goals: number;
  assists: number;
  shots: number;
  shotSuccessRate: number;
  tackles: number;
  tackleAttempts: number;
  tacklesMade: number;
  tackleSuccessRate: number;
  passesMade: number;
  passAttempts: number;
  passAccuracy: number;
  manOfTheMatch: boolean;
  redCards: number;
};

type MatchHistoryProps = {
  matches: Match[];
  matchWindow?: number;
};

function ratingClassName(value: number) {
  if (value < 6) return "text-red-400";
  if (value < 8) return "text-yellow-300";
  return "text-green-400";
}

function formatRating(value: number) {
  return value.toFixed(1);
}

function statusMark(value: boolean) {
  return value ? "✅" : "❌";
}

function statTileClassName(emphasis = false) {
  return `rounded-xl border px-3 py-3 ${
    emphasis
      ? "border-emerald-300/15 bg-emerald-300/[0.06]"
      : "border-white/8 bg-white/[0.035]"
  }`;
}

export default function MatchHistory({
  matches,
  matchWindow = 10,
}: MatchHistoryProps) {
  const [openMatchId, setOpenMatchId] = useState<string | null>(null);

  useEffect(() => {
    const syncOpenMatchFromHash = () => {
      const hash = window.location.hash;

      if (!hash.startsWith("#recent-match-")) {
        return;
      }

      const matchId = decodeURIComponent(hash.replace("#recent-match-", ""));

      if (matches.some((match) => match.id === matchId)) {
        setOpenMatchId(matchId);
      }
    };

    syncOpenMatchFromHash();
    window.addEventListener("hashchange", syncOpenMatchFromHash);

    return () => {
      window.removeEventListener("hashchange", syncOpenMatchFromHash);
    };
  }, [matches]);

  return (
    <section
      id="recent-matches"
      className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white"
    >
      <h2 className="mb-6 text-2xl font-bold">Recent Matches</h2>

      {matches.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-black/40 p-8 text-center">
          <p className="text-base font-semibold text-white/80">
            No appearances in the latest match window
          </p>
          <p className="mt-2 text-sm text-gray-400">
            This player was not featured in the club's last {matchWindow} matches.
          </p>
        </div>
      ) : null}

      <div className="space-y-3">
        {matches.map((match) => {
          const isOpen = openMatchId === match.id;
          const goalContributions = match.goals + match.assists;
          const gotRedCard = match.redCards > 0;

          const resultColor =
            match.result === "W"
              ? "bg-green-600"
              : match.result === "D"
              ? "bg-yellow-500"
              : "bg-red-600";

          return (
            <button
              key={match.id}
              id={`recent-match-${match.id}`}
              onClick={() => setOpenMatchId(isOpen ? null : match.id)}
              className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-left transition hover:bg-white/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{match.opponent}</p>
                  <p className="text-sm text-gray-400">Score: {match.score}</p>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`${resultColor} rounded-lg px-3 py-1 text-sm font-bold`}
                  >
                    {match.result}
                  </span>

                  <p className={`font-bold ${ratingClassName(match.rating)}`}>
                    {formatRating(match.rating)}
                  </p>
                </div>
              </div>

              {isOpen && (
                <div className="mt-5 space-y-3 border-t border-white/10 pt-4">
                  <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 xl:grid-cols-8">
                    <div className={statTileClassName(true)}>
                      <p className="text-xs text-gray-500">
                        <StatLabel label="Goals" />
                      </p>
                      <p className="mt-2 font-bold">{match.goals}</p>
                    </div>

                    <div className={statTileClassName(true)}>
                      <p className="text-xs text-gray-500">
                        <StatLabel label="Assists" />
                      </p>
                      <p className="mt-2 font-bold">{match.assists}</p>
                    </div>

                    <div className={statTileClassName(true)}>
                      <p className="text-xs text-gray-500">
                        <StatLabel label="G/A" />
                      </p>
                      <p className="mt-2 font-bold">{goalContributions}</p>
                    </div>

                    <div className={statTileClassName()}>
                      <p className="text-xs text-gray-500">
                        <StatLabel label="MOTM" />
                      </p>
                      <p className="mt-2 text-lg">{statusMark(match.manOfTheMatch)}</p>
                    </div>

                    <div className={statTileClassName()}>
                      <p className="text-xs text-gray-500">
                        <StatLabel label="Red Card" />
                      </p>
                      <p className="mt-2 text-lg">{statusMark(gotRedCard)}</p>
                    </div>

                    <div className={statTileClassName()}>
                      <p className="text-xs text-gray-500">
                        <StatLabel label="Shot %" />
                      </p>
                      <p className="mt-2 font-bold">{match.shotSuccessRate}%</p>
                    </div>

                    <div className={statTileClassName()}>
                      <p className="text-xs text-gray-500">
                        <StatLabel label="Pass %" />
                      </p>
                      <p className="mt-2 font-bold">{match.passAccuracy}%</p>
                    </div>

                    <div className={statTileClassName()}>
                      <p className="text-xs text-gray-500">
                        <StatLabel label="Tackle %" />
                      </p>
                      <p className="mt-2 font-bold">{match.tackleSuccessRate}%</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-5">
                    <div className={statTileClassName()}>
                      <p className="text-xs text-gray-500">
                        <StatLabel label="Shots" />
                      </p>
                      <p className="mt-2 font-bold">{match.shots}</p>
                    </div>

                    <div className={statTileClassName()}>
                      <p className="text-xs text-gray-500">
                        <StatLabel label="Pass Attempts" />
                      </p>
                      <p className="mt-2 font-bold">{match.passAttempts}</p>
                    </div>

                    <div className={statTileClassName()}>
                      <p className="text-xs text-gray-500">
                        <StatLabel label="Passes Made" />
                      </p>
                      <p className="mt-2 font-bold">{match.passesMade}</p>
                    </div>

                    <div className={statTileClassName()}>
                      <p className="text-xs text-gray-500">
                        <StatLabel label="Tackle Attempts" />
                      </p>
                      <p className="mt-2 font-bold">{match.tackleAttempts}</p>
                    </div>

                    <div className={statTileClassName()}>
                      <p className="text-xs text-gray-500">
                        <StatLabel label="Tackles Made" />
                      </p>
                      <p className="mt-2 font-bold">{match.tacklesMade}</p>
                    </div>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
