type LeaderboardHeaderProps = {
  totalPlayers: number;
  totalClubs: number;
};

export default function LeaderboardHeader({
  totalPlayers,
  totalClubs,
}: LeaderboardHeaderProps) {
  return (
    <header className="app-surface overflow-hidden px-6 py-8 md:px-8 md:py-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300/80">
            ProClubsHQ
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
            Global Leaderboards
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/55 md:text-lg">
            Top clubs and players across EA FC 26 Pro Clubs
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:min-w-80">
          <div className="rounded-xl border border-white/8 bg-black/30 p-4">
            <p className="text-sm text-white/45">Ranked Players</p>
            <p className="mt-1 text-3xl font-semibold text-white">{totalPlayers}</p>
          </div>
          <div className="rounded-xl border border-white/8 bg-black/30 p-4">
            <p className="text-sm text-white/45">Ranked Clubs</p>
            <p className="mt-1 text-3xl font-semibold text-white">{totalClubs}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
