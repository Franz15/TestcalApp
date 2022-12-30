import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import { Header } from "../layout/private/Header";
import Sidebar from "../layout/private/Sidebar";
import { Table9c } from "../accesories/Table9c";

export function Results() {
  
  return (
    
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header></Header>
      <Sidebar></Sidebar>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
      <section className="layout__content"/>
        <header className="content__header">
          <h1 className="content__title">Resultados Test 9C</h1>
        </header>
        <Table9c></Table9c>
      </Box>
    </Box>
    
  );

  
}
