import { NextResponse } from "next/server";

import {
  EaRequestError,
  getEaLeaderboards,
  normalizeEaPlatform,
  normalizeEaSearchQuery,
  searchEaClubs,
} from "../../../../lib/ea";

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
  let players = [];
  let clubs = [];
  let searchError = "";

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

  return NextResponse.json({
    query,
    filter,
    platform,
    players,
    clubs,
    searchError,
  });
}
