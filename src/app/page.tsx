import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import SearchPanel from "../components/SearchPanel";
import StatCard from "../components/StatCard";
import FeatureCard from "../components/FeatureCard";
import { featuredStats, features } from "../lib/mockData";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050706]/95">
      <Navbar />

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.8fr)] lg:items-end lg:py-14">
        <HeroSection />
        <SearchPanel />
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-3 px-4 py-6 sm:px-6 md:grid-cols-4">
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
