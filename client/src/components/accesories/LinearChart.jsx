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
      .map((item) =>
        (item.test1Peso !== undefined &&
          item.test1Peso !== null) ||
        (item.test2Peso !== undefined &&
          item.test2Peso !== null) ||
        (item.test3Tiempo !== undefined &&
          item.test3Tiempo !== null) ||
        (item.test4Tiempo !== undefined &&
          item.test4Tiempo !== null)
          ? moment(item.fecha).format("DD-MM-YYYY")
          : null
      )
      .filter((label) => label !== null);

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
              display: false,
              text: "Chart.js Line Chart",
            },
          },
        }}
        data={{
          labels,
          datasets: [
            {
              data: results
                .map((item) =>
                  item.test1Peso !== undefined &&
                  item.test1Peso !== null
                    ? item.test1Peso
                    : null
                )
                .filter((test1Peso) => test1Peso !== null),
              label: "Fuerza de Dedos",
              borderColor: "rgb(198, 33, 0)",
              backgroundColor: "rgb(198, 33, 0, 0.5)",
              fill: false,
            },
            {
              data: results
                .map((item) =>
                  item.test2Peso !== undefined &&
                  item.test2Peso !== null
                    ? item.test2Peso
                    : null
                )
                .filter((test2Peso) => test2Peso !== null),

              label: "Fuerza de Tracción",
              borderColor: "rgb(0, 66, 198)",
              backgroundColor: "rgba(0, 66, 198, 0.5)",
              fill: false,
            },
            {
              data: results
                .map((item) =>
                  item.test3Tiempo !== undefined &&
                  item.test3Tiempo !== null
                    ? item.test3Tiempo
                    : null
                )
                .filter((test3Tiempo) => test3Tiempo !== null),

              label: "Fuerza Abdominal",
              borderColor: "rgb(0, 158, 26)",
              backgroundColor: "rgba(0, 158, 26, 0.5)",
              fill: false,
            },
            {
              data: results
                .map((item) =>
                  item.test4Tiempo !== undefined &&
                  item.test4Tiempo !== null
                    ? item.test4Tiempo
                    : null
                )
                .filter((test4Tiempo) => test4Tiempo !== null),

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
