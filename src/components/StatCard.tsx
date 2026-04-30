import { StatLabel } from "./StatIcon";

type StatCardProps = {
  label: string;
  value: string;
};

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white">
      <p className="text-sm text-gray-400">
        <StatLabel label={label} />
      </p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}
