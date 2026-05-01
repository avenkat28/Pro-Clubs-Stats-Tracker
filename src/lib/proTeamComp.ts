export type ProTeamCompName =
  | "Manchester City"
  | "Barcelona"
  | "Real Madrid"
  | "Bayern Munich"
  | "PSG"
  | "Liverpool"
  | "Arsenal"
  | "Tottenham"
  | "Borussia Dortmund"
  | "Bayer Leverkusen"
  | "Napoli"
  | "Inter Milan"
  | "Atlético Madrid"
  | "Juventus"
  | "Chelsea";

export type ProTeamStyleLabel =
  | "Controlled Dominance"
  | "Attacking Control"
  | "Clinical Winners"
  | "Attack Machine"
  | "Star Power FC"
  | "Chaos Press"
  | "Balanced Contenders"
  | "All Gas, No Brakes"
  | "Chaotic Attack"
  | "Fluid Overload"
  | "Direct Combinations"
  | "Structured Efficiency"
  | "Defensive Lockdown"
  | "Controlled Grind"
  | "High Talent, Mixed Results";

export type ProTeamStatsInput = {
  matches?: number | null;
  wins?: number | null;
  draws?: number | null;
  losses?: number | null;
  winRate?: number | null;
  goalsFor?: number | null;
  goalsAgainst?: number | null;
  goalDifference?: number | null;
  goalsForPerMatch?: number | null;
  goalsAgainstPerMatch?: number | null;
  cleanSheets?: number | null;
  cleanSheetRate?: number | null;
  leagueApps?: number | null;
  playoffApps?: number | null;
  bestFinish?: number | string | null;
  formScore?: number | null;
  attackScore?: number | null;
  defenseScore?: number | null;
  last10?: Array<{ result: "W" | "D" | "L" }> | null;
};

export type ProPlayerStatsInput = {
  totalGoals?: number | null;
  goals?: number | null;
  totalAssists?: number | null;
  assists?: number | null;
  totalGoalContributions?: number | null;
  goalsPerGame?: number | null;
  assistsPerGame?: number | null;
  goalContributionsPerGame?: number | null;
  avgRating?: number | null;
  rating?: number | null;
  tackles?: number | null;
  tacklePercent?: number | null;
  tackleSuccessRate?: number | null;
  motm?: number | null;
  motmPercent?: number | null;
  redCards?: number | null;
  currentForm?: number | null;
  matches?: number | null;
};

export type ProTeamScores = {
  attack: number;
  defense: number;
  chaos: number;
  efficiency: number;
  form: number;
  starReliance?: number;
  teamBalance?: number;
  pressing?: number;
  discipline: number;
};

export type ProTeamTiers = {
  attackTier: string;
  defenseTier: string;
  chaosTier: string;
  efficiencyTier: string;
  formTier: string;
  starRelianceTier?: string;
  teamBalanceTier?: string;
  pressingTier?: string;
  disciplineTier: string;
};

export type ProTeamCompResult = {
  primaryComp: ProTeamCompName;
  secondaryComp: ProTeamCompName;
  styleLabel: ProTeamStyleLabel;
  explanation: string;
  scores: ProTeamScores;
  tiers: ProTeamTiers;
  reasons: string[];
  rejectedComps?: string[];
};

type DerivedTeamStats = {
  matches: number;
  wins: number;
  draws: number;
  losses: number;
  winRate: number;
  drawRate: number;
  lossRate: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  goalsForPerMatch: number;
  goalsAgainstPerMatch: number;
  goalDifferencePerMatch: number;
  cleanSheets: number;
  cleanSheetRate: number;
  chaosIndex: number;
};

type PlayerDistribution = {
  playerCount: number;
  totalGoals: number;
  totalAssists: number;
  totalGoalContributions: number;
  assistsPerGame?: number;
  avgRating?: number;
  tacklesPerMatch?: number;
  tacklePercent?: number;
  redCards: number;
  topPlayerGoalShare?: number;
  topPlayerGAShare?: number;
  topTwoGAShare?: number;
  meaningfulContributors: number;
};

type ScoreContext = {
  team: DerivedTeamStats;
  players?: PlayerDistribution;
  scores: ProTeamScores;
};

