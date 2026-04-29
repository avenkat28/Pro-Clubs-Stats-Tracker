export const eaPlatforms = [
  "common-gen5",
  "common-gen4",
  "nx",
] as const;

export type EaPlatform = (typeof eaPlatforms)[number];

export const eaPlatformLabels: Record<EaPlatform, string> = {
  "common-gen5": "FC 26 Current Gen",
  "common-gen4": "FC 26 Last Gen",
  nx: "FC 26 Switch",
};

const DEFAULT_EA_PLATFORM = process.env.EA_PLATFORM ?? "common-gen5";
const DEFAULT_EA_API_BASE_URL =
  process.env.EA_API_BASE_URL ?? "https://proclubs.ea.com/api/fc";
const DEFAULT_REVALIDATE_SECONDS = 300;

type PrimitiveRecord = Record<string, unknown>;

export type EaClubSummary = {
  id: string;
  name: string;
  platform: string;
  division: string;
  skillRating: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  cleanSheets: number;
};

export type EaSquadMember = {
  id: string;
  name: string;
  position: string;
  matches: number;
  goals: number;
  assists: number;
  rating: number;
};

export type EaClubProfile = {
  club: EaClubSummary;
  squad: EaSquadMember[];
};

export function isEaPlatform(value: string | undefined | null): value is EaPlatform {
  return Boolean(value && eaPlatforms.includes(value as EaPlatform));
}

export type EaClubSearchResult = {
  id: string;
  name: string;
  platform: EaPlatform;
  skillRating: number;
  division: string;
  record: string;
};

export class EaRequestError extends Error {
  status: number;
  url: string;
  responseText: string;

  constructor(status: number, url: string, responseText: string) {
    super(`EA API request failed with ${status}`);
    this.name = "EaRequestError";
    this.status = status;
    this.url = url;
    this.responseText = responseText;
  }
}

function createEaUrl(pathname: string, searchParams: URLSearchParams) {
  return `${DEFAULT_EA_API_BASE_URL}${pathname}?${searchParams.toString()}`;
}

async function fetchEaJson<T>(pathname: string, searchParams: URLSearchParams) {
  const url = createEaUrl(pathname, searchParams);
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: DEFAULT_REVALIDATE_SECONDS,
    },
  });

  if (!response.ok) {
    const responseText = await response.text();

    throw new EaRequestError(response.status, url, responseText);
  }

  return (await response.json()) as T;
}

function asRecord(value: unknown): PrimitiveRecord | null {
  if (!value || Array.isArray(value) || typeof value !== "object") {
    return null;
  }

  return value as PrimitiveRecord;
}

function asArray(value: unknown): unknown[] {
  if (Array.isArray(value)) {
    return value;
  }

  if (!value || typeof value !== "object") {
    return [];
  }

  const record = value as PrimitiveRecord;

  if (Array.isArray(record.items)) {
    return record.items;
  }

  return Object.values(record);
}

function findFirstRecord(value: unknown): PrimitiveRecord | null {
  if (Array.isArray(value)) {
    for (const item of value) {
      const record = asRecord(item);

      if (record) {
        return record;
      }
    }

    return null;
  }

  const directRecord = asRecord(value);

  if (!directRecord) {
    return null;
  }

  const recordValues = Object.values(directRecord);

  for (const item of recordValues) {
    const nestedRecord = asRecord(item);

    if (nestedRecord) {
      return nestedRecord;
    }
  }

  return directRecord;
}

function getByPath(value: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((currentValue, key) => {
    if (!currentValue || typeof currentValue !== "object") {
      return undefined;
    }

    return (currentValue as PrimitiveRecord)[key];
  }, value);
}

function getString(value: unknown, paths: string[], fallback = "Unknown") {
  for (const path of paths) {
    const candidate = getByPath(value, path);

    if (typeof candidate === "string" && candidate.trim()) {
      return candidate.trim();
    }
  }

  return fallback;
}

