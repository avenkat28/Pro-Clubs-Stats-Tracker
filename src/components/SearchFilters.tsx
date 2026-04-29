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
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.value;

        return (
          <a
            key={filter.value}
            href={`/search?q=${encodeURIComponent(query)}&type=${filter.value}&platform=${platform}`}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
          >
            {filter.label}
          </a>
        );
      })}
    </div>
  );
}
