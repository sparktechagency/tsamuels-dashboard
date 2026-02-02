import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function StateUserChart({ geoData, COLORS }) {
  console.log(geoData);
  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={geoData}
          dataKey="count"
          nameKey="state"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={({ state, percentage }) => `${state}: ${percentage}%`}
        >
          {geoData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name, props) => [value, props.payload.state]}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
