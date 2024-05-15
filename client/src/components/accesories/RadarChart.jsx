import React, { useEffect, useState, useRef } from "react";
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
import { useAuth } from "../../hooks/useAuth";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);
export function RadarChart({ results, type }) {
  const [result, setResult] = useState("");
  const resultsRef = useRef();

  useEffect(() => {
    resultsRef.current = results;
    for (let i = 0; i < resultsRef.current.length; i++) {
      if (results[i]._type === "test9c") {
        setResult((prevResult) => ({
          ...prevResult,
          test1Punt: results[i].test1Punt,
          test2Punt: results[i].test2Punt,
          test3Punt: results[i].test3Punt,
          test4Punt: results[i].test4Punt,
        }));
      }
      if (results[i]._type === "max20mm") {
        setResult((prevResult) => ({
          ...prevResult,
          max20mmPorcent: results[i].max20mmPorcent,
        }));
      }
      if (results[i]._type === "dobles") {
        setResult((prevResult) => ({
          ...prevResult,
          dobles: results[i].dobles,
        }));
      }
      if (results[i]._type === "159") {
        setResult((prevResult) => ({
          ...prevResult,
          cinco: results[i].cinco,
          nueve: results[i].nueve,
        }));
      }
      if (results[i]._type === "minEdge") {
        setResult((prevResult) => ({
          ...prevResult,
          minEdge: results[i].minEdge,
        }));
      }
      if (results[i]._type === "maxReachDer") {
        setResult((prevResult) => ({
          ...prevResult,
          maxReachDer: results[i].maxReachDer,
        }));
      }
      if (results[i]._type === "maxReachIzq") {
        setResult((prevResult) => ({
          ...prevResult,
          maxReachIzq: results[i].maxReachIzq,
        }));
      }
      if (results[i]._type === "bloqueoDer") {
        setResult((prevResult) => ({
          ...prevResult,
          bloqueoDer: results[i].bloqueoDer,
        }));
      }
      if (results[i]._type === "bloqueoIzq") {
        setResult((prevResult) => ({
          ...prevResult,
          bloqueoIzq: results[i].bloqueoIzq,
        }));
      }
    }
  }, [results]);

  let avgResult = getAvgResult();
  const { auth } = useAuth();

  let test1avg;
  let test2avg;
  let test3avg;
  let test4avg;
  let maxReachDer;
  let maxReachIzq;
  let max20mm;
  let maxReachUser;
  let dobles;
  let bloqueoDer;
  let bloqueoIzq;
  let unoCincoNueve;
  let unoCincoNueveUser = (result.cinco + result.nueve) / 2;
  let minEdge;

  function renderConditional(item) {
    if (item === undefined || !results || result === undefined) {
      return;
    } else {
      if (type === "test9c") {
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
              data: [
                result &&
                result.test1Punt !== undefined &&
                result.test1Punt !== null
                  ? result.test1Punt
                  : 0,
                result &&
                result.test2Punt !== undefined &&
                result.test2Punt !== null
                  ? result.test2Punt
                  : 0,
                result &&
                result.test3Punt !== undefined &&
                result.test3Punt !== null
                  ? result.test3Punt
                  : 0,
                result &&
                result.test4Punt !== undefined &&
                result.test4Punt !== null
                  ? result.test4Punt
                  : 0,
              ],
              backgroundColor: "rgba(13, 210, 43, 0.2)",
              borderColor: "rgba(13, 210, 43, 1)",
              borderWidth: 1,
            },
          ],
        };
        return <Radar data={data} />;
      } else {
        if (result.maxReachIzq === null && result.maxReachDer === null) {
          maxReachUser = 0;
        } else if (result.maxReachIzq !== null && result.maxReachDer === null) {
          maxReachUser = result.maxReachIzq;
        } else if (result.maxReachIzq === null && result.maxReachDer !== null) {
          maxReachUser = result.maxReachDer;
        } else {
          maxReachUser = (result.maxReachDer + result.maxReachIzq) / 2;
        }
        const data = {
          labels: [
            "max20mm",
            "Max Reach Der",
            "Max Reach Izq",
            "Dobles",
            "1-5-9",
            "Min Edge",
            "Bloqueo Der",
            "Bloqueo Izq",
          ],
          datasets: [
            {
              label: "Media de escaladores que escalan " + auth.grado,
              data: [
                max20mm,
                maxReachDer,
                maxReachIzq,
                dobles,
                unoCincoNueve,
                minEdge,
                bloqueoDer,
                bloqueoIzq,
              ],
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              label: auth.nombre,
              data: [
                result &&
                result.max20mmPorcent !== undefined &&
                result.max20mmPorcent !== null
                  ? result.max20mmPorcent / 100
                  : 0,
                result &&
                result.maxReachDer !== undefined &&
                result.maxReachDer !== null
                  ? result.maxReachDer
                  : 0,
                result &&
                result.maxReachIzq !== undefined &&
                result.maxReachIzq !== null
                  ? result.maxReachIzq
                  : 0,
                result && result.dobles !== undefined && result.dobles !== null
                  ? result.dobles
                  : 0,
                unoCincoNueveUser,
                result &&
                result.minEdge !== undefined &&
                result.minEdge !== null
                  ? result.minEdge
                  : 0,

                result.bloqueoDer !== undefined && result.bloqueoDer !== null
                  ? result.bloqueoDer
                  : 0,

                result.bloqueoIzq !== undefined && result.bloqueoIzq !== null
                  ? result.bloqueoIzq
                  : 0,
              ],
              backgroundColor: "rgba(13, 210, 43, 0.2)",
              borderColor: "rgba(13, 210, 43, 1)",
              borderWidth: 1,
            },
          ],
        };
        return <Radar data={data} />;
      }
    }
  }

  if (avgResult == 0) {
    test1avg = 0;
    test2avg = 0;
    test3avg = 0;
    test4avg = 0;
    maxReachDer = 0;
    maxReachIzq = 0;
    max20mm = 0;
  } else {
    test1avg = avgResult[0].test1avg;
    test2avg = avgResult[0].test2avg;
    test3avg = avgResult[0].test3avg;
    test4avg = avgResult[0].test4avg;
    max20mm = avgResult[0].max20mm / 100;
    maxReachDer = avgResult[0].maxReachDer;
    maxReachIzq = avgResult[0].maxReachIzq;
    bloqueoDer = avgResult[0].bloqueoDer;
    bloqueoIzq = avgResult[0].bloqueoIzq;
    dobles = avgResult[0].dobles;
    unoCincoNueve = avgResult[0].unoCincoNueve;
    minEdge = avgResult[0].minEdge;
  }
  return <Box>{renderConditional(results[0])}</Box>;
}
