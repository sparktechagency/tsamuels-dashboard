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

export default function OptInRatesChart({ optInRates }) {
  console.log(optInRates);
  return (
    <ResponsiveContainer width="100%" height={320}>
      <ComposedChart data={optInRates} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis type="number" stroke="#6b7280" />
        <YAxis
          dataKey="country"
          type="category"
          width={100}
          stroke="#6b7280"
        />{" "}
        <YAxis
          yAxisId="users"
          type="number"
          orientation="right"
          stroke="#6b7280"
        />
        <Tooltip
          contentStyle={{
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
          }}
        />
        <Legend />
        <Bar dataKey="pushRate" fill="#3b82f6" name="Push Opt-in %" />
        <Bar dataKey="smsRate" fill="#10b981" name="SMS Opt-in %" />{" "}
        <Bar dataKey="emailRate" fill="#f59e0b" name="Email Opt-in %" />
        {/* Total users line */}
        <Line
          dataKey="totalUsers"
          name="Total Users"
          stroke="#ef4444"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
