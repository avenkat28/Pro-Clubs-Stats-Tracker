type LeaderboardHeaderProps = {
  totalPlayers: number;
  totalClubs: number;
};

export default function LeaderboardHeader({
  totalPlayers,
  totalClubs,
}: LeaderboardHeaderProps) {
  return (
    <header className="overflow-hidden rounded-lg border border-white/10 bg-[#080b0a] px-6 py-8 shadow-[0_18px_45px_rgba(0,0,0,0.22)] ring-1 ring-white/[0.03] md:px-8 md:py-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300/80">
            ProClubsHQ
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-white md:text-6xl">
            Global Leaderboards
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/55 md:text-lg">
            Top clubs and players across EA FC 26 Pro Clubs
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:min-w-80">
          <div className="rounded-lg border border-white/10 bg-black/40 p-4">
            <p className="text-sm text-white/45">Ranked Players</p>
            <p className="mt-1 text-3xl font-black text-white">{totalPlayers}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/40 p-4">
            <p className="text-sm text-white/45">Ranked Clubs</p>
            <p className="mt-1 text-3xl font-black text-white">{totalClubs}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
