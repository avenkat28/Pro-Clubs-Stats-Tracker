import { NextResponse } from "next/server";

import {
  EaRequestError,
  getEaFullClubData,
  normalizeEaClubId,
  normalizeEaPlatform,
} from "../../../../lib/ea";

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
    const data = await getEaFullClubData(normalizeEaClubId(clubId), platform);

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public",
      },
    });
  } catch (error) {
    const status =
      error instanceof Error && error.message.includes("Club ID") ? 400 : 502;

    if (error instanceof EaRequestError) {
      console.warn("[api/clubs]", {
        status: error.status,
        platform,
        clubIdLength: String(clubId ?? "").length,
      });
    } else {
      console.warn("[api/clubs]", {
        status,
        platform,
        clubIdLength: String(clubId ?? "").length,
      });
    }

    return NextResponse.json(
      {
        message: "Failed to load club data",
      },
      {
        status,
      },
    );
  }
}
