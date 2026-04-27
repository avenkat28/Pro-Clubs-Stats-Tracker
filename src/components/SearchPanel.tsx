export default function SearchPanel() {
  return (
    <section className="mx-auto max-w-3xl px-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Search Club or Player
        </h2>

        <div className="flex flex-col gap-3 md:flex-row">
          <input
            type="text"
            placeholder="Enter club name, club ID, or player name"
            className="flex-1 rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-gray-500"
          />

          <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}