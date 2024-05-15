import React, {useState, useEffect} from "react";
import { Box, Card, Grid } from "@mui/material";
import { Table9c } from "../../accesories/Table9c";
import { Global } from "../../../helpers/Global";
import Ratings from "../../accesories/Ratings";
import Scores from "../../accesories/Scores";
import { RadarChart } from "../../accesories/RadarChart";
import { LinearChart } from "../../accesories/LinearChart";
import Note from "../../accesories/Note";
import { useAuth } from "../../../hooks/useAuth";
import Alert from "@mui/material/Alert";


/*


Implementar sistema FM 1-20 por percentiles.  tus resultados <= media escaladores tu nivel/ 2 : 1, tus resultados = media escaladores tu nivel/ 1.5 : 5, tus resultados = media escaladores tu nivel : 10, tus resultados = 1,5x media escaladores tu nivel: 15, tus resultados => 2 x media escaladores tu nivel: 20


*/


export default function Dashboard() {
  //Token de autenticación
  const token = localStorage.getItem("token");
  const { auth, loading } = useAuth();
  const [results, setResults] = useState([]);
  const [type, setType] = useState("");
  const [globalResults, setGlobalResults] = useState([]);
  const [avgResult, setAvgResult] = useState([]);

  const getResults = async () => {
    let request = await fetch(Global.url + "results/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({_type:"test9c"}),
    });

    let data = await request.json();
    if (data.status == "success") {
      setResults(data.results);
      setType("test9c");
    } else {
      setResults(0);
    }
    request = await fetch(Global.url + "results/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      
    });

    data = await request.json();
    if (data.status == "success") {
      setGlobalResults(data.results);
    } else {
      setGlobalResults(0);
    }
  };

  const getAvgResult = async () => {
    const request = await fetch(Global.url + "results/grade/" + auth._id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await request.json();
    if (data.status == "success") {
      if (data.result != null) {
        setAvgResult(data.result);
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
              EL EMAIL NO ESTÁ VERIFICADO, POR FAVOR, VERIFÍCALO
            </Alert>
          ) : (
            ""
          )}
          <Card sx={{ flexGrow: 1, p: 3 }}>
            <Ratings results={results} />
          </Card>
          <Card sx={{ flexGrow: 1, p: 3 }}>
            <Scores results={results} />
          </Card>
        </Grid>
        <Grid item xs={3} sm={3} md={3}>
          <Card sx={{ flexGrow: 1, p: 3 }}>
            <RadarChart results={results} type ={type}/>{" "}
          </Card>
        </Grid>
        <Grid item xs={3} sm={3} md={3}>
          <Card sx={{ flexGrow: 1, p: 3 }}>
            <RadarChart results={globalResults} />{" "}
          </Card>
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
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
