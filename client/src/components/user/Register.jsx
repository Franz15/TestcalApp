import { React, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";
import { useNavigate } from "react-router-dom";

// Material UI Components
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";

// Icons
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import HeightIcon from "@mui/icons-material/Height";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import GradeIcon from "@mui/icons-material/Grade";

// Theme and styles
import AppThemeProvider from "../../assets/theme/Theme";
import background from "../../assets/img/backgrounds/background6.jpg";
import "./login.css";
export const Register = () => {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_sended");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const validateForm = () => {
    let tempErrors = {};
    let formIsValid = true;

    // Name validation
    if (!form.nombre) {
      tempErrors.nombre = "El nombre es requerido";
      formIsValid = false;
    }

    // Lastname validation
    if (!form.apellido) {
      tempErrors.apellido = "El apellido es requerido";
      formIsValid = false;
    }

    // Email validation
    if (!form.email) {
      tempErrors.email = "El email es requerido";
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = "Email inválido";
      formIsValid = false;
    }

    // Username validation
    if (!form.user) {
      tempErrors.user = "El nombre de usuario es requerido";
      formIsValid = false;
    }

    // Password validation
    if (!form.password) {
      tempErrors.password = "La contraseña es requerida";
      formIsValid = false;
    }

    // Height validation
    if (!form.altura) {
      tempErrors.altura = "La altura es requerida";
      formIsValid = false;
    } else if (form.altura < 0) {
      tempErrors.altura = "La altura debe ser un valor positivo";
      formIsValid = false;
    }

    // Weight validation
    if (!form.peso) {
      tempErrors.peso = "El peso es requerido";
      formIsValid = false;
    } else if (form.peso < 0) {
      tempErrors.peso = "El peso debe ser un valor positivo";
      formIsValid = false;
    }

    // Wingspan validation
    if (!form.envergadura) {
      tempErrors.envergadura = "La envergadura es requerida";
      formIsValid = false;
    } else if (form.envergadura < 0) {
      tempErrors.envergadura = "La envergadura debe ser un valor positivo";
      formIsValid = false;
    }

    setErrors(tempErrors);
    return formIsValid;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const saveUser = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      let newUser = form;
      const request = await fetch(Global.url + "user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await request.json();

      if (data.status === "success") {
        setSaved("saved");
        setMessage(data.message);
        setTimeout(() => {
          navigate("/login");
        }, 800);
      } else {
        setSaved("error");
        setMessage(data.message);
      }
    } catch (error) {
      setSaved("error");
      setMessage("Error de conexión. Intente nuevamente más tarde.");
      console.error("Register error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AppThemeProvider>
      <Grid
        container
        component="main"
        className="login-container"
        sx={{
          height: "100vh",
          position: "relative",
          fontFamily: '"roboto", Courier, monospace',
          overflow: "hidden",
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          className="login-background"
          sx={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />

        {/* Welcome message in bottom left */}
        <Box
          className="welcome-message"
          sx={{
            position: "absolute",
            bottom: { xs: "auto", sm: "10%" },
            top: { xs: "5%", sm: "auto" },
            left: "5%",
            zIndex: 2,
            display: { xs: "none", md: "block" },
            fontFamily: '"roboto", Courier, monospace',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "white",
              fontWeight: 300,
              textShadow: "0 2px 8px rgba(0,0,0,0.4)",
              mb: 1,
              fontFamily: "inherit",
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            }}
          >
            Únete a nosotros
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "white",
              fontWeight: 300,
              opacity: 0.9,
              textShadow: "0 1px 4px rgba(0,0,0,0.3)",
              maxWidth: "500px",
              fontFamily: "inherit",
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
            }}
          >
            Crea tu cuenta para comenzar tu experiencia personalizada
          </Typography>
        </Box>

        <Grid
          container
          justifyContent={{ xs: "center", sm: "flex-end" }}
          alignItems="center"
          sx={{ height: "100%", position: "relative", zIndex: 1 }}
        >
          <Grid
            item
            xs={11}
            sm={8}
            md={5}
            lg={4}
            component={Paper}
            elevation={6}
            className="login-card"
            sx={{
              borderRadius: { xs: "12px", sm: "12px 0 0 12px" },
              overflow: "auto",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              backgroundColor: "#ffffff",
              mr: { xs: 0, sm: 0 },
              height: { xs: "90vh", sm: "100%" },
              maxHeight: { xs: "90vh", sm: "100%" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              fontFamily: '"roboto", Courier, monospace',
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#f1f1f1",
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#888",
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#555",
              },
            }}
          >
            <Box
              sx={{
                py: { xs: 1.5, sm: 2, md: 4 },
                px: { xs: 2, sm: 2.5, md: 4 },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100%",
              }}
            >
              {/* Container for logo and text */}
              <Box
                sx={{
                  position: "relative",
                  textAlign: "center",
                  mb: { xs: 0.75, sm: 1, md: 2 },
                }}
              >
                <Box
                  component="img"
                  src="../../../../testcalapp.png"
                  alt="App Logo"
                  className="login-logo"
                  sx={{
                    width: { xs: 80, sm: 100, md: 140 },
                    height: { xs: 80, sm: 100, md: 140 },
                    objectFit: "contain",
                    mb: { xs: 0.5, sm: 0.75, md: 1 },
                  }}
                />

                <Typography
                  component="h1"
                  variant="h4"
                  className="login-title"
                  sx={{
                    fontWeight: 700,
                    color: "#454545",
                    fontFamily: "inherit",
                    position: "relative",
                    pb: { xs: 0.75, sm: 1 },
                    mb: { xs: 0.5, sm: 0.5 },
                    fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.125rem" },
                  }}
                >
                  Registro
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      height: "3px",
                      width: "40px",
                      backgroundColor: "var(--color-principal)",
                      borderRadius: "3px",
                    }}
                  />
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    textAlign: "center",
                    fontFamily: "inherit",
                    fontSize: { xs: "12px", sm: "13px", md: "14px" },
                    display: { xs: "block", sm: "block" },
                  }}
                >
                  Crea tu cuenta para empezar
                </Typography>
              </Box>

              <Box
                component="form"
                noValidate
                onSubmit={saveUser}
                sx={{ width: "100%" }}
              >
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="nombre"
                  label="Nombre"
                  name="nombre"
                  autoComplete="nombre"
                  autoFocus
                  onChange={changed}
                  error={!!errors.nombre}
                  helperText={errors.nombre}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon
                          sx={{
                            color: "var(--letra-gris)",
                            fontSize: { xs: "1.1rem", sm: "1.25rem" },
                          }}
                        />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: "8px",
                      fontFamily: '"roboto", Courier, monospace',
                    },
                  }}
                  InputLabelProps={{
                    sx: { fontFamily: '"roboto", Courier, monospace' },
                  }}
                  FormHelperTextProps={{
                    sx: { fontFamily: '"roboto", Courier, monospace' },
                  }}
                  sx={{ mb: { xs: 0.75, sm: 1 } }}
                  size="small"
                />

                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="apellido"
                  label="Apellido"
                  name="apellido"
                  autoComplete="apellido"
                  onChange={changed}
                  error={!!errors.apellido}
                  helperText={errors.apellido}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon
                          sx={{
                            color: "var(--letra-gris)",
                            fontSize: { xs: "1.1rem", sm: "1.25rem" },
                          }}
                        />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: "8px",
                      fontFamily: '"roboto", Courier, monospace',
                    },
                  }}
                  InputLabelProps={{
                    sx: { fontFamily: '"roboto", Courier, monospace' },
                  }}
                  FormHelperTextProps={{
                    sx: { fontFamily: '"roboto", Courier, monospace' },
                  }}
                  sx={{ mb: { xs: 0.75, sm: 1 } }}
                  size="small"
                />

                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="email"
                  label="Correo electrónico"
                  name="email"
                  autoComplete="email"
                  type="email"
                  onChange={changed}
                  error={!!errors.email}
                  helperText={errors.email}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon
                          sx={{
                            color: "var(--letra-gris)",
                            fontSize: { xs: "1.1rem", sm: "1.25rem" },
                          }}
                        />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: "8px",
                      fontFamily: '"roboto", Courier, monospace',
                    },
                  }}
                  InputLabelProps={{
                    sx: { fontFamily: '"roboto", Courier, monospace' },
                  }}
                  FormHelperTextProps={{
                    sx: { fontFamily: '"roboto", Courier, monospace' },
                  }}
                  sx={{ mb: { xs: 0.75, sm: 1 } }}
                  size="small"
                />

                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="user"
                  label="Nombre de Usuario"
                  name="user"
                  onChange={changed}
                  error={!!errors.user}
                  helperText={errors.user}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon
                          sx={{
                            color: "var(--letra-gris)",
                            fontSize: { xs: "1.1rem", sm: "1.25rem" },
                          }}
                        />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: "8px",
                      fontFamily: '"roboto", Courier, monospace',
                    },
                  }}
                  InputLabelProps={{
                    sx: { fontFamily: '"roboto", Courier, monospace' },
                  }}
                  FormHelperTextProps={{
                    sx: { fontFamily: '"roboto", Courier, monospace' },
                  }}
                  sx={{ mb: { xs: 0.75, sm: 1 } }}
                  size="small"
                />

                <TextField
                  margin="dense"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  onChange={changed}
                  error={!!errors.password}
                  helperText={errors.password}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon
                          sx={{
                            color: "var(--letra-gris)",
                            fontSize: { xs: "1.1rem", sm: "1.25rem" },
                          }}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePasswordVisibility}
                          edge="end"
                          className="password-toggle-button"
                          sx={{
                            color: showPassword
                              ? "var(--color-principal)"
                              : "var(--letra-gris)",
                            transition: "all 0.3s ease",
                            borderRadius: "4px",
                            padding: { xs: "3px", sm: "4px" },
                            "&:hover": {
                              backgroundColor: "transparent",
                            },
                          }}
                        >
                          {showPassword ? (
                            <VisibilityOffIcon
                              sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
                              className="password-icon visible"
                            />
                          ) : (
                            <VisibilityIcon
                              sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
                              className="password-icon hidden"
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: "8px",
                      fontFamily: '"roboto", Courier, monospace',
                      transition: "all 0.3s ease",
                    },
                  }}
                  InputLabelProps={{
                    sx: { fontFamily: '"roboto", Courier, monospace' },
                  }}
                  FormHelperTextProps={{
                    sx: { fontFamily: '"roboto", Courier, monospace' },
                  }}
                  sx={{ mb: { xs: 0.75, sm: 1 } }}
                  size="small"
                />

                <TextField
                  required
                  fullWidth
                  margin="dense"
                  id="grado"
                  name="grado"
                  select
                  label="Máximo grado encadenado en roca"
                  defaultValue="IV"
                  onChange={changed}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <GradeIcon
                          sx={{
                            color: "var(--letra-gris)",
                            fontSize: { xs: "1.1rem", sm: "1.25rem" },
                          }}
                        />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: "8px",
                      fontFamily: '"roboto", Courier, monospace',
                    },
                  }}
                  InputLabelProps={{
                    sx: { fontFamily: '"roboto", Courier, monospace' },
                  }}
                  FormHelperTextProps={{
                    sx: { fontFamily: '"roboto", Courier, monospace' },
                  }}
                  sx={{ mb: { xs: 0.75, sm: 1 } }}
                  size="small"
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
                  margin="dense"
                  required
                  fullWidth
                  id="altura"
                  label="Altura (en cm)"
                  name="altura"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <HeightIcon
                          sx={{
                            color: "var(--letra-gris)",
                            fontSize: { xs: "1.1rem", sm: "1.25rem" },
                          }}
                        />
                      </InputAdornment>
                    ),
                    inputProps: { min: 0 },
                    sx: {
                      borderRadius: "8px",
                      fontFamily: '"roboto", Courier, monospace',
                    },
                  }}
                  onChange={changed}
                  error={!!errors.altura}
                  helperText={errors.altura}
                  disabled={loading}
                  InputLabelProps={{
                    sx: { fontFamily: '"roboto", Courier, monospace' },
                  }}
                  FormHelperTextProps={{
                    sx: { fontFamily: '"roboto", Courier, monospace' },
                  }}
                  sx={{ mb: { xs: 0.75, sm: 1 } }}
                  size="small"
                />

                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="peso"
                  label="Peso (en kg)"
                  name="peso"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FitnessCenterIcon
                          sx={{
                            color: "var(--letra-gris)",
                            fontSize: { xs: "1.1rem", sm: "1.25rem" },
                          }}
                        />
                      </InputAdornment>
                    ),
                    inputProps: { min: 0 },
                    sx: {
                      borderRadius: "8px",
                      fontFamily: '"roboto", Courier, monospace',
                    },
                  }}
                  onChange={changed}
                  error={!!errors.peso}
                  helperText={errors.peso}
                  disabled={loading}
                  InputLabelProps={{
                    sx: { fontFamily: '"roboto", Courier, monospace' },
                  }}
                  FormHelperTextProps={{
                    sx: { fontFamily: '"roboto", Courier, monospace' },
                  }}
                  sx={{ mb: { xs: 0.75, sm: 1 } }}
                  size="small"
                />

                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="envergadura"
                  label="Envergadura (en cm)"
                  name="envergadura"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <HeightIcon
                          sx={{
                            transform: "rotate(90deg)",
                            color: "var(--letra-gris)",
                            fontSize: { xs: "1.1rem", sm: "1.25rem" },
                          }}
                        />
                      </InputAdornment>
                    ),
                    inputProps: { min: 0 },
                    sx: {
                      borderRadius: "8px",
                      fontFamily: '"roboto", Courier, monospace',
                    },
                  }}
                  onChange={changed}
                  error={!!errors.envergadura}
                  helperText={errors.envergadura}
                  disabled={loading}
                  InputLabelProps={{
                    sx: { fontFamily: '"roboto", Courier, monospace' },
                  }}
                  FormHelperTextProps={{
                    sx: { fontFamily: '"roboto", Courier, monospace' },
                  }}
                  sx={{ mb: { xs: 0.75, sm: 1 } }}
                  size="small"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  className="login-button"
                  sx={{
                    mt: { xs: 1, sm: 1.5, md: 2 },
                    mb: { xs: 1.5, sm: 2, md: 3 },
                    py: { xs: 1, sm: 1.25, md: 1.5 },
                    borderRadius: "8px",
                    backgroundColor: "var(--color-principal)",
                    color: "#454545",
                    fontSize: { xs: "14px", sm: "15px", md: "16px" },
                    fontWeight: 500,
                    textTransform: "capitalize",
                    fontFamily: '"roboto", Courier, monospace',
                    position: "relative",
                    boxShadow: "0 4px 12px rgba(232, 191, 86, 0.35)",
                    "&:hover": {
                      backgroundColor: "var(--color-secundario)",
                      boxShadow: "0 6px 16px rgba(232, 156, 86, 0.4)",
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress
                      size={22}
                      sx={{
                        color: "#454545",
                        position: "absolute",
                      }}
                    />
                  ) : (
                    "Registrarse"
                  )}
                </Button>

                <Divider sx={{ my: { xs: 0.75, sm: 1.5, md: 2 } }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#999",
                      px: 1,
                      fontSize: { xs: "12px", sm: "13px", md: "14px" },
                      fontFamily: '"roboto", Courier, monospace',
                    }}
                  >
                    o
                  </Typography>
                </Divider>

                <Box
                  sx={{ textAlign: "center", mt: { xs: 0.75, sm: 1.5, md: 2 } }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "var(--letra-gris)",
                      fontSize: { xs: "12px", sm: "13px", md: "14px" },
                      fontFamily: '"roboto", Courier, monospace',
                    }}
                  >
                    ¿Ya tienes una cuenta?{" "}
                    <Link
                      href="/login"
                      sx={{
                        color: "var(--color-secundario)",
                        textDecoration: "none",
                        fontWeight: 500,
                        fontFamily: "inherit",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Inicia sesión aquí
                    </Link>
                  </Typography>
                </Box>

                {saved === "saved" && (
                  <Alert
                    severity="success"
                    sx={{
                      mt: { xs: 1.5, sm: 2, md: 3 },
                      py: { xs: 0.5, sm: 0.75 },
                      borderRadius: "8px",
                      backgroundColor: "var(--color-success)",
                      fontFamily: '"roboto", Courier, monospace',
                      fontSize: { xs: "12px", sm: "13px", md: "14px" },
                    }}
                  >
                    Usuario registrado correctamente. Redirigiendo al login...
                  </Alert>
                )}

                {saved === "error" && (
                  <Alert
                    severity="error"
                    sx={{
                      mt: { xs: 1.5, sm: 2, md: 3 },
                      py: { xs: 0.5, sm: 0.75 },
                      borderRadius: "8px",
                      backgroundColor: "var(--color-alerta)",
                      fontFamily: '"roboto", Courier, monospace',
                      fontSize: { xs: "12px", sm: "13px", md: "14px" },
                    }}
                  >
                    {message}
                  </Alert>
                )}

                {/* Footer */}
                <Box
                  component="footer"
                  className="login-footer"
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    mt: { xs: 1.5, sm: 2, md: 4 },
                    mb: { xs: 0, sm: 0.5, md: 1 },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontFamily: '"roboto", Courier, monospace',
                  }}
                >
                  <Box
                    className="footer-branding"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Box
                      component="img"
                      src="../../../../testcalapp.png"
                      sx={{
                        width: { xs: 16, sm: 18, md: 20 },
                        height: { xs: 16, sm: 18, md: 20 },
                        mr: { xs: 0.5, sm: 0.75, md: 1 },
                        objectFit: "contain",
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: { xs: "10px", sm: "11px", md: "12px" },
                        color: "var(--letra-gris)",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 500,
                          fontFamily: "inherit",
                          fontSize: { xs: "10px", sm: "11px", md: "12px" },
                        }}
                      >
                        TestcalApp
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          opacity: 0.7,
                          fontSize: { xs: "8px", sm: "9px", md: "10px" },
                          ml: 0.5,
                          fontFamily: "inherit",
                        }}
                      >
                        v1.0.7
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          opacity: 0.7,
                          ml: 1,
                          fontFamily: "inherit",
                          fontSize: { xs: "8px", sm: "9px", md: "10px" },
                        }}
                      >
                        &copy; {currentYear}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </AppThemeProvider>
  );
};
