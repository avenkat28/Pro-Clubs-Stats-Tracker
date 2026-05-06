import type {
  CompareClub,
  CompareMode,
  ComparePlayer,
} from "../lib/compareMockData";
import {
  skillRatingCardClassName,
  skillRatingTextClassName,
} from "../lib/colorCoding";

type CompareCardProps = {
  mode: CompareMode;
  item: ComparePlayer | CompareClub;
  side: "left" | "right";
};

export default function CompareCard({ mode, item, side }: CompareCardProps) {
  const isPlayer = mode === "players";
  const eyebrow = side === "left" ? "Left Side" : "Right Side";

  if (isPlayer) {
    const player = item as ComparePlayer;

    return (
      <article className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-blue-950/10 backdrop-blur transition hover:border-blue-400/60 hover:shadow-blue-600/20">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
              {eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-black text-white transition group-hover:text-blue-200">
              {player.name}
            </h2>
            <p className="mt-2 text-sm text-gray-400">{player.club}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-center">
            <p className="text-xs text-gray-500">Rating</p>
            <p className="text-2xl font-black text-blue-300">
              {player.rating.toFixed(1)}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <MetaPill label="Position" value={player.position} />
          <MetaPill label="Platform" value={player.platform} />
          <MetaPill label="Games" value={player.games} />
          <MetaPill label="Win Rate" value={`${player.winRate}%`} />
        </div>
      </article>
    );
  }

  const club = item as CompareClub;
  const skillRatingCardTone = skillRatingCardClassName(club.skillRating);
  const skillRatingTextTone = skillRatingTextClassName(club.skillRating);

  return (
    <article className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-blue-950/10 backdrop-blur transition hover:border-blue-400/60 hover:shadow-blue-600/20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-black text-white transition group-hover:text-blue-200">
            {club.name}
          </h2>
          <p className="mt-2 text-sm text-gray-400">{club.division}</p>
        </div>
        <div className={`rounded-2xl border px-4 py-3 text-center ${skillRatingCardTone}`}>
          <p className="text-xs text-gray-500">Skill</p>
          <p className={`text-2xl font-black ${skillRatingTextTone}`}>
            {club.skillRating}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <MetaPill label="Division" value={club.division} />
        <MetaPill label="Platform" value={club.platform} />
        <MetaPill label="Games" value={club.games} />
        <MetaPill label="Win Rate" value={`${Math.round((club.wins / club.games) * 100)}%`} />
      </div>
    </article>
  );
}

function MetaPill({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 text-sm font-black text-white">{value}</p>
    </div>
  );
}
