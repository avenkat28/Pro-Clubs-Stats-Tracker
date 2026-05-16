import type { LeaderboardTab } from "./LeaderboardTabs";

export type PlatformFilter = "all" | "Gen5" | "Old Gen" | "Switch";
export type RegionFilter = "all" | "Worldwide" | "NA" | "EU";
export type PlayerSortKey =
  | "rank"
  | "goals"
  | "assists"
  | "goalContributions"
  | "rating"
  | "winRate"
  | "redCards";
export type ClubSortKey =
  | "rank"
  | "skillRating"
  | "winRate"
  | "wins"
  | "goalsFor"
  | "goalsAgainst";
export type SortKey = PlayerSortKey | ClubSortKey;

type LeaderboardFiltersProps = {
  activeTab: LeaderboardTab;
  platform: PlatformFilter;
  region: RegionFilter;
  sortBy: SortKey;
  onPlatformChange: (platform: PlatformFilter) => void;
  onRegionChange: (region: RegionFilter) => void;
  onSortChange: (sortBy: SortKey) => void;
};

const playerSortOptions: { label: string; value: PlayerSortKey }[] = [
  { label: "Rank", value: "rank" },
  { label: "Goals", value: "goals" },
  { label: "Assists", value: "assists" },
  { label: "G/A", value: "goalContributions" },
  { label: "Rating", value: "rating" },
  { label: "Win %", value: "winRate" },
  { label: "Red Cards", value: "redCards" },
];

const clubSortOptions: { label: string; value: ClubSortKey }[] = [
  { label: "Rank", value: "rank" },
  { label: "Skill Rating", value: "skillRating" },
  { label: "Win %", value: "winRate" },
  { label: "Wins", value: "wins" },
  { label: "GF", value: "goalsFor" },
  { label: "GA", value: "goalsAgainst" },
];

export default function LeaderboardFilters({
  activeTab,
  platform,
  region,
  sortBy,
  onPlatformChange,
  onRegionChange,
  onSortChange,
}: LeaderboardFiltersProps) {
  const sortOptions =
    activeTab === "players" ? playerSortOptions : clubSortOptions;

  return (
    <section className="rounded-lg border border-white/10 bg-[#080b0a] p-4">
      <div className="grid gap-3 md:grid-cols-3">
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
            Platform
          </span>
          <select
            value={platform}
            onChange={(event) =>
              onPlatformChange(event.target.value as PlatformFilter)
            }
            className="w-full rounded-md border border-white/10 bg-black/60 px-3 py-2.5 text-sm font-semibold text-white outline-none transition hover:border-white/25 focus:border-emerald-300/70"
          >
            <option value="all">All</option>
            <option value="Gen5">Gen5</option>
            <option value="Old Gen">Old Gen</option>
            <option value="Switch">Switch</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
            Region
          </span>
          <select
            value={region}
            onChange={(event) =>
              onRegionChange(event.target.value as RegionFilter)
            }
            className="w-full rounded-md border border-white/10 bg-black/60 px-3 py-2.5 text-sm font-semibold text-white outline-none transition hover:border-white/25 focus:border-emerald-300/70"
          >
            <option value="all">All</option>
            <option value="Worldwide">Worldwide</option>
            <option value="NA">NA</option>
            <option value="EU">EU</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
            Sort By
          </span>
          <select
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value as SortKey)}
            className="w-full rounded-md border border-white/10 bg-black/60 px-3 py-2.5 text-sm font-semibold text-white outline-none transition hover:border-white/25 focus:border-emerald-300/70"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}
