import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import SearchPanel from "../components/SearchPanel";
import StatCard from "../components/StatCard";
import FeatureCard from "../components/FeatureCard";
import { features } from "../lib/mockData";
import { getEaLeaderboards } from "../lib/ea";

function formatStat(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

async function getFeaturedStats() {
  try {
    const leaderboards = await getEaLeaderboards("common-gen5", 50, 20);
    const matchesLogged = leaderboards.clubs.reduce(
      (total, club) => total + club.games,
      0,
    );
    const goalsLogged = leaderboards.clubs.reduce(
      (total, club) => total + club.goalsFor,
      0,
    );

    return [
      { label: "Ranked Clubs", value: formatStat(leaderboards.clubs.length) },
      { label: "Players Indexed", value: formatStat(leaderboards.players.length) },
      { label: "Matches Logged", value: formatStat(matchesLogged) },
      { label: "Goals Logged", value: formatStat(goalsLogged) },
    ];
  } catch {
    return [
      { label: "Ranked Clubs", value: "Live EA" },
      { label: "Players Indexed", value: "Live EA" },
      { label: "Matches Logged", value: "Live EA" },
      { label: "Goals Logged", value: "Live EA" },
    ];
  }
}

export default async function Home() {
  const featuredStats = await getFeaturedStats();

  return (
    <main className="home-page-background min-h-screen">
      <Navbar />

      <section className="home-hero-layout mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.8fr)] lg:items-end lg:py-14">
        <HeroSection />
        <SearchPanel />
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-3 px-4 py-4 sm:px-6 md:grid-cols-4">
        {featuredStats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-3 px-4 pb-16 pt-4 sm:px-6 md:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </section>
    </main>
  );
}
