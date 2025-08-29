import "./App.css";
import { Button } from "antd";
import { useCallback, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [activeFilter, setActiveFilter] = useState("hourly");

  const [chartData, setChartData] = useState<any[]>([]);

  const fetchData = async (filter: string) => {
    // Replace with your actual API endpoint
    try {
      const res = await axios.get(
        `https://chart.stockscan.io/candle/v3/TSLA/${filter}/NASDAQ`
      );
      setChartData(res.data?.candles);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(activeFilter);
  }, [activeFilter]);

  const filters = [
    { label: "hourly", value: "hourly" },
    { label: "daily", value: "daily" },
    { label: "weekly", value: "weekly" },
    { label: "monthly", value: "monthly" },
  ];

  const data = {
    labels: chartData.map((it) => it?.date),
    datasets: [
      {
        label: "TSLA",
        data: chartData.map((it) => it?.close),
      },
    ],
  };

  return (
    <>
      <div className="flex">
        {filters.map((filter) => (
          <Button
            key={filter.value}
            type={activeFilter === filter.value ? "primary" : "default"}
            onClick={() => setActiveFilter(filter.value)}
          >
            {filter.label}
          </Button>
        ))}
      </div>
      <Line data={data}></Line>
      <></>
    </>
  );
}

export default App;
