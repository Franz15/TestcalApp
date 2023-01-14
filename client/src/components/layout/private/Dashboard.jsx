import React, { useEffect, useState } from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import { Table9c } from "../../accesories/Table9c";
import Ratings from "../../accesories/Ratings";
import { RadarChart } from "../../accesories/RadarChart";
import { LinearChart } from "../../accesories/LinearChart";
import Note from "../../accesories/Note";

export default function Dashboard() {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <Card sx={{ flexGrow: 1, p: 3 }}>
            <Ratings />
          </Card>
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <Card sx={{ flexGrow: 1, p: 3 }}>
            <RadarChart />{" "}
          </Card>
        </Grid>
        <Grid item xs={8} sm={8} md={8}>
          <Card sx={{ maxHeight: "475px", flexGrow: 1, p: 3 }}>
            <Table9c />{" "}
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <LinearChart />
        </Grid>
      </Grid>
      <Note />
    </Box>
  );
}
