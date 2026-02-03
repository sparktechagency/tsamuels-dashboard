import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function RecognitionChart({ recognizedRevenue }) {
  console.log(recognizedRevenue);
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

        {/* <Bar dataKey="refunds" stackId="a" fill="#ef4444" name="Refunds ($)" /> */}
        <Line
          type="monotone"
          dataKey="upgrades"
          stroke="#10b981"
          strokeWidth={3}
          name="Upgrades"
        />
        <Line
          type="monotone"
          dataKey="downgrades"
          stroke="#ef4444"
          strokeWidth={3}
          name="Downgrades"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
