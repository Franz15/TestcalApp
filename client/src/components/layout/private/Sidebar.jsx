import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

const Sidebar = () => {
  return (
    <aside className="lateral">
      <ul>
        <li>
          <a href="/social/results">
            <span>Resultados</span>
          </a>
        </li>
        <li>
          <a href="/social/test9c"> Nuevo Test 9c</a>
        </li>
        <li>
          <a href="/social/logout">
            <LogoutIcon></LogoutIcon>{" "}
            <span className="logout_text"> Cerrar Sesión</span>
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
