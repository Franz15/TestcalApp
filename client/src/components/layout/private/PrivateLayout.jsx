import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { Header } from "./Header";
import Sidebar from "./Sidebar";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import './privateLayout.css'

export const PrivateLayout = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <CircularProgress color="inherit" />;
  } else {
    return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header></Header>
        <Sidebar></Sidebar>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Box sx={{ width: "100%" }}>
            {/* Contenido Principal */}
            <section className="layout__content">
              {auth._id ? <Outlet /> : <Navigate to="/login" />}
            </section>
            {/* Barra lateral */}
            <Sidebar></Sidebar>
          </Box>
        </Box>
      </Box>
    );
  }
};
