import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RsiChart({ data }) {
  if (!data || !data.length) return null;

  const chartData = data.map((item) => ({
    date: item.Date,
    rsi: item.RSI || 0,
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="rsi"
            stroke="#a855f7"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>

      <p style={{ fontSize: "12px", opacity: 0.6 }}>
        RSI Levels: 30 (Oversold) | 70 (Overbought)
      </p>
    </div>
  );
}