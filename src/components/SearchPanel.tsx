"use client";

import { useState } from "react";

export default function SearchPanel() {
  const [query, setQuery] = useState("");

  function handleSearch() {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    window.location.href = `/search?q=${encodeURIComponent(trimmedQuery)}&type=all`;
  }

  return (
    <section className="mx-auto max-w-4xl px-6 pb-10">
      <div className="rounded-2xl border border-white/12 bg-black/45 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-md">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Search Club or Player
        </h2>

        <div className="flex flex-col gap-3 md:flex-row">
          <input
            type="text"
            value={query}
            placeholder="Enter club name, club ID, or player name"
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
            className="flex-1 rounded-xl border border-white/10 bg-black/65 px-4 py-3 text-white outline-none placeholder:text-gray-500"
          />

          <button
            onClick={handleSearch}
            className="rounded-xl bg-emerald-400 px-6 py-3 font-semibold text-black shadow-[0_14px_34px_rgba(16,185,129,0.24)] hover:bg-emerald-300"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
