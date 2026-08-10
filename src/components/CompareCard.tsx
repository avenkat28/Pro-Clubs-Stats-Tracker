import type {
  CompareClub,
  CompareMode,
  ComparePlayer,
} from "../lib/compareTypes";
import {
  skillRatingCardClassName,
  skillRatingTextClassName,
} from "../lib/colorCoding";
import { formatDivisionLabel } from "../lib/ea";

type CompareCardProps = {
  mode: CompareMode;
  item: ComparePlayer | CompareClub;
  side: "left" | "right";
};

export default function CompareCard({ mode, item, side }: CompareCardProps) {
  const isPlayer = mode === "players";
  const eyebrow = side === "left" ? "Side A" : "Side B";
  const sideTone =
    side === "left"
      ? "border-emerald-300/20 bg-emerald-300/[0.035]"
      : "border-sky-300/20 bg-sky-300/[0.035]";
  const accentText = side === "left" ? "text-emerald-300" : "text-sky-300";

  if (isPlayer) {
    const player = item as ComparePlayer;

    return (
      <article className={`rounded-lg border p-5 ${sideTone}`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-[0.12em] ${accentText}`}>
              {eyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              {player.name}
            </h2>
            <p className="mt-1 text-sm text-white/55">{player.club}</p>
          </div>
          <div className="rounded-md border border-white/10 bg-black/35 px-4 py-3 text-center">
            <p className="text-xs text-white/45">Rating</p>
            <p className={`text-2xl font-semibold ${accentText}`}>
              {player.rating.toFixed(1)}
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <MetaPill label="Position" value={player.position} />
          <MetaPill label="Platform" value={player.platform} />
          <MetaPill label="Games" value={player.games} />
          <MetaPill label="Win Rate" value={`${player.winRate}%`} />
        </div>
      </article>
    );
  }

  const club = item as CompareClub;
  const displayedDivision = formatDivisionLabel(club.division);
  const skillRatingCardTone = skillRatingCardClassName(club.skillRating);
  const skillRatingTextTone = skillRatingTextClassName(club.skillRating);
  const winRate =
    club.games > 0 ? Math.round((club.wins / club.games) * 100) : 0;
  const record = `${club.wins}-${club.draws}-${club.losses}`;

  return (
    <article className={`rounded-lg border p-5 ${sideTone}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`text-xs font-semibold uppercase tracking-[0.12em] ${accentText}`}>
            {eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            {club.name}
          </h2>
          <p className="mt-1 text-sm text-white/55">{displayedDivision}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <div className="rounded-md border border-white/10 bg-black/35 px-4 py-3 text-center">
            <p className="text-xs text-white/45">Record</p>
            <p className={`text-2xl font-semibold ${accentText}`}>{record}</p>
          </div>
          <div className={`rounded-md border px-4 py-3 text-center ${skillRatingCardTone}`}>
            <p className="text-xs text-white/45">Skill</p>
            <p className={`text-2xl font-semibold ${skillRatingTextTone}`}>
              {club.skillRating}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <MetaPill label="Division" value={displayedDivision} />
        <MetaPill label="Platform" value={club.platform} />
        <MetaPill label="Games" value={club.games} />
        <MetaPill label="Win Rate" value={`${winRate}%`} />
      </div>
    </article>
  );
}

function MetaPill({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/25 px-3 py-2.5">
      <p className="text-xs text-white/45">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
