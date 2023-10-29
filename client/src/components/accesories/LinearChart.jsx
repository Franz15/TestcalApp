import React from "react";
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
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  if (results.length > 0) {
    // Aquí puedes acceder a las propiedades de userData con confianza
    const labels = results
      .reverse()
      .map((item) => moment(item.fecha).format("DD-MM-YYYY"));

    const test1Punt = results.map((item) => item.test1Punt);
    const test2Punt = results.map((item) => item.test2Punt);
    const test3Punt = results.map((item) => item.test3Punt);
    const test4Punt = results.map((item) => item.test4Punt);
    //const labels = userData.map(() => moment(userData.fecha).format("DD-MM-YYYY"));

    const lineChart = results[0] ? (
      <Line
        options={{
          sx: { minWidth: "100vh" },
          responsive: true,
          minWidth: "100vh",
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Chart.js Line Chart",
            },
          },
        }}
        data={{
          labels,
          datasets: [
            {
              data: results.map((item) => item.test1Peso),
              label: "Fuerza de Dedos",
              borderColor: "rgb(198, 33, 0)",
              backgroundColor: "rgb(198, 33, 0, 0.5)",
              fill: false,
            },
            {
              data: results.map((item) => item.test2Peso),
              label: "Fuerza de Tracción",
              borderColor: "rgb(0, 66, 198)",
              backgroundColor: "rgba(0, 66, 198, 0.5)",
              fill: false,
            },
            {
              data: results.map((item) => item.test3Tiempo),
              label: "Fuerza Abdominal",
              borderColor: "rgb(0, 158, 26)",
              backgroundColor: "rgba(0, 158, 26, 0.5)",
              fill: false,
            },
            {
              data: results.map((item) => item.test4Tiempo),
              label: "Fuerza de agarre",
              borderColor: "rgb(105, 0, 158)",
              backgroundColor: "rgba(105, 0, 158, 0.5)",
              fill: false,
            },
          ],
        }}
      />
    ) : null;
    return <>{lineChart}</>;
  }
}
