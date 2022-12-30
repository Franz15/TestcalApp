import React from "react";
import { Global } from "../../../helpers/Global";
import {useAuth} from "../../../hooks/useAuth";
import Box from '@mui/material/Box';
import avatar from "../../../assets/img/user.png";
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import LogoutIcon from '@mui/icons-material/Logout';

import Typography from '@mui/material/Typography';

const drawerWidth = 240;

const Sidebar = () => {
  
  const {auth} = useAuth();

  console.log("auth", auth);
  
  return (

    <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
        
        }}
      >
        <Toolbar />
        <Box sx={{ paddingTop: 2, overflow: 'auto' }}>
          <List>
              <ListItem disablePadding>
                <ListItemButton to ="/social/results">
                  <ListItemText primary="Resultados Test 9C" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton to ="/social/test9c">
                  <ListItemText primary="Nuevo Test 9C" />
                </ListItemButton>
              </ListItem>
              </List>
          </Box>
          <Box sx={{ position: 'absolute',width:'100vh', bottom: 0, overflow: 'auto' }}>
          <List>
          <ListItem disablePadding>
                <ListItemButton to ="/social/logout">
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