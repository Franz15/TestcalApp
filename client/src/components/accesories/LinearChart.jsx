import React, { useEffect, useState } from "react";
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
import { Line } from "react-chartjs-2";
import moment from "moment";
import "./linearChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function LinearChart({ results }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (results.length === 0) {
    return null;
  }

  // Prepare data
  const labels = results
    .reverse()
    .map((item) => moment(item.fecha).format(isMobile ? "DD/MM" : "DD-MM-YYYY"));

  // Chart options with proper responsive settings
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: isMobile ? 8 : 10,
          font: {
            size: isMobile ? 8 : 12
          }
        }
      },
      title: {
        display: true,
        text: "Progreso de Fuerza",
        font: {
          size: isMobile ? 14 : 16
        }
      },
      tooltip: {
        titleFont: {
          size: isMobile ? 10 : 12
        },
        bodyFont: {
          size: isMobile ? 9 : 11
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: isMobile ? 8 : 10
          },
          maxRotation: isMobile ? 45 : 0
        },
        grid: {
          display: !isMobile
        }
      },
      y: {
        ticks: {
          font: {
            size: isMobile ? 8 : 10
          }
        },
        grid: {
          display: true
        }
      }
    }
  };

  // Chart data
  const data = {
    labels,
    datasets: [
      {
        data: results.map((item) => item.test1Peso),
        label: "Fuerza de Dedos",
        borderColor: "rgb(198, 33, 0)",
        backgroundColor: "rgb(198, 33, 0, 0.5)",
        fill: false,
        pointRadius: isMobile ? 2 : 3,
        borderWidth: isMobile ? 1 : 2,
      },
      {
        data: results.map((item) => item.test2Peso),
        label: "Fuerza de Tracción",
        borderColor: "rgb(0, 66, 198)",
        backgroundColor: "rgba(0, 66, 198, 0.5)",
        fill: false,
        pointRadius: isMobile ? 2 : 3,
        borderWidth: isMobile ? 1 : 2,
      },
      {
        data: results.map((item) => item.test3Tiempo),
        label: "Fuerza Abdominal",
        borderColor: "rgb(0, 158, 26)",
        backgroundColor: "rgba(0, 158, 26, 0.5)",
        fill: false,
        pointRadius: isMobile ? 2 : 3,
        borderWidth: isMobile ? 1 : 2,
      },
      {
        data: results.map((item) => item.test4Tiempo),
        label: "Fuerza de agarre",
        borderColor: "rgb(105, 0, 158)",
        backgroundColor: "rgba(105, 0, 158, 0.5)",
        fill: false,
        pointRadius: isMobile ? 2 : 3,
        borderWidth: isMobile ? 1 : 2,
      },
    ],
  };

  // Render chart with container for better responsiveness
  return (
    <div className="linear-chart-container">
      <Line options={options} data={data} />
    </div>
  );
}
