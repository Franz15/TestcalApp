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
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ paddingTop: 2, overflow: 'auto' }}>
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      
 
  );
};

export default Sidebar;


/*   <aside className="layout__aside">
      <header className="aside__header">
        <h1 className="aside__title">Hola, {auth.nombre}</h1>
      </header>

      <div className="aside__container">
        <div className="aside__profile-info">
          <div className="profile-info__general-info">
            <div className="general-info__container-avatar">
              {auth.image != "default.png" && <img src={Global.url + "user/avatar/" + auth.image} className="container-avatar__img" alt="Foto de perfil"/>}
              {auth.image == "default.png" && <img src={avatar} className="container-avatar__img" alt="Foto de perfil"/>}
              
            </div>

            <div className="general-info__container-names">
              <a href="#" className="container-names__name">
                {auth.nombre} {auth.apellido}
              </a>
              <p className="container-names__nickname">{auth.user}</p>
            </div>
          </div>

          
        </div>

        <div className="aside__container-form">
          <form className="container-form__form-post">
          </form>
        </div>
      </div>
    </aside>*/