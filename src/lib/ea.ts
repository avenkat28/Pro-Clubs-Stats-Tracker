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
const RECENT_PLAYER_MATCH_COUNT = 10;
const RECENT_CLUB_MATCH_SCAN_COUNT = 10;
const DEFAULT_EA_API_HOST = "proclubs.ea.com";
const ALLOWED_EA_API_HOSTS = new Set([DEFAULT_EA_API_HOST]);
const EA_CLUB_ID_PATTERN = /^\d{1,20}$/;
const EA_ROUTE_ID_PATTERN = /^[\w .@+-]{1,128}$/;
const MAX_EA_SEARCH_QUERY_LENGTH = 80;
const EA_NATIONALITIES: Record<string, { name: string; flag: string }> = {
  "1": { name: "Albania", flag: "🇦🇱" },
  "3": { name: "Armenia", flag: "🇦🇲" },
  "4": { name: "Austria", flag: "🇦🇹" },
  "5": { name: "Azerbaijan", flag: "🇦🇿" },
  "6": { name: "Belarus", flag: "🇧🇾" },
  "7": { name: "Belgium", flag: "🇧🇪" },
  "8": { name: "Bosnia Herzegovina", flag: "🇧🇦" },
  "9": { name: "Bulgaria", flag: "🇧🇬" },
  "10": { name: "Croatia", flag: "🇭🇷" },
  "11": { name: "Cyprus", flag: "🇨🇾" },
  "12": { name: "Czech Republic", flag: "🇨🇿" },
  "13": { name: "Denmark", flag: "🇩🇰" },
  "14": { name: "England", flag: "🏴" },
  "15": { name: "Montenegro", flag: "🇲🇪" },
  "16": { name: "Faroe Islands", flag: "🇫🇴" },
  "17": { name: "Finland", flag: "🇫🇮" },
  "18": { name: "France", flag: "🇫🇷" },
  "19": { name: "North Macedonia", flag: "🇲🇰" },
  "20": { name: "Georgia", flag: "🇬🇪" },
  "21": { name: "Germany", flag: "🇩🇪" },
  "22": { name: "Greece", flag: "🇬🇷" },
  "23": { name: "Hungary", flag: "🇭🇺" },
  "24": { name: "Iceland", flag: "🇮🇸" },
  "25": { name: "Republic of Ireland", flag: "🇮🇪" },
  "26": { name: "Israel", flag: "🇮🇱" },
  "27": { name: "Italy", flag: "🇮🇹" },
  "28": { name: "Latvia", flag: "🇱🇻" },
  "29": { name: "Liechtenstein", flag: "🇱🇮" },
  "30": { name: "Lithuania", flag: "🇱🇹" },
  "31": { name: "Luxembourg", flag: "🇱🇺" },
  "32": { name: "Malta", flag: "🇲🇹" },
  "33": { name: "Moldova", flag: "🇲🇩" },
  "34": { name: "Netherlands", flag: "🇳🇱" },
  "35": { name: "Northern Ireland", flag: "🇬🇧" },
  "36": { name: "Norway", flag: "🇳🇴" },
  "37": { name: "Poland", flag: "🇵🇱" },
  "38": { name: "Portugal", flag: "🇵🇹" },
  "39": { name: "Romania", flag: "🇷🇴" },
  "40": { name: "Russia", flag: "🇷🇺" },
  "41": { name: "San Marino", flag: "🇸🇲" },
  "42": { name: "Scotland", flag: "🏴" },
  "43": { name: "Slovakia", flag: "🇸🇰" },
  "44": { name: "Slovenia", flag: "🇸🇮" },
  "45": { name: "Spain", flag: "🇪🇸" },
  "46": { name: "Sweden", flag: "🇸🇪" },
  "47": { name: "Switzerland", flag: "🇨🇭" },
  "48": { name: "Turkey", flag: "🇹🇷" },
  "49": { name: "Ukraine", flag: "🇺🇦" },
  "50": { name: "Wales", flag: "🏴" },
  "51": { name: "Serbia", flag: "🇷🇸" },
  "52": { name: "Argentina", flag: "🇦🇷" },
  "53": { name: "Bolivia", flag: "🇧🇴" },
  "54": { name: "Brazil", flag: "🇧🇷" },
  "55": { name: "Chile", flag: "🇨🇱" },
  "56": { name: "Colombia", flag: "🇨🇴" },
  "57": { name: "Ecuador", flag: "🇪🇨" },
  "58": { name: "Paraguay", flag: "🇵🇾" },
  "59": { name: "Peru", flag: "🇵🇪" },
  "60": { name: "Uruguay", flag: "🇺🇾" },
  "61": { name: "Venezuela", flag: "🇻🇪" },
  "63": { name: "Antigua & Barbuda", flag: "🇦🇬" },
  "64": { name: "Aruba", flag: "🇦🇼" },
  "66": { name: "Barbados", flag: "🇧🇧" },
  "67": { name: "Belize", flag: "🇧🇿" },
  "68": { name: "Bermuda", flag: "🇧🇲" },
  "70": { name: "Canada", flag: "🇨🇦" },
  "72": { name: "Costa Rica", flag: "🇨🇷" },
  "73": { name: "Cuba", flag: "🇨🇺" },
  "76": { name: "El Salvador", flag: "🇸🇻" },
  "77": { name: "Grenada", flag: "🇬🇩" },
  "78": { name: "Guatemala", flag: "🇬🇹" },
  "79": { name: "Guyana", flag: "🇬🇾" },
  "80": { name: "Haiti", flag: "🇭🇹" },
  "81": { name: "Honduras", flag: "🇭🇳" },
  "82": { name: "Jamaica", flag: "🇯🇲" },
  "83": { name: "Mexico", flag: "🇲🇽" },
  "84": { name: "Montserrat", flag: "🇲🇸" },
  "85": { name: "Curacao", flag: "🇨🇼" },
  "87": { name: "Panama", flag: "🇵🇦" },
  "88": { name: "Puerto Rico", flag: "🇵🇷" },
  "89": { name: "St Kitts Nevis", flag: "🇰🇳" },
  "90": { name: "St Lucia", flag: "🇱🇨" },
  "91": { name: "St Vincent Grenadine", flag: "🇻🇨" },
  "92": { name: "Suriname", flag: "🇸🇷" },
  "93": { name: "Trinidad & Tobago", flag: "🇹🇹" },
  "95": { name: "United States", flag: "🇺🇸" },
  "97": { name: "Algeria", flag: "🇩🇿" },
  "98": { name: "Angola", flag: "🇦🇴" },
  "99": { name: "Benin", flag: "🇧🇯" },
  "101": { name: "Burkina Faso", flag: "🇧🇫" },
  "103": { name: "Cameroon", flag: "🇨🇲" },
  "104": { name: "Cape Verde", flag: "🇨🇻" },
  "105": { name: "Central African Republic", flag: "🇨🇫" },
  "106": { name: "Chad", flag: "🇹🇩" },
  "107": { name: "Congo", flag: "🇨🇬" },
  "108": { name: "Ivory Coast", flag: "🇨🇮" },
  "110": { name: "DR Congo", flag: "🇨🇩" },
  "111": { name: "Egypt", flag: "🇪🇬" },
  "112": { name: "Equatorial Guinea", flag: "🇬🇶" },
  "113": { name: "Eritrea", flag: "🇪🇷" },
  "114": { name: "Ethiopia", flag: "🇪🇹" },
  "115": { name: "Gabon", flag: "🇬🇦" },
  "116": { name: "Gambia", flag: "🇬🇲" },
  "117": { name: "Ghana", flag: "🇬🇭" },
  "118": { name: "Guinea", flag: "🇬🇳" },
  "119": { name: "Guinea Bissau", flag: "🇬🇼" },
  "120": { name: "Kenya", flag: "🇰🇪" },
  "122": { name: "Liberia", flag: "🇱🇷" },
  "123": { name: "Libya", flag: "🇱🇾" },
  "124": { name: "Madagascar", flag: "🇲🇬" },
  "126": { name: "Mali", flag: "🇲🇱" },
  "127": { name: "Mauritania", flag: "🇲🇷" },
  "128": { name: "Mauritius", flag: "🇲🇺" },
  "129": { name: "Morocco", flag: "🇲🇦" },
  "130": { name: "Mozambique", flag: "🇲🇿" },
  "131": { name: "Namibia", flag: "🇳🇦" },
  "132": { name: "Niger", flag: "🇳🇪" },
  "133": { name: "Nigeria", flag: "🇳🇬" },
  "135": { name: "Sao Tome & Principe", flag: "🇸🇹" },
  "136": { name: "Senegal", flag: "🇸🇳" },
  "138": { name: "Sierra Leone", flag: "🇸🇱" },
  "139": { name: "Somalia", flag: "🇸🇴" },
  "140": { name: "South Africa", flag: "🇿🇦" },
  "141": { name: "Sudan", flag: "🇸🇩" },
  "143": { name: "Tanzania", flag: "🇹🇿" },
  "144": { name: "Togo", flag: "🇹🇬" },
  "145": { name: "Tunisia", flag: "🇹🇳" },
  "146": { name: "Uganda", flag: "🇺🇬" },
  "147": { name: "Zambia", flag: "🇿🇲" },
  "148": { name: "Zimbabwe", flag: "🇿🇼" },
  "149": { name: "Afghanistan", flag: "🇦🇫" },
  "155": { name: "China PR", flag: "🇨🇳" },
  "157": { name: "Guam", flag: "🇬🇺" },
  "159": { name: "India", flag: "🇮🇳" },
  "161": { name: "Iran", flag: "🇮🇷" },
  "162": { name: "Iraq", flag: "🇮🇶" },
  "163": { name: "Japan", flag: "🇯🇵" },
  "165": { name: "Kazakhstan", flag: "🇰🇿" },
  "166": { name: "Korea DPR", flag: "🇰🇵" },
  "167": { name: "Korea Republic", flag: "🇰🇷" },
  "168": { name: "Kuwait", flag: "🇰🇼" },
  "169": { name: "Kyrgyzstan", flag: "🇰🇬" },
  "171": { name: "Lebanon", flag: "🇱🇧" },
  "178": { name: "Oman", flag: "🇴🇲" },
  "180": { name: "Palestine", flag: "🇵🇸" },
  "181": { name: "Philippines", flag: "🇵🇭" },
  "182": { name: "Qatar", flag: "🇶🇦" },
  "183": { name: "Saudi Arabia", flag: "🇸🇦" },
  "186": { name: "Syria", flag: "🇸🇾" },
  "187": { name: "Tajikistan", flag: "🇹🇯" },
  "191": { name: "Uzbekistan", flag: "🇺🇿" },
  "192": { name: "Vietnam", flag: "🇻🇳" },
  "195": { name: "Australia", flag: "🇦🇺" },
  "197": { name: "Fiji", flag: "🇫🇯" },
  "198": { name: "New Zealand", flag: "🇳🇿" },
  "199": { name: "Papua New Guinea", flag: "🇵🇬" },
  "205": { name: "Gibraltar", flag: "🇬🇮" },
  "207": { name: "Dominican Republic", flag: "🇩🇴" },
  "208": { name: "Estonia", flag: "🇪🇪" },
  "213": { name: "Chinese Taipei", flag: "🇹🇼" },
  "214": { name: "Comoros", flag: "🇰🇲" },
  "215": { name: "New Caledonia", flag: "🇳🇨" },
  "219": { name: "Kosovo", flag: "🇽🇰" },
};

