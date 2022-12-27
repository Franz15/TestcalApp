import { React, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import background from '../../assets/img/backgrounds/background2.jpg';

export const Register = () => {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_sended");

  const theme = createTheme();

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
    } else {
      setSaved("error");
    }
  };

  function Note(props) {
    return (
     <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'-TestcalApp 0.0.1- en desarrollo, la maquetación y estilo puede variar drásticamente en la versión final. Las funcionalidades no están completamente desarrolladas todavía.'}
        {'Javier Vallinas, TFG DAM ITEP '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main"
      sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${background})`,
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}  square >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'rgb(225,179,69)' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Registro
            </Typography>
            <Box component="form" noValidate onSubmit={saveUser} sx={{ mt: 1 }}>
            
            <TextField
                margin="normal"
                required
                fullWidth
                id="nombre"
                label="Nombre"
                name="nombre"
                autoComplete="nombre"
                autoFocus
                onChange ={changed}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="apellido"
                label="Apellido"
                name="apellido"
                autoComplete="apellido"
                autoFocus
                onChange ={changed}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Dirección de correo electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                onChange ={changed}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="user"
                label="Nombre de Usuario"
                name="user"
                autoComplete="user"
                autoFocus
                onChange ={changed}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange ={changed}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="grado"
                label="Máximo grado encadenado en roca"
                name="grado"
                autoComplete="grado"
                autoFocus
                onChange ={changed}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="altura"
                label="Altura (en cm)"
                name="altura"
                autoComplete="altura"
                autoFocus
                onChange ={changed}
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
                onChange ={changed}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="envergadura"
                label="Envergadura (en cm)"
                name="envergadura"
                autoComplete="envergadura"
                autoFocus
                onChange ={changed}
              />
             {saved == "error" ? 
                <strong  style={{color: '#C04000'}} className="alert alert-error">Email o contraseña incorrectos</strong>
                :""}
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
                  <Link href="/login" variant="body2">
                    {"¿Ya tienes una cuenta? Haz login aqui"}
                  </Link>
                </Grid>
              </Grid>
              <Note sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};







