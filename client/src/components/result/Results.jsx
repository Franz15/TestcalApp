import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Table9c } from "../accesories/Table9c";
import Note from "../accesories/Note";

export function Results() {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <section className="layout__content" />
      <header className="content__header">
        <h1 className="content__title">Resultados Test 9C</h1>
      </header>
      <Table9c />
      <Note sx={{ mt: "10vh" }} />
    </Box>
  );
}
