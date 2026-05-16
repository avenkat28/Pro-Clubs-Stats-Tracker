import type { TopClub, TopPlayer } from "../lib/mockData";
import type { SortKey } from "./LeaderboardFilters";
import LeaderboardRow, { MobileLeaderboardCard } from "./LeaderboardRow";
import type { LeaderboardTab } from "./LeaderboardTabs";
import { StatLabel } from "./StatIcon";

type LeaderboardTableProps = {
  activeTab: LeaderboardTab;
  players: TopPlayer[];
  clubs: TopClub[];
  sortBy: SortKey;
  onSortChange: (sortBy: SortKey) => void;
};

const playerColumns: { label: string; sortKey?: SortKey }[] = [
  { label: "Rank", sortKey: "rank" },
  { label: "Player" },
  { label: "Club" },
  { label: "Position" },
  { label: "Games" },
  { label: "Goals", sortKey: "goals" },
  { label: "Assists", sortKey: "assists" },
  { label: "G/A", sortKey: "goalContributions" },
  { label: "Rating", sortKey: "rating" },
  { label: "Win %", sortKey: "winRate" },
  { label: "Red Cards", sortKey: "redCards" },
];

const clubColumns: { label: string; sortKey?: SortKey }[] = [
  { label: "Rank", sortKey: "rank" },
  { label: "Club" },
  { label: "Division" },
  { label: "Games" },
  { label: "Wins", sortKey: "wins" },
  { label: "Draws" },
  { label: "Losses" },
  { label: "GF", sortKey: "goalsFor" },
  { label: "GA", sortKey: "goalsAgainst" },
  { label: "Skill Rating", sortKey: "skillRating" },
  { label: "Win %", sortKey: "winRate" },
];

export default function LeaderboardTable({
  activeTab,
  players,
  clubs,
  sortBy,
  onSortChange,
}: LeaderboardTableProps) {
  const isPlayers = activeTab === "players";
  const columns = isPlayers ? playerColumns : clubColumns;
  const items = isPlayers ? players : clubs;

  return (
    <section className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-blue-950/10 backdrop-blur">
      <div className="border-b border-white/10 px-5 py-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
              Live Rankings
            </p>
            <h2 className="mt-1 text-2xl font-black text-white">
              {isPlayers ? "Player Leaderboard" : "Club Leaderboard"}
            </h2>
          </div>
          <p className="text-sm text-gray-400">{items.length} results</p>
        </div>
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[980px] border-collapse text-left text-sm">
          <thead className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur">
            <tr className="border-b border-white/10">
              {columns.map((column) => (
                <th
                  key={column.label}
                  className="px-4 py-4 text-xs font-black uppercase tracking-[0.14em] text-gray-500"
                >
                  {column.sortKey ? (
                    <button
                      type="button"
                      onClick={() => onSortChange(column.sortKey as SortKey)}
                      className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 transition hover:bg-white/10 hover:text-white ${
                        sortBy === column.sortKey ? "text-blue-300" : ""
                      }`}
                    >
                      <StatLabel label={column.label} />
                      <span className="text-[10px]">
                        {sortBy === column.sortKey ? "DESC" : "SORT"}
                      </span>
                    </button>
                  ) : (
                    <StatLabel label={column.label} />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isPlayers
              ? players.map((player) => (
                  <LeaderboardRow
                    key={player.id}
                    activeTab="players"
                    item={player}
                    displayRank={player.rank}
                  />
                ))
              : clubs.map((club) => (
                  <LeaderboardRow
                    key={club.id}
                    activeTab="clubs"
                    item={club}
                    displayRank={club.rank}
                  />
                ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 p-4 md:hidden">
        {items.map((item) => (
          <MobileLeaderboardCard
            key={item.id}
            activeTab={activeTab}
            item={item}
            displayRank={item.rank}
          />
        ))}
      </div>
    </section>
  );
}
