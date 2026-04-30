export default function HeroSection() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center px-6 py-20 text-center text-white">
      <p className="mb-4 rounded-full border border-emerald-300/35 bg-black/25 px-4 py-2 text-sm text-emerald-100 backdrop-blur">
        EA FC 26 Pro Clubs Advanced Analytics
      </p>

      <h1 className="mb-6 text-5xl font-black tracking-[-0.06em] drop-shadow-[0_8px_30px_rgba(0,0,0,0.75)] md:text-7xl">
        Track your club like a pro.
      </h1>

      <p className="max-w-2xl text-lg font-medium text-white/68 drop-shadow-[0_4px_18px_rgba(0,0,0,0.75)]">
        View advanced Pro Clubs stats, player rankings, form trends, leaderboards,
        and performance insights beyond the official EA stats.
      </p>
    </section>
  );
}
