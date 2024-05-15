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
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import { Porcentaje } from "../test9c/ComponentsTest9c";

export function PullUp() {
  const [openLockOff, setOpenLockOff] = useState(false);
  const [openMaxWeight, setOpenMaxWeight] = useState(false);
  const [openMaxNumDom, setOpenMaxNumDom] = useState(false);

  const [option, setOption] = useState("");
  const [bloqueoDer, setBloqueoDer] = useState("");
  const [bloqueoIzq, setBloqueoIzq] = useState("");
  const [maxWeight, setMaxWeight] = useState("");
  const [maxWeightDer, setMaxWeightDer] = useState("");
  const [maxWeightIzq, setMaxWeightIzq] = useState("");

  const [maxNumDom, setMaxNumDom] = useState("");
  const [maxNumDomDer, setMaxNumDomDer] = useState("");
  const [maxNumDomIzq, setMaxNumDomIzq] = useState("");

  const token = localStorage.getItem("token");
  const { auth } = useAuth();

  const handleCloseLockOff = () => {
    setOpenLockOff(false);
  };
  const handleClickLockOff = () => {
    setOpenLockOff(true);
  };
  const handleCloseMaxWeight = () => {
    setOpenMaxWeight(false);
  };
  const handleClickMaxWeight = () => {
    setOpenMaxWeight(true);
  };
  const handleChangeLockOffDer = (e) => {
    setBloqueoDer(e.target.value);
    if (option !== "bloqueoIzq"){
      setOption("bloqueoDer");
    } else{
      setOption("bloqueo");
    }
  };
  const handleChangeLockOffIzq = (e) => {
    setBloqueoIzq(e.target.value);
    if (option !== "bloqueoDer"){
      setOption("bloqueoIzq");
    } else{
      setOption("bloqueo");
    }
  };
  const handleChangeMaxWeightDer = (e) => {
    setMaxWeightDer(e.target.value);
    setOption("maxPesoDom");
  };
  const handleChangeMaxWeightIzq = (e) => {
    setMaxWeightIzq(e.target.value);
    setOption("maxPesoDom");
  };
  const handleChangeMaxWeight = (e) => {
    setMaxWeight(e.target.value);
    setOption("maxPesoDom");
  };
  const handleClickMaxNumDom = () => {
    setOpenMaxNumDom(true);
  };
  const handleChangeMaxNumDom = (e) => {
    setMaxNumDom(e.target.value);
    setOption("maxNumDom");
  };
  const handleChangeMaxNumDomDer = (e) => {
    setMaxNumDomDer(e.target.value);
    setOption("maxNumDom");
  };
  const handleChangeMaxNumDomIzq = (e) => {
    setMaxNumDomIzq(e.target.value);
    setOption("maxNumDom");
  };
  const handleCloseMaxNumDom = () => {
    setOpenMaxNumDom(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let form;
    let form2 = null;
    //Recoger datos del formulario
    if (option == "bloqueo") {
      form = {
        fecha: new Date(),
        userId: auth._id,
        gradoDeclarado: auth.grado,
        bloqueoDer: bloqueoDer,
        _type: "bloqueoDer",
      };
      form2 = {
        fecha: new Date(),
        userId: auth._id,
        gradoDeclarado: auth.grado,
        bloqueoIzq: bloqueoIzq,
        _type: "bloqueoIzq",
      };
    } else if (option == "bloqueoDer") {
      form = {
        fecha: new Date(),
        userId: auth._id,
        gradoDeclarado: auth.grado,
        bloqueoDer: bloqueoDer,
        _type: "bloqueoDer",
      };
    } else if (option == "bloqueoIzq") {
      form = {
        fecha: new Date(),
        userId: auth._id,
        gradoDeclarado: auth.grado,
        bloqueoIzq: bloqueoIzq,
        _type: "bloqueoIzq",
      };
    } 
    if (option == "maxPesoDom") {
      form = {
        fecha: new Date(),
        userId: auth._id,
        gradoDeclarado: auth.grado,
        maxPesoDom: maxWeight,
        maxPesoDomPorcent: Porcentaje(maxWeight, auth.peso),
        maxPesoDomDer: maxWeightDer,
        maxPesoDomPorcentDer: Porcentaje(maxWeightDer, auth.peso),
        maxPesoDomIzq: maxWeightIzq,
        maxPesoDomPorcentIzq: Porcentaje(maxWeightIzq, auth.peso),
        maxPesoDomMedia: (parseInt(maxWeightIzq) + parseInt(maxWeightIzq)) / 2,
        maxPesoDomPorcentMedia: Porcentaje(
          (parseInt(maxWeightIzq) + parseInt(maxWeightIzq)) / 2,
          auth.peso
        ),
        pesoCorp: auth.peso,
        _type: "maxPesoDom",
      };
    }
    if (option == "maxNumDom") {
      form = {
        fecha: new Date(),
        userId: auth._id,
        gradoDeclarado: auth.grado,
        maxNumDom: maxNumDom,
        maxNumDomDer: maxNumDomDer,
        maxNumDomIzq: maxNumDomIzq,
        pesoCorp: auth.peso,
        _type: "maxNumDom",
      };
    }
    let newRecord = form;

    let request = await fetch(Global.url + "results/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(newRecord),
    });
    const data = await request.json();

    if (data.status == "success") {
      handleCloseLockOff();
      handleCloseMaxWeight();
      handleCloseMaxNumDom();
      setBloqueoDer("");
      setBloqueoIzq("");
      setMaxWeight("");
      setMaxNumDom("");
      setMaxNumDomDer("");
      setMaxNumDomIzq("");
    } else {
    }

    if (form2 !==null){
      request = await fetch(Global.url + "results/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(form2),
      });
      const data = await request.json();
  
      if (data.status == "success") {
        handleCloseLockOff();
        handleCloseMaxWeight();
        handleCloseMaxNumDom();
        setBloqueoDer("");
        setBloqueoIzq("");
        setMaxWeight("");
        setMaxNumDom("");
        setMaxNumDomDer("");
        setMaxNumDomIzq("");
        setOption("");
        form2 = null;
      } else {
      }
  
   }  else {
    setBloqueoDer("");
    setBloqueoIzq("");
    setOption("");
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
        open={openLockOff}
        onClose={handleCloseLockOff}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Test 1: Maximo tiempo bloqueando con cada brazo."}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="text.secondary">
            Esta prueba mide el tiempo máximo que puedes mantener un bloqueo de
            90 grados en una barra de dominadas con un solo brazo.
            <br></br>
            Para completar esta prueba, mantén el bloqueo a 90 grados el máximo
            tiempo posible. NO se recomienda hacer más de 6 series durante un
            día de prueba. Descansa al menos 5 minutos entre intentos. Registra
            el tiempo en segundos y envía la información a continuación. Si no
            eres capaz de aguantar, introduce 0<br></br>
            <br></br>
            Asegúrate de calentar adecuadamente antes de intentar cualquiera de
            estas pruebas de referencia. Recomendamos que completes solo una
            prueba al día para capturar tu mejor potencial en los resultados de
            la prueba.
          </Typography>
          <br></br>
          Brazo Derecho
          <Input
            sx={{ ml: 20, mt: 2, mb: 1 }}
            type="number"
            id="lockOffDer"
            onChange={handleChangeLockOffDer}
            value={bloqueoDer}
            endAdornment={<InputAdornment position="end">s</InputAdornment>}
          />
          <br></br>
          Brazo Izquierdo
          <Input
            sx={{ ml: 20, mt: 2, mb: 1 }}
            type="number"
            id="lockOffIzq"
            onChange={handleChangeLockOffIzq}
            value={bloqueoIzq}
            endAdornment={<InputAdornment position="end">s</InputAdornment>}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLockOff}>Cancel</Button>
          <Button onClick={handleSubmit} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openMaxWeight}
        onClose={handleCloseMaxWeight}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Test 2: Dominada con el máximo lastre posible."}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="text.secondary">
            Esta prueba mide el peso máximo con el que puedes hacer una
            dominada.
            <br></br>
            Para completar esta prueba, haz una dominada con el máximo lastre
            posible. Descansa al menos 5 minutos entre intentos. Registra el
            peso en kilos y envía la información a continuación.
            <br></br>
            <br></br>
            Asegúrate de calentar adecuadamente antes de intentar cualquiera de
            estas pruebas de referencia. Recomendamos que completes solo una
            prueba al día para capturar tu mejor potencial en los resultados de
            la prueba.
          </Typography>
          <br></br>
          Lastre
          <Input
            sx={{ ml: 20, mt: 2, mb: 1 }}
            type="number"
            id="maxPesoDom"
            onChange={handleChangeMaxWeight}
            value={maxWeight}
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
          />
          <br></br>
          Lastre brazo derecho
          <Input
            sx={{ ml: 20, mt: 2, mb: 1 }}
            type="number"
            id="maxPesoDomDer"
            onChange={handleChangeMaxWeightDer}
            value={maxWeightDer}
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
          />
          <br></br>
          Lastre brazo izquierdo
          <Input
            sx={{ ml: 20, mt: 2, mb: 1 }}
            type="number"
            id="maxPesoDomIzq"
            onChange={handleChangeMaxWeightIzq}
            value={maxWeightIzq}
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMaxWeight}>Cancel</Button>
          <Button onClick={handleSubmit} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openMaxNumDom}
        onClose={handleCloseMaxNumDom}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Test 3: Máximo número de dominadas."}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="text.secondary">
            Esta prueba cuantas dominadas puedes realizar con tu peso corporal.
            <br></br>
            Para completar esta prueba, haz una dominada con el máximo lastre
            posible. Descansa al menos 5 minutos entre intentos. Registra el
            peso en kilos y envía la información a continuación.
            <br></br>
            <br></br>
            Asegúrate de calentar adecuadamente antes de intentar cualquiera de
            estas pruebas de referencia. Recomendamos que completes solo una
            prueba al día para capturar tu mejor potencial en los resultados de
            la prueba.
          </Typography>
          <br></br>
          Número de repeticiones<br></br>
          <Input
            sx={{ ml: 20, mt: 2, mb: 1 }}
            type="number"
            id="maxNumDom"
            onChange={handleChangeMaxNumDom}
            value={maxNumDom}
          />
          <br></br>
          Número de repeticiones brazo derecho<br></br>
          <Input
            sx={{ ml: 20, mt: 2, mb: 1 }}
            type="number"
            id="maxNumDomDer"
            onChange={handleChangeMaxNumDomDer}
            value={maxNumDomDer}
          />
          <br></br>
          Número de repeticiones brazo izquierdo<br></br>
          <Input
            sx={{ ml: 20, mt: 2, mb: 1 }}
            type="number"
            id="maxNumDomIzq"
            onChange={handleChangeMaxNumDomIzq}
            value={maxNumDomIzq}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMaxNumDom}>Cancel</Button>
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
          pt: 3,
        }}
        onClick={handleClickLockOff}
      >
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Bloqueos
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
          pt: 3,
        }}
        onClick={handleClickMaxWeight}
      >
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Dominadas lastradas
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
          pt: 3,
        }}
        onClick={handleClickMaxNumDom}
      >
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Máximo número de dominadas
            </Typography>
          </CardContent>
        </Card>
      </Button>
    </Grid>
  );
}
