import ClubHeader from "../../../components/ClubHeader";
import ClubStatsGrid from "../../../components/ClubStatsGrid";
import Navbar from "../../../components/Navbar";
import SquadTable from "../../../components/SquadTable";
import {
  EaRequestError,
  type EaClubProfile,
  type EaPlatform,
  eaPlatformLabels,
  eaPlatforms,
  getEaClubProfile,
  normalizeEaPlatform,
} from "../../../lib/ea";
import {
  cacheEaClubProfile,
  getCachedEaClubProfile,
} from "../../../lib/database/eaProfileCache";
import { getProTeamComp } from "../../../lib/proTeamComp";

function getClubProfileComp(profile: EaClubProfile) {
  const matches = profile.club.wins + profile.club.draws + profile.club.losses;

  return getProTeamComp(
    {
      matches,
      wins: profile.club.wins,
      draws: profile.club.draws,
      losses: profile.club.losses,
      goalsFor: profile.club.goalsFor,
      goalsAgainst: profile.club.goalsAgainst,
      cleanSheets: profile.club.cleanSheets,
      leagueApps: profile.club.appearanceBreakdown.league,
      playoffApps: profile.club.appearanceBreakdown.playoff,
      bestFinish: profile.club.appearanceBreakdown.bestPlayoffFinish.label,
      last10: profile.recentClubMatches.slice(0, 10).map((match) => ({
        result: match.result,
      })),
    },
    profile.squad.map((player) => ({
      matches: player.matches,
      totalGoals: player.goals,
      totalAssists: player.assists,
      totalGoalContributions: player.goals + player.assists,
      avgRating: player.rating,
      tackles: player.tackles,
      tacklePercent: player.tackleSuccessRate,
      redCards: player.redCards,
      motm: player.manOfTheMatch,
      motmPercent: player.manOfTheMatchRate,
    })),
  );
}

function ClubProfileView({
  clubId,
  platform,
  profile,
  cachedNotice,
}: {
  clubId: string;
  platform: EaPlatform;
  profile: EaClubProfile;
  cachedNotice?: string;
}) {
  const proTeamComp = getClubProfileComp(profile);

  return (
    <main className="min-h-screen overflow-x-hidden bg-black/35 text-white">
      <Navbar />

      <section className="mx-auto flex max-w-[84rem] flex-col gap-5 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {cachedNotice ? (
          <div className="app-banner-warning">
            <p className="text-sm font-semibold uppercase tracking-wide">
              Cached profile
            </p>
            <p className="mt-2 text-sm text-gray-300">{cachedNotice}</p>
          </div>
        ) : null}

        <div className="club-control-panel rounded-[1.25rem] border border-emerald-300/10 bg-[#07100c]/70 p-4 shadow-[0_16px_38px_rgba(0,0,0,0.18)] ring-1 ring-white/[0.03]">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-emerald-200/50">
                Club Control
              </p>
              <p className="mt-1 text-sm text-white/45">Club ID {clubId}</p>
            </div>
          </div>

          <div className="club-platform-tabs mt-4 flex w-full flex-wrap rounded-[1.25rem] border border-emerald-300/12 bg-black/35 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:inline-flex sm:w-auto sm:rounded-full">
            {eaPlatforms.map((platformOption) => {
              const isActive = platformOption === platform;

              return (
                <a
                  key={platformOption}
                  href={`/club/${clubId}?platform=${platformOption}`}
                  className={`flex-1 rounded-full px-3 py-2 text-center text-sm font-bold transition sm:flex-none sm:px-4 ${
                    isActive
                      ? "bg-emerald-300 text-black shadow-[0_8px_24px_rgba(16,185,129,0.25)]"
                      : "text-white/55 hover:text-emerald-100"
                  }`}
                >
                  {eaPlatformLabels[platformOption]}
                </a>
              );
            })}
          </div>
        </div>

        <ClubHeader
          name={profile.club.name}
          platform={eaPlatformLabels[platform]}
          division={profile.club.division}
          skillRating={profile.club.skillRating}
          clubId={clubId}
          badgeUrl={profile.club.badgeUrl}
          proTeamComp={proTeamComp.primaryComp}
        />

        <ClubStatsGrid
          wins={profile.club.wins}
          draws={profile.club.draws}
          losses={profile.club.losses}
          goalsFor={profile.club.goalsFor}
          goalsAgainst={profile.club.goalsAgainst}
          recentMatches={profile.recentClubMatches}
          appearanceBreakdown={profile.club.appearanceBreakdown}
        />

        <SquadTable players={profile.squad} clubId={clubId} platform={platform} />
      </section>
    </main>
  );
}

export default async function ClubPage({
  params,
  searchParams,
}: {
  params: Promise<{ clubId: string }>;
  searchParams: Promise<{ platform?: string }>;
}) {
  const [{ clubId }, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  const platform = normalizeEaPlatform(resolvedSearchParams.platform);

  try {
    const profile = await getEaClubProfile(clubId, platform);
    await cacheEaClubProfile(profile).catch((cacheError) => {
      console.warn("Unable to cache EA club profile", cacheError);
    });

    return <ClubProfileView clubId={clubId} platform={platform} profile={profile} />;
  } catch (error) {
    const cachedProfile = await getCachedEaClubProfile(clubId).catch(
      (cacheError) => {
        console.warn("Unable to load cached EA club profile", cacheError);
        return null;
      },
    );

    if (cachedProfile) {
      return (
        <ClubProfileView
          clubId={clubId}
          platform={platform}
          profile={cachedProfile}
          cachedNotice="EA blocked the live request, so this page is showing the latest profile saved in your database."
        />
      );
    }

    const message =
      error instanceof EaRequestError && error.status === 403
        ? "EA is blocking this live profile request from Vercel. Search shortcuts can still open the right club ID, but the full profile needs EA to allow the server request or a cached database copy."
        : error instanceof Error
          ? error.message
          : "Unable to load live EA stats.";

    return (
      <main className="min-h-screen overflow-x-hidden bg-black/35 text-white">
        <Navbar />
        <section className="mx-auto max-w-4xl px-6 py-16">
          <div className="app-banner-warning border-red-500/30 bg-red-500/10 text-red-100">
            <p className="text-sm font-semibold uppercase tracking-wide text-red-300">
              Live EA fetch failed
            </p>
            <h1 className="mt-3 text-4xl font-semibold">Club Profile</h1>
            <p className="mt-4 text-gray-300">Club ID: {clubId}</p>
            <p className="mt-2 text-gray-300">
              Platform: {eaPlatformLabels[platform]}
            </p>
            <p className="mt-4 text-gray-400">{message}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {eaPlatforms.map((platformOption) => {
                const isActive = platformOption === platform;

                return (
                  <a
                    key={platformOption}
                    href={`/club/${clubId}?platform=${platformOption}`}
                    className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                      isActive
                        ? "border-emerald-400 bg-emerald-500 text-black"
                        : "border-white/10 bg-black/40 text-gray-300 hover:border-emerald-400/60 hover:text-white"
                    }`}
                  >
                    Retry {eaPlatformLabels[platformOption]}
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    );
  }
}
