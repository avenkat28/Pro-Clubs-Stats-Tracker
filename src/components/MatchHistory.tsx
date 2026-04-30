"use client";

import { useState } from "react";
import { StatLabel } from "./StatIcon";

type Match = {
  id: string;
  opponent: string;
  result: string;
  score: string;
  rating: number;
  goals: number;
  assists: number;
  tackles: number;
  passAccuracy: number;
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

export default function MatchHistory({
  matches,
  matchWindow = 10,
}: MatchHistoryProps) {
  const [openMatchId, setOpenMatchId] = useState<string | null>(null);

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white">
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

          const resultColor =
            match.result === "W"
              ? "bg-green-600"
              : match.result === "D"
              ? "bg-yellow-500"
              : "bg-red-600";

          return (
            <button
              key={match.id}
              onClick={() => setOpenMatchId(isOpen ? null : match.id)}
              className="w-full rounded-xl border border-white/10 bg-black/40 p-4 text-left transition hover:bg-white/10"
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
                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 md:grid-cols-5">
                  <div>
                    <p className="text-xs text-gray-500">
                      <StatLabel label="Goals" />
                    </p>
                    <p className="font-bold">{match.goals}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      <StatLabel label="Assists" />
                    </p>
                    <p className="font-bold">{match.assists}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      <StatLabel label="Tackles" />
                    </p>
                    <p className="font-bold">{match.tackles}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      <StatLabel label="Pass Accuracy" />
                    </p>
                    <p className="font-bold">{match.passAccuracy}%</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      <StatLabel label="Red Cards" />
                    </p>
                    <p className="font-bold">{match.redCards}</p>
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
