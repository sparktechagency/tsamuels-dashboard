import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function PlanMixDistributionChart({
  planMixDistribution,
  COLORS,
}) {
  //   console.log(planMixDistribution);
  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={planMixDistribution}
          dataKey="users"
          nameKey="plan"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={(entry) => `${entry.plan}: ${entry.percent}%`}
        >
          {planMixDistribution.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
