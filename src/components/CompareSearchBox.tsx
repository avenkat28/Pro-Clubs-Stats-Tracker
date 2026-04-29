import type {
  CompareClub,
  CompareMode,
  ComparePlayer,
} from "../lib/compareMockData";

type CompareSearchBoxProps = {
  mode: CompareMode;
  options: Array<ComparePlayer | CompareClub>;
  leftId: string;
  rightId: string;
  onLeftChange: (id: string) => void;
  onRightChange: (id: string) => void;
};

export default function CompareSearchBox({
  mode,
  options,
  leftId,
  rightId,
  onLeftChange,
  onRightChange,
}: CompareSearchBoxProps) {
  const label = mode === "players" ? "Player" : "Club";

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
      <div className="grid gap-4 md:grid-cols-2">
        <Selector
          label={`Left ${label}`}
          value={leftId}
          options={options}
          onChange={onLeftChange}
        />
        <Selector
          label={`Right ${label}`}
          value={rightId}
          options={options}
          onChange={onRightChange}
        />
      </div>
    </section>
  );
}

function Selector({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<ComparePlayer | CompareClub>;
  onChange: (id: string) => void;
}) {
  return (
    <label className="space-y-2">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm font-bold text-white outline-none transition hover:border-blue-500/50 focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </label>
  );
}
