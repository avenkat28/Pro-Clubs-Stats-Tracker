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
    <div className="rounded-lg border border-white/10 bg-[#080b0a] p-1">
      <div className="grid grid-cols-2 gap-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onTabChange(tab.value)}
              className={`rounded-md px-5 py-3 text-sm font-bold transition ${
                isActive
                  ? "bg-white text-black"
                  : "text-white/50 hover:bg-white/[0.06] hover:text-white"
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
