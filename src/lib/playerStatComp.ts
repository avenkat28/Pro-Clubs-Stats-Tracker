export type PlayerCompName =
  | "Lionel Messi"
  | "Cristiano Ronaldo"
  | "Neymar"
  | "Kylian Mbappé"
  | "Erling Haaland"
  | "Harry Kane"
  | "Robert Lewandowski"
  | "Mohamed Salah"
  | "Kevin De Bruyne"
  | "Bruno Fernandes"
  | "Martin Ødegaard"
  | "Thomas Müller"
  | "Jude Bellingham"
  | "Bukayo Saka"
  | "Vinícius Jr."
  | "Son Heung-min"
  | "Antoine Griezmann"
  | "Trent Alexander-Arnold"
  | "N’Golo Kanté"
  | "Declan Rice"
  | "Rodri"
  | "Casemiro"
  | "Virgil van Dijk"
  | "Rúben Dias"
  | "Sergio Ramos"
  | "Federico Valverde"
  | "Steven Gerrard"
  | "Frank Lampard"
  | "Yaya Touré"
  | "Arturo Vidal";

export type PlayerCompInput = {
  position?: string | null;
  overall?: number | null;
  games?: number | null;
  matches?: number | null;
  goals?: number | null;
  assists?: number | null;
  goalContributions?: number | null;
  goalsPerGame?: number | null;
  assistsPerGame?: number | null;
  goalContributionsPerGame?: number | null;
  averageRating?: number | null;
  avgRating?: number | null;
  rating?: number | null;
  winRate?: number | null;
  tackles?: number | null;
  tacklePercent?: number | null;
  tackleSuccessRate?: number | null;
  passesMade?: number | null;
  passAttempts?: number | null;
  passAccuracy?: number | null;
  motm?: number | null;
  manOfTheMatch?: number | null;
  motmPercent?: number | null;
  manOfTheMatchRate?: number | null;
  redCards?: number | null;
  form?: number | string | null;
};

export type PlayerCompScores = {
  scoring: number;
  creation: number;
  output: number;
  influence: number;
  form?: number;
  defense?: number;
  discipline: number;
  balance: number;
  teamSuccess: number;
  aggression?: number;
  passing?: number;
};

export type PlayerCompTiers = {
  outputTier: string;
  ratingTier: string;
  motmTier: string;
  winRateTier: string;
};

export type PlayerCompSummary = {
  name: PlayerCompName;
  styleLabel: string;
  similarityScore: number;
  imagePath?: string;
};

export type PlayerStatCompResult = {
  primaryComp: PlayerCompSummary;
  secondaryComp: PlayerCompSummary;
  thirdComp?: PlayerCompSummary;
  archetype: string;
  styleLabel: string;
  explanation: string;
  scores: PlayerCompScores;
  tiers: PlayerCompTiers;
  reasons: string[];
};

type DerivedPlayerStats = {
  position: string;
  positionGroup: PositionGroup;
  overall: number;
  games: number;
  goals: number;
  assists: number;
  goalContributions: number;
  goalsPerGame: number;
  assistsPerGame: number;
  goalContributionsPerGame: number;
  averageRating: number;
  winRate: number;
  tackles: number;
  tacklePercent?: number;
  passesMade: number;
  passAttempts: number;
  passesMadePerGame?: number;
  passAccuracy?: number;
  motm: number;
  motmPercent: number;
  redCards: number;
  redCardsPerGame: number;
  tacklesPerGame?: number;
  scorerCreatorBalance: number;
  goalBias: number;
  assistBias: number;
};

type ScoreContext = {
  player: DerivedPlayerStats;
  scores: PlayerCompScores;
};

type PlayerProfile = {
  key: keyof typeof PLAYER_COMP_IMAGES;
  name: PlayerCompName;
  styleLabel: string;
  positionGroups: PositionGroup[];
  ideal: Partial<PlayerCompScores>;
  thresholds: (context: ScoreContext) => Array<boolean | undefined>;
};

type PositionGroup = "forward" | "midfielder" | "defender" | "goalkeeper" | "unknown";

export const PLAYER_COMP_IMAGES = {
  lionelMessi: "/player-comps/lionel-messi.png",
  cristianoRonaldo: "/player-comps/cristiano-ronaldo.png",
  neymar: "/player-comps/neymar.png",
  kylianMbappe: "/player-comps/kylian-mbappe.png",
  erlingHaaland: "/player-comps/erling-haaland.png",
  harryKane: "/player-comps/harry-kane.png",
  robertLewandowski: "/player-comps/robert-lewandowski.png",
  mohamedSalah: "/player-comps/mohamed-salah.png",
  kevinDeBruyne: "/player-comps/kevin-de-bruyne.png",
  brunoFernandes: "/player-comps/bruno-fernandes.png",
  martinOdegaard: "/player-comps/martin-odegaard.png",
  thomasMuller: "/player-comps/thomas-muller.png",
  judeBellingham: "/player-comps/jude-bellingham.png",
  bukayoSaka: "/player-comps/bukayo-saka.png",
  viniciusJr: "/player-comps/vinicius-jr.png",
  sonHeungMin: "/player-comps/son-heung-min.png",
  antoineGriezmann: "/player-comps/antoine-griezmann.png",
  trentAlexanderArnold: "/player-comps/trent-alexander-arnold.png",
  ngoloKante: "/player-comps/ngolo-kante.png",
  declanRice: "/player-comps/declan-rice.png",
  rodri: "/player-comps/rodri.png",
  casemiro: "/player-comps/casemiro.png",
  virgilVanDijk: "/player-comps/virgil-van-dijk.png",
  rubenDias: "/player-comps/ruben-dias.png",
  sergioRamos: "/player-comps/sergio-ramos.png",
  federicoValverde: "/player-comps/federico-valverde.png",
  stevenGerrard: "/player-comps/steven-gerrard.png",
  frankLampard: "/player-comps/frank-lampard.png",
  yayaToure: "/player-comps/yaya-toure.png",
  arturoVidal: "/player-comps/arturo-vidal.png",
  fallback: "/player-comps/fallback.png",
} as const;

const FORWARD_ELIGIBLE_COMPS: PlayerCompName[] = [
  "Antoine Griezmann",
  "Bruno Fernandes",
  "Bukayo Saka",
  "Cristiano Ronaldo",
  "Erling Haaland",
  "Harry Kane",
  "Jude Bellingham",
  "Kevin De Bruyne",
  "Kylian Mbappé",
  "Lionel Messi",
  "Mohamed Salah",
  "Neymar",
  "Robert Lewandowski",
  "Son Heung-min",
  "Thomas Müller",
  "Vinícius Jr.",
];

