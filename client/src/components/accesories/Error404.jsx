import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import background from "../../assets/img/backgrounds/background1.jpg";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Error404 = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "rgb(232, 191, 86)",
      },
    },
  });

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
            backgroundPosition: "center",
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              zIndex: 1,
            },
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f8f9fa",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "80%",
              textAlign: "center",
              py: 4,
            }}
          >
            <Box sx={{ position: "relative", mb: 3 }}>
              <Box
                sx={{
                  position: "relative",
                  display: "inline-block",
                  width: 80,
                  height: 80,
                }}
              >
                <Avatar
                  src="/testcalapp.png"
                  sx={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
                <Box
                  sx={{
                    content: '""',
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    border: "2px solid var(--color-principal)",
                    boxSizing: "border-box",
                    top: 0,
                    left: 0,
                    zIndex: 0,
                  }}
                />
              </Box>
            </Box>

            <ErrorOutlineIcon
              color="error"
              sx={{
                fontSize: 60,
                mb: 2,
                opacity: 0.8,
              }}
            />

            <Typography
              component="h1"
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 1,
                color: "#333",
              }}
            >
              Error 404
            </Typography>

            <Typography
              variant="h6"
              sx={{
                mb: 1,
                color: "#555",
                fontWeight: 500,
              }}
            >
              Página no encontrada
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 4,
                color: "#666",
                maxWidth: "90%",
              }}
            >
              Lo sentimos, la página que estás buscando no existe o ha sido
              movida.
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
              }}
            >
              <Button
                component={Link}
                to="/"
                variant="contained"
                color="primary"
                startIcon={<HomeIcon />}
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  boxShadow: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: 4,
                    backgroundColor: "rgb(212, 171, 66)"
                  }
                }}
              >
                Volver al inicio
              </Button>

              <Button
                component="a"
                onClick={() => window.history.back()}
                variant="outlined"
                color="primary"
                startIcon={<ArrowBackIcon />}
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 4px 8px rgba(232, 191, 86, 0.3)",
                    backgroundColor: "rgba(232, 191, 86, 0.08)"
                  }
                }}
              >
                Página anterior
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Error404;
