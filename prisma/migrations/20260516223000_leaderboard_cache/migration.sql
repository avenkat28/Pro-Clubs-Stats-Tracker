CREATE TABLE "LeaderboardSnapshot" (
    "id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "clubLimit" INTEGER NOT NULL,
    "playerClubScanLimit" INTEGER NOT NULL,
    "capturedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeaderboardSnapshot_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "LeaderboardClubRow" (
    "id" TEXT NOT NULL,
    "snapshotId" TEXT NOT NULL,
    "eaClubId" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "games" INTEGER NOT NULL,
    "wins" INTEGER NOT NULL,
    "draws" INTEGER NOT NULL,
    "losses" INTEGER NOT NULL,
    "goalsFor" INTEGER NOT NULL,
    "goalsAgainst" INTEGER NOT NULL,
    "cleanSheets" INTEGER NOT NULL,
    "skillRating" INTEGER NOT NULL,

    CONSTRAINT "LeaderboardClubRow_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "LeaderboardPlayerRow" (
    "id" TEXT NOT NULL,
    "snapshotId" TEXT NOT NULL,
    "eaPlayerId" TEXT NOT NULL,
    "clubEaClubId" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "club" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "games" INTEGER NOT NULL,
    "goals" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "winRate" INTEGER NOT NULL,
    "redCards" INTEGER NOT NULL,
    "tackles" INTEGER NOT NULL,
    "tackleRate" INTEGER NOT NULL,

    CONSTRAINT "LeaderboardPlayerRow_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "LeaderboardSnapshot_platform_idx" ON "LeaderboardSnapshot"("platform");
CREATE INDEX "LeaderboardSnapshot_capturedAt_idx" ON "LeaderboardSnapshot"("capturedAt");
CREATE INDEX "LeaderboardClubRow_snapshotId_idx" ON "LeaderboardClubRow"("snapshotId");
CREATE INDEX "LeaderboardClubRow_eaClubId_idx" ON "LeaderboardClubRow"("eaClubId");
CREATE INDEX "LeaderboardClubRow_rank_idx" ON "LeaderboardClubRow"("rank");
CREATE INDEX "LeaderboardClubRow_skillRating_idx" ON "LeaderboardClubRow"("skillRating");
CREATE INDEX "LeaderboardPlayerRow_snapshotId_idx" ON "LeaderboardPlayerRow"("snapshotId");
CREATE INDEX "LeaderboardPlayerRow_eaPlayerId_idx" ON "LeaderboardPlayerRow"("eaPlayerId");
CREATE INDEX "LeaderboardPlayerRow_clubEaClubId_idx" ON "LeaderboardPlayerRow"("clubEaClubId");
CREATE INDEX "LeaderboardPlayerRow_rank_idx" ON "LeaderboardPlayerRow"("rank");
CREATE INDEX "LeaderboardPlayerRow_rating_idx" ON "LeaderboardPlayerRow"("rating");
CREATE INDEX "LeaderboardPlayerRow_goals_idx" ON "LeaderboardPlayerRow"("goals");
CREATE INDEX "LeaderboardPlayerRow_assists_idx" ON "LeaderboardPlayerRow"("assists");

ALTER TABLE "LeaderboardClubRow" ADD CONSTRAINT "LeaderboardClubRow_snapshotId_fkey" FOREIGN KEY ("snapshotId") REFERENCES "LeaderboardSnapshot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "LeaderboardPlayerRow" ADD CONSTRAINT "LeaderboardPlayerRow_snapshotId_fkey" FOREIGN KEY ("snapshotId") REFERENCES "LeaderboardSnapshot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
