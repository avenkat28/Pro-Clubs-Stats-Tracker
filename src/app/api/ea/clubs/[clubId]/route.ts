import { NextResponse } from "next/server";

import { getEaClubProfile, normalizeEaPlatform } from "../../../../../lib/ea";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ clubId: string }> },
) {
  const { clubId } = await params;
  const { searchParams } = new URL(request.url);
  const platform = normalizeEaPlatform(searchParams.get("platform"));

  try {
    const profile = await getEaClubProfile(clubId, platform);

    return NextResponse.json(profile);
  } catch (error) {
    const message = "Unable to fetch EA club data";
    const status = error instanceof Error && error.message.includes("Club ID") ? 400 : 502;

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
