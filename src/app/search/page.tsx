import Navbar from "../../components/Navbar";
import SearchFilters from "../../components/SearchFilters";
import SearchResults from "../../components/SearchResults";
import {
  EaRequestError,
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
    <main className="min-h-screen bg-[#050706] text-white">
      <Navbar />

      <section className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:py-10">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300/80">
            Search Results
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
            {query ? `Results for "${query}"` : "Search Clubs and Players"}
          </h1>

          <p className="mt-3 max-w-2xl text-white/55">
            Search real FC 26 clubs from the live EA leaderboard data, or paste
            a club ID directly to open its live profile.
          </p>
        </div>

        <form className="flex flex-col gap-3 rounded-lg border border-white/10 bg-[#080b0a] p-4 md:flex-row">
          <input
            name="q"
            defaultValue={query}
            placeholder="Search club name, club ID, or player name"
            className="flex-1 rounded-md border border-white/10 bg-black/60 px-3 py-2.5 text-white outline-none placeholder:text-white/35 focus:border-emerald-300/70"
          />

          <input type="hidden" name="type" value={filter} />
          <input type="hidden" name="platform" value={platform} />

          <button className="rounded-md bg-white px-5 py-2.5 font-semibold text-black transition hover:bg-emerald-200">
            Search
          </button>
        </form>

        <div className="flex flex-wrap gap-2 rounded-lg border border-white/10 bg-[#080b0a] p-2">
          {eaPlatforms.map((platformOption) => {
            const isActive = platformOption === platform;

            return (
              <a
                key={platformOption}
                href={`/search?q=${encodeURIComponent(query)}&type=${filter}&platform=${platformOption}`}
                className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-white text-black"
                    : "text-white/55 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {eaPlatformLabels[platformOption]}
              </a>
            );
          })}
        </div>

        <SearchFilters activeFilter={filter} query={query} platform={platform} />

        {searchError ? (
          <div className="rounded-lg border border-yellow-500/25 bg-yellow-500/10 p-5 text-yellow-100">
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
          <div className="rounded-lg border border-white/10 bg-[#080b0a] p-8">
            <h2 className="text-2xl font-black">Start searching</h2>
            <p className="mt-2 text-white/55">
              Try a real FC 26 club name from the rankings, or paste a club ID
              like “885419”.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