const MIDFIELDER_ELIGIBLE_COMPS: PlayerCompName[] = [
  "Arturo Vidal",
  "Bruno Fernandes",
  "Casemiro",
  "Declan Rice",
  "Federico Valverde",
  "Frank Lampard",
  "Jude Bellingham",
  "Kevin De Bruyne",
  "Lionel Messi",
  "Martin Ødegaard",
  "N’Golo Kanté",
  "Rodri",
  "Steven Gerrard",
  "Yaya Touré",
];

const PLAYER_PROFILES: PlayerProfile[] = [
  {
    key: "lionelMessi",
    name: "Lionel Messi",
    styleLabel: "Complete Creative Superstar",
    positionGroups: ["forward", "midfielder", "unknown"],
    ideal: { scoring: 86, creation: 86, output: 94, influence: 94, balance: 92 },
    thresholds: ({ player }) => [
      player.goalsPerGame >= 0.8,
      player.assistsPerGame >= 0.8,
      player.goalContributionsPerGame >= 1.7,
      player.averageRating >= 8.5,
      player.motmPercent >= 0.3,
    ],
  },
  {
    key: "cristianoRonaldo",
    name: "Cristiano Ronaldo",
    styleLabel: "Goal-First Superstar",
    positionGroups: ["forward", "unknown"],
    ideal: { scoring: 94, creation: 42, output: 88, influence: 88, balance: 42 },
    thresholds: ({ player }) => [
      player.goalsPerGame >= 1,
      player.goalContributionsPerGame >= 1.5,
      player.averageRating >= 8.3,
      player.motmPercent >= 0.25,
      player.goalBias >= 0.6,
    ],
  },
  {
    key: "neymar",
    name: "Neymar",
    styleLabel: "Creative Star",
    positionGroups: ["forward", "unknown"],
    ideal: { scoring: 72, creation: 88, output: 86, influence: 84, teamSuccess: 52 },
    thresholds: ({ player }) => [
      player.goalsPerGame >= 0.6,
      player.assistsPerGame >= 0.8,
      player.goalContributionsPerGame >= 1.5,
      player.motmPercent >= 0.25,
    ],
  },
  {
    key: "kylianMbappe",
    name: "Kylian Mbappé",
    styleLabel: "Explosive Scoring Star",
    positionGroups: ["forward", "unknown"],
    ideal: { scoring: 94, creation: 58, output: 90, influence: 86, form: 82 },
    thresholds: ({ player }) => [
      player.goalsPerGame >= 1,
      player.goalContributionsPerGame >= 1.6,
      player.motmPercent >= 0.3,
    ],
  },
  {
    key: "erlingHaaland",
    name: "Erling Haaland",
    styleLabel: "Pure Goal Machine",
    positionGroups: ["forward", "unknown"],
    ideal: { scoring: 100, creation: 42, output: 90, influence: 82, balance: 42 },
    thresholds: ({ player }) => [
      player.goalsPerGame >= 1.2,
      player.assistsPerGame < 0.7,
      player.goalContributionsPerGame >= 1.4,
      player.goalBias >= 0.62,
    ],
  },
  {
    key: "harryKane",
    name: "Harry Kane",
    styleLabel: "Scoring Playmaker",
    positionGroups: ["forward", "unknown"],
    ideal: { scoring: 86, creation: 58, output: 82, influence: 82, balance: 68 },
    thresholds: ({ player }) => [
      player.goalsPerGame >= 0.85,
      player.assistsPerGame >= 0.45,
      player.assistsPerGame <= 0.75,
      player.goalContributionsPerGame >= 1.4,
      player.goalBias >= 0.56,
      player.goalBias <= 0.68,
    ],
  },
  {
    key: "robertLewandowski",
    name: "Robert Lewandowski",
    styleLabel: "Reliable Elite Finisher",
    positionGroups: ["forward", "unknown"],
    ideal: { scoring: 94, creation: 38, output: 82, influence: 84, teamSuccess: 66 },
    thresholds: ({ player }) => [
      player.goalsPerGame >= 1,
      player.averageRating >= 8.3,
      player.motmPercent >= 0.2,
      player.winRate >= 0.5,
    ],
  },
  {
    key: "mohamedSalah",
    name: "Mohamed Salah",
    styleLabel: "Goal-First Creator",
    positionGroups: ["forward", "unknown"],
    ideal: { scoring: 86, creation: 64, output: 86, influence: 82, balance: 60 },
    thresholds: ({ player }) => [
      player.goalsPerGame >= 0.85,
      player.assistsPerGame >= 0.5,
      player.goalContributionsPerGame >= 1.5,
      player.averageRating >= 8.2,
    ],
  },
  {
    key: "kevinDeBruyne",
    name: "Kevin De Bruyne",
    styleLabel: "Elite Playmaker",
    positionGroups: ["midfielder", "forward", "unknown"],
    ideal: { scoring: 48, creation: 92, output: 78, influence: 84, balance: 62, passing: 86 },
    thresholds: ({ player }) => [
      player.assistsPerGame >= 0.9,
      player.goalsPerGame >= 0.35,
      player.averageRating >= 8.3,
      player.goalContributionsPerGame >= 1.3,
    ],
  },
  {
    key: "brunoFernandes",
    name: "Bruno Fernandes",
    styleLabel: "High-Impact Creator",
    positionGroups: ["midfielder", "forward", "unknown"],
    ideal: { scoring: 58, creation: 82, output: 82, influence: 86, teamSuccess: 50, passing: 78 },
    thresholds: ({ player }) => [
      player.assistsPerGame >= 0.75,
      player.goalContributionsPerGame >= 1.4,
      player.motmPercent >= 0.25,
    ],
  },
  {
    key: "martinOdegaard",
    name: "Martin Ødegaard",
    styleLabel: "Technical Creator",
    positionGroups: ["midfielder", "unknown"],
    ideal: { scoring: 42, creation: 78, output: 68, influence: 78, discipline: 86, passing: 82 },
    thresholds: ({ player, scores }) => [
      player.assistsPerGame >= 0.7,
      player.averageRating >= 8.2,
      player.winRate >= 0.5,
      scores.discipline >= 75,
    ],
  },
  {
    key: "thomasMuller",
    name: "Thomas Müller",
    styleLabel: "System Creator",
    positionGroups: ["forward", "midfielder", "unknown"],
    ideal: { scoring: 55, creation: 82, output: 78, influence: 72, balance: 70, passing: 74 },
    thresholds: ({ player }) => [
      player.assistsPerGame >= 0.75,
      player.goalsPerGame >= 0.45,
      player.goalContributionsPerGame >= 1.3,
      player.motmPercent >= 0.15,
    ],
  },
  {
    key: "judeBellingham",
    name: "Jude Bellingham",
    styleLabel: "Two-Way Superstar",
    positionGroups: ["midfielder", "unknown"],
    ideal: { scoring: 56, creation: 55, output: 66, influence: 82, defense: 66 },
    thresholds: ({ player, scores }) => [
      player.goalsPerGame >= 0.45,
      player.assistsPerGame >= 0.4,
      scores.defense !== undefined ? scores.defense >= 55 : undefined,
      player.averageRating >= 8.2,
    ],
  },
  {
    key: "bukayoSaka",
    name: "Bukayo Saka",
    styleLabel: "Balanced Wide Star",
    positionGroups: ["forward", "midfielder", "unknown"],
    ideal: { scoring: 60, creation: 62, output: 72, influence: 74, teamSuccess: 62, balance: 84 },
    thresholds: ({ player }) => [
      player.goalsPerGame >= 0.5,
      player.assistsPerGame >= 0.5,
      player.goalContributionsPerGame >= 1.2,
      player.winRate >= 0.5,
      player.averageRating >= 8,
    ],
  },
  {
    key: "viniciusJr",
    name: "Vinícius Jr.",
    styleLabel: "Game-Breaking Attacker",
    positionGroups: ["forward", "unknown"],
    ideal: { scoring: 72, creation: 68, output: 82, influence: 84, form: 82 },
    thresholds: ({ player, scores }) => [
      player.goalContributionsPerGame >= 1.4,
      player.motmPercent >= 0.25,
      scores.scoring >= 60,
      scores.creation >= 50,
    ],
  },
  {
    key: "sonHeungMin",
    name: "Son Heung-min",
    styleLabel: "Efficient Scorer-Creator",
    positionGroups: ["forward", "unknown"],
    ideal: { scoring: 78, creation: 62, output: 78, influence: 78, discipline: 92 },
    thresholds: ({ player, scores }) => [
      player.goalsPerGame >= 0.75,
      player.assistsPerGame >= 0.45,
      player.averageRating >= 8.2,
      scores.discipline >= 80,
    ],
  },
  {
    key: "antoineGriezmann",
    name: "Antoine Griezmann",
    styleLabel: "Creative Two-Way Forward",
    positionGroups: ["forward", "midfielder", "unknown"],
    ideal: { scoring: 62, creation: 62, output: 72, influence: 76, defense: 58, balance: 86 },
    thresholds: ({ player, scores }) => [
      player.goalsPerGame >= 0.5,
      player.assistsPerGame >= 0.5,
      scores.defense !== undefined ? scores.defense >= 50 : undefined,
      player.averageRating >= 8,
    ],
  },
  {
    key: "trentAlexanderArnold",
    name: "Trent Alexander-Arnold",
    styleLabel: "Creative Defender",
    positionGroups: ["defender", "midfielder", "unknown"],
    ideal: { scoring: 24, creation: 72, output: 56, influence: 68, defense: 64, passing: 80 },
    thresholds: ({ player, scores }) => [
      player.assistsPerGame >= 0.6,
      scores.defense !== undefined ? scores.defense >= 55 : undefined,
      player.averageRating >= 7.8,
    ],
  },
  {
    key: "ngoloKante",
    name: "N’Golo Kanté",
    styleLabel: "Defensive Engine",
    positionGroups: ["midfielder", "defender", "unknown"],
    ideal: { scoring: 12, creation: 20, output: 24, influence: 68, defense: 88, discipline: 92 },
    thresholds: ({ player, scores }) => [
      scores.defense !== undefined ? scores.defense >= 75 : undefined,
      player.tacklePercent !== undefined ? player.tacklePercent >= 55 : undefined,
      scores.discipline >= 80,
      player.averageRating >= 7.8,
    ],
  },
  {
    key: "declanRice",
    name: "Declan Rice",
    styleLabel: "Balanced Ball Winner",
    positionGroups: ["midfielder", "defender", "unknown"],
    ideal: { scoring: 22, creation: 30, output: 34, influence: 72, defense: 76, discipline: 86, passing: 68 },
    thresholds: ({ player, scores }) => [
      scores.defense !== undefined ? scores.defense >= 65 : undefined,
      player.tacklePercent !== undefined ? player.tacklePercent >= 50 : undefined,
      player.averageRating >= 8,
      player.winRate >= 0.5,
    ],
  },
  {
    key: "rodri",
    name: "Rodri",
    styleLabel: "Controlled Anchor",
    positionGroups: ["midfielder", "defender", "unknown"],
    ideal: { scoring: 20, creation: 30, output: 34, influence: 78, defense: 70, discipline: 94, teamSuccess: 72, passing: 76 },
    thresholds: ({ player, scores }) => [
      player.averageRating >= 8.2,
      player.winRate >= 0.55,
      scores.defense !== undefined ? scores.defense >= 60 : undefined,
      scores.discipline >= 80,
    ],
  },
  {
    key: "casemiro",
    name: "Casemiro",
    styleLabel: "Aggressive Ball Winner",
    positionGroups: ["midfielder", "defender", "unknown"],
    ideal: { scoring: 18, creation: 22, output: 28, influence: 68, defense: 82, aggression: 78 },
    thresholds: ({ player, scores }) => [
      scores.defense !== undefined ? scores.defense >= 70 : undefined,
      player.tacklePercent !== undefined ? player.tacklePercent >= 45 : undefined,
      player.averageRating >= 7.8,
      scores.aggression !== undefined ? scores.aggression >= 65 : undefined,
    ],
  },
  {
    key: "virgilVanDijk",
    name: "Virgil van Dijk",
    styleLabel: "Defensive Leader",
    positionGroups: ["defender", "unknown"],
    ideal: { scoring: 12, creation: 18, output: 22, influence: 78, defense: 78, discipline: 92, teamSuccess: 72 },
    thresholds: ({ player, scores }) => [
      player.averageRating >= 8.2,
      player.winRate >= 0.55,
      player.tacklePercent !== undefined ? player.tacklePercent >= 55 : undefined,
      scores.discipline >= 80,
    ],
  },
  {
    key: "rubenDias",
    name: "Rúben Dias",
    styleLabel: "Reliable Defensive Organizer",
    positionGroups: ["defender", "unknown"],
    ideal: { scoring: 10, creation: 16, output: 20, influence: 74, defense: 76, discipline: 96, teamSuccess: 72 },
    thresholds: ({ player, scores }) => [
      player.winRate >= 0.55,
      player.tacklePercent !== undefined ? player.tacklePercent >= 55 : undefined,
      scores.discipline >= 85,
      player.averageRating >= 8,
    ],
  },
  {
    key: "sergioRamos",
    name: "Sergio Ramos",
    styleLabel: "Aggressive Defensive Leader",
    positionGroups: ["defender", "unknown"],
    ideal: { scoring: 28, creation: 18, output: 28, influence: 76, defense: 78, discipline: 58, aggression: 84 },
    thresholds: ({ player, scores }) => [
      scores.defense !== undefined ? scores.defense >= 65 : undefined,
      player.averageRating >= 8,
      scores.aggression !== undefined ? scores.aggression >= 65 : undefined,
      player.redCardsPerGame >= 0.01,
    ],
  },
  {
    key: "federicoValverde",
    name: "Federico Valverde",
    styleLabel: "High-Motor Hybrid",
    positionGroups: ["midfielder", "defender", "unknown"],
    ideal: { scoring: 32, creation: 38, output: 46, influence: 70, defense: 74, discipline: 84, teamSuccess: 70 },
    thresholds: ({ player, scores }) => [
      scores.defense !== undefined ? scores.defense >= 65 : undefined,
      player.winRate >= 0.55,
      player.goalContributionsPerGame >= 0.6,
      scores.discipline >= 75,
    ],
  },
  {
    key: "stevenGerrard",
    name: "Steven Gerrard",
    styleLabel: "All-Action Leader",
    positionGroups: ["midfielder", "unknown"],
    ideal: { scoring: 60, creation: 62, output: 68, influence: 80, defense: 60, balance: 84, passing: 70 },
    thresholds: ({ player, scores }) => [
      player.goalsPerGame >= 0.5,
      player.assistsPerGame >= 0.5,
      player.motmPercent >= 0.2,
      scores.defense !== undefined ? scores.defense >= 50 : undefined,
    ],
  },
  {
    key: "frankLampard",
    name: "Frank Lampard",
    styleLabel: "Goal-Scoring Midfielder",
    positionGroups: ["midfielder", "unknown"],
    ideal: { scoring: 70, creation: 42, output: 64, influence: 74, balance: 58 },
    thresholds: ({ player }) => [
      player.goalsPerGame >= 0.65,
      player.assistsPerGame >= 0.3,
      player.averageRating >= 8,
    ],
  },
  {
    key: "yayaToure",
    name: "Yaya Touré",
    styleLabel: "Midfield Powerhouse",
    positionGroups: ["midfielder", "unknown"],
    ideal: { scoring: 56, creation: 56, output: 62, influence: 76, defense: 68, balance: 84, passing: 70 },
    thresholds: ({ player, scores }) => [
      player.goalsPerGame >= 0.45,
      player.assistsPerGame >= 0.45,
      scores.defense !== undefined ? scores.defense >= 60 : undefined,
      player.averageRating >= 8,
    ],
  },
  {
    key: "arturoVidal",
    name: "Arturo Vidal",
    styleLabel: "Chaotic Two-Way Enforcer",
    positionGroups: ["midfielder", "defender", "unknown"],
    ideal: { scoring: 34, creation: 36, output: 46, influence: 66, defense: 78, discipline: 58, aggression: 88 },
    thresholds: ({ player, scores }) => [
      scores.defense !== undefined ? scores.defense >= 65 : undefined,
      player.goalContributionsPerGame >= 0.5,
      scores.aggression !== undefined ? scores.aggression >= 70 : undefined,
      scores.discipline <= 75,
    ],
  },
];

