import Navbar from "../../../components/Navbar";

export default function PlayerPage({
  params,
}: {
  params: { playerId: string };
}) {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-4xl font-bold">Player Profile</h1>
        <p className="mt-4 text-gray-400">Player ID: {params.playerId}</p>
      </section>
    </main>
  );
}