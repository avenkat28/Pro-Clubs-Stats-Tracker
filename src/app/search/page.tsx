import Navbar from "../../components/Navbar";
import SearchPageClient from "../../components/SearchPageClient";
import {
  normalizeEaPlatform,
  normalizeEaSearchQuery,
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
        <SearchPageClient query={query} filter={filter} platform={platform} />
      </section>
    </main>
  );
}
