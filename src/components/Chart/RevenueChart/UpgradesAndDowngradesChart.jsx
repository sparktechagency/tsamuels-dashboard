import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function UpgradesAndDowngradesChart({ upgradesAndDowngrades }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={upgradesAndDowngrades}>
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
        <Bar dataKey="upgrades" fill="#10b981" name="Upgrades" />
        <Bar dataKey="downgrades" fill="#ef4444" name="Downgrades" />
      </BarChart>
    </ResponsiveContainer>
  );
}
