import type {
  CompareClub,
  CompareMode,
  ComparePlayer,
} from "../lib/compareTypes";

type CompareSummaryProps = {
  mode: CompareMode;
  left: ComparePlayer | CompareClub;
  right: ComparePlayer | CompareClub;
};

export default function CompareSummary({
  mode,
  left,
  right,
}: CompareSummaryProps) {
  const leftMetric =
    mode === "players"
      ? `${(left as ComparePlayer).goals + (left as ComparePlayer).assists} G/A`
      : `${(left as CompareClub).skillRating} SR`;
  const rightMetric =
    mode === "players"
      ? `${(right as ComparePlayer).goals + (right as ComparePlayer).assists} G/A`
      : `${(right as CompareClub).skillRating} SR`;

  return (
    <section className="rounded-lg border border-white/10 bg-[#080b0a] p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-300/75">
            Active Matchup
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            {left.name} <span className="text-white/35">vs</span> {right.name}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3 text-right">
          <div className="rounded-md border border-emerald-300/15 bg-emerald-300/[0.04] px-4 py-3">
            <p className="text-xs text-white/45">{left.name}</p>
            <p className="font-semibold text-emerald-300">{leftMetric}</p>
          </div>
          <div className="rounded-md border border-sky-300/15 bg-sky-300/[0.04] px-4 py-3">
            <p className="text-xs text-white/45">{right.name}</p>
            <p className="font-semibold text-sky-300">{rightMetric}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
