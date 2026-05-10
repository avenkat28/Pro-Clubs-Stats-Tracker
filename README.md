# Pro Clubs Stats Tracker
by Arya Venkat and Safwan Rahman

EA Sports FC 26 Pro Clubs advanced stats tracker built with Next.js, TypeScript, PostgreSQL, and Prisma. The app pulls live EA club and player data, surfaces squad and player analytics beyond the default Pro Clubs views, and adds stat-profile comps, recent-form views, leaderboards, and comparison tools.

## What the app does

- Fetches live EA club profiles, squad stats, and player profiles
- Shows club performance breakdowns, goal production, defensive profile, and team-strength signals
- Displays sortable squad stats with total and per-match views
- Surfaces individual player profiles with shared stats, overall stats, per-match stats, and recent-match detail
- Includes recent rating trends and recent-player summary stats for the last match window
- Adds stat-profile comps for clubs and players based on production and form
- Supports search, leaderboards, and comparison views

## Latest updates

- Added richer live EA player stat handling, including shot success, passing, MOTM, tackling, and recent-match parsing improvements
- Upgraded squad stats with better ordering, cleaner alignment, updated total/per-match columns, and nationality flag support
- Split player stats into shared, overall, and per-match sections with improved labels and toggles
- Added a recent-player section that can toggle between rating trend and recent match stats
- Connected rating-trend chart points to recent match cards for direct jump/open behavior
- Redesigned recent match detail cards into a two-row stat layout
- Removed clean sheets from the club attack/defense panel and expanded goal difference into that space

## Live EA setup

The club and player pages use live data from the public Pro Clubs endpoint family at:

```text
https://proclubs.ea.com/api/fc
```

1. Copy `.env.example` to `.env.local`
2. Keep `EA_PLATFORM=common-gen5` for current-gen clubs, or switch it if needed
3. Run the app with:

```bash
npm run dev
```

4. Open a live club page at `/club/<clubId>`
5. Open a player page from the squad table or directly with `/player/<playerId>?clubId=<clubId>&platform=<platform>`

Useful endpoints currently wired into the app:

- `GET /api/ea/clubs/:clubId`
- `GET https://proclubs.ea.com/api/fc/clubs/info?platform=common-gen5&clubIds=:clubId`
- `GET https://proclubs.ea.com/api/fc/clubs/overallStats?platform=common-gen5&clubIds=:clubId`
- `GET https://proclubs.ea.com/api/fc/members/stats?platform=common-gen5&clubId=:clubId`
- `GET https://proclubs.ea.com/api/fc/members/career/stats?platform=common-gen5&clubId=:clubId`

## Main views

### Club page

- Live club record, form, team strength, attack/defense profile
- Sortable squad stats with `Overall Totals` and `Per Match` toggles
- Club comp card with primary and secondary real-life comps
- Direct links into individual player pages

### Player page

- Live player identity card with nationality, height, position, and overall
- Club badge awards such as top scorer, top assister, top defender, and most consistent
- Shared player stats plus `Overall` and `Per Match` stat sections
- Recent player module with `Rating Trend` and `Match Stats` toggles
- Recent match cards with expanded two-row stat detail
- Player comp card with real-life statistical comparisons

### Compare / Search / Leaderboards

- Club and player comparison workflows
- Search views for clubs and players
- Leaderboards and top-three podium displays

## Stat comp features

The app includes deterministic real-life comparison features for clubs and players. These are stat-profile comps, not exact playstyle comps.

### Pro Team Comp

Club pages call `getProTeamComp` from `src/lib/proTeamComp.ts` and display the result with `src/components/ProTeamCompCard.tsx`.

The team comp uses record, goals for, goals against, goal difference, form when available, player goal-contribution distribution when available, tackles, tackle success, and red cards. It returns primary and secondary real-life club comps, a style label, explanation, category scores, tiers, and reasons.

Club comp images live in:

```text
public/club-comps/
```

Expected club image filenames:

```text
manchester-city.png
barcelona.png
real-madrid.png
bayern-munich.png
psg.png
liverpool.png
arsenal.png
tottenham.png
borussia-dortmund.png
bayer-leverkusen.png
napoli.png
inter-milan.png
atletico-madrid.png
juventus.png
chelsea.png
```

### Player Stat Comp

Player pages call `getPlayerStatComp` from `src/lib/playerStatComp.ts` and display the result with `src/components/PlayerStatCompCard.tsx`.

The player comp uses games, goals, assists, G/A, goals per game, assists per game, G/A per game, overall, average rating, win rate, tackles, tackle success, MOTM, red cards, recent-match form when available, and position when available.

Player comp images live in:

```text
public/player-comps/
```

If a player image is missing or fails to load, the UI falls back to:

```text
public/player-comps/fallback.png
```

## Project structure

```text
src/
  app/
    api/ea/               # Internal EA proxy routes
    club/[clubId]/        # Live club profile page
    player/[playerId]/    # Live player profile page
    compare/              # Club/player comparison page
    leaderboards/         # Leaderboards page
    search/               # Search page
    globals.css           # Global app styling
    layout.tsx            # Root layout
    page.tsx              # Home page
  components/
    ClubHeader.tsx
    ClubStatsGrid.tsx
    MatchHistory.tsx
    PerformanceChart.tsx
    PlayerHeader.tsx
    PlayerStatsGrid.tsx
    RecentPlayerSection.tsx
    ProTeamCompCard.tsx
    SquadTable.tsx
    Search*.tsx           # Search UI
    Compare*.tsx          # Comparison UI
    Leaderboard*.tsx      # Leaderboard UI
    Stat*.tsx             # Shared stat labels/cards/icons
    Navbar.tsx
  lib/
    ea.ts                 # Live EA fetch + normalization layer
    playerStatComp.ts     # Player comparison logic
    proTeamComp.ts        # Club comparison logic
    colorCoding.ts        # Shared UI color helpers
    format.ts             # Shared formatting helpers
    db.ts                 # Prisma DB client
    database/             # App query helpers
    *MockData.ts          # Mock/fallback datasets used in some flows
```

## Database setup

The app uses Prisma with PostgreSQL. For Supabase, use the pooled connection URL for normal app queries and the direct connection URL for Prisma migrations.

1. Copy `.env.example` to `.env`
2. Replace `YOUR-PASSWORD` and `PROJECT_REF` with values from your Supabase project
3. Keep real credentials only in `.env`
4. Test the connection:

```bash
npm run db:test
```

5. Generate Prisma Client:

```bash
npm run prisma:generate
```

6. Run migrations:

```bash
npm run prisma:migrate
```

7. Optional: open Prisma Studio:

```bash
npm run prisma:studio
```

## Prisma scripts

- `npm run db:test` checks database connectivity
- `npm run prisma:generate` regenerates Prisma Client
- `npm run prisma:migrate` applies schema migrations during development
- `npm run prisma:studio` opens Prisma Studio
- `npm run prisma:seed` seeds development data from `prisma/seed.ts`

## Attribution and disclaimer

This project is licensed under the MIT License. However, all data, names, logos, and trademarks related to EA Sports and EA FC are the property of their respective owners.

This project is for educational and non-commercial purposes only and is not affiliated with or endorsed by Electronic Arts.
