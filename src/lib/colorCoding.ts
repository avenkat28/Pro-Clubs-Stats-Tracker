export type HighlightTone =
  | "darkBlue"
  | "green"
  | "purple"
  | "gold"
  | "silver"
  | "bronze"
  | "red"
  | "orange";

const iconToneClasses: Record<HighlightTone, string> = {
  darkBlue:
    "border-blue-300/70 bg-blue-950 text-blue-100 shadow-blue-500/30",
  green:
    "border-green-300/70 bg-green-600/20 text-green-100 shadow-green-500/25",
  purple:
    "border-purple-300/70 bg-purple-600/20 text-purple-100 shadow-purple-500/25",
  gold:
    "border-yellow-300/70 bg-yellow-500/20 text-yellow-100 shadow-yellow-500/25",
  silver:
    "border-slate-200/70 bg-slate-400/20 text-slate-100 shadow-slate-300/20",
  bronze:
    "border-orange-300/70 bg-orange-700/20 text-orange-100 shadow-orange-500/20",
  red: "border-red-300/70 bg-red-600/20 text-red-100 shadow-red-500/25",
  orange:
    "border-orange-300/70 bg-orange-500/20 text-orange-100 shadow-orange-500/25",
};

const ratingToneClasses = {
  red: "border-red-400/70 bg-red-500/15 text-red-200 shadow-red-500/20",
  orange:
    "border-orange-300/70 bg-orange-500/15 text-orange-200 shadow-orange-500/20",
  green:
    "border-green-300/70 bg-green-500/15 text-green-200 shadow-green-500/20",
};

const skillRatingToneClasses = {
  low: {
    card: "border-red-300/20 bg-red-400/[0.08] shadow-[0_18px_40px_rgba(248,113,113,0.14)]",
    text: "text-red-200",
    label: "text-red-100/70",
  },
  belowAverage: {
    card: "border-orange-300/20 bg-orange-400/[0.08] shadow-[0_18px_40px_rgba(251,146,60,0.14)]",
    text: "text-orange-200",
    label: "text-orange-100/70",
  },
  average: {
    card: "border-yellow-300/20 bg-yellow-300/[0.08] shadow-[0_18px_40px_rgba(250,204,21,0.12)]",
    text: "text-yellow-100",
    label: "text-yellow-100/70",
  },
  strong: {
    card: "border-emerald-300/20 bg-emerald-300/[0.09] shadow-[0_18px_40px_rgba(16,185,129,0.16)]",
    text: "text-emerald-200",
    label: "text-emerald-100/65",
  },
  elite: {
    card: "border-cyan-300/25 bg-cyan-300/[0.1] shadow-[0_18px_40px_rgba(34,211,238,0.16)]",
    text: "text-cyan-100",
    label: "text-cyan-100/70",
  },
} as const;

const teamStrengthToneClasses = {
  low: {
    bar: "bg-red-400",
    text: "text-red-200",
    glow: "shadow-[0_0_20px_rgba(248,113,113,0.28)]",
  },
  belowAverage: {
    bar: "bg-orange-400",
    text: "text-orange-200",
    glow: "shadow-[0_0_20px_rgba(251,146,60,0.28)]",
  },
  average: {
    bar: "bg-yellow-300",
    text: "text-yellow-100",
    glow: "shadow-[0_0_20px_rgba(250,204,21,0.24)]",
  },
  strong: {
    bar: "bg-emerald-400",
    text: "text-emerald-200",
    glow: "shadow-[0_0_20px_rgba(52,211,153,0.3)]",
  },
  elite: {
    bar: "bg-cyan-300",
    text: "text-cyan-100",
    glow: "shadow-[0_0_20px_rgba(34,211,238,0.3)]",
  },
} as const;

export function normalizeOverall(value: number) {
  return value <= 10 ? Math.round(value * 10) : Math.round(value);
}

export function playerOverallTone(value: number): HighlightTone {
  const overall = normalizeOverall(value);

  if (overall >= 90) {
    return "darkBlue";
  }

  if (overall >= 75) {
    return "green";
  }

  if (overall >= 50) {
    return "purple";
  }

  if (overall >= 30) {
    return "gold";
  }

  if (overall >= 10) {
    return "silver";
  }

  return "bronze";
}

export function playerIconClassName(value: number) {
  return iconToneClasses[playerOverallTone(value)];
}

export function ratingBadgeClassName(rating: number) {
  if (rating < 5) {
    return ratingToneClasses.red;
  }

  if (rating <= 6.9) {
    return ratingToneClasses.orange;
  }

  return ratingToneClasses.green;
}

export function clubDivisionTone(division: string): HighlightTone {
  const divisionNumber = Number(division.match(/\d+/)?.[0] ?? 0);

  if (/elite/i.test(division) || divisionNumber === 1) {
    return "darkBlue";
  }

  if (divisionNumber === 2) {
    return "green";
  }

  if (divisionNumber === 3) {
    return "purple";
  }

  if (divisionNumber === 4) {
    return "gold";
  }

  if (divisionNumber === 5) {
    return "silver";
  }

  return "bronze";
}

export function clubIconClassName(division: string) {
  return iconToneClasses[clubDivisionTone(division)];
}

function skillRatingBand(skillRating: number) {
  if (skillRating >= 1800) {
    return "elite";
  }

  if (skillRating >= 1600) {
    return "strong";
  }

  if (skillRating >= 1450) {
    return "average";
  }

  if (skillRating >= 1300) {
    return "belowAverage";
  }

  return "low";
}

export function skillRatingCardClassName(skillRating: number) {
  return skillRatingToneClasses[skillRatingBand(skillRating)].card;
}

export function skillRatingTextClassName(skillRating: number) {
  return skillRatingToneClasses[skillRatingBand(skillRating)].text;
}

export function skillRatingLabelClassName(skillRating: number) {
  return skillRatingToneClasses[skillRatingBand(skillRating)].label;
}

function teamStrengthBand(value: number) {
  if (value >= 80) {
    return "elite";
  }

  if (value >= 60) {
    return "strong";
  }

  if (value >= 40) {
    return "average";
  }

  if (value >= 25) {
    return "belowAverage";
  }

  return "low";
}

export function teamStrengthBarClassName(value: number) {
  return teamStrengthToneClasses[teamStrengthBand(value)].bar;
}

export function teamStrengthTextClassName(value: number) {
  return teamStrengthToneClasses[teamStrengthBand(value)].text;
}

export function teamStrengthGlowClassName(value: number) {
  return teamStrengthToneClasses[teamStrengthBand(value)].glow;
}

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
