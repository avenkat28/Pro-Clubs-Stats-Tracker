import { StatLabel } from "./StatIcon";

type StatCardProps = {
  label: string;
  value: string;
};

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="home-stat-card min-w-[13rem] rounded-[1.35rem] border border-white/7 bg-[#090d0c]/62 px-4 py-3.5 text-white shadow-[0_10px_28px_rgba(0,0,0,0.12)]">
      <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-white/38">
        Snapshot
      </p>
      <p className="mt-1.5 text-sm font-medium text-white/58">
        <StatLabel label={label} iconClassName="h-3.5 w-3.5" />
      </p>
      <p className="mt-2.5 text-[1.9rem] font-semibold tracking-[-0.04em] text-white">
        {value}
      </p>
    </div>
  );
}
