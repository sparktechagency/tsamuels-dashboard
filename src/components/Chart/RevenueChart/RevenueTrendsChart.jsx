import {
  Area,
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

export default function RevenueTrendsChart({ revenueTrends }) {
  // console.log(revenueTrends);
  return (
    <ResponsiveContainer width="100%" height={320}>
      <ComposedChart data={revenueTrends}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="month" stroke="#6b7280" />
        <YAxis yAxisId="left" stroke="#6b7280" />
        <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
        <Tooltip
          contentStyle={{
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
          }}
        />
        <Legend />
        <Bar yAxisId="left" dataKey="mrr" fill="#93c5fd" name="MRR ($)" />
        <Bar yAxisId="left" dataKey="arr" fill="#3b82f6" name="ARR ($)" />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="arpu"
          stroke="#10b981"
          strokeWidth={3}
          name="ARPU ($)"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
