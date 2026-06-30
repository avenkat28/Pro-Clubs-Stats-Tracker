import Navbar from "../../components/Navbar";

const updates = [
  {
    version: "1.3.1",
    date: "June 30, 2026",
    title: "Live stats resilience",
    notes: [
      "Added compatibility routes for live club data refreshes.",
      "Made optional EA lookups less likely to block a club profile load.",
      "Polished the club profile panels and squad table for easier scanning.",
    ],
  },
  {
    version: "1.3.0",
    date: "May 16, 2026",
    title: "Club-scoped compare",
    notes: [
      "Compare player selectors now stay scoped to the club or clubs you load.",
      "Added a dedicated patches and update notes page.",
      "Tightened security headers in the active Next configuration.",
    ],
  },
  {
    version: "1.2.0",
    date: "April 29, 2026",
    title: "Live EA profiles",
    notes: [
      "Added live club profiles, squad stats, and player detail pages.",
      "Improved platform switching for current gen, last gen, and Switch.",
      "Added safer EA query normalization for live data requests.",
    ],
  },
  {
    version: "1.1.0",
    date: "April 2026",
    title: "Leaderboards and search",
    notes: [
      "Launched live leaderboard views for clubs and players.",
      "Added club search with direct club ID lookup.",
      "Refined table layouts for scanning on desktop and mobile.",
    ],
  },
];

export default function PatchesPage() {
  return (
    <main className="min-h-screen bg-[#050706] text-white">
      <Navbar />

      <section className="app-page-shell">
        <div className="app-page-header border-b border-white/10 pb-7">
          <p className="app-page-eyebrow">
            Patches
          </p>
          <h1 className="app-page-title max-w-3xl">
            Updates and release notes
          </h1>
          <p className="app-page-copy max-w-2xl">
            Follow improvements to ProClubsHQ, including data fixes, compare
            changes, security hardening, and quality-of-life updates.
          </p>
        </div>

        <div className="grid gap-4">
          {updates.map((update) => (
            <article
              key={update.version}
              className="app-surface p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300/75">
                    Version {update.version}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    {update.title}
                  </h2>
                </div>
                <time className="rounded-md border border-white/10 bg-black/35 px-3 py-2 text-sm font-semibold text-white/55">
                  {update.date}
                </time>
              </div>

              <ul className="mt-5 grid gap-2 text-sm text-white/68">
                {update.notes.map((note) => (
                  <li
                    key={note}
                    className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-2"
                  >
                    {note}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
