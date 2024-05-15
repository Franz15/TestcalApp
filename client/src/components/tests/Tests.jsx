import React, { useState } from "react";

import { useAuth } from "../../hooks/useAuth";

import { Global } from "../../helpers/Global";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

import Select from "@mui/material/Select";

export function Tests() {
    const token = localStorage.getItem("token");
  const { auth } = useAuth();

    return (
        <Grid
      container
      spacing={0}
      alignItems="top"
      justify="distance-between"
      padding={3}
      style={{ minHeight: "100vh" }}
    >
     

      <Button
        sx={{
          maxWidth: 700,
          maxHeight: 100,
          display: "flex",
          flexDirection: "column",
          pt: 4,
        }}
        href="/social/test9c"
      >
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" >
             Test 9c
            </Typography>
          </CardContent>
        </Card>
      </Button>

      <Button
        sx={{
          maxWidth: 700,
          maxHeight: 100,
          display: "flex",
          flexDirection: "column",
          pt: 4,
        }}
        href="/social/dedos"
      >
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Dedos
            </Typography>
          </CardContent>
        </Card>
      </Button>

      <Button
        sx={{
          maxWidth: 700,
          maxHeight: 100,
          display: "flex",
          flexDirection: "column",
          pt: 4,
        }}
        href="/social/campus"
      >
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5">
            Campus
            </Typography>
          </CardContent>
        </Card>
      </Button>

      

      <Button
        sx={{
          maxWidth: 700,
          maxHeight: 100,
          display: "flex",
          flexDirection: "column",
          pt: 4,
        }}
        href="/social/pullUp"
      >
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5">
            Pull Up
            </Typography>
          </CardContent>
        </Card>
      </Button>
    </Grid>
    )
}