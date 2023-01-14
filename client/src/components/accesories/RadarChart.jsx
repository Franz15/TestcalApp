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
import { useAuth } from '../../hooks/useAuth';

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
  const { auth } = useAuth();


  let test1avg;
  let test2avg;
  let test3avg;
  let test4avg;
  console.log (auth.grado);

  if (avgResult == 0){
    test1avg = 0;
    test2avg = 0;
    test3avg = 0;
    test4avg = 0;
  } else{
    test1avg = avgResult[0].test1avg;
    test2avg = avgResult[0].test2avg;
    test3avg = avgResult[0].test3avg;
    test4avg = avgResult[0].test4avg;
  }

  const data = {
    labels: [
      "Fuerza de dedos",
      "Fuerza de tracción",
      "Fuerza abdominal",
      "Fuerza de agarre",
    ],
    datasets: [
      {
        label: "Media de escaladores que escalan "+ auth.grado,
        data: [
          test1avg,
          test2avg,
          test3avg,
          test4avg,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: auth.nombre,
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
