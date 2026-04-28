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
  return (
    <tr className="border-b border-white/10 text-white">
      <td className="py-4 font-semibold">{name}</td>
      <td className="py-4 text-gray-400">{position}</td>
      <td className="py-4">{matches}</td>
      <td className="py-4">{goals}</td>
      <td className="py-4">{assists}</td>
      <td className="py-4 font-bold text-blue-400">{rating}</td>
    </tr>
  );
}