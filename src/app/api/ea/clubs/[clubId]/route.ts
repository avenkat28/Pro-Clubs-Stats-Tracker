import { NextResponse } from "next/server";

import {
  EaRequestError,
  getEaClubProfile,
  normalizeEaClubId,
  normalizeEaPlatform,
} from "../../../../../lib/ea";
import {
  cacheEaClubProfile,
  getCachedEaClubProfile,
} from "../../../../../lib/database/eaProfileCache";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ clubId: string }> },
) {
  const { clubId } = await params;
  const { searchParams } = new URL(request.url);
  const platform = normalizeEaPlatform(searchParams.get("platform"));

  try {
    const normalizedClubId = normalizeEaClubId(clubId);
    const profile = await getEaClubProfile(normalizedClubId, platform);
    await cacheEaClubProfile(profile).catch((cacheError) => {
      console.warn("Unable to cache EA club profile", cacheError);
    });

    return NextResponse.json(profile);
  } catch (error) {
    const cachedProfile = await getCachedEaClubProfile(String(clubId)).catch(() => null);

    if (cachedProfile) {
      return NextResponse.json(cachedProfile);
    }

    const message = "Unable to fetch EA club data";
    const status =
      error instanceof Error && error.message.includes("Club ID") ? 400 : 502;
    const clubIdLength = String(clubId ?? "").length;

    if (error instanceof EaRequestError) {
      console.warn("[api/ea/clubs]", {
        status: error.status,
        platform,
        clubIdLength,
      });
    } else {
      console.warn("[api/ea/clubs]", {
        status,
        platform,
        clubIdLength,
      });
    }

    return NextResponse.json(
      {
        error: message,
      },
      {
        status,
      },
    );
  }
}
