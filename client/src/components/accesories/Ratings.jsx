import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

function Ratings({ results }) {
  const [result, setResult] = useState(results[0]);

  useEffect(() => {
    for (let i = 0; i < results.length; i++ ){
      if (results[i]._type === "test9c"){
        setResult(results[i]);
        break;
      }else{
      }
    }
    
  }, [results, result]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <Box sx={{ mb: 2 }}>{"Fuerza de Dedos"}</Box>
        {result != null && (
          <Rating
            name="ratingTest1"
            value={result.test1Punt / 2}
            precision={0.5}
            readOnly
            sx={{ flexGrow: 1 }}
          />
        )}
        {result == null && (
          <Rating
            name="ratingTest1"
            value={0}
            precision={0.5}
            readOnly
            sx={{ flexGrow: 1 }}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Box sx={{ mb: 2 }}>{"Fuerza de Tracción"}</Box>
        {result != null && (
          <Rating
            name="ratingTest2"
            value={result.test2Punt / 2}
            precision={0.5}
            readOnly
            sx={{ flexGrow: 1 }}
          />
        )}
        {result == null && (
          <Rating
            name="ratingTest2"
            value={0}
            precision={0.5}
            readOnly
            sx={{ flexGrow: 1 }}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Box sx={{ mb: 2 }}>{"Fuerza Abdominal"}</Box>
        {result != null && (
          <Rating
            name="ratingTest3"
            value={result.test3Punt / 2}
            precision={0.5}
            readOnly
            sx={{ flexGrow: 1 }}
          />
        )}
        {result == null && (
          <Rating
            name="ratingTest3"
            value={0}
            precision={0.5}
            readOnly
            sx={{ flexGrow: 1 }}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Box sx={{ mb: 2 }}>{"Fuerza de agarre"}</Box>
        {result != null && (
          <Rating
            name="ratingTest4"
            value={result.test4Punt / 2}
            precision={0.5}
            readOnly
            sx={{ flexGrow: 1 }}
          />
        )}
        {result == null && (
          <Rating
            name="ratingTest4"
            value={0}
            precision={0.5}
            readOnly
            sx={{ flexGrow: 1 }}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default Ratings;
