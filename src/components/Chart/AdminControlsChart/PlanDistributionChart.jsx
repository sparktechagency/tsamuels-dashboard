import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function PlanDistributionChart({
  planDistributionChartData = [],
  PLAN_COLORS = [],
}) {
  if (!planDistributionChartData.length) return null;

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={planDistributionChartData}
          cx="50%"
          cy="50%"
          outerRadius={90}
          dataKey="value"
          labelLine={false} // connector lines
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
          //   labelPosition="outside" // move labels outside the pie
        >
          {planDistributionChartData.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={PLAN_COLORS[index % PLAN_COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
