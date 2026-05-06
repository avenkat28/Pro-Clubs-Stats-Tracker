import {
  skillRatingCardClassName,
  skillRatingLabelClassName,
  skillRatingTextClassName,
} from "../lib/colorCoding";

type ClubHeaderProps = {
  name: string;
  platform: string;
  division: string;
  skillRating: number;
  clubId: string;
  badgeUrl?: string | null;
};

export default function ClubHeader({
  name,
  platform,
  division,
  skillRating,
  clubId,
  badgeUrl,
}: ClubHeaderProps) {
  const skillRatingCardTone = skillRatingCardClassName(skillRating);
  const skillRatingLabelTone = skillRatingLabelClassName(skillRating);
  const skillRatingValueTone = skillRatingTextClassName(skillRating);

  return (
    <section className="min-w-0 overflow-hidden rounded-[1.5rem] border border-emerald-300/12 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_34%),linear-gradient(135deg,rgba(9,18,13,0.96),rgba(3,5,4,0.94))] p-4 text-white shadow-[0_24px_70px_rgba(0,0,0,0.32)] ring-1 ring-white/[0.03] sm:p-6">
      <div className="flex flex-wrap items-center gap-3 text-[11px] font-black uppercase tracking-[0.22em] text-emerald-100/75">
        <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1.5">
          {platform}
        </span>
        <span className="text-white/25">/</span>
        <span className="text-white/45">Club ID {clubId}</span>
      </div>

      <div className="mt-6 flex min-w-0 flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[1.25rem] border border-white/[0.08] bg-black/30 p-2 ring-1 ring-emerald-300/10 sm:h-28 sm:w-28">
            {badgeUrl ? (
              <img
                src={badgeUrl}
                alt={`${name} badge`}
                className="h-full w-full object-contain"
              />
            ) : (
              <span className="text-4xl font-black uppercase text-white/75">
                {name.slice(0, 2)}
              </span>
            )}
          </div>

          <div className="min-w-0">
            <h1 className="max-w-4xl text-[clamp(2.75rem,12vw,4.5rem)] font-black leading-[0.9] tracking-[-0.06em] text-white break-words">
              {name}
            </h1>
            {division !== "Division Unavailable" ? (
              <p className="mt-3 text-lg font-semibold text-emerald-100/55 sm:text-2xl">
                {division}
              </p>
            ) : null}
          </div>
        </div>

        <div className={`w-full rounded-[1.25rem] border px-6 py-5 text-center sm:w-auto sm:min-w-48 ${skillRatingCardTone}`}>
          <p className={`text-xs font-black uppercase tracking-[0.2em] ${skillRatingLabelTone}`}>
            Skill Rating
          </p>
          <p className={`mt-2 text-5xl font-black tracking-[-0.06em] ${skillRatingValueTone}`}>
            {skillRating}
          </p>
        </div>
      </div>
    </section>
  );
}