type ClubProfile = {
  name: ProTeamCompName;
  styleLabel: ProTeamStyleLabel;
  ideal: Partial<ProTeamScores>;
  chaosTarget?: "low" | "medium" | "high";
  thresholdScore: (context: ScoreContext) => number;
};

const CLUB_PROFILES: ClubProfile[] = [
  {
    name: "Manchester City",
    styleLabel: "Controlled Dominance",
    ideal: { attack: 86, defense: 92, efficiency: 88, chaos: 42, discipline: 82 },
    chaosTarget: "low",
    thresholdScore: ({ team }) =>
      averageBooleans([
        team.goalsForPerMatch >= 2.5,
        team.goalsAgainstPerMatch <= 1.3,
        team.winRate >= 0.6,
        team.goalDifferencePerMatch >= 1,
        team.cleanSheetRate >= 0.25,
      ]),
  },
  {
    name: "Barcelona",
    styleLabel: "Attacking Control",
    ideal: { attack: 84, defense: 72, efficiency: 84, chaos: 56, discipline: 78 },
    chaosTarget: "medium",
    thresholdScore: ({ team }) =>
      averageBooleans([
        team.goalsForPerMatch >= 2.5,
        team.goalsAgainstPerMatch <= 2,
        team.winRate >= 0.55,
        team.goalDifferencePerMatch >= 0.75,
      ]),
  },
  {
    name: "Real Madrid",
    styleLabel: "Clinical Winners",
    ideal: { attack: 82, defense: 72, efficiency: 88, chaos: 62, discipline: 78 },
    thresholdScore: ({ team }) =>
      averageBooleans([
        team.goalsForPerMatch >= 2.3,
        team.goalsAgainstPerMatch <= 2,
        team.winRate >= 0.6,
        team.goalDifferencePerMatch >= 0.75,
      ]),
  },
  {
    name: "Bayern Munich",
    styleLabel: "Attack Machine",
    ideal: { attack: 95, defense: 76, efficiency: 88, chaos: 66, discipline: 76 },
    thresholdScore: ({ team }) =>
      averageBooleans([
        team.goalsForPerMatch >= 3,
        team.goalsAgainstPerMatch <= 1.8,
        team.winRate >= 0.6,
        team.goalDifferencePerMatch >= 1.25,
      ]),
  },
  {
    name: "PSG",
    styleLabel: "Star Power FC",
    ideal: { attack: 88, defense: 52, efficiency: 68, chaos: 72, starReliance: 82 },
    chaosTarget: "high",
    thresholdScore: ({ team, players, scores }) =>
      averageBooleans([
        team.goalsForPerMatch >= 2.5,
        players?.topPlayerGAShare !== undefined
          ? players.topPlayerGAShare >= 0.35
          : scores.starReliance !== undefined
            ? scores.starReliance >= 70
            : undefined,
        players?.topTwoGAShare !== undefined
          ? players.topTwoGAShare >= 0.6
          : undefined,
      ]),
  },
  {
    name: "Liverpool",
    styleLabel: "Chaos Press",
    ideal: { attack: 84, defense: 68, efficiency: 76, chaos: 76, pressing: 82 },
    chaosTarget: "high",
    thresholdScore: ({ team, scores }) =>
      averageBooleans([
        team.goalsForPerMatch >= 2.3,
        scores.pressing !== undefined ? scores.pressing >= 70 : undefined,
        team.winRate >= 0.55,
        team.goalsAgainstPerMatch <= 2,
      ]),
  },
  {
    name: "Arsenal",
    styleLabel: "Balanced Contenders",
    ideal: { attack: 78, defense: 78, efficiency: 82, chaos: 52, teamBalance: 72 },
    chaosTarget: "medium",
    thresholdScore: ({ team }) =>
      averageBooleans([
        team.goalsForPerMatch >= 2.2,
        team.goalsAgainstPerMatch <= 1.7,
        team.winRate >= 0.55,
        team.goalDifferencePerMatch >= 0.75,
      ]),
  },
  {
    name: "Tottenham",
    styleLabel: "All Gas, No Brakes",
    ideal: { attack: 78, defense: 34, efficiency: 46, chaos: 98 },
    chaosTarget: "high",
    thresholdScore: ({ team }) =>
      averageBooleans([
        team.goalsForPerMatch >= 2.5,
        team.goalsAgainstPerMatch >= 2.2,
        team.winRate >= 0.35 && team.winRate <= 0.55,
        team.cleanSheetRate <= 0.15,
      ]),
  },
  {
    name: "Borussia Dortmund",
    styleLabel: "Chaotic Attack",
    ideal: { attack: 86, defense: 28, efficiency: 46, chaos: 95, form: 42 },
    chaosTarget: "high",
    thresholdScore: ({ team, scores }) =>
      averageBooleans([
        team.goalsForPerMatch >= 2.5,
        team.goalsAgainstPerMatch >= 2.2,
        scores.defense <= 50,
        scores.form <= 55,
      ]),
  },
  {
    name: "Bayer Leverkusen",
    styleLabel: "Fluid Overload",
    ideal: { attack: 86, defense: 68, efficiency: 84, chaos: 64, teamBalance: 78 },
    thresholdScore: ({ team, players, scores }) =>
      averageBooleans([
        team.goalsForPerMatch >= 2.5,
        players?.assistsPerGame !== undefined ? players.assistsPerGame >= 1.8 : undefined,
        team.winRate >= 0.58,
        team.goalDifferencePerMatch >= 0.9,
        scores.teamBalance !== undefined ? scores.teamBalance >= 65 : undefined,
      ]),
  },
  {
    name: "Napoli",
    styleLabel: "Direct Combinations",
    ideal: { attack: 82, defense: 62, efficiency: 70, chaos: 68, teamBalance: 66 },
    thresholdScore: ({ team, players }) =>
      averageBooleans([
        team.goalsForPerMatch >= 2.4,
        players?.assistsPerGame !== undefined ? players.assistsPerGame >= 1.6 : undefined,
        team.goalsAgainstPerMatch <= 2.1,
        team.winRate >= 0.5,
      ]),
  },
  {
    name: "Inter Milan",
    styleLabel: "Structured Efficiency",
    ideal: { attack: 68, defense: 86, efficiency: 80, chaos: 42, discipline: 80 },
    chaosTarget: "low",
    thresholdScore: ({ team }) =>
      averageBooleans([
        team.goalsForPerMatch >= 2,
        team.goalsAgainstPerMatch <= 1.4,
        team.cleanSheetRate >= 0.25,
        team.winRate >= 0.55,
      ]),
  },
  {
    name: "Atlético Madrid",
    styleLabel: "Defensive Lockdown",
    ideal: { attack: 52, defense: 94, efficiency: 74, chaos: 30, discipline: 78 },
    chaosTarget: "low",
    thresholdScore: ({ team }) =>
      averageBooleans([
        team.goalsAgainstPerMatch <= 1.2,
        team.cleanSheetRate >= 0.35,
        team.goalsForPerMatch >= 1.4 && team.goalsForPerMatch <= 2.4,
        team.winRate >= 0.5,
      ]),
  },
  {
    name: "Juventus",
    styleLabel: "Controlled Grind",
    ideal: { attack: 56, defense: 90, efficiency: 72, chaos: 34, discipline: 80 },
    chaosTarget: "low",
    thresholdScore: ({ team, scores }) =>
      averageBooleans([
        team.goalsAgainstPerMatch <= 1.3,
        team.goalsForPerMatch >= 1.5 && team.goalsForPerMatch <= 2.5,
        team.winRate >= 0.5,
        scores.chaos <= 55,
      ]),
  },
  {
    name: "Chelsea",
    styleLabel: "High Talent, Mixed Results",
    ideal: { attack: 70, defense: 52, efficiency: 38, chaos: 62, form: 38 },
    thresholdScore: ({ team, players, scores }) =>
      averageBooleans([
        team.goalsForPerMatch >= 2,
        players?.avgRating !== undefined ? players.avgRating >= 8 : undefined,
        team.winRate < 0.5 || scores.form < 50,
        team.goalDifferencePerMatch >= -0.3 && team.goalDifferencePerMatch <= 0.5,
      ]),
  },
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

  const met = usableValues.filter(Boolean).length;

  return met / usableValues.length;
}

