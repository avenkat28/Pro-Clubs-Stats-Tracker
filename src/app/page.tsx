export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-5xl font-bold mb-4 text-center">
        EA FC 26 Pro Clubs Stats Tracker
      </h1>

      <p className="text-gray-400 text-lg text-center max-w-2xl mb-8">
        Advanced club and player analytics beyond the official EA stats.
      </p>

      <div className="flex gap-4">
        <button className="bg-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-500 transition">
          Search Clubs
        </button>

        <button className="border border-gray-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition">
          View Leaderboards
        </button>
      </div>
    </main>
  );
}