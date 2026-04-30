type StatIconProps = {
  label: string;
  className?: string;
};

type IconType =
  | "assist"
  | "assistRate"
  | "cleanSheet"
  | "club"
  | "contribution"
  | "contributionRate"
  | "default"
  | "division"
  | "draw"
  | "games"
  | "goal"
  | "goalAgainst"
  | "goalDifference"
  | "goalFor"
  | "goalRate"
  | "live"
  | "loss"
  | "motm"
  | "pass"
  | "platform"
  | "player"
  | "rating"
  | "record"
  | "redCard"
  | "tackle"
  | "win";

function compactLabel(label: string) {
  return label.toLowerCase().replace(/\s+/g, " ").trim();
}

function iconType(label: string): IconType {
  const normalized = compactLabel(label);
  const compact = normalized.replace(/[\s/_-]+/g, "");

  if (normalized.includes("red card")) return "redCard";
  if (normalized.includes("clean")) return "cleanSheet";
  if (normalized.includes("motm") || normalized.includes("man of the match")) return "motm";
  if (normalized.includes("tackle")) return "tackle";
  if (normalized.includes("pass")) return "pass";
  if (normalized.includes("g/a") && (normalized.includes("game") || normalized.includes("match"))) return "contributionRate";
  if (normalized.includes("g/a")) return "contribution";
  if (normalized.includes("assist") && (normalized.includes("game") || normalized.includes("match"))) return "assistRate";
  if (normalized.includes("assist") || normalized === "a") return "assist";
  if (normalized.includes("against") || compact === "ga") return "goalAgainst";
  if (normalized.includes("difference") || compact === "gd") return "goalDifference";
  if (normalized.includes("for") || compact === "gf") return "goalFor";
  if (normalized.includes("goal") && (normalized.includes("game") || normalized.includes("match"))) return "goalRate";
  if (normalized.includes("goal") || normalized === "g") return "goal";
  if (normalized.includes("rating") || normalized.includes("skill")) return "rating";
  if (normalized.includes("win") || normalized === "w") return "win";
  if (normalized.includes("loss") || normalized === "l") return "loss";
  if (normalized.includes("draw") || normalized === "d") return "draw";
  if (normalized.includes("game") || normalized.includes("match") || normalized.includes("appearance")) return "games";
  if (normalized.includes("club")) return "club";
  if (normalized.includes("player")) return "player";
  if (normalized.includes("division")) return "division";
  if (normalized.includes("platform")) return "platform";
  if (normalized.includes("record")) return "record";
  if (normalized.includes("live")) return "live";

  return "default";
}

function iconColor(label: string) {
  const type = iconType(label);

  if (type === "redCard" || type === "loss" || type === "goalAgainst") return "text-red-400";
  if (["goal", "goalFor", "goalRate", "win", "cleanSheet", "goalDifference"].includes(type)) {
    return "text-green-400";
  }
  if (["assist", "assistRate", "pass"].includes(type)) return "text-sky-400";
  if (["contribution", "contributionRate", "rating", "live", "motm"].includes(type)) {
    return "text-yellow-300";
  }
  if (type === "draw" || type === "games") return "text-slate-300";
  if (type === "tackle") return "text-purple-300";

  return "text-blue-300";
}

