import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {useAuth} from "../../../hooks/useAuth";
import { Footer } from "./Footer";
import { Header } from "./Header";
import Sidebar from "./Sidebar";

export const PrivateLayout = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <h1>Cargando...</h1>;
  } else {
    return (
      <>
        {/* LAYOUT */}

        {/* Cabecera y navegación */}
        <Header></Header>

        {/* Contenido Principal */}
        <section className="layout__content">
          {auth._id ? <Outlet /> : <Navigate to="/login" />}
        </section>

        {/* Barra lateral */}
        <Sidebar></Sidebar>

       
      </>
    );
  }
};
