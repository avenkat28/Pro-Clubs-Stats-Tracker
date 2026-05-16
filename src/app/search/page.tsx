import Navbar from "../../components/Navbar";
import SearchFilters from "../../components/SearchFilters";
import SearchResults from "../../components/SearchResults";
import {
  EaRequestError,
  getEaLeaderboards,
  eaPlatformLabels,
  eaPlatforms,
  normalizeEaPlatform,
  normalizeEaSearchQuery,
  searchEaClubs,
} from "../../lib/ea";

const searchFilters = ["all", "players", "clubs"] as const;

function normalizeSearchFilter(value: string | undefined) {
  return searchFilters.includes(value as (typeof searchFilters)[number])
    ? value
    : "all";
}

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
    type?: string;
    platform?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = normalizeEaSearchQuery(params.q ?? "");
  const filter = normalizeSearchFilter(params.type);
  const platform = normalizeEaPlatform(params.platform);
  let players = [];
  let clubs = [];
  let searchError = "";

  if (query) {
    const normalizedQuery = query.toLowerCase();
    const [clubSearchResult, playerSearchResult] = await Promise.allSettled([
      filter !== "players" ? searchEaClubs(query, platform) : Promise.resolve([]),
      filter !== "clubs"
        ? getEaLeaderboards(platform, 30, 20).then((leaderboards) =>
            leaderboards.players
              .filter((player) =>
                [
                  player.name,
                  player.club,
                  player.position,
                  player.id,
                  player.clubId ?? "",
                ]
                  .join(" ")
                  .toLowerCase()
                  .includes(normalizedQuery),
              )
              .slice(0, 24)
              .map((player) => ({
                id: player.id,
                clubId: player.clubId,
                name: player.name,
                position: player.position,
                club: player.club,
                platform,
                rating: player.rating,
                goals: player.goals,
                assists: player.assists,
              })),
          )
        : Promise.resolve([]),
    ]);

    if (clubSearchResult.status === "fulfilled") {
      clubs = clubSearchResult.value;
    }

    if (playerSearchResult.status === "fulfilled") {
      players = playerSearchResult.value;
    }

    const rejectedResult = [clubSearchResult, playerSearchResult].find(
      (result) => result.status === "rejected",
    );

    if (rejectedResult?.status === "rejected") {
      const error = rejectedResult.reason;

      if (error instanceof EaRequestError) {
        searchError = `EA rejected part of the live search request (${error.status}).`;
      } else if (error instanceof Error) {
        searchError = error.message;
      } else {
        searchError = "Live EA search failed.";
      }
    }
  }

  const isClubIdQuery = /^\d+$/.test(query.trim());
  const directClubResult =
    isClubIdQuery && query.trim()
      ? [
          {
            id: query.trim(),
            name: `Club ${query.trim()}`,
            platform,
            division: "Direct club lookup",
            record: "Open live club profile",
            skillRating: 0,
          },
        ]
      : [];
  const dedupedClubs = Array.from(
    new Map([...directClubResult, ...clubs].map((club) => [club.id, club])).values(),
  );

  return (
    <main className="min-h-screen bg-[#050706] text-white">
      <Navbar />

      <section className="app-page-shell">
        <div className="app-page-header">
          <p className="app-page-eyebrow">
            Search Results
          </p>

          <h1 className="app-page-title">
            {query ? `Results for "${query}"` : "Search Clubs and Players"}
          </h1>

          <p className="app-page-copy max-w-3xl">
            Search live FC 26 clubs, leaderboard players, or paste a club ID to
            open its profile directly.
          </p>
        </div>

        <form className="app-surface flex flex-col gap-3 p-4 md:flex-row">
          <input
            name="q"
            defaultValue={query}
            placeholder="Search club name, club ID, or player name"
            className="app-input flex-1"
          />

          <input type="hidden" name="type" value={filter} />
          <input type="hidden" name="platform" value={platform} />

          <button type="submit" className="app-button-primary">
            Search
          </button>
        </form>

        <div className="app-surface app-toolbar">
          {eaPlatforms.map((platformOption) => {
            const isActive = platformOption === platform;

            return (
              <a
                key={platformOption}
                href={`/search?q=${encodeURIComponent(query)}&type=${filter}&platform=${platformOption}`}
                className={`app-pill-link ${isActive ? "app-pill-link-active" : ""}`}
              >
                {eaPlatformLabels[platformOption]}
              </a>
            );
          })}
        </div>

        <SearchFilters activeFilter={filter} query={query} platform={platform} />

        {searchError ? (
          <div className="app-banner-warning">
            <p className="text-sm font-semibold uppercase tracking-wide text-yellow-300">
              Live search fallback
            </p>
            <p className="mt-2">
              {searchError} Club ID lookups still work, and available results
              will continue rendering when one data source succeeds.
            </p>
          </div>
        ) : null}

        {query ? (
          <SearchResults
            players={players}
            clubs={dedupedClubs}
            filter={filter}
          />
        ) : (
          <div className="app-empty-state">
            <h2 className="text-2xl font-semibold">Start searching</h2>
            <p className="mt-2 text-white/55">
              Try a live FC 26 club or player name, or paste a club ID like
              “885419”.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
