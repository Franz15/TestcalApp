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
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
      }}
    >
      <Toolbar />
      <Box sx={{ paddingTop: 2 }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton to="/social/results">
              <ListItemText primary="Resultados Test 9C" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton to="/social/test9c">
              <ListItemText primary="Nuevo Test 9C" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Box sx={{ position: "absolute", width: "240", bottom: 0 }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton to="/social/logout">
              <LogoutIcon></LogoutIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
