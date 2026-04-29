import Navbar from "../../components/Navbar";
import SearchFilters from "../../components/SearchFilters";
import SearchResults from "../../components/SearchResults";
import { searchMockData } from "../../lib/searchMockData";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
    type?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q ?? "";
  const filter = params.type ?? "all";

  const results = searchMockData(query);

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
            Find EA FC 26 Pro Clubs players, clubs, ratings, records, and
            advanced stats.
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

          <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500">
            Search
          </button>
        </form>

        <SearchFilters activeFilter={filter} query={query} />

        {query ? (
          <SearchResults
            players={results.players}
            clubs={results.clubs}
            filter={filter}
          />
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-bold">Start searching</h2>
            <p className="mt-2 text-gray-400">
              Try searching for “Arya”, “Elite XI”, or “3456623”.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
