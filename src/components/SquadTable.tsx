import PlayerStatRow from "./PlayerStatRow";

type SquadPlayer = {
  id: string;
  name: string;
  position: string;
  matches: number;
  goals: number;
  assists: number;
  rating: number;
};

type SquadTableProps = {
  players: SquadPlayer[];
};

export default function SquadTable({ players }: SquadTableProps) {
  const hasUsablePlayers = players.some(
    (player) => player.name !== "Unknown" || player.matches > 0,
  );

  return (
    <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] p-6 shadow-[0_22px_45px_rgba(0,0,0,0.2)]">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
            Squad Overview
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-white">
            Squad Stats
          </h2>
        </div>

        <p className="text-sm text-white/50">
          {hasUsablePlayers
            ? "Top available squad members from the live EA feed."
            : "No squad member data is available from the live EA response yet."}
        </p>
      </div>

      {!hasUsablePlayers ? (
        <div className="mt-6 rounded-[1.5rem] border border-dashed border-white/12 bg-black/20 px-6 py-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl text-white/70">
            +
          </div>
          <p className="mt-4 text-lg font-semibold text-white">Squad stats are warming up</p>
          <p className="mt-2 text-sm text-white/55">
            EA returned the club profile, but not a usable squad listing for this
            team on the selected platform yet.
          </p>
          <p className="mt-2 text-sm text-white/40">
            Player rows should appear once the live member feed returns match data.
          </p>
        </div>
      ) : null}

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-white/45">
            <tr className="border-b border-white/10">
              <th className="pb-4">Player</th>
              <th className="pb-4">POS</th>
              <th className="pb-4 text-right">Matches</th>
              <th className="pb-4 text-right">Goals</th>
              <th className="pb-4 text-right">Assists</th>
              <th className="pb-4 text-right">Rating</th>
            </tr>
          </thead>

          <tbody>
            {players.map((player) => (
              <PlayerStatRow key={player.id} {...player} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
