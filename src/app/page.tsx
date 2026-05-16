import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import SearchPanel from "../components/SearchPanel";
import StatCard from "../components/StatCard";
import FeatureCard from "../components/FeatureCard";
import { features } from "../lib/mockData";
import { prisma } from "../lib/db";

function formatStat(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

async function getFeaturedStats() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  try {
    const [clubsLogged, playersLogged, matchAggregate] = await Promise.all([
      prisma.club.count(),
      prisma.player.count(),
      prisma.match.aggregate({
        _count: { id: true },
        _sum: { goalsFor: true },
      }),
    ]);

    if (
      clubsLogged <= 0 &&
      playersLogged <= 0 &&
      (matchAggregate._count.id ?? 0) <= 0 &&
      (matchAggregate._sum.goalsFor ?? 0) <= 0
    ) {
      return null;
    }

    return [
      { label: "Clubs Logged", value: formatStat(clubsLogged) },
      { label: "Players Logged", value: formatStat(playersLogged) },
      { label: "Matches Logged", value: formatStat(matchAggregate._count.id ?? 0) },
      { label: "Goals Logged", value: formatStat(matchAggregate._sum.goalsFor ?? 0) },
    ];
  } catch {
    return null;
  }
}

export default async function Home() {
  const featuredStats = await getFeaturedStats();

  return (
    <main className="home-page-background min-h-screen">
      <Navbar />

      <section className="home-hero-layout mx-auto max-w-[min(1600px,calc(100vw-48px))] px-4 pb-6 pt-8 sm:px-6 lg:px-8 lg:pt-10 xl:px-10">
        <div className="home-hero-shell rounded-[2.2rem] border border-white/7 bg-black/20 px-6 py-7 sm:px-8 lg:px-10 lg:py-9 xl:px-12">
          <div className="grid gap-x-12 gap-y-8 xl:grid-cols-[minmax(0,1.35fr)_minmax(380px,0.78fr)] xl:items-start">
            <div className="space-y-7">
              <HeroSection />

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href="/search"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-200"
                >
                  Search a club
                </a>
                <a
                  href="/leaderboards"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white transition hover:border-emerald-300/24 hover:bg-white/[0.06]"
                >
                  View leaderboards
                </a>
                <a
                  href="/compare"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white transition hover:border-emerald-300/24 hover:bg-white/[0.06]"
                >
                  Compare clubs
                </a>
              </div>
            </div>

            <div className="xl:pt-8">
              <SearchPanel />
            </div>
          </div>

          {featuredStats ? (
            <section className="mt-8 flex flex-wrap gap-3 xl:gap-4">
              {featuredStats.map((stat) => (
                <StatCard key={stat.label} label={stat.label} value={stat.value} />
              ))}
            </section>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-[min(1680px,calc(100vw-32px))] px-4 pb-18 sm:px-6 lg:px-8 xl:px-10">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-emerald-300/76">
              Homepage tools
            </p>
            <h2 className="mt-2 max-w-[42rem] text-[2.3rem] font-semibold tracking-[-0.04em] text-white sm:text-[2.6rem]">
              Built for day-to-day Pro Clubs tracking
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 xl:grid-cols-[1.18fr_1.05fr_1.08fr_1.12fr_1.24fr]">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              eyebrow={feature.eyebrow}
              statLabel={feature.statLabel}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
