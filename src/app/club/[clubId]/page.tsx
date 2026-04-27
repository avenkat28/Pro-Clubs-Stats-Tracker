import Navbar from "../../../components/Navbar";

export default function ClubPage({
  params,
}: {
  params: { clubId: string };
}) {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-4xl font-bold">Club Profile</h1>
        <p className="mt-4 text-gray-400">Club ID: {params.clubId}</p>
      </section>
    </main>
  );
}