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
import { Box } from "@mui/material";
import getAvgResult from "../../hooks/test9c/getAvgResult";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);
export function RadarChart() {
  let userResult = getLastResult();
  let avgResult = getAvgResult();
  console.log("userResult", userResult);
  console.log("avgResult", avgResult);
  const data = {
    labels: [
      "Fuerza de dedos",
      "Fuerza de tracción",
      "Fuerza abdominal",
      "Fuerza de agarre",
    ],
    datasets: [
      {
        label: "Media de escaladores",
        data: [
          avgResult.test1avg,
          avgResult.test2avg,
          avgResult.test3avg,
          avgResult.test4avg,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Usuario",
        data: [
          userResult.test1Punt,
          userResult.test2Punt,
          userResult.test3Punt,
          userResult.test4Punt,
        ],
        backgroundColor: "rgba(13, 210, 43, 0.2)",
        borderColor: "rgba(13, 210, 43, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box>
      {userResult != null && <Radar data={data} />}
      {userResult == null && <Radar data={[0, 0, 0, 0]} />}
    </Box>
  );
}
