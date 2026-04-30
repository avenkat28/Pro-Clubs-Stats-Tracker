type RatingPoint = {
  rating: number;
  matchIndex: number;
};

type PerformanceChartProps = {
  ratings: Array<number | RatingPoint>;
  matchWindow?: number;
};

function ratingColor(value: number) {
  if (value < 6) return "#ef4444";
  if (value < 8) return "#facc15";
  return "#22c55e";
}

function ratingBand(value: number) {
  if (value < 6) return "red";
  if (value < 8) return "yellow";
  return "green";
}

function getRatingGradientStops(startRating: number, endRating: number) {
  const colors = {
    red: "#ef4444",
    yellow: "#facc15",
    green: "#22c55e",
  };
  const startBand = ratingBand(startRating);
  const endBand = ratingBand(endRating);

  if (startBand === endBand) {
    return [
      { offset: 0, color: colors[startBand] },
      { offset: 1, color: colors[endBand] },
    ];
  }

  if (
    (startBand === "red" && endBand === "green") ||
    (startBand === "green" && endBand === "red")
  ) {
    return [
      { offset: 0, color: colors[startBand] },
      { offset: 0.5, color: colors.yellow },
      { offset: 1, color: colors[endBand] },
    ];
  }

  return [
    { offset: 0, color: colors[startBand] },
    { offset: 1, color: colors[endBand] },
  ];
}

function ratingTextClassName(value: number) {
  if (value < 6) return "text-red-400";
  if (value < 8) return "text-yellow-300";
  return "text-green-400";
}

function formatRating(value: number) {
  return value.toFixed(1);
}

