import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import SearchPanel from "../components/SearchPanel";
import StatCard from "../components/StatCard";
import FeatureCard from "../components/FeatureCard";
import { featuredStats, features } from "../lib/mockData";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/35">
      <Navbar />
      <HeroSection />
      <SearchPanel />

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 py-16 md:grid-cols-4">
        {featuredStats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 pb-20 md:grid-cols-3">
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
