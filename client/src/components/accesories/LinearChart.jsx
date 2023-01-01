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
import { getAllResults } from "../../hooks/test9c/getAllResults";
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
export function LinearChart() {
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
  let data = [];
  const results = getAllResults();

  if (results.length > 0) {
    let userData = results;
    // Aquí puedes acceder a las propiedades de userData con confianza

    console.log("userData", userData);
    //console.log ("userData.Test1", userData.test1Punt);

    const labels = userData
      .reverse()
      .map((item) => moment(item.fecha).format("DD-MM-YYYY"));
    console.log("Labels", labels);
    const test1Punt = userData.map((item) => item.test1Punt);
    const test2Punt = userData.map((item) => item.test2Punt);
    const test3Punt = userData.map((item) => item.test3Punt);
    const test4Punt = userData.map((item) => item.test4Punt);
    //const labels = userData.map(() => moment(userData.fecha).format("DD-MM-YYYY"));
    console.log("test1Punt", test1Punt);
    console.log("test2Punt", test2Punt);
    console.log("test3Punt", test3Punt);
    console.log("test4Punt", test4Punt);

    const lineChart = userData[0] ? (
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
              data: userData.map((item) => item.test1Peso),
              label: "Test 1",
              borderColor: "rgb(198, 33, 0)",
              backgroundColor: "rgb(198, 33, 0, 0.5)",
              fill: false,
            },
            {
              data: userData.map((item) => item.test2Peso),
              label: "Test 2",
              borderColor: "rgb(0, 66, 198)",
              backgroundColor: "rgba(0, 66, 198, 0.5)",
              fill: false,
            },
            {
              data: userData.map((item) => item.test3Tiempo),
              label: "Test 3",
              borderColor: "rgb(0, 158, 26)",
              backgroundColor: "rgba(0, 158, 26, 0.5)",
              fill: false,
            },
            {
              data: userData.map((item) => item.test4Tiempo),
              label: "Test 4",
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
