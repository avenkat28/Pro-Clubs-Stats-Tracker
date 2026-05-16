import { StatLabel } from "./StatIcon";

type FeatureCardProps = {
  eyebrow: string;
  statLabel: string;
  title: string;
  description: string;
};

export default function FeatureCard({
  eyebrow,
  statLabel,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="home-feature-card flex h-full min-h-[13.2rem] flex-col rounded-[1.5rem] border border-white/7 bg-[#090d0c]/58 px-5 py-4.5 text-white shadow-[0_12px_28px_rgba(0,0,0,0.11)]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-emerald-300/74">
          {eyebrow}
        </p>
        <span className="text-xs font-medium text-white/44">
          <StatLabel label={statLabel} iconClassName="h-3.5 w-3.5" />
        </span>
      </div>
      <h3 className="mt-4 max-w-[16rem] text-[1.85rem] font-semibold leading-[1.02] tracking-[-0.04em] text-white xl:text-[2rem]">
        {title}
      </h3>
      <p className="mt-3 max-w-[24rem] text-[0.98rem] leading-7 text-white/58">
        {description}
      </p>
    </div>
  );
}