export default function StatIcon({ label, className = "" }: StatIconProps) {
  const type = iconType(label);
  const baseClassName = `inline-block h-4 w-4 shrink-0 ${iconColor(label)} ${className}`;

  if (type === "redCard") {
    return (
      <svg viewBox="0 0 24 24" className={baseClassName} aria-hidden="true">
        <rect x="7" y="3" width="10" height="18" rx="2" fill="currentColor" />
      </svg>
    );
  }

  if (type === "goal") {
    return (
      <svg viewBox="0 0 24 24" className={baseClassName} aria-hidden="true">
        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M12 8l4 3-1.5 5h-5L8 11l4-3z" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M12 4v4M4.8 9.5L8 11M19.2 9.5L16 11M7.5 18l2-2M16.5 18l-2-2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  if (type === "assist") {
    return (
      <svg viewBox="0 0 24 24" className={baseClassName} aria-hidden="true">
        <path d="M6 18c2.7-1.3 5.2-2 8.2-2H18c1.4 0 2.5 1.1 2.5 2.5V20H8.4C6.5 20 5 18.5 5 16.6V13l3.2.8L6 18z" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
        <path d="M8.2 13.8l2.3-7.4c.4-1.2 1.8-1.7 2.8-.9l2.6 2.1-1.7 2.2-1.6-1.2-1.8 5.7" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.5 16v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "contribution") {
    return (
      <svg viewBox="0 0 24 24" className={baseClassName} aria-hidden="true">
        <circle cx="8" cy="13" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.9" />
        <path d="M8 10.8l1.5 1.1-.6 1.9H7.1l-.6-1.9L8 10.8z" fill="currentColor" />
        <path d="M13.5 7h5.5M16.7 4.2L20 7l-3.3 2.8M11.8 16.8h4.8c1.8 0 3.2-1.4 3.2-3.2v-.4" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "goalRate") {
    return (
      <svg viewBox="0 0 24 24" className={baseClassName} aria-hidden="true">
        <circle cx="9" cy="13" r="5" fill="none" stroke="currentColor" strokeWidth="1.9" />
        <path d="M9 10.5l2 1.5-.8 2.4H7.8L7 12l2-1.5z" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M16 5v14M19.5 8.5h-7M19.5 15.5h-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "assistRate") {
    return (
      <svg viewBox="0 0 24 24" className={baseClassName} aria-hidden="true">
        <path d="M5 17.5c2.3-1 4.6-1.5 7-1.5h2.3c1.2 0 2.2 1 2.2 2.2V20H7.5C6.1 20 5 18.9 5 17.5z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M8 15l2-7 3 2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18.5 5v14M21 9h-5M21 15h-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "contributionRate") {
    return (
      <svg viewBox="0 0 24 24" className={baseClassName} aria-hidden="true">
        <circle cx="7.5" cy="13.5" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M12.5 7H18M15.4 4.4L18.5 7l-3.1 2.6M14 18h6M17 15v6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "goalFor") {
    return (
      <svg viewBox="0 0 24 24" className={baseClassName} aria-hidden="true">
        <path d="M5 5h12v14H5z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M17 9h3v6h-3M8 12h6M11.5 8.5L15 12l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "goalAgainst") {
    return (
      <svg viewBox="0 0 24 24" className={baseClassName} aria-hidden="true">
        <path d="M7 5h12v14H7z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M7 9H4v6h3M16 9l-6 6M10 9l6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "goalDifference") {
    return (
      <svg viewBox="0 0 24 24" className={baseClassName} aria-hidden="true">
        <path d="M5 8h14M5 16h14M12 5v6M12 13v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "rating") {
    return (
      <svg viewBox="0 0 24 24" className={baseClassName} aria-hidden="true">
        <path d="M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1-4.4-4.3 6.1-.9L12 3z" fill="currentColor" />
      </svg>
    );
  }

  if (type === "win") {
    return (
      <svg viewBox="0 0 24 24" className={baseClassName} aria-hidden="true">
        <path d="M7 4h10v4a5 5 0 0 1-10 0V4z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M7 6H4v2a4 4 0 0 0 4 4M17 6h3v2a4 4 0 0 1-4 4M12 13v5M8.5 20h7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "loss") {
    return (
      <svg viewBox="0 0 24 24" className={baseClassName} aria-hidden="true">
        <path d="M7 7l10 10M17 7L7 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "draw") {
    return (
      <svg viewBox="0 0 24 24" className={baseClassName} aria-hidden="true">
        <path d="M6 9h12M6 15h12" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "cleanSheet" || type === "tackle") {
    return (
      <svg viewBox="0 0 24 24" className={baseClassName} aria-hidden="true">
        <path d="M12 3l7 3v5c0 4.5-2.7 8-7 10-4.3-2-7-5.5-7-10V6l7-3z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        {type === "cleanSheet" ? (
          <path d="M8.5 12l2.2 2.2 4.8-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M8 15l8-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        )}
      </svg>
    );
  }

  if (type === "pass") {
    return (
      <svg viewBox="0 0 24 24" className={baseClassName} aria-hidden="true">
        <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <path d="M12 5v3M12 16v3M5 12h3M16 12h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "games") {
    return (
      <svg viewBox="0 0 24 24" className={baseClassName} aria-hidden="true">
        <rect x="4" y="5" width="16" height="15" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "club" || type === "player") {
    return (
      <svg viewBox="0 0 24 24" className={baseClassName} aria-hidden="true">
        <circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M5 21a7 7 0 0 1 14 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "division") {
    return (
      <svg viewBox="0 0 24 24" className={baseClassName} aria-hidden="true">
        <path d="M5 19h14M7 15h10M9 11h6M11 7h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "motm") {
    return (
      <svg viewBox="0 0 24 24" className={baseClassName} aria-hidden="true">
        <path d="M12 3l2.1 4.2 4.6.7-3.3 3.2.8 4.6L12 13.5l-4.2 2.2.8-4.6-3.3-3.2 4.6-.7L12 3z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M8 21h8M12 16v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "live") {
    return (
      <svg viewBox="0 0 24 24" className={baseClassName} aria-hidden="true">
        <path d="M13 2L5 14h6l-1 8 9-13h-6l1-7z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={baseClassName} aria-hidden="true">
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 8v4l3 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StatLabel({
  label,
  className = "",
  iconClassName = "",
}: {
  label: string;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <StatIcon label={label} className={iconClassName} />
      <span>{label}</span>
    </span>
  );
}
