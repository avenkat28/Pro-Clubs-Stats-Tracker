import { NextResponse } from "next/server";

import {
  EaRequestError,
  getEaClubProfile,
  normalizeEaClubId,
  normalizeEaPlatform,
} from "../../../../../lib/ea";

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

    return NextResponse.json(profile);
  } catch (error) {
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
