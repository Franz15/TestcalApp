import React, { useEffect, useState } from "react";
import { Box, Card, Grid } from "@mui/material";
import { Global } from "../../../helpers/Global";
import { Table9c } from "../../accesories/Table9c";
import Ratings from "../../accesories/Ratings";
import { RadarChart } from "../../accesories/RadarChart";
import { LinearChart } from "../../accesories/LinearChart";
import Note from "../../accesories/Note";
import { useAuth } from "../../../hooks/useAuth";
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
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          {auth.status === "UNVERIFIED" ? (
            <Alert sx={{ mt: -3, mb: 2 }} severity="error">
              El EMAIL NO ESTÁ VERIFICADO, POR FAVOR, VERIFÍCALO
            </Alert>
          ) : (
            ""
          )}
          <Card sx={{ flexGrow: 1, p: 3 }}>
            <Ratings results={results} />
          </Card>
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <Card sx={{ flexGrow: 1, p: 3 }}>
            <RadarChart results={results} />{" "}
          </Card>
        </Grid>
        <Grid item xs={8} sm={8} md={8}>
          <Card sx={{ maxHeight: "475px", flexGrow: 1, p: 3 }}>
            <Table9c results={results} handleResults={handleResults} />{" "}
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <LinearChart results={results} />
        </Grid>
      </Grid>
      <Note />
    </Box>
  );
}
