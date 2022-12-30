import React from "react";
import { Nav } from "./Nav";
import AppBar from '@mui/material/AppBar';
import { Global } from "../../../helpers/Global";
import Toolbar from '@mui/material/Toolbar';
import {Avatar, Tooltip} from '@mui/material';
import Typography from '@mui/material/Typography';
import profileImg from "../../../assets/img/user.png";
import {useAuth} from "../../../hooks/useAuth";


export const Header = () => {
  const {auth} = useAuth();
  console.log (Global.url + "user/avatar/" + auth.image);
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'rgb(232,191,86)' }}>
        <Toolbar position="sticky" sx ={{width: 'fullWidth', justifyContent: "space-between"}}>
        <Avatar src='../../../../testcalapp.png' sx={{ width: 76, height: 76 }} />
          
          <Avatar  src={Global.url + "user/avatar/" + auth.image} sx={{width: 46, height: 46 }}/>
          

           
        </Toolbar>
        
      </AppBar>

      
  );
};
