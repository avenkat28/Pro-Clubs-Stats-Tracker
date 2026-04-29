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

  if (divisionNumber === 1) {
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

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
