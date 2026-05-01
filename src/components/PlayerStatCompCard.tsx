"use client";

import type {
  PlayerCompScores,
  PlayerCompSummary,
  PlayerStatCompResult,
} from "../lib/playerStatComp";
import { PLAYER_COMP_IMAGES } from "../lib/playerStatComp";

type PlayerStatCompCardProps = {
  comp: PlayerStatCompResult;
};

type ScoreItem = {
  key: keyof PlayerCompScores;
  label: string;
};

const SCORE_ITEMS: ScoreItem[] = [
  { key: "scoring", label: "Scoring" },
  { key: "creation", label: "Creation" },
  { key: "output", label: "Output" },
  { key: "influence", label: "Influence" },
  { key: "form", label: "Form" },
  { key: "defense", label: "Defense" },
  { key: "discipline", label: "Discipline" },
  { key: "balance", label: "Balance" },
  { key: "teamSuccess", label: "Team Success" },
  { key: "aggression", label: "Aggression" },
  { key: "passing", label: "Passing" },
];

function CompImage({
  comp,
  className,
}: {
  comp: PlayerCompSummary;
  className: string;
}) {
  return (
    <img
      src={comp.imagePath ?? PLAYER_COMP_IMAGES.fallback}
      alt={`${comp.name} stat profile comp`}
      className={className}
      onError={(event) => {
        event.currentTarget.src = PLAYER_COMP_IMAGES.fallback;
      }}
    />
  );
}

function SecondaryComp({ comp }: { comp: PlayerCompSummary }) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/[0.07] bg-black/25 p-3">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/[0.04]">
        <CompImage comp={comp} className="h-full w-full object-contain p-1" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-lg font-black tracking-[-0.04em] text-white">
          {comp.name}
        </p>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-emerald-200/55">
          {comp.similarityScore}% match
        </p>
        <p className="mt-1 truncate text-xs text-white/45">{comp.styleLabel}</p>
      </div>
    </div>
  );
}

export default function PlayerStatCompCard({ comp }: PlayerStatCompCardProps) {
  const visibleScores = SCORE_ITEMS.map((item) => ({
    ...item,
    value: comp.scores[item.key],
  })).filter((item) => item.value !== undefined);

  return (
    <section className="min-w-0 rounded-[1.35rem] border border-emerald-400/10 bg-[#07100c]/80 p-4 text-white shadow-[0_22px_45px_rgba(0,0,0,0.2)] ring-1 ring-white/[0.03] sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row">
          <div className="h-44 w-36 shrink-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] sm:h-52 sm:w-40">
            <CompImage
              comp={comp.primaryComp}
              className="h-full w-full object-contain p-2"
            />
          </div>

          <div className="min-w-0">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-emerald-200/50">
              Player Stat Comp
            </p>
            <div className="mt-3 flex flex-wrap items-end gap-x-4 gap-y-2">
              <h2 className="text-[clamp(2rem,8vw,3.15rem)] font-black tracking-[-0.06em] text-white">
                {comp.primaryComp.name}
              </h2>
              <p className="pb-1 text-sm font-black uppercase tracking-[0.16em] text-emerald-200/70">
                {comp.primaryComp.similarityScore}% match
              </p>
            </div>
            <p className="mt-1 text-sm font-black uppercase tracking-[0.14em] text-white/45">
              {comp.archetype} / {comp.styleLabel}
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/62">
              {comp.explanation}
            </p>
          </div>
        </div>

        <div className="grid gap-3">
          <SecondaryComp comp={comp.secondaryComp} />
          {comp.thirdComp ? <SecondaryComp comp={comp.thirdComp} /> : null}
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-2xl border border-white/[0.06] bg-black/24 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">
            Output
          </p>
          <p className="mt-2 text-xl font-black text-white">{comp.tiers.outputTier}</p>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-black/24 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">
            Rating
          </p>
          <p className="mt-2 text-xl font-black text-white">{comp.tiers.ratingTier}</p>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-black/24 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">
            MOTM
          </p>
          <p className="mt-2 text-xl font-black text-white">{comp.tiers.motmTier}</p>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-black/24 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">
            Win Rate
          </p>
          <p className="mt-2 text-xl font-black text-white">{comp.tiers.winRateTier}</p>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-black/24 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">
            Primary Style
          </p>
          <p className="mt-2 text-base font-black text-white">
            {comp.primaryComp.styleLabel}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {visibleScores.map((score) => (
          <div
            key={score.key}
            className="rounded-2xl border border-white/[0.06] bg-black/24 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-white/68">{score.label}</p>
              <p className="text-xl font-black tracking-[-0.04em] text-white">
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
            <p
              key={reason}
              className="rounded-xl bg-white/[0.035] px-3 py-2 text-sm text-white/62"
            >
              {reason}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
