type ClubHeaderProps = {
  name: string;
  platform: string;
  division: string;
  skillRating: number;
};

export default function ClubHeader({
  name,
  platform,
  division,
  skillRating,
}: ClubHeaderProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-8 text-white">
      <p className="text-sm text-blue-400">{platform}</p>

      <div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h1 className="text-5xl font-bold">{name}</h1>
          <p className="mt-2 text-gray-400">{division}</p>
        </div>

        <div className="rounded-xl bg-blue-600 px-6 py-4 text-center">
          <p className="text-sm text-blue-100">Skill Rating</p>
          <p className="text-3xl font-bold">{skillRating}</p>
        </div>
      </div>
    </section>
  );
}