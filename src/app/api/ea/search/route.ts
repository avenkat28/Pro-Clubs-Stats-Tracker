import { NextResponse } from "next/server";

import {
  EaRequestError,
  type EaClubSearchResult,
  type EaLeaderboardPlayer,
  getEaLeaderboards,
  normalizeEaPlatform,
  normalizeEaSearchQuery,
  searchEaClubs,
} from "../../../../lib/ea";
import { cacheEaLeaderboards } from "../../../../lib/database/leaderboardCache";
import {
  cacheSearchClubs,
  leaderboardPlayersToSearchResults,
  searchCachedClubs,
  searchCachedPlayers,
} from "../../../../lib/database/searchCache";

const searchFilters = ["all", "players", "clubs"] as const;

function normalizeSearchFilter(value: string | null) {
  return searchFilters.includes(value as (typeof searchFilters)[number])
    ? value
    : "all";
}

function logEaProxyEvent(
  route: string,
  details: Record<string, string | number | boolean | null>,
) {
  console.warn(`[${route}]`, details);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = normalizeEaSearchQuery(searchParams.get("q") ?? "");
  const filter = normalizeSearchFilter(searchParams.get("type"));
  const platform = normalizeEaPlatform(searchParams.get("platform"));

  if (!query) {
    return NextResponse.json({
      query,
      filter,
      platform,
      players: [],
      clubs: [],
      searchError: "",
    });
  }

  const normalizedQuery = query.toLowerCase();
  let players: Array<{
    id: string;
    clubId?: string;
    name: string;
    position: string;
    club: string;
    platform: typeof platform;
    rating: number;
    goals: number;
    assists: number;
  }> =
    filter !== "clubs" ? await searchCachedPlayers(query, platform) : [];
  let clubs: EaClubSearchResult[] =
    filter !== "players" ? await searchCachedClubs(query, platform) : [];
  let searchError = "";

  if (
    (filter === "all" && (players.length > 0 || clubs.length > 0)) ||
    (filter === "players" && players.length > 0) ||
    (filter === "clubs" && clubs.length > 0)
  ) {
    return NextResponse.json({
      query,
      filter,
      platform,
      players,
      clubs,
      searchError,
    });
  }

  const [clubSearchResult, playerSearchResult] = await Promise.allSettled([
    filter !== "players" ? searchEaClubs(query, platform) : Promise.resolve([]),
    filter !== "clubs"
      ? getEaLeaderboards(platform, 30, 20).then(async (leaderboards) => {
          await cacheEaLeaderboards({
            platform,
            clubLimit: 30,
            playerClubScanLimit: 20,
            leaderboards,
          }).catch((cacheError) => {
            console.warn("Unable to cache EA leaderboards from search", cacheError);
          });

          const matchedPlayers = leaderboards.players
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
            .slice(0, 24) satisfies EaLeaderboardPlayer[];

          return leaderboardPlayersToSearchResults(matchedPlayers, platform);
        })
      : Promise.resolve([]),
  ]);

  if (clubSearchResult.status === "fulfilled") {
    clubs = clubSearchResult.value;
    await cacheSearchClubs(clubs, platform).catch((cacheError) => {
      console.warn("Unable to cache EA club search results", cacheError);
    });
  } else {
    const error = clubSearchResult.reason;
    if (error instanceof EaRequestError) {
      logEaProxyEvent("api/ea/search", {
        source: "clubs",
        status: error.status,
        platform,
        filter,
        queryLength: query.length,
      });
    } else {
      logEaProxyEvent("api/ea/search", {
        source: "clubs",
        status: null,
        platform,
        filter,
        queryLength: query.length,
      });
    }
  }

  if (playerSearchResult.status === "fulfilled") {
    players = playerSearchResult.value;
  } else {
    const error = playerSearchResult.reason;
    if (error instanceof EaRequestError) {
      logEaProxyEvent("api/ea/search", {
        source: "players",
        status: error.status,
        platform,
        filter,
        queryLength: query.length,
      });
    } else {
      logEaProxyEvent("api/ea/search", {
        source: "players",
        status: null,
        platform,
        filter,
        queryLength: query.length,
      });
    }
  }

  return NextResponse.json({
    query,
    filter,
    platform,
    players,
    clubs,
    searchError,
  });
}
