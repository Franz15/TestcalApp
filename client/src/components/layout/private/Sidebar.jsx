import React, { useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Tooltip from "@mui/material/Tooltip";
import { Avatar } from "@mui/material";
import { SidebarContext } from "../../../context/SidebarContext";
import "./sidebar.css";

const Sidebar = () => {
  const { sidebarOpen, toggleSidebar } = useContext(SidebarContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Check for mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Menu items configuration for reuse
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, href: "/social/" },
    { text: "Resultados", icon: <EqualizerIcon />, href: "/social/results" },
    { text: "Nuevo Test", icon: <AssignmentIcon />, href: "/social/tests" },
  ];

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`lateral desktop-sidebar ${
          !sidebarOpen ? "sidebar-collapsed" : ""
        }`}
      >
        <div className="sidebar-logo-container">
          <IconButton
            onClick={toggleSidebar}
            className="sidebar-logo"
            aria-label="toggle sidebar"
            sx={{
              "&:hover": { backgroundColor: "transparent" },
              padding: 0,
            }}
            disableRipple
          >
            <Avatar
              src="/testcalapp.png"
              sx={{ width: 52, height: 52 }}
            />
          </IconButton>
          <div className="app-title">TESTCALAPP</div>
        </div>

        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Tooltip
                title={!sidebarOpen ? item.text : ""}
                placement="right"
                arrow
              >
                <a href={item.href} className="sidebar-link">
                  <span className="icon-container">{item.icon}</span>
                  <span className="menu-text">{item.text}</span>
                </a>
              </Tooltip>
            </li>
          ))}
          <li>
            <Tooltip
              title={!sidebarOpen ? "Cerrar SesiÃ³n" : ""}
              placement="right"
              arrow
            >
              <a href="/social/logout" className="sidebar-link">
                <span className="icon-container">
                  <LogoutIcon />
                </span>
                <span className="menu-text logout_text">Cerrar SesiÃ³n</span>
              </a>
            </Tooltip>
          </li>
        </ul>
      </aside>

      {/* Mobile sidebar */}
      <Drawer
        className="mobile-sidebar"
        variant="temporary"
        anchor="left"
        open={sidebarOpen}
        onClose={toggleSidebar}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 250,
          },
        }}
      >
        <Box
          sx={{
            width: 250,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Drawer header with close button */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 1,
            }}
          >
            <IconButton
              className="sidebar-logo-mobile"
              sx={{
                "&:hover": { backgroundColor: "transparent" },
                padding: 0,
              }}
              disableRipple
            >
              <Avatar
                src="/testcalapp.png"
                sx={{ width: 45, height: 45 }}
              />
            </IconButton>
            <IconButton onClick={toggleSidebar} aria-label="close sidebar">
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />

          {/* Menu items */}
          <List sx={{ flexGrow: 1 }}>
            {menuItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  component="a"
                  href={item.href}
                  onClick={toggleSidebar}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {/* Logout at bottom */}
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                href="/social/logout"
                onClick={toggleSidebar}
              >
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Cerrar SesiÃ³n" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
