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
    <tr className="group border-b border-white/5 transition hover:bg-white/[0.035]">
      <td
        className={`px-4 py-3.5 text-left font-semibold transition ${
          leftWins
            ? "text-emerald-300 shadow-[inset_3px_0_0_rgba(110,231,183,0.85)]"
            : rightWins
              ? "text-white/45"
              : "text-white"
        }`}
      >
        <span>{leftValue}</span>
      </td>
      <td className="px-4 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.12em] text-white/45">
        <StatLabel label={label} className="justify-center" />
      </td>
      <td
        className={`px-4 py-3.5 text-right font-semibold transition ${
          rightWins
            ? "text-emerald-300 shadow-[inset_-3px_0_0_rgba(110,231,183,0.85)]"
            : leftWins
              ? "text-white/45"
              : "text-white"
        }`}
      >
        <span>{rightValue}</span>
      </td>
    </tr>
  );
}
