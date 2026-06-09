import { React, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";
import { useAuth } from "../../hooks/useAuth";

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
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";

// Icons
import EmailIcon from "@mui/icons-material/Email";

// Theme and styles
import AppThemeProvider from "../../assets/theme/Theme";
import background from "../../assets/img/backgrounds/background4.jpg";
import "./login.css";

export const Recover = () => {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_sended");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { setAuth } = useAuth();
  const currentYear = new Date().getFullYear();

  const validateForm = () => {
    let tempErrors = {};
    let formIsValid = true;

    // Email validation
    if (!form.email) {
      tempErrors.email = "El email es requerido";
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = "Email invÃ¡lido";
      formIsValid = false;
    }

    setErrors(tempErrors);
    return formIsValid;
  };

  const recoverPassword = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Datos del usuario
      let email = form.email;

      // PeticiÃ³n al backend
      const request = await fetch(Global.url + "user/recover/" + email, {
        method: "GET",
      });

      const data = await request.json();

      if (data.status === "success") {
        setSaved("success");
        setMessage(data.message);
      } else {
        setSaved("error");
        setMessage(data.message);
      }
    } catch (error) {
      setSaved("error");
      setMessage("Error de conexiÃ³n. Intente nuevamente mÃ¡s tarde.");
      console.error("Recover error:", error);
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

        {/* Welcome message in bottom left */}
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
            Recupera tu cuenta
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
            Te enviaremos instrucciones para restablecer tu contraseÃ±a
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
              {/* Container for logo and text */}
              <Box sx={{ position: "relative", textAlign: "center", mb: 3 }}>
                <Box
                  sx={{
                    position: "relative",
                    display: "inline-block",
                    width: 140,
                    height: 140,
                    mb: 1,
                  }}
                >
                  <Box
                    component="img"
                    src="/testcalapp.png"
                    alt="App Logo"
                    className="login-logo"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
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

                <Typography
                  component="h1"
                  variant="h4"
                  className="login-title"
                  sx={{
                    fontWeight: 700,
                    color: "#454545",
                    fontFamily: "inherit",
                    position: "relative",
                    pb: 2,
                    mb: 1,
                  }}
                >
                  RecuperaciÃ³n
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
                  Ingresa tu email para restablecer tu contraseÃ±a
                </Typography>
              </Box>

              <Box
                component="form"
                noValidate
                onSubmit={recoverPassword}
                sx={{ width: "100%" }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
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

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  className="login-button"
                  sx={{
                    mt: 2,
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
                    "Recuperar contraseÃ±a"
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
                      mb: 1,
                    }}
                  >
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
                      Volver al inicio de sesiÃ³n
                    </Link>
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "var(--letra-gris)",
                      fontSize: "14px",
                      fontFamily: '"roboto", Courier, monospace',
                    }}
                  >
                    Â¿No tienes una cuenta?{" "}
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
                      RegÃ­strate aquÃ­
                    </Link>
                  </Typography>
                </Box>

                {saved === "success" && (
                  <Alert
                    severity="success"
                    sx={{
                      mt: 3,
                      borderRadius: "8px",
                      backgroundColor: "var(--color-success)",
                      fontFamily: '"roboto", Courier, monospace',
                    }}
                  >
                    {message}
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

                {/* Footer */}
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
                      src="/testcalapp.png"
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
                        v1.0.9
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
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </AppThemeProvider>
  );
};
