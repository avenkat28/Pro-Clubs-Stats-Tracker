import CompareClient from "../../components/CompareClient";
import CompareHeader from "../../components/CompareHeader";
import Navbar from "../../components/Navbar";
import {
  EaRequestError,
  eaPlatformLabels,
  eaPlatforms,
  getEaClubProfile,
  getEaLeaderboards,
  normalizeEaPlatform,
  normalizeEaSearchQuery,
  searchEaClubs,
  type EaClubProfile,
  type EaLeaderboardClub,
  type EaLeaderboardPlayer,
  type EaSquadMember,
} from "../../lib/ea";
import type { CompareClub, ComparePlayer } from "../../lib/compareTypes";

const MIN_RELEVANT_PLAYER_GAMES = 10;

type ComparePageProps = {
  searchParams: Promise<{
    platform?: string;
    leftClub?: string;
    leftClubId?: string;
    rightClub?: string;
    rightClubId?: string;
  }>;
};

function toCompareClub(club: EaLeaderboardClub): CompareClub {
  return {
    id: club.id,
    name: club.name,
    division: club.division,
    platform: club.platform,
    games: club.games,
    wins: club.wins,
    draws: club.draws,
    losses: club.losses,
    goalsFor: club.goalsFor,
    goalsAgainst: club.goalsAgainst,
    cleanSheets: club.cleanSheets,
    skillRating: club.skillRating,
  };
}

function toComparePlayer(player: EaLeaderboardPlayer): ComparePlayer {
  return {
    id: `${player.clubId}:${player.id}`,
    clubId: player.clubId,
    name: player.name,
    club: player.club,
    position: player.position,
    platform: player.platform,
    games: player.games,
    goals: player.goals,
    assists: player.assists,
    rating: player.rating,
    winRate: player.winRate,
    redCards: player.redCards,
    tackles: player.tackles,
    tackleRate: player.tackleRate,
  };
}

function profileToCompareClub(profile: EaClubProfile): CompareClub {
  const club = profile.club;

  return {
    id: club.id,
    name: club.name,
    division: club.division,
    platform: eaPlatformLabels[normalizeEaPlatform(club.platform)],
    games: club.wins + club.draws + club.losses,
    wins: club.wins,
    draws: club.draws,
    losses: club.losses,
    goalsFor: club.goalsFor,
    goalsAgainst: club.goalsAgainst,
    cleanSheets: club.cleanSheets,
    skillRating: club.skillRating,
  };
}

function squadMemberToComparePlayer(
  member: EaSquadMember,
  profile: EaClubProfile,
): ComparePlayer {
  return {
    id: `${profile.club.id}:${member.id}`,
    clubId: profile.club.id,
    name: member.name,
    club: profile.club.name,
    position: member.position,
    platform: eaPlatformLabels[normalizeEaPlatform(profile.club.platform)],
    games: member.matches,
    goals: member.goals,
    assists: member.assists,
    rating: member.rating,
    winRate: member.winRate,
    redCards: member.redCards,
    tackles: member.tackles,
    tackleRate: member.tackleSuccessRate,
  };
}

function dedupeById<T extends { id: string }>(items: T[]) {
  return Array.from(new Map(items.map((item) => [item.id, item])).values());
}

function isRelevantComparePlayer(player: ComparePlayer) {
  return (
    player.games >= MIN_RELEVANT_PLAYER_GAMES &&
    player.name !== "Unknown" &&
    player.rating > 0
  );
}