const NATIONALITY_ALIASES: Record<string, string> = {
  "antigua and barbuda": "Antigua & Barbuda",
  "bosnia and herzegovina": "Bosnia Herzegovina",
  "cape verde islands": "Cape Verde",
  "central african rep.": "Central African Republic",
  "china": "China PR",
  "chinese taipei": "Chinese Taipei",
  "cote d'ivoire": "Ivory Coast",
  "côte d'ivoire": "Ivory Coast",
  "curacao": "Curacao",
  "czechia": "Czech Republic",
  "democratic republic of the congo": "DR Congo",
  "fyr macedonia": "North Macedonia",
  "guinea-bissau": "Guinea Bissau",
  "ivory coast": "Ivory Coast",
  "north korea": "Korea DPR",
  "republic of ireland": "Republic of Ireland",
  "republic of the congo": "Congo",
  "russia": "Russia",
  "sao tome and principe": "Sao Tome & Principe",
  "sao tomé & príncipe": "Sao Tome & Principe",
  "south korea": "Korea Republic",
  "st kitts and nevis": "St Kitts Nevis",
  "st lucia": "St Lucia",
  "st vincent and the grenadines": "St Vincent Grenadine",
  "trinidad and tobago": "Trinidad & Tobago",
  "turkiye": "Turkey",
  "united states of america": "United States",
  "usa": "United States",
};

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
  appearanceBreakdown: EaClubAppearanceBreakdown;
};

export type EaClubAppearanceBreakdown = {
  total: number;
  league: number;
  playoff: number;
  bestPlayoffFinish: {
    badgeLevel: number | null;
    label: string;
  };
};

export type EaSquadMember = {
  id: string;
  name: string;
  position: string;
  height: string | null;
  nationality: string | null;
  overall: number;
  matches: number;
  goals: number;
  assists: number;
  shots: number;
  shotSuccessRate: number;
  saves: number;
  saveSuccessRate: number;
  goalsAgainst: number;
  cleanSheets: number;
  rating: number;
  winRate: number;
  redCards: number;
  tackles: number;
  tackleSuccessRate: number;
  passesMade: number;
  passAttempts: number;
  passAccuracy: number;
  manOfTheMatch: number;
  manOfTheMatchRate: number;
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
  shots: number;
  shotSuccessRate: number;
  tackles: number;
  tackleAttempts: number;
  tacklesMade: number;
  tackleSuccessRate: number;
  passesMade: number;
  passAttempts: number;
  passAccuracy: number;
  manOfTheMatch: boolean;
  redCards: number;
};

export type EaClubRecentMatch = {
  id: string;
  matchType: "league" | "playoff";
  result: "W" | "D" | "L";
  score: string;
  opponent: string;
  goalsFor: number;
  goalsAgainst: number;
  players: EaClubMatchPlayer[];
  opponentPlayers: EaClubMatchPlayer[];
  stats: EaClubMatchStats;
  opponentStats: EaClubMatchStats;
  formation: EaClubFormation;
  opponentFormation: EaClubFormation;
};

export type EaClubMatchPlayer = {
  id: string;
  name: string;
  position: string;
  rating: number;
  goals: number;
  assists: number;
  shots: number;
  passesMade: number;
  passAttempts: number;
  passAccuracy: number;
  tacklesMade: number;
  tackleAttempts: number;
  tackleSuccessRate: number;
  saves: number;
  redCards: number;
  manOfTheMatch: boolean;
};

export type EaClubMatchStats = {
  goals: number;
  shots: number;
  shotAccuracy: number;
  passesMade: number;
  passAttempts: number;
  passAccuracy: number;
  tacklesMade: number;
  tackleAttempts: number;
  tackleSuccessRate: number;
  saves: number;
  redCards: number;
  averageRating: number;
};

export type EaClubFormation = {
  label: string;
  goalkeeper: number;
  defender: number;
  midfielder: number;
  forward: number;
};

export type EaClubProfile = {
  club: EaClubSummary;
  squad: EaSquadMember[];
  recentMatches: unknown[];
  recentClubMatches: EaClubRecentMatch[];
};

export type EaFullClubData = {
  clubId: string;
  platform: EaPlatform;
  overallStats: unknown;
  memberStats: {
    members: unknown[];
    positionCount: Record<"goalkeeper" | "defender" | "midfielder" | "forward", number>;
  };
  matches: {
    league: unknown[];
    playoff: unknown[];
    friendly: unknown[];
  };
  clubInfoData: Record<string, unknown>;
};

export function isEaPlatform(value: string | undefined | null): value is EaPlatform {
  return Boolean(value && eaPlatforms.includes(value as EaPlatform));
}

function getEaApiBaseUrl() {
  let url: URL;

  try {
    url = new URL(DEFAULT_EA_API_BASE_URL);
  } catch {
    throw new Error("EA_API_BASE_URL must be a valid absolute URL.");
  }

  if (url.protocol !== "https:" || !ALLOWED_EA_API_HOSTS.has(url.hostname)) {
    throw new Error(
      `EA_API_BASE_URL must use HTTPS and point to ${DEFAULT_EA_API_HOST}.`,
    );
  }

  return `${url.origin}${url.pathname.replace(/\/$/, "")}`;
}

export function normalizeEaPlatform(value: string | undefined | null): EaPlatform {
  return isEaPlatform(value) ? value : "common-gen5";
}

export function normalizeEaClubId(value: string) {
  const normalizedValue = value.trim();

  if (!EA_CLUB_ID_PATTERN.test(normalizedValue)) {
    throw new Error("Club ID must be numeric and 20 digits or fewer.");
  }

  return normalizedValue;
}

export function normalizeEaRouteId(value: string, label = "ID") {
  const normalizedValue = value.trim();

  if (!EA_ROUTE_ID_PATTERN.test(normalizedValue)) {
    throw new Error(`${label} contains unsupported characters or is too long.`);
  }

  return normalizedValue;
}

export function normalizeEaSearchQuery(value: string) {
  return value.trim().slice(0, MAX_EA_SEARCH_QUERY_LENGTH);
}

export type EaClubSearchResult = {
  id: string;
  name: string;
  platform: EaPlatform;
  skillRating: number;
  division: string;
  record: string;
};

export type EaLeaderboardPlatformLabel = "Gen5" | "Old Gen" | "Switch";
export type EaLeaderboardRegion = "Worldwide" | "NA" | "EU";

export type EaLeaderboardClub = {
  id: string;
  rank: number;
  name: string;
  division: string;
  platform: EaLeaderboardPlatformLabel;
  region: EaLeaderboardRegion;
  games: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  cleanSheets: number;
  skillRating: number;
};

export type EaLeaderboardPlayer = {
  id: string;
  clubId: string;
  rank: number;
  name: string;
  club: string;
  position: string;
  platform: EaLeaderboardPlatformLabel;
  region: EaLeaderboardRegion;
  games: number;
  goals: number;
  assists: number;
  rating: number;
  winRate: number;
  redCards: number;
  tackles: number;
  tackleRate: number;
};

