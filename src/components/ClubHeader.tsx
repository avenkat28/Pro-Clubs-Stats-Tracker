import {
  skillRatingCardClassName,
  skillRatingLabelClassName,
  skillRatingTextClassName,
} from "../lib/colorCoding";
import type { ProTeamCompName } from "../lib/proTeamComp";
import { formatDivisionLabel } from "../lib/ea";

const CLUB_COMP_IMAGE_PATHS: Record<ProTeamCompName, string> = {
  "Manchester City": "/club-comps/manchester-city.png",
  Barcelona: "/club-comps/barcelona.png",
  "Real Madrid": "/club-comps/real-madrid.png",
  "Bayern Munich": "/club-comps/bayern-munich.png",
  PSG: "/club-comps/psg.png",
  Liverpool: "/club-comps/liverpool.png",
  Arsenal: "/club-comps/arsenal.png",
  Tottenham: "/club-comps/tottenham.png",
  "Borussia Dortmund": "/club-comps/borussia-dortmund.png",
  "Bayer Leverkusen": "/club-comps/bayer-leverkusen.png",
  Napoli: "/club-comps/napoli.png",
  "Inter Milan": "/club-comps/inter-milan.png",
  "Atlético Madrid": "/club-comps/atletico-madrid.png",
  Juventus: "/club-comps/juventus.png",
  Chelsea: "/club-comps/chelsea.png",
};

type ClubHeaderProps = {
  name: string;
  platform: string;
  division: string;
  skillRating: number;
  clubId: string;
  badgeUrl?: string | null;
  proTeamComp?: ProTeamCompName;
};

export default function ClubHeader({
  name,
  platform,
  division,
  skillRating,
  clubId,
  badgeUrl,
  proTeamComp,
}: ClubHeaderProps) {
  const skillRatingCardTone = skillRatingCardClassName(skillRating);
  const skillRatingLabelTone = skillRatingLabelClassName(skillRating);
  const skillRatingValueTone = skillRatingTextClassName(skillRating);
  const displayedDivision = formatDivisionLabel(division);

  return (
    <section className="club-hero-shell min-w-0 overflow-hidden rounded-lg border border-emerald-300/15 bg-[linear-gradient(135deg,rgba(9,18,13,0.98),rgba(4,7,6,0.96))] p-4 text-white shadow-[0_18px_55px_rgba(0,0,0,0.3)] ring-1 ring-white/[0.04] sm:p-6">
      <div className="flex flex-wrap items-center gap-3 text-[11px] font-black uppercase text-emerald-100/75">
        <span className="club-platform-badge rounded-md border border-emerald-300/25 bg-emerald-300/10 px-3 py-1.5">
          {platform}
        </span>
        <span className="text-white/25">/</span>
        <span className="text-white/45">Club ID {clubId}</span>
      </div>

      <div className="mt-6 flex min-w-0 flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center">
          <div className="club-badge-shell flex h-24 w-24 shrink-0 items-center justify-center rounded-lg border border-white/[0.1] bg-black/35 p-2 ring-1 ring-emerald-300/10 sm:h-28 sm:w-28">
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
            <h1 className="max-w-4xl break-words text-[clamp(2.4rem,10vw,4.1rem)] font-black leading-[0.95] text-white">
              {name}
            </h1>
            {displayedDivision !== "Division Unavailable" ? (
              <p className="mt-3 text-lg font-semibold text-emerald-100/55 sm:text-2xl">
                {displayedDivision}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-stretch">
          {proTeamComp ? (
            <div className="club-comp-pill flex min-w-48 items-center gap-3 rounded-lg border border-white/10 bg-black/30 px-4 py-4">
              <div className="club-comp-crest flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] p-2">
                <img
                  src={CLUB_COMP_IMAGE_PATHS[proTeamComp]}
                  alt={`${proTeamComp} crest`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black uppercase text-white/40">
                  Club Comp
                </p>
                <p className="mt-1 truncate text-xl font-black text-white">
                  {proTeamComp}
                </p>
              </div>
            </div>
          ) : null}

          <div className={`w-full rounded-lg border px-6 py-5 text-center sm:w-auto sm:min-w-48 ${skillRatingCardTone}`}>
            <p className={`text-xs font-black uppercase ${skillRatingLabelTone}`}>
              Skill Rating
            </p>
            <p className={`mt-2 text-5xl font-black ${skillRatingValueTone}`}>
              {skillRating}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
