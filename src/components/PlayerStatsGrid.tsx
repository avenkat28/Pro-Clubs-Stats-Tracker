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
};

type PlayerStatsGridProps = {
  games: number;
  goals: number;
  assists: number;
  averageRating: number;
  winRate: number;
  redCards: number;
  tackles?: number;
  tackleSuccessRate?: number;
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
}: {
  games: number;
  recentMatches?: RecentPlayerMatch[];
  matchWindow: number;
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
  games,
  goals,
  assists,
  averageRating,
  winRate,
  redCards,
  tackles,
  tackleSuccessRate,
  manOfTheMatch,
  manOfTheMatchRate,
  recentMatches = [],
  matchWindow = 10,
  awardBadges = [],
}: PlayerStatsGridProps) {
  const ga = goals + assists;
  const formBadge = getPlayerFormBadge({
    games,
    recentMatches,
    matchWindow,
  });

  const goalsPerGame = games > 0 ? (goals / games).toFixed(2) : "0.00";
  const assistsPerGame = games > 0 ? (assists / games).toFixed(2) : "0.00";
  const gaPerGame = games > 0 ? (ga / games).toFixed(2) : "0.00";

  const stats = [
    { label: "Games", value: games },
    { label: "Goals", value: goals },
    { label: "Assists", value: assists },
    { label: "G/A", value: ga },
    { label: "Goals / Game", value: goalsPerGame },
    { label: "Assists / Game", value: assistsPerGame },
    { label: "G/A / Game", value: gaPerGame },
    { label: "Avg Rating", value: averageRating },
    { label: "Win Rate", value: `${winRate}%` },
    { label: "Tackles", value: tackles ?? "N/A" },
    {
      label: "Tackle %",
      value:
        tackleSuccessRate !== undefined
          ? `${tackleSuccessRate}%`
          : "N/A",
    },
    { label: "MOTM", value: manOfTheMatch ?? "N/A" },
    {
      label: "MOTM %",
      value:
        manOfTheMatchRate !== undefined
          ? `${manOfTheMatchRate}%`
          : "N/A",
    },
    { label: "Red Cards", value: redCards },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {awardBadges.length > 0 ? (
        <div className="rounded-2xl border border-emerald-300/20 bg-[linear-gradient(135deg,rgba(16,185,129,0.16),rgba(14,165,233,0.08),rgba(236,72,153,0.08))] p-6 text-white shadow-[0_18px_45px_rgba(0,0,0,0.2)] md:col-span-3 lg:col-span-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">
            Club Badges
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {awardBadges.map((badge) => (
              <span
                key={badge.label}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-black shadow-[0_10px_24px_rgba(0,0,0,0.18)] ${badge.className}`}
              >
                <span aria-hidden="true">{badge.symbol}</span>
                {badge.label}
              </span>
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

      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white"
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
