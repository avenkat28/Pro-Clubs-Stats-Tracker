type ClubStatsGridProps = {
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  cleanSheets: number;
};

export default function ClubStatsGrid({
  wins,
  draws,
  losses,
  goalsFor,
  goalsAgainst,
  cleanSheets,
}: ClubStatsGridProps) {
  const matches = wins + draws + losses;
  const winRate = matches > 0 ? Math.round((wins / matches) * 100) : 0;
  const goalDifference = goalsFor - goalsAgainst;
  const formattedGoalDifference =
    goalDifference > 0 ? `+${goalDifference}` : goalDifference.toString();

  const stats = [
    { label: "Record", value: `${wins}W - ${draws}D - ${losses}L` },
    { label: "Win Rate", value: `${winRate}%` },
    { label: "Goals For", value: goalsFor.toString() },
    { label: "Goals Against", value: goalsAgainst.toString() },
    { label: "Goal Difference", value: formattedGoalDifference },
    { label: "Clean Sheets", value: cleanSheets.toString() },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white"
        >
          <p className="text-sm text-gray-400">{stat.label}</p>
          <p className="mt-2 text-3xl font-bold">{stat.value}</p>
        </div>
      ))}
    </section>
  );
}
