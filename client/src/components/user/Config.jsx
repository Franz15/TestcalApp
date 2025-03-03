import React, { useState, useEffect } from "react";
import { Global } from "../../helpers/Global";
import { SerializeForm } from "../../helpers/SerializeForm";
import { useAuth } from "../../hooks/useAuth";
import { 
  Box, 
  Avatar, 
  IconButton, 
  Container,
  TextField,
  MenuItem,
  Alert,
  Typography,
  useMediaQuery,
  useTheme,
  Paper,
  Snackbar,
  Grid 
} from "@mui/material";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SaveIcon from '@mui/icons-material/Save';
import "./styles/config.css";

export const Config = () => {
  const { auth, setAuth } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const [saved, setSaved] = useState("not_saved");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    auth.image ? Global.url + "user/avatar/" + auth.image : ""
  );

  // Theme and responsive breakpoints
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const updateUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Get authentication token
    const token = localStorage.getItem("token");

    // Get form data
    let newDataUser = SerializeForm(e.target);

    // Remove unnecessary fields
    delete newDataUser.file0;

    try {
      // Update user in database
      const request = await fetch(Global.url + "user/update", {
        method: "PUT",
        body: JSON.stringify(newDataUser),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      
      const data = await request.json();

      if (data.status === "success") {
        delete data.user2.password;
        setAuth(data.user2);
        setSaved("saved");
        setMessage("Perfil actualizado correctamente");
        setSnackbarOpen(true);

        // Upload profile picture if selected
        const fileInput = document.querySelector("#file");

        if (data.status == "success" && fileInput.files[0]) {
          const formData = new FormData();

          //Recogiendo imagen para subir
          formData.append("file0", fileInput.files[0]);

          //Petición para enviar el fichero
          const uploadRequest = await fetch(Global.url + "user/upload", {
            method: "POST",
            body: formData,
            headers: {
              Authorization: token,
            },
          });
          const uploadData = await uploadRequest.json();

          if (uploadData.status == "success") {
            delete uploadData.user.password;

            setAuth(uploadData.user);
            //console.log (uploadData.user2);
            setSaved("saved");
          } else {
            setSaved("error");
          }
        }
      } else {
        setMessage("Error al actualizar el perfil");
        setSaved("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Error de conexión");
      setSaved("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Climbing grade options
  const climbingGrades = [
    "IV", "V", "6a", "6a+", "6b", "6b+", "6c", "6c+",
    "7a", "7a+", "7b", "7b+", "7c", "7c+", "8a", "8a+", 
    "8b", "8b+", "8c", "8c+", "9a", "9a+", "9b", "9b+", "9c"
  ];

  return (
    <Container className="config-container" maxWidth="md">
      <Paper elevation={3} className="config-paper">
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          component="h1" 
          className="config-title"
          gutterBottom
        >
          Configuración de perfil
        </Typography>
        
        <div className="avatar-container">
          <div className="avatar-wrapper">
            <Avatar 
              src={imageUrl} 
              className="config-avatar"
              alt={auth.nombre || "Usuario"}
            />
            <IconButton
              color="primary"
              aria-label="Cambiar foto de perfil"
              component="label"
              className="avatar-upload-button"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                name="file0"
                id="file"
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />
              <PhotoCameraIcon />
            </IconButton>
          </div>
          <Typography variant="body2" className="avatar-helper-text">
            Toca para cambiar la foto
          </Typography>
        </div>

        <Box 
          component="form" 
          onSubmit={updateUser} 
          className="config-form"
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                fullWidth
                id="nombre"
                label="Nombre"
                name="nombre"
                defaultValue={auth.nombre}
                type="text"
                variant="outlined"
                className="config-input"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                fullWidth
                id="apellido"
                label="Apellido"
                name="apellido"
                defaultValue={auth.apellido}
                type="text"
                variant="outlined"
                className="config-input"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Dirección de correo electrónico"
                name="email"
                defaultValue={auth.email}
                type="email"
                variant="outlined"
                className="config-input"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                id="user"
                label="Nombre de Usuario"
                name="user"
                defaultValue={auth.user}
                type="text"
                variant="outlined"
                className="config-input"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Contraseña (dejar en blanco para mantener la actual)"
                type="password"
                id="password"
                variant="outlined"
                className="config-input"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                id="grado"
                name="grado"
                select
                label="Máximo grado encadenado"
                defaultValue={auth.grado || ""}
                variant="outlined"
                className="config-input"
              >
                {climbingGrades.map((grade) => (
                  <MenuItem key={grade} value={grade}>
                    {grade}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                fullWidth
                id="altura"
                label="Altura (cm)"
                name="altura"
                defaultValue={auth.altura || ""}
                type="number"
                variant="outlined"
                className="config-input"
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                fullWidth
                id="peso"
                label="Peso (kg)"
                name="peso"
                defaultValue={auth.peso || ""}
                type="number"
                variant="outlined"
                className="config-input"
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                fullWidth
                id="envergadura"
                label="Envergadura (cm)"
                name="envergadura"
                defaultValue={auth.envergadura || ""}
                type="number"
                variant="outlined"
                className="config-input"
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
          </Grid>

          <div className="config-actions">
            <button
              className="config-button primary-button"
              type="submit"
              disabled={loading}
            >
              {loading ? "Actualizando..." : "Guardar"}
              {!loading && <SaveIcon className="button-icon" />}
            </button>
          </div>
        </Box>
      </Paper>
      
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={5000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={saved === "saved" ? "success" : "error"}
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};