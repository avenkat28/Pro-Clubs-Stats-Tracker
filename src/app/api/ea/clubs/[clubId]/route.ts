import { NextResponse } from "next/server";

import { getEaClubProfile } from "../../../../../lib/ea";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ clubId: string }> },
) {
  const { clubId } = await params;
  const { searchParams } = new URL(request.url);
  const platform = searchParams.get("platform") ?? undefined;

  try {
    const profile = await getEaClubProfile(clubId, platform);

    return NextResponse.json(profile);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to fetch EA club data";

    return NextResponse.json(
      {
        error: message,
      },
      {
        status: 502,
      },
    );
  }
}
