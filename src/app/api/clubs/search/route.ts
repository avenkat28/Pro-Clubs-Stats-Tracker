import { NextResponse } from "next/server";

import {
  EaRequestError,
  getEaFullClubData,
  normalizeEaPlatform,
  normalizeEaSearchQuery,
  searchEaClubs,
} from "../../../../lib/ea";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const platform = normalizeEaPlatform(searchParams.get("platform"));
  const clubName = normalizeEaSearchQuery(
    searchParams.get("clubName") ?? searchParams.get("q") ?? "",
  );

  if (!clubName) {
    return NextResponse.json([]);
  }

  try {
    const clubs = await searchEaClubs(clubName, platform);
    const enrichedClubs = await Promise.all(
      clubs.map(async (club) => {
        const fullClubData = await getEaFullClubData(club.id, club.platform).catch(
          () => null,
        );
        const overallStats =
          fullClubData?.overallStats &&
          !Array.isArray(fullClubData.overallStats) &&
          typeof fullClubData.overallStats === "object"
            ? (fullClubData.overallStats as Record<string, unknown>)
            : {};
        const clubInfo = fullClubData?.clubInfoData[club.id] ?? {
          name: club.name,
          clubId: Number(club.id),
        };
        const bestDivision =
          typeof overallStats.bestDivision === "string"
            ? overallStats.bestDivision
            : club.division.replace(/\D+/g, "") || club.division;

        return {
          club,
          overallStats,
          clubInfo,
          bestDivision,
        };
      }),
    );

    return NextResponse.json(
      enrichedClubs.map(({ club, overallStats, clubInfo, bestDivision }) => ({
        ...overallStats,
        clubId: club.id,
        bestDivision,
        clubInfo,
        platform: club.platform,
        clubName: club.name,
        currentDivision: bestDivision,
      })),
      {
        headers: {
          "Cache-Control": "public",
        },
      },
    );
  } catch (error) {
    if (error instanceof EaRequestError) {
      console.warn("[api/clubs/search]", {
        status: error.status,
        platform,
        queryLength: clubName.length,
      });
    } else {
      console.warn("[api/clubs/search]", {
        status: null,
        platform,
        queryLength: clubName.length,
      });
    }

    return NextResponse.json(
      {
        message: "Search failed",
      },
      {
        status: 502,
      },
    );
  }
}
