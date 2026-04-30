type ClubHeaderProps = {
  name: string;
  platform: string;
  division: string;
  skillRating: number;
  clubId: string;
  badgeUrl?: string | null;
};

export default function ClubHeader({
  name,
  platform,
  division,
  skillRating,
  clubId,
  badgeUrl,
}: ClubHeaderProps) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.22),_transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-8 text-white shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-blue-200/90">
        <span className="rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1">
          {platform}
        </span>
        <span className="text-white/35">/</span>
        <span className="text-white/55">Club ID {clubId}</span>
      </div>

      <div className="mt-6 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-[1.75rem] border border-white/10 bg-black/35 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            {badgeUrl ? (
              <img
                src={badgeUrl}
                alt={`${name} badge`}
                className="h-full w-full object-contain"
              />
            ) : (
              <span className="text-4xl font-black uppercase text-white/75">
                {name.slice(0, 2)}
              </span>
            )}
          </div>

          <div>
            <h1 className="max-w-4xl text-5xl font-black tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
              {name}
            </h1>
            {division !== "Division Unavailable" ? (
              <p className="mt-4 text-lg text-white/65 sm:text-2xl">{division}</p>
            ) : null}
          </div>
        </div>

        <div className="min-w-52 rounded-[1.5rem] border border-blue-400/30 bg-[linear-gradient(180deg,rgba(37,99,235,0.95),rgba(37,99,235,0.72))] px-6 py-5 text-center shadow-[0_18px_40px_rgba(37,99,235,0.35)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-100/90">
            Skill Rating
          </p>
          <p className="mt-3 text-5xl font-black tracking-[-0.05em]">{skillRating}</p>
        </div>
      </div>
    </section>
  );
}
