import React, { useState } from "react";

import { useAuth } from "../../../hooks/useAuth";
import { Global } from "../../../helpers/Global";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {Porcentaje} from "../test9c/ComponentsTest9c";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";

export function Dedos() {
  const token = localStorage.getItem("token");
  const { auth } = useAuth();

  const [openMax, setOpenMax] = useState(false);
  const [openMin, setOpenMin] = useState(false);
  const [max20mm, setMax20mm] = useState("");
  const [minEdge, setMinEdge] = useState("");
  const [option, setOption] = useState("");

  const handleClickMax = () => {
    setOpenMax(true);
  };
  const handleCloseMax = () => {
    setOpenMax(false);
  };
  const handleChangeMax20mm = (e) => {
    setMax20mm(e.target.value);
    setOption("max20mm");
  };
  const handleMinEdge = (e) => {
    setMinEdge(e.target.value);
    setOption("minEdge");
  };
  const handleClickMin = () => {
    setOpenMin(true);
  };
  const handleCloseMin = () => {
    setOpenMin(false);
  };

  const handleClickRep = () => {
    console.log("click rep");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let form;
    //Recoger datos del formulario
    if (option == "max20mm") {
      form = {
        fecha: new Date(),
        userId: auth._id,
        gradoDeclarado: auth.grado,
        max20mmPeso: max20mm,
        max20mmPorcent: Porcentaje(max20mm,auth.peso), 
        pesoCorp: auth.peso,
        _type: "max20mm",
      };
    } else if (option == "minEdge") {
      form = {
        fecha: new Date(),
        userId: auth._id,
        gradoDeclarado: auth.grado,
        minEdge: minEdge,
        _type: "minEdge",
      };
    }
    let newRecord = form;

    const request = await fetch(Global.url + "results/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(newRecord),
    });
    const data = await request.json();

    if (data.status == "success") {
      handleCloseMax();
      handleCloseMin();
      setMax20mm("");
    } else {
    }
  };

  return (
    <Grid
      container
      spacing={0}
      alignItems="top"
      justify="distance-between"
      padding={3}
      style={{ minHeight: "100vh" }}
    >
      <Dialog
        open={openMax}
        onClose={handleCloseMax}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Test 1: Peso máximo en 20mm."}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="text.secondary">
            Esta prueba mide la cantidad máxima de peso adicional que puedes
            sostener en un borde de 20 mm. Serás evaluado por el peso total
            añadido sostenido durante 10 segundos.
            <br></br>
            Para completar esta prueba, cuelga de un borde de 20 mm con la mayor
            cantidad de peso adicional posible durante 10 segundos. Se
            recomienda agregar pequeñas cantidades de peso hasta alcanzar tu
            máximo. NO se recomienda hacer más de 6 series durante un día de
            prueba. Descansa al menos 5 minutos entre intentos. Registra la
            cantidad de peso y envía la información a continuación.
            <br></br>
            <br></br>
            Asegúrate de calentar adecuadamente antes de intentar cualquiera de
            estas pruebas de referencia. Recomendamos que completes solo una
            prueba al día para capturar tu mejor potencial en los resultados de
            la prueba.
          </Typography>

          <Input
            sx={{ ml: 20, mt: 2, mb: 1 }}
            type="number"
            id="max20mm"
            onChange={handleChangeMax20mm}
            value={max20mm}
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMax}>Cancel</Button>
          <Button onClick={handleSubmit} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openMin}
        onClose={handleCloseMin}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Test 2: Regleta mínima."}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="text.secondary">
            Esta prueba mide tu máxima fuerza de agarre en regletas pequeñas.
            Para completar esta prueba, cuelga de la regleta más pequeña posible
            durante 10 segundos (sin peso adicional).
            <br></br>
            Comienza en una regleta en la que puedas colgarte cómodamente y
            progresa hacia regletas cada vez más pequeñas. Recomendamos no hacer
            más de 6 series por día, descansando al menos 5 minutos entre
            intentos. Registra la regleta más pequeña de la cual puedes colgarte
            utilizando la lista a continuación y luego haz clic en enviar.
            <br></br>
            <br></br>
            Asegúrate de calentar adecuadamente antes de intentar cualquiera de
            estas pruebas de referencia. Recomendamos que completes solo una
            prueba al día para capturar tu mejor potencial en los resultados de
            la prueba.
          </Typography>

          <Input
            sx={{ ml: 20, mt: 2, mb: 1 }}
            type="number"
            id="minEdge"
            onChange={handleMinEdge}
            value={minEdge}
            endAdornment={<InputAdornment position="end">mm</InputAdornment>}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMin}>Cancel</Button>
          <Button onClick={handleSubmit} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        sx={{
          maxWidth: 700,
          maxHeight: 100,
          display: "flex",
          flexDirection: "column",
          pt: 2,
        }}
        onClick={handleClickMax}
      >
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Peso máximo 20mm
            </Typography>
          </CardContent>
        </Card>
      </Button>
      <Button
        sx={{
          maxWidth: 700,
          maxHeight: 100,
          display: "flex",
          flexDirection: "column",
          pt: 2,
        }}
        onClick={handleClickMin}
      >
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Regleta mínima
            </Typography>
          </CardContent>
        </Card>
      </Button>
      <Button
        sx={{
          maxWidth: 700,
          maxHeight: 100,
          display: "flex",
          flexDirection: "column",
          pt: 2,
        }}
        onClick={handleClickRep}
      >
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Series
            </Typography>
          </CardContent>
        </Card>
      </Button>
    </Grid>
  );
}
