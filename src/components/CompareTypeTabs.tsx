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
    <div className="rounded-lg border border-white/10 bg-[#080b0a] p-1">
      <div className="grid grid-cols-2 gap-1">
        {tabs.map((tab) => {
          const isActive = activeMode === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onModeChange(tab.value)}
              className={`rounded-md px-5 py-2.5 text-sm font-semibold transition ${
                isActive
                  ? "bg-white text-black"
                  : "text-white/55 hover:bg-white/[0.06] hover:text-white"
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
