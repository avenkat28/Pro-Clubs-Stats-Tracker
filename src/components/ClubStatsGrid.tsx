type ClubStatsGridProps = {
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  cleanSheets: number;
  recentMatches: {
    result: "W" | "D" | "L";
  }[];
};

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
  const goalsPerMatch = matches > 0 ? (goalsFor / matches).toFixed(2) : "0.00";
  const concededPerMatch =
    matches > 0 ? (goalsAgainst / matches).toFixed(2) : "0.00";

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

  const winBarWidth = matches > 0 ? (wins / matches) * 100 : 0;
  const drawBarWidth = matches > 0 ? (draws / matches) * 100 : 0;
  const lossBarWidth = matches > 0 ? (losses / matches) * 100 : 0;

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
              {[
                { label: "Attack", value: attackStrength, tone: "bg-emerald-400" },
                { label: "Defense", value: defenseStrength, tone: "bg-cyan-300" },
                { label: "Form", value: formStrength, tone: "bg-amber-300" },
              ].map((meter) => (
                <div key={meter.label}>
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
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
            <p className="text-sm text-white/50">Storyline</p>
            <p className="mt-3 text-sm leading-6 text-white/70">
              Form is based on the club's last {lastTenResults.length || 10} matches:
              {" "}
              {recentWins}W - {recentDraws}D - {recentLosses}L for {formPoints}
              {" "}
              points.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
