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
    <section className="home-search-card rounded-lg border border-emerald-300/12 bg-[#080b0a]/92 p-4 text-white shadow-[0_18px_45px_rgba(0,0,0,0.22)] ring-1 ring-white/[0.03]">
      <h2 className="mb-4 text-lg font-black text-white">Search Club or Player</h2>

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
          className="flex-1 rounded-md border border-white/10 bg-black/60 px-3 py-2.5 text-white outline-none placeholder:text-white/35 focus:border-emerald-300/70"
        />

        <button
          onClick={handleSearch}
          className="rounded-md bg-white px-5 py-2.5 font-semibold text-black transition hover:bg-emerald-200"
        >
          Search
        </button>
      </div>
    </section>
  );
}
