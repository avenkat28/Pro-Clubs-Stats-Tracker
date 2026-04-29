export type RadarMetric = {
  label: string;
  left: number;
  right: number;
};

type CompareRadarChartProps = {
  leftName: string;
  rightName: string;
  metrics: RadarMetric[];
};

const center = 150;
const radius = 96;

function pointFor(index: number, value: number, total: number) {
  const angle = -Math.PI / 2 + (Math.PI * 2 * index) / total;
  const scaledRadius = radius * Math.max(0, Math.min(value, 100)) / 100;

  return {
    x: center + Math.cos(angle) * scaledRadius,
    y: center + Math.sin(angle) * scaledRadius,
  };
}

function labelPoint(index: number, total: number) {
  const angle = -Math.PI / 2 + (Math.PI * 2 * index) / total;

  return {
    x: center + Math.cos(angle) * 124,
    y: center + Math.sin(angle) * 124,
  };
}

function polygon(metrics: RadarMetric[], side: "left" | "right") {
  return metrics
    .map((metric, index) => {
      const point = pointFor(index, metric[side], metrics.length);
      return `${point.x},${point.y}`;
    })
    .join(" ");
}

export default function CompareRadarChart({
  leftName,
  rightName,
  metrics,
}: CompareRadarChartProps) {
  const rings = [20, 40, 60, 80, 100];

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-blue-950/10 backdrop-blur">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
            Radar
          </p>
          <h2 className="mt-1 text-2xl font-black text-white">
            Attribute Comparison
          </h2>
        </div>
        <div className="flex gap-3 text-xs font-bold">
          <span className="text-green-400">{leftName}</span>
          <span className="text-blue-300">{rightName}</span>
        </div>
      </div>

      <div className="mt-5 flex justify-center">
        <svg
          viewBox="0 0 300 300"
          role="img"
          aria-label={`${leftName} versus ${rightName} radar chart`}
          className="h-80 w-full max-w-xl"
        >
          {rings.map((ring) => (
            <polygon
              key={ring}
              points={metrics
                .map((_, index) => {
                  const point = pointFor(index, ring, metrics.length);
                  return `${point.x},${point.y}`;
                })
                .join(" ")}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          ))}

          {metrics.map((metric, index) => {
            const outer = pointFor(index, 100, metrics.length);
            const label = labelPoint(index, metrics.length);

            return (
              <g key={metric.label}>
                <line
                  x1={center}
                  y1={center}
                  x2={outer.x}
                  y2={outer.y}
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                />
                <text
                  x={label.x}
                  y={label.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-gray-400 text-[10px] font-bold"
                >
                  {metric.label}
                </text>
              </g>
            );
          })}

          <polygon
            points={polygon(metrics, "left")}
            fill="rgba(34,197,94,0.22)"
            stroke="rgb(34,197,94)"
            strokeWidth="2"
          />
          <polygon
            points={polygon(metrics, "right")}
            fill="rgba(59,130,246,0.22)"
            stroke="rgb(96,165,250)"
            strokeWidth="2"
          />
        </svg>
      </div>
    </section>
  );
}
