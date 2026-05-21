import { NextResponse } from "next/server";

import { refreshStatsCache } from "../../../../lib/database/statsRefresh";
import { eaPlatforms, normalizeEaPlatform } from "../../../../lib/ea";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function isAuthorized(request: Request) {
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    return true;
  }

  const authHeader = request.headers.get("authorization");

  return authHeader === `Bearer ${cronSecret}`;
}

function getPlatforms(searchParams: URLSearchParams) {
  const selectedPlatform = searchParams.get("platform");

  if (!selectedPlatform || selectedPlatform === "all") {
    return eaPlatforms;
  }

  return [normalizeEaPlatform(selectedPlatform)];
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const summary = await refreshStatsCache({
    platforms: getPlatforms(searchParams),
    clubLimit: Number(searchParams.get("clubLimit") ?? undefined) || undefined,
    playerClubScanLimit:
      Number(searchParams.get("playerClubScanLimit") ?? undefined) || undefined,
    maxClubs: Number(searchParams.get("maxClubs") ?? undefined) || undefined,
  });

  return NextResponse.json(summary);
}
