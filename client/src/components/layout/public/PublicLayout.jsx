import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import Footer from "../../accesories/Footer";
import "./publicLayout.css";

export const PublicLayout = () => {
  const { auth } = useAuth();

  return (
    <div className="public-layout">
      {/* Contenido Principal */}
      <section className="public__content">
        {!auth._id ? <Outlet /> : <Navigate to="/social/" />}
      </section>
       {/* Pie de página */}
       <Footer />
    </div>
  );
};
