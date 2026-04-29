import ClubHeader from "../../../components/ClubHeader";
import ClubStatsGrid from "../../../components/ClubStatsGrid";
import Navbar from "../../../components/Navbar";
import SquadTable from "../../../components/SquadTable";
import {
  eaPlatformLabels,
  eaPlatforms,
  getEaClubProfile,
  isEaPlatform,
} from "../../../lib/ea";

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
  const platform = isEaPlatform(resolvedSearchParams.platform)
    ? resolvedSearchParams.platform
    : "common-gen5";

  try {
    const profile = await getEaClubProfile(clubId, platform);

    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <section className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10">
          <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] p-5 shadow-[0_18px_38px_rgba(0,0,0,0.18)]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                  Club Control
                </p>
                <p className="mt-2 text-base text-white/55">Club ID {clubId}</p>
              </div>
            </div>

            <div className="mt-5 inline-flex flex-wrap rounded-2xl border border-white/10 bg-black/35 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              {eaPlatforms.map((platformOption) => {
                const isActive = platformOption === platform;

                return (
                  <a
                    key={platformOption}
                    href={`/club/${clubId}?platform=${platformOption}`}
                    className={`rounded-[1rem] px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-[linear-gradient(180deg,#3b82f6,#2563eb)] text-white shadow-[0_8px_24px_rgba(37,99,235,0.4)]"
                        : "text-white/60 hover:text-white"
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
          />

          <ClubStatsGrid
            wins={profile.club.wins}
            draws={profile.club.draws}
            losses={profile.club.losses}
            goalsFor={profile.club.goalsFor}
            goalsAgainst={profile.club.goalsAgainst}
            cleanSheets={profile.club.cleanSheets}
          />

          <SquadTable players={profile.squad} />
        </section>
      </main>
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to load live EA stats.";

    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />
        <section className="mx-auto max-w-4xl px-6 py-16">
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-red-300">
              Live EA fetch failed
            </p>
            <h1 className="mt-3 text-4xl font-bold">Club Profile</h1>
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
                        ? "border-blue-500 bg-blue-600 text-white"
                        : "border-white/10 bg-black/40 text-gray-300 hover:border-blue-500/60 hover:text-white"
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
