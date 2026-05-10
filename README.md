# Pro Clubs Stats Tracker
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

## Stat comp features

The app includes deterministic real-life comparison features for clubs and players.
These are stat-profile comps, not exact playstyle comps. The comp logic only uses
stats available from the current app and EA feeds. It does not use possession,
passing volume, pass accuracy, xG, xA, dribbling, pace, heatmaps, or shot data.

### Pro Team Comp

Club pages call `getProTeamComp` from `src/lib/proTeamComp.ts` and display the
result with `src/components/ProTeamCompCard.tsx`.

The team comp uses record, goals for, goals against, goal difference, clean sheets,
form when available, player goal-contribution distribution when available, tackles,
tackle success, and red cards. It returns primary and secondary real-life club comps,
a style label, explanation, category scores, tiers, and reasons.

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

Player pages call `getPlayerStatComp` from `src/lib/playerStatComp.ts` and display
the result with `src/components/PlayerStatCompCard.tsx`.

The player comp uses games, goals, assists, G/A, goals per game, assists per game,
G/A per game, overall, average rating, win rate, tackles, tackle success, MOTM,
red cards, recent-match form when available, and position when available. Overall
is treated as a quality-tier signal, so elite-overall players are compared more
often to elite real-life profiles while lower-overall players can land on breakout
or emerging comps with similar production. Recent-match form
compares the player's last available ratings and G/A against their season profile,
so hot streaks and slumps can affect both the comp score and reasoning. Position is
used as a real-life role fit, so ST, LW, RW, CAM, CM, CDM, fullback, CB, and GK
profiles are compared against players who actually play similar roles. This avoids
bad matches such as defenders receiving attacker comps, and central strikers with a
heavy goal bias being compared to wide forwards.

The player comp algorithm also changes comparison lanes after goal-volume
thresholds. Around 20 goals it starts boosting productive scorer/hybrid comps,
around 40 goals it shifts toward high-volume scorers, around 75 goals it heavily
prefers elite finishers, and around 120 goals it favors legendary volume scorer
profiles. Goals per game can also push a player into a higher lane for shorter
sample sizes.

Player comp images live in:

```text
public/player-comps/
```

Expected player image filenames:

```text
lionel-messi.png
alexander-isak.png
antoine-semenyo.png
arturo-vidal.png
bruno-fernandes.png
bryan-mbeumo.png
bukayo-saka.png
cole palmer.png
cristiano-ronaldo.png
neymar.png
kylian-mbappe.png
erling-haaland.png
harry-kane.png
robert-lewandowski.png
mohamed-salah.png
kevin-de-bruyne.png
martin-odegaard.png
thomas-muller.png
jude-bellingham.png
vinicius-jr.png
son-heung-min.png
antoine-griezmann.png
trent-alexander-arnold.png
ngolo-kante.png
declan-rice.png
rodri.png
casemiro.png
virgil-van-dijk.png
ruben-dias.png
sergio-ramos.png
federico-valverde.png
steven-gerrard.png
frank-lampard.png
yaya-toure.png
florian-wirtz.png
gianluigi-donnarumma.png
igor-thiago.png
joao-cancelo.png
joao-pedro.png
julian-alvarez.png
nico-oreilly.png
omar-marmoush.png
rayan-cherki.png
viktor-gyokeres.png
fallback.png
```

If a player image is missing or fails to load, the UI falls back to
`public/player-comps/fallback.png`.

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

## Data & Attribution Disclaimer

This project is licensed under the MIT License.
However, all data, names, logos, and trademarks related to EA Sports and EA FC are the property of their respective owners.

This project is for educational and non-commercial purposes only and is not affiliated with or endorsed by Electronic Arts.
