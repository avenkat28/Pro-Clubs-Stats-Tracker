import type { CompareMode } from "../lib/compareTypes";

type CompareTypeTabsProps = {
  activeMode: CompareMode;
  onModeChange: (mode: CompareMode) => void;
};

const tabs: { label: string; value: CompareMode }[] = [
  { label: "Players", value: "players" },
  { label: "Clubs", value: "clubs" },
];

export default function CompareTypeTabs({
  activeMode,
  onModeChange,
}: CompareTypeTabsProps) {
  return (
    <div className="app-surface p-1">
      <div className="grid grid-cols-2 gap-1">
        {tabs.map((tab) => {
          const isActive = activeMode === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onModeChange(tab.value)}
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
