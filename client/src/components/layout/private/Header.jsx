import React from "react";
import AppBar from "@mui/material/AppBar";
import { Global } from "../../../helpers/Global";
import Toolbar from "@mui/material/Toolbar";
import { Avatar, IconButton } from "@mui/material";
import { useAuth } from "../../../hooks/useAuth";


export const Header = () => {
  const { auth } = useAuth();

  return (
    <>
    
    <header className="header">
      <div className="logo">
    <IconButton href="/social/" className="icon-button">
          <Avatar
            src="../../../../testcalapp.png"
            sx={{ width: 100, height: 100 }}
          />
        </IconButton>
          </div>
          
          <div className="logo">
          <IconButton href="/social/ajustes" className="icon-button">
          <Avatar
            src={Global.url + "user/avatar/" + auth.image}
            sx={{ width: 70, height: 70 }}/>
        </IconButton>
          </div>
      </header>
    </>
  );
};
