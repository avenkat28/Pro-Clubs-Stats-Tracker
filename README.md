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
