type PlayerHeaderProps = {
  name: string;
  club: string;
  position: string;
  platform: string;
};

export default function PlayerHeader({
  name,
  club,
  position,
  platform,
}: PlayerHeaderProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-8 text-white">
      <p className="text-sm text-blue-400">{platform}</p>

      <div className="mt-3">
        <h1 className="text-5xl font-bold">{name}</h1>
        <p className="mt-2 text-gray-400">
          {position} • {club}
        </p>
      </div>
    </section>
  );
}