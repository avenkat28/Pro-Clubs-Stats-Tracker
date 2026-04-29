type PerformanceChartProps = {
  ratings: number[];
};

export default function PerformanceChart({
  ratings,
}: PerformanceChartProps) {
  const average =
    ratings.reduce((sum, val) => sum + val, 0) / ratings.length;

  const best = Math.max(...ratings);

  const points = ratings.map((rating, index) => {
    const x = 40 + index * 180;
    const y = 220 - (rating - 7) * 60;
    return { x, y, rating };
  });

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Recent Rating Trend</h2>
          <p className="text-sm text-gray-400">
            Last {ratings.length} matches
          </p>
        </div>

        <div className="flex gap-3">
          <div className="rounded-xl bg-black/40 px-4 py-2">
            <p className="text-xs text-gray-500">Average</p>
            <p className="font-bold text-blue-400">
              {average.toFixed(1)}
            </p>
          </div>

          <div className="rounded-xl bg-black/40 px-4 py-2">
            <p className="text-xs text-gray-500">Best</p>
            <p className="font-bold text-green-400">
              {best.toFixed(1)}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-black/40 p-4">
        <svg
          viewBox="0 0 800 260"
          className="w-full h-64"
        >
          {/* grid */}
          {[60, 110, 160, 210].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="800"
              y2={y}
              stroke="rgba(255,255,255,0.06)"
            />
          ))}

          {/* line */}
          <polyline
            fill="none"
            stroke="#2563eb"
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
            points={points.map((p) => `${p.x},${p.y}`).join(" ")}
          />

          {/* dots */}
          {points.map((p, i) => (
            <g key={i}>
              <circle
                cx={p.x}
                cy={p.y}
                r="6"
                fill="#3b82f6"
              />

              <text
                x={p.x}
                y={p.y - 14}
                textAnchor="middle"
                fill="white"
                fontSize="14"
                fontWeight="bold"
              >
                {p.rating}
              </text>

              <text
                x={p.x}
                y="245"
                textAnchor="middle"
                fill="#6b7280"
                fontSize="13"
              >
                G{i + 1}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}