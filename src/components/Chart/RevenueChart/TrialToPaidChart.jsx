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

export default function TrialToPaidChart({ trialToPaid }) {
  //   console.log(trialToPaid);
  return (
    <ResponsiveContainer width="100%" height={320}>
      <ComposedChart data={trialToPaid}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="month" stroke="#6b7280" />
        <YAxis yAxisId="left" stroke="#93c5fd" />
        <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
        <Tooltip
          contentStyle={{
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
          }}
        />
        <Legend />
        <Bar yAxisId="left" dataKey="trials" fill="#93c5fd" name="Trials" />
        <Bar yAxisId="left" dataKey="paid" fill="#3b82f6" name="Paid" />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="conversionRate"
          stroke="#10b981"
          strokeWidth={3}
          name="Conversion %"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