export default function PerformanceChart({
  ratings,
  matchWindow = 10,
}: PerformanceChartProps) {
  const chart = {
    width: 800,
    height: 260,
    top: 34,
    right: 36,
    bottom: 40,
    left: 58,
  };
  const plotWidth = chart.width - chart.left - chart.right;
  const plotHeight = chart.height - chart.top - chart.bottom;
  const xStep = matchWindow > 1 ? plotWidth / (matchWindow - 1) : 0;
  const yAxisTicks = [10, 8, 6, 4, 2, 0];
  const ratingFloor = 0;
  const ratingCeiling = 10;
  const ratingRange = ratingCeiling - ratingFloor;
  const visibleRatings = ratings
    .map((entry, index) =>
      typeof entry === "number"
        ? { rating: entry, matchIndex: index + 1 }
        : entry,
    )
    .filter(
      (entry) =>
        Number.isFinite(entry.rating) &&
        entry.rating > 0 &&
        entry.matchIndex >= 1 &&
        entry.matchIndex <= matchWindow,
    )
    .sort((a, b) => a.matchIndex - b.matchIndex);

  if (visibleRatings.length === 0) {
    return (
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Recent Rating Trend</h2>
            <p className="text-sm text-gray-400">
              Last {matchWindow} matches
            </p>
          </div>

          <div className="flex gap-3">
            <div className="rounded-xl bg-black/40 px-4 py-2">
              <p className="text-xs text-gray-500">Average</p>
              <p className="font-bold text-blue-400">--</p>
            </div>

            <div className="rounded-xl bg-black/40 px-4 py-2">
              <p className="text-xs text-gray-500">Best</p>
              <p className="font-bold text-blue-400">--</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-black/40 p-4">
          <svg
            viewBox={`0 0 ${chart.width} ${chart.height}`}
            className="w-full h-64"
          >
            {yAxisTicks.map((tick) => {
              const y = chart.top + ((ratingCeiling - tick) / ratingRange) * plotHeight;

              return (
                <g key={tick}>
                  <text
                    x={chart.left - 18}
                    y={y + 4}
                    textAnchor="end"
                    fill="#6b7280"
                    fontSize="12"
                  >
                    {tick}
                  </text>
                  <line
                    x1={chart.left}
                    y1={y}
                    x2={chart.width - chart.right}
                    y2={y}
                    stroke="rgba(255,255,255,0.06)"
                  />
                </g>
              );
            })}

            <text
              x={chart.width / 2}
              y={chart.height / 2 - 4}
              textAnchor="middle"
              fill="#9ca3af"
              fontSize="15"
              fontWeight="600"
            >
              No appearances in the club's last {matchWindow} matches
            </text>

            {Array.from({ length: matchWindow }, (_, index) => {
              const x = matchWindow > 1 ? chart.left + index * xStep : chart.width / 2;

              return (
                <text
                  key={index}
                  x={x}
                  y={chart.height - 14}
                  textAnchor="middle"
                  fill="#6b7280"
                  fontSize="13"
                >
                  G{index + 1}
                </text>
              );
            })}
          </svg>
        </div>
      </section>
    );
  }

  const average =
    visibleRatings.reduce((sum, val) => sum + val.rating, 0) / visibleRatings.length;

  const best = Math.max(...visibleRatings.map((entry) => entry.rating));
  const points = visibleRatings.map(({ rating, matchIndex }) => {
    const x = matchWindow > 1 ? chart.left + (matchIndex - 1) * xStep : chart.width / 2;
    const y = chart.top + ((ratingCeiling - rating) / ratingRange) * plotHeight;
    return { x, y, rating };
  });
  const lineSegments = points.slice(0, -1).map((point, index) => ({
    start: point,
    end: points[index + 1],
    gradientId: `rating-line-gradient-${index}`,
    stops: getRatingGradientStops(point.rating, points[index + 1].rating),
  }));

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Recent Rating Trend</h2>
          <p className="text-sm text-gray-400">
            Last {matchWindow} matches
          </p>
        </div>

        <div className="flex gap-3">
          <div className="rounded-xl bg-black/40 px-4 py-2">
            <p className="text-xs text-gray-500">Average</p>
            <p className={`font-bold ${ratingTextClassName(average)}`}>
              {formatRating(average)}
            </p>
          </div>

          <div className="rounded-xl bg-black/40 px-4 py-2">
            <p className="text-xs text-gray-500">Best</p>
            <p className={`font-bold ${ratingTextClassName(best)}`}>
              {formatRating(best)}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-black/40 p-4">
        <svg
          viewBox={`0 0 ${chart.width} ${chart.height}`}
          className="w-full h-64"
        >
          {/* grid */}
          {yAxisTicks.map((tick) => {
            const y = chart.top + ((ratingCeiling - tick) / ratingRange) * plotHeight;

            return (
              <g key={tick}>
                <text
                  x={chart.left - 18}
                  y={y + 4}
                  textAnchor="end"
                  fill="#6b7280"
                  fontSize="12"
                >
                  {tick}
                </text>
                <line
                  x1={chart.left}
                  y1={y}
                  x2={chart.width - chart.right}
                  y2={y}
                  stroke="rgba(255,255,255,0.06)"
                />
              </g>
            );
          })}

          <defs>
            {lineSegments.map((segment) => (
              <linearGradient
                key={segment.gradientId}
                id={segment.gradientId}
                x1={segment.start.x}
                y1={segment.start.y}
                x2={segment.end.x}
                y2={segment.end.y}
                gradientUnits="userSpaceOnUse"
              >
                {segment.stops.map((stop, stopIndex) => (
                  <stop
                    key={`${segment.gradientId}-${stopIndex}`}
                    offset={`${stop.offset * 100}%`}
                    stopColor={stop.color}
                  />
                ))}
              </linearGradient>
            ))}
          </defs>

          {/* line */}
          {lineSegments.map((segment) => (
            <line
              key={segment.gradientId}
              x1={segment.start.x}
              y1={segment.start.y}
              x2={segment.end.x}
              y2={segment.end.y}
              stroke={`url(#${segment.gradientId})`}
              strokeWidth="4"
              strokeLinecap="round"
            />
          ))}

          {/* dots */}
          {points.map((p, i) => (
            <g key={i}>
              <circle
                cx={p.x}
                cy={p.y}
                r="6"
                fill={ratingColor(p.rating)}
              />

              <text
                x={p.x}
                y={Math.max(18, p.y - 14)}
                textAnchor="middle"
                fill={ratingColor(p.rating)}
                fontSize="14"
                fontWeight="bold"
              >
                {formatRating(p.rating)}
              </text>

            </g>
          ))}

          {/* x labels */}
          {Array.from({ length: matchWindow }, (_, index) => {
            const x = matchWindow > 1 ? chart.left + index * xStep : chart.width / 2;

            return (
              <text
                key={index}
                x={x}
                y={chart.height - 14}
                textAnchor="middle"
                fill="#6b7280"
                fontSize="13"
              >
                G{index + 1}
              </text>
            );
          })}
        </svg>
      </div>
    </section>
  );
}
