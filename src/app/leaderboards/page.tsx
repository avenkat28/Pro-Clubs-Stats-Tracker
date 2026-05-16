import LeaderboardHeader from "../../components/LeaderboardHeader";
import LeaderboardsClient from "../../components/LeaderboardsClient";
import Navbar from "../../components/Navbar";
import {
  type EaLeaderboardClub,
  type EaLeaderboardPlayer,
  eaPlatformLabels,
  eaPlatforms,
  getEaLeaderboards,
  normalizeEaPlatform,
} from "../../lib/ea";
import {
  cacheEaLeaderboards,
  getCachedEaLeaderboards,
} from "../../lib/database/leaderboardCache";

type LeaderboardsPageProps = {
  searchParams: Promise<{
    platform?: string;
  }>;
};

export default async function LeaderboardsPage({
  searchParams,
}: LeaderboardsPageProps) {
  const params = await searchParams;
  const platform = normalizeEaPlatform(params.platform);
  let players: EaLeaderboardPlayer[] = [];
  let clubs: EaLeaderboardClub[] = [];
  const cachedLeaderboards = await getCachedEaLeaderboards(platform).catch(
    (cacheError) => {
      console.warn("Unable to load cached EA leaderboards", cacheError);
      return null;
    },
  );

  if (cachedLeaderboards) {
    players = cachedLeaderboards.players;
    clubs = cachedLeaderboards.clubs;
  } else {
    try {
      const leaderboards = await getEaLeaderboards(platform);

      players = leaderboards.players;
      clubs = leaderboards.clubs;
      await cacheEaLeaderboards({
        platform,
        clubLimit: 25,
        playerClubScanLimit: 12,
        leaderboards,
      }).catch((cacheError) => {
        console.warn("Unable to cache EA leaderboards", cacheError);
      });
    } catch (error) {
      console.warn("Unable to load EA leaderboards", error);
    }
  }

  return (
    <main className="min-h-screen bg-[#050706] text-white">
      <Navbar />

      <section className="app-page-shell">
        <LeaderboardHeader
          totalPlayers={players.length}
          totalClubs={clubs.length}
        />

        <div className="app-surface app-toolbar">
          {eaPlatforms.map((platformOption) => {
            const isActive = platformOption === platform;

            return (
              <a
                key={platformOption}
                href={`/leaderboards?platform=${platformOption}`}
                className={`app-pill-link ${isActive ? "app-pill-link-active" : ""}`}
              >
                {eaPlatformLabels[platformOption]}
              </a>
            );
          })}
        </div>

        <LeaderboardsClient players={players} clubs={clubs} />
      </section>
    </main>
  );
}
