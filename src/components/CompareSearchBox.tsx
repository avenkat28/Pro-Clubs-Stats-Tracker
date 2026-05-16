import type {
  CompareClub,
  CompareMode,
  ComparePlayer,
} from "../lib/compareTypes";

type CompareSearchBoxProps = {
  mode: CompareMode;
  leftOptions: Array<ComparePlayer | CompareClub>;
  rightOptions: Array<ComparePlayer | CompareClub>;
  leftId: string;
  rightId: string;
  onLeftChange: (id: string) => void;
  onRightChange: (id: string) => void;
};

export default function CompareSearchBox({
  mode,
  leftOptions,
  rightOptions,
  leftId,
  rightId,
  onLeftChange,
  onRightChange,
}: CompareSearchBoxProps) {
  const label = mode === "players" ? "Player" : "Club";

  return (
    <section>
      <div className="grid gap-4 md:grid-cols-2">
        <Selector
          label={`Left ${label}`}
          value={leftId}
          options={leftOptions}
          onChange={onLeftChange}
        />
        <Selector
          label={`Right ${label}`}
          value={rightId}
          options={rightOptions}
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
  function optionLabel(option: ComparePlayer | CompareClub) {
    if ("club" in option) {
      return `${option.name} / ${option.club}`;
    }

    return option.name;
  }

  return (
    <label className="space-y-2">
      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-white/45">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-md border border-white/10 bg-black/60 px-3 py-2.5 text-sm font-medium text-white outline-none transition hover:border-white/25 focus:border-emerald-300/70"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {optionLabel(option)}
          </option>
        ))}
      </select>
    </label>
  );
}
