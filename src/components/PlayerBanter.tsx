import type { EaSquadMember } from "../lib/ea";

type PlayerBanterProps = {
  players: EaSquadMember[];
};

type BanterCard = {
  badge: string;
  player: string;
  joke: string;
  tone: "good" | "chaos" | "roast";
};

function perMatch(total: number, matches: number) {
  return matches > 0 ? total / matches : 0;
}

export default function PlayerBanter({ players }: PlayerBanterProps) {
  const regulars = players.filter((player) => player.matches >= 3);

  if (regulars.length === 0) return null;

  const bestRated = regulars.slice().sort((a, b) => b.rating - a.rating)[0];
  const topScorer = regulars
    .slice()
    .sort((a, b) => perMatch(b.goals, b.matches) - perMatch(a.goals, a.matches))[0];
  const assistKing = regulars
    .slice()
    .sort((a, b) => perMatch(b.assists, b.matches) - perMatch(a.assists, a.matches))[0];
  const lowestRated = regulars.slice().sort((a, b) => a.rating - b.rating)[0];
  const cardCollector = regulars.slice().sort((a, b) => b.redCards - a.redCards)[0];

  const cards: BanterCard[] = [
    {
      badge: "Carries the group chat",
      player: bestRated.name,
      joke: `${bestRated.rating.toFixed(1)} average rating. Apparently the controller works better in their hands.`,
      tone: "good",
    },
    {
      badge: "Certified goal merchant",
      player: topScorer.name,
      joke: `${topScorer.goals} goals in ${topScorer.matches} matches. Passing is optional when the net is right there.`,
      tone: "good",
    },
    {
      badge: "Actually sees the pass",
      player: assistKing.name,
      joke: `${assistKing.assists} assists. The rare teammate who looked up before pressing a button.`,
      tone: "chaos",
    },
    {
      badge: "Controller inspection required",
      player: lowestRated.name,
      joke: `${lowestRated.rating.toFixed(1)} average rating. We are blaming lag until further notice.`,
      tone: "roast",
    },
  ];

  if (cardCollector.redCards > 0) {
    cards.push({
      badge: "Early shower specialist",
      player: cardCollector.name,
      joke: `${cardCollector.redCards} red card${cardCollector.redCards === 1 ? "" : "s"}. Defending the badge from the dressing room.`,
      tone: "roast",
    });
  }

  return (
    <section className="rounded-[1.25rem] border border-fuchsia-300/12 bg-[#100812]/80 p-5 text-white shadow-[0_18px_44px_rgba(0,0,0,0.18)] sm:p-6">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-fuchsia-300/65">
          Stat-backed nonsense
        </p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Squad Banter Board</h2>
        <p className="mt-2 text-sm leading-6 text-white/48">
          Praise and friendly roasts generated from the club&apos;s actual numbers. No friendships were consulted.
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => (
          <article
            key={`${card.badge}-${card.player}-${index}`}
            className={`rounded-2xl border p-4 ${
              card.tone === "good"
                ? "border-emerald-300/16 bg-emerald-300/[0.06]"
                : card.tone === "roast"
                  ? "border-rose-300/16 bg-rose-300/[0.06]"
                  : "border-fuchsia-300/16 bg-fuchsia-300/[0.06]"
            }`}
          >
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/38">{card.badge}</p>
            <h3 className="mt-2 text-lg font-black text-white">{card.player}</h3>
            <p className="mt-2 text-sm leading-6 text-white/56">{card.joke}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