export type EaLeaderboards = {
  clubs: EaLeaderboardClub[];
  players: EaLeaderboardPlayer[];
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
  return `${getEaApiBaseUrl()}${pathname}?${searchParams.toString()}`;
}

async function fetchEaJson<T>(pathname: string, searchParams: URLSearchParams) {
  const url = createEaUrl(pathname, searchParams);
  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Language": "en-US,en;q=0.9",
      Origin: "https://www.ea.com",
      Referer: "https://www.ea.com/",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
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

    return Number.isFinite(bestValue) ? Math.max(bestValue, candidate) : candidate;
  }, fallback);
}

function getRoundedRating(value: unknown) {
  const rating = getNumber(value, [
    "averageRating",
    "avgRating",
    "ratingAve",
    "rating",
    "proStats.averageRating",
    "proStats.ratingAve",
    "stats.averageRating",
    "stats.ratingAve",
  ]);

  return Math.round(rating * 10) / 10;
}

function getOverall(value: unknown) {
  return Math.round(
    getBestNumber(value, [
      "overall",
      "ovr",
      "overallRating",
      "ratingOverall",
      "proOverall",
      "pro.overall",
      "pro.ovr",
      "pro.overallRating",
      "avatar.overall",
      "avatar.ovr",
      "attributes.overall",
      "stats.overall",
      "stats.ovr",
      "proStats.overall",
      "proStats.ovr",
    ]),
  );
}

function getBestPlayoffFinish(value: unknown) {
  const finishText = getString(value, [
    "bestPlayoffFinish",
    "bestFinish",
    "playoffBestFinish",
    "highestPlayoffFinish",
    "playoffs.bestFinish",
    "playoffs.bestPlayoffFinish",
    "stats.bestPlayoffFinish",
    "stats.playoffBestFinish",
    "title",
    "name",
  ], "");

  const finishGroup = getNumber(value, [
    "bestFinishGroup",
    "finishGroup",
    "playoffFinishGroup",
    "stats.bestFinishGroup",
  ]);
  const finishGroupLabels: Record<number, string> = {
    1: "Champion",
    2: "Finalist",
    3: "Semi-Finalist",
    4: "Quarter-Finalist",
    5: "Knockout Qualifier",
    6: "Participant",
  };

  const finishNumber = getBestNumber(value, [
    "bestPlayoffDivision",
    "bestDivision",
    "highestDivision",
    "playoffDivision",
    "playoffs.bestDivision",
    "stats.bestPlayoffDivision",
    "stats.playoffDivision",
  ]);
  const badgeLevel =
    finishGroup > 0
      ? Math.max(1, 8 - finishGroup)
      : finishNumber > 0
        ? finishNumber
        : null;

  return {
    badgeLevel,
    label: finishText || finishGroupLabels[finishGroup] || "N/A",
  };
}

function getPercentage(numerator: number, denominator: number) {
  if (denominator <= 0) {
    return 0;
  }

  return Math.round((numerator / denominator) * 100);
}

function getLeaderboardPlatformLabel(
  platform: EaPlatform,
): EaLeaderboardPlatformLabel {
  if (platform === "common-gen4") {
    return "Old Gen";
  }

  if (platform === "nx") {
    return "Switch";
  }

  return "Gen5";
}

function getShotSuccessRate(value: unknown, goals: number, shots: number) {
  const directShotSuccessRate = getNumber(
    value,
    [
      "shotSuccessRate",
      "shotConversionRate",
      "conversionRate",
      "shotAccuracy",
      "stats.shotSuccessRate",
      "stats.shotConversionRate",
      "stats.conversionRate",
      "stats.shotAccuracy",
      "proStats.shotSuccessRate",
      "proStats.shotConversionRate",
      "proStats.conversionRate",
      "proStats.shotAccuracy",
    ],
    Number.NaN,
  );

  if (Number.isFinite(directShotSuccessRate)) {
    return Math.round(directShotSuccessRate);
  }

  return getPercentage(goals, shots);
}

function getHeight(value: unknown) {
  const heightText = getString(value, [
    "height",
    "heightFormatted",
    "proHeight",
    "avatar.height",
    "pro.height",
    "stats.height",
    "proStats.height",
  ], "");

  if (heightText) {
    const numericHeight = Number(heightText);

    if (Number.isFinite(numericHeight) && numericHeight > 0) {
      return `${Math.round(numericHeight)} cm`;
    }

    return heightText;
  }

  const heightCm = getNumber(value, [
    "heightCm",
    "heightCM",
    "heightCentimeters",
    "proHeightCm",
    "avatar.heightCm",
    "pro.heightCm",
    "stats.heightCm",
    "proStats.heightCm",
  ]);

  if (heightCm > 0) {
    return `${Math.round(heightCm)} cm`;
  }

  const heightInches = getNumber(value, [
    "heightInches",
    "heightIn",
    "proHeightInches",
    "avatar.heightInches",
    "pro.heightInches",
  ]);

  if (heightInches > 0) {
    const feet = Math.floor(heightInches / 12);
    const inches = Math.round(heightInches % 12);

    return `${feet}'${inches}\"`;
  }

  return null;
}

function normalizeNationalityKey(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and")
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ");
}

function getNationalityByName(value: string) {
  const normalizedValue = normalizeNationalityKey(value);
  const alias = NATIONALITY_ALIASES[normalizedValue];
  const nationalities = Object.values(EA_NATIONALITIES);
  const nationality = nationalities.find(
    (entry) =>
      normalizeNationalityKey(entry.name) === normalizedValue ||
      (alias && entry.name === alias),
  );

  return nationality ? `${nationality.flag} ${nationality.name}` : null;
}

function getNationality(value: unknown) {
  const nationality = getString(value, [
    "nationality",
    "nation",
    "country",
    "countryName",
    "nationalityName",
    "proNationality",
    "avatar.nationality",
    "avatar.country",
    "pro.nationality",
    "pro.country",
    "stats.nationality",
    "proStats.nationality",
  ], "");
  const eaNationality = EA_NATIONALITIES[nationality];

  if (eaNationality) {
    return `${eaNationality.flag} ${eaNationality.name}`;
  }

  return getNationalityByName(nationality) ?? (nationality || null);
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

export function formatDivisionLabel(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) {
    return value === 1 ? "Elite Division" : value <= 6 ? `Division ${value - 1}` : `Division ${value}`;
  }

  if (typeof value !== "string") {
    return "";
  }

  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return "";
  }

  const numericValue = Number(normalizedValue);

  if (Number.isFinite(numericValue) && numericValue > 0) {
    return numericValue === 1
      ? "Elite Division"
      : numericValue <= 6
        ? `Division ${numericValue - 1}`
        : `Division ${numericValue}`;
  }

  const divisionMatch = normalizedValue.match(/\bdivision\s+(\d+)\b/i);

  if (divisionMatch) {
    const divisionNumber = Number(divisionMatch[1]);
    return divisionNumber === 1
      ? "Elite Division"
      : divisionNumber <= 6
        ? `Division ${divisionNumber - 1}`
        : `Division ${divisionNumber}`;
  }

  if (/elite/i.test(normalizedValue)) {
    return "Elite Division";
  }

  return normalizedValue;
}

function getDivisionFromPaths(value: unknown, paths: string[]) {
  for (const path of paths) {
    const label = formatDivisionLabel(getByPath(value, path));

    if (label) {
      return label;
    }
  }

  return "";
}

function getDivisionLabel(value: unknown) {
  const division = getDivisionFromPaths(value, [
    "currentDivision",
    "division",
    "curDivision",
    "details.currentDivision",
    "details.division",
    "details.curDivision",
    "record.currentDivision",
    "record.division",
    "stats.currentDivision",
    "stats.division",
    "season.currentDivision",
    "season.division",
  ]);

  return division || "Division Unavailable";
}

function getBestDivisionLabel(value: unknown) {
  return getDivisionFromPaths(value, [
    "bestDivision",
    "highestDivision",
    "details.bestDivision",
    "record.bestDivision",
    "stats.bestDivision",
  ]);
}

function getCurrentDivisionLabel(value: unknown) {
  return getDivisionFromPaths(value, [
    "currentDivision",
    "curDivision",
    "division",
    "details.currentDivision",
    "details.curDivision",
    "details.division",
    "record.currentDivision",
    "record.curDivision",
    "record.division",
    "stats.currentDivision",
    "stats.curDivision",
    "stats.division",
    "season.currentDivision",
    "season.curDivision",
    "season.division",
  ]);
}

function getSkillRatingValue(value: unknown) {
  return getNumber(value, [
    "skillRating",
    "skillPoints",
    "starRating",
    "details.skillRating",
    "record.skillRating",
  ]);
}

