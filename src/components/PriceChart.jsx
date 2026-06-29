import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import "./PriceChart.css";

export default function PriceChart({ data }) {
  if (!data || !data.length) return null;

  return (
    <div className="price-chart">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          {/* Gradient fill */}
          <defs>
            <linearGradient id="priceColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Grid */}
          <CartesianGrid stroke="#eef2f7" vertical={false} opacity={0.4} />

          {/* X AXIS (FIXED: no duplicate months) */}
          <XAxis
            dataKey="date"
            tick={({ x, y, payload, index }) => {
              const current = new Date(payload.value);
              const prev = data[index - 1]
                ? new Date(data[index - 1].date)
                : null;

              const showLabel =
                !prev ||
                current.getMonth() !== prev.getMonth();

              if (!showLabel) return null;

              return (
                <text
                  x={x}
                  y={y + 12}
                  textAnchor="middle"
                  fontSize={11}
                  fill="#64748b"
                >
                  {current.toLocaleDateString("en-US", {
                    month: "short",
                  })}
                </text>
              );
            }}
            tickLine={false}
            axisLine={false}
          />

          {/* Y AXIS */}
          <YAxis
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickFormatter={(value) => `$${Math.round(value)}`}
            tickLine={false}
            axisLine={false}
            width={55}
          />

          {/* TOOLTIP + CROSSHAIR */}
          <Tooltip
            cursor={{
              stroke: "#2563eb",
              strokeWidth: 1,
              strokeDasharray: "4 4",
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

          {/* Area */}
          <Area
            type="monotone"
            dataKey="close"
            stroke="none"
            fill="url(#priceColor)"
          />

          {/* Line */}
          <Line
            type="monotone"
            dataKey="close"
            stroke="#2563eb"
            strokeWidth={2.2}
            dot={false}
            activeDot={{
              r: 5,
              stroke: "#2563eb",
              strokeWidth: 2,
              fill: "#fff",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}