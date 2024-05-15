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
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

import Select from "@mui/material/Select";

export function Campus() {
  const token = localStorage.getItem("token");
  const { auth } = useAuth();

  const [option, setOption] = useState("");

  const [openMax, setOpenMax] = useState(false);
  const [openDouble, setOpenDouble] = useState(false);
  const [openUnoCincoNueve, setOpenUnoCincoNueve] = useState(false);
  const [maxReachDer, setMaxReachDer] = useState("");
  const [maxReachIzq, setMaxReachIzq] = useState("");
  const [doubles, setDouble] = useState("");
  const [cinco, setCinco] = useState("");
  const [nueve, setNueve] = useState("");

  const handleClickMax = () => {
    setOpenMax(true);
  };
  const handleCloseMax = () => {
    setOpenMax(false);
  };
  const handleChangeDer = (e) => {
    setMaxReachDer(e.target.value);
    if (option !== "maxReachIzq"){
      setOption("maxReachDer");
    } else{
      setOption("maxReach");
    }
    
  };
  const handleChangeIzq = (e) => {
    setMaxReachIzq(e.target.value);
    if (option !== "maxReachDer"){
      setOption("maxReachIzq");
    } else{
      setOption("maxReach");
    }
  };

  const handleClickDouble = () => {
    setOpenDouble(true);
  };
  const handleCloseDouble = () => {
    setOpenDouble(false);
  };
  const handleChangeDouble = (e) => {
    setDouble(e.target.value);
    setOption("doubles");
  };

  const handleClickUnoCincoNueve = () => {
    setOpenUnoCincoNueve(true);
  };
  const handleCloseUnoCincoNueve = () => {
    setOpenUnoCincoNueve(false);
  };
  const handleChangeCinco = (e) => {
    setCinco(e.target.value);
    setOption("159");
  };
  const handleChangeNueve = (e) => {
    setNueve(e.target.value);
    setOption("159");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let form;
    let form2 = null;
    //Recoger datos del formulario
    if (option == "maxReach") {
      form = {
        fecha: new Date(),
        userId: auth._id,
        gradoDeclarado: auth.grado,
        maxReachDer: maxReachDer,
        _type: "maxReachDer",
      };
      form2 = {
        fecha: new Date(),
        userId: auth._id,
        gradoDeclarado: auth.grado,
        maxReachIzq: maxReachIzq,
        _type: "maxReachIzq",
      };
    } else if (option == "maxReachDer") {
      form = {
        fecha: new Date(),
        userId: auth._id,
        gradoDeclarado: auth.grado,
        maxReachDer: maxReachDer,
        _type: "maxReachDer",
      };
    } else if (option == "maxReachIzq") {
      form = {
        fecha: new Date(),
        userId: auth._id,
        gradoDeclarado: auth.grado,
        maxReachIzq: maxReachIzq,
        _type: "maxReachIzq",
      };
    } else if (option == "doubles") {
      form = {
        fecha: new Date(),
        userId: auth._id,
        gradoDeclarado: auth.grado,
        dobles: doubles,
        _type: "dobles",
      };
    } else if (option == "159") {
      form = {
        fecha: new Date(),
        userId: auth._id,
        gradoDeclarado: auth.grado,
        cinco: cinco,
        nueve: nueve,
        _type: "159",
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
      setDouble("");
      setCinco("");
      setNueve("");
      handleCloseMax();
      handleCloseDouble();
      handleCloseUnoCincoNueve();
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
      setMaxReachDer("");
      setMaxReachIzq("");
      setOption("");
      handleCloseMax();
      handleCloseDouble();
      handleCloseUnoCincoNueve();
      form2 = null;
    } else {
      
    }
  }  else {
    setMaxReachDer("");
    setMaxReachIzq("");
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
        open={openMax}
        onClose={handleCloseMax}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Test 1: Alcance máximo."}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="text.secondary">
            Esta prueba mide tu potencia explosiva en el campus para cada lado.
            Para completar esta prueba, utiliza el peldaño grande de una tabla
            de campus (aproximadamente 1.25 pulgadas o 32 mm).
            <br></br>
            Comienza emparejado en el peldaño inferior (puedes comenzar en un
            peldaño más alto, pero deberás restar la diferencia). Haz un campus
            tan alto como sea posible con una mano y luego empareja. Repite con
            la otra mano después de al menos 2 minutos de descanso. Registra el
            número del peldaño del campus (los medios cuentan) y envía la
            información a continuación.
            <br></br>
            <br></br>
            Asegúrate de calentar adecuadamente antes de intentar cualquiera de
            estas pruebas de referencia. Recomendamos que completes solo una
            prueba al día para capturar tu mejor potencial en los resultados de
            la prueba.
          </Typography>
          <InputLabel id="maxReachDer-label">Max Reach Der</InputLabel>
          <Select
            variant="standard"
            sx={{ m: 1, width: 200 }}
            id="maxReachDer"
            labelId="maxReachDer-label"
            name="maxReachDer"
            label="Max Reach Der"
            value={maxReachDer}
            onChange={handleChangeDer}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={1.5}>1.5</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={2.5}>2.5</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={3.5}>3.5</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={4.5}>4.5</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={5.5}>5.5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={6.5}>6.5</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={7.5}>7.5</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={8.5}>8.5</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={9.5}>9.5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>

          <InputLabel id="maxReachDer-label">Max Reach Izq</InputLabel>
          <Select
            variant="standard"
            sx={{ m: 1, width: 200 }}
            id="maxReachIzq"
            labelId="maxReachIzq-label"
            name="maxReachIzq"
            label="Max Reach Izq"
            value={maxReachIzq}
            onChange={handleChangeIzq}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={1.5}>1.5</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={2.5}>2.5</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={3.5}>3.5</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={4.5}>4.5</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={5.5}>5.5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={6.5}>6.5</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={7.5}>7.5</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={8.5}>8.5</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={9.5}>9.5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMax}>Cancel</Button>
          <Button onClick={handleSubmit} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDouble}
        onClose={handleCloseDouble}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Test 2: Campus Dobles dinámicos."}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="text.secondary">
            Esta prueba mide tu resistencia a la potencia explosiva utilizando
            dinámicas dobles en el campus. Para completar esta prueba, utiliza
            el peldaño grande de una tabla de campus (aproximadamente 1.25
            pulgadas o 32 mm). Comienza en el peldaño inferior y muévete
            dinámicamente hacia arriba con ambas manos hasta el peldaño más alto
            posible. Registra el peldaño más alto alcanzado en el campus doble y
            envía la información a continuación.
            <br></br>
            <br></br>
            Asegúrate de calentar adecuadamente antes de intentar cualquiera de
            estas pruebas de referencia. Recomendamos que completes solo una
            prueba al día para capturar tu mejor potencial en los resultados de
            la prueba
          </Typography>
          <InputLabel id="doubles-label">Dobles</InputLabel>
          <Select
            variant="standard"
            sx={{ m: 1, width: 200 }}
            id="doubles"
            labelId="doubles-label"
            name="doubles"
            label="Doubles"
            value={doubles}
            onChange={handleChangeDouble}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={1.5}>1.5</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={2.5}>2.5</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={3.5}>3.5</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={4.5}>4.5</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={5.5}>5.5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={6.5}>6.5</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={7.5}>7.5</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={8.5}>8.5</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={9.5}>9.5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDouble}>Cancel</Button>
          <Button onClick={handleSubmit} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openUnoCincoNueve}
        onClose={handleCloseUnoCincoNueve}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Test 3: 1-5-9."}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="text.secondary">
            Esta prueba mide tu potencia explosiva en el campus en dos
            movimientos. Para completar esta prueba, utiliza el peldaño grande
            de una tabla de campus (aproximadamente 1.25 pulgadas o 32 mm).
            Comienza en el peldaño inferior (puedes empezar en un peldaño más
            alto, solo recuerda restar la diferencia) y haz un campus tan alto
            como sea posible con una mano, luego tira lo más lejos posible con
            la otra mano. Registra el número del segundo y tercer peldaño del
            campus (los medios cuentan) y envía la información a continuación.
            <br></br>
            <br></br>
            Asegúrate de calentar adecuadamente antes de intentar cualquiera de
            estas pruebas de referencia. Recomendamos que completes solo una
            prueba al día para capturar tu mejor potencial en los resultados de
            la prueba.
          </Typography>
          <InputLabel id="cinco-label">Segundo</InputLabel>
          <Select
            variant="standard"
            sx={{ m: 1, width: 200 }}
            id="cinco"
            labelId="dcinco-label"
            name="cinco"
            label="Cinco"
            value={cinco}
            onChange={handleChangeCinco}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={1.5}>1.5</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={2.5}>2.5</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={3.5}>3.5</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={4.5}>4.5</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={5.5}>5.5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={6.5}>6.5</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={7.5}>7.5</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={8.5}>8.5</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={9.5}>9.5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>

          <InputLabel id="nueve-label">Tercero</InputLabel>
          <Select
            variant="standard"
            sx={{ m: 1, width: 200 }}
            id="nueve"
            labelId="nueve-label"
            name="nueve"
            label="Nueve"
            value={nueve}
            onChange={handleChangeNueve}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={1.5}>1.5</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={2.5}>2.5</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={3.5}>3.5</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={4.5}>4.5</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={5.5}>5.5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={6.5}>6.5</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={7.5}>7.5</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={8.5}>8.5</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={9.5}>9.5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUnoCincoNueve}>Cancel</Button>
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
              Alcance Máximo
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
        onClick={handleClickDouble}
      >
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Dobles
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
        onClick={handleClickUnoCincoNueve}
      >
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5">
              1-5-9
            </Typography>
          </CardContent>
        </Card>
      </Button>
    </Grid>
  );
}
