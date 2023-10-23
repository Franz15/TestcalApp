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
import background from "../../assets/img/backgrounds/background4.jpg";
import Note from "../accesories/Note";
import Alert from "@mui/material/Alert";

export const Recover = () => {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_sended");
  const [message, setMessage] = useState("");
  const { setAuth } = useAuth();

  const loginUser = async (e) => {
    e.preventDefault();

    //Datos del usuario
    let email = form.email;

    //Petición al backend
    const request = await fetch(Global.url + "user/recover/" + email, {
      method: "GET",
    });

    const data = await request.json();

    if (data.status == "success") {
      setSaved("success");
      setMessage(data.message);
    } else {
      setSaved("error");
      setMessage(data.message);
    }
  };

  return (
    <AppThemeProvider>
      <Grid container component="main" sx={{ height: "100vh" }}>
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
                src="../../../../testcalapp.png"
                sx={{ width: 100, height: 100 }}
              />
              <Typography component="h1" variant="h5">
                Recuperación de contraseña
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Enviar link de recuperación
                </Button>

                <Grid container>
                  <Grid item xs>
                    <Link href="/login" variant="body2" color="secondary">
                      {"Volver a la página de login"}
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

                {saved == "success" ? (
                  <Alert severity="success">{message}</Alert>
                ) : (
                  ""
                )}
              </Box>
            </Box>
          </Grid>
          <Note sx={{ color: "#FFFF", fontSize: "16px" }}> </Note>
        </Grid>
      </Grid>
    </AppThemeProvider>
  );
};
