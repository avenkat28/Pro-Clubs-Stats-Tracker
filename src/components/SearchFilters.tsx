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
    { label: "Players", value: "players" },
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
            className={`app-pill-link border ${
              isActive
                ? "app-pill-link-active border-transparent"
                : "border-white/10 bg-[#080b0a]"
            }`}
          >
            {filter.label}
          </a>
        );
      })}
    </div>
  );
}
