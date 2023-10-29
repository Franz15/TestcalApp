import React from "react";
import { useState, useEffect } from "react";
import { Global } from "../../helpers/Global";
import { SerializeForm } from "../../helpers/SerializeForm";
import { useAuth } from "../../hooks/useAuth";
import Box from "@mui/material/Box";
import { Avatar, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import Note from "../accesories/Note";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Alert from '@mui/material/Alert';

export const Config = () => {
  const { auth, setAuth } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const [saved, setSaved] = useState("not_saved");
  const [imageUrl, setImageUrl] = useState(Global.url + "user/avatar/" + auth.image);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const updateUser = async (e) => {
    e.preventDefault();

    //Token de autenticación
    const token = localStorage.getItem("token");

    //Recoger datos del formulario
    let newDataUser = SerializeForm(e.target);

    //Borrar campos innecesarios
    delete newDataUser.file0;

    //Actualizar usuario en BBDD
    const request = await fetch(Global.url + "user/update", {
      method: "PUT",
      body: JSON.stringify(newDataUser),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await request.json();

    if (data.status == "success") {
      delete data.user2.password;

      setAuth(data.user2);
      setSaved("saved");
    } else {
      setSaved("error");
    }

    //Subir imagen de perfil
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
  };

  return (
<Grid container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      padding={3}
      style={{ minHeight: "100vh" }}>
        <IconButton aria-label="upload picture" component="label" sx={{ m: 1, width: 125, height: 125 }} >
        <input hidden accept="image/*" type="file" name="file0" id="file" onChange={(e) => setSelectedImage(e.target.files[0])}/>
        <Avatar
            src={imageUrl}
            sx={{ m: 1, width: 125, height: 125 }}
          />
      </IconButton>
          <Box
            sx={{
              maxWidth: 700,
              maxHeight: 900,
              display: "flex",
              flexDirection: "column",
              pt: 2,
            }}
          >
            
      
            
          
            <Box component="form" onSubmit={updateUser} sx={{ mt: 1 }}>
           
              <TextField
                margin="normal"
               
                fullWidth
                id="nombre"
                label="Nombre"
                name="nombre"
                defaultValue={auth.nombre}
                type="text"
                autoFocus
                
              />
              <TextField
                margin="normal"
                
                fullWidth
                id="apellido"
                label="Apellido"
                name="apellido"
                defaultValue={auth.apellido}
                type="text"
                autoFocus
                
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Dirección de correo electrónico"
                name="email"
                defaultValue={auth.email}
                type="email"
                autoFocus
                
              />
              <TextField
                margin="normal"
                
                fullWidth
                id="user"
                label="Nombre de Usuario"
                name="user"
                defaultValue={auth.user}
                type="text"
                autoFocus
               
              />
              <TextField
                margin="normal"
                
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                
               
              />

<TextField
          
          fullWidth
          margin="normal"
          id="standard-select-currency"
          select
          label="Máximo grado encadenado en roca"
          defaultValue={auth.grado}
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
              <TextField sx={{ mt: 2 }}
                margin="normal"
               
                fullWidth
                id="altura"
                label="Altura (en cm)"
                name="altura"
                defaultValue={auth.altura}
                autoFocus
                type="number"
                InputProps={{ inputProps: { min: 0} }}
               
              />
              <TextField
                margin="normal"
                
                fullWidth
                id="peso"
                label="Peso (en kg)"
                name="peso"
                defaultValue={auth.peso}
                autoFocus
                
                type="number"
                InputProps={{ inputProps: { min: 0} }}
               
              />
              <TextField
                margin="normal"
                
                fullWidth
                id="envergadura"
                label="Envergadura (en cm)"
                name="envergadura"
                defaultValue={auth.envergadura}
                type="number"
                autoFocus
                InputProps={{ inputProps: { min: 0} }}
               
              />
              {saved == "error" ? (
                <Alert severity="error">{message}</Alert>
               
              ) : (
                ""
              )}
              {saved == "saved" ? (
                <Alert severity="success">Usuario actualizado correctamente</Alert>
                
              ) : (
                ""
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Actualizar
              </Button>
              <Grid container>
                <Grid item>
                </Grid>
              </Grid>
              </Box>
              <Note />
          </Box>
          
        </Grid>

    
    
  );
};



/*<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <header className="content__header content__header--public">
        <h1 className="content__title">Ajustes</h1>
      </header>

      <div className="content__posts"></div>

      <form className="config-form" onSubmit={updateUser}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input type="text" name="nombre"  />
        </div>

        <div className="form-group">
          <label htmlFor="apellido">Apellido</label>
          <input type="text" name="apellido" defaultValue={auth.apellido} />
        </div>

        <div className="form-group">
          <label htmlFor="email">email</label>
          <input type="email" name="email" defaultValue={auth.email} />
        </div>

        <div className="form-group">
          <label htmlFor="user">Usuario</label>
          <input type="text" name="user" defaultValue={auth.user} />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" name="password" />
        </div>

        <div className="form-group">
          <label htmlFor="grado">Máximo grado encadenado en roca</label>
          <input type="text" name="grado" defaultValue={auth.grado} />
        </div>

        <div className="form-group">
          <label htmlFor="altura">Altura (en cm)</label>
          <input type="number" name="altura" defaultValue={auth.altura} />
        </div>

        <div className="form-group">
          <label htmlFor="peso">Peso (en kg)</label>
          <input type="number" name="peso" defaultValue={auth.peso} />
        </div>

        <div className="form-group">
          <label htmlFor="envergadura">Envergadura (en cm)</label>
          <input
            type="number"
            name="envergadura"
            defaultValue={auth.envergadura}
          />
        </div>

        <div className="form-group">
          <label htmlFor="file0">Avatar</label>
          

          <br />
          <input type="file" name="file0" id="file" />
        </div>
        <br />
        <input type="submit" value="Regístrate" className="btn btn-success" />
      </form>

      {saved == "saved" ? (
        <strong className="alert alert-success">
          Usuario modificado correctamente
        </strong>
      ) : (
        ""
      )}
      {saved == "error" ? (
        <strong className="alert alert-error">Usuario no modificado</strong>
      ) : (
        ""
      )}
    </Box>*/