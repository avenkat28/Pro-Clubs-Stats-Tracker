type LeaderboardHeaderProps = {
  totalPlayers: number;
  totalClubs: number;
};

export default function LeaderboardHeader({
  totalPlayers,
  totalClubs,
}: LeaderboardHeaderProps) {
  return (
    <header className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] px-6 py-8 shadow-2xl shadow-blue-950/20 backdrop-blur md:px-8 md:py-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            ProClubsHQ
          </p>
          <h1 className="mt-3 text-4xl font-bold text-white md:text-6xl">
            Global Leaderboards
          </h1>
          <p className="mt-4 max-w-2xl text-base text-gray-400 md:text-lg">
            Top clubs and players across EA FC 26 Pro Clubs
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:min-w-80">
          <div className="rounded-xl border border-white/10 bg-black/40 p-4">
            <p className="text-sm text-gray-400">Ranked Players</p>
            <p className="mt-1 text-3xl font-bold text-white">{totalPlayers}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/40 p-4">
            <p className="text-sm text-gray-400">Ranked Clubs</p>
            <p className="mt-1 text-3xl font-bold text-white">{totalClubs}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
