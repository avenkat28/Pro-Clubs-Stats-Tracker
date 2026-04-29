import { ratingBadgeClassName } from "../lib/colorCoding";

type RatingBadgeProps = {
  rating: number;
  className?: string;
};

export default function RatingBadge({ rating, className = "" }: RatingBadgeProps) {
  return (
    <span
      className={`inline-flex min-w-12 items-center justify-center rounded-lg border px-2.5 py-1 font-black shadow-lg ${ratingBadgeClassName(
        rating
      )} ${className}`}
    >
      {rating.toFixed(1)}
    </span>
  );
}
