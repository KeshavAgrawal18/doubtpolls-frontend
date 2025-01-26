import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./ResultsChart.module.scss";

// Define the type for each option in the `options` array
interface Option {
  label: string;
  votes: number;
}

// Define the props for the ResultsChart component
interface ResultsChartProps {
  title: string;
  options: Option[];
}

const generateDynamicColors = (count: number): string[] => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(`hsl(${(i * 360) / count}, 70%, 60%)`);
  }
  return colors;
};

const ResultsChart: React.FC<ResultsChartProps> = ({ title, options }) => {
  const totalVotes = options.reduce((acc, option) => acc + option.votes, 0);
  const COLORS = generateDynamicColors(options.length);

  return (
    <div className={styles.resultsChart}>
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={options}
            dataKey="votes"
            nameKey="label"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            label={({ name, votes }) =>
              `${name}: ${((votes / totalVotes) * 100).toFixed(1)}%`
            }
          >
            {options.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [
              `${value} votes (${(
                ((value as number) / totalVotes) *
                100
              ).toFixed(1)}%)`,
              name,
            ]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResultsChart;
