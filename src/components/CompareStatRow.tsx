import { StatLabel } from "./StatIcon";

type CompareStatRowProps = {
  label: string;
  leftValue: string | number;
  rightValue: string | number;
  leftScore: number;
  rightScore: number;
  lowerIsBetter?: boolean;
};

export default function CompareStatRow({
  label,
  leftValue,
  rightValue,
  leftScore,
  rightScore,
  lowerIsBetter = false,
}: CompareStatRowProps) {
  const leftWins = lowerIsBetter
    ? leftScore < rightScore
    : leftScore > rightScore;
  const rightWins = lowerIsBetter
    ? rightScore < leftScore
    : rightScore > leftScore;

  return (
    <tr className="group border-b border-white/5 transition hover:bg-blue-600/10">
      <td
        className={`px-4 py-4 text-left font-black transition ${
          leftWins
            ? "text-green-400 shadow-[inset_4px_0_0_rgba(34,197,94,0.9)]"
            : rightWins
              ? "text-red-400"
              : "text-white"
        }`}
      >
        <span className={leftWins ? "drop-shadow-[0_0_10px_rgba(34,197,94,0.45)]" : ""}>
          {leftValue}
        </span>
      </td>
      <td className="px-4 py-4 text-center text-xs font-black uppercase tracking-[0.16em] text-gray-500">
        <StatLabel label={label} className="justify-center" />
      </td>
      <td
        className={`px-4 py-4 text-right font-black transition ${
          rightWins
            ? "text-green-400 shadow-[inset_-4px_0_0_rgba(34,197,94,0.9)]"
            : leftWins
              ? "text-red-400"
              : "text-white"
        }`}
      >
        <span className={rightWins ? "drop-shadow-[0_0_10px_rgba(34,197,94,0.45)]" : ""}>
          {rightValue}
        </span>
      </td>
    </tr>
  );
}