function getNumber(value: unknown, paths: string[], fallback = 0) {
  for (const path of paths) {
    const candidate = getByPath(value, path);

    if (typeof candidate === "number" && Number.isFinite(candidate)) {
      return candidate;
    }

    if (typeof candidate === "string" && candidate.trim()) {
      const parsed = Number(candidate);

      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }

  return fallback;
}

function getRoundedRating(value: unknown) {
  const rating = getNumber(value, [
    "averageRating",
    "avgRating",
    "rating",
    "proStats.averageRating",
    "stats.averageRating",
  ]);

  return Math.round(rating * 10) / 10;
}

function getDivisionLabel(value: unknown) {
  const division = getNumber(value, [
    "currentDivision",
    "division",
    "curDivision",
    "stats.currentDivision",
  ]);

  if (division <= 0) {
    return "Division Unavailable";
  }

  return `Division ${division}`;
}

function normalizeClub(
  clubId: string,
  platform: string,
  infoPayload: unknown,
  overallPayload: unknown,
): EaClubSummary {
  const info = findFirstRecord(infoPayload);
  const overall = findFirstRecord(overallPayload);

  const name =
    getString(info, ["name", "clubName", "details.name"], "") ||
    getString(overall, ["name", "clubName", "details.name"], "Unknown Club");

  return {
    id: clubId,
    name,
    platform,
    division:
      getString(info, ["division", "currentDivision", "details.division"], "") ||
      getString(overall, ["division", "currentDivision", "details.division"], "Division Unavailable"),
    skillRating: getNumber(
      info ?? overall,
      ["skillRating", "skillPoints", "starRating", "details.skillRating"],
      getNumber(overall, ["skillRating", "skillPoints", "details.skillRating"]),
    ),
    wins: getNumber(overall, ["wins", "overall.wins", "stats.wins"]),
    draws: getNumber(overall, ["draws", "overall.draws", "stats.draws", "ties"]),
    losses: getNumber(overall, ["losses", "overall.losses", "stats.losses"]),
    goalsFor: getNumber(overall, [
      "goals",
      "goalsFor",
      "goalsScored",
      "overall.goals",
      "stats.goals",
    ]),
    goalsAgainst: getNumber(overall, [
      "goalsAgainst",
      "goalsConceded",
      "overall.goalsAgainst",
      "stats.goalsAgainst",
    ]),
    cleanSheets: getNumber(overall, [
      "cleanSheets",
      "overall.cleanSheets",
      "stats.cleanSheets",
    ]),
  };
}

function normalizeSquad(membersPayload: unknown): EaSquadMember[] {
  return asArray(membersPayload)
    .map((member) => {
      const record = asRecord(member);

      if (!record) {
        return null;
      }

      const id =
        getString(record, ["id", "memberId", "proId", "playerId", "name"], "").trim() ||
        crypto.randomUUID();

      return {
        id,
        name: getString(record, [
          "name",
          "proName",
          "playerName",
          "personaName",
          "userClubList.0.name",
        ]),
        position: getString(record, [
          "position",
          "favoritePosition",
          "favPosition",
          "proPos",
        ], "N/A"),
        matches: getNumber(record, [
          "gamesPlayed",
          "matches",
          "appearances",
          "stats.gamesPlayed",
        ]),
        goals: getNumber(record, ["goals", "stats.goals", "proStats.goals"]),
        assists: getNumber(record, [
          "assists",
          "stats.assists",
          "proStats.assists",
        ]),
        rating: getRoundedRating(record),
      };
    })
    .filter((member): member is EaSquadMember => Boolean(member))
    .sort((left, right) => {
      if (right.matches !== left.matches) {
        return right.matches - left.matches;
      }

      return right.rating - left.rating;
    });
}

function normalizeLeaderboardClub(
  platform: EaPlatform,
  value: unknown,
): EaClubSearchResult | null {
  const record = asRecord(value);

  if (!record) {
    return null;
  }

  const id = getString(record, ["clubId", "id", "teamId"], "");
  const name = getString(record, ["clubName", "name", "teamName"], "");

  if (!id || !name) {
    return null;
  }

  const wins = getNumber(record, ["wins", "record.wins", "stats.wins"]);
  const draws = getNumber(record, ["draws", "ties", "record.draws", "stats.draws"]);
  const losses = getNumber(record, ["losses", "record.losses", "stats.losses"]);

  return {
    id,
    name,
    platform,
    division: getDivisionLabel(record),
    skillRating: getNumber(record, [
      "skillRating",
      "skillPoints",
      "stars",
      "record.skillRating",
    ]),
    record: `${wins}W - ${draws}D - ${losses}L`,
  };
}

function dedupeClubSearchResults(results: EaClubSearchResult[]) {
  return Array.from(
    new Map(results.map((entry) => [`${entry.platform}:${entry.id}`, entry])).values(),
  );
}

async function tryEaClubSearchRequest(
  pathname: string,
  platform: EaPlatform,
  query: string,
  parameterName: string,
) {
  try {
    return await fetchEaJson(
      pathname,
      new URLSearchParams({
        platform,
        [parameterName]: query,
      }),
    );
  } catch (error) {
    if (error instanceof EaRequestError && error.status === 400) {
      return null;
    }

    throw error;
  }
}

async function searchEaEndpoint(
  pathname: string,
  platform: EaPlatform,
  query: string,
) {
  const parameterNames = ["query", "clubName", "searchTerm", "term", "name"];

  for (const parameterName of parameterNames) {
    const payload = await tryEaClubSearchRequest(
      pathname,
      platform,
      query,
      parameterName,
    );

    if (payload) {
      return payload;
    }
  }

  return null;
}

export async function searchEaClubs(
  query: string,
  platform: EaPlatform,
): Promise<EaClubSearchResult[]> {
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) {
    return [];
  }

  const [allTimeSearchPayload, currentSeasonSearchPayload] = await Promise.all([
    searchEaEndpoint("/allTimeLeaderboard/search", platform, query),
    searchEaEndpoint("/currentSeasonLeaderboard/search", platform, query),
  ]);

  const results = dedupeClubSearchResults([
    ...asArray(allTimeSearchPayload)
      .map((entry) => normalizeLeaderboardClub(platform, entry))
      .filter((entry): entry is EaClubSearchResult => Boolean(entry)),
    ...asArray(currentSeasonSearchPayload)
      .map((entry) => normalizeLeaderboardClub(platform, entry))
      .filter((entry): entry is EaClubSearchResult => Boolean(entry)),
  ]).filter((entry) =>
    [entry.name, entry.id, entry.division, entry.record]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery),
  );

  return results.slice(0, 24);
}

export async function getEaClubProfile(
  clubId: string,
  platform = DEFAULT_EA_PLATFORM,
): Promise<EaClubProfile> {
  const baseParams = new URLSearchParams({
    platform,
  });

  const [infoPayload, overallPayload, membersPayload] = await Promise.all([
    fetchEaJson("/clubs/info", new URLSearchParams({
      ...Object.fromEntries(baseParams.entries()),
      clubIds: clubId,
    })),
    fetchEaJson("/clubs/overallStats", new URLSearchParams({
      ...Object.fromEntries(baseParams.entries()),
      clubIds: clubId,
    })),
    fetchEaJson("/members/stats", new URLSearchParams({
      ...Object.fromEntries(baseParams.entries()),
      clubId,
    })),
  ]);

  return {
    club: normalizeClub(clubId, platform, infoPayload, overallPayload),
    squad: normalizeSquad(membersPayload),
  };
}
