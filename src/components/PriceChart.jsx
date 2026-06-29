import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

import "./PriceChart.css";

export default function PriceChart({ data }) {
  if (!data || !data.length) return null;

  // ----------------------------
  // 📊 Dynamic Y-axis scaling
  // ----------------------------
  const prices = data.map((d) => d.close);

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  // padding for clean visual breathing room
  const padding = (maxPrice - minPrice) * 0.08 || 1;

  // 🔥 IMPORTANT: clamp minimum at 0
  const yMin = Math.max(0, minPrice - padding);
  const yMax = maxPrice + padding;

  const lastPrice = data[data.length - 1]?.close;

  // ----------------------------
  // 📅 Clean monthly ticks
  // ----------------------------
  const formatMonthTick = (value, index) => {
    const current = new Date(value);
    const prev = data[index - 1]
      ? new Date(data[index - 1].date)
      : null;

    const show =
      !prev || current.getMonth() !== prev.getMonth();

    if (!show) return "";

    return current.toLocaleDateString("en-US", {
      month: "short",
    });
  };

  return (
    <div className="price-chart">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
        >
          {/* ---------------------------- */}
          {/* Gradient fill */}
          {/* ---------------------------- */}
          <defs>
            <linearGradient id="priceColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* ---------------------------- */}
          {/* Grid */}
          {/* ---------------------------- */}
          <CartesianGrid
            stroke="#eef2f7"
            vertical={false}
            opacity={0.4}
          />

          {/* ---------------------------- */}
          {/* X Axis */}
          {/* ---------------------------- */}
          <XAxis
            dataKey="date"
            tick={({ x, y, payload, index }) => {
              const label = formatMonthTick(payload.value, index);
              if (!label) return null;

              return (
                <text
                  x={x}
                  y={y + 12}
                  textAnchor="middle"
                  fontSize={11}
                  fill="#64748b"
                >
                  {label}
                </text>
              );
            }}
            tickLine={false}
            axisLine={false}
          />

          {/* ---------------------------- */}
          {/* Y Axis (clamped + responsive) */}
          {/* ---------------------------- */}
          <YAxis
            orientation="right"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickFormatter={(v) => `$${Number(v).toFixed(2)}`}
            tickLine={false}
            axisLine={false}
            width={45}
            domain={[yMin, yMax]}
          />

          {/* ---------------------------- */}
          {/* Hover crosshair + tooltip */}
          {/* ---------------------------- */}
          <Tooltip
            cursor={{
              stroke: "rgba(37,99,235,0.35)",
              strokeWidth: 1.5,
              strokeDasharray: "3 3",
            }}
            content={({ active, payload, label }) => {
              if (!active || !payload || !payload.length) return null;

              const price = payload[0].value;

              return (
                <div className="chart-tooltip">
                  <div className="tooltip-date">
                    {new Date(label).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>

                  <div className="tooltip-price">
                    ${Number(price).toFixed(2)}
                  </div>
                </div>
              );
            }}
          />

          {/* ---------------------------- */}
          {/* Area fill */}
          {/* ---------------------------- */}
          <Area
            type="monotone"
            dataKey="close"
            stroke="none"
            fill="url(#priceColor)"
          />

          {/* ---------------------------- */}
          {/* Price line */}
          {/* ---------------------------- */}
          <Line
            type="monotone"
            dataKey="close"
            stroke="#2563eb"
            strokeWidth={2.4}
            dot={false}
            activeDot={{
              r: 6,
              stroke: "#2563eb",
              strokeWidth: 2,
              fill: "#fff",
            }}
          />

          {/* ---------------------------- */}
          {/* Last price reference */}
          {/* ---------------------------- */}
          <ReferenceLine
            y={lastPrice}
            stroke="rgba(37,99,235,0.6)"
            strokeDasharray="3 3"
            label={{
              value: `$${Number(lastPrice).toFixed(2)}`,
              position: "right",
              fill: "#2563eb",
              fontSize: 12,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}