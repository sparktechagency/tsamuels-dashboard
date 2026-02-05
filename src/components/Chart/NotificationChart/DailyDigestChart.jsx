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

export default function DailyDigestChart({ dailyDigest }) {
//   console.log(dailyDigest);
  return (
    <ResponsiveContainer width="100%" height={320}>
      <ComposedChart data={dailyDigest}>
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
        <Bar
          yAxisId="left"
          dataKey="twilioDelivered"
          fill="#3b82f6"
          name="Twilio Delivered"
        />
        <Bar
          yAxisId="left"
          dataKey="appleDelivered"
          fill="#10b981"
          name="Apple Delivered"
        />
        <Bar
          yAxisId="left"
          dataKey="firebaseDelivered"
          fill="#f59e0b"
          name="Firebase Delivered"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="twilioRate"
          stroke="#1e40af"
          strokeWidth={2}
          name="Twilio %"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="appleRate"
          stroke="#065f46"
          strokeWidth={2}
          name="Apple %"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="firebaseRate"
          stroke="#92400e"
          strokeWidth={2}
          name="Firebase %"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