function scoreCloseness(actual: number | undefined, ideal: number | undefined) {
  if (actual === undefined || ideal === undefined) {
    return undefined;
  }

  return clamp(100 - Math.abs(actual - ideal) * 1.25);
}

function averageNumbers(values: Array<number | undefined>) {
  const usableValues = values.filter((value): value is number => value !== undefined);

  if (usableValues.length === 0) {
    return 50;
  }

  return usableValues.reduce((total, value) => total + value, 0) / usableValues.length;
}

function deriveTeamStats(teamStats: ProTeamStatsInput): DerivedTeamStats {
  const wins = valueOrZero(teamStats.wins);
  const draws = valueOrZero(teamStats.draws);
  const losses = valueOrZero(teamStats.losses);
  const explicitMatches = valueOrZero(teamStats.matches);
  const matches = explicitMatches || wins + draws + losses;
  const goalsFor = valueOrZero(teamStats.goalsFor);
  const goalsAgainst = valueOrZero(teamStats.goalsAgainst);
  const goalDifference = Number.isFinite(teamStats.goalDifference)
    ? Number(teamStats.goalDifference)
    : goalsFor - goalsAgainst;
  const winRate = teamStats.winRate !== undefined && teamStats.winRate !== null
    ? normalizeRate(teamStats.winRate)
    : matches > 0
      ? wins / matches
      : 0;
  const goalsForPerMatch = Number.isFinite(teamStats.goalsForPerMatch)
    ? Number(teamStats.goalsForPerMatch)
    : matches > 0
      ? goalsFor / matches
      : 0;
  const goalsAgainstPerMatch = Number.isFinite(teamStats.goalsAgainstPerMatch)
    ? Number(teamStats.goalsAgainstPerMatch)
    : matches > 0
      ? goalsAgainst / matches
      : 0;
  const cleanSheetRate = teamStats.cleanSheetRate !== undefined && teamStats.cleanSheetRate !== null
    ? normalizeRate(teamStats.cleanSheetRate)
    : matches > 0
      ? valueOrZero(teamStats.cleanSheets) / matches
      : 0;

  return {
    matches,
    wins,
    draws,
    losses,
    winRate,
    drawRate: matches > 0 ? draws / matches : 0,
    lossRate: matches > 0 ? losses / matches : 0,
    goalsFor,
    goalsAgainst,
    goalDifference,
    goalsForPerMatch,
    goalsAgainstPerMatch,
    goalDifferencePerMatch: matches > 0 ? goalDifference / matches : 0,
    cleanSheets: valueOrZero(teamStats.cleanSheets),
    cleanSheetRate,
    chaosIndex: goalsForPerMatch + goalsAgainstPerMatch,
  };
}

