import Navbar from "../../components/Navbar";
import SearchFilters from "../../components/SearchFilters";
import SearchResults from "../../components/SearchResults";
import {
  EaRequestError,
  eaPlatformLabels,
  eaPlatforms,
  isEaPlatform,
  searchEaClubs,
} from "../../lib/ea";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
    type?: string;
    platform?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q ?? "";
  const filter = params.type ?? "all";
  const platform = isEaPlatform(params.platform) ? params.platform : "common-gen5";
  let clubs = [];
  let searchError = "";

  if (query) {
    try {
      clubs = await searchEaClubs(query, platform);
    } catch (error) {
      if (error instanceof EaRequestError) {
        searchError = `EA rejected the live club search request (${error.status}).`;
      } else if (error instanceof Error) {
        searchError = error.message;
      } else {
        searchError = "Live EA club search failed.";
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
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10">
        <div>
          <p className="text-sm text-blue-400">Search Results</p>

          <h1 className="mt-2 text-5xl font-bold">
            {query ? `Results for "${query}"` : "Search Clubs and Players"}
          </h1>

          <p className="mt-3 max-w-2xl text-gray-400">
            Search real FC 26 clubs from the live EA leaderboard data, or paste
            a club ID directly to open its live profile.
          </p>
        </div>

        <form className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 md:flex-row">
          <input
            name="q"
            defaultValue={query}
            placeholder="Search club name, club ID, or player name"
            className="flex-1 rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-gray-500"
          />

          <input type="hidden" name="type" value={filter} />
          <input type="hidden" name="platform" value={platform} />

          <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500">
            Search
          </button>
        </form>

        <div className="flex flex-wrap gap-3">
          {eaPlatforms.map((platformOption) => {
            const isActive = platformOption === platform;

            return (
              <a
                key={platformOption}
                href={`/search?q=${encodeURIComponent(query)}&type=${filter}&platform=${platformOption}`}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                {eaPlatformLabels[platformOption]}
              </a>
            );
          })}
        </div>

        <SearchFilters activeFilter={filter} query={query} platform={platform} />

        {searchError ? (
          <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-5 text-yellow-100">
            <p className="text-sm font-semibold uppercase tracking-wide text-yellow-300">
              Live search fallback
            </p>
            <p className="mt-2">
              {searchError} You can still open a club directly by ID, and we can
              keep refining the name-search request shape.
            </p>
          </div>
        ) : null}

        {query ? (
          <SearchResults
            players={[]}
            clubs={dedupedClubs}
            filter={filter}
          />
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-bold">Start searching</h2>
            <p className="mt-2 text-gray-400">
              Try a real FC 26 club name from the rankings, or paste a club ID
              like “885419”.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
