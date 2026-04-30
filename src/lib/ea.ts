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
const RECENT_PLAYER_MATCH_COUNT = 10;
const RECENT_CLUB_MATCH_SCAN_COUNT = 10;

type PrimitiveRecord = Record<string, unknown>;

export type EaClubSummary = {
  id: string;
  name: string;
  platform: string;
  badgeUrl: string | null;
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
  winRate: number;
  redCards: number;
  tackles: number;
  tackleSuccessRate: number;
  passAccuracy: number;
  manOfTheMatch: number;
};

export type EaPlayerMatch = {
  id: string;
  matchIndex: number;
  opponent: string;
  result: "W" | "D" | "L";
  score: string;
  rating: number;
  goals: number;
  assists: number;
  tackles: number;
  passAccuracy: number;
  redCards: number;
};

export type EaClubRecentMatch = {
  id: string;
  result: "W" | "D" | "L";
  score: string;
  opponent: string;
};

export type EaClubProfile = {
  club: EaClubSummary;
  squad: EaSquadMember[];
  recentMatches: unknown[];
  recentClubMatches: EaClubRecentMatch[];
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
      Referer: "https://www.ea.com/",
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

async function fetchOptionalEaJson<T>(
  pathname: string,
  searchParams: URLSearchParams,
) {
  try {
    return await fetchEaJson<T>(pathname, searchParams);
  } catch {
    return null;
  }
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

  if (Array.isArray(record.members)) {
    return record.members;
  }

  if (Array.isArray(record.clubs)) {
    return record.clubs;
  }

  if (Array.isArray(record.matches)) {
    return record.matches;
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

function getBestNumber(value: unknown, paths: string[], fallback = 0) {
  return paths.reduce((bestValue, path) => {
    const candidate = getNumber(value, [path], Number.NaN);

    if (!Number.isFinite(candidate)) {
      return bestValue;
    }

    return Math.max(bestValue, candidate);
  }, fallback);
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

function getPercentage(numerator: number, denominator: number) {
  if (denominator <= 0) {
    return 0;
  }

  return Math.round((numerator / denominator) * 100);
}

function getClubBadgeUrl(info: PrimitiveRecord | null) {
  const crestAssetId = getString(info, [
    "customKit.crestAssetId",
    "crestAssetId",
    "details.customKit.crestAssetId",
  ], "");

  const badgeId = crestAssetId || getString(info, ["teamId", "TEAM", "details.teamId"], "");

  if (!badgeId) {
    return null;
  }

  return `https://eafc24.content.easports.com/fifa/fltOnlineAssets/24B23FDE-7835-41C2-87A2-F453DFDB2E82/2024/fcweb/crests/256x256/l${badgeId}.png`;
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
    badgeUrl: getClubBadgeUrl(info),
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

function normalizeMember(record: PrimitiveRecord): EaSquadMember {
  const matches = getBestNumber(record, [
    "gamesPlayed",
    "matches",
    "appearances",
    "stats.gamesPlayed",
    "proStats.gamesPlayed",
  ]);
  const wins = getNumber(record, ["wins", "stats.wins", "proStats.wins"]);
  const tackles = getBestNumber(record, [
    "tackles",
    "tacklesMade",
    "stats.tackles",
    "proStats.tackles",
  ]);
  const tacklesWon = getBestNumber(record, [
    "tacklesWon",
    "tackleSuccesses",
    "stats.tacklesWon",
    "proStats.tacklesWon",
  ]);
  const passes = getBestNumber(record, ["passes", "stats.passes", "proStats.passes"]);
  const passesMade = getBestNumber(record, [
    "passesMade",
    "passesCompleted",
    "stats.passesMade",
    "proStats.passesMade",
  ]);
  const id =
    getString(record, ["id", "memberId", "proId", "playerId", "playername", "name"], "").trim() ||
    crypto.randomUUID();

  return {
    id,
    name: getString(record, [
      "name",
      "proName",
      "playerName",
      "playername",
      "personaName",
      "userClubList.0.name",
    ]),
    position: getString(record, [
      "position",
      "favoritePosition",
      "favPosition",
      "proPos",
      "pos",
    ], "N/A"),
    matches,
    goals: getBestNumber(record, ["goals", "stats.goals", "proStats.goals"]),
    assists: getBestNumber(record, [
      "assists",
      "stats.assists",
      "proStats.assists",
    ]),
    rating: getRoundedRating(record),
    winRate: getPercentage(wins, matches),
    redCards: getBestNumber(record, [
      "redCards",
      "redcards",
      "stats.redCards",
      "proStats.redCards",
    ]),
    tackles,
    tackleSuccessRate: getPercentage(tacklesWon, tackles),
    passAccuracy: getPercentage(passesMade, passes),
    manOfTheMatch: getBestNumber(record, [
      "manOfTheMatch",
      "motm",
      "mom",
      "stats.manOfTheMatch",
      "proStats.manOfTheMatch",
    ]),
  };
}

function mergeSquadMembers(members: EaSquadMember[]) {
  const membersByKey = new Map<string, EaSquadMember>();

  for (const member of members) {
    const key = `${member.id}:${member.name}`.toLowerCase();
    const existing = membersByKey.get(key);

    if (!existing) {
      membersByKey.set(key, member);
      continue;
    }

    membersByKey.set(key, {
      ...existing,
      name: existing.name !== "Unknown" ? existing.name : member.name,
      position: existing.position !== "N/A" ? existing.position : member.position,
      matches: Math.max(existing.matches, member.matches),
      goals: Math.max(existing.goals, member.goals),
      assists: Math.max(existing.assists, member.assists),
      rating: Math.max(existing.rating, member.rating),
      winRate: Math.max(existing.winRate, member.winRate),
      redCards: Math.max(existing.redCards, member.redCards),
      tackles: Math.max(existing.tackles, member.tackles),
      tackleSuccessRate: Math.max(existing.tackleSuccessRate, member.tackleSuccessRate),
      passAccuracy: Math.max(existing.passAccuracy, member.passAccuracy),
      manOfTheMatch: Math.max(existing.manOfTheMatch, member.manOfTheMatch),
    });
  }

  return Array.from(membersByKey.values());
}

function normalizeSquad(...membersPayloads: unknown[]): EaSquadMember[] {
  const members = membersPayloads.flatMap((membersPayload) =>
    asArray(membersPayload)
      .map((member) => {
        const record = asRecord(member);

        if (!record) {
          return null;
        }

        return normalizeMember(record);
      })
      .filter((member): member is EaSquadMember => Boolean(member)),
  );

  return mergeSquadMembers(members).sort((left, right) => {
    if (right.matches !== left.matches) {
      return right.matches - left.matches;
    }

    return right.rating - left.rating;
  });
}

function normalizePlayerRecentMatches(
  matchesPayload: unknown,
  clubId: string,
  playerId: string,
  playerName: string,
): EaPlayerMatch[] {
  return asArray(matchesPayload)
    .slice(0, RECENT_CLUB_MATCH_SCAN_COUNT)
    .map((match, index) => {
      const record = asRecord(match);

      if (!record) {
        return null;
      }

      const clubs = asRecord(record.clubs);
      const players = asRecord(record.players);
      const ourClub = asRecord(clubs?.[clubId]);
      const ourPlayers = asRecord(players?.[clubId]);
      const playerRecord =
        asRecord(ourPlayers?.[playerId]) ??
        asArray(ourPlayers).map(asRecord).find((candidate) => {
          if (!candidate) {
            return false;
          }

          return getString(candidate, ["playername", "name", "playerName"], "")
            .toLowerCase() === playerName.toLowerCase();
        });

      if (!clubs || !ourClub || !playerRecord) {
        return null;
      }

      const opponentEntry = Object.entries(clubs).find(([entryClubId]) => entryClubId !== clubId);
      const opponent = asRecord(opponentEntry?.[1]);
      const ourScore = getNumber(ourClub, ["score"]);
      const opponentScore = getNumber(opponent, ["score"]);
      const result =
        getNumber(ourClub, ["wins"]) > 0
          ? "W"
          : getNumber(ourClub, ["ties", "draws"]) > 0
            ? "D"
            : "L";

      return {
        id: getString(record, ["matchId", "id", "timestamp"], crypto.randomUUID()),
        matchIndex: RECENT_CLUB_MATCH_SCAN_COUNT - index,
        opponent: getString(opponent, ["details.name", "name", "clubName"], "Unknown Club"),
        result,
        score: `${ourScore}-${opponentScore}`,
        rating: getRoundedRating(playerRecord),
        goals: getNumber(playerRecord, ["goals"]),
        assists: getNumber(playerRecord, ["assists"]),
        tackles: getNumber(playerRecord, ["tackles"]),
        passAccuracy: getNumber(
          playerRecord,
          ["passAccuracy"],
          getPercentage(
            getNumber(playerRecord, ["passesmade", "passesMade"]),
            getNumber(playerRecord, ["passes"]),
          ),
        ),
        redCards: getNumber(playerRecord, ["redcards", "redCards"]),
      };
    })
    .filter((match): match is EaPlayerMatch => Boolean(match))
    .slice(0, RECENT_PLAYER_MATCH_COUNT);
}

function normalizeClubRecentMatches(
  matchesPayload: unknown,
  clubId: string,
): EaClubRecentMatch[] {
  return asArray(matchesPayload)
    .slice(0, RECENT_CLUB_MATCH_SCAN_COUNT)
    .map((match) => {
      const record = asRecord(match);

      if (!record) {
        return null;
      }

      const clubs = asRecord(record.clubs);
      const ourClub = asRecord(clubs?.[clubId]);

      if (!clubs || !ourClub) {
        return null;
      }

      const opponentEntry = Object.entries(clubs).find(([entryClubId]) => entryClubId !== clubId);
      const opponent = asRecord(opponentEntry?.[1]);
      const ourScore = getNumber(ourClub, ["score"]);
      const opponentScore = getNumber(opponent, ["score"]);
      const result =
        getNumber(ourClub, ["wins"]) > 0
          ? "W"
          : getNumber(ourClub, ["ties", "draws"]) > 0
            ? "D"
            : "L";

      return {
        id: getString(record, ["matchId", "id", "timestamp"], crypto.randomUUID()),
        result,
        score: `${ourScore}-${opponentScore}`,
        opponent: getString(opponent, ["details.name", "name", "clubName"], "Unknown Club"),
      };
    })
    .filter((match): match is EaClubRecentMatch => Boolean(match));
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

  const [infoPayload, overallPayload, membersPayload, careerMembersPayload, recentMatchesPayload] = await Promise.all([
    fetchEaJson("/clubs/info", new URLSearchParams({
      ...Object.fromEntries(baseParams.entries()),
      clubIds: clubId,
    })),
    fetchEaJson("/clubs/overallStats", new URLSearchParams({
      ...Object.fromEntries(baseParams.entries()),
      clubIds: clubId,
    })),
    fetchOptionalEaJson("/members/stats", new URLSearchParams({
      ...Object.fromEntries(baseParams.entries()),
      clubId,
    })),
    fetchOptionalEaJson("/members/career/stats", new URLSearchParams({
      ...Object.fromEntries(baseParams.entries()),
      clubId,
    })),
    fetchOptionalEaJson("/clubs/matches", new URLSearchParams({
      ...Object.fromEntries(baseParams.entries()),
      clubIds: clubId,
      matchType: "leagueMatch",
      maxResultCount: String(RECENT_CLUB_MATCH_SCAN_COUNT),
    })),
  ]);

  return {
    club: normalizeClub(clubId, platform, infoPayload, overallPayload),
    squad: normalizeSquad(careerMembersPayload, membersPayload),
    recentMatches: asArray(recentMatchesPayload),
    recentClubMatches: normalizeClubRecentMatches(recentMatchesPayload, clubId),
  };
}

export async function getEaPlayerProfile(
  clubId: string,
  playerId: string,
  platform = DEFAULT_EA_PLATFORM,
) {
  const profile = await getEaClubProfile(clubId, platform);
  const player = profile.squad.find((member) => member.id === playerId);

  return {
    club: profile.club,
    player: player ?? null,
    recentMatches: player
      ? normalizePlayerRecentMatches(
          profile.recentMatches,
          clubId,
          playerId,
          player.name,
        )
      : [],
  };
}
