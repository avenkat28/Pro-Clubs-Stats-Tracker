import { StatLabel } from "./StatIcon";

type SearchResultCardProps = {
  type: "player" | "club";
  title: string;
  subtitle: string;
  meta: string;
  href: string;
  statLabel: string;
  statValue: string | number;
  statClassName?: string;
  statContainerClassName?: string;
};

export default function SearchResultCard({
  type,
  title,
  subtitle,
  meta,
  href,
  statLabel,
  statValue,
  statClassName,
  statContainerClassName,
}: SearchResultCardProps) {
  return (
    <a
      href={href}
      className="app-surface block p-5 text-white transition hover:border-emerald-300/35 hover:bg-white/[0.05]"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300/75">
            {type}
          </p>

          <h3 className="text-[1.6rem] font-semibold tracking-[-0.03em]">
            {title}
          </h3>

          <p className="mt-1 text-white/55">{subtitle}</p>
          <p className="mt-1 text-sm text-white/40">{meta}</p>
        </div>

        <div
          className={`rounded-xl border border-white/8 bg-black/30 px-4 py-3 text-right md:min-w-36 ${statContainerClassName ?? ""}`}
        >
          <p className="text-xs text-white/45">
            <StatLabel label={statLabel} className="justify-end" />
          </p>
          <p className={`text-xl font-semibold ${statClassName ?? "text-emerald-300"}`}>
            {statValue}
          </p>
        </div>
      </div>
    </a>
  );
}
