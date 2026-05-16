import type { TopClub, TopPlayer } from "../lib/mockData";
import { skillRatingTextClassName } from "../lib/colorCoding";
import type { LeaderboardTab } from "./LeaderboardTabs";
import { StatLabel } from "./StatIcon";

type LeaderboardRowProps =
  | {
      activeTab: "players";
      item: TopPlayer;
      displayRank: number;
    }
  | {
      activeTab: "clubs";
      item: TopClub;
      displayRank: number;
    };

function rankClassName(rank: number) {
  if (rank === 1) {
    return "bg-yellow-300 text-black shadow-yellow-300/30";
  }

  if (rank === 2) {
    return "bg-slate-200 text-black shadow-slate-200/30";
  }

  if (rank === 3) {
    return "bg-orange-400 text-black shadow-orange-400/30";
  }

  return "bg-white/10 text-white shadow-blue-600/10";
}

function RankBadge({ rank }: { rank: number }) {
  return (
    <span
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-black shadow-lg transition group-hover:scale-110 ${rankClassName(rank)}`}
    >
      {rank}
    </span>
  );
}

function winRate(wins: number, games: number) {
  if (games <= 0) {
    return 0;
  }

  return Math.round((wins / games) * 100);
}

function platformQueryValue(platform: string) {
  if (platform === "Old Gen") {
    return "common-gen4";
  }

  if (platform === "Switch") {
    return "nx";
  }

  return "common-gen5";
}

export default function LeaderboardRow(props: LeaderboardRowProps) {
  const href =
    props.activeTab === "players"
      ? `/player/${encodeURIComponent(props.item.id)}${
          props.item.clubId
            ? `?clubId=${encodeURIComponent(props.item.clubId)}&platform=${platformQueryValue(
                props.item.platform,
              )}`
            : ""
        }`
      : `/club/${props.item.id}?platform=${platformQueryValue(props.item.platform)}`;

  if (props.activeTab === "players") {
    const player = props.item;
    const contributions = player.goals + player.assists;

    return (
      <tr
        onClick={() => {
          window.location.href = href;
        }}
        className="group cursor-pointer border-b border-white/5 transition hover:bg-blue-600/10 hover:shadow-[0_0_28px_rgba(37,99,235,0.18)]"
      >
        <td className="px-4 py-4">
          <RankBadge rank={props.displayRank} />
        </td>
        <td className="px-4 py-4">
          <div>
            <p className="font-bold text-white group-hover:text-blue-200">
              {player.name}
            </p>
            <p className="text-xs text-gray-500">
              {player.platform} / {player.region}
            </p>
          </div>
        </td>
        <td className="px-4 py-4 text-gray-300">{player.club}</td>
        <td className="px-4 py-4">
          <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs font-bold text-blue-300">
            {player.position}
          </span>
        </td>
        <td className="px-4 py-4 text-gray-300">{player.games}</td>
        <td className="px-4 py-4 font-bold text-green-400">{player.goals}</td>
        <td className="px-4 py-4 font-bold text-green-400">
          {player.assists}
        </td>
        <td className="px-4 py-4 font-black text-white">{contributions}</td>
        <td className="px-4 py-4 font-black text-blue-300">
          {player.rating.toFixed(1)}
        </td>
        <td className="px-4 py-4 font-bold text-green-400">
          {player.winRate}%
        </td>
        <td className="px-4 py-4 font-bold text-red-400">{player.redCards}</td>
      </tr>
    );
  }

  const club = props.item;
  const clubWinRate = winRate(club.wins, club.games);
  const skillRatingTone = skillRatingTextClassName(club.skillRating);

  return (
    <tr
      onClick={() => {
        window.location.href = href;
      }}
      className="group cursor-pointer border-b border-white/5 transition hover:bg-blue-600/10 hover:shadow-[0_0_28px_rgba(37,99,235,0.18)]"
    >
      <td className="px-4 py-4">
        <RankBadge rank={props.displayRank} />
      </td>
      <td className="px-4 py-4">
        <div>
          <p className="font-bold text-white group-hover:text-blue-200">
            {club.name}
          </p>
          <p className="text-xs text-gray-500">
            {club.platform} / {club.region}
          </p>
        </div>
      </td>
      <td className="px-4 py-4 text-gray-300">{club.division}</td>
      <td className="px-4 py-4 text-gray-300">{club.games}</td>
      <td className="px-4 py-4 font-bold text-green-400">{club.wins}</td>
      <td className="px-4 py-4 text-gray-300">{club.draws}</td>
      <td className="px-4 py-4 font-bold text-red-400">{club.losses}</td>
      <td className="px-4 py-4 font-bold text-green-400">{club.goalsFor}</td>
      <td className="px-4 py-4 font-bold text-red-400">{club.goalsAgainst}</td>
      <td className={`px-4 py-4 font-black ${skillRatingTone}`}>
        {club.skillRating}
      </td>
      <td className="px-4 py-4 font-bold text-green-400">{clubWinRate}%</td>
    </tr>
  );
}

export function MobileLeaderboardCard({
  activeTab,
  item,
  displayRank,
}: {
  activeTab: LeaderboardTab;
  item: TopPlayer | TopClub;
  displayRank: number;
}) {
  const href =
    activeTab === "players"
      ? `/player/${encodeURIComponent(item.id)}${
          (item as TopPlayer).clubId
            ? `?clubId=${encodeURIComponent(
                (item as TopPlayer).clubId ?? "",
              )}&platform=${platformQueryValue(item.platform)}`
            : ""
        }`
      : `/club/${item.id}?platform=${platformQueryValue(item.platform)}`;

  if (activeTab === "players") {
    const player = item as TopPlayer;
    const contributions = player.goals + player.assists;

    return (
      <a
        href={href}
        className="group rounded-xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-blue-400/60 hover:bg-blue-600/10 hover:shadow-2xl hover:shadow-blue-600/20"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <RankBadge rank={displayRank} />
            <div>
              <h3 className="font-black text-white group-hover:text-blue-200">
                {player.name}
              </h3>
              <p className="text-sm text-gray-400">
                {player.position} / {player.club}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Rating</p>
            <p className="text-xl font-black text-blue-300">
              {player.rating.toFixed(1)}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2 text-center">
          <StatPill label="G" value={player.goals} tone="green" />
          <StatPill label="A" value={player.assists} tone="green" />
          <StatPill label="G/A" value={contributions} />
          <StatPill label="Win" value={`${player.winRate}%`} tone="green" />
        </div>
      </a>
    );
  }

  const club = item as TopClub;
  const skillRatingTone = skillRatingTextClassName(club.skillRating);

  return (
    <a
      href={href}
      className="group rounded-xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-blue-400/60 hover:bg-blue-600/10 hover:shadow-2xl hover:shadow-blue-600/20"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <RankBadge rank={displayRank} />
          <div>
            <h3 className="font-black text-white group-hover:text-blue-200">
              {club.name}
            </h3>
            <p className="text-sm text-gray-400">{club.division}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Skill</p>
          <p className={`text-xl font-black ${skillRatingTone}`}>{club.skillRating}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 text-center">
        <StatPill label="W" value={club.wins} tone="green" />
        <StatPill label="D" value={club.draws} />
        <StatPill label="L" value={club.losses} tone="red" />
        <StatPill label="Win" value={`${winRate(club.wins, club.games)}%`} tone="green" />
      </div>
    </a>
  );
}

function StatPill({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string | number;
  tone?: "default" | "green" | "red";
}) {
  const valueClassName =
    tone === "green"
      ? "text-green-400"
      : tone === "red"
        ? "text-red-400"
        : "text-white";

  return (
    <div className="rounded-xl border border-white/10 bg-black/30 px-2 py-2">
      <p className="text-xs text-gray-500">
        <StatLabel label={label} iconClassName="h-3.5 w-3.5" />
      </p>
      <p className={`text-sm font-black ${valueClassName}`}>{value}</p>
    </div>
  );
}