function derivePlayerDistribution(
  players: ProPlayerStatsInput[] | undefined,
  team: DerivedTeamStats,
): PlayerDistribution | undefined {
  if (!players?.length) {
    return undefined;
  }

  const normalizedPlayers = players.map((player) => {
    const goals = valueOrZero(player.totalGoals ?? player.goals);
    const assists = valueOrZero(player.totalAssists ?? player.assists);
    const goalContributions =
      valueOrZero(player.totalGoalContributions) || goals + assists;

    return {
      goals,
      assists,
      goalContributions,
      matches: valueOrZero(player.matches),
      tackles: valueOrZero(player.tackles),
      tacklePercent: valueOrZero(player.tacklePercent ?? player.tackleSuccessRate),
      redCards: valueOrZero(player.redCards),
      avgRating: valueOrZero(player.avgRating ?? player.rating),
    };
  });
  const totalGoals =
    normalizedPlayers.reduce((total, player) => total + player.goals, 0) ||
    team.goalsFor;
  const totalAssists = normalizedPlayers.reduce(
    (total, player) => total + player.assists,
    0,
  );
  const totalGoalContributions =
    normalizedPlayers.reduce(
      (total, player) => total + player.goalContributions,
      0,
    ) || totalGoals + totalAssists;
  const sortedByGoalContributions = [...normalizedPlayers].sort(
    (left, right) => right.goalContributions - left.goalContributions,
  );
  const topGoalScorer = [...normalizedPlayers].sort(
    (left, right) => right.goals - left.goals,
  )[0];
  const totalPlayerMatches = normalizedPlayers.reduce(
    (total, player) => total + player.matches,
    0,
  );
  const playerMatchDenominator =
    totalPlayerMatches > 0 ? totalPlayerMatches : team.matches;
  const weightedTacklePercentTotal = normalizedPlayers.reduce(
    (total, player) => total + player.tacklePercent * player.tackles,
    0,
  );
  const totalTackles = normalizedPlayers.reduce(
    (total, player) => total + player.tackles,
    0,
  );
  const ratings = normalizedPlayers
    .map((player) => player.avgRating)
    .filter((rating) => rating > 0);

  return {
    playerCount: normalizedPlayers.length,
    totalGoals,
    totalAssists,
    totalGoalContributions,
    assistsPerGame: team.matches > 0 ? totalAssists / team.matches : undefined,
    avgRating:
      ratings.length > 0
        ? ratings.reduce((total, rating) => total + rating, 0) / ratings.length
        : undefined,
    tacklesPerMatch:
      playerMatchDenominator > 0 ? totalTackles / playerMatchDenominator : undefined,
    tacklePercent:
      totalTackles > 0 ? weightedTacklePercentTotal / totalTackles : undefined,
    redCards: normalizedPlayers.reduce((total, player) => total + player.redCards, 0),
    topPlayerGoalShare:
      totalGoals > 0 && topGoalScorer ? topGoalScorer.goals / totalGoals : undefined,
    topPlayerGAShare:
      totalGoalContributions > 0
        ? sortedByGoalContributions[0]?.goalContributions / totalGoalContributions
        : undefined,
    topTwoGAShare:
      totalGoalContributions > 0
        ? sortedByGoalContributions
            .slice(0, 2)
            .reduce((total, player) => total + player.goalContributions, 0) /
          totalGoalContributions
        : undefined,
    meaningfulContributors: normalizedPlayers.filter(
      (player) =>
        player.goalContributions >= 5 ||
        (totalGoalContributions > 0 &&
          player.goalContributions / totalGoalContributions >= 0.08),
    ).length,
  };
}

