import {
  LineChart,
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
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            stroke="#e2e8f0"
            vertical={false}
          />

          <XAxis
            dataKey="date"
            tick={{
              fontSize: 11,
              fill: "#64748b",
            }}
            tickFormatter={(value) =>
              new Date(value).toLocaleDateString("en-US", {
                month: "short",
              })
            }
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            tick={{
              fontSize: 11,
              fill: "#64748b",
            }}
            tickFormatter={(value) => `$${Math.round(value)}`}
            tickLine={false}
            axisLine={false}
            width={55}
          />

          <Tooltip
            formatter={(value) => [
              `$${Number(value).toFixed(2)}`,
              "Close",
            ]}
            labelFormatter={(value) =>
              new Date(value).toLocaleDateString()
            }
          />

          <Line
            type="monotone"
            dataKey="close"
            stroke="#2563eb"
            strokeWidth={2.5}
            dot={false}
            activeDot={{
              r: 5,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}