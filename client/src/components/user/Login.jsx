import { React, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";
import { useAuth } from "../../hooks/useAuth";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import background from "../../assets/img/backgrounds/background3.jpg";
import Note from "../accesories/Note";

export const Login = () => {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_sended");

  const { setAuth } = useAuth();

  const theme = createTheme();

  const loginUser = async (e) => {
    e.preventDefault();

    console.log("form", form);
    console.log("saved", saved);

    //Datos del usuario
    let userToLogin = form;

    //Petición al backend
    const request = await fetch(Global.url + "user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userToLogin),
    });

    const data = await request.json();
    console.log("login data", data);

    if (data.status == "success") {
      //Persistir los datos en el navegador
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setSaved("login");

      //Setear datos en el auth
      setAuth(data.user);
      console.log("data user", data.user);
      console.log("Local Storage", localStorage);
      console.log("Local Storage token", localStorage.token);
      console.log("Local Storage user", localStorage.user);

      //Redirección
      window.location.reload();
    } else setSaved("error");
  };
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
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "rgb(225,179,69)" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={loginUser}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={changed}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={changed}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recuérdame"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    ¿Has olvidado tu contraseña?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/registro" variant="body2">
                    {"¿No tienes cuenta?, regístrate aquí"}
                  </Link>
                </Grid>
              </Grid>
              {saved == "error" ? (
                <strong
                  style={{ color: "#C04000" }}
                  className="alert alert-error"
                >
                  Email o contraseña incorrectos
                </strong>
              ) : (
                ""
              )}
            </Box>
          </Box>
          <Note />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
