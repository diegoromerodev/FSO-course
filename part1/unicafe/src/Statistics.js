import React from "react";
import StatisticLine from "./StatisticLine";

export default ({ good, neutral, bad }) => {
  if (!good && !neutral && !bad) return <p>No feedback given</p>;
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={good + bad + neutral} />
        <StatisticLine
          text="average"
          value={(good - bad) / (good + bad + neutral)}
        />
        <StatisticLine
          text="positive"
          value={`${(good / (good + bad + neutral)) * 100}%`}
        />
      </tbody>
    </table>
  );
};
