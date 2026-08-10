const divisions = ["Division 5", "Division 4", "Division 3", "Division 2", "Division 1", "Elite"];

const challenges = [
  { title: "Clean Sheet Hunt", detail: "Keep three clean sheets in your next five matches.", reward: "+ Wall Mode" },
  { title: "No-Loss Night", detail: "Finish a five-match session without taking an L.", reward: "+ Ice Cold" },
  { title: "Goal Rush", detail: "Score 15 combined goals across your next five.", reward: "+ Net Breakers" },
];

export default function HomeFunSections() {
  return (
    <section className="mx-auto max-w-[min(1680px,calc(100vw-32px))] px-4 pb-20 sm:px-6 lg:px-8 xl:px-10">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-[1.75rem] border border-emerald-300/12 bg-[#07100c]/80 p-6 sm:p-8">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-emerald-300/76">The climb</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">Road to Elite</h2>
          <p className="mt-2 text-sm leading-6 text-white/55">Six stops. One destination. Track where your club sits on the new competitive ladder.</p>
          <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
            {divisions.map((division, index) => (
              <div key={division} className={`rounded-xl border p-3 ${index === divisions.length - 1 ? "border-sky-300/30 bg-sky-300/10" : "border-white/8 bg-black/25"}`}>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/35">Level {index + 1}</p>
                <p className={`mt-2 text-sm font-black ${index === divisions.length - 1 ? "text-sky-200" : "text-white/75"}`}>{division}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-purple-300/12 bg-[#0d0812]/75 p-6 sm:p-8">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-purple-300/76">Squad challenges</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">Make the next session count</h2>
          <div className="mt-5 space-y-2.5">
            {challenges.map((challenge) => (
              <div key={challenge.title} className="flex items-center justify-between gap-4 rounded-xl border border-white/8 bg-black/25 p-4">
                <div>
                  <p className="font-bold text-white">{challenge.title}</p>
                  <p className="mt-1 text-xs leading-5 text-white/45">{challenge.detail}</p>
                </div>
                <span className="shrink-0 rounded-full bg-purple-300/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-purple-200">{challenge.reward}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
