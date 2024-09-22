import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { Header } from "./Header";
import CircularProgress from "@mui/material/CircularProgress";
import "./privateLayout.css";
import Sidebar from "./Sidebar";
import Footer from "../../accesories/Footer";
import Alert from "@mui/material/Alert";

export const PrivateLayout = () => {
  const { auth, loading } = useAuth();
  const [alertVisible, setAlertVisible] = useState();

  useEffect(() => {
    if (auth.status === "UNVERIFIED") {
      setAlertVisible(true);
    } else {
      setAlertVisible(false);
    }
  });
  if (loading) {
    return <CircularProgress color="inherit" />;
  } else {
    return (
      <div
        className={`private-layout ${
          !alertVisible ? "private-layout-no-alert" : ""
        }`}
      >
        {/* Cabecera */}
        <Header></Header>

        {/* Alerta */}
        <nav className={`alert ${!alertVisible ? "alert-hidden" : ""}`}>
          <div className="alert_message">
            <Alert sx={{ width: "100%" }} severity="error">
              <a href="">El EMAIL NO ESTÁ VERIFICADO, POR FAVOR, VERIFÍCALO</a>
            </Alert>
          </div>
        </nav>

        {/* Contenido principal */}
        <section className="layout__content">
          {auth._id ? <Outlet /> : <Navigate to="/login" />}
        </section>

        {/* Barra lateral */}
        <Sidebar></Sidebar>

        {/* Pie de página */}
        <Footer />
      </div>
    );
  }
};
