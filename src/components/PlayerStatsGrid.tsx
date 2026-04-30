import { StatLabel } from "./StatIcon";

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
};

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
}: PlayerStatsGridProps) {
  const ga = goals + assists;

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
