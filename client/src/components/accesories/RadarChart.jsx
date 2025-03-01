import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import getLastResult from "../../hooks/test9c/getLastResult";
import getAvgResult from "../../hooks/test9c/getAvgResult";
import { useAuth } from "../../hooks/useAuth";
import "./radarChart.css";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export function RadarChart({ results }) {
  let avgResult = getAvgResult();
  const { auth } = useAuth();

  // Initialize average values
  let test1avg = 0;
  let test2avg = 0;
  let test3avg = 0;
  let test4avg = 0;

  // Set average values if available
  if (avgResult !== 0 && avgResult.length > 0) {
    test1avg = avgResult[0].test1avg;
    test2avg = avgResult[0].test2avg;
    test3avg = avgResult[0].test3avg;
    test4avg = avgResult[0].test4avg;
  }

  // Chart options with proper responsive settings
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 10,
          font: {
            size: 10
          }
        }
      }
    }
  };

  // Prepare chart data based on whether results exist
  const data = {
    labels: [
      "Fuerza de dedos",
      "Fuerza de tracción",
      "Fuerza abdominal",
      "Fuerza de agarre",
    ],
    datasets: [
      {
        label: "Media de escaladores que escalan " + auth.grado,
        data: [test1avg, test2avg, test3avg, test4avg],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: auth.nombre,
        data: results && results[0] ? [
          results[0].test1Punt,
          results[0].test2Punt,
          results[0].test3Punt,
          results[0].test4Punt,
        ] : [0, 0, 0, 0],
        backgroundColor: "rgba(13, 210, 43, 0.2)",
        borderColor: "rgba(13, 210, 43, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Render chart with container for better responsiveness
  return (
    <div className="radar-chart-container">
      <Radar data={data} options={options} />
    </div>
  );
}