function calculateScores(
  teamStats: ProTeamStatsInput,
  team: DerivedTeamStats,
  players?: PlayerDistribution,
): ProTeamScores {
  const attack =
    teamStats.attackScore !== undefined && teamStats.attackScore !== null
      ? round(teamStats.attackScore)
      : round(
          interpolate(team.goalsForPerMatch, [
            [0, 0],
            [1.5, 40],
            [2.2, 60],
            [2.8, 80],
            [3.5, 100],
          ]),
        );
  const defense =
    teamStats.defenseScore !== undefined && teamStats.defenseScore !== null
      ? round(teamStats.defenseScore)
      : round(
          interpolate(team.goalsAgainstPerMatch, [
            [0.8, 100],
            [1.2, 85],
            [1.6, 70],
            [2.1, 50],
            [2.8, 25],
            [3.2, 0],
          ]) + team.cleanSheetRate * 10,
        );
  const chaos = round(
    interpolate(team.chaosIndex, [
      [0, 20],
      [3, 20],
      [4, 40],
      [5, 60],
      [6, 80],
      [6.01, 100],
    ]),
  );
  const winRateScore = team.winRate * 100;
  const gdScore = clamp(((team.goalDifferencePerMatch + 1.5) / 3) * 100);
  const efficiency = round(0.65 * winRateScore + 0.35 * gdScore);
  const form = round(
    teamStats.formScore !== undefined && teamStats.formScore !== null
      ? teamStats.formScore
      : teamStats.last10?.length
        ? (teamStats.last10.reduce((points, match) => {
            if (match.result === "W") {
              return points + 3;
            }

            if (match.result === "D") {
              return points + 1;
            }

            return points;
          }, 0) /
            (teamStats.last10.length * 3)) *
          100
        : efficiency,
  );
  const starReliance =
    players?.topPlayerGAShare !== undefined && players.topTwoGAShare !== undefined
      ? round(
          Math.max(
            interpolate(players.topPlayerGAShare, [
              [0.15, 15],
              [0.2, 25],
              [0.35, 75],
              [0.45, 100],
            ]),
            interpolate(players.topTwoGAShare, [
              [0.3, 15],
              [0.4, 30],
              [0.6, 78],
              [0.72, 100],
            ]),
          ),
        )
      : undefined;
  const contributorScore =
    players !== undefined
      ? interpolate(players.meaningfulContributors, [
          [1, 18],
          [2, 38],
          [3, 58],
          [4, 78],
          [6, 100],
        ])
      : undefined;
  const teamBalance =
    starReliance !== undefined && contributorScore !== undefined
      ? round(0.6 * (100 - starReliance) + 0.4 * contributorScore)
      : undefined;
  const pressing =
    players?.tacklesPerMatch !== undefined && players.tacklePercent !== undefined
      ? round(
          0.6 *
            interpolate(players.tacklesPerMatch, [
              [0, 0],
              [1, 30],
              [2.5, 60],
              [4, 80],
              [6, 100],
            ]) +
            0.4 * clamp(players.tacklePercent > 1 ? players.tacklePercent : players.tacklePercent * 100),
        )
      : undefined;
  const redCards =
    players?.redCards !== undefined && players.redCards > 0
      ? players.redCards
      : players?.redCards === 0
        ? 0
        : 0;
  const redCardsPerMatch = team.matches > 0 ? redCards / team.matches : 0;
  const discipline = round(
    interpolate(redCardsPerMatch, [
      [0, 100],
      [0.02, 85],
      [0.05, 65],
      [0.1, 35],
      [0.15, 0],
    ]),
  );

  return {
    attack,
    defense,
    chaos,
    efficiency,
    form,
    starReliance,
    teamBalance,
    pressing,
    discipline,
  };
}

