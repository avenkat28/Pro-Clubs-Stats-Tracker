import type {
  CompareClub,
  CompareMode,
  ComparePlayer,
} from "../lib/compareMockData";

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
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
            Active Matchup
          </p>
          <h2 className="mt-2 text-3xl font-black text-white">
            {left.name} <span className="text-gray-500">vs</span> {right.name}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3 text-right">
          <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
            <p className="text-xs text-gray-500">{left.name}</p>
            <p className="font-black text-green-400">{leftMetric}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
            <p className="text-xs text-gray-500">{right.name}</p>
            <p className="font-black text-blue-300">{rightMetric}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
