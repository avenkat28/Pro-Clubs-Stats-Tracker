import { StatLabel } from "./StatIcon";

type StatCardProps = {
  label: string;
  value: string;
};

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-lg border border-white/10 bg-[#080b0a] p-5 text-white">
      <p className="text-sm text-white/50">
        <StatLabel label={label} />
      </p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </div>
  );
}
