export type LeaderboardTab = "players" | "clubs";

type LeaderboardTabsProps = {
  activeTab: LeaderboardTab;
  onTabChange: (tab: LeaderboardTab) => void;
};

const tabs: { label: string; value: LeaderboardTab }[] = [
  { label: "Players", value: "players" },
  { label: "Clubs", value: "clubs" },
];

export default function LeaderboardTabs({
  activeTab,
  onTabChange,
}: LeaderboardTabsProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-1 backdrop-blur">
      <div className="grid grid-cols-2 gap-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onTabChange(tab.value)}
              className={`rounded-xl px-5 py-3 text-sm font-bold transition ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
