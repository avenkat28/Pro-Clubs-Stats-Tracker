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
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">Squad Stats</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-gray-400">
            <tr className="border-b border-white/10">
              <th className="pb-3">Player</th>
              <th className="pb-3">POS</th>
              <th className="pb-3">Matches</th>
              <th className="pb-3">Goals</th>
              <th className="pb-3">Assists</th>
              <th className="pb-3">Rating</th>
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