import { React, useState, useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";
import { useAuth } from "../../hooks/useAuth";

// Material UI Components
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
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";

// Icons
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// Theme and styles
import AppThemeProvider from "../../assets/theme/Theme";
import background from "../../assets/img/backgrounds/background5.jpg";
import "./login.css";

export const Login = () => {
  const { form, changed } = useForm({});
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState("not_sended");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setAuth } = useAuth();
  const currentYear = new Date().getFullYear();

  // Check if there are saved credentials in localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPassword = localStorage.getItem("rememberedPassword");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (savedEmail && savedPassword && savedRememberMe) {
      // Update the email field
      changed({
        target: {
          name: "email",
          value: savedEmail,
        },
      });

      // Update the password field
      changed({
        target: {
          name: "password",
          value: savedPassword,
        },
      });

      // Set remember me checkbox
      setRememberMe(true);
    }
  }, []);

  const validateForm = () => {
    let tempErrors = {};
    let formIsValid = true;

    // Email validation
    if (!form.email) {
      tempErrors.email = "El email es requerido";
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = "Email inválido";
      formIsValid = false;
    }

    // Password validation
    if (!form.password) {
      tempErrors.password = "La contraseña es requerida";
      formIsValid = false;
    }

    setErrors(tempErrors);
    return formIsValid;
  };

  const handleRememberMe = (event) => {
    setRememberMe(event.target.checked);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginUser = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Datos del usuario
      let userToLogin = form;

      // Petición al backend
      const request = await fetch(Global.url + "user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userToLogin),
      });

      const data = await request.json();

      if (data.status === "success") {
        // Save remember me preference and user credentials
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", form.email);
          localStorage.setItem("rememberedPassword", form.password); // Store password securely
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("rememberedEmail");
          localStorage.removeItem("rememberedPassword");
          localStorage.setItem("rememberMe", "false");
        }

        // Persistir los datos en el navegador
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setSaved("login");

        // Setear datos en el auth
        setAuth(data.user);

        // Redirección después de un breve retraso para mostrar el éxito
        setTimeout(() => {
          window.location.reload();
        }, 800);
      } else {
        setSaved("error");
        setMessage(
          data.message || "Error al iniciar sesión. Intente nuevamente."
        );
      }
    } catch (error) {
      setSaved("error");
      setMessage("Error de conexión. Intente nuevamente más tarde.");
      console.error("Login error:", error);
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

        {/* Welcome message in bottom left with lighter font weight */}
        <Box
          className="welcome-message"
          sx={{
            position: "absolute",
            bottom: "10%",
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
            }}
          >
            Bienvenido de nuevo
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
            }}
          >
            Accede a tu cuenta para continuar con tu experiencia personalizada
          </Typography>
        </Box>

        <Grid
          container
          justifyContent="flex-end"
          alignItems="center"
          sx={{ height: "100%", position: "relative", zIndex: 1 }}
        >
          <Grid
            item
            xs={11}
            sm={7}
            md={4}
            lg={3.5}
            component={Paper}
            elevation={6}
            className="login-card"
            sx={{
              borderRadius: { xs: "12px", sm: "12px 0 0 12px" },
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              backgroundColor: "#ffffff",
              mr: { xs: 0, sm: 0 },
              height: { xs: "auto", sm: "100%" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              fontFamily: '"roboto", Courier, monospace',
            }}
          >
            <Box
              sx={{
                py: 4,
                px: { xs: 3, sm: 4 },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Container for logo and text with relative positioning */}
              <Box sx={{ position: "relative", textAlign: "center", mb: 3 }}>
                {/* Logo positioned to align with the line */}
                <Box
                  component="img"
                  src="../../../../testcalapp.png"
                  alt="App Logo"
                  className="login-logo"
                  sx={{
                    width: 140,
                    height: 140,
                    objectFit: "contain",
                    mb: 1,
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
                    pb: 2, // Add padding to make space for the line
                    mb: 1,
                  }}
                >
                  Bienvenido
                  {/* Line under the title */}
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
                  variant="body1"
                  sx={{
                    color: "#666",
                    textAlign: "center",
                    fontFamily: "inherit",
                    fontSize: "16px",
                  }}
                >
                  Inicia sesión para acceder a tu cuenta
                </Typography>
              </Box>

              <Box
                component="form"
                noValidate
                onSubmit={loginUser}
                sx={{ width: "100%" }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Correo electrónico"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  variant="outlined"
                  value={form.email || ""}
                  onChange={changed}
                  error={!!errors.email}
                  helperText={errors.email}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: "var(--letra-gris)" }} />
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
                  sx={{ mb: 2 }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  name="password"
                  label="Contraseña"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  variant="outlined"
                  onChange={changed}
                  error={!!errors.password}
                  helperText={errors.password}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "var(--letra-gris)" }} />
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
                            "&:hover": {
                              backgroundColor: "transparent",
                            },
                          }}
                        >
                          {showPassword ? (
                            <VisibilityOffIcon className="password-icon visible" />
                          ) : (
                            <VisibilityIcon className="password-icon hidden" />
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
                  sx={{ mb: 1 }}
                />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                    flexWrap: { xs: "wrap", sm: "nowrap" },
                    gap: { xs: 1, sm: 0 },
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={handleRememberMe}
                        disabled={loading}
                        className="remember-checkbox"
                        sx={{
                          color: "var(--color-principal)",
                          "&.Mui-checked": {
                            color: "var(--color-principal)",
                          },
                          "&:hover": {
                            backgroundColor: "rgba(232, 191, 86, 0.08)",
                          },
                          transition: "all 0.3s ease",
                        }}
                      />
                    }
                    label={
                      <Typography
                        variant="body2"
                        sx={{
                          color: "var(--letra-gris)",
                          fontSize: "14px",
                          fontFamily: '"roboto", Courier, monospace',
                          cursor: "pointer",
                        }}
                        onClick={() => !loading && setRememberMe(!rememberMe)}
                      >
                        Mantener sesión iniciada
                      </Typography>
                    }
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        userSelect: "none",
                      },
                    }}
                  />

                  <Link
                    href="/recuperacion"
                    variant="body2"
                    sx={{
                      color: "var(--color-secundario)",
                      textDecoration: "none",
                      fontSize: "14px",
                      fontWeight: 500,
                      fontFamily: '"roboto", Courier, monospace',
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    ¿Has olvidado tu contraseña?
                  </Link>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  className="login-button"
                  sx={{
                    mt: 1,
                    mb: 3,
                    py: 1.5,
                    borderRadius: "8px",
                    backgroundColor: "var(--color-principal)",
                    color: "#454545",
                    fontSize: "16px",
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
                      size={24}
                      sx={{
                        color: "#454545",
                        position: "absolute",
                      }}
                    />
                  ) : (
                    "Iniciar sesión"
                  )}
                </Button>

                <Divider sx={{ my: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#999",
                      px: 1,
                      fontSize: "14px",
                      fontFamily: '"roboto", Courier, monospace',
                    }}
                  >
                    o
                  </Typography>
                </Divider>

                <Box sx={{ textAlign: "center", mt: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "var(--letra-gris)",
                      fontSize: "14px",
                      fontFamily: '"roboto", Courier, monospace',
                    }}
                  >
                    ¿No tienes cuenta?{" "}
                    <Link
                      href="/registro"
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
                      Regístrate aquí
                    </Link>
                  </Typography>
                </Box>

                {/* Harmonized footer with the rest of the application */}
                <Box
                  component="footer"
                  className="login-footer"
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    mt: 4,
                    mb: 1,
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
                        width: 20,
                        height: 20,
                        mr: 1,
                        objectFit: "contain",
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "12px",
                        color: "var(--letra-gris)",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 500,
                          fontFamily: "inherit",
                        }}
                      >
                        TestcalApp
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          opacity: 0.7,
                          fontSize: "10px",
                          ml: 0.5,
                          fontFamily: "inherit",
                        }}
                      >
                        v1.07
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          opacity: 0.7,
                          ml: 1,
                          fontFamily: "inherit",
                        }}
                      >
                        &copy; {currentYear}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {saved === "login" && (
                  <Alert
                    severity="success"
                    sx={{
                      mt: 3,
                      borderRadius: "8px",
                      backgroundColor: "var(--color-success)",
                      fontFamily: '"roboto", Courier, monospace',
                    }}
                  >
                    Sesión iniciada correctamente. Accediendo a su cuenta...
                  </Alert>
                )}

                {saved === "error" && (
                  <Alert
                    severity="error"
                    sx={{
                      mt: 3,
                      borderRadius: "8px",
                      backgroundColor: "var(--color-alerta)",
                      fontFamily: '"roboto", Courier, monospace',
                    }}
                  >
                    {message}
                  </Alert>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </AppThemeProvider>
  );
};
