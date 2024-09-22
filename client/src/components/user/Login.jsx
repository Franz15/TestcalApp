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
import Typography from "@mui/material/Typography";
import AppThemeProvider from "../../assets/theme/Theme";
import background from "../../assets/img/backgrounds/background5.jpg";
import "./login.css";
import Alert from "@mui/material/Alert";

export const Login = () => {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_sended");
  const [message, setMessage] = useState("");
  const { setAuth } = useAuth();

  const loginUser = async (e) => {
    e.preventDefault();

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

    if (data.status == "success") {
      //Persistir los datos en el navegador
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setSaved("login");

      //Setear datos en el auth
      setAuth(data.user);

      //Redirección
      window.location.reload();
    } else {
      setSaved("error");
      setMessage(data.message);
    }
  };
  return (
    <AppThemeProvider>
      <Grid
        container
        component="main"
        sx={{
          height: {
            xs: "100vh",
            sm: "100vh",
            md: "100vh",
            lg: "100vh",
            xl: "100vh",
          },
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={12}
          md={12}
          sx={{
            backgroundImage: `url(${background})`,
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={5}
            sx={{ margin: "auto", marginTop: "22vh" }}
            component={Paper}
            elevation={6}
          >
            <Box
              sx={{
                py: 6,
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                margin="normal"
                src="../../../../testcalapp.png"
                sx={{ width: 100, height: 100 }}
              />
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
                    <Link
                      href="/recuperacion"
                      variant="body2"
                      color="secondary"
                    >
                      {"¿Has olvidado tu contraseña?"}
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/registro" variant="body2" color="secondary">
                      {"¿No tienes cuenta?, regístrate aquí"}
                    </Link>
                  </Grid>
                </Grid>
                {saved == "error" ? (
                  <Alert severity="error">{message}</Alert>
                ) : (
                  ""
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </AppThemeProvider>
    /*
  
  
  <div className="layout">

    <section className="content">
       
        <article className="card">
            <img className="title__img"/>
            <div className="login__form">
                <h3 className="login__title">Login</h3>
                <form className="form">
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Contraseña"/>
                    <div className="form__submit">
                        <label className="remember-me">
                            <input type="checkbox" className="remember-me__checkbox"/>
                            Recuérdame
                        </label>
                        <button type="submit" className="login">Login</button>
                    </div>
                    <div className="form__actions">
                    <a href="#" className="forgot-password">¿Has olvidado tu contraseña?</a>
                    <a href="/registro" className="register">¿No tienes cuenta?, regístrate aquí</a>
                    {saved == "error" ? (
                  <Alert severity="error">{message}</Alert>
                ) : (
                  ""
                )}
                </div>
                </form>
            </div>
        </article>
    </section>
   </div>*/
  );
};
