export default function CompareHeader() {
  return (
    <header className="border-b border-white/10 pb-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300/75">
            Compare
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white md:text-5xl">
            Performance matchup
          </h1>
        </div>
        <p className="max-w-xl text-sm leading-6 text-white/55 md:text-right">
          Review two clubs or players across the same stat set.
        </p>
      </div>
    </header>
  );
}
