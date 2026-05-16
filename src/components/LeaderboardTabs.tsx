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
    <div className="app-surface p-1">
      <div className="grid grid-cols-2 gap-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onTabChange(tab.value)}
              className={`app-pill-button ${isActive ? "app-pill-button-active" : ""}`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
