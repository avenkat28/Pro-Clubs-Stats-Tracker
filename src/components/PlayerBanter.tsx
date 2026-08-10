import type { EaSquadMember } from "../lib/ea";

type PlayerBanterProps = {
  players: EaSquadMember[];
  club: {
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
  };
};

type Characteristic = {
  badge: string;
  joke: string;
  tone: "good" | "chaos" | "roast";
};

function perMatch(total: number, matches: number) {
  return matches > 0 ? total / matches : 0;
}

function getCharacteristic(player: EaSquadMember): Characteristic {
  const goalsPerMatch = perMatch(player.goals, player.matches);
  const assistsPerMatch = perMatch(player.assists, player.matches);
  const tacklesPerMatch = perMatch(player.tackles, player.matches);

  const options: Array<Characteristic & { score: number }> = [
    {
      badge: "Goal Merchant",
      joke: `${player.goals} goals in ${player.matches} matches. Sees the net, forgets teammates exist.`,
      tone: "good",
      score: goalsPerMatch / 0.8,
    },
    {
      badge: "Assist Addict",
      joke: `${player.assists} assists. Does all the cooking and lets somebody else plate the meal.`,
      tone: "good",
      score: assistsPerMatch / 0.65,
    },
    {
      badge: "Midfield Hoover",
      joke: `${player.tackles} tackles. If the ball is loose, this player has already filed a claim for it.`,
      tone: "good",
      score: tacklesPerMatch / 3,
    },
    {
      badge: "Pass Button Enjoyer",
      joke: `${player.passAccuracy}% pass accuracy. Shockingly aware this is a team sport.`,
      tone: "good",
      score: player.passAccuracy / 88,
    },
    {
      badge: "Main Character",
      joke: `${player.manOfTheMatch} MOTM awards and a ${player.rating.toFixed(1)} rating. The group chat probably hears about every one.`,
      tone: "good",
      score: player.rating / 8.4 + perMatch(player.manOfTheMatch, player.matches),
    },
    {
      badge: "Early Shower Specialist",
      joke: `${player.redCards} red card${player.redCards === 1 ? "" : "s"}. Elite pace when walking toward the tunnel.`,
      tone: "roast",
      score: player.redCards > 0 ? 1.15 + perMatch(player.redCards, player.matches) * 5 : 0,
    },
  ];

  const strongest = options.sort((left, right) => right.score - left.score)[0];

  if (player.rating > 0 && player.rating < 6.2) {
    return {
      badge: "Shit Happens Award",
      joke: `${player.rating.toFixed(1)} average rating. Maybe it is lag. Maybe the controller is upside down.`,
      tone: "roast",
    };
  }

  if (strongest.score >= 0.72) return strongest;

  if (player.matches >= 50) {
    return {
      badge: "Reliable Session Merchant",
      joke: `${player.matches} appearances. Not always spectacular, but somehow online every single night.`,
      tone: "chaos",
    };
  }

  return {
    badge: "Mystery Box",
    joke: `${player.matches} appearances and still no obvious specialty. Could be secretly brilliant; could be excellent at choosing kits.`,
    tone: "chaos",
  };
}

function getClubVerdict(club: PlayerBanterProps["club"]) {
  const matches = club.wins + club.draws + club.losses;
  const winRate = matches > 0 ? Math.round((club.wins / matches) * 100) : 0;
  const goalDifference = club.goalsFor - club.goalsAgainst;

  if (winRate >= 65 && goalDifference > 0) {
    return `This club wins ${winRate}% of its matches with a ${goalDifference > 0 ? "+" : ""}${goalDifference} goal difference. Annoyingly good—and probably unbearable after one clean build-up goal.`;
  }

  if (winRate >= 48) {
    return `A ${winRate}% win rate: dangerous on the right night, a tactical investigation on the wrong one. Every session is a coin flip with custom kits.`;
  }

  if (goalDifference < 0) {
    return `${winRate}% wins and a ${goalDifference} goal difference. The vibes may be elite; the defending has requested anonymity.`;
  }

  return `${winRate}% wins with an even-ish goal margin. Not shit, not terrifying—perfectly engineered to argue about whose fault the draw was.`;
}

export default function PlayerBanter({ players, club }: PlayerBanterProps) {
  const visiblePlayers = players.filter(
    (player) => player.name !== "Unknown" && player.matches > 0,
  );

  if (visiblePlayers.length === 0) return null;

  return (
    <section className="rounded-[1.25rem] border border-fuchsia-300/12 bg-[#100812]/80 p-5 text-white shadow-[0_18px_44px_rgba(0,0,0,0.18)] sm:p-6">
      <p className="text-[11px] font-black uppercase tracking-[0.22em] text-fuchsia-300/65">Stat-backed nonsense</p>
      <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Squad Banter Board</h2>
      <p className="mt-2 text-sm leading-6 text-white/48">Every player gets one special characteristic from their actual stats—praise when earned, slander when necessary.</p>

      <div className="mt-5 rounded-2xl border border-amber-300/18 bg-amber-300/[0.06] p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-200/55">Whole-club verdict</p>
        <p className="mt-2 text-base font-semibold leading-7 text-white/78">{getClubVerdict(club)}</p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {visiblePlayers.map((player) => {
          const characteristic = getCharacteristic(player);

          return (
            <article
              key={player.id}
              className={`rounded-2xl border p-4 ${
                characteristic.tone === "good"
                  ? "border-emerald-300/16 bg-emerald-300/[0.06]"
                  : characteristic.tone === "roast"
                    ? "border-rose-300/16 bg-rose-300/[0.06]"
                    : "border-fuchsia-300/16 bg-fuchsia-300/[0.06]"
              }`}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/38">{characteristic.badge}</p>
              <h3 className="mt-2 text-lg font-black text-white">{player.name}</h3>
              <p className="mt-2 text-sm leading-6 text-white/56">{characteristic.joke}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