function normalizeClub(
  clubId: string,
  platform: string,
  infoPayload: unknown,
  overallPayload: unknown,
  playoffPayload: unknown,
  currentSeasonPayload?: unknown,
): EaClubSummary {
  const info = findFirstRecord(infoPayload);
  const overall = findFirstRecord(overallPayload);
  const playoff = findFirstRecord(playoffPayload);
  const currentSeason =
    asRecord(currentSeasonPayload) ?? findFirstRecord(currentSeasonPayload);

  const name =
    getString(info, ["name", "clubName", "details.name"], "") ||
    getString(overall, ["name", "clubName", "details.name"], "Unknown Club");

  const wins = getNumber(overall, ["wins", "overall.wins", "stats.wins"]);
  const draws = getNumber(overall, ["draws", "overall.draws", "stats.draws", "ties"]);
  const losses = getNumber(overall, ["losses", "overall.losses", "stats.losses"]);
  const goalsFor = getNumber(overall, [
    "goals",
    "goalsFor",
    "goalsScored",
    "overall.goals",
    "stats.goals",
  ]);
  const goalsAgainst = getNumber(overall, [
    "goalsAgainst",
    "goalsConceded",
    "overall.goalsAgainst",
    "stats.goalsAgainst",
  ]);
  const matches = wins + draws + losses;
  const playoffAppearances = getBestNumber(overall ?? playoff, [
    "gamesPlayedPlayoff",
    "playoffAppearances",
    "playoffMatches",
    "playoffGames",
    "stats.gamesPlayedPlayoff",
    "playoffsAppearances",
    "stats.playoffAppearances",
    "stats.playoffMatches",
    "stats.playoffGames",
    "playoff.appearances",
    "playoff.matches",
    "playoff.games",
    "playoffs.appearances",
    "playoffs.matches",
    "playoffs.games",
  ]);
  const leagueAppearances = getBestNumber(overall, [
    "leagueAppearances",
    "leagueMatches",
    "leagueGames",
    "stats.leagueAppearances",
    "stats.leagueMatches",
    "stats.leagueGames",
    "league.appearances",
    "league.matches",
    "league.games",
  ]);
  const bestPlayoffFinish = getBestPlayoffFinish(playoff ?? overall);
  const normalizedLeagueAppearances =
    leagueAppearances > 0
      ? Math.min(leagueAppearances, matches)
      : Math.max(0, matches - Math.min(playoffAppearances, matches));
  const normalizedPlayoffAppearances =
    playoffAppearances > 0
      ? Math.min(playoffAppearances, matches)
      : Math.max(0, matches - normalizedLeagueAppearances);
  const extractedCleanSheets = Math.max(
    getBestNumber(overall, [
      "cleanSheets",
      "cleansheets",
      "cleanSheet",
      "shutouts",
      "overall.cleanSheets",
      "stats.cleanSheets",
      "stats.cleansheets",
      "stats.cleanSheet",
      "stats.shutouts",
    ]),
    getBestNumber(currentSeason, [
      "cleanSheets",
      "cleansheets",
      "cleanSheet",
      "shutouts",
      "record.cleanSheets",
      "record.cleansheets",
      "record.cleanSheet",
      "record.shutouts",
      "stats.cleanSheets",
      "stats.cleansheets",
      "stats.cleanSheet",
    ]),
    getBestNumber(info, [
      "cleanSheets",
      "cleansheets",
      "cleanSheet",
      "shutouts",
      "details.cleanSheets",
      "details.cleansheets",
      "details.cleanSheet",
    ]),
  );
  // Even when EA omits clean-sheet totals, matches minus goals against gives
  // a hard lower bound: to concede 201 goals across 213 matches, at least 12
  // matches had to end with zero conceded.
  const minimumPossibleCleanSheets =
    matches > 0 && goalsAgainst >= 0 ? Math.max(0, matches - goalsAgainst) : 0;

  return {
    id: clubId,
    name,
    platform,
    badgeUrl: getClubBadgeUrl(info),
    division:
      getCurrentDivisionLabel(info) ||
      getCurrentDivisionLabel(overall) ||
      getCurrentDivisionLabel(currentSeason) ||
      getBestDivisionLabel(overall ?? info) ||
      "Division Unavailable",
    skillRating:
      getSkillRatingValue(overall) ||
      getSkillRatingValue(info) ||
      getSkillRatingValue(currentSeason),
    wins,
    draws,
    losses,
    goalsFor,
    goalsAgainst,
    cleanSheets: Math.max(extractedCleanSheets, minimumPossibleCleanSheets),
    appearanceBreakdown: {
      total: matches,
      league: normalizedLeagueAppearances,
      playoff: normalizedPlayoffAppearances,
      bestPlayoffFinish,
    },
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
  const wins = getBestNumber(record, [
    "wins",
    "gamesWon",
    "matchesWon",
    "stats.wins",
    "stats.gamesWon",
    "stats.matchesWon",
    "proStats.wins",
    "proStats.gamesWon",
    "proStats.matchesWon",
  ]);
  const goals = getBestNumber(record, ["goals", "stats.goals", "proStats.goals"]);
  const shots = getBestNumber(record, [
    "shots",
    "shotsTaken",
    "shotsAttempted",
    "totalShots",
    "shotsTotal",
    "stats.shots",
    "stats.shotsTaken",
    "stats.shotsAttempted",
    "stats.totalShots",
    "proStats.shots",
    "proStats.shotsTaken",
    "proStats.shotsAttempted",
    "proStats.totalShots",
  ]);
  const saves = getBestNumber(record, [
    "saves",
    "savesMade",
    "keeperSaves",
    "gkSaves",
    "goalkeeperSaves",
    "stats.saves",
    "stats.savesMade",
    "stats.keeperSaves",
    "stats.gkSaves",
    "proStats.saves",
    "proStats.savesMade",
    "proStats.keeperSaves",
    "proStats.gkSaves",
  ]);
  const goalsAgainst = getBestNumber(record, [
    "goalsAgainst",
    "goalsConceded",
    "goalsAllowed",
    "keeperGoalsAgainst",
    "gkGoalsAgainst",
    "stats.goalsAgainst",
    "stats.goalsConceded",
    "stats.goalsAllowed",
    "stats.keeperGoalsAgainst",
    "stats.gkGoalsAgainst",
    "proStats.goalsAgainst",
    "proStats.goalsConceded",
    "proStats.goalsAllowed",
    "proStats.keeperGoalsAgainst",
    "proStats.gkGoalsAgainst",
  ]);
  const directSaveSuccessRate = getNumber(
    record,
    [
      "saveSuccessRate",
      "savePercentage",
      "savePct",
      "keeperSaveSuccessRate",
      "gkSaveSuccessRate",
      "stats.saveSuccessRate",
      "stats.savePercentage",
      "stats.savePct",
      "stats.keeperSaveSuccessRate",
      "stats.gkSaveSuccessRate",
      "proStats.saveSuccessRate",
      "proStats.savePercentage",
      "proStats.savePct",
      "proStats.keeperSaveSuccessRate",
      "proStats.gkSaveSuccessRate",
    ],
    Number.NaN,
  );
  const cleanSheets = getBestNumber(record, [
    "cleanSheets",
    "cleansheets",
    "cleanSheet",
    "keeperCleanSheets",
    "gkCleanSheets",
    "stats.cleanSheets",
    "stats.cleansheets",
    "stats.cleanSheet",
    "stats.keeperCleanSheets",
    "stats.gkCleanSheets",
    "proStats.cleanSheets",
    "proStats.cleansheets",
    "proStats.cleanSheet",
    "proStats.keeperCleanSheets",
    "proStats.gkCleanSheets",
  ]);
  const directWinRate = getBestNumber(
    record,
    [
      "winRate",
      "winPercentage",
      "winPercent",
      "winPct",
      "stats.winRate",
      "stats.winPercentage",
      "stats.winPercent",
      "stats.winPct",
      "proStats.winRate",
      "proStats.winPercentage",
      "proStats.winPercent",
      "proStats.winPct",
    ],
    Number.NaN,
  );
  const normalizedDirectWinRate =
    Number.isFinite(directWinRate) && directWinRate > 0 && directWinRate <= 1
      ? directWinRate * 100
      : directWinRate;
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
  const directTackleSuccessRate = getNumber(
    record,
    ["tackleSuccessRate", "stats.tackleSuccessRate", "proStats.tackleSuccessRate"],
    Number.NaN,
  );
  const passes = getBestNumber(record, [
    "passes",
    "passAttempts",
    "passesAttempted",
    "stats.passes",
    "stats.passAttempts",
    "proStats.passes",
    "proStats.passAttempts",
  ]);
  const directPassAccuracy = getNumber(
    record,
    [
      "passAccuracy",
      "passSuccessRate",
      "passingAccuracy",
      "stats.passAccuracy",
      "stats.passSuccessRate",
      "proStats.passAccuracy",
      "proStats.passSuccessRate",
    ],
    Number.NaN,
  );
  const passesMade = getBestNumber(record, [
    "passesMade",
    "passesCompleted",
    "passesmade",
    "passescomplete",
    "completedPasses",
    "stats.passesMade",
    "stats.passesCompleted",
    "proStats.passesMade",
    "proStats.passesCompleted",
  ]);
  const passAccuracy = Number.isFinite(directPassAccuracy)
    ? Math.round(directPassAccuracy)
    : getPercentage(passesMade, passes);
  const passAttempts =
    passes > 0
      ? passes
      : passesMade > 0 && passAccuracy > 0
        ? Math.round(passesMade / (passAccuracy / 100))
        : 0;
  const manOfTheMatch = getBestNumber(record, [
    "manOfTheMatch",
    "motm",
    "mom",
    "manOfTheMatchCount",
    "stats.manOfTheMatch",
    "stats.motm",
    "stats.mom",
    "proStats.manOfTheMatch",
    "proStats.motm",
    "proStats.mom",
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
    height: getHeight(record),
    nationality: getNationality(record),
    overall: getOverall(record),
    matches,
    goals,
    assists: getBestNumber(record, [
      "assists",
      "stats.assists",
      "proStats.assists",
    ]),
    shots,
    shotSuccessRate: getShotSuccessRate(record, goals, shots),
    saves,
    saveSuccessRate: Number.isFinite(directSaveSuccessRate)
      ? Math.round(directSaveSuccessRate)
      : getPercentage(saves, saves + goalsAgainst),
    goalsAgainst,
    cleanSheets,
    rating: getRoundedRating(record),
    winRate: Number.isFinite(normalizedDirectWinRate) && normalizedDirectWinRate > 0
      ? Math.round(normalizedDirectWinRate)
      : getPercentage(wins, matches),
    redCards: getBestNumber(record, [
      "redCards",
      "redcards",
      "stats.redCards",
      "proStats.redCards",
    ]),
    tackles,
    tackleSuccessRate: Number.isFinite(directTackleSuccessRate)
      ? Math.round(directTackleSuccessRate)
      : getPercentage(tacklesWon, tackles),
    passesMade,
    passAttempts,
    passAccuracy,
    manOfTheMatch,
    manOfTheMatchRate: getPercentage(manOfTheMatch, matches),
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
      height: existing.height ?? member.height,
      nationality: existing.nationality ?? member.nationality,
      matches: Math.max(existing.matches, member.matches),
      goals: Math.max(existing.goals, member.goals),
      assists: Math.max(existing.assists, member.assists),
      shots: Math.max(existing.shots, member.shots),
      saves: Math.max(existing.saves, member.saves),
      saveSuccessRate:
        member.matches >= existing.matches
          ? member.saveSuccessRate
          : existing.saveSuccessRate,
      goalsAgainst: Math.max(existing.goalsAgainst, member.goalsAgainst),
      cleanSheets: Math.max(existing.cleanSheets, member.cleanSheets),
      shotSuccessRate:
        member.shots >= existing.shots
          ? member.shotSuccessRate
          : existing.shotSuccessRate,
      rating:
        member.matches >= existing.matches && member.rating > 0
          ? member.rating
          : existing.rating,
      winRate:
        member.matches >= existing.matches
          ? member.winRate > 0
            ? member.winRate
            : existing.winRate
          : existing.winRate > 0
            ? existing.winRate
            : member.winRate,
      redCards: Math.max(existing.redCards, member.redCards),
      tackles: Math.max(existing.tackles, member.tackles),
      tackleSuccessRate:
        member.matches >= existing.matches
          ? member.tackleSuccessRate
          : existing.tackleSuccessRate,
      overall:
        member.overall > 0
          ? member.overall
          : existing.overall,
      passesMade: Math.max(existing.passesMade, member.passesMade),
      passAttempts: Math.max(existing.passAttempts, member.passAttempts),
      passAccuracy:
        member.matches >= existing.matches
          ? member.passAccuracy
          : existing.passAccuracy,
      manOfTheMatch: Math.max(existing.manOfTheMatch, member.manOfTheMatch),
      manOfTheMatchRate:
        member.matches >= existing.matches
          ? member.manOfTheMatchRate
          : existing.manOfTheMatchRate,
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

export function normalizePlayerRecentMatches(
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

      const matchPassesMade = getBestNumber(playerRecord, [
        "passesmade",
        "passescomplete",
        "passesMade",
        "passesCompleted",
        "completedPasses",
        "stats.passescomplete",
        "stats.passesmade",
        "stats.passesMade",
        "stats.passesCompleted",
        "stats.completedPasses",
        "proStats.passescomplete",
        "proStats.passesmade",
        "proStats.passesMade",
        "proStats.passesCompleted",
        "proStats.completedPasses",
      ]);
      const matchPassAttempts = getBestNumber(playerRecord, [
        "passes",
        "passattempts",
        "passAttempts",
        "passesAttempted",
        "stats.passes",
        "stats.passattempts",
        "stats.passAttempts",
        "stats.passesAttempted",
        "proStats.passes",
        "proStats.passattempts",
        "proStats.passAttempts",
        "proStats.passesAttempted",
      ]);
      const matchTackles = getBestNumber(playerRecord, [
        "tackles",
        "tacklesMade",
        "tacklesWon",
        "tackleSuccesses",
        "stats.tackles",
        "stats.tacklesMade",
        "stats.tacklesWon",
        "stats.tackleSuccesses",
        "proStats.tackles",
        "proStats.tacklesMade",
        "proStats.tacklesWon",
        "proStats.tackleSuccesses",
      ]);
      const matchTacklesMade = getBestNumber(playerRecord, [
        "tacklesWon",
        "tackleSuccesses",
        "tacklesmade",
        "tacklesMade",
        "tacklesmade",
        "stats.tacklesWon",
        "stats.tackleSuccesses",
        "stats.tacklesMade",
        "stats.tacklesmade",
        "proStats.tacklesWon",
        "proStats.tackleSuccesses",
        "proStats.tacklesMade",
        "proStats.tacklesmade",
      ]);
      const matchTackleAttempts = getBestNumber(playerRecord, [
        "tackles",
        "tacklesAttempted",
        "tacklesattempted",
        "tackleAttempts",
        "tackleattempts",
        "tacklesMade",
        "stats.tackles",
        "stats.tacklesAttempted",
        "stats.tacklesattempted",
        "stats.tackleAttempts",
        "stats.tackleattempts",
        "stats.tacklesMade",
        "proStats.tackles",
        "proStats.tacklesAttempted",
        "proStats.tacklesattempted",
        "proStats.tackleAttempts",
        "proStats.tackleattempts",
        "proStats.tacklesMade",
      ]);
      const matchGoals = getBestNumber(playerRecord, [
        "goals",
        "stats.goals",
        "proStats.goals",
      ]);
      const matchAssists = getBestNumber(playerRecord, [
        "assists",
        "stats.assists",
        "proStats.assists",
      ]);
      const matchRedCards = getBestNumber(playerRecord, [
        "redcards",
        "redCards",
        "stats.redcards",
        "stats.redCards",
        "proStats.redcards",
        "proStats.redCards",
      ]);
      const matchShots = getBestNumber(playerRecord, [
        "shots",
        "shotsTaken",
        "shotsAttempted",
        "totalShots",
        "shotsTotal",
        "stats.shots",
        "stats.shotsTaken",
        "stats.shotsAttempted",
        "stats.totalShots",
        "proStats.shots",
        "proStats.shotsTaken",
        "proStats.shotsAttempted",
        "proStats.totalShots",
      ]);
      const matchShotSuccessRate = getShotSuccessRate(playerRecord, matchGoals, matchShots);
      const directMatchPassAccuracy = getNumber(
        playerRecord,
        [
          "passAccuracy",
          "passSuccessRate",
          "passingAccuracy",
          "stats.passAccuracy",
          "stats.passSuccessRate",
          "stats.passingAccuracy",
          "proStats.passAccuracy",
          "proStats.passSuccessRate",
          "proStats.passingAccuracy",
        ],
        Number.NaN,
      );
      const directMatchTackleSuccessRate = getNumber(
        playerRecord,
        [
          "tackleSuccessRate",
          "tackleWinRate",
          "tackleAccuracy",
          "stats.tackleSuccessRate",
          "stats.tackleWinRate",
          "stats.tackleAccuracy",
          "proStats.tackleSuccessRate",
          "proStats.tackleWinRate",
          "proStats.tackleAccuracy",
        ],
        Number.NaN,
      );
      const resolvedMatchPassAccuracy = Number.isFinite(directMatchPassAccuracy)
        ? Math.round(directMatchPassAccuracy)
        : getPercentage(matchPassesMade, matchPassAttempts);
      const resolvedMatchPassAttempts =
        matchPassAttempts > 0
          ? matchPassAttempts
          : matchPassesMade > 0 && resolvedMatchPassAccuracy > 0
            ? Math.round(matchPassesMade / (resolvedMatchPassAccuracy / 100))
            : 0;
      const resolvedMatchTackleAttempts =
        matchTackleAttempts > 0
          ? matchTackleAttempts
          : matchTacklesMade > 0
            ? matchTacklesMade
          : matchTackles > 0
            ? matchTackles
            : 0;
      const resolvedMatchTacklesMade =
        matchTacklesMade > 0
          ? matchTacklesMade
          : resolvedMatchTackleAttempts > 0 && matchTacklesMade === 0 && matchTackles > 0
            ? Math.min(matchTackles, resolvedMatchTackleAttempts)
            : 0;
      const resolvedMatchTackleSuccessRate =
        Number.isFinite(directMatchTackleSuccessRate)
          ? Math.round(directMatchTackleSuccessRate)
          : resolvedMatchTackleAttempts > 0
          ? getPercentage(resolvedMatchTacklesMade, resolvedMatchTackleAttempts)
          : 0;

      return {
        id: getString(record, ["matchId", "id", "timestamp"], crypto.randomUUID()),
        matchIndex: RECENT_CLUB_MATCH_SCAN_COUNT - index,
        opponent: getString(opponent, ["details.name", "name", "clubName"], "Unknown Club"),
        result,
        score: `${ourScore}-${opponentScore}`,
        rating: getRoundedRating(playerRecord),
        goals: matchGoals,
        assists: matchAssists,
        shots: matchShots,
        shotSuccessRate: matchShotSuccessRate,
        tackles: resolvedMatchTacklesMade,
        tackleAttempts: resolvedMatchTackleAttempts,
        tacklesMade: resolvedMatchTacklesMade,
        tackleSuccessRate: resolvedMatchTackleSuccessRate,
        passesMade: matchPassesMade,
        passAttempts: resolvedMatchPassAttempts,
        passAccuracy: resolvedMatchPassAccuracy,
        manOfTheMatch: getBestNumber(playerRecord, [
          "manOfTheMatch",
          "motm",
          "mom",
          "stats.manOfTheMatch",
          "stats.motm",
          "stats.mom",
          "proStats.manOfTheMatch",
          "proStats.motm",
          "proStats.mom",
        ]) > 0,
        redCards: matchRedCards,
      };
    })
    .filter((match): match is EaPlayerMatch => Boolean(match))
    .slice(0, RECENT_PLAYER_MATCH_COUNT);
}

function normalizeMatchPlayer(playerId: string, value: unknown): EaClubMatchPlayer | null {
  const record = asRecord(value);

  if (!record) {
    return null;
  }

  const goals = getBestNumber(record, ["goals", "stats.goals", "proStats.goals"]);
  const assists = getBestNumber(record, ["assists", "stats.assists", "proStats.assists"]);
  const shots = getBestNumber(record, [
    "shots",
    "shotsTaken",
    "shotsAttempted",
    "totalShots",
    "stats.shots",
    "stats.shotsTaken",
    "stats.shotsAttempted",
    "stats.totalShots",
    "proStats.shots",
    "proStats.shotsTaken",
    "proStats.shotsAttempted",
    "proStats.totalShots",
  ]);
  const passesMade = getBestNumber(record, [
    "passesmade",
    "passescomplete",
    "passesMade",
    "passesCompleted",
    "completedPasses",
    "stats.passescomplete",
    "stats.passesmade",
    "stats.passesMade",
    "stats.passesCompleted",
    "stats.completedPasses",
    "proStats.passescomplete",
    "proStats.passesmade",
    "proStats.passesMade",
    "proStats.passesCompleted",
    "proStats.completedPasses",
  ]);
  const passAttempts = getBestNumber(record, [
    "passes",
    "passattempts",
    "passAttempts",
    "passesAttempted",
    "stats.passes",
    "stats.passattempts",
    "stats.passAttempts",
    "stats.passesAttempted",
    "proStats.passes",
    "proStats.passattempts",
    "proStats.passAttempts",
    "proStats.passesAttempted",
  ]);
  const tacklesMade = getBestNumber(record, [
    "tacklesWon",
    "tackleSuccesses",
    "tacklesmade",
    "tacklesMade",
    "stats.tacklesWon",
    "stats.tackleSuccesses",
    "stats.tacklesMade",
    "stats.tacklesmade",
    "proStats.tacklesWon",
    "proStats.tackleSuccesses",
    "proStats.tacklesMade",
    "proStats.tacklesmade",
  ]);
  const tackleAttempts = getBestNumber(record, [
    "tackles",
    "tacklesAttempted",
    "tacklesattempted",
    "tackleAttempts",
    "tackleattempts",
    "stats.tackles",
    "stats.tacklesAttempted",
    "stats.tacklesattempted",
    "stats.tackleAttempts",
    "stats.tackleattempts",
    "proStats.tackles",
    "proStats.tacklesAttempted",
    "proStats.tacklesattempted",
    "proStats.tackleAttempts",
    "proStats.tackleattempts",
  ]);
  const directPassAccuracy = getNumber(record, [
    "passAccuracy",
    "passSuccessRate",
    "passingAccuracy",
    "stats.passAccuracy",
    "stats.passSuccessRate",
    "stats.passingAccuracy",
    "proStats.passAccuracy",
    "proStats.passSuccessRate",
    "proStats.passingAccuracy",
  ], Number.NaN);
  const directTackleSuccessRate = getNumber(record, [
    "tackleSuccessRate",
    "tackleWinRate",
    "tackleAccuracy",
    "stats.tackleSuccessRate",
    "stats.tackleWinRate",
    "stats.tackleAccuracy",
    "proStats.tackleSuccessRate",
    "proStats.tackleWinRate",
    "proStats.tackleAccuracy",
  ], Number.NaN);
  const name = getString(record, [
    "playername",
    "playerName",
    "name",
    "proName",
    "details.name",
  ], "Unknown");

  return {
    id: playerId,
    name,
    position: getMatchPositionLabel(getString(record, [
      "pos",
      "position",
      "favoritePosition",
      "proPos",
      "details.position",
    ], "")),
    rating: getRoundedRating(record),
    goals,
    assists,
    shots,
    passesMade,
    passAttempts,
    passAccuracy: Number.isFinite(directPassAccuracy)
      ? Math.round(directPassAccuracy)
      : getPercentage(passesMade, passAttempts),
    tacklesMade,
    tackleAttempts,
    tackleSuccessRate: Number.isFinite(directTackleSuccessRate)
      ? Math.round(directTackleSuccessRate)
      : getPercentage(tacklesMade, tackleAttempts),
    saves: getBestNumber(record, ["saves", "stats.saves", "proStats.saves"]),
    redCards: getBestNumber(record, [
      "redcards",
      "redCards",
      "stats.redcards",
      "stats.redCards",
      "proStats.redcards",
      "proStats.redCards",
    ]),
    manOfTheMatch: getBestNumber(record, [
      "manOfTheMatch",
      "motm",
      "mom",
      "stats.manOfTheMatch",
      "stats.motm",
      "stats.mom",
      "proStats.manOfTheMatch",
      "proStats.motm",
      "proStats.mom",
    ]) > 0,
  };
}

function normalizeMatchPlayers(playersPayload: unknown): EaClubMatchPlayer[] {
  const record = asRecord(playersPayload);
  const entries = record
    ? Object.entries(record)
    : asArray(playersPayload).map((value, index) => [String(index), value] as const);

  return entries
    .map(([playerId, value]) => normalizeMatchPlayer(playerId, value))
    .filter((player): player is EaClubMatchPlayer => Boolean(player))
    .filter((player) => player.name !== "Unknown" || player.rating > 0 || player.goals > 0 || player.assists > 0);
}

function emptyClubMatchStats(goals = 0): EaClubMatchStats {
  return {
    goals,
    shots: 0,
    shotAccuracy: 0,
    passesMade: 0,
    passAttempts: 0,
    passAccuracy: 0,
    tacklesMade: 0,
    tackleAttempts: 0,
    tackleSuccessRate: 0,
    saves: 0,
    redCards: 0,
    averageRating: 0,
  };
}

function getClubMatchStats(players: EaClubMatchPlayer[], goals: number): EaClubMatchStats {
  if (players.length === 0) {
    return emptyClubMatchStats(goals);
  }

  const shots = players.reduce((sum, player) => sum + player.shots, 0);
  const passesMade = players.reduce((sum, player) => sum + player.passesMade, 0);
  const passAttempts = players.reduce((sum, player) => sum + player.passAttempts, 0);
  const tacklesMade = players.reduce((sum, player) => sum + player.tacklesMade, 0);
  const tackleAttempts = players.reduce((sum, player) => sum + player.tackleAttempts, 0);
  const totalRating = players.reduce((sum, player) => sum + player.rating, 0);

  return {
    goals,
    shots,
    shotAccuracy: getPercentage(goals, shots),
    passesMade,
    passAttempts,
    passAccuracy: getPercentage(passesMade, passAttempts),
    tacklesMade,
    tackleAttempts,
    tackleSuccessRate: getPercentage(tacklesMade, tackleAttempts),
    saves: players.reduce((sum, player) => sum + player.saves, 0),
    redCards: players.reduce((sum, player) => sum + player.redCards, 0),
    averageRating: Math.round((totalRating / players.length) * 10) / 10,
  };
}

function getFormation(players: EaClubMatchPlayer[]): EaClubFormation {
  const counts = players.reduce(
    (total, player) => {
      const position = player.position.toLowerCase();

      if (position.includes("goal")) total.goalkeeper += 1;
      else if (position.includes("def")) total.defender += 1;
      else if (position.includes("mid")) total.midfielder += 1;
      else total.forward += 1;

      return total;
    },
    { goalkeeper: 0, defender: 0, midfielder: 0, forward: 0 },
  );
  const label =
    counts.defender + counts.midfielder + counts.forward > 0
      ? `${counts.defender}-${counts.midfielder}-${counts.forward}`
      : "Unavailable";

  return {
    label,
    ...counts,
  };
}

function getMatchPositionLabel(value: string) {
  const normalized = value.trim().toLowerCase();

  if (!normalized) return "Unknown";
  if (["gk", "goalkeeper", "keeper"].includes(normalized)) return "goalkeeper";
  if (["cb", "lb", "rb", "lcb", "rcb", "def", "defender"].includes(normalized)) return "defender";
  if (["cm", "cam", "cdm", "lm", "rm", "mid", "midfielder"].includes(normalized)) return "midfielder";
  if (["st", "cf", "lw", "rw", "lf", "rf", "fwd", "forward"].includes(normalized)) return "forward";

  return value;
}

function normalizeClubRecentMatches(
  matchesPayload: unknown,
  clubId: string,
  matchType: EaClubRecentMatch["matchType"] = "league",
): EaClubRecentMatch[] {
  return asArray(matchesPayload)
    .slice(0, RECENT_CLUB_MATCH_SCAN_COUNT)
    .map((match) => {
      const record = asRecord(match);

      if (!record) {
        return null;
      }

      const clubs = asRecord(record.clubs);
      const players = asRecord(record.players);
      const ourClub = asRecord(clubs?.[clubId]);

      if (!clubs || !ourClub) {
        return null;
      }

      const opponentEntry = Object.entries(clubs).find(([entryClubId]) => entryClubId !== clubId);
      const opponentClubId = opponentEntry?.[0] ?? "";
      const opponent = asRecord(opponentEntry?.[1]);
      const ourScore = getNumber(ourClub, ["score"]);
      const opponentScore = getNumber(opponent, ["score"]);
      const ourPlayers = normalizeMatchPlayers(players?.[clubId]);
      const opponentPlayers = normalizeMatchPlayers(opponentClubId ? players?.[opponentClubId] : null);
      const result =
        getNumber(ourClub, ["wins"]) > 0
          ? "W"
          : getNumber(ourClub, ["ties", "draws"]) > 0
            ? "D"
            : "L";

      return {
        id: getString(record, ["matchId", "id", "timestamp"], crypto.randomUUID()),
        matchType,
        result,
        score: `${ourScore}-${opponentScore}`,
        opponent: getString(opponent, ["details.name", "name", "clubName"], "Unknown Club"),
        goalsFor: ourScore,
        goalsAgainst: opponentScore,
        players: ourPlayers,
        opponentPlayers,
        stats: getClubMatchStats(ourPlayers, ourScore),
        opponentStats: getClubMatchStats(opponentPlayers, opponentScore),
        formation: getFormation(ourPlayers),
        opponentFormation: getFormation(opponentPlayers),
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
    division: getCurrentDivisionLabel(record) || getDivisionLabel(record),
    skillRating: getSkillRatingValue(record),
    record: `${wins}W - ${draws}D - ${losses}L`,
  };
}

function normalizeLeaderboardClubRow(
  platform: EaPlatform,
  value: unknown,
  index: number,
): EaLeaderboardClub | null {
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
  const goalsFor = getNumber(record, [
    "goals",
    "goalsFor",
    "goalsScored",
    "record.goals",
    "record.goalsFor",
    "stats.goals",
    "stats.goalsFor",
  ]);
  const goalsAgainst = getNumber(record, [
    "goalsAgainst",
    "goalsConceded",
    "record.goalsAgainst",
    "stats.goalsAgainst",
  ]);
  const games = getNumber(
    record,
    ["gamesPlayed", "matches", "record.gamesPlayed", "stats.gamesPlayed"],
    wins + draws + losses,
  );
  const cleanSheets = Math.max(
    getBestNumber(record, [
      "cleanSheets",
      "cleansheets",
      "cleanSheet",
      "shutouts",
      "record.cleanSheets",
      "stats.cleanSheets",
      "stats.cleansheets",
    ]),
    games > 0 && goalsAgainst >= 0 ? Math.max(0, games - goalsAgainst) : 0,
  );

  return {
    id,
    rank: getNumber(record, ["rank", "ranking", "placement"], index + 1),
    name,
    division: getCurrentDivisionLabel(record) || getDivisionLabel(record),
    platform: getLeaderboardPlatformLabel(platform),
    region: "Worldwide",
    games,
    wins,
    draws,
    losses,
    goalsFor,
    goalsAgainst,
    cleanSheets,
    skillRating: getSkillRatingValue(record),
  };
}

function normalizeLeaderboardPlayerRow(
  platform: EaPlatform,
  club: EaLeaderboardClub,
  value: unknown,
): EaLeaderboardPlayer | null {
  const record = asRecord(value);

  if (!record) {
    return null;
  }

  const member = normalizeMember(record);

  if (!member.id || member.name === "Unknown" || member.matches <= 0) {
    return null;
  }

  return {
    id: member.id,
    clubId: club.id,
    rank: 0,
    name: member.name,
    club: club.name,
    position: member.position,
    platform: getLeaderboardPlatformLabel(platform),
    region: "Worldwide",
    games: member.matches,
    goals: member.goals,
    assists: member.assists,
    rating: member.rating,
    winRate: member.winRate,
    redCards: member.redCards,
    tackles: member.tackles,
    tackleRate: member.tackleSuccessRate,
  };
}

function rankLeaderboardPlayers(players: EaLeaderboardPlayer[]) {
  return players
    .sort(
      (left, right) =>
        right.rating - left.rating ||
        right.goals + right.assists - (left.goals + left.assists) ||
        right.goals - left.goals ||
        right.games - left.games ||
        left.name.localeCompare(right.name),
    )
    .map((player, index) => ({
      ...player,
      rank: index + 1,
    }));
}

function dedupeLeaderboardPlayers(players: EaLeaderboardPlayer[]) {
  return Array.from(
    new Map(
      players.map((player) => [
        `${player.platform}:${player.clubId}:${player.id}:${player.name}`.toLowerCase(),
        player,
      ]),
    ).values(),
  );
}

export async function getEaClubLeaderboard(
  platform = DEFAULT_EA_PLATFORM,
  limit = 25,
): Promise<EaLeaderboardClub[]> {
  const safePlatform = normalizeEaPlatform(platform);
  const payload = await fetchEaJson(
    "/currentSeasonLeaderboard",
    new URLSearchParams({
      platform: safePlatform,
      maxResultCount: String(limit),
    }),
  );

  return asArray(payload)
    .map((entry, index) => normalizeLeaderboardClubRow(safePlatform, entry, index))
    .filter((entry): entry is EaLeaderboardClub => Boolean(entry))
    .sort(
      (left, right) =>
        left.rank - right.rank ||
        right.skillRating - left.skillRating ||
        right.wins - left.wins,
    )
    .slice(0, limit);
}

export async function getEaLeaderboards(
  platform = DEFAULT_EA_PLATFORM,
  clubLimit = 25,
  playerClubScanLimit = 12,
): Promise<EaLeaderboards> {
  const safePlatform = normalizeEaPlatform(platform);
  const clubs = await getEaClubLeaderboard(safePlatform, clubLimit);
  const scannedClubs = clubs.slice(0, playerClubScanLimit);
  const membersPayloads = await Promise.all(
    scannedClubs.map(async (club) => {
      const payload = await fetchOptionalEaJson(
        "/members/stats",
        new URLSearchParams({
          platform: safePlatform,
          clubId: club.id,
        }),
      );

      return {
        club,
        payload,
      };
    }),
  );
  const players = rankLeaderboardPlayers(
    dedupeLeaderboardPlayers(
      membersPayloads.flatMap(({ club, payload }) =>
        asArray(payload)
          .map((entry) => normalizeLeaderboardPlayerRow(safePlatform, club, entry))
          .filter((entry): entry is EaLeaderboardPlayer => Boolean(entry)),
      ),
    ),
  ).slice(0, clubLimit);

  return {
    clubs,
    players,
  };
}

function findClubById(value: unknown, clubId: string) {
  return asArray(value).find((entry) => {
    const record = asRecord(entry);

    if (!record) {
      return false;
    }

    return getString(record, ["clubId", "id", "teamId"], "") === clubId;
  });
}

async function getCurrentSeasonClubEntry(
  platform: EaPlatform,
  clubId: string,
  clubName: string,
) {
  if (!clubName.trim()) {
    return null;
  }

  const payload = await searchEaEndpoint(
    "/currentSeasonLeaderboard/search",
    platform,
    clubName,
  ).catch((error) => {
    if (error instanceof EaRequestError) {
      return null;
    }

    throw error;
  });

  return findClubById(payload, clubId);
}

async function getClubOverallStatsEntry(
  platform: EaPlatform,
  clubId: string,
) {
  const payload = await fetchOptionalEaJson(
    "/clubs/overallStats",
    new URLSearchParams({
      platform,
      clubIds: clubId,
    }),
  );

  return findFirstRecord(payload);
}

function countMemberPositions(members: unknown[]) {
  const positionCount = {
    goalkeeper: 0,
    defender: 0,
    midfielder: 0,
    forward: 0,
  };

  for (const member of members) {
    const record = asRecord(member);
    const position = getString(
      record,
      ["favoritePosition", "position", "pos"],
      "",
    ).toLowerCase();

    if (position === "goalkeeper") {
      positionCount.goalkeeper += 1;
    } else if (position === "defender") {
      positionCount.defender += 1;
    } else if (position === "midfielder") {
      positionCount.midfielder += 1;
    } else if (position === "forward") {
      positionCount.forward += 1;
    }
  }

  return positionCount;
}

export async function getEaFullClubData(
  clubId: string,
  platform = DEFAULT_EA_PLATFORM,
): Promise<EaFullClubData> {
  const safeClubId = normalizeEaClubId(clubId);
  const safePlatform = normalizeEaPlatform(platform);
  const params = {
    platform: safePlatform,
  };

  const [
    infoPayload,
    overallPayload,
    membersPayload,
    careerMembersPayload,
    leagueMatchesPayload,
    playoffMatchesPayload,
    friendlyMatchesPayload,
  ] = await Promise.all([
    fetchEaJson("/clubs/info", new URLSearchParams({
      ...params,
      clubIds: safeClubId,
    })),
    fetchEaJson("/clubs/overallStats", new URLSearchParams({
      ...params,
      clubIds: safeClubId,
    })),
    fetchOptionalEaJson("/members/stats", new URLSearchParams({
      ...params,
      clubId: safeClubId,
    })),
    fetchOptionalEaJson("/members/career/stats", new URLSearchParams({
      ...params,
      clubId: safeClubId,
    })),
    fetchOptionalEaJson("/clubs/matches", new URLSearchParams({
      ...params,
      clubIds: safeClubId,
      matchType: "leagueMatch",
      maxResultCount: String(RECENT_CLUB_MATCH_SCAN_COUNT),
    })),
    fetchOptionalEaJson("/clubs/matches", new URLSearchParams({
      ...params,
      clubIds: safeClubId,
      matchType: "playoffMatch",
      maxResultCount: String(RECENT_CLUB_MATCH_SCAN_COUNT),
    })),
    fetchOptionalEaJson("/clubs/matches", new URLSearchParams({
      ...params,
      clubIds: safeClubId,
      matchType: "friendlyMatch",
      maxResultCount: String(RECENT_CLUB_MATCH_SCAN_COUNT),
    })),
  ]);
  const members = normalizeSquad(careerMembersPayload, membersPayload);

  return {
    clubId: safeClubId,
    platform: safePlatform,
    overallStats: findFirstRecord(overallPayload) ?? {},
    memberStats: {
      members: asArray(membersPayload).length > 0 ? asArray(membersPayload) : members,
      positionCount: countMemberPositions(members),
    },
    matches: {
      league: asArray(leagueMatchesPayload).slice(0, RECENT_CLUB_MATCH_SCAN_COUNT),
      playoff: asArray(playoffMatchesPayload).slice(0, RECENT_CLUB_MATCH_SCAN_COUNT),
      friendly: asArray(friendlyMatchesPayload).slice(0, RECENT_CLUB_MATCH_SCAN_COUNT),
    },
    clubInfoData: {
      [safeClubId]: findFirstRecord(infoPayload) ?? {},
    },
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
    if (
      error instanceof EaRequestError &&
      (error.status === 400 || error.status === 403)
    ) {
      return null;
    }

    throw error;
  }
}

const SEARCH_FALLBACK_CLUBS: Array<{
  aliases: string[];
  id: string;
  name: string;
}> = [
  {
    aliases: ["oil merchants"],
    id: "3456623",
    name: "Oil Merchants",
  },
];

function getKnownClubFallbacks(
  query: string,
  platform: EaPlatform,
): EaClubSearchResult[] {
  const normalizedQuery = query.toLowerCase();

  return SEARCH_FALLBACK_CLUBS.filter((club) =>
    [club.id, club.name, ...club.aliases]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery),
  ).map((club) => ({
    id: club.id,
    name: club.name,
    platform,
    division: "Direct club lookup",
    record: "Open live club profile",
    skillRating: 0,
  }));
}

function leaderboardClubToSearchResult(
  club: EaLeaderboardClub,
  platform: EaPlatform,
): EaClubSearchResult {
  return {
    id: club.id,
    name: club.name,
    platform,
    skillRating: club.skillRating,
    division: club.division,
    record: `${club.wins}W - ${club.draws}D - ${club.losses}L`,
  };
}

async function getLeaderboardClubSearchFallbacks(
  query: string,
  platform: EaPlatform,
) {
  const normalizedQuery = query.toLowerCase();

  try {
    return (await getEaClubLeaderboard(platform, 100))
      .map((club) => leaderboardClubToSearchResult(club, platform))
      .filter((entry) =>
        [entry.name, entry.id, entry.division, entry.record]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery),
      );
  } catch (error) {
    if (error instanceof EaRequestError) {
      return [];
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
  const safePlatform = normalizeEaPlatform(platform);
  const safeQuery = normalizeEaSearchQuery(query);
  const normalizedQuery = safeQuery.toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  const [allTimeSearchPayload, currentSeasonSearchPayload] = await Promise.all([
    searchEaEndpoint("/allTimeLeaderboard/search", safePlatform, safeQuery),
    searchEaEndpoint("/currentSeasonLeaderboard/search", safePlatform, safeQuery),
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

  const fallbackResults =
    results.length > 0
      ? []
      : [
          ...getKnownClubFallbacks(safeQuery, safePlatform),
          ...(await getLeaderboardClubSearchFallbacks(safeQuery, safePlatform)),
        ];

  const trimmedResults = dedupeClubSearchResults([
    ...results,
    ...fallbackResults,
  ]).slice(0, 24);
  const enrichedResults = await Promise.all(
    trimmedResults.map(async (entry) => {
      const overall = await getClubOverallStatsEntry(platform, entry.id);
      const skillRating = getSkillRatingValue(overall);

      if (skillRating <= 0) {
        return entry;
      }

      return {
        ...entry,
        skillRating,
      };
    }),
  );

  return enrichedResults.sort(
    (left, right) =>
      right.skillRating - left.skillRating || left.name.localeCompare(right.name),
  );
}

export async function getEaClubProfile(
  clubId: string,
  platform = DEFAULT_EA_PLATFORM,
): Promise<EaClubProfile> {
  const safeClubId = normalizeEaClubId(clubId);
  const safePlatform = normalizeEaPlatform(platform);
  const [fullClubData, careerMembersPayload, playoffPayload] = await Promise.all([
    getEaFullClubData(safeClubId, safePlatform),
    fetchOptionalEaJson("/members/career/stats", new URLSearchParams({
      platform: safePlatform,
      clubId: safeClubId,
    })),
    fetchOptionalEaJson("/club/playoffAchievements", new URLSearchParams({
      platform: safePlatform,
      clubId: safeClubId,
    })),
  ]);
  const infoPayload = fullClubData.clubInfoData;
  const overallPayload = fullClubData.overallStats;
  const membersPayload = fullClubData.memberStats.members;
  const leagueMatchesPayload = fullClubData.matches.league;
  const playoffMatchesPayload = fullClubData.matches.playoff;
  const leagueMatches = asArray(leagueMatchesPayload);
  const playoffMatches = asArray(playoffMatchesPayload);
  const competitiveMatchesPayload = Array.from(
    { length: Math.max(leagueMatches.length, playoffMatches.length) },
    (_, index) => [leagueMatches[index], playoffMatches[index]],
  ).flat().filter((match) => match !== undefined);
  const recentClubMatches = [
    ...normalizeClubRecentMatches(leagueMatchesPayload, safeClubId, "league"),
    ...normalizeClubRecentMatches(playoffMatchesPayload, safeClubId, "playoff"),
  ]
    .sort((left, right) => {
      const leftId = Number(left.id);
      const rightId = Number(right.id);
      return Number.isFinite(leftId) && Number.isFinite(rightId) ? rightId - leftId : 0;
    })
    .slice(0, RECENT_CLUB_MATCH_SCAN_COUNT);

  const clubInfo = findFirstRecord(infoPayload);
  const clubName = getString(clubInfo, ["name", "clubName", "details.name"], "");
  const currentSeasonPayload = await getCurrentSeasonClubEntry(
    safePlatform,
    safeClubId,
    clubName,
  );

  return {
    club: normalizeClub(
      safeClubId,
      safePlatform,
      infoPayload,
      overallPayload,
      playoffPayload,
      currentSeasonPayload,
    ),
    squad: normalizeSquad(careerMembersPayload, membersPayload),
    recentMatches: competitiveMatchesPayload.slice(0, RECENT_CLUB_MATCH_SCAN_COUNT),
    recentClubMatches,
  };
}

export async function getEaPlayerProfile(
  clubId: string,
  playerId: string,
  platform = DEFAULT_EA_PLATFORM,
) {
  const safeClubId = normalizeEaClubId(clubId);
  const safePlayerId = normalizeEaRouteId(playerId, "Player ID");
  const profile = await getEaClubProfile(safeClubId, platform);
  const player = profile.squad.find((member) => member.id === safePlayerId);

  return {
    club: profile.club,
    player: player ?? null,
    squad: profile.squad,
    rawRecentMatches: profile.recentMatches,
    recentClubMatches: profile.recentClubMatches,
    recentMatches: player
      ? normalizePlayerRecentMatches(
          profile.recentMatches,
          safeClubId,
          safePlayerId,
          player.name,
        )
      : [],
  };
}
