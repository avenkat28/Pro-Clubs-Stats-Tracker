-- CreateTable
CREATE TABLE "Club" (
    "id" TEXT NOT NULL,
    "eaClubId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "region" TEXT,
    "division" TEXT,
    "skillRating" INTEGER,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "draws" INTEGER NOT NULL DEFAULT 0,
    "losses" INTEGER NOT NULL DEFAULT 0,
    "goalsFor" INTEGER NOT NULL DEFAULT 0,
    "goalsAgainst" INTEGER NOT NULL DEFAULT 0,
    "cleanSheets" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Club_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "eaPlayerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT,
    "platform" TEXT NOT NULL,
    "region" TEXT,
    "clubId" TEXT,
    "games" INTEGER NOT NULL DEFAULT 0,
    "goals" INTEGER NOT NULL DEFAULT 0,
    "assists" INTEGER NOT NULL DEFAULT 0,
    "averageRating" DOUBLE PRECISION,
    "winRate" DOUBLE PRECISION,
    "redCards" INTEGER NOT NULL DEFAULT 0,
    "tackles" INTEGER,
    "tackleSuccessRate" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "eaMatchId" TEXT,
    "clubId" TEXT NOT NULL,
    "opponentName" TEXT NOT NULL,
    "opponentEaClubId" TEXT,
    "result" TEXT NOT NULL,
    "goalsFor" INTEGER NOT NULL,
    "goalsAgainst" INTEGER NOT NULL,
    "playedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerMatchStat" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "rating" DOUBLE PRECISION,
    "goals" INTEGER NOT NULL DEFAULT 0,
    "assists" INTEGER NOT NULL DEFAULT 0,
    "tackles" INTEGER,
    "passAccuracy" DOUBLE PRECISION,
    "redCards" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlayerMatchStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClubSnapshot" (
    "id" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "wins" INTEGER NOT NULL,
    "draws" INTEGER NOT NULL,
    "losses" INTEGER NOT NULL,
    "goalsFor" INTEGER NOT NULL,
    "goalsAgainst" INTEGER NOT NULL,
    "cleanSheets" INTEGER,
    "skillRating" INTEGER,
    "capturedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClubSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerSnapshot" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "games" INTEGER NOT NULL,
    "goals" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "averageRating" DOUBLE PRECISION,
    "winRate" DOUBLE PRECISION,
    "redCards" INTEGER NOT NULL,
    "tackles" INTEGER,
    "tackleSuccessRate" DOUBLE PRECISION,
    "capturedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlayerSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Club_eaClubId_key" ON "Club"("eaClubId");

-- CreateIndex
CREATE INDEX "Club_eaClubId_idx" ON "Club"("eaClubId");

-- CreateIndex
CREATE INDEX "Club_name_idx" ON "Club"("name");

-- CreateIndex
CREATE INDEX "Club_platform_idx" ON "Club"("platform");

-- CreateIndex
CREATE INDEX "Club_skillRating_idx" ON "Club"("skillRating");

-- CreateIndex
CREATE UNIQUE INDEX "Player_eaPlayerId_key" ON "Player"("eaPlayerId");

-- CreateIndex
CREATE INDEX "Player_eaPlayerId_idx" ON "Player"("eaPlayerId");

-- CreateIndex
CREATE INDEX "Player_name_idx" ON "Player"("name");

-- CreateIndex
CREATE INDEX "Player_clubId_idx" ON "Player"("clubId");

-- CreateIndex
CREATE INDEX "Player_position_idx" ON "Player"("position");

-- CreateIndex
CREATE INDEX "Player_platform_idx" ON "Player"("platform");

-- CreateIndex
CREATE INDEX "Player_averageRating_idx" ON "Player"("averageRating");

-- CreateIndex
CREATE INDEX "Player_goals_idx" ON "Player"("goals");

-- CreateIndex
CREATE INDEX "Player_assists_idx" ON "Player"("assists");

-- CreateIndex
CREATE UNIQUE INDEX "Match_eaMatchId_key" ON "Match"("eaMatchId");

-- CreateIndex
CREATE INDEX "Match_eaMatchId_idx" ON "Match"("eaMatchId");

-- CreateIndex
CREATE INDEX "Match_clubId_idx" ON "Match"("clubId");

-- CreateIndex
CREATE INDEX "Match_playedAt_idx" ON "Match"("playedAt");

-- CreateIndex
CREATE INDEX "Match_result_idx" ON "Match"("result");

-- CreateIndex
CREATE INDEX "PlayerMatchStat_playerId_idx" ON "PlayerMatchStat"("playerId");

-- CreateIndex
CREATE INDEX "PlayerMatchStat_matchId_idx" ON "PlayerMatchStat"("matchId");

-- CreateIndex
CREATE INDEX "PlayerMatchStat_rating_idx" ON "PlayerMatchStat"("rating");

-- CreateIndex
CREATE INDEX "PlayerMatchStat_goals_idx" ON "PlayerMatchStat"("goals");

-- CreateIndex
CREATE INDEX "PlayerMatchStat_assists_idx" ON "PlayerMatchStat"("assists");

-- CreateIndex
CREATE INDEX "ClubSnapshot_clubId_idx" ON "ClubSnapshot"("clubId");

-- CreateIndex
CREATE INDEX "ClubSnapshot_capturedAt_idx" ON "ClubSnapshot"("capturedAt");

-- CreateIndex
CREATE INDEX "ClubSnapshot_skillRating_idx" ON "ClubSnapshot"("skillRating");

-- CreateIndex
CREATE INDEX "PlayerSnapshot_playerId_idx" ON "PlayerSnapshot"("playerId");

-- CreateIndex
CREATE INDEX "PlayerSnapshot_capturedAt_idx" ON "PlayerSnapshot"("capturedAt");

-- CreateIndex
CREATE INDEX "PlayerSnapshot_goals_idx" ON "PlayerSnapshot"("goals");

-- CreateIndex
CREATE INDEX "PlayerSnapshot_assists_idx" ON "PlayerSnapshot"("assists");

-- CreateIndex
CREATE INDEX "PlayerSnapshot_averageRating_idx" ON "PlayerSnapshot"("averageRating");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerMatchStat" ADD CONSTRAINT "PlayerMatchStat_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerMatchStat" ADD CONSTRAINT "PlayerMatchStat_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubSnapshot" ADD CONSTRAINT "ClubSnapshot_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerSnapshot" ADD CONSTRAINT "PlayerSnapshot_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
