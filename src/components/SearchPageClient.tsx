"use client";

import { useEffect, useState } from "react";

import SearchFilters from "./SearchFilters";
import SearchResults from "./SearchResults";

const eaPlatforms = ["common-gen5", "common-gen4", "nx"] as const;
const eaPlatformLabels: Record<(typeof eaPlatforms)[number], string> = {
  "common-gen5": "FC 26 Current Gen",
  "common-gen4": "FC 26 Last Gen",
  nx: "FC 26 Switch",
};

type SearchPageClientProps = {
  query: string;
  filter: string;
  platform: (typeof eaPlatforms)[number];
};

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

type SearchApiResponse = {
  players: PlayerResult[];
  clubs: ClubResult[];
  searchError: string;
};

const knownClubFallbacks = [
  {
    aliases: ["oil merchants"],
    id: "3456623",
    name: "Oil Merchants",
  },
];

function getDirectClubFallback(query: string, platform: string): ClubResult[] {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  const directIdFallback = /^\d+$/.test(trimmedQuery)
    ? [
        {
          id: trimmedQuery,
          name: `Club ${trimmedQuery}`,
          platform,
          division: "Direct club lookup",
          record: "Open live club profile",
          skillRating: 0,
        },
      ]
    : [];
  const normalizedQuery = trimmedQuery.toLowerCase();
  const knownFallbacks = knownClubFallbacks
    .filter((club) =>
      [club.id, club.name, ...club.aliases]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    )
    .map((club) => ({
      id: club.id,
      name: club.name,
      platform,
      division: "Direct club lookup",
      record: "Open live club profile",
      skillRating: 0,
    }));

  return [...directIdFallback, ...knownFallbacks];
}

function dedupeClubs(clubs: ClubResult[], fallbackClubs: ClubResult[]) {
  return Array.from(
    new Map([...fallbackClubs, ...clubs].map((club) => [club.id, club])).values(),
  );
}

export default function SearchPageClient({
  query,
  filter,
  platform,
}: SearchPageClientProps) {
  const [players, setPlayers] = useState<PlayerResult[]>([]);
  const [clubs, setClubs] = useState<ClubResult[]>([]);
  const [searchError, setSearchError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const trimmedQuery = query.trim();
    const fallbackClubs = getDirectClubFallback(trimmedQuery, platform);

    if (!trimmedQuery) {
      setPlayers([]);
      setClubs([]);
      setSearchError("");
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    async function loadSearchResults() {
      setIsLoading(true);

      try {
        const params = new URLSearchParams({
          q: trimmedQuery,
          type: filter,
          platform,
        });
        const response = await fetch(`/api/ea/search?${params.toString()}`, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Search request failed (${response.status})`);
        }

        const payload = (await response.json()) as SearchApiResponse;

        const mergedClubs = dedupeClubs(payload.clubs ?? [], fallbackClubs);

        setPlayers(payload.players ?? []);
        setClubs(mergedClubs);
        setSearchError(mergedClubs.length > 0 ? "" : payload.searchError ?? "");
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setPlayers([]);
        setClubs(fallbackClubs);
        setSearchError(
          fallbackClubs.length > 0
            ? ""
            : error instanceof Error
              ? error.message
              : "Live EA search failed.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadSearchResults();

    return () => controller.abort();
  }, [filter, platform, query]);

  return (
    <>
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
        isLoading ? (
          <div className="app-empty-state">
            <h2 className="text-2xl font-semibold">Loading live results</h2>
            <p className="mt-2 text-white/55">
              Pulling clubs and player leaderboard data for {eaPlatformLabels[platform]}.
            </p>
          </div>
        ) : (
          <SearchResults players={players} clubs={clubs} filter={filter} />
        )
      ) : (
        <div className="app-empty-state">
          <h2 className="text-2xl font-semibold">Start searching</h2>
          <p className="mt-2 text-white/55">
            Try a live FC 26 club or player name, or paste a club ID like “885419”.
          </p>
        </div>
      )}
    </>
  );
}
