# ProClubsHQ

ProClubsHQ is a responsive EA Sports FC 26 Pro Clubs analytics app built with Next.js, TypeScript, Prisma, and PostgreSQL. It combines live EA club and player data with richer search, leaderboards, comparison tools, and profile-level analytics in a production-focused UI.

## Features

- Editorial homepage with live search entry points and Pro Clubs-focused product messaging
- Club search by name or direct EA club ID
- Player search powered from live leaderboard data
- Live leaderboards for clubs and players across current gen, last gen, and Switch
- Club comparison and player comparison workflows
- Club profile pages with record, goal output, defensive profile, team-strength indicators, recent form, and squad stats
- Player profile pages with role-aware stat summaries, recent form, recent match history, and comparison-style player comps
- Release notes page for product updates
- Dark mode and light mode support across the app
- Responsive layouts for desktop, tablet, and mobile

## Core Pages

- `/` - homepage with search, CTA paths, and product overview
- `/search` - live club and player search
- `/leaderboards` - player and club leaderboards with filters and sorting
- `/compare` - compare clubs or players side by side
- `/club/[clubId]` - live club analytics page
- `/player/[playerId]?clubId=...` - live player analytics page
- `/patches` - updates and release notes

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Prisma
- PostgreSQL
- Supabase client libraries

## Project Structure

```text
src/
  app/
    club/[clubId]/         Club profile page
    compare/               Compare page
    leaderboards/          Leaderboards page
    patches/               Release notes page
    player/[playerId]/     Player profile page
    search/                Search page
    globals.css            Global styles and shared UI primitives
    layout.tsx             Root layout and theme bootstrapping
    page.tsx               Homepage
  components/
    Club*.tsx              Club page UI
    Compare*.tsx           Compare UI
    Leaderboard*.tsx       Leaderboard UI
    Player*.tsx            Player page UI
    Search*.tsx            Search UI
    Stat*.tsx              Shared stat labels, cards, and icons
    Navbar.tsx             Main navigation and theme toggle
  lib/
    ea.ts                  Live EA fetch + normalization layer
    db.ts                  Prisma client
    database/              Prisma query helpers
    playerStatComp.ts      Player comparison logic
    proTeamComp.ts         Club comparison logic
    colorCoding.ts         Shared color/rating helpers
    format.ts              Formatting helpers
prisma/
  schema.prisma            Database schema
  migrations/              Prisma migrations
  seed.ts                  Seed script
public/
  club-comps/              Club comparison assets
  player-comps/            Player comparison assets
```

## Environment Variables

Copy `.env.example` and provide real database credentials.

Required:

- `DATABASE_URL` - pooled PostgreSQL connection for Prisma Client
- `DIRECT_URL` - direct PostgreSQL connection for Prisma migrations

Optional:

- `EA_PLATFORM` - default EA platform, defaults to `common-gen5`
- `EA_API_BASE_URL` - override for the EA Pro Clubs API base URL

Recommended local setup:

```bash
cp .env.example .env
```

Then replace the placeholder values with your real PostgreSQL credentials.

## Installation

```bash
npm install
```

## Local Development

Start the app:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Useful scripts:

```bash
npm run build
npm run preview
npm run db:test
npm run prisma:generate
npm run prisma:migrate
npm run prisma:studio
npm run prisma:seed
```

## Database Setup

1. Add `DATABASE_URL` and `DIRECT_URL`
2. Generate the Prisma client:

```bash
npm run prisma:generate
```

3. Run migrations:

```bash
npm run prisma:migrate
```

4. Optionally verify connectivity:

```bash
npm run db:test
```

## Product Notes

- Search supports clubs and players
- Leaderboards support club and player ranking views with filters and sorting
- Compare supports club-vs-club and player-vs-player workflows
- Club and player profile pages include analytics beyond the default EA presentation
- The UI is responsive and designed to work cleanly on mobile as well as larger screens

## Production Readiness

Before deploying:

- provide real database environment variables
- run `npm run build`
- verify live EA connectivity for the target environment
- confirm route coverage for homepage, search, club, player, leaderboards, compare, and patches

## Deploying to Vercel

ProClubsHQ deploys to Vercel as a Next.js app.

- Framework preset: `Next.js`
- Build command: `npm run build`
- Install command: `npm install`
- Preview locally: `npm run preview`
- Output directory: use Vercel's default Next.js output handling

Notes:

- Do not configure this project as a Vite static build
- Do not set `dist` as the output directory
- No SPA rewrite `vercel.json` is needed for route refreshes because Next.js handles routing natively
- Add `DATABASE_URL` and `DIRECT_URL` in the Vercel project environment variables before deploying

## Disclaimer

ProClubsHQ is an independent project and is not affiliated with or endorsed by Electronic Arts. EA Sports FC names, assets, and related trademarks belong to their respective owners.
