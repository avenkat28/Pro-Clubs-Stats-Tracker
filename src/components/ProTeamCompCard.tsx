import type { ProTeamCompResult, ProTeamScores } from "../lib/proTeamComp";

type ProTeamCompCardProps = {
  comp: ProTeamCompResult;
};

type ScoreItem = {
  key: keyof ProTeamScores;
  label: string;
  tier?: string;
};

const SCORE_ITEMS: ScoreItem[] = [
  { key: "attack", label: "Attack", tier: "attackTier" },
  { key: "defense", label: "Defense", tier: "defenseTier" },
  { key: "chaos", label: "Chaos", tier: "chaosTier" },
  { key: "efficiency", label: "Efficiency", tier: "efficiencyTier" },
  { key: "form", label: "Form", tier: "formTier" },
  { key: "starReliance", label: "Star Reliance", tier: "starRelianceTier" },
  { key: "teamBalance", label: "Team Balance", tier: "teamBalanceTier" },
  { key: "pressing", label: "Pressing", tier: "pressingTier" },
  { key: "discipline", label: "Discipline", tier: "disciplineTier" },
];

const CLUB_IMAGE_PATHS: Record<ProTeamCompResult["primaryComp"], string> = {
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

function getTier(comp: ProTeamCompResult, tierKey: string | undefined) {
  if (!tierKey) {
    return undefined;
  }

  return comp.tiers[tierKey as keyof ProTeamCompResult["tiers"]];
}

export default function ProTeamCompCard({ comp }: ProTeamCompCardProps) {
  const visibleScores = SCORE_ITEMS.map((item) => ({
    ...item,
    value: comp.scores[item.key],
    tier: getTier(comp, item.tier),
  })).filter((item) => item.value !== undefined);

  return (
    <section className="club-profile-panel min-w-0 rounded-[1.35rem] border border-emerald-400/10 bg-[#07100c]/80 p-4 text-white shadow-[0_22px_45px_rgba(0,0,0,0.2)] ring-1 ring-white/[0.03] sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center">
          <div className="club-comp-crest flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] p-3 sm:h-32 sm:w-32">
            <img
              src={CLUB_IMAGE_PATHS[comp.primaryComp]}
              alt={`${comp.primaryComp} crest`}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <div className="min-w-0">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-emerald-200/50">
              Pro Team Comp
            </p>
            <div className="mt-3 flex flex-wrap items-end gap-x-4 gap-y-2">
              <h2 className="text-[clamp(2rem,8vw,3.25rem)] font-black tracking-[-0.06em] text-white">
                {comp.primaryComp}
              </h2>
              <p className="pb-1 text-sm font-black uppercase tracking-[0.16em] text-emerald-200/70">
                {comp.styleLabel}
              </p>
            </div>
            <p className="mt-3 max-w-4xl text-sm leading-6 text-white/62">
              {comp.explanation}
            </p>
          </div>
        </div>

        <div className="club-profile-tile flex min-w-[220px] items-center gap-3 rounded-2xl border border-white/[0.07] bg-black/25 p-4">
          <div className="club-comp-crest flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] p-2">
            <img
              src={CLUB_IMAGE_PATHS[comp.secondaryComp]}
              alt={`${comp.secondaryComp} crest`}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">
              Secondary Comp
            </p>
            <p className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
              {comp.secondaryComp}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {visibleScores.map((score) => (
          <div
            key={score.key}
            className="club-profile-tile rounded-2xl border border-white/[0.06] bg-black/24 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white/68">{score.label}</p>
                {score.tier ? (
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-emerald-200/52">
                    {score.tier}
                  </p>
                ) : null}
              </div>
              <p className="text-2xl font-black tracking-[-0.05em] text-white">
                {score.value}
              </p>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-emerald-300"
                style={{ width: `${score.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-white/[0.07] pt-4">
        <p className="text-sm font-semibold text-white/55">Why this comp</p>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {comp.reasons.map((reason) => (
            <p key={reason} className="club-profile-tile rounded-xl bg-white/[0.035] px-3 py-2 text-sm text-white/62">
              {reason}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
