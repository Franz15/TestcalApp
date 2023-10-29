import React from "react";
import AppBar from "@mui/material/AppBar";
import { Global } from "../../../helpers/Global";
import Toolbar from "@mui/material/Toolbar";
import { Avatar, IconButton } from "@mui/material";
import { useAuth } from "../../../hooks/useAuth";

export const Header = () => {
  const { auth } = useAuth();

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: "rgb(232,191,86)",
      }}
    >
      <Toolbar
        position="sticky"
        sx={{ width: "fullWidth", justifyContent: "space-between" }}
      >
        <IconButton href="/social/" sx={{ width: 70, height: 70 }}>
          <Avatar
            src="../../../../testcalapp.png"
            sx={{ width: 76, height: 76 }}
          />
        </IconButton>

        <IconButton href="/social/ajustes" sx={{ width: 70, height: 70 }}>
          <Avatar
            src={Global.url + "user/avatar/" + auth.image}
            sx={{ width: 60, height: 60 }}
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
