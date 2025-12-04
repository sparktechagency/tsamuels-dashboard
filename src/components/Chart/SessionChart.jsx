import React from "react";
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

export default function SessionChart({ sessionData }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={sessionData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="day" stroke="#6b7280" />
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
          dataKey="avgLength"
          fill="#3b82f6"
          name="Avg Length (min)"
          barSize={40}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="sessionsPerUser"
          stroke="#10b981"
          strokeWidth={3}
          name="Sessions/User"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
