import { StatLabel } from "./StatIcon";

type StatCardProps = {
  label: string;
  value: string;
};

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/12 bg-black/42 p-6 text-white shadow-[0_18px_55px_rgba(0,0,0,0.28)] backdrop-blur-md">
      <p className="text-sm text-white/58">
        <StatLabel label={label} />
      </p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}
