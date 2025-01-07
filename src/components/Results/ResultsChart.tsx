import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import styles from "./ResultsChart.module.scss";

interface ResultsChartProps {
  pollTitle: string;
  results: { option: string; votes: number }[];
}

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];

const ResultsChart: React.FC<ResultsChartProps> = ({ pollTitle, results }) => {
  return (
    <div className={styles.resultsChart}>
      <h3>{pollTitle}</h3>
      <PieChart width={400} height={400}>
        <Pie
          data={results}
          dataKey="votes"
          nameKey="option"
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          label
        >
          {results.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default ResultsChart;
