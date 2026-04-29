# Pro-Clubs-Stats-Tracker
by Arya Venkat and Safwan Rahman

EA Sports FC 26 Pro Clubs advanced stats tracker built with Next.js, TypeScript, PostgreSQL, and Prisma. Tracks clubs and players, stores stat snapshots over time, and provides analytics, leaderboards, form trends, performance ratings, comparisons, and real-time squad insights beyond the official EA Clubs stats.

## Live EA club profile setup

The club page now fetches live data from the public Pro Clubs endpoint family at `https://proclubs.ea.com/api/fc`.

1. Copy `.env.example` to `.env.local`.
2. Keep `EA_PLATFORM=common-gen5` for current-gen clubs, or switch it if you want another platform.
3. Run `npm run dev` and open `/club/<clubId>`.

Useful endpoints now wired into the app:

- `GET /api/ea/clubs/:clubId`
- `GET https://proclubs.ea.com/api/fc/clubs/info?platform=common-gen5&clubIds=:clubId`
- `GET https://proclubs.ea.com/api/fc/clubs/overallStats?platform=common-gen5&clubIds=:clubId`
- `GET https://proclubs.ea.com/api/fc/members/stats?platform=common-gen5&clubId=:clubId`

## Database setup

The app uses Prisma with PostgreSQL. For Supabase, use the pooled connection URL for normal app queries and the direct connection URL for Prisma migrations.

1. Copy `.env.example` to `.env`.
2. Replace `YOUR-PASSWORD` and `PROJECT_REF` with the values from your Supabase project.
3. Keep real credentials only in `.env`. Do not commit `.env`.
4. Test the connection:

```bash
npm run db:test
```

Expected output:

```text
DB connected successfully
```

5. Generate Prisma Client:

```bash
npm run prisma:generate
```

6. Run migrations:

```bash
npm run prisma:migrate
```

7. Optional: open Prisma Studio to inspect the database:

```bash
npm run prisma:studio
```

## Prisma scripts

- `npm run db:test` checks that Prisma can connect to the configured database.
- `npm run prisma:generate` regenerates Prisma Client.
- `npm run prisma:migrate` applies schema migrations during development.
- `npm run prisma:studio` opens Prisma Studio.
- `npm run prisma:seed` seeds development data from `prisma/seed.ts`.