async function getOptionalClubProfile(input: string, platform: string) {
  const safeInput = normalizeEaSearchQuery(input);

  if (!safeInput) {
    return null;
  }

  if (/^\d+$/.test(safeInput)) {
    return getEaClubProfile(safeInput, platform);
  }

  const clubs = await searchEaClubs(safeInput, normalizeEaPlatform(platform));
  const bestMatch =
    clubs.find((club) => club.name.toLowerCase() === safeInput.toLowerCase()) ??
    clubs[0];

  if (!bestMatch) {
    return null;
  }

  return getEaClubProfile(bestMatch.id, platform);
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const params = await searchParams;
  const platform = normalizeEaPlatform(params.platform);
  const leftClubInput = normalizeEaSearchQuery(params.leftClub ?? params.leftClubId ?? "");
  const rightClubInput = normalizeEaSearchQuery(params.rightClub ?? params.rightClubId ?? "");
  const clubQuery = `${leftClubInput ? `&leftClub=${encodeURIComponent(leftClubInput)}` : ""}${
    rightClubInput ? `&rightClub=${encodeURIComponent(rightClubInput)}` : ""
  }`;
  let players: ComparePlayer[] = [];
  let clubs: CompareClub[] = [];
  let compareError = "";
  const selectedProfiles: EaClubProfile[] = [];
  const hasClubScope = Boolean(leftClubInput || rightClubInput);

  try {
    const [leaderboards, leftProfileResult, rightProfileResult] = await Promise.all([
      hasClubScope
        ? Promise.resolve({ players: [], clubs: [] })
        : getEaLeaderboards(platform, 30, 20),
      getOptionalClubProfile(leftClubInput, platform).then(
        (profile) => ({ status: "fulfilled" as const, value: profile }),
        (error) => ({ status: "rejected" as const, reason: error }),
      ),
      getOptionalClubProfile(rightClubInput, platform).then(
        (profile) => ({ status: "fulfilled" as const, value: profile }),
        (error) => ({ status: "rejected" as const, reason: error }),
      ),
    ]);

    for (const result of [leftProfileResult, rightProfileResult]) {
      if (result.status === "fulfilled" && result.value) {
        selectedProfiles.push(result.value);
      }
    }

    const selectedPlayers = selectedProfiles.flatMap((profile) =>
      profile.squad.map((member) => squadMemberToComparePlayer(member, profile)),
    );
    const selectedClubs = selectedProfiles.map(profileToCompareClub);

    players = dedupeById(
      hasClubScope
        ? selectedPlayers
        : leaderboards.players.map(toComparePlayer),
    ).filter(isRelevantComparePlayer);
    clubs = dedupeById(
      hasClubScope ? selectedClubs : leaderboards.clubs.map(toCompareClub),
    );
  } catch (error) {
    if (error instanceof EaRequestError) {
      compareError = `EA rejected the live compare request (${error.status}).`;
    } else if (error instanceof Error) {
      compareError = error.message;
    } else {
      compareError = "Live EA compare data failed.";
    }
  }

  return (
    <main className="min-h-screen bg-[#050706] text-white">
      <Navbar />

      <section className="app-page-shell">
        <CompareHeader />

        <form className="app-surface p-4">
          <input type="hidden" name="platform" value={platform} />
          <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-white/45">
                Left club name or ID
              </span>
              <input
                name="leftClub"
                defaultValue={leftClubInput}
                placeholder="Club name or ID"
                className="app-input"
              />
            </label>
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-white/45">
                Right club name or ID
              </span>
              <input
                name="rightClub"
                defaultValue={rightClubInput}
                placeholder="Club name or ID"
                className="app-input"
              />
            </label>
            <button type="submit" className="app-button-primary">
              Load clubs
            </button>
          </div>
          <p className="mt-3 text-sm text-white/45">
            Enter club names or EA club IDs. Their squads will appear at the top of the player selectors.
          </p>
        </form>

        <div className="app-surface app-toolbar">
          {eaPlatforms.map((platformOption) => {
            const isActive = platformOption === platform;

            return (
              <a
                key={platformOption}
                href={`/compare?platform=${platformOption}${clubQuery}`}
                className={`app-pill-link ${isActive ? "app-pill-link-active" : ""}`}
              >
                {eaPlatformLabels[platformOption]}
              </a>
            );
          })}
        </div>

        {compareError ? (
          <div className="app-banner-warning">
            <p className="text-sm font-semibold uppercase tracking-wide text-yellow-300">
              Live compare unavailable
            </p>
            <p className="mt-2 text-sm text-yellow-100/80">{compareError}</p>
          </div>
        ) : null}

        <CompareClient
          players={players}
          clubs={clubs}
          leftScopeClubId={selectedProfiles[0]?.club.id}
          rightScopeClubId={selectedProfiles[1]?.club.id}
          scopedToClubs={hasClubScope}
        />
      </section>
    </main>
  );
}
