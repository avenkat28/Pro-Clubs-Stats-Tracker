import { StatLabel } from "./StatIcon";

type SearchResultCardProps = {
  type: "player" | "club";
  title: string;
  subtitle: string;
  meta: string;
  href: string;
  statLabel: string;
  statValue: string | number;
};

export default function SearchResultCard({
  type,
  title,
  subtitle,
  meta,
  href,
  statLabel,
  statValue,
}: SearchResultCardProps) {
  return (
    <a
      href={href}
      className="block rounded-2xl border border-white/10 bg-white/5 p-5 text-white transition hover:border-blue-500/60 hover:bg-white/10"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="mb-2 text-xs uppercase tracking-wide text-blue-400">
            {type}
          </p>

          <h3 className="text-2xl font-bold">{title}</h3>

          <p className="mt-1 text-gray-400">{subtitle}</p>
          <p className="mt-1 text-sm text-gray-500">{meta}</p>
        </div>

        <div className="rounded-xl bg-black/40 px-4 py-3 text-right">
          <p className="text-xs text-gray-500">
            <StatLabel label={statLabel} className="justify-end" />
          </p>
          <p className="text-xl font-bold text-blue-400">{statValue}</p>
        </div>
      </div>
    </a>
  );
}