function getAttackTier(goalsForPerMatch: number) {
  if (goalsForPerMatch >= 2.8) return "Elite";
  if (goalsForPerMatch >= 2.2) return "Strong";
  if (goalsForPerMatch >= 1.5) return "Average";
  if (goalsForPerMatch > 0) return "Low";
  return "No Data";
}

function getDefenseTier(goalsAgainstPerMatch: number, cleanSheetRate: number) {
  if (goalsAgainstPerMatch <= 1 && cleanSheetRate >= 0.3) return "Elite";
  if (goalsAgainstPerMatch <= 1.4) return "Strong";
  if (goalsAgainstPerMatch <= 2) return "Average";
  if (goalsAgainstPerMatch <= 2.8) return "Weak";
  return "Very Weak";
}

function getChaosTier(chaosScore: number) {
  if (chaosScore >= 80) return "Full Chaos";
  if (chaosScore >= 60) return "High Chaos";
  if (chaosScore >= 40) return "Open";
  return "Controlled";
}

function getEfficiencyTier(efficiencyScore: number) {
  if (efficiencyScore >= 78) return "Elite";
  if (efficiencyScore >= 62) return "Strong";
  if (efficiencyScore >= 45) return "Mixed";
  return "Low";
}

function getGenericTier(score: number) {
  if (score >= 80) return "Elite";
  if (score >= 65) return "Strong";
  if (score >= 45) return "Mixed";
  if (score >= 25) return "Low";
  return "Very Low";
}

function createTiers(team: DerivedTeamStats, scores: ProTeamScores): ProTeamTiers {
  return {
    attackTier: getAttackTier(team.goalsForPerMatch),
    defenseTier: getDefenseTier(team.goalsAgainstPerMatch, team.cleanSheetRate),
    chaosTier: getChaosTier(scores.chaos),
    efficiencyTier: getEfficiencyTier(scores.efficiency),
    formTier: getGenericTier(scores.form),
    starRelianceTier:
      scores.starReliance !== undefined ? getGenericTier(scores.starReliance) : undefined,
    teamBalanceTier:
      scores.teamBalance !== undefined ? getGenericTier(scores.teamBalance) : undefined,
    pressingTier: scores.pressing !== undefined ? getGenericTier(scores.pressing) : undefined,
    disciplineTier: getGenericTier(scores.discipline),
  };
}

function scoreClubProfile(profile: ClubProfile, context: ScoreContext) {
  const scoreMatches = averageNumbers([
    scoreCloseness(context.scores.attack, profile.ideal.attack),
    scoreCloseness(context.scores.defense, profile.ideal.defense),
    scoreCloseness(context.scores.chaos, profile.ideal.chaos),
    scoreCloseness(context.scores.efficiency, profile.ideal.efficiency),
    scoreCloseness(context.scores.form, profile.ideal.form),
    scoreCloseness(context.scores.starReliance, profile.ideal.starReliance),
    scoreCloseness(context.scores.teamBalance, profile.ideal.teamBalance),
    scoreCloseness(context.scores.pressing, profile.ideal.pressing),
    scoreCloseness(context.scores.discipline, profile.ideal.discipline),
  ]);
  const thresholdMatches = profile.thresholdScore(context) * 100;

  return 0.62 * scoreMatches + 0.38 * thresholdMatches;
}

