type StatIconProps = {
  label: string;
  className?: string;
};

function iconType(label: string) {
  const normalized = label.toLowerCase();

  if (normalized.includes("red card")) return "redCard";
  if (normalized.includes("assist") || normalized === "a") return "assist";
  if (
    normalized.includes("goal") ||
    normalized.includes("g/a") ||
    normalized === "g" ||
    normalized === "gf"
  ) {
    return "goal";
  }
  if (normalized.includes("rating") || normalized.includes("skill")) return "rating";
  if (normalized.includes("win") || normalized === "w") return "win";
  if (normalized.includes("loss") || normalized === "l") return "loss";
  if (normalized.includes("draw") || normalized === "d") return "draw";
  if (normalized.includes("clean")) return "cleanSheet";
  if (normalized.includes("tackle")) return "tackle";
  if (normalized.includes("pass")) return "pass";
  if (normalized.includes("game") || normalized.includes("match")) return "games";
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

  if (type === "redCard" || type === "loss") return "text-red-400";
  if (type === "goal" || type === "win" || type === "cleanSheet") return "text-green-400";
  if (type === "assist" || type === "pass") return "text-sky-400";
  if (type === "rating" || type === "live") return "text-yellow-300";
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
        <path d="M4 12h12" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
        <path d="M12 7l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="19" cy="12" r="2" fill="currentColor" />
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
