import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";

import styles from "./CoinChart.module.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const CoinChart = ({ coinId }) => {
  const [dataCoin, setDataCoin] = useState([]);

  //options for chart.....
  const options = {
    animations: {
      tension: {
        duration: 1000,
        easing: "linear",
        from: 1,
        to: 0,
        loop: true,
      },
    },
    responsive: true,
    elements: {
      point: {
        radius: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "7day History chart",
      },
    },
  };
  //....................................................
  const data = {
    labels: dataCoin.map((value) => moment(value.x).format("MMM DD, h:mm:ss")),
    datasets: [
      {
        label: coinId.id.toUpperCase(),
        fill: true,
        data: dataCoin.map((value) => value.y),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  useEffect(() => {
    const fetchApi = async () => {
      const result =
        await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId.id}/market_chart?vs_currency=usd&days=7
            `);
      const coinChartData = result.data.prices.map((value) => ({
        x: value[0],
        y: value[1].toFixed(2),
      }));
      setDataCoin(coinChartData);
    };
    fetchApi();
  }, [coinId]);
  return (
    <div className={styles.chartContainer}>
      <Line options={options} data={data} />
    </div>
  );
};

export default CoinChart;
