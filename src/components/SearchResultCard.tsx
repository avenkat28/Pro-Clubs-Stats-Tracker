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
      className="block rounded-lg border border-white/10 bg-[#080b0a] p-5 text-white transition hover:border-emerald-300/50 hover:bg-white/[0.06]"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300/75">
            {type}
          </p>

          <h3 className="text-2xl font-black">{title}</h3>

          <p className="mt-1 text-white/55">{subtitle}</p>
          <p className="mt-1 text-sm text-white/40">{meta}</p>
        </div>

        <div className={`rounded-md border border-white/10 bg-black/40 px-4 py-3 text-right ${statContainerClassName ?? ""}`}>
          <p className="text-xs text-white/45">
            <StatLabel label={statLabel} className="justify-end" />
          </p>
          <p className={`text-xl font-black ${statClassName ?? "text-emerald-300"}`}>{statValue}</p>
        </div>
      </div>
    </a>
  );
}
