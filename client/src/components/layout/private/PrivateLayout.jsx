import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Global } from "../../../helpers/Global";
import { useAuth } from "../../../hooks/useAuth";
import { Header } from "./Header";
import CircularProgress from "@mui/material/CircularProgress";
import "./privateLayout.css";
import Sidebar from "./Sidebar";
import Footer from "../../accesories/Footer";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Grow from "@mui/material/Grow";

export const PrivateLayout = () => {
  const token = localStorage.getItem("token");
  const { auth, loading } = useAuth();
  const [alertVisible, setAlertVisible] = useState();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false); // Cierra la alerta
  };

  const handleVerification = async () => {
    const request = await fetch(Global.url + "user/confirm/" + token, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await request.json();
    if (data.status == "success") {
      setOpen(true);
    }
  };

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
            <Alert
              onClick={handleVerification}
              sx={{ width: "100%", cursor: "pointer" }}
              severity="error"
            >
              <a>El EMAIL NO ESTÁ VERIFICADO, POR FAVOR, VERIFÍCALO</a>
            </Alert>
          </div>
          <Snackbar
            open={open}
            autoHideDuration={6000} // Se ocultará automáticamente después de 3 segundos
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }} // Posición de la alerta
            TransitionComponent={Grow} // Transición de tipo Grow
            transitionDuration={{ enter: 1000, exit: 1000 }} // Duración de la animación en milisegundos
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%", cursor: "pointer" }}
            >
              El email se ha enviado, por favor, revise su correo
            </Alert>
          </Snackbar>
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
