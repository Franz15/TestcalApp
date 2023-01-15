import { React, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import background from "../../assets/img/backgrounds/background2.jpg";
import Note from "../accesories/Note";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import AppThemeProvider from "../../assets/theme/Theme";
export const Register = () => {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_sended");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    //Prevenir actualización de la pantalla
    e.preventDefault();
    //recoger los datos del formulario
    let newUser = form;

    //Guardar usuario en el backend
    const request = await fetch(Global.url + "user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const data = await request.json();

    if (data.status == "success") {
      setSaved("saved");
      setMessage(data.message);
      //Navigate al login
      navigate("/login");
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
              my: 0,
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
              Registro
            </Typography>
            <Box component="form" onSubmit={saveUser} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="nombre"
                label="Nombre"
                name="nombre"
                autoComplete="nombre"
                type="text"
                autoFocus
                onChange={changed}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="apellido"
                label="Apellido"
                name="apellido"
                autoComplete="apellido"
                type="text"
                autoFocus
                onChange={changed}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Dirección de correo electrónico"
                name="email"
                autoComplete="email"
                type="email"
                autoFocus
                onChange={changed}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="user"
                label="Nombre de Usuario"
                name="user"
                type="text"
                autoFocus
                onChange={changed}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                onChange={changed}
              />

              <TextField
                required
                fullWidth
                margin="normal"
                id="standard-select-currency"
                select
                label="Máximo grado encadenado en roca"
                defaultValue="IV"
              >
                <MenuItem value={"IV"}>IV</MenuItem>
                <MenuItem value={"V"}>V</MenuItem>
                <MenuItem value={"6a"}>6a</MenuItem>
                <MenuItem value={"6a+"}>6a+</MenuItem>
                <MenuItem value={"6b"}>6b</MenuItem>
                <MenuItem value={"6b+"}>6b+</MenuItem>
                <MenuItem value={"6c"}>6c</MenuItem>
                <MenuItem value={"6c+"}>6c+</MenuItem>
                <MenuItem value={"7a"}>7a</MenuItem>
                <MenuItem value={"7a+"}>7a+</MenuItem>
                <MenuItem value={"7b"}>7b</MenuItem>
                <MenuItem value={"7b+"}>7b+</MenuItem>
                <MenuItem value={"7c"}>7c</MenuItem>
                <MenuItem value={"7c+"}>7c+</MenuItem>
                <MenuItem value={"8a"}>8a</MenuItem>
                <MenuItem value={"8a+"}>8a+</MenuItem>
                <MenuItem value={"8b"}>8b</MenuItem>
                <MenuItem value={"8b+"}>8b+</MenuItem>
                <MenuItem value={"8c"}>8c</MenuItem>
                <MenuItem value={"8c+"}>8c+</MenuItem>
                <MenuItem value={"9a"}>9a</MenuItem>
                <MenuItem value={"9a+"}>9a+</MenuItem>
                <MenuItem value={"9b"}>9b</MenuItem>
                <MenuItem value={"9b+"}>9b+</MenuItem>
                <MenuItem value={"9c"}>9c</MenuItem>
              </TextField>
              <TextField
                sx={{ mt: 2 }}
                margin="normal"
                required
                fullWidth
                id="altura"
                label="Altura (en cm)"
                name="altura"
                autoComplete="altura"
                autoFocus
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                onChange={changed}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="peso"
                label="Peso (en kg)"
                name="peso"
                autoComplete="peso"
                autoFocus
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                onChange={changed}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="envergadura"
                label="Envergadura (en cm)"
                name="envergadura"
                autoComplete="envergadura"
                type="number"
                autoFocus
                InputProps={{ inputProps: { min: 0 } }}
                onChange={changed}
              />
              {saved == "error" ? (
                <Alert severity="error">{message}</Alert>
              ) : (
                ""
              )}
              {saved == "saved" ? (
                <strong
                  style={{ color: "#1e8501" }}
                  className="alert alert-success"
                >
                  Usuario registrado Correctamente
                </strong>
              ) : (
                ""
              )}
              <Typography variant="body2" color="text.secondary">
                Los campos marcados con * son necesarios
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Registrate
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2" color="secondary">
                    {"¿Ya tienes una cuenta? Haz login aqui"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Note />
        </Grid>
      </Grid>
    </AppThemeProvider>
  );
};
