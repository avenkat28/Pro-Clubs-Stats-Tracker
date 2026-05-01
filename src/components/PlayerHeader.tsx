import { capitalizeWords } from "../lib/format";

type PlayerHeaderProps = {
  name: string;
  club: string;
  position: string;
  platform: string;
  overall?: number;
};

export default function PlayerHeader({
  name,
  club,
  position,
  platform,
  overall,
}: PlayerHeaderProps) {
  const metaItems = [
    capitalizeWords(position),
    club,
    overall && overall > 0 ? `OVR ${overall}` : null,
  ].filter(Boolean);

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-8 text-white">
      <p className="text-sm text-blue-400">{platform}</p>

      <div className="mt-3">
        <h1 className="text-5xl font-bold">{name}</h1>
        <p className="mt-2 text-gray-400">
          {metaItems.join(" • ")}
        </p>
      </div>
    </section>
  );
}
