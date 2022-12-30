import React, { useEffect, useState } from "react";
import { Global } from "../../../helpers/Global";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Header } from './Header';
import Sidebar from './Sidebar';
import Grid from '@mui/material/Grid';
import getLastResult from "../../../hooks/test9c/getLastResult";
import { Table9c } from "../../accesories/Table9c";
export default function Dashboard() {
  
  //Token de autenticación
  const token = localStorage.getItem("token");

  let  result= getLastResult();
 
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header></Header>
      <Sidebar></Sidebar>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Box
              sx={{
                p: 2,
                bgcolor: 'background.default',
                justifyContent: "space-between"
              }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ mb: 2}}>{"Fuerza de Dedos"}</Box>
                  {result != null &&<Rating name="ratingTest1" value={(result.test1Punt/2)} precision={0.5} readOnly sx={{ flexGrow: 1}} />}
                  {result == null &&<Rating name="ratingTest1" value={(0)} precision={0.5} readOnly sx={{ flexGrow: 1}} />}
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ mb: 2}}>{"Fuerza de Tracción"}</Box>
                  {result != null &&<Rating name="ratingTest2" value={(result.test2Punt/2)} precision={0.5} readOnly sx={{ flexGrow: 1}} />}                  
                  {result == null &&<Rating name="ratingTest2" value={(0)} precision={0.5} readOnly sx={{ flexGrow: 1}} />}
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ mb: 2}}>{"Fuerza Abdominal"}</Box>
                  {result != null &&<Rating name="ratingTest3" value={(result.test3Punt/2)} precision={0.5} readOnly sx={{ flexGrow: 1}} />}                 
                  {result == null &&<Rating name="ratingTest3" value={(0)} precision={0.5} readOnly sx={{ flexGrow: 1}} />}
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ mb: 2}}>{"Fuerza de agarre"}</Box>
                  {result != null &&<Rating name="ratingTest4" value={(result.test4Punt/2)} precision={0.5} readOnly sx={{ flexGrow: 1}} />}                  
                  {result == null &&<Rating name="ratingTest4" value={(0)} precision={0.5} readOnly sx={{ flexGrow: 1}} />}
                  </Grid>
                  

                </Grid>
        </Box>
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Table9c></Table9c>
        </Box>
        <Typography paragraph sx={{ flexGrow: 1, p: 3 }}>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>
    </Box>
  );
}