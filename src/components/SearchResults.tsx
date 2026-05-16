import SearchResultCard from "./SearchResultCard";
import {
  skillRatingCardClassName,
  skillRatingTextClassName,
} from "../lib/colorCoding";

type PlayerResult = {
  id: string;
  clubId?: string;
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
      <div className="app-empty-state text-white">
        <h2 className="text-2xl font-semibold">No results found</h2>
        <p className="mt-2 text-white/55">
          Try a club name, player name, or a direct club ID from the live FC 26 data pool.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {showPlayers && players.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-white">Players</h2>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {players.map((player) => (
              <SearchResultCard
                key={`${player.clubId ?? "club"}:${player.id}`}
                type="player"
                title={player.name}
                subtitle={`${player.position} • ${player.club}`}
                meta={`${player.platform} • ${player.goals}G / ${player.assists}A`}
                href={`/player/${encodeURIComponent(player.id)}${
                  player.clubId
                    ? `?clubId=${encodeURIComponent(player.clubId)}&platform=${player.platform}`
                    : ""
                }`}
                statLabel="Rating"
                statValue={player.rating > 0 ? player.rating.toFixed(1) : "View"}
                statClassName="text-blue-300"
              />
            ))}
          </div>
        </section>
      )}

      {showClubs && clubs.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-white">Clubs</h2>

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
                statValue={
                  typeof club.skillRating === "number" && club.skillRating > 0
                    ? club.skillRating.toLocaleString("en-US")
                    : "--"
                }
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
