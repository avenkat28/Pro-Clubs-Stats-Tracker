import type { CompareMode } from "../lib/compareMockData";

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
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-1 backdrop-blur">
      <div className="grid grid-cols-2 gap-1">
        {tabs.map((tab) => {
          const isActive = activeMode === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onModeChange(tab.value)}
              className={`rounded-2xl px-5 py-3 text-sm font-black transition ${
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
