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
    <section className="home-search-card rounded-[1.6rem] border border-white/8 bg-[#090d0c]/74 p-4 text-white shadow-[0_18px_44px_rgba(0,0,0,0.18)]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-emerald-300/72">
            Search
          </p>
          <h2 className="mt-1 text-[1.45rem] font-semibold tracking-[-0.03em] text-white">
            Club or player lookup
          </h2>
        </div>
        <span className="rounded-full border border-emerald-300/14 bg-emerald-300/8 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-emerald-200">
          Live
        </span>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
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
          className="min-h-12 flex-1 rounded-xl border border-white/8 bg-black/36 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-emerald-300/60"
        />

        <button
          onClick={handleSearch}
          className="min-h-12 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-200 sm:px-6"
        >
          Search
        </button>
      </div>

      <p className="mt-3 max-w-[38rem] text-sm leading-6 text-white/50">
        Jump straight to a club page, paste a club ID, or look up a player name.
      </p>
    </section>
  );
}