function formatSigned(value: number) {
  return value > 0 ? `+${value}` : value.toString();
}

function formatPercent(rate: number) {
  return `${Math.round(rate * 100)}%`;
}

function createReasons(
  primary: ClubProfile,
  team: DerivedTeamStats,
  scores: ProTeamScores,
  tiers: ProTeamTiers,
) {
  const reasons = [
    `${team.goalsForPerMatch.toFixed(2)} goals for per match is ${tiers.attackTier.toLowerCase()} attacking output.`,
    `${team.goalsAgainstPerMatch.toFixed(2)} goals against per match grades as ${tiers.defenseTier.toLowerCase()} defense.`,
    `${formatPercent(team.winRate)} win rate with a ${formatSigned(team.goalDifference)} goal difference.`,
    `${team.chaosIndex.toFixed(2)} combined goals per match creates a ${tiers.chaosTier.toLowerCase()} game state.`,
  ];

  if (primary.name === "Tottenham" || primary.name === "Borussia Dortmund") {
    reasons.push("The attack keeps matches competitive, but the defensive volume blocks a dominant profile.");
  } else if (primary.name === "Manchester City") {
    reasons.push("The comp comes from scoring volume, defensive control, win rate, and goal difference.");
  } else if (primary.name === "PSG" && scores.starReliance !== undefined) {
    reasons.push(`Star reliance grades at ${scores.starReliance}/100.`);
  }

  return reasons.slice(0, 5);
}

function createExplanation(
  primary: ClubProfile,
  team: DerivedTeamStats,
  scores: ProTeamScores,
  tiers: ProTeamTiers,
) {
  const style = primary.styleLabel.toLowerCase();
  const article = /^[aeiou]/.test(style) ? "an" : "a";
  const base = `This team matches ${primary.name} because they fit ${article} ${style} profile.`;
  const production = `They average ${team.goalsForPerMatch.toFixed(2)} goals for and ${team.goalsAgainstPerMatch.toFixed(2)} goals against per match, which grades as ${tiers.attackTier.toLowerCase()} attack and ${tiers.defenseTier.toLowerCase()} defense.`;
  const record = `The ${formatPercent(team.winRate)} win rate and ${formatSigned(team.goalDifference)} goal difference put efficiency in the ${tiers.efficiencyTier.toLowerCase()} range.`;
  const chaos = `A ${team.chaosIndex.toFixed(2)} chaos index makes the game model ${tiers.chaosTier.toLowerCase()}.`;

  if (primary.name === "Tottenham" || primary.name === "Borussia Dortmund") {
    return `${base} ${production} ${chaos} ${record} The attack keeps them competitive, but defensive instability prevents them from becoming a dominant side.`;
  }

  if (primary.name === "Manchester City") {
    return `${base} ${production} ${record} The comp is based on high scoring, elite defense, strong win rate, and strong goal difference, with no possession or passing data required.`;
  }

  return `${base} ${production} ${record} ${chaos}`;
}

export function getProTeamComp(
  teamStats: ProTeamStatsInput,
  playerStats?: ProPlayerStatsInput[],
): ProTeamCompResult {
  const team = deriveTeamStats(teamStats);
  const players = derivePlayerDistribution(playerStats, team);
  const scores = calculateScores(teamStats, team, players);
  const tiers = createTiers(team, scores);
  const context = { team, players, scores };
  const rankedProfiles = CLUB_PROFILES.map((profile) => ({
    profile,
    score: scoreClubProfile(profile, context),
  })).sort((left, right) => right.score - left.score);
  const primary = rankedProfiles[0].profile;
  const secondary = rankedProfiles[1].profile;
  const reasons = createReasons(primary, team, scores, tiers);

  return {
    primaryComp: primary.name,
    secondaryComp: secondary.name,
    styleLabel: primary.styleLabel,
    explanation: createExplanation(primary, team, scores, tiers),
    scores,
    tiers,
    reasons,
    rejectedComps: rankedProfiles
      .slice(-3)
      .reverse()
      .map(({ profile }) => profile.name),
  };
}
