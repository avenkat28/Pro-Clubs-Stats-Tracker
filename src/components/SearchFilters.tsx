type SearchFiltersProps = {
  activeFilter: string;
  query: string;
  platform: string;
};

export default function SearchFilters({
  activeFilter,
  query,
  platform,
}: SearchFiltersProps) {
  const filters = [
    { label: "All", value: "all" },
    { label: "Clubs", value: "clubs" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.value;

        return (
          <a
            key={filter.value}
            href={`/search?q=${encodeURIComponent(query)}&type=${filter.value}&platform=${platform}`}
            className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
              isActive
                ? "bg-white text-black"
                : "border border-white/10 bg-[#080b0a] text-white/55 hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            {filter.label}
          </a>
        );
      })}
    </div>
  );
}
