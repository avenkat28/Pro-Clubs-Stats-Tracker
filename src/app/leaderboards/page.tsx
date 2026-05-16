import LeaderboardHeader from "../../components/LeaderboardHeader";
import LeaderboardsClient from "../../components/LeaderboardsClient";
import Navbar from "../../components/Navbar";
import {
  EaRequestError,
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
  let leaderboardError = "";

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
    const cachedLeaderboards = await getCachedEaLeaderboards(platform).catch(
      (cacheError) => {
        console.warn("Unable to load cached EA leaderboards", cacheError);
        return null;
      },
    );

    if (cachedLeaderboards) {
      players = cachedLeaderboards.players;
      clubs = cachedLeaderboards.clubs;
      leaderboardError =
        "Showing the latest leaderboard saved in the database because the live EA request failed.";
    } else if (error instanceof EaRequestError) {
      leaderboardError = `EA rejected the live leaderboard request (${error.status}).`;
    } else if (error instanceof Error) {
      leaderboardError = error.message;
    } else {
      leaderboardError = "Live EA leaderboard fetch failed.";
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

        {leaderboardError ? (
          <div className="app-banner-warning">
            <p className="text-sm font-semibold uppercase tracking-wide text-yellow-300">
              Live leaderboard unavailable
            </p>
            <p className="mt-2">{leaderboardError}</p>
          </div>
        ) : null}

        <LeaderboardsClient players={players} clubs={clubs} />
      </section>
    </main>
  );
}
