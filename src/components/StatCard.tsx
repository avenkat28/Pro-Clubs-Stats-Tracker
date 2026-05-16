import { StatLabel } from "./StatIcon";

type StatCardProps = {
  label: string;
  value: string;
};

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="home-stat-card rounded-lg border border-emerald-300/12 bg-[#080b0a]/92 p-5 text-white shadow-[0_18px_45px_rgba(0,0,0,0.22)] ring-1 ring-white/[0.03] backdrop-blur">
      <p className="text-sm font-semibold text-white/52">
        <StatLabel label={label} />
      </p>
      <p className="mt-4 text-3xl font-black tracking-tight text-white">
        {value}
      </p>
    </div>
  );
}
