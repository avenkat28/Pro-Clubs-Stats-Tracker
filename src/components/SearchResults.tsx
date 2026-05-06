import SearchResultCard from "./SearchResultCard";
import {
  skillRatingCardClassName,
  skillRatingTextClassName,
} from "../lib/colorCoding";

type PlayerResult = {
  id: string;
  name: string;
  position: string;
  club: string;
  platform: string;
  rating: number;
  goals: number;
  assists: number;
};

type ClubResult = {
  id: string;
  name: string;
  platform: string;
  division: string;
  record: string;
  skillRating: number;
};

type SearchResultsProps = {
  players: PlayerResult[];
  clubs: ClubResult[];
  filter: string;
};

export default function SearchResults({
  players,
  clubs,
  filter,
}: SearchResultsProps) {
  const showPlayers = filter === "all" || filter === "players";
  const showClubs = filter === "all" || filter === "clubs";

  const hasResults =
    (showPlayers && players.length > 0) || (showClubs && clubs.length > 0);

  if (!hasResults) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-white">
        <h2 className="text-2xl font-bold">No results found</h2>
        <p className="mt-2 text-gray-400">
          Try searching for a live club name from FC 26 rankings or paste a club ID.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {showClubs && clubs.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-bold text-white">Live Clubs</h2>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {clubs.map((club) => (
              <SearchResultCard
                key={club.id}
                type="club"
                title={club.name}
                subtitle={`${club.division} • ${club.platform}`}
                meta={club.record}
                href={`/club/${club.id}?platform=${club.platform}`}
                statLabel="Skill Rating"
                statValue={club.skillRating || "Open"}
                statClassName={
                  typeof club.skillRating === "number"
                    ? skillRatingTextClassName(club.skillRating)
                    : undefined
                }
                statContainerClassName={
                  typeof club.skillRating === "number" && club.skillRating > 0
                    ? skillRatingCardClassName(club.skillRating)
                    : undefined
                }
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
