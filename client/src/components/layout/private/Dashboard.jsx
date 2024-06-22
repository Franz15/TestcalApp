import React, {useState, useEffect} from "react";
import { Box, Card, Grid } from "@mui/material";
import { Table9c } from "../../accesories/Table9c";
import { Global } from "../../../helpers/Global";
import { Table9c } from "../../accesories/Table9c";
import Ratings from "../../accesories/Ratings";
import { RadarChart } from "../../accesories/RadarChart";
import { LinearChart } from "../../accesories/LinearChart";
import Note from "../../accesories/Note";
import { useAuth } from "../../../hooks/useAuth";
import "./dashboard.css";
import Alert from "@mui/material/Alert";
import getLastResult from "../../../hooks/test9c/getLastResult";

export default function Dashboard() {
  //Token de autenticación
  const token = localStorage.getItem("token");
  const { auth, loading } = useAuth();
  const [results, setResults] = useState([]);
  const [avgResult, setAvgResult] = useState([]);

  const getResults = async () => {
    const request = await fetch(Global.url + "results/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await request.json();
    if (data.status == "success" && data.results) {
      setResults(data.results);
    } else {
      setResults(0);
    }
  };

  const getAvgResult = async () => {
    const request = await fetch(Global.url + "results/grade/" + auth._id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await request.json();
    if (data.status == "success") {
      if (data.result != null) {
        setAvgResult(data.result[0]);
      } else {
        setAvgResult(0);
      }
    } else {
    }
  };

  function handleResults(results) {
    setResults(results);
  }

  useEffect(() => {
    getResults();
    getAvgResult();
  }, []);

  return (
    <>
      {/* Contenido principal */}
      <section className="content">
        {/* Aqui van las películas */}
        <article className="ratings">
          <Ratings results={results} />
        </article>

        <article className="radar-chart">
          <div>
            <RadarChart results={results} />
          </div>
        </article>

        <article className="table">
          <Table9c results={results} handleResults={handleResults} />
        </article>

        <article className="linear-chart">
          <LinearChart results={results} />
        </Grid>
      </Grid>
      <Note />
    </Box>
  );
}
