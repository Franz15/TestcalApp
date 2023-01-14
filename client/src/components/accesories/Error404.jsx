import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import background from "../../assets/img/backgrounds/background1.jpg"
import Avatar from '@mui/material/Avatar';
import Paper from "@mui/material/Paper";





import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Container from '@mui/material/Container';
import {createTheme, ThemeProvider } from '@mui/material/styles';
const Error404 = () => {
  const theme = createTheme();
  return (

<ThemeProvider theme={theme}>
<Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${background})`,
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "right",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square >
        <Box
          sx={{
            marginTop: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            src="../../../../testcalapp.png"
            sx={{ width: 100, height: 100 }}
          />
          <Typography component="h1" variant="h4">
          Error 404
          </Typography>
          <Typography> Oops, parece que te has perdido, pincha aqui para <Link to="/" style={{ color: 'rgb(232, 191, 86)', textDecoration: 'none' }}>Volver al inicio</Link></Typography>

        </Box>
        </Grid>
    </Grid>
      
    </ThemeProvider>
    





    




    
  
  )
}

export default Error404