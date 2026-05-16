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
  } catch (error) {
    if (error instanceof EaRequestError) {
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

      <section className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:py-10">
        <LeaderboardHeader
          totalPlayers={players.length}
          totalClubs={clubs.length}
        />

        <div className="flex flex-wrap gap-2 rounded-lg border border-white/10 bg-[#080b0a] p-2">
          {eaPlatforms.map((platformOption) => {
            const isActive = platformOption === platform;

            return (
              <a
                key={platformOption}
                href={`/leaderboards?platform=${platformOption}`}
                className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-white text-black"
                    : "text-white/55 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {eaPlatformLabels[platformOption]}
              </a>
            );
          })}
        </div>

        {leaderboardError ? (
          <div className="rounded-lg border border-yellow-500/25 bg-yellow-500/10 p-5 text-yellow-100">
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
