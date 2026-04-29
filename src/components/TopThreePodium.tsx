import type { TopClub, TopPlayer } from "../lib/mockData";
import type { LeaderboardTab } from "./LeaderboardTabs";

type TopThreePodiumProps = {
  activeTab: LeaderboardTab;
  players: TopPlayer[];
  clubs: TopClub[];
};

const podiumStyles = [
  {
    label: "#1",
    medal: "Gold",
    className: "border-yellow-300/40 bg-yellow-300/10 shadow-yellow-500/10",
    badgeClassName: "bg-yellow-300 text-black",
  },
  {
    label: "#2",
    medal: "Silver",
    className: "border-slate-200/30 bg-slate-200/10 shadow-slate-300/10",
    badgeClassName: "bg-slate-200 text-black",
  },
  {
    label: "#3",
    medal: "Bronze",
    className: "border-orange-400/40 bg-orange-400/10 shadow-orange-500/10",
    badgeClassName: "bg-orange-400 text-black",
  },
];

export default function TopThreePodium({
  activeTab,
  players,
  clubs,
}: TopThreePodiumProps) {
  const items = activeTab === "players" ? players.slice(0, 3) : clubs.slice(0, 3);

  return (
    <section className="grid gap-4 lg:grid-cols-3">
      {items.map((item, index) => {
        const style = podiumStyles[index];
        const href =
          activeTab === "players" ? `/player/${item.id}` : `/club/${item.id}`;
        const detail =
          activeTab === "players"
            ? `${(item as TopPlayer).position} / ${(item as TopPlayer).club}`
            : (item as TopClub).division;
        const primaryStat =
          activeTab === "players"
            ? `${(item as TopPlayer).rating.toFixed(1)} AVG`
            : `${(item as TopClub).skillRating} SR`;

        return (
          <a
            key={item.id}
            href={href}
            className={`group rounded-xl border p-5 shadow-2xl transition hover:-translate-y-1 hover:border-blue-400/60 hover:shadow-blue-600/20 ${style.className}`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`rounded-full px-3 py-1 text-xs font-black ${style.badgeClassName} animate-pulse`}
              >
                {style.label}
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                {style.medal}
              </span>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-black text-white transition group-hover:text-blue-200">
                {item.name}
              </h2>
              <p className="mt-2 text-sm font-medium text-gray-400">{detail}</p>
            </div>

            <div className="mt-6 flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
                  Form Index
                </p>
                <p className="mt-1 text-2xl font-black text-green-400">
                  {primaryStat}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-right">
                <p className="text-xs text-gray-500">Platform</p>
                <p className="text-sm font-bold text-white">{item.platform}</p>
              </div>
            </div>
          </a>
        );
      })}
    </section>
  );
}
