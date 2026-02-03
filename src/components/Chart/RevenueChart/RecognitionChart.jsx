import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function RecognitionChart({ recognizedRevenue }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <ComposedChart data={recognizedRevenue}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="month" stroke="#6b7280" />
        <YAxis stroke="#6b7280" />
        <Tooltip
          contentStyle={{
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
          }}
        />
        <Legend />
        <Bar
          dataKey="discounts"
          stackId="a"
          fill="#f59e0b"
          name="Discounts ($)"
        />
        <Bar dataKey="refunds" stackId="a" fill="#ef4444" name="Refunds ($)" />
        <Line
          type="monotone"
          dataKey="recognizedRevenue"
          stroke="#10b981"
          strokeWidth={3}
          name="Recognized Revenue ($)"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
