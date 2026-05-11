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
  | "Arturo Vidal"
  | "Alexander Isak"
  | "Antoine Semenyo"
  | "Bryan Mbeumo"
  | "Cole Palmer"
  | "Florian Wirtz"
  | "Gianluigi Donnarumma"
  | "Igor Thiago"
  | "João Cancelo"
  | "João Pedro"
  | "Julián Álvarez"
  | "Nico O’Reilly"
  | "Omar Marmoush"
  | "Rayan Cherki"
  | "Viktor Gyökeres";

export type PlayerCompInput = {
  position?: string | null;
  overall?: number | null;
  height?: string | number | null;
  heightCm?: number | null;
  games?: number | null;
  matches?: number | null;
  goals?: number | null;
  shots?: number | null;
  shotSuccessRate?: number | null;
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
  recentRatings?: number[] | null;
  recentMatches?: Array<{
    rating?: number | null;
    goals?: number | null;
    assists?: number | null;
  }> | null;
};

export type PlayerCompScores = {
  scoring: number;
  creation: number;
  output: number;
  overall?: number;
  height?: number;
  shotEfficiency?: number;
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
  playerRole: PlayerRole;
  overall: number;
  heightCm?: number;
  games: number;
  goals: number;
  goalVolumeBand: GoalVolumeBand;
  shots: number;
  shotsPerGame: number;
  shotSuccessRate?: number;
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
  recentMatchCount: number;
  recentAverageRating?: number;
  recentGoalContributionsPerGame?: number;
  formDelta: number;
  formTrend: "hot" | "good" | "steady" | "slumping" | "cold";
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

type PlayerSeasonProductionProfile = {
  goalsPerGame: number;
  assistsPerGame: number;
  goalContributionsPerGame: number;
  goalBias: number;
  shotSuccessRate?: number;
};

type PositionGroup = "forward" | "midfielder" | "defender" | "goalkeeper" | "unknown";
type GoalVolumeBand = "low" | "productive" | "high" | "elite" | "legendary";
type PlayerRole =
  | "striker"
  | "leftWinger"
  | "rightWinger"
  | "secondStriker"
  | "attackingMidfielder"
  | "centralMidfielder"
  | "defensiveMidfielder"
  | "fullback"
  | "centerBack"
  | "goalkeeper"
  | "unknown";

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
  alexanderIsak: "/player-comps/alexander-isak.png",
  antoineSemenyo: "/player-comps/antoine-semenyo.png",
  bryanMbeumo: "/player-comps/bryan-mbeumo.png",
  colePalmer: "/player-comps/cole palmer.png",
  florianWirtz: "/player-comps/florian-wirtz.png",
  gianluigiDonnarumma: "/player-comps/gianluigi-donnarumma.png",
  igorThiago: "/player-comps/igor-thiago.png",
  joaoCancelo: "/player-comps/joao-cancelo.png",
  joaoPedro: "/player-comps/joao-pedro.png",
  julianAlvarez: "/player-comps/julian-alvarez.png",
  nicoOReilly: "/player-comps/nico-oreilly.png",
  omarMarmoush: "/player-comps/omar-marmoush.png",
  rayanCherki: "/player-comps/rayan-cherki.png",
  viktorGyokeres: "/player-comps/viktor-gyokeres.png",
  fallback: "/player-comps/fallback.png",
} as const;

const PLAYER_PROFILE_HEIGHT_CM: Record<PlayerCompName, number> = {
  "Lionel Messi": 170,
  "Cristiano Ronaldo": 187,
  "Neymar": 175,
  "Kylian Mbappé": 178,
  "Erling Haaland": 195,
  "Harry Kane": 188,
  "Robert Lewandowski": 185,
  "Mohamed Salah": 175,
  "Kevin De Bruyne": 181,
  "Bruno Fernandes": 179,
  "Martin Ødegaard": 178,
  "Thomas Müller": 185,
  "Jude Bellingham": 186,
  "Bukayo Saka": 178,
  "Vinícius Jr.": 176,
  "Son Heung-min": 183,
  "Antoine Griezmann": 176,
  "Trent Alexander-Arnold": 180,
  "N’Golo Kanté": 168,
  "Declan Rice": 188,
  "Rodri": 191,
  "Casemiro": 185,
  "Virgil van Dijk": 193,
  "Rúben Dias": 187,
  "Sergio Ramos": 184,
  "Federico Valverde": 182,
  "Steven Gerrard": 183,
  "Frank Lampard": 184,
  "Yaya Touré": 188,
  "Arturo Vidal": 180,
  "Alexander Isak": 192,
  "Antoine Semenyo": 185,
  "Bryan Mbeumo": 171,
  "Cole Palmer": 189,
  "Florian Wirtz": 177,
  "Gianluigi Donnarumma": 196,
  "Igor Thiago": 188,
  "João Cancelo": 182,
  "João Pedro": 182,
  "Julián Álvarez": 170,
  "Nico O’Reilly": 188,
  "Omar Marmoush": 183,
  "Rayan Cherki": 177,
  "Viktor Gyökeres": 187,
};

const PLAYER_PROFILE_SHOT_SUCCESS_RATE: Record<PlayerCompName, number> = {
  "Lionel Messi": 18,
  "Cristiano Ronaldo": 15,
  "Neymar": 14,
  "Kylian Mbappé": 18,
  "Erling Haaland": 24,
  "Harry Kane": 20,
  "Robert Lewandowski": 22,
  "Mohamed Salah": 16,
  "Kevin De Bruyne": 10,
  "Bruno Fernandes": 10,
  "Martin Ødegaard": 10,
  "Thomas Müller": 18,
  "Jude Bellingham": 16,
  "Bukayo Saka": 14,
  "Vinícius Jr.": 13,
  "Son Heung-min": 18,
  "Antoine Griezmann": 15,
  "Trent Alexander-Arnold": 5,
  "N’Golo Kanté": 6,
  "Declan Rice": 7,
  "Rodri": 8,
  "Casemiro": 8,
  "Virgil van Dijk": 9,
  "Rúben Dias": 5,
  "Sergio Ramos": 8,
  "Federico Valverde": 10,
  "Steven Gerrard": 10,
  "Frank Lampard": 13,
  "Yaya Touré": 12,
  "Arturo Vidal": 12,
  "Alexander Isak": 21,
  "Antoine Semenyo": 12,
  "Bryan Mbeumo": 16,
  "Cole Palmer": 15,
  "Florian Wirtz": 13,
  "Gianluigi Donnarumma": 0,
  "Igor Thiago": 22,
  "João Cancelo": 6,
  "João Pedro": 16,
  "Julián Álvarez": 15,
  "Nico O’Reilly": 8,
  "Omar Marmoush": 16,
  "Rayan Cherki": 11,
  "Viktor Gyökeres": 20,
};

const PLAYER_PROFILE_SEASON_PRODUCTION: Record<PlayerCompName, PlayerSeasonProductionProfile> = {
  "Lionel Messi": { goalsPerGame: 0.7, assistsPerGame: 0.45, goalContributionsPerGame: 1.15, goalBias: 0.61, shotSuccessRate: 18 },
  "Cristiano Ronaldo": { goalsPerGame: 0.82, assistsPerGame: 0.16, goalContributionsPerGame: 0.98, goalBias: 0.84, shotSuccessRate: 15 },
  "Neymar": { goalsPerGame: 0.35, assistsPerGame: 0.35, goalContributionsPerGame: 0.7, goalBias: 0.5, shotSuccessRate: 14 },
  "Kylian Mbappé": { goalsPerGame: 0.78, assistsPerGame: 0.18, goalContributionsPerGame: 0.96, goalBias: 0.81, shotSuccessRate: 18 },
  "Erling Haaland": { goalsPerGame: 0.92, assistsPerGame: 0.1, goalContributionsPerGame: 1.02, goalBias: 0.9, shotSuccessRate: 24 },
  "Harry Kane": { goalsPerGame: 0.82, assistsPerGame: 0.24, goalContributionsPerGame: 1.06, goalBias: 0.77, shotSuccessRate: 20 },
  "Robert Lewandowski": { goalsPerGame: 0.68, assistsPerGame: 0.12, goalContributionsPerGame: 0.8, goalBias: 0.85, shotSuccessRate: 22 },
  "Mohamed Salah": { goalsPerGame: 0.58, assistsPerGame: 0.34, goalContributionsPerGame: 0.92, goalBias: 0.63, shotSuccessRate: 16 },
  "Kevin De Bruyne": { goalsPerGame: 0.2, assistsPerGame: 0.46, goalContributionsPerGame: 0.66, goalBias: 0.3, shotSuccessRate: 10 },
  "Bruno Fernandes": { goalsPerGame: 0.24, assistsPerGame: 0.28, goalContributionsPerGame: 0.52, goalBias: 0.46, shotSuccessRate: 10 },
  "Martin Ødegaard": { goalsPerGame: 0.2, assistsPerGame: 0.24, goalContributionsPerGame: 0.44, goalBias: 0.45, shotSuccessRate: 10 },
  "Thomas Müller": { goalsPerGame: 0.24, assistsPerGame: 0.36, goalContributionsPerGame: 0.6, goalBias: 0.4, shotSuccessRate: 18 },
  "Jude Bellingham": { goalsPerGame: 0.34, assistsPerGame: 0.26, goalContributionsPerGame: 0.6, goalBias: 0.57, shotSuccessRate: 16 },
  "Bukayo Saka": { goalsPerGame: 0.32, assistsPerGame: 0.26, goalContributionsPerGame: 0.58, goalBias: 0.55, shotSuccessRate: 14 },
  "Vinícius Jr.": { goalsPerGame: 0.5, assistsPerGame: 0.28, goalContributionsPerGame: 0.78, goalBias: 0.64, shotSuccessRate: 13 },
  "Son Heung-min": { goalsPerGame: 0.42, assistsPerGame: 0.26, goalContributionsPerGame: 0.68, goalBias: 0.62, shotSuccessRate: 18 },
  "Antoine Griezmann": { goalsPerGame: 0.28, assistsPerGame: 0.26, goalContributionsPerGame: 0.54, goalBias: 0.52, shotSuccessRate: 15 },
  "Trent Alexander-Arnold": { goalsPerGame: 0.06, assistsPerGame: 0.24, goalContributionsPerGame: 0.3, goalBias: 0.2, shotSuccessRate: 5 },
  "N’Golo Kanté": { goalsPerGame: 0.04, assistsPerGame: 0.1, goalContributionsPerGame: 0.14, goalBias: 0.29, shotSuccessRate: 6 },
  "Declan Rice": { goalsPerGame: 0.16, assistsPerGame: 0.18, goalContributionsPerGame: 0.34, goalBias: 0.47, shotSuccessRate: 7 },
  "Rodri": { goalsPerGame: 0.12, assistsPerGame: 0.14, goalContributionsPerGame: 0.26, goalBias: 0.46, shotSuccessRate: 8 },
  "Casemiro": { goalsPerGame: 0.08, assistsPerGame: 0.06, goalContributionsPerGame: 0.14, goalBias: 0.57, shotSuccessRate: 8 },
  "Virgil van Dijk": { goalsPerGame: 0.1, assistsPerGame: 0.02, goalContributionsPerGame: 0.12, goalBias: 0.83, shotSuccessRate: 9 },
  "Rúben Dias": { goalsPerGame: 0.02, assistsPerGame: 0.02, goalContributionsPerGame: 0.04, goalBias: 0.5, shotSuccessRate: 5 },
  "Sergio Ramos": { goalsPerGame: 0.12, assistsPerGame: 0.02, goalContributionsPerGame: 0.14, goalBias: 0.86, shotSuccessRate: 8 },
  "Federico Valverde": { goalsPerGame: 0.14, assistsPerGame: 0.16, goalContributionsPerGame: 0.3, goalBias: 0.47, shotSuccessRate: 10 },
  "Steven Gerrard": { goalsPerGame: 0.26, assistsPerGame: 0.24, goalContributionsPerGame: 0.5, goalBias: 0.52, shotSuccessRate: 10 },
  "Frank Lampard": { goalsPerGame: 0.36, assistsPerGame: 0.16, goalContributionsPerGame: 0.52, goalBias: 0.69, shotSuccessRate: 13 },
  "Yaya Touré": { goalsPerGame: 0.22, assistsPerGame: 0.2, goalContributionsPerGame: 0.42, goalBias: 0.52, shotSuccessRate: 12 },
  "Arturo Vidal": { goalsPerGame: 0.14, assistsPerGame: 0.12, goalContributionsPerGame: 0.26, goalBias: 0.54, shotSuccessRate: 12 },
  "Alexander Isak": { goalsPerGame: 0.72, assistsPerGame: 0.12, goalContributionsPerGame: 0.84, goalBias: 0.86, shotSuccessRate: 21 },
  "Antoine Semenyo": { goalsPerGame: 0.34, assistsPerGame: 0.22, goalContributionsPerGame: 0.56, goalBias: 0.61, shotSuccessRate: 12 },
  "Bryan Mbeumo": { goalsPerGame: 0.42, assistsPerGame: 0.2, goalContributionsPerGame: 0.62, goalBias: 0.68, shotSuccessRate: 16 },
  "Cole Palmer": { goalsPerGame: 0.42, assistsPerGame: 0.28, goalContributionsPerGame: 0.7, goalBias: 0.6, shotSuccessRate: 15 },
  "Florian Wirtz": { goalsPerGame: 0.24, assistsPerGame: 0.42, goalContributionsPerGame: 0.66, goalBias: 0.36, shotSuccessRate: 13 },
  "Gianluigi Donnarumma": { goalsPerGame: 0, assistsPerGame: 0, goalContributionsPerGame: 0, goalBias: 0, shotSuccessRate: 0 },
  "Igor Thiago": { goalsPerGame: 0.62, assistsPerGame: 0.08, goalContributionsPerGame: 0.7, goalBias: 0.89, shotSuccessRate: 22 },
  "João Cancelo": { goalsPerGame: 0.08, assistsPerGame: 0.22, goalContributionsPerGame: 0.3, goalBias: 0.27, shotSuccessRate: 6 },
  "João Pedro": { goalsPerGame: 0.36, assistsPerGame: 0.16, goalContributionsPerGame: 0.52, goalBias: 0.69, shotSuccessRate: 16 },
  "Julián Álvarez": { goalsPerGame: 0.42, assistsPerGame: 0.2, goalContributionsPerGame: 0.62, goalBias: 0.68, shotSuccessRate: 15 },
  "Nico O’Reilly": { goalsPerGame: 0.08, assistsPerGame: 0.1, goalContributionsPerGame: 0.18, goalBias: 0.44, shotSuccessRate: 8 },
  "Omar Marmoush": { goalsPerGame: 0.5, assistsPerGame: 0.18, goalContributionsPerGame: 0.68, goalBias: 0.74, shotSuccessRate: 16 },
  "Rayan Cherki": { goalsPerGame: 0.18, assistsPerGame: 0.42, goalContributionsPerGame: 0.6, goalBias: 0.3, shotSuccessRate: 11 },
  "Viktor Gyökeres": { goalsPerGame: 0.9, assistsPerGame: 0.16, goalContributionsPerGame: 1.06, goalBias: 0.85, shotSuccessRate: 20 },
};

const FORWARD_ELIGIBLE_COMPS: PlayerCompName[] = [
  "Alexander Isak",
  "Antoine Griezmann",
  "Antoine Semenyo",
  "Bruno Fernandes",
  "Bryan Mbeumo",
  "Bukayo Saka",
  "Cole Palmer",
  "Cristiano Ronaldo",
  "Erling Haaland",
  "Harry Kane",
  "Igor Thiago",
  "João Pedro",
  "Jude Bellingham",
  "Julián Álvarez",
  "Kevin De Bruyne",
  "Kylian Mbappé",
  "Lionel Messi",
  "Mohamed Salah",
  "Neymar",
  "Omar Marmoush",
  "Robert Lewandowski",
  "Rayan Cherki",
  "Son Heung-min",
  "Thomas Müller",
  "Viktor Gyökeres",
  "Vinícius Jr.",
];

const MIDFIELDER_ELIGIBLE_COMPS: PlayerCompName[] = [
  "Arturo Vidal",
  "Bruno Fernandes",
  "Bryan Mbeumo",
  "Casemiro",
  "Cole Palmer",
  "Declan Rice",
  "Federico Valverde",
  "Florian Wirtz",
  "Frank Lampard",
  "Jude Bellingham",
  "Kevin De Bruyne",
  "Lionel Messi",
  "Martin Ødegaard",
  "Nico O’Reilly",
  "N’Golo Kanté",
  "Rodri",
  "Rayan Cherki",
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
    ideal: { scoring: 68, creation: 84, output: 80, influence: 84, teamSuccess: 52, balance: 74, form: 72 },
    thresholds: ({ player }) => [
      player.goalsPerGame >= 0.45,
      player.assistsPerGame >= 0.55,
      player.goalContributionsPerGame >= 1.05,
      player.motmPercent >= 0.15,
      player.goalBias <= 0.62,
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
    positionGroups: ["defender", "unknown"],
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
  {
    key: "alexanderIsak",
    name: "Alexander Isak",
    styleLabel: "Silky Central Finisher",
    positionGroups: ["forward", "unknown"],
    ideal: { scoring: 86, creation: 44, output: 80, influence: 78, balance: 48, form: 70 },
    thresholds: ({ player }) => [
      player.goalsPerGame >= 0.85,
      player.assistsPerGame <= 0.65,
      player.goalContributionsPerGame >= 1.15,
      player.averageRating >= 8,
      player.goalBias >= 0.62,
    ],
  },
  {
    key: "antoineSemenyo",
    name: "Antoine Semenyo",
    styleLabel: "Direct Power Winger",
    positionGroups: ["forward", "unknown"],
    ideal: { scoring: 72, creation: 52, output: 74, influence: 76, teamSuccess: 58, aggression: 58, form: 76 },
    thresholds: ({ player, scores }) => [
      player.goalsPerGame >= 0.55,
      player.goalContributionsPerGame >= 1,
      scores.influence >= 70,
      scores.form !== undefined ? scores.form >= 60 : undefined,
    ],
  },
  {
    key: "bryanMbeumo",
    name: "Bryan Mbeumo",
    styleLabel: "Efficient Wide Producer",
    positionGroups: ["forward", "midfielder", "unknown"],
    ideal: { scoring: 74, creation: 50, output: 76, influence: 74, discipline: 86, balance: 58, form: 72 },
    thresholds: ({ player, scores }) => [
      player.goalsPerGame >= 0.6,
      player.assistsPerGame >= 0.25,
      player.goalContributionsPerGame >= 1,
      scores.discipline >= 75,
    ],
  },
  {
    key: "colePalmer",
    name: "Cole Palmer",
    styleLabel: "Creative Carry Forward",
    positionGroups: ["forward", "midfielder", "unknown"],
    ideal: { scoring: 70, creation: 78, output: 82, influence: 86, teamSuccess: 42, balance: 78, form: 52 },
    thresholds: ({ player }) => [
      player.goalContributionsPerGame >= 1.2,
      player.assistsPerGame >= 0.45,
      player.averageRating >= 8.1,
      player.winRate <= 0.46,
      player.goalBias >= 0.38,
      player.goalBias <= 0.62,
    ],
  },
  {
    key: "florianWirtz",
    name: "Florian Wirtz",
    styleLabel: "Between-Lines Playmaker",
    positionGroups: ["midfielder", "forward", "unknown"],
    ideal: { scoring: 42, creation: 82, output: 70, influence: 82, discipline: 88, passing: 84, balance: 70, form: 62 },
    thresholds: ({ player, scores }) => [
      player.assistsPerGame >= 0.65,
      scores.passing !== undefined ? scores.passing >= 70 : undefined,
      player.averageRating >= 8,
      scores.discipline >= 80,
    ],
  },
  {
    key: "gianluigiDonnarumma",
    name: "Gianluigi Donnarumma",
    styleLabel: "Shot-Stopping Match Winner",
    positionGroups: ["goalkeeper", "unknown"],
    ideal: { scoring: 0, creation: 5, output: 5, influence: 82, discipline: 96, teamSuccess: 72, form: 78 },
    thresholds: ({ player, scores }) => [
      player.positionGroup === "goalkeeper" || player.goalContributionsPerGame <= 0.15,
      player.averageRating >= 8,
      player.winRate >= 0.55,
      scores.discipline >= 90,
    ],
  },
  {
    key: "igorThiago",
    name: "Igor Thiago",
    styleLabel: "Penalty-Box Goal Surge",
    positionGroups: ["forward", "unknown"],
    ideal: { scoring: 96, creation: 28, output: 86, influence: 78, balance: 28, form: 84 },
    thresholds: ({ player }) => [
      player.goalsPerGame >= 1,
      player.assistsPerGame <= 0.45,
      player.goalBias >= 0.72,
      player.goalContributionsPerGame >= 1.2,
    ],
  },
  {
    key: "joaoCancelo",
    name: "João Cancelo",
    styleLabel: "Inverted Creative Fullback",
    positionGroups: ["defender", "midfielder", "unknown"],
    ideal: { scoring: 24, creation: 68, output: 52, influence: 74, defense: 58, passing: 82, balance: 62 },
    thresholds: ({ player, scores }) => [
      player.assistsPerGame >= 0.45,
      scores.passing !== undefined ? scores.passing >= 70 : undefined,
      scores.defense !== undefined ? scores.defense >= 45 : undefined,
      player.averageRating >= 7.8,
    ],
  },
  {
    key: "joaoPedro",
    name: "João Pedro",
    styleLabel: "Support-Striker Finisher",
    positionGroups: ["forward", "midfielder", "unknown"],
    ideal: { scoring: 76, creation: 48, output: 74, influence: 76, balance: 56, form: 70 },
    thresholds: ({ player }) => [
      player.goalsPerGame >= 0.65,
      player.goalContributionsPerGame >= 1,
      player.goalBias >= 0.56,
      player.averageRating >= 7.9,
    ],
  },
  {
    key: "julianAlvarez",
    name: "Julián Álvarez",
    styleLabel: "Pressing Support Star",
    positionGroups: ["forward", "midfielder", "unknown"],
    ideal: { scoring: 68, creation: 62, output: 76, influence: 78, teamSuccess: 68, balance: 76, form: 72 },
    thresholds: ({ player }) => [
      player.goalsPerGame >= 0.55,
      player.assistsPerGame >= 0.4,
      player.goalContributionsPerGame >= 1.1,
      player.winRate >= 0.5,
    ],
  },
  {
    key: "nicoOReilly",
    name: "Nico O’Reilly",
    styleLabel: "Emerging Two-Way Utility",
    positionGroups: ["midfielder", "defender", "unknown"],
    ideal: { scoring: 34, creation: 42, output: 48, influence: 64, defense: 58, discipline: 86, teamSuccess: 66, form: 66 },
    thresholds: ({ player, scores }) => [
      player.goalContributionsPerGame >= 0.45,
      scores.defense !== undefined ? scores.defense >= 45 : undefined,
      scores.discipline >= 75,
      player.winRate >= 0.5,
    ],
  },
  {
    key: "omarMarmoush",
    name: "Omar Marmoush",
    styleLabel: "Streaky Explosive Forward",
    positionGroups: ["forward", "unknown"],
    ideal: { scoring: 70, creation: 44, output: 68, influence: 70, teamSuccess: 62, form: 58 },
    thresholds: ({ player, scores }) => [
      player.goalsPerGame >= 0.5,
      player.goalBias >= 0.58,
      scores.form !== undefined ? scores.form <= 75 : undefined,
      player.goalContributionsPerGame >= 0.85,
    ],
  },
  {
    key: "rayanCherki",
    name: "Rayan Cherki",
    styleLabel: "High-Variance Creator",
    positionGroups: ["midfielder", "forward", "unknown"],
    ideal: { scoring: 48, creation: 84, output: 72, influence: 78, passing: 82, balance: 64, form: 76 },
    thresholds: ({ player, scores }) => [
      player.assistsPerGame >= 0.65,
      player.goalContributionsPerGame >= 1,
      scores.passing !== undefined ? scores.passing >= 68 : undefined,
      scores.form !== undefined ? scores.form >= 60 : undefined,
    ],
  },
  {
    key: "viktorGyokeres",
    name: "Viktor Gyökeres",
    styleLabel: "Relentless Volume Striker",
    positionGroups: ["forward", "unknown"],
    ideal: { scoring: 88, creation: 38, output: 82, influence: 76, aggression: 60, balance: 36, form: 68 },
    thresholds: ({ player }) => [
      player.goalsPerGame >= 0.85,
      player.goalContributionsPerGame >= 1.15,
      player.goalBias >= 0.68,
      player.assistsPerGame <= 0.55,
    ],
  },
];

const FAMOUS_PLAYER_COMP_NAMES = new Set<PlayerCompName>([
  "Lionel Messi",
  "Cristiano Ronaldo",
  "Neymar",
  "Kylian Mbappé",
  "Erling Haaland",
  "Harry Kane",
  "Robert Lewandowski",
  "Mohamed Salah",
  "Kevin De Bruyne",
  "Bruno Fernandes",
  "Martin Ødegaard",
  "Thomas Müller",
  "Jude Bellingham",
  "Bukayo Saka",
  "Vinícius Jr.",
  "Son Heung-min",
  "Antoine Griezmann",
  "Trent Alexander-Arnold",
  "N’Golo Kanté",
  "Declan Rice",
  "Rodri",
  "Casemiro",
  "Virgil van Dijk",
  "Rúben Dias",
  "Sergio Ramos",
  "Federico Valverde",
  "Steven Gerrard",
  "Frank Lampard",
  "Yaya Touré",
  "Arturo Vidal",
  "Gianluigi Donnarumma",
  "João Cancelo",
  "João Pedro",
  "Julián Álvarez",
]);

const FAMOUS_PLAYER_PROFILES = PLAYER_PROFILES.filter((profile) =>
  FAMOUS_PLAYER_COMP_NAMES.has(profile.name),
);

const GOAL_FIRST_COMP_NAMES: PlayerCompName[] = [
  "Alexander Isak",
  "Cristiano Ronaldo",
  "Kylian Mbappé",
  "Erling Haaland",
  "Harry Kane",
  "Igor Thiago",
  "João Pedro",
  "Robert Lewandowski",
  "Mohamed Salah",
  "Omar Marmoush",
  "Son Heung-min",
  "Frank Lampard",
  "Viktor Gyökeres",
];

const PRODUCTIVE_SCORER_COMP_NAMES: PlayerCompName[] = [
  ...GOAL_FIRST_COMP_NAMES,
  "Antoine Semenyo",
  "Bryan Mbeumo",
  "Bukayo Saka",
  "Cole Palmer",
  "Julián Álvarez",
  "Neymar",
  "Vinícius Jr.",
];

const ELITE_SCORER_COMP_NAMES: PlayerCompName[] = [
  "Alexander Isak",
  "Cristiano Ronaldo",
  "Erling Haaland",
  "Harry Kane",
  "Igor Thiago",
  "Kylian Mbappé",
  "Mohamed Salah",
  "Robert Lewandowski",
  "Son Heung-min",
  "Viktor Gyökeres",
];

const LEGENDARY_SCORER_COMP_NAMES: PlayerCompName[] = [
  "Cristiano Ronaldo",
  "Erling Haaland",
  "Harry Kane",
  "Kylian Mbappé",
  "Lionel Messi",
  "Robert Lewandowski",
  "Viktor Gyökeres",
];

const WIDE_FORWARD_COMP_NAMES: PlayerCompName[] = [
  "Antoine Semenyo",
  "Bryan Mbeumo",
  "Mohamed Salah",
  "Neymar",
  "Bukayo Saka",
  "Vinícius Jr.",
  "Son Heung-min",
  "Omar Marmoush",
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

function getPlayerRole(position: string | null | undefined): PlayerRole {
  const normalized = normalizePosition(position);

  if (!normalized || normalized === "N/A" || normalized === "NA") return "unknown";
  if (normalized.includes("GK") || normalized.includes("KEEPER")) return "goalkeeper";
  if (normalized.includes("CB")) return "centerBack";
  if (
    normalized.includes("LB") ||
    normalized.includes("RB") ||
    normalized.includes("LWB") ||
    normalized.includes("RWB")
  ) {
    return "fullback";
  }
  if (normalized.includes("CDM")) return "defensiveMidfielder";
  if (normalized.includes("CAM")) return "attackingMidfielder";
  if (normalized.includes("CM")) return "centralMidfielder";
  if (normalized.includes("LW") || normalized.includes("LF") || normalized.includes("LM")) {
    return "leftWinger";
  }
  if (normalized.includes("RW") || normalized.includes("RF") || normalized.includes("RM")) {
    return "rightWinger";
  }
  if (normalized.includes("CF")) return "secondStriker";
  if (normalized.includes("ST")) return "striker";

  return "unknown";
}

function getProfileRealLifeRoles(profile: PlayerProfile): PlayerRole[] {
  switch (profile.name) {
    case "Erling Haaland":
    case "Harry Kane":
    case "Robert Lewandowski":
    case "Alexander Isak":
    case "Igor Thiago":
    case "Viktor Gyökeres":
      return ["striker"];
    case "Cristiano Ronaldo":
    case "Kylian Mbappé":
      return ["striker", "leftWinger"];
    case "Neymar":
    case "Vinícius Jr.":
    case "Son Heung-min":
    case "Omar Marmoush":
    case "Antoine Semenyo":
      return ["leftWinger", "secondStriker"];
    case "Mohamed Salah":
    case "Bukayo Saka":
    case "Bryan Mbeumo":
      return ["rightWinger"];
    case "Lionel Messi":
      return ["rightWinger", "attackingMidfielder", "secondStriker"];
    case "Cole Palmer":
    case "Florian Wirtz":
    case "Rayan Cherki":
    case "Bruno Fernandes":
    case "Martin Ødegaard":
      return ["attackingMidfielder", "rightWinger"];
    case "Kevin De Bruyne":
    case "Jude Bellingham":
    case "Steven Gerrard":
    case "Frank Lampard":
    case "Yaya Touré":
    case "Federico Valverde":
      return ["centralMidfielder", "attackingMidfielder"];
    case "Thomas Müller":
    case "Antoine Griezmann":
    case "João Pedro":
    case "Julián Álvarez":
      return ["secondStriker", "attackingMidfielder", "striker"];
    case "Rodri":
    case "Casemiro":
    case "Declan Rice":
    case "N’Golo Kanté":
    case "Arturo Vidal":
      return ["defensiveMidfielder", "centralMidfielder"];
    case "Trent Alexander-Arnold":
    case "João Cancelo":
    case "Nico O’Reilly":
      return ["fullback", "centralMidfielder"];
    case "Virgil van Dijk":
    case "Rúben Dias":
    case "Sergio Ramos":
      return ["centerBack"];
    case "Gianluigi Donnarumma":
      return ["goalkeeper"];
    default:
      return ["unknown"];
  }
}

function areRolesCompatible(playerRole: PlayerRole, profileRoles: PlayerRole[]) {
  if (playerRole === "unknown" || profileRoles.includes("unknown")) return true;
  if (profileRoles.includes(playerRole)) return true;

  const compatibility: Record<PlayerRole, PlayerRole[]> = {
    striker: ["secondStriker", "leftWinger", "rightWinger"],
    leftWinger: ["secondStriker", "striker", "attackingMidfielder"],
    rightWinger: ["secondStriker", "striker", "attackingMidfielder"],
    secondStriker: ["striker", "leftWinger", "rightWinger", "attackingMidfielder"],
    attackingMidfielder: ["secondStriker", "centralMidfielder", "leftWinger", "rightWinger"],
    centralMidfielder: ["attackingMidfielder", "defensiveMidfielder", "fullback"],
    defensiveMidfielder: ["centralMidfielder", "centerBack"],
    fullback: ["rightWinger", "leftWinger", "centralMidfielder"],
    centerBack: ["defensiveMidfielder"],
    goalkeeper: [],
    unknown: [],
  };

  return profileRoles.some((role) => compatibility[playerRole].includes(role));
}

function isForwardEligibleComp(name: PlayerCompName) {
  return FORWARD_ELIGIBLE_COMPS.includes(name);
}

function isMidfielderEligibleComp(name: PlayerCompName) {
  return MIDFIELDER_ELIGIBLE_COMPS.includes(name);
}

function isDefenderEligibleComp(name: PlayerCompName) {
  return !isForwardEligibleComp(name) && !isMidfielderEligibleComp(name) && name !== "Gianluigi Donnarumma";
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

  if (positionGroup === "defender") {
    return isDefenderEligibleComp(profile.name);
  }

  if (positionGroup === "goalkeeper") {
    return profile.name === "Gianluigi Donnarumma";
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

function scoreRateCloseness(actual: number | undefined, ideal: number | undefined, penaltyPerUnit: number) {
  if (actual === undefined || ideal === undefined) {
    return undefined;
  }

  return clamp(100 - Math.abs(actual - ideal) * penaltyPerUnit);
}

function averageNumbers(values: Array<number | undefined>) {
  const usableValues = values.filter((value): value is number => value !== undefined);

  if (usableValues.length === 0) {
    return 50;
  }

  return usableValues.reduce((total, value) => total + value, 0) / usableValues.length;
}

function averageFinite(values: number[]) {
  const usableValues = values.filter(Number.isFinite);

  if (usableValues.length === 0) {
    return undefined;
  }

  return usableValues.reduce((total, value) => total + value, 0) / usableValues.length;
}

function getGoalVolumeBand(goals: number, goalsPerGame: number): GoalVolumeBand {
  if (goals >= 120 || goalsPerGame >= 1.35) return "legendary";
  if (goals >= 75 || goalsPerGame >= 1.1) return "elite";
  if (goals >= 40 || goalsPerGame >= 0.8) return "high";
  if (goals >= 20 || goalsPerGame >= 0.45) return "productive";
  return "low";
}

function getGoalVolumeLabel(goalVolumeBand: GoalVolumeBand) {
  if (goalVolumeBand === "legendary") return "legendary scorer";
  if (goalVolumeBand === "elite") return "elite scorer";
  if (goalVolumeBand === "high") return "high-volume scorer";
  if (goalVolumeBand === "productive") return "productive scorer";
  return "low-volume scorer";
}

function getProfileSeasonProduction(profile: PlayerProfile) {
  return PLAYER_PROFILE_SEASON_PRODUCTION[profile.name];
}

function getSeasonProductionFit(profile: PlayerProfile, player: DerivedPlayerStats) {
  const season = getProfileSeasonProduction(profile);

  return averageNumbers([
    scoreRateCloseness(player.goalsPerGame, season.goalsPerGame, 72),
    scoreRateCloseness(player.assistsPerGame, season.assistsPerGame, 72),
    scoreRateCloseness(
      player.goalContributionsPerGame,
      season.goalContributionsPerGame,
      54,
    ),
    scoreRateCloseness(player.goalBias, season.goalBias, 86),
    scoreRateCloseness(player.shotSuccessRate, season.shotSuccessRate, 2.5),
  ]);
}

function getHeightCm(height: PlayerCompInput["height"], heightCm?: number | null) {
  if (Number.isFinite(heightCm) && Number(heightCm) > 0) {
    return Math.round(Number(heightCm));
  }

  if (typeof height === "number" && Number.isFinite(height) && height > 0) {
    return Math.round(height > 100 ? height : height * 2.54);
  }

  if (typeof height !== "string") {
    return undefined;
  }

  const normalized = height.trim().toLowerCase();
  const feetAndInches = normalized.match(/(\d+)\s*'\s*(\d+)?/);

  if (feetAndInches) {
    const feet = Number(feetAndInches[1]);
    const inches = Number(feetAndInches[2] ?? 0);

    if (Number.isFinite(feet) && Number.isFinite(inches)) {
      return Math.round((feet * 12 + inches) * 2.54);
    }
  }

  const numericHeight = Number(normalized.replace(/cm|centimeters?|inches?|in/g, "").trim());

  if (!Number.isFinite(numericHeight) || numericHeight <= 0) {
    return undefined;
  }

  return Math.round(normalized.includes("in") && !normalized.includes("cm")
    ? numericHeight * 2.54
    : numericHeight);
}

function getHeightScore(heightCm: number | undefined) {
  if (heightCm === undefined) {
    return undefined;
  }

  return round(
    interpolate(heightCm, [
      [165, 20],
      [175, 42],
      [185, 68],
      [195, 94],
      [200, 100],
    ]),
  );
}

function getProfileHeightIdeal(profile: PlayerProfile) {
  return PLAYER_PROFILE_HEIGHT_CM[profile.name];
}

function getHeightGap(profile: PlayerProfile, player: DerivedPlayerStats) {
  if (player.heightCm === undefined) {
    return undefined;
  }

  return Math.abs(player.heightCm - getProfileHeightIdeal(profile));
}

function getHeightFitScore(profile: PlayerProfile, player: DerivedPlayerStats) {
  const heightGap = getHeightGap(profile, player);

  if (heightGap === undefined) {
    return undefined;
  }

  return round(
    interpolate(heightGap, [
      [0, 100],
      [3, 94],
      [6, 82],
      [10, 62],
      [14, 38],
      [18, 18],
      [24, 0],
    ]),
  );
}

function getHeightFitMultiplier(profile: PlayerProfile, player: DerivedPlayerStats) {
  const heightGap = getHeightGap(profile, player);

  if (heightGap === undefined) {
    return 1;
  }

  if (heightGap <= 3) return 1.12;
  if (heightGap <= 6) return 1.06;
  if (heightGap <= 10) return 0.96;
  if (heightGap <= 14) return 0.82;
  if (heightGap <= 18) return 0.68;
  if (heightGap <= 24) return 0.52;
  return 0.38;
}

function getShotEfficiencyScore(shotSuccessRate: number | undefined) {
  if (shotSuccessRate === undefined) {
    return undefined;
  }

  return round(
    interpolate(shotSuccessRate, [
      [0, 0],
      [8, 25],
      [12, 45],
      [16, 65],
      [20, 85],
      [24, 100],
    ]),
  );
}

function getProfileShotSuccessRate(profile: PlayerProfile) {
  return PLAYER_PROFILE_SHOT_SUCCESS_RATE[profile.name];
}

function getOverallScore(overall: number) {
  if (overall <= 0) {
    return undefined;
  }

  return round(
    interpolate(overall, [
      [50, 0],
      [65, 25],
      [75, 50],
      [82, 68],
      [88, 84],
      [93, 100],
    ]),
  );
}

function getProfileOverallIdeal(profile: PlayerProfile) {
  switch (profile.name) {
    case "Lionel Messi":
    case "Cristiano Ronaldo":
      return 98;
    case "Neymar":
    case "Kylian Mbappé":
    case "Erling Haaland":
      return 94;
    case "Harry Kane":
    case "Robert Lewandowski":
    case "Kevin De Bruyne":
    case "Mohamed Salah":
    case "Virgil van Dijk":
    case "Rodri":
      return 91;
    case "Vinícius Jr.":
    case "Jude Bellingham":
    case "Bruno Fernandes":
    case "Son Heung-min":
    case "Antoine Griezmann":
    case "Gianluigi Donnarumma":
      return 88;
    case "Bukayo Saka":
    case "Cole Palmer":
    case "Florian Wirtz":
    case "Alexander Isak":
    case "Martin Ødegaard":
    case "Rúben Dias":
    case "João Cancelo":
    case "Trent Alexander-Arnold":
      return 86;
    case "Julián Álvarez":
    case "Declan Rice":
    case "Casemiro":
    case "Federico Valverde":
    case "Viktor Gyökeres":
    case "Rayan Cherki":
    case "João Pedro":
      return 84;
    case "Bryan Mbeumo":
    case "Antoine Semenyo":
    case "Omar Marmoush":
    case "Igor Thiago":
    case "Nico O’Reilly":
      return 80;
    default:
      return 85;
  }
}

function getOverallTier(overall: number) {
  if (overall >= 93) return "all-time elite";
  if (overall >= 88) return "elite";
  if (overall >= 84) return "star";
  if (overall >= 78) return "breakout";
  if (overall > 0) return "developing";
  return "unknown";
}

function getRecentMatches(input: PlayerCompInput) {
  if (input.recentMatches?.length) {
    return input.recentMatches.slice(0, 10).map((match) => ({
      rating: valueOrZero(match.rating),
      goals: valueOrZero(match.goals),
      assists: valueOrZero(match.assists),
    }));
  }

  return (input.recentRatings ?? []).slice(0, 10).map((rating) => ({
    rating: valueOrZero(rating),
    goals: 0,
    assists: 0,
  }));
}

function getFormTrend(formDelta: number, recentAverageRating: number | undefined) {
  if (recentAverageRating === undefined) {
    return "steady";
  }

  if (formDelta >= 0.55 || recentAverageRating >= 8.8) return "hot";
  if (formDelta >= 0.2 || recentAverageRating >= 8.2) return "good";
  if (formDelta <= -0.75 || recentAverageRating < 6.4) return "cold";
  if (formDelta <= -0.25 || recentAverageRating < 7) return "slumping";
  return "steady";
}

function derivePlayerStats(input: PlayerCompInput): DerivedPlayerStats {
  const position = normalizePosition(input.position);
  const positionGroup = getPositionGroup(input.position);
  const games = valueOrZero(input.games ?? input.matches);
  const goals = valueOrZero(input.goals);
  const shots = valueOrZero(input.shots);
  const shotSuccessRate =
    input.shotSuccessRate !== undefined && input.shotSuccessRate !== null
      ? normalizePercent(input.shotSuccessRate)
      : shots > 0
        ? (goals / shots) * 100
        : undefined;
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
  const averageRating = valueOrZero(input.averageRating ?? input.avgRating ?? input.rating);
  const recentMatches = getRecentMatches(input);
  const recentAverageRating = averageFinite(
    recentMatches.map((match) => match.rating).filter((rating) => rating > 0),
  );
  const recentGoalContributions = recentMatches.reduce(
    (total, match) => total + match.goals + match.assists,
    0,
  );
  const recentGoalContributionsPerGame =
    recentMatches.length > 0 ? recentGoalContributions / recentMatches.length : undefined;
  const formDelta = recentAverageRating !== undefined ? recentAverageRating - averageRating : 0;

  return {
    position,
    positionGroup,
    playerRole: getPlayerRole(input.position),
    overall: valueOrZero(input.overall),
    heightCm: getHeightCm(input.height, input.heightCm),
    games,
    goals,
    goalVolumeBand: getGoalVolumeBand(goals, goalsPerGame),
    shots,
    shotsPerGame: games > 0 ? shots / games : 0,
    shotSuccessRate,
    assists,
    goalContributions,
    goalsPerGame,
    assistsPerGame,
    goalContributionsPerGame,
    averageRating,
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
    recentMatchCount: recentMatches.length,
    recentAverageRating,
    recentGoalContributionsPerGame,
    formDelta,
    formTrend: getFormTrend(formDelta, recentAverageRating),
    scorerCreatorBalance:
      1 - Math.abs(goals - assists) / Math.max(goalContributions, 1),
    goalBias: goals / Math.max(goalContributions, 1),
    assistBias: assists / Math.max(goalContributions, 1),
  };
}

function getFormScore(
  form: PlayerCompInput["form"],
  fallback: number,
  player: DerivedPlayerStats,
) {
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

  if (player.recentAverageRating !== undefined) {
    const recentRatingScore = interpolate(player.recentAverageRating, [
      [0, 0],
      [6.5, 28],
      [7.2, 48],
      [7.8, 64],
      [8.4, 82],
      [9, 100],
    ]);
    const recentOutputScore =
      player.recentGoalContributionsPerGame !== undefined
        ? interpolate(player.recentGoalContributionsPerGame, [
            [0, 15],
            [0.4, 38],
            [0.8, 62],
            [1.2, 82],
            [1.7, 100],
          ])
        : fallback;
    const trendAdjustment = clamp(player.formDelta * 16, -16, 16);

    return round(0.58 * recentRatingScore + 0.27 * recentOutputScore + 0.15 * fallback + trendAdjustment);
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
  const overall = getOverallScore(player.overall);
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
    overall,
    height: getHeightScore(player.heightCm),
    shotEfficiency: getShotEfficiencyScore(player.shotSuccessRate),
    influence,
    form: getFormScore(input.form, output, player),
    defense,
    discipline,
    balance,
    teamSuccess,
    aggression,
    passing,
  };
}

function scorePlayerProfile(profile: PlayerProfile, context: ScoreContext) {
  if (!passesHardProfileGate(profile, context)) {
    return Number.NEGATIVE_INFINITY;
  }

  const statFit = averageNumbers([
    scoreCloseness(context.scores.scoring, profile.ideal.scoring),
    scoreCloseness(context.scores.creation, profile.ideal.creation),
    scoreCloseness(context.scores.output, profile.ideal.output),
    scoreCloseness(context.scores.overall, getOverallScore(getProfileOverallIdeal(profile))),
    scoreCloseness(context.scores.shotEfficiency, getShotEfficiencyScore(getProfileShotSuccessRate(profile))),
    scoreCloseness(context.scores.influence, profile.ideal.influence),
    scoreCloseness(context.scores.form, profile.ideal.form),
    scoreCloseness(context.scores.defense, profile.ideal.defense),
    scoreCloseness(context.scores.discipline, profile.ideal.discipline),
    scoreCloseness(context.scores.balance, profile.ideal.balance),
    scoreCloseness(context.scores.teamSuccess, profile.ideal.teamSuccess),
    scoreCloseness(context.scores.aggression, profile.ideal.aggression),
    scoreCloseness(context.scores.passing, profile.ideal.passing),
  ]);
  const heightFit = getHeightFitScore(profile, context.player);
  const seasonProductionFit = getSeasonProductionFit(profile, context.player);
  const profileFit =
    heightFit === undefined
      ? 0.56 * statFit + 0.44 * seasonProductionFit
      : 0.46 * statFit + 0.34 * seasonProductionFit + 0.2 * heightFit;
  const thresholdFit = averageBooleans(profile.thresholds(context)) * 100;

  const positionFit = getPositionFit(profile, context.player);
  const biasFit = getBiasFit(profile, context.player);
  const profileModifier = getProfileModifier(profile, context.player, context.scores);
  const diversityModifier = getDiversityModifier(profile, context.player);
  const passingModifier = getPassingModifier(profile, context.player, context.scores);
  const goalVolumeModifier = getGoalVolumeModifier(profile, context.player);
  const realLifeRoleModifier = getRealLifeRoleModifier(profile, context.player);
  const overallModifier = getOverallModifier(profile, context.player);
  const heightModifier = getHeightModifier(profile, context.player);
  const heightMultiplier = getHeightFitMultiplier(profile, context.player);
  const realLifeShotModifier = getRealLifeShotModifier(profile, context.player);
  const formModifier = getFormModifier(profile, context.player, context.scores);
  const roleFit = getRoleFit(profile, context.player);

  return (
    (0.58 * profileFit +
      0.32 * thresholdFit +
      10 * biasFit +
      profileModifier +
      diversityModifier +
      passingModifier +
      goalVolumeModifier +
      realLifeRoleModifier +
      overallModifier +
      heightModifier +
      realLifeShotModifier +
      formModifier) *
    heightMultiplier *
    positionFit *
    roleFit
  );
}

function passesHardProfileGate(profile: PlayerProfile, context: ScoreContext) {
  const { player } = context;
  const profileHeight = getProfileHeightIdeal(profile);
  const heightGap = Math.abs((player.heightCm ?? profileHeight) - profileHeight);
  const season = getProfileSeasonProduction(profile);

  if (
    (profile.name === "Lionel Messi" || profile.name === "Cristiano Ronaldo") &&
    player.averageRating < 8.5
  ) {
    return false;
  }

  if (player.heightCm !== undefined && profileHeight < player.heightCm) {
    return false;
  }

  if (player.heightCm !== undefined) {
    if (heightGap > 24) {
      return false;
    }

    if (
      heightGap > 18 &&
      player.goalVolumeBand !== "legendary" &&
      player.averageRating < 8.6
    ) {
      return false;
    }
  }

  if (player.positionGroup === "forward" || player.positionGroup === "unknown") {
    if (
      player.goalContributionsPerGame >= 2 &&
      season.goalContributionsPerGame < 0.9
    ) {
      return false;
    }

    if (
      player.goalContributionsPerGame >= 1.4 &&
      season.goalContributionsPerGame < 0.65
    ) {
      return false;
    }

    if (player.goalsPerGame >= 1.2 && season.goalsPerGame < 0.55) {
      return false;
    }

    if (
      player.goalsPerGame >= 0.9 &&
      player.goalBias >= 0.68 &&
      season.goalsPerGame < 0.45
    ) {
      return false;
    }
  }

  if (profile.name !== "Cole Palmer") {
    return true;
  }

  const isPalmerRole =
    player.playerRole === "attackingMidfielder" || player.playerRole === "rightWinger";
  const isCarryContext = player.winRate <= 0.46;
  const hasPalmerBalance = player.goalBias >= 0.38 && player.goalBias <= 0.62;
  const hasColdOrUnknownForm =
    player.formTrend === "slumping" ||
    player.formTrend === "cold" ||
    (context.scores.form !== undefined && context.scores.form <= 45);

  return isPalmerRole && isCarryContext && hasPalmerBalance && hasColdOrUnknownForm;
}

function getOverallModifier(profile: PlayerProfile, player: DerivedPlayerStats) {
  if (player.overall <= 0) {
    return 0;
  }

  const idealOverall = getProfileOverallIdeal(profile);
  const gap = player.overall - idealOverall;

  if (Math.abs(gap) <= 3) return 7;
  if (Math.abs(gap) <= 6) return 3;

  if (gap >= 8) {
    return idealOverall >= 90 ? 4 : -8;
  }

  if (gap <= -12) {
    return idealOverall >= 90 ? -18 : -7;
  }

  if (gap <= -8) {
    return idealOverall >= 88 ? -12 : -4;
  }

  return 0;
}

function getHeightModifier(profile: PlayerProfile, player: DerivedPlayerStats) {
  if (player.heightCm === undefined) {
    return 0;
  }

  const heightGap = Math.abs(player.heightCm - getProfileHeightIdeal(profile));

  if (heightGap <= 2) return 16;
  if (heightGap <= 5) return 11;
  if (heightGap <= 8) return 4;
  if (heightGap <= 12) return -8;
  if (heightGap <= 16) return -18;
  if (heightGap <= 22) return -28;
  return -40;
}

function getRealLifeShotModifier(profile: PlayerProfile, player: DerivedPlayerStats) {
  if (player.shotSuccessRate === undefined) {
    return 0;
  }

  const shotGap = Math.abs(player.shotSuccessRate - getProfileShotSuccessRate(profile));

  if (shotGap <= 2) return 7;
  if (shotGap <= 4) return 4;
  if (shotGap <= 7) return 0;
  if (shotGap <= 11) return -6;
  return -12;
}

function getFormModifier(
  profile: PlayerProfile,
  player: DerivedPlayerStats,
  scores: PlayerCompScores,
) {
  if (scores.form === undefined || profile.ideal.form === undefined) {
    return 0;
  }

  const formGap = Math.abs(scores.form - profile.ideal.form);
  let modifier = 0;

  if (formGap <= 6) modifier += 7;
  else if (formGap <= 12) modifier += 4;
  else if (formGap <= 20) modifier -= 2;
  else modifier -= 6;

  const hotProfile = profile.ideal.form >= 76;
  const coolerProfile = profile.ideal.form <= 60;

  if (hotProfile && player.formTrend === "hot") modifier += 4;
  if (hotProfile && (player.formTrend === "slumping" || player.formTrend === "cold")) {
    modifier -= 5;
  }
  if (coolerProfile && (player.formTrend === "slumping" || player.formTrend === "cold")) {
    modifier += 3;
  }
  if (coolerProfile && player.formTrend === "hot") modifier -= 4;

  return modifier;
}

function getRoleCandidateNames(player: DerivedPlayerStats): PlayerCompName[] | null {
  if (player.playerRole === "attackingMidfielder") {
    return [
      "Rayan Cherki",
      "Florian Wirtz",
      "Bruno Fernandes",
      "Martin Ødegaard",
      "Cole Palmer",
      "Kevin De Bruyne",
      "Antoine Griezmann",
      "Thomas Müller",
      "Jude Bellingham",
      "Steven Gerrard",
      "Yaya Touré",
    ];
  }

  if (player.playerRole === "rightWinger") {
    return [
      "Bukayo Saka",
      "Bryan Mbeumo",
      "Mohamed Salah",
      "Lionel Messi",
      "Rayan Cherki",
      "Cole Palmer",
      "João Pedro",
      "Julián Álvarez",
    ];
  }

  if (player.playerRole === "leftWinger") {
    return [
      "Neymar",
      "Vinícius Jr.",
      "Son Heung-min",
      "Kylian Mbappé",
      "Antoine Semenyo",
      "Omar Marmoush",
      "Cristiano Ronaldo",
      "Antoine Griezmann",
    ];
  }

  if (player.playerRole === "striker" || player.playerRole === "secondStriker") {
    return [
      "Julián Álvarez",
      "João Pedro",
      "Alexander Isak",
      "Viktor Gyökeres",
      "Igor Thiago",
      "Harry Kane",
      "Erling Haaland",
      "Robert Lewandowski",
      "Cristiano Ronaldo",
      "Antoine Griezmann",
      "Thomas Müller",
    ];
  }

  return null;
}

function applyRoleCandidatePool(profiles: PlayerProfile[], player: DerivedPlayerStats) {
  const candidateNames = getRoleCandidateNames(player);

  if (!candidateNames) {
    return profiles;
  }

  const pooledProfiles = profiles.filter((profile) => candidateNames.includes(profile.name));

  return pooledProfiles.length >= 3 ? pooledProfiles : profiles;
}

function getRealLifeRoleModifier(profile: PlayerProfile, player: DerivedPlayerStats) {
  if (player.playerRole === "unknown") {
    return 0;
  }

  const profileRoles = getProfileRealLifeRoles(profile);

  if (profileRoles.includes(player.playerRole)) {
    return 12;
  }

  if (areRolesCompatible(player.playerRole, profileRoles)) {
    return 3;
  }

  if (player.playerRole === "goalkeeper" || profileRoles.includes("goalkeeper")) {
    return -45;
  }

  if (
    (player.playerRole === "centerBack" || player.playerRole === "fullback") &&
    profile.positionGroups.includes("forward")
  ) {
    return -30;
  }

  if (
    (player.playerRole === "striker" || player.playerRole === "secondStriker") &&
    (profileRoles.includes("centerBack") || profileRoles.includes("fullback"))
  ) {
    return -28;
  }

  return -14;
}

function getGoalVolumeModifier(profile: PlayerProfile, player: DerivedPlayerStats) {
  if (player.positionGroup === "defender" || player.positionGroup === "goalkeeper") {
    return 0;
  }

  const isProductiveScorer = PRODUCTIVE_SCORER_COMP_NAMES.includes(profile.name);
  const isEliteScorer = ELITE_SCORER_COMP_NAMES.includes(profile.name);
  const isLegendaryScorer = LEGENDARY_SCORER_COMP_NAMES.includes(profile.name);
  const isCreatorFirst = (profile.ideal.creation ?? 0) >= 70 && (profile.ideal.scoring ?? 0) < 65;

  if (player.goalVolumeBand === "legendary") {
    if (isLegendaryScorer) return 18;
    if (isEliteScorer) return 8;
    if (isCreatorFirst) return -30;
    if (!isProductiveScorer) return -24;
    return -8;
  }

  if (player.goalVolumeBand === "elite") {
    if (isEliteScorer) return 14;
    if (isProductiveScorer) return 5;
    if (isCreatorFirst) return -22;
    return -12;
  }

  if (player.goalVolumeBand === "high") {
    if (isProductiveScorer) return 9;
    if (isCreatorFirst && player.assistsPerGame < 0.7) return -12;
    return -4;
  }

  if (player.goalVolumeBand === "productive") {
    if (isProductiveScorer) return 4;
    return 0;
  }

  if (isEliteScorer && player.assistsPerGame >= 0.5) {
    return -12;
  }

  if (GOAL_FIRST_COMP_NAMES.includes(profile.name)) {
    return -8;
  }

  return 0;
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
    if (player.goalsPerGame >= 0.9 || player.goalContributionsPerGame >= 1.35) {
      modifier -= 24;
    }
    if (player.goalBias >= 0.68) modifier -= 10;

    return modifier;
  }

  if (profile.name === "Neymar") {
    let modifier = 0;

    if (player.assistsPerGame >= 0.55 && scores.scoring >= 50) modifier += 7;
    if (isLeftForwardPosition(player.position)) modifier += 12;
    if (player.goalBias >= 0.35 && player.goalBias <= 0.62) modifier += 6;
    if (player.goalContributionsPerGame >= 1 && scores.creation >= 60) modifier += 4;
    if (player.winRate < 0.55 && scores.influence >= 75) modifier += 3;
    if (isCentralForwardPosition(player.position) && player.goalBias >= 0.68) modifier -= 12;

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

  if (profile.name === "Igor Thiago") {
    let modifier = 0;

    if (player.goalsPerGame >= 1 && player.goalBias >= 0.72) modifier += 9;
    if (scores.form !== undefined && scores.form >= 78) modifier += 5;
    if (player.assistsPerGame > 0.55 || player.goalBias < 0.65) modifier -= 10;

    return modifier;
  }

  if (profile.name === "Viktor Gyökeres") {
    let modifier = 0;

    if (player.goalsPerGame >= 0.85 && player.goalBias >= 0.66) modifier += 6;
    if (scores.aggression !== undefined && scores.aggression >= 50) modifier += 3;
    if (player.assistsPerGame > 0.7) modifier -= 6;

    return modifier;
  }

  if (profile.name === "Alexander Isak") {
    let modifier = 0;

    if (isCentralForwardPosition(player.position)) modifier += 4;
    if (player.goalsPerGame >= 0.8 && player.goalBias >= 0.6 && player.goalBias <= 0.82) modifier += 6;
    if (player.assistsPerGame > 0.8 || player.goalBias < 0.55) modifier -= 8;

    return modifier;
  }

  if (profile.name === "Cole Palmer") {
    let modifier = 0;
    const isPalmerRole =
      player.playerRole === "attackingMidfielder" || player.playerRole === "rightWinger";

    if (isPalmerRole && scores.creation >= 70 && scores.scoring >= 55 && scores.influence >= 78) modifier += 5;
    if (player.winRate <= 0.5 && player.goalContributionsPerGame >= 1.15) modifier += 5;
    if (player.formTrend === "slumping" || player.formTrend === "cold") modifier += 4;
    if (!isPalmerRole) modifier -= 14;
    if (player.winRate > 0.54) modifier -= 12;
    if (player.formTrend === "hot" || player.formTrend === "good") modifier -= 7;
    if (player.assistBias > player.goalBias + 0.18) modifier -= 10;
    if (player.goalBias > 0.78) modifier -= 8;

    return modifier;
  }

  if (profile.name === "Florian Wirtz" || profile.name === "Rayan Cherki") {
    let modifier = 0;

    if (scores.creation >= 75 && scores.passing !== undefined && scores.passing >= 70) modifier += 6;
    if (player.assistBias >= 0.45) modifier += 3;
    if (profile.name === "Florian Wirtz" && player.playerRole === "attackingMidfielder" && scores.passing !== undefined && scores.passing >= 75) modifier += 7;
    if (profile.name === "Florian Wirtz" && player.winRate >= 0.5 && scores.discipline >= 80) modifier += 4;
    if (profile.name === "Rayan Cherki" && (player.playerRole === "attackingMidfielder" || player.playerRole === "rightWinger") && scores.creation >= 72) modifier += 7;
    if (profile.name === "Rayan Cherki" && (player.formTrend === "hot" || player.formTrend === "good")) modifier += 4;
    if (scores.scoring >= 82 && player.goalBias >= 0.65) modifier -= 8;

    return modifier;
  }

  if (profile.name === "Bruno Fernandes") {
    let modifier = 0;

    if (player.playerRole === "attackingMidfielder" && scores.creation >= 70 && scores.influence >= 78) modifier += 8;
    if (player.assistsPerGame >= 0.6 && player.goalContributionsPerGame >= 1.05) modifier += 5;
    if (scores.teamSuccess < 55 && scores.influence >= 80) modifier += 3;
    if (player.goalBias > 0.7) modifier -= 8;

    return modifier;
  }

  if (profile.name === "Martin Ødegaard") {
    let modifier = 0;

    if (player.playerRole === "attackingMidfielder" && scores.creation >= 68 && scores.passing !== undefined && scores.passing >= 72) modifier += 8;
    if (scores.discipline >= 82 && player.goalBias <= 0.5) modifier += 5;
    if (scores.scoring >= 78 || player.goalBias > 0.62) modifier -= 7;

    return modifier;
  }

  if (profile.name === "Antoine Semenyo" || profile.name === "Bryan Mbeumo") {
    let modifier = 0;

    if ((isRightForwardPosition(player.position) || isLeftForwardPosition(player.position)) && player.goalContributionsPerGame >= 0.9) modifier += 5;
    if (scores.form !== undefined && scores.form >= 70) modifier += 4;
    if (player.assistsPerGame > 0.9) modifier -= 5;

    return modifier;
  }

  if (profile.name === "João Cancelo") {
    let modifier = 0;

    if (player.positionGroup === "defender" && scores.passing !== undefined && scores.passing >= 70) modifier += 8;
    if (scores.creation >= 58) modifier += 4;
    if (scores.scoring >= 70) modifier -= 8;

    return modifier;
  }

  if (profile.name === "Gianluigi Donnarumma") {
    let modifier = 0;

    if (player.positionGroup === "goalkeeper") modifier += 20;
    if (player.goalContributionsPerGame > 0.25) modifier -= 20;
    if (scores.influence >= 78 && scores.teamSuccess >= 55) modifier += 6;

    return modifier;
  }

  if (profile.name === "Julián Álvarez" || profile.name === "João Pedro") {
    let modifier = 0;

    if (balancedScorerCreator && player.goalContributionsPerGame >= 1) modifier += 5;
    if (scores.teamSuccess >= 55) modifier += 3;
    if ((player.playerRole === "striker" || player.playerRole === "secondStriker") && player.assistsPerGame >= 0.35) modifier += 6;
    if (profile.name === "João Pedro" && player.overall <= 85 && player.goalBias >= 0.5) modifier += 4;
    if (
      profile.name === "João Pedro" &&
      (player.playerRole === "striker" || player.playerRole === "secondStriker")
    ) {
      if (scores.output <= 62) modifier += 14;
      if (scores.scoring <= 64) modifier += 8;
      if (player.averageRating < 8) modifier += 5;
      if (player.goalContributionsPerGame < 0.85) modifier += 5;
      if (scores.output >= 78 || player.goalsPerGame >= 0.9) modifier -= 14;
    }
    if (profile.name === "Julián Álvarez" && scores.teamSuccess >= 58 && scores.balance >= 62) modifier += 4;
    if (veryHighGoalShare && player.assistsPerGame < 0.25) modifier -= 6;

    return modifier;
  }

  if (profile.name === "Omar Marmoush") {
    let modifier = 0;

    if (player.formTrend === "slumping" || player.formTrend === "cold") modifier += 5;
    if (player.formTrend === "hot" && scores.output >= 75) modifier += 3;
    if (player.assistsPerGame > 0.75) modifier -= 5;

    return modifier;
  }

  if (profile.name === "Nico O’Reilly") {
    let modifier = 0;

    if (scores.defense !== undefined && scores.defense >= 45 && scores.output >= 35) modifier += 5;
    if (scores.teamSuccess >= 60 && scores.discipline >= 80) modifier += 4;

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
      profile.name === "Cole Palmer" ||
      profile.name === "Florian Wirtz" ||
      profile.name === "Martin Ødegaard" ||
      profile.name === "Rayan Cherki" ||
      profile.name === "Thomas Müller" ||
      profile.name === "João Cancelo" ||
      profile.name === "Trent Alexander-Arnold")
  ) {
    return elitePassing ? 7 : 5;
  }

  if (
    highPassing &&
    (profile.name === "Rodri" ||
      profile.name === "Declan Rice" ||
      profile.name === "Nico O’Reilly" ||
      profile.name === "Yaya Touré" ||
      profile.name === "Steven Gerrard")
  ) {
    return 4;
  }

  if (
    lowPassing &&
    (profile.name === "Kevin De Bruyne" ||
      profile.name === "Bruno Fernandes" ||
      profile.name === "Florian Wirtz" ||
      profile.name === "Rayan Cherki" ||
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
    "Alexander Isak",
    "Antoine Semenyo",
    "Bryan Mbeumo",
    "Cole Palmer",
    "Lionel Messi",
    "Neymar",
    "Kylian Mbappé",
    "Harry Kane",
    "Igor Thiago",
    "João Pedro",
    "Julián Álvarez",
    "Mohamed Salah",
    "Omar Marmoush",
    "Rayan Cherki",
    "Bukayo Saka",
    "Viktor Gyökeres",
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
  if (player.goalVolumeBand === "legendary") return "Legendary Goal Scorer";
  if (player.goalVolumeBand === "elite" && scores.scoring >= 80) return "Elite Goal Scorer";
  if (player.goalVolumeBand === "high" && scores.scoring >= 70) return "High-Volume Scorer";
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

function getFormTrendLabel(trend: DerivedPlayerStats["formTrend"]) {
  if (trend === "hot") return "hot form";
  if (trend === "good") return "good form";
  if (trend === "slumping") return "a recent slump";
  if (trend === "cold") return "cold form";
  return "steady form";
}

function getFormSentence(player: DerivedPlayerStats) {
  if (player.recentAverageRating === undefined || player.recentMatchCount === 0) {
    return "Recent-match form was not available, so the comp leans on season-long production.";
  }

  const direction = player.formDelta >= 0 ? "above" : "below";
  const recentOutput =
    player.recentGoalContributionsPerGame !== undefined
      ? ` and ${player.recentGoalContributionsPerGame.toFixed(2)} recent G/A per game`
      : "";

  return `Recent form is ${getFormTrendLabel(player.formTrend)}: ${player.recentAverageRating.toFixed(1)} over the last ${player.recentMatchCount} matches, ${Math.abs(player.formDelta).toFixed(1)} ${direction} the season rating${recentOutput}.`;
}

function getGoalVolumeSentence(player: DerivedPlayerStats) {
  if (player.goalVolumeBand === "low") {
    return `${player.goals} season goals keeps creator, defender, and two-way comps in the pool instead of forcing a finisher comp.`;
  }

  if (player.goalVolumeBand === "productive") {
    return `${player.goals} season goals crosses the productive-scorer band, so scorer/creator hybrids get a boost.`;
  }

  if (player.goalVolumeBand === "high") {
    return `${player.goals} season goals crosses the high-volume band, so the algorithm shifts toward proven scorer comps.`;
  }

  if (player.goalVolumeBand === "elite") {
    return `${player.goals} season goals crosses the elite-scorer band, narrowing the best fits toward top finishers.`;
  }

  return `${player.goals} season goals crosses the legendary-scorer band, heavily favoring all-time volume finisher comps.`;
}

function getRoleSentence(player: DerivedPlayerStats, primary: PlayerProfile) {
  const profileRoles = getProfileRealLifeRoles(primary)
    .filter((role) => role !== "unknown")
    .map((role) => role.replace(/([A-Z])/g, " $1").toLowerCase());

  if (player.playerRole === "unknown" || profileRoles.length === 0) {
    return "No specific position was available, so the comp falls back to the broader stat profile.";
  }

  const playerRole = player.playerRole.replace(/([A-Z])/g, " $1").toLowerCase();

  return `Position fit matters: this player's ${playerRole} role is compared against ${primary.name}'s real-life ${profileRoles.join("/")} profile.`;
}

function getOverallSentence(player: DerivedPlayerStats, primary: PlayerProfile) {
  if (player.overall <= 0) {
    return "Overall rating was not available, so the comp leans on production, form, and role fit.";
  }

  const idealOverall = getProfileOverallIdeal(primary);
  const gap = player.overall - idealOverall;

  if (Math.abs(gap) <= 3) {
    return `${player.overall} overall is close to ${primary.name}'s ${idealOverall}-overall comp tier.`;
  }

  const direction = gap > 0 ? "above" : "below";

  return `${player.overall} overall is ${Math.abs(gap)} points ${direction} ${primary.name}'s ${idealOverall}-overall comp tier, so quality level affects the final match.`;
}

function getHeightSentence(player: DerivedPlayerStats, primary: PlayerProfile) {
  if (player.heightCm === undefined) {
    return "Height was not available, so body-type fit was skipped for this comp.";
  }

  const profileHeight = getProfileHeightIdeal(primary);
  const heightGap = profileHeight - player.heightCm;

  if (heightGap <= 3) {
    return `${player.heightCm} cm height is close to ${primary.name}'s real-life ${profileHeight} cm build, and shorter comps are excluded.`;
  }

  return `${player.heightCm} cm height is compared against ${primary.name}'s real-life ${profileHeight} cm build, with shorter comps removed from the pool.`;
}

function getShotEfficiencySentence(player: DerivedPlayerStats, primary: PlayerProfile) {
  if (player.shotSuccessRate === undefined) {
    return "Shot conversion was not available, so finishing style leans on goals, assists, and role.";
  }

  return `${Math.round(player.shotSuccessRate)}% shot success is compared against ${primary.name}'s real-life finishing profile around ${getProfileShotSuccessRate(primary)}%.`;
}

function getSeasonProductionSentence(player: DerivedPlayerStats, primary: PlayerProfile) {
  const season = getProfileSeasonProduction(primary);

  return `Season production fit compares ${player.goalContributionsPerGame.toFixed(2)} G/A per match against ${primary.name}'s current-profile benchmark around ${season.goalContributionsPerGame.toFixed(2)}.`;
}

function createSummary(profile: PlayerProfile, similarityScore: number): PlayerCompSummary {
  return {
    name: profile.name,
    styleLabel: profile.styleLabel,
    similarityScore: round(clamp(65 + similarityScore * 0.24, 0, 99)),
    imagePath: PLAYER_COMP_IMAGES[profile.key] ?? PLAYER_COMP_IMAGES.fallback,
  };
}

function createReasons(player: DerivedPlayerStats, scores: PlayerCompScores, primary: PlayerProfile) {
  const reasons = [
    `${player.goalsPerGame.toFixed(2)} goals and ${player.assistsPerGame.toFixed(2)} assists per game.`,
    `${player.goalContributionsPerGame.toFixed(2)} G/A per game with a ${player.averageRating.toFixed(1)} average rating.`,
    `${formatPercent(player.motmPercent)} MOTM rate and ${formatPercent(player.winRate)} win rate.`,
    getGoalVolumeSentence(player),
    getRoleSentence(player, primary),
    getOverallSentence(player, primary),
    getHeightSentence(player, primary),
    getShotEfficiencySentence(player, primary),
    getSeasonProductionSentence(player, primary),
  ];

  reasons.push(getFormSentence(player));

  if (scores.passing !== undefined && player.passesMadePerGame !== undefined) {
    reasons.push(`${player.passesMadePerGame.toFixed(2)} passes made per game with ${Math.round(player.passAccuracy ?? 0)}% pass success.`);
  }

  if (scores.defense !== undefined && player.tacklesPerGame !== undefined) {
    reasons.push(`${player.tacklesPerGame.toFixed(2)} tackles per game with ${Math.round(player.tacklePercent ?? 0)}% tackle success.`);
  }

  if (player.redCards > 0 || primary.name === "Sergio Ramos" || primary.name === "Arturo Vidal") {
    reasons.push(`${player.redCards} red cards across ${player.games} games.`);
  }

  return reasons.slice(0, 9);
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
  const formNote =
    player.recentAverageRating !== undefined
      ? ` Recent form is ${getFormTrendLabel(player.formTrend)}, which nudges the comp toward players with a similar season arc.`
      : "";
  const goalVolumeNote =
    player.goalVolumeBand !== "low"
      ? ` Their ${getGoalVolumeLabel(player.goalVolumeBand)} goal volume changes the comparison pool before final scoring.`
      : "";
  const positionNote =
    player.playerRole !== "unknown"
      ? ` The comp is also filtered through real-life role fit, so ${player.playerRole.replace(/([A-Z])/g, " $1").toLowerCase()} profiles are favored over unrelated positions.`
      : "";
  const overallNote =
    player.overall > 0
      ? ` The ${getOverallTier(player.overall)} ${player.overall} overall rating also shifts the match toward players in a similar quality tier.`
      : "";
  const heightNote =
    player.heightCm !== undefined
      ? ` Height is a hard filter too: comps shorter than their ${player.heightCm} cm build are removed, then compared with ${primary.name}'s real-life ${getProfileHeightIdeal(primary)} cm profile.`
      : "";
  const shotNote =
    player.shotSuccessRate !== undefined
      ? ` Their ${Math.round(player.shotSuccessRate)}% shot success is also matched against real-life finishing benchmarks.`
      : "";

  return `This player matches a ${primary.name}-style profile because they fit a ${primary.styleLabel.toLowerCase()} stat profile. They average ${player.goalsPerGame.toFixed(2)} goals and ${player.assistsPerGame.toFixed(2)} assists per match, producing ${player.goalContributionsPerGame.toFixed(2)} G/A per game with an ${player.averageRating.toFixed(1)} average rating and a ${formatPercent(player.motmPercent)} MOTM rate.${carryNote}${goalVolumeNote}${positionNote}${overallNote}${heightNote}${shotNote}${formNote}`;
}

export function getPlayerStatComp(input: PlayerCompInput): PlayerStatCompResult {
  const player = derivePlayerStats(input);
  const scores = calculateScores(input, player);
  const context = { player, scores };
  const profilePool =
    FAMOUS_PLAYER_PROFILES.length > 0 ? FAMOUS_PLAYER_PROFILES : PLAYER_PROFILES;
  const eligibleProfiles = profilePool.filter((profile) =>
    isProfileEligibleForPosition(profile, player.positionGroup),
  );
  const positionProfiles = eligibleProfiles.length > 0 ? eligibleProfiles : profilePool;
  const rankingProfiles = applyRoleCandidatePool(positionProfiles, player);
  const rankProfiles = (profiles: PlayerProfile[]) =>
    profiles.map((profile) => ({
      profile,
      similarityScore: scorePlayerProfile(profile, context),
    })).filter((entry) => Number.isFinite(entry.similarityScore))
      .sort((left, right) => right.similarityScore - left.similarityScore);
  const rankedProfiles = rankProfiles(rankingProfiles);
  const fallbackRankedProfiles =
    rankedProfiles.length > 0 ? rankedProfiles : rankProfiles(positionProfiles);
  const emergencyRankedProfiles =
    fallbackRankedProfiles.length > 0
      ? fallbackRankedProfiles
      : profilePool
          .map((profile) => ({
            profile,
            similarityScore:
              scorePlayerProfile(profile, context) - Math.max(0, (player.heightCm ?? 0) - getProfileHeightIdeal(profile)) * 24,
          }))
          .sort((left, right) => right.similarityScore - left.similarityScore);
  const archetype = getArchetype(player, scores);
  const primary = emergencyRankedProfiles[0];
  const secondary = emergencyRankedProfiles[1] ?? primary;
  const third = emergencyRankedProfiles[2] ?? secondary;

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
