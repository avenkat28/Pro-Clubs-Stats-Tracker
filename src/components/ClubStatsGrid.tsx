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
};

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
  winRate,
  goalsPerMatch,
  concededPerMatch,
  goalDifference,
  cleanSheetRate,
}: {
  matches: number;
  winRate: number;
  goalsPerMatch: number;
  concededPerMatch: number;
  goalDifference: number;
  cleanSheetRate: number;
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
      ? "The goal difference backs up the results."
      : goalDifference >= 0
      ? "The goal difference suggests the margins are manageable."
      : "The negative goal difference shows the performances are not matching the target yet.";

  const cleanSheetNote =
    cleanSheetRate >= 30
      ? "Clean sheets are a real part of the identity."
      : cleanSheetRate >= 15
      ? "Clean sheets are showing up, but not consistently."
      : "More shutouts would change the ceiling quickly.";

  return `${recordNote} ${attackNote} ${defenseNote} ${balanceNote} ${cleanSheetNote}`;
}

export default function ClubStatsGrid({
  wins,
  draws,
  losses,
  goalsFor,
  goalsAgainst,
  cleanSheets,
  recentMatches,
}: ClubStatsGridProps) {
  const matches = wins + draws + losses;
  const winRate = matches > 0 ? Math.round((wins / matches) * 100) : 0;
  const drawRate = matches > 0 ? Math.round((draws / matches) * 100) : 0;
  const lossRate = matches > 0 ? Math.round((losses / matches) * 100) : 0;
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
      ? "text-emerald-400"
      : goalDifference < 0
      ? "text-red-400"
      : "text-amber-300";
  const winRateTone =
    winRate >= 60
      ? "text-emerald-400"
      : winRate >= 40
      ? "text-amber-300"
      : "text-red-400";
  const cleanSheetTone =
    cleanSheets > 0 ? "text-cyan-300" : "text-white";

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
  const overallStoryline = getOverallStoryline({
    matches,
    winRate,
    goalsPerMatch: goalsPerMatchValue,
    concededPerMatch: concededPerMatchValue,
    goalDifference,
    cleanSheetRate,
  });

  const winBarWidth = matches > 0 ? (wins / matches) * 100 : 0;
  const drawBarWidth = matches > 0 ? (draws / matches) * 100 : 0;
  const lossBarWidth = matches > 0 ? (losses / matches) * 100 : 0;
  const strengthMeters = [
    {
      label: "Attack",
      value: attackStrength,
      tone: "bg-emerald-400",
      details: [
        `Goals scored: ${goalsFor}`,
        `Goals scored per match: ${goalsPerMatch}`,
      ],
    },
    {
      label: "Defense",
      value: defenseStrength,
      tone: "bg-cyan-300",
      details: [
        `Goals conceded: ${goalsAgainst}`,
        `Goals conceded per match: ${concededPerMatch}`,
      ],
    },
    {
      label: "Form",
      value: formStrength,
      tone: "bg-amber-300",
      details: [
        `Last 10 record: ${recentWins}W - ${recentDraws}D - ${recentLosses}L`,
        `Goals scored: ${recentGoals.goalsFor}`,
        `Goals conceded: ${recentGoals.goalsAgainst}`,
        `Goal differential: ${formattedRecentGoalDifference}`,
      ],
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.2fr_1fr_0.9fr]">
      <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-6 text-white shadow-[0_22px_45px_rgba(0,0,0,0.22)]">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
          Performance
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-[minmax(0,1fr)_8.5rem] sm:items-start">
          <div className="min-w-0 pr-2">
            <p className="text-sm text-white/50">Record</p>
            <p className="mt-2 whitespace-nowrap text-[clamp(1rem,2.45vw,3rem)] font-black tracking-[-0.07em] leading-none">
              {wins}W <span className="text-white/35">-</span> {draws}D{" "}
              <span className="text-white/35">-</span> {losses}L
            </p>
          </div>

          <div className="w-[8.5rem] justify-self-end sm:text-right">
            <p className="text-sm text-white/50">Win Rate</p>
            <p className={`mt-2 text-4xl font-black tracking-[-0.04em] ${winRateTone}`}>
              {winRate}%
            </p>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-full bg-white/10">
          <div className="flex h-3 w-full" aria-label="Wins, draws, and losses split">
            <div
              className="h-full bg-emerald-400"
              style={{ width: `${winBarWidth}%` }}
            />
            <div
              className="h-full bg-white/45"
              style={{ width: `${drawBarWidth}%` }}
            />
            <div
              className="h-full bg-red-400"
              style={{ width: `${lossBarWidth}%` }}
            />
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            Wins {winRate}%
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/45" />
            Draws {drawRate}%
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            Losses {lossRate}%
          </span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
          <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
            <p className="text-white/45">Matches</p>
            <p className="mt-1 text-2xl font-bold">{matches}</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
            <p className="text-white/45">Wins</p>
            <p className="mt-1 text-2xl font-bold text-emerald-400">{wins}</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
            <p className="text-white/45">Loss Rate</p>
            <p className="mt-1 text-2xl font-bold text-red-400">{lossRate}%</p>
          </div>
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-6 text-white shadow-[0_22px_45px_rgba(0,0,0,0.22)]">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
          Attack / Defense
        </p>
        <div className="mt-5 grid gap-4">
          <div className="flex items-end justify-between gap-4 rounded-2xl border border-white/8 bg-black/20 p-4">
            <div>
              <p className="text-sm text-white/50">Goals For</p>
              <p className="mt-2 text-4xl font-black tracking-[-0.04em] text-emerald-400">
                {goalsFor}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300/70">
                Attack
              </p>
              <p className="mt-2 text-sm text-white/45">{goalsPerMatch}/match</p>
            </div>
          </div>

          <div className="flex items-end justify-between gap-4 rounded-2xl border border-white/8 bg-black/20 p-4">
            <div>
              <p className="text-sm text-white/50">Goals Against</p>
              <p className="mt-2 text-4xl font-black tracking-[-0.04em] text-red-400">
                {goalsAgainst}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-300/70">
                Defense
              </p>
              <p className="mt-2 text-sm text-white/45">{concededPerMatch}/match</p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
            <p className="text-sm text-white/50">Goal Difference</p>
            <p className={`mt-2 text-4xl font-black tracking-[-0.04em] ${goalDifferenceTone}`}>
              {formattedGoalDifference}
            </p>
          </div>

          <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm text-white/50">Clean Sheets</p>
                <p className={`mt-2 text-4xl font-black tracking-[-0.04em] ${cleanSheetTone}`}>
                  {cleanSheets}
                </p>
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300/70">
                {cleanSheetRate}% rate
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-6 text-white shadow-[0_22px_45px_rgba(0,0,0,0.22)]">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
          Team Strength
        </p>
        <div className="mt-5 space-y-5">
          <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
            <div className="space-y-4">
              {strengthMeters.map((meter) => (
                <div key={meter.label} className="group relative">
                  <div className="flex items-center justify-between text-sm">
                    <p className="text-white/60">{meter.label}</p>
                    <p className="font-semibold text-white/80">{meter.value}</p>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/8">
                    <div
                      className={`h-full rounded-full ${meter.tone}`}
                      style={{ width: `${meter.value}%` }}
                    />
                  </div>
                  <div className="pointer-events-none absolute bottom-full left-0 z-20 mb-3 w-64 rounded-xl border border-white/10 bg-black/95 px-4 py-3 text-xs text-white/75 opacity-0 shadow-[0_16px_40px_rgba(0,0,0,0.45)] transition group-hover:opacity-100">
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
          </div>

          <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
            <p className="text-sm text-white/50">Storyline</p>
            <p className="mt-3 text-sm leading-6 text-white/70">
              {overallStoryline}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
