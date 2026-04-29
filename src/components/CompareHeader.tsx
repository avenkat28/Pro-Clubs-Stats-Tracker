export default function CompareHeader() {
  return (
    <header className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-8 shadow-2xl shadow-blue-950/20 backdrop-blur md:px-8 md:py-10">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
        EA FC 26 Pro Clubs Analytics
      </p>
      <h1 className="mt-3 text-4xl font-black text-white md:text-6xl">
        Compare Performance
      </h1>
      <p className="mt-4 max-w-2xl text-base text-gray-400 md:text-lg">
        Compare clubs and players side-by-side with advanced stats.
      </p>
    </header>
  );
}
