import React from "react";
import { useAuth } from "../../../hooks/useAuth";

export const Nav = () => {
  const { auth } = useAuth();
  return (
<aside className="lateral">
      <ul>
          <li><a href="/social/results"><span>Resultados</span></a></li>
          <li><a href="/social/test9c"> Nuevo Test 9c</a></li>       
          <li><a href="/social/logout">
          <span>Cerrar Sesión</span></a></li>
        </ul>
    </aside>
  );
};
