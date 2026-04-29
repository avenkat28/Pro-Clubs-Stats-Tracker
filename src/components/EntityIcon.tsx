import {
  clubIconClassName,
  initials,
  normalizeOverall,
  playerIconClassName,
} from "../lib/colorCoding";

type EntityIconProps =
  | {
      type: "player";
      name: string;
      overall: number;
      size?: "sm" | "md" | "lg";
    }
  | {
      type: "club";
      name: string;
      division: string;
      size?: "sm" | "md" | "lg";
    };

const sizeClasses = {
  sm: "h-10 w-10 text-xs",
  md: "h-12 w-12 text-sm",
  lg: "h-16 w-16 text-lg",
};

export default function EntityIcon(props: EntityIconProps) {
  const size = props.size ?? "md";
  const toneClassName =
    props.type === "player"
      ? playerIconClassName(props.overall)
      : clubIconClassName(props.division);
  const label =
    props.type === "player"
      ? normalizeOverall(props.overall).toString()
      : initials(props.name);

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full border font-black shadow-lg ${sizeClasses[size]} ${toneClassName}`}
      title={
        props.type === "player"
          ? `${props.name} overall ${normalizeOverall(props.overall)}`
          : `${props.name} ${props.division}`
      }
    >
      {label}
    </span>
  );
}
