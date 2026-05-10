import { capitalizeWords } from "../lib/format";
import { PLAYER_COMP_IMAGES, type PlayerCompSummary } from "../lib/playerStatComp";

type PlayerHeaderProps = {
  name: string;
  club: string;
  position: string;
  platform: string;
  overall?: number;
  height?: string | null;
  nationality?: string | null;
  comp?: PlayerCompSummary;
};

export default function PlayerHeader({
  name,
  club,
  position,
  platform,
  overall,
  height,
  nationality,
  comp,
}: PlayerHeaderProps) {
  const nationalityFlag = nationality?.split(" ")[0];
  const visibleNationalityFlag =
    nationalityFlag && nationalityFlag !== nationality ? nationalityFlag : null;
  const metaItems = [
    capitalizeWords(position),
    club,
    height,
    overall && overall > 0 ? `OVR ${overall}` : null,
  ].filter(Boolean);

  return (
    <section className="overflow-hidden rounded-[1.65rem] border border-white/10 bg-[radial-gradient(circle_at_55%_0%,rgba(34,197,94,0.14),transparent_28%),linear-gradient(90deg,rgba(8,17,21,0.92),rgba(16,20,28,0.82))] p-6 text-white shadow-[0_24px_70px_rgba(0,0,0,0.32)] ring-1 ring-white/[0.04] sm:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-blue-400 sm:text-base">{platform}</p>

          <div className="mt-4">
            <div className="flex min-w-0 items-center gap-4">
              {visibleNationalityFlag ? (
                <span
                  aria-label={nationality ?? "Nationality flag"}
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-[2.35rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:h-20 sm:w-20 sm:text-[3rem]"
                >
                  {visibleNationalityFlag}
                </span>
              ) : null}
              <h1 className="min-w-0 break-words text-[clamp(3rem,9vw,5rem)] font-black leading-[0.92] tracking-[-0.07em]">
                {name}
              </h1>
            </div>
            <p className="mt-4 text-lg font-semibold text-white/50 sm:text-2xl">
              {metaItems.join(" • ")}
            </p>
          </div>
        </div>

        {comp ? (
          <div className="flex shrink-0 items-center gap-4 self-start md:self-center">
            <div className="h-24 w-20 overflow-hidden rounded-xl bg-white/[0.05] sm:h-32 sm:w-24">
              <img
                src={comp.imagePath ?? PLAYER_COMP_IMAGES.fallback}
                alt={`${comp.name} comp`}
                className="h-full w-full object-contain p-1.5"
              />
            </div>
            <div>
              <p className="max-w-36 text-xl font-black leading-none tracking-[-0.04em] text-white sm:text-2xl">
                {comp.name}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
