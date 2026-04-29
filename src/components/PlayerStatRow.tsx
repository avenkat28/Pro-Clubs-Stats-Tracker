type PlayerStatRowProps = {
  name: string;
  position: string;
  matches: number;
  goals: number;
  assists: number;
  rating: number;
};

export default function PlayerStatRow({
  name,
  position,
  matches,
  goals,
  assists,
  rating,
}: PlayerStatRowProps) {
  const ratingTone =
    rating >= 8 ? "text-emerald-400" : rating >= 7 ? "text-amber-300" : "text-blue-400";

  return (
    <tr className="border-b border-white/8 text-white transition hover:bg-white/[0.03]">
      <td className="py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.45),_rgba(255,255,255,0.02))] text-xs font-black uppercase text-white/85">
            {name.slice(0, 2)}
          </div>
          <span className="font-semibold">{name}</span>
        </div>
      </td>
      <td className="py-4 text-white/55">{position}</td>
      <td className="py-4 text-right">{matches}</td>
      <td className="py-4 text-right">{goals}</td>
      <td className="py-4 text-right">{assists}</td>
      <td className={`py-4 text-right font-bold ${ratingTone}`}>{rating}</td>
    </tr>
  );
}