const GOAL_FIRST_COMP_NAMES: PlayerCompName[] = [
  "Cristiano Ronaldo",
  "Kylian Mbappé",
  "Erling Haaland",
  "Harry Kane",
  "Robert Lewandowski",
  "Mohamed Salah",
  "Son Heung-min",
  "Frank Lampard",
];

const WIDE_FORWARD_COMP_NAMES: PlayerCompName[] = [
  "Mohamed Salah",
  "Bukayo Saka",
  "Vinícius Jr.",
  "Son Heung-min",
];

function clamp(value: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

function round(value: number) {
  return Math.round(clamp(value));
}

function valueOrZero(value: number | null | undefined) {
  return Number.isFinite(value) ? Number(value) : 0;
}

function normalizeRate(value: number | null | undefined) {
  const numericValue = valueOrZero(value);

  if (numericValue > 1) {
    return clamp(numericValue / 100, 0, 1);
  }

  return clamp(numericValue, 0, 1);
}

function normalizePercent(value: number | null | undefined) {
  const numericValue = valueOrZero(value);

  if (numericValue <= 1) {
    return clamp(numericValue * 100);
  }

  return clamp(numericValue);
}

function normalizePosition(position: string | null | undefined) {
  return (position ?? "").trim().toUpperCase();
}

function getPositionGroup(position: string | null | undefined): PositionGroup {
  const normalized = normalizePosition(position);

  if (!normalized || normalized === "N/A" || normalized === "NA") {
    return "unknown";
  }

  if (
    normalized.includes("GK") ||
    normalized.includes("GOALKEEPER") ||
    normalized.includes("KEEPER")
  ) {
    return "goalkeeper";
  }

  if (
    normalized.includes("CB") ||
    normalized.includes("LB") ||
    normalized.includes("RB") ||
    normalized.includes("LWB") ||
    normalized.includes("RWB") ||
    normalized.includes("DEF")
  ) {
    return "defender";
  }

  if (
    normalized.includes("CDM") ||
    normalized.includes("CM") ||
    normalized.includes("CAM") ||
    normalized.includes("LM") ||
    normalized.includes("RM") ||
    normalized.includes("MID")
  ) {
    return "midfielder";
  }

  if (
    normalized.includes("ST") ||
    normalized.includes("CF") ||
    normalized.includes("LW") ||
    normalized.includes("RW") ||
    normalized.includes("LF") ||
    normalized.includes("RF") ||
    normalized.includes("FWD") ||
    normalized.includes("FORWARD")
  ) {
    return "forward";
  }

  return "unknown";
}

function isForwardEligibleComp(name: PlayerCompName) {
  return FORWARD_ELIGIBLE_COMPS.includes(name);
}

function isMidfielderEligibleComp(name: PlayerCompName) {
  return MIDFIELDER_ELIGIBLE_COMPS.includes(name);
}

function isDefenderEligibleComp(name: PlayerCompName) {
  return !isForwardEligibleComp(name) && !isMidfielderEligibleComp(name);
}

function isProfileEligibleForPosition(profile: PlayerProfile, positionGroup: PositionGroup) {
  if (positionGroup === "unknown") {
    return true;
  }

  if (positionGroup === "forward") {
    return isForwardEligibleComp(profile.name);
  }

  if (positionGroup === "midfielder") {
    return isMidfielderEligibleComp(profile.name);
  }

  if (positionGroup === "defender" || positionGroup === "goalkeeper") {
    return isDefenderEligibleComp(profile.name);
  }

  return true;
}

function isCentralForwardPosition(position: string) {
  return position.includes("ST") || position.includes("CF");
}

function isRightForwardPosition(position: string) {
  return position.includes("RW") || position.includes("RF") || position.includes("RM");
}

function isLeftForwardPosition(position: string) {
  return position.includes("LW") || position.includes("LF") || position.includes("LM");
}

function interpolate(value: number, points: Array<[number, number]>) {
  if (value <= points[0][0]) {
    return points[0][1];
  }

  for (let index = 1; index < points.length; index += 1) {
    const [rightValue, rightScore] = points[index];
    const [leftValue, leftScore] = points[index - 1];

    if (value <= rightValue) {
      const progress = (value - leftValue) / (rightValue - leftValue);

      return leftScore + (rightScore - leftScore) * progress;
    }
  }

  return points[points.length - 1][1];
}

function averageBooleans(values: Array<boolean | undefined>) {
  const usableValues = values.filter((value): value is boolean => value !== undefined);

  if (usableValues.length === 0) {
    return 0.5;
  }

  return usableValues.filter(Boolean).length / usableValues.length;
}

function scoreCloseness(actual: number | undefined, ideal: number | undefined) {
  if (actual === undefined || ideal === undefined) {
    return undefined;
  }

  return clamp(100 - Math.abs(actual - ideal) * 1.18);
}

function averageNumbers(values: Array<number | undefined>) {
  const usableValues = values.filter((value): value is number => value !== undefined);

  if (usableValues.length === 0) {
    return 50;
  }

  return usableValues.reduce((total, value) => total + value, 0) / usableValues.length;
}

function derivePlayerStats(input: PlayerCompInput): DerivedPlayerStats {
  const position = normalizePosition(input.position);
  const positionGroup = getPositionGroup(input.position);
  const games = valueOrZero(input.games ?? input.matches);
  const goals = valueOrZero(input.goals);
  const assists = valueOrZero(input.assists);
  const goalContributions =
    valueOrZero(input.goalContributions) || goals + assists;
  const goalsPerGame = Number.isFinite(input.goalsPerGame)
    ? Number(input.goalsPerGame)
    : games > 0
      ? goals / games
      : 0;
  const assistsPerGame = Number.isFinite(input.assistsPerGame)
    ? Number(input.assistsPerGame)
    : games > 0
      ? assists / games
      : 0;
  const goalContributionsPerGame = Number.isFinite(input.goalContributionsPerGame)
    ? Number(input.goalContributionsPerGame)
    : games > 0
      ? goalContributions / games
      : 0;
  const motm = valueOrZero(input.motm ?? input.manOfTheMatch);
  const motmPercent =
    input.motmPercent !== undefined && input.motmPercent !== null
      ? normalizeRate(input.motmPercent)
      : input.manOfTheMatchRate !== undefined && input.manOfTheMatchRate !== null
        ? normalizeRate(input.manOfTheMatchRate)
        : games > 0
          ? motm / games
          : 0;
  const redCards = valueOrZero(input.redCards);
  const tackles = valueOrZero(input.tackles);
  const passesMade = valueOrZero(input.passesMade);
  const passAttempts = valueOrZero(input.passAttempts);
  const passAccuracy =
    input.passAccuracy !== undefined && input.passAccuracy !== null
      ? normalizePercent(input.passAccuracy)
      : passAttempts > 0
        ? (passesMade / passAttempts) * 100
        : undefined;
  const tacklePercent =
    input.tacklePercent !== undefined && input.tacklePercent !== null
      ? normalizePercent(input.tacklePercent)
      : input.tackleSuccessRate !== undefined && input.tackleSuccessRate !== null
        ? normalizePercent(input.tackleSuccessRate)
        : undefined;

  return {
    position,
    positionGroup,
    overall: valueOrZero(input.overall),
    games,
    goals,
    assists,
    goalContributions,
    goalsPerGame,
    assistsPerGame,
    goalContributionsPerGame,
    averageRating: valueOrZero(input.averageRating ?? input.avgRating ?? input.rating),
    winRate: normalizeRate(input.winRate),
    tackles,
    tacklePercent,
    passesMade,
    passAttempts,
    passesMadePerGame: games > 0 ? passesMade / games : undefined,
    passAccuracy,
    motm,
    motmPercent,
    redCards,
    redCardsPerGame: games > 0 ? redCards / games : 0,
    tacklesPerGame: games > 0 ? tackles / games : undefined,
    scorerCreatorBalance:
      1 - Math.abs(goals - assists) / Math.max(goalContributions, 1),
    goalBias: goals / Math.max(goalContributions, 1),
    assistBias: assists / Math.max(goalContributions, 1),
  };
}

function getFormScore(form: PlayerCompInput["form"], fallback: number) {
  if (typeof form === "number") {
    return round(form);
  }

  if (typeof form === "string") {
    const normalized = form.toLowerCase();

    if (normalized.includes("hot")) return 88;
    if (normalized.includes("reliable")) return 70;
    if (normalized.includes("slump")) return 32;
    if (normalized.includes("absent")) return 18;
    if (normalized.includes("new")) return 50;
  }

  return fallback;
}

function calculateScores(input: PlayerCompInput, player: DerivedPlayerStats): PlayerCompScores {
  const scoring = round(
    interpolate(player.goalsPerGame, [
      [0, 0],
      [0.3, 35],
      [0.6, 60],
      [0.9, 80],
      [1.2, 100],
    ]),
  );
  const creation = round(
    interpolate(player.assistsPerGame, [
      [0, 0],
      [0.25, 35],
      [0.5, 60],
      [0.8, 80],
      [1.1, 100],
    ]),
  );
  const output = round(
    interpolate(player.goalContributionsPerGame, [
      [0, 0],
      [0.5, 35],
      [1, 60],
      [1.5, 80],
      [2, 100],
    ]),
  );
  const ratingScore = interpolate(player.averageRating, [
    [0, 0],
    [6.5, 30],
    [7.5, 55],
    [8, 70],
    [8.5, 85],
    [9, 100],
  ]);
  const motmScore = interpolate(player.motmPercent, [
    [0, 0],
    [0.1, 35],
    [0.2, 60],
    [0.3, 80],
    [0.4, 100],
  ]);
  const influence = round(0.6 * ratingScore + 0.4 * motmScore);
  const tacklesVolumeScore =
    player.tacklesPerGame !== undefined
      ? interpolate(player.tacklesPerGame, [
          [0, 0],
          [1, 35],
          [2, 60],
          [3, 80],
          [4, 100],
        ])
      : undefined;
  const defense =
    tacklesVolumeScore !== undefined && player.tacklePercent !== undefined
      ? round(0.6 * tacklesVolumeScore + 0.4 * player.tacklePercent)
      : undefined;
  const discipline = round(
    interpolate(player.redCardsPerGame, [
      [0, 100],
      [0.01, 90],
      [0.02, 80],
      [0.05, 60],
      [0.1, 30],
      [0.15, 0],
    ]),
  );
  const balance = round(player.scorerCreatorBalance * 100);
  const teamSuccess = round(player.winRate * 100);
  const passing =
    player.passesMadePerGame !== undefined && player.passAccuracy !== undefined
      ? round(
          0.55 *
            interpolate(player.passesMadePerGame, [
              [0, 0],
              [5, 30],
              [12, 60],
              [20, 82],
              [30, 100],
            ]) +
            0.45 * player.passAccuracy,
        )
      : undefined;
  const aggression =
    tacklesVolumeScore !== undefined
      ? round(
          0.7 * tacklesVolumeScore +
            0.3 *
              interpolate(player.redCardsPerGame, [
                [0, 10],
                [0.01, 40],
                [0.03, 65],
                [0.06, 85],
                [0.1, 100],
              ]),
        )
      : undefined;

  return {
    scoring,
    creation,
    output,
    influence,
    form: getFormScore(input.form, output),
    defense,
    discipline,
    balance,
    teamSuccess,
    aggression,
    passing,
  };
}

function scorePlayerProfile(profile: PlayerProfile, context: ScoreContext) {
  const profileFit = averageNumbers([
    scoreCloseness(context.scores.scoring, profile.ideal.scoring),
    scoreCloseness(context.scores.creation, profile.ideal.creation),
    scoreCloseness(context.scores.output, profile.ideal.output),
    scoreCloseness(context.scores.influence, profile.ideal.influence),
    scoreCloseness(context.scores.form, profile.ideal.form),
    scoreCloseness(context.scores.defense, profile.ideal.defense),
    scoreCloseness(context.scores.discipline, profile.ideal.discipline),
    scoreCloseness(context.scores.balance, profile.ideal.balance),
    scoreCloseness(context.scores.teamSuccess, profile.ideal.teamSuccess),
    scoreCloseness(context.scores.aggression, profile.ideal.aggression),
    scoreCloseness(context.scores.passing, profile.ideal.passing),
  ]);
  const thresholdFit = averageBooleans(profile.thresholds(context)) * 100;

  const positionFit = getPositionFit(profile, context.player);
  const biasFit = getBiasFit(profile, context.player);
  const profileModifier = getProfileModifier(profile, context.player, context.scores);
  const diversityModifier = getDiversityModifier(profile, context.player);
  const passingModifier = getPassingModifier(profile, context.player, context.scores);
  const roleFit = getRoleFit(profile, context.player);

  return (
    (0.58 * profileFit +
      0.32 * thresholdFit +
      10 * biasFit +
      profileModifier +
      diversityModifier +
      passingModifier) *
    positionFit *
    roleFit
  );
}

function getPositionFit(profile: PlayerProfile, player: DerivedPlayerStats) {
  if (player.positionGroup === "unknown") {
    return 1;
  }

  if (isProfileEligibleForPosition(profile, player.positionGroup)) {
    return 1;
  }

  return 0.02;
}

function getBiasFit(profile: PlayerProfile, player: DerivedPlayerStats) {
  const isGoalFirstComp = GOAL_FIRST_COMP_NAMES.includes(profile.name);
  const assistHeavy = player.assistBias > player.goalBias + 0.08;
  const veryAssistHeavy = player.assistBias > player.goalBias + 0.18;
  const goalHeavy = player.goalBias > player.assistBias + 0.08;

  if (isGoalFirstComp && veryAssistHeavy) {
    return 0.15;
  }

  if (isGoalFirstComp && assistHeavy) {
    return 0.45;
  }

  if (!isGoalFirstComp && profile.ideal.creation !== undefined && profile.ideal.creation >= 70 && assistHeavy) {
    return 1;
  }

  if (!isGoalFirstComp && profile.ideal.scoring !== undefined && profile.ideal.scoring >= 80 && goalHeavy) {
    return 0.9;
  }

  return 0.75;
}

function getRoleFit(profile: PlayerProfile, player: DerivedPlayerStats) {
  if (!isCentralForwardPosition(player.position)) {
    return 1;
  }

  const strikerGoalDominant =
    player.goalsPerGame >= 0.85 &&
    player.goalBias >= 0.62 &&
    player.goals > player.assists * 1.45;

  if (!strikerGoalDominant) {
    return 1;
  }

  if (WIDE_FORWARD_COMP_NAMES.includes(profile.name)) {
    return 0.42;
  }

  return 1;
}

function getProfileModifier(
  profile: PlayerProfile,
  player: DerivedPlayerStats,
  scores: PlayerCompScores,
) {
  const highGoalShare = player.goalBias >= 0.62;
  const veryHighGoalShare = player.goalBias >= 0.72;
  const hasSomeCreation = player.assistsPerGame >= 0.25;
  const strongCreation = player.assistsPerGame >= 0.45;
  const balancedScorerCreator = player.goalBias >= 0.48 && player.goalBias <= 0.68;
  const assistHeavy = player.assistBias > player.goalBias + 0.08;

  if (profile.name === "Erling Haaland") {
    let modifier = 0;

    if (player.goalsPerGame >= 1.25) modifier += 9;
    if (highGoalShare) modifier += 4;
    if (veryHighGoalShare) modifier += 6;
    if (hasSomeCreation && player.assistsPerGame <= 0.7) modifier += 4;
    if (player.goalContributionsPerGame >= 1.5) modifier += 4;
    if (player.assistsPerGame > 0.85 || player.goalBias < 0.58) modifier -= 14;

    return modifier;
  }

  if (profile.name === "Harry Kane") {
    let modifier = 0;
    const inKaneAssistLane =
      player.assistsPerGame >= 0.45 && player.assistsPerGame <= 0.75;
    const inKaneGoalLane =
      player.goalsPerGame >= 0.85 && player.goalsPerGame <= 1.15;
    const inKaneBiasLane = player.goalBias >= 0.56 && player.goalBias <= 0.68;

    if (inKaneBiasLane && inKaneAssistLane && inKaneGoalLane) modifier += 6;
    if (balancedScorerCreator && strongCreation && inKaneAssistLane) modifier += 3;
    if (!inKaneBiasLane) modifier -= 14;
    if (!inKaneAssistLane) modifier -= 12;
    if (!inKaneGoalLane) modifier -= 7;
    if (player.position && !isCentralForwardPosition(player.position)) modifier -= 18;
    if (veryHighGoalShare || assistHeavy) modifier -= 14;
    if (player.assistsPerGame > 0.95) modifier -= 8;

    return modifier;
  }

  if (profile.name === "Mohamed Salah") {
    let modifier = 0;

    if (player.goalsPerGame >= 0.75 && player.goalBias >= 0.52) modifier += 4;
    if (player.assistsPerGame >= 0.45 && player.assistsPerGame <= 0.85) modifier += 2;
    if (isRightForwardPosition(player.position)) modifier += 3;
    if (player.goalBias > 0.72) modifier -= 4;

    return modifier;
  }

  if (profile.name === "Son Heung-min") {
    let modifier = 0;

    if (player.goalsPerGame >= 0.7 && player.assistsPerGame >= 0.35) modifier += 3;
    if (player.goalBias >= 0.5 && player.goalBias <= 0.72) modifier += 2;
    if (scores.discipline >= 80) modifier += 3;
    if (isLeftForwardPosition(player.position)) modifier += 4;

    return modifier;
  }

  if (profile.name === "Vinícius Jr.") {
    let modifier = 0;

    if (scores.output >= 78 && scores.scoring >= 65 && scores.creation >= 50) {
      modifier += 5;
    }
    if (isLeftForwardPosition(player.position)) modifier += 5;
    if (player.assistsPerGame > 0.9) modifier -= 5;

    return modifier;
  }

  if (profile.name === "Bukayo Saka") {
    let modifier = 0;

    if (player.goalBias >= 0.42 && player.goalBias <= 0.62) modifier += 5;
    if (scores.teamSuccess >= 50 && player.goalContributionsPerGame >= 1.1) {
      modifier += 4;
    }
    if (isRightForwardPosition(player.position)) modifier += 4;

    return modifier;
  }

  if (profile.name === "Neymar") {
    let modifier = 0;

    if (player.assistsPerGame >= 0.75 && scores.scoring >= 60) modifier += 5;
    if (player.winRate < 0.55 && scores.influence >= 75) modifier += 3;

    return modifier;
  }

  if (profile.name === "Antoine Griezmann") {
    let modifier = 0;

    if (player.goalBias >= 0.42 && player.goalBias <= 0.58) modifier += 4;
    if (
      player.positionGroup !== "unknown" &&
      scores.defense !== undefined &&
      scores.defense >= 45
    ) {
      modifier += 4;
    }
    if (player.goalContributionsPerGame >= 1.05) modifier += 2;

    return modifier;
  }

  if (profile.name === "Cristiano Ronaldo") {
    let modifier = 0;

    if (player.goalsPerGame >= 1 && player.goalBias >= 0.6) modifier += 7;
    if (player.goalBias >= 0.6 && player.goalBias <= 0.76) modifier += 5;
    if (player.assistsPerGame > 0.75 || player.goalBias < 0.55) modifier -= 8;

    return modifier;
  }

  if (profile.name === "Kylian Mbappé") {
    let modifier = 0;

    if (scores.scoring >= 88 && scores.output >= 85 && player.goalBias >= 0.55) {
      modifier += 5;
    }
    if (player.assistsPerGame > 0.85) modifier -= 6;

    return modifier;
  }

  if (profile.name === "Robert Lewandowski") {
    let modifier = 0;

    if (player.goalsPerGame >= 1 && player.assistsPerGame <= 0.55) modifier += 4;
    if (player.assistsPerGame > 0.75) modifier -= 8;

    return modifier;
  }

  return 0;
}

function getPassingModifier(
  profile: PlayerProfile,
  player: DerivedPlayerStats,
  scores: PlayerCompScores,
) {
  if (scores.passing === undefined || player.passesMadePerGame === undefined) {
    return 0;
  }

  const highPassing = scores.passing >= 70;
  const elitePassing = scores.passing >= 82;
  const lowPassing = scores.passing < 45;

  if (
    highPassing &&
    (profile.name === "Kevin De Bruyne" ||
      profile.name === "Bruno Fernandes" ||
      profile.name === "Martin Ødegaard" ||
      profile.name === "Thomas Müller" ||
      profile.name === "Trent Alexander-Arnold")
  ) {
    return elitePassing ? 7 : 5;
  }

  if (
    highPassing &&
    (profile.name === "Rodri" ||
      profile.name === "Declan Rice" ||
      profile.name === "Yaya Touré" ||
      profile.name === "Steven Gerrard")
  ) {
    return 4;
  }

  if (
    lowPassing &&
    (profile.name === "Kevin De Bruyne" ||
      profile.name === "Bruno Fernandes" ||
      profile.name === "Martin Ødegaard")
  ) {
    return -6;
  }

  if (
    lowPassing &&
    (profile.name === "Erling Haaland" || profile.name === "Cristiano Ronaldo")
  ) {
    return 3;
  }

  return 0;
}

function getDiversityModifier(profile: PlayerProfile, player: DerivedPlayerStats) {
  if (
    player.positionGroup === "defender" ||
    player.positionGroup === "goalkeeper" ||
    player.positionGroup === "unknown" ||
    !isProfileEligibleForPosition(profile, player.positionGroup)
  ) {
    return 0;
  }

  const attackingProfiles: PlayerCompName[] = [
    "Lionel Messi",
    "Neymar",
    "Kylian Mbappé",
    "Harry Kane",
    "Mohamed Salah",
    "Bukayo Saka",
    "Vinícius Jr.",
    "Son Heung-min",
    "Antoine Griezmann",
    "Thomas Müller",
  ];

  if (!attackingProfiles.includes(profile.name)) {
    return 0;
  }

  const signature = `${profile.key}:${player.position}:${player.games}:${player.goals}:${player.assists}:${Math.round(player.averageRating * 10)}:${Math.round(player.winRate * 100)}`;
  let hash = 0;

  for (let index = 0; index < signature.length; index += 1) {
    hash = (hash * 31 + signature.charCodeAt(index)) % 9973;
  }

  return (hash % 7) - 3;
}

function getOutputTier(goalContributionsPerGame: number) {
  if (goalContributionsPerGame >= 2) return "World Class";
  if (goalContributionsPerGame >= 1.5) return "Elite";
  if (goalContributionsPerGame >= 1) return "Gold";
  if (goalContributionsPerGame >= 0.5) return "Silver";
  return "Bronze";
}

function getRatingTier(averageRating: number) {
  if (averageRating >= 9) return "World Class";
  if (averageRating >= 8.5) return "Elite";
  if (averageRating >= 8) return "Great";
  if (averageRating >= 7.3) return "Good";
  if (averageRating >= 6.5) return "Average";
  return "Poor";
}

function getMotmTier(motmPercent: number) {
  if (motmPercent >= 0.4) return "MVP Level";
  if (motmPercent >= 0.3) return "Elite";
  if (motmPercent >= 0.2) return "Strong";
  if (motmPercent >= 0.1) return "Solid";
  return "Low";
}

function getWinRateTier(winRate: number) {
  if (winRate >= 0.65) return "Elite";
  if (winRate >= 0.55) return "Strong";
  if (winRate >= 0.45) return "Solid";
  if (winRate >= 0.35) return "Mixed";
  return "Poor";
}

function getArchetype(player: DerivedPlayerStats, scores: PlayerCompScores) {
  if (scores.output >= 80 && scores.influence >= 80 && scores.teamSuccess < 55) {
    return "Carry Player";
  }
  if (scores.scoring >= 75 && scores.creation >= 75) return "Complete Forward";
  if (player.games >= 200 && player.goalContributions >= 300) return "Volume Legend";
  if (scores.defense !== undefined && scores.defense >= 70 && scores.aggression !== undefined && scores.aggression >= 70 && scores.discipline < 75) {
    return "Aggressive Destroyer";
  }
  if (scores.output >= 55 && scores.defense !== undefined && scores.defense >= 65) {
    return "Two-Way Engine";
  }
  if (scores.defense !== undefined && scores.defense >= 70 && scores.output < 60 && scores.discipline >= 80) {
    return "Defensive Anchor";
  }
  if (scores.scoring >= 75 && scores.creation < 65) return "Pure Finisher";
  if (scores.creation >= 75 && scores.scoring < 65) return "Creator";
  if (player.averageRating >= 8 && player.winRate >= 0.55 && scores.balance >= 65) {
    return "System Player";
  }

  return "Balanced Contributor";
}

function getResultStyleLabel(archetype: string, primaryStyle: string) {
  if (archetype === "Complete Forward" || archetype === "Carry Player") {
    return "Elite scorer/creator balance";
  }

  return primaryStyle;
}

function formatPercent(rate: number) {
  return `${Math.round(rate * 100)}%`;
}

function createSummary(profile: PlayerProfile, similarityScore: number): PlayerCompSummary {
  return {
    name: profile.name,
    styleLabel: profile.styleLabel,
    similarityScore: round(similarityScore),
    imagePath: PLAYER_COMP_IMAGES[profile.key] ?? PLAYER_COMP_IMAGES.fallback,
  };
}

function createReasons(player: DerivedPlayerStats, scores: PlayerCompScores, primary: PlayerProfile) {
  const reasons = [
    `${player.goalsPerGame.toFixed(2)} goals and ${player.assistsPerGame.toFixed(2)} assists per game.`,
    `${player.goalContributionsPerGame.toFixed(2)} G/A per game with a ${player.averageRating.toFixed(1)} average rating.`,
    `${formatPercent(player.motmPercent)} MOTM rate and ${formatPercent(player.winRate)} win rate.`,
  ];

  if (player.overall > 0) {
    reasons.push(`${player.overall} overall rating from the player profile payload.`);
  }

  if (scores.passing !== undefined && player.passesMadePerGame !== undefined) {
    reasons.push(`${player.passesMadePerGame.toFixed(2)} passes made per game with ${Math.round(player.passAccuracy ?? 0)}% pass success.`);
  }

  if (scores.defense !== undefined && player.tacklesPerGame !== undefined) {
    reasons.push(`${player.tacklesPerGame.toFixed(2)} tackles per game with ${Math.round(player.tacklePercent ?? 0)}% tackle success.`);
  }

  if (player.redCards > 0 || primary.name === "Sergio Ramos" || primary.name === "Arturo Vidal") {
    reasons.push(`${player.redCards} red cards across ${player.games} games.`);
  }

  return reasons.slice(0, 5);
}

function createExplanation(
  player: DerivedPlayerStats,
  primary: PlayerProfile,
  archetype: string,
) {
  const carryNote =
    archetype === "Carry Player"
      ? ` The ${formatPercent(player.winRate)} win rate also gives them a carry-player profile.`
      : ` The ${formatPercent(player.winRate)} win rate rounds out the profile.`;

  return `This player matches a ${primary.name}-style profile because they fit a ${primary.styleLabel.toLowerCase()} stat profile. They average ${player.goalsPerGame.toFixed(2)} goals and ${player.assistsPerGame.toFixed(2)} assists per match, producing ${player.goalContributionsPerGame.toFixed(2)} G/A per game with an ${player.averageRating.toFixed(1)} average rating and a ${formatPercent(player.motmPercent)} MOTM rate.${carryNote}`;
}

export function getPlayerStatComp(input: PlayerCompInput): PlayerStatCompResult {
  const player = derivePlayerStats(input);
  const scores = calculateScores(input, player);
  const context = { player, scores };
  const eligibleProfiles = PLAYER_PROFILES.filter((profile) =>
    isProfileEligibleForPosition(profile, player.positionGroup),
  );
  const rankingProfiles = eligibleProfiles.length > 0 ? eligibleProfiles : PLAYER_PROFILES;
  const rankedProfiles = rankingProfiles.map((profile) => ({
    profile,
    similarityScore: scorePlayerProfile(profile, context),
  })).sort((left, right) => right.similarityScore - left.similarityScore);
  const archetype = getArchetype(player, scores);
  const primary = rankedProfiles[0];
  const secondary = rankedProfiles[1];
  const third = rankedProfiles[2];

  return {
    primaryComp: createSummary(primary.profile, primary.similarityScore),
    secondaryComp: createSummary(secondary.profile, secondary.similarityScore),
    thirdComp: createSummary(third.profile, third.similarityScore),
    archetype,
    styleLabel: getResultStyleLabel(archetype, primary.profile.styleLabel),
    explanation: createExplanation(player, primary.profile, archetype),
    scores,
    tiers: {
      outputTier: getOutputTier(player.goalContributionsPerGame),
      ratingTier: getRatingTier(player.averageRating),
      motmTier: getMotmTier(player.motmPercent),
      winRateTier: getWinRateTier(player.winRate),
    },
    reasons: createReasons(player, scores, primary.profile),
  };
}
