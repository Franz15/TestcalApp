import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import getAvgResult from "../../hooks/test9c/getAvgResult";
import getLastResult from "../../hooks/test9c/getLastResult";
import useScoresConversor, { useScoresConversorInverted } from "../../hooks/useScoresConversor";

export function Scores({results}) {

  const opt = "push";

  let allResults = getAvgResult(opt);
  let lastResult = getLastResult();

  const [bloqueoDerScore, setBloqueoDerScore] = useState();
  const [bloqueoIzqScore, setBloqueoIzqScore] = useState();
  const [doblesScore, setDoblesScore] = useState();
  const [max20mmScore, setMax20mmScore] = useState();
  const [minEdgeScore, setMinEdgeScore] = useState();
  const [maxReachDerScore, setMaxReachDerScore] = useState();
  const [maxReachIzqScore, setMaxReachIzqScore] = useState();

  const obtenerEstilos = (val) => {
    if (val < 5) {
      return {color: 'rgb(204, 51, 0)', fontWeight: 'bold' };
    } else if (val >= 5 && val < 10) {
      return {color: 'rgb(255, 183, 77)', fontWeight: 'bold' };
    } else if (val >= 10 && val < 15) {
      return {color: 'rgb(245, 124, 0)', fontWeight: 'bold' };
    } else {
      return {color: 'rgb(31, 128, 71)', fontWeight: 'bold' };
    }
  };

  useEffect(() => {
    let resultado;

    let totalBloqueoDer = 0;
    let allBloqueoDer = 0;
    let totalReachDer = 0;
    let allReachDer = 0;
    let totalReachIzq = 0;
    let allReachIzq = 0;
    let totalBloqueoIzq = 0;
    let allBloqueoIzq = 0;
    let allDobles = 0;
    let totalDobles = 0;
    let allMax20mm = 0;
    let totalMax20mm = 0;
    let allMinEdge = 0;
    let totalMinEdge = 0;
    
    //Calculo de percentiles
    if (allResults[0]){
      allBloqueoDer = allResults[0].bloqueoDer;
      allBloqueoIzq = allResults[0].bloqueoIzq;
      allDobles = allResults[0].dobles;
      allMax20mm = allResults[0].max20mm;
      allReachDer = allResults[0].maxReachDer;
      allReachIzq = allResults[0].maxReachIzq;
      allMinEdge = allResults[0].minEdge;

      if (allBloqueoDer && lastResult[0]){
        for (let i = 0; i < allBloqueoDer.length; i++) {
          totalBloqueoDer = totalBloqueoDer + allBloqueoDer[i];
        }
        let media = totalBloqueoDer/allBloqueoDer.length;
        resultado = (lastResult[0].bloqueoDerLast/media)*50;
        setBloqueoDerScore(useScoresConversor(resultado));      
      }
      if (allBloqueoIzq && lastResult[0]){
        for (let i = 0; i < allBloqueoIzq.length; i++) {
          totalBloqueoIzq = totalBloqueoIzq + allBloqueoIzq[i];
        }
        let media = totalBloqueoIzq/allBloqueoIzq.length;
        resultado = (lastResult[0].bloqueoIzqLast /media)*50;
        setBloqueoIzqScore(useScoresConversor(resultado));
      }
      if (allDobles && lastResult[0]){
        for (let i = 0; i < allDobles.length; i++) {
          totalDobles = totalDobles + allDobles[i];
        }
        let media = totalDobles/allDobles.length;
        resultado = (lastResult[0].doblesLast/media)*100;
        setDoblesScore(useScoresConversor(resultado));
        resultado = 0;
      }
      if (allMax20mm && lastResult[0]){
        for (let i = 0; i < allMax20mm.length; i++) {
          totalMax20mm = totalMax20mm + allMax20mm[i];
        }
        let media = totalMax20mm/allMax20mm.length;
        resultado = (lastResult[0].max20mmLast/media)*50;
        setMax20mmScore(useScoresConversor(resultado));
      }
      if (allReachDer && lastResult[0]){
        for (let i = 0; i < allReachDer.length; i++) {
          totalReachDer = totalReachDer + allReachDer[i];
        }
        let media = totalReachDer/allReachDer.length;
        resultado = (lastResult[0].maxReachDerLast/media)*100;
        setMaxReachDerScore(useScoresConversor(resultado));
      }
      if (allReachIzq && lastResult[0]){
        for (let i = 0; i < allReachIzq.length; i++) {
          totalReachIzq = totalReachIzq + allReachIzq[i];
        }
        let media = totalReachIzq/allReachIzq.length;
        resultado = (lastResult[0].maxReachIzqLast/media)*100;
        setMaxReachIzqScore(useScoresConversor(resultado));
      }
      if (allMinEdge && lastResult[0]){
        for (let i = 0; i < allMinEdge.length; i++) {
          totalMinEdge = totalMinEdge + allMinEdge[i];
        }
        let media = totalMinEdge/allMinEdge.length;
        if (lastResult[0].minEdgeLast != 0){
          resultado = (lastResult[0].minEdgeLast/media)*100;
          
        }else{
          resultado = 0;

        }
        setMinEdgeScore(useScoresConversorInverted(resultado));
      }
    }
    
    
  }, [results]);
  

  

  return (
    <Grid container spacing={2}>
     
      <Grid item xs={12} sm={6} md={3}>
        <Box sx={{ mb: 2 }}>{"Bloqueo derecho"}</Box>
        {allResults[0] != null && (
          <div style={obtenerEstilos(bloqueoDerScore)}>
          {bloqueoDerScore}
        </div> 
        )}
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Box sx={{ mb: 2 }}>{"Bloqueo izquierdo"}</Box>
        {allResults[0] != null && (
          <div style={obtenerEstilos(bloqueoIzqScore)}>
          {bloqueoIzqScore}
        </div>      
        )}
     </Grid>
     <Grid item xs={12} sm={6} md={3}>
        <Box sx={{ mb: 2 }}>{"Dobles"}</Box>
        {allResults[0] != null && (
          <div style={obtenerEstilos(doblesScore)}>
          {doblesScore}
        </div>      
        )}
     </Grid>
     <Grid item xs={12} sm={6} md={3}>
        <Box sx={{ mb: 2 }}>{"Maximo peso en regleta de 20mm"}</Box>
        {allResults[0] != null && (
          <div style={obtenerEstilos(max20mmScore)}>
          {max20mmScore}
        </div>      
        )}
     </Grid>
     <Grid item xs={12} sm={6} md={3}>
        <Box sx={{ mb: 2 }}>{"Max Reach Der"}</Box>
        {allResults[0] != null && (
          <div style={obtenerEstilos(maxReachDerScore)}>
          {maxReachDerScore}
        </div>      
        )}
     </Grid>
     <Grid item xs={12} sm={6} md={3}>
        <Box sx={{ mb: 2 }}>{"Max Reach izq"}</Box>
        {allResults[0] != null && (
          <div style={obtenerEstilos(maxReachIzqScore)}>
          {maxReachIzqScore}
        </div>      
        )}
     </Grid>
     <Grid item xs={12} sm={6} md={3}>
        <Box sx={{ mb: 2 }}>{"Regleta mínima"}</Box>
        {allResults[0] != null && (
          <div style={obtenerEstilos(minEdgeScore)}>
          {minEdgeScore}
        </div>      
        )}
     </Grid>
    </Grid>
  );
}

export default Scores;
