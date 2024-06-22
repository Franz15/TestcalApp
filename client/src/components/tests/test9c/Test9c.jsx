import React, { useState } from "react";
import {
  Test1Test2,
  Test3,
  Test4,
  Puntuaciones,
  Porcentaje,
} from "./ComponentsTest9c";
import { useAuth } from "../../../hooks/useAuth";
import { Global } from "../../../helpers/Global";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Slider from "react-slick";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
export function Test9c() {
  //Token de autenticación
  const token = localStorage.getItem("token");
  const { auth } = useAuth();
  const [grade, setGrade] = useState("");
  const pesoCorp = auth.peso;
  const [test1Peso, setTest1] = useState("");
  const [test2Peso, setTest2] = useState("");
  const [test3Tiempo, setTest3] = useState("");
  const [variante, setVariante] = useState("");
  const [test4Tiempo, setTest4] = useState("");
  let [resultados, grado] = " ";

  const steps = [
    "Fuerza de Dedos",
    "Fuerza de Tracción",
    "Fuerza Abdominal",
    "Fuerza de Agarre",
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleSubmit = async (e) => {
    let puntos1 = Test1Test2(test1Peso, pesoCorp);
    let test1Porcent = Porcentaje(test1Peso, pesoCorp);
    let puntos2 = Test1Test2(test2Peso, pesoCorp);
    let test2Porcent = Porcentaje(test1Peso, pesoCorp);
    let puntos3 = Test3(test3Tiempo, variante);
    let puntos4 = Test4(test4Tiempo);
    [resultados, grado] = Puntuaciones(puntos1, puntos2, puntos3, puntos4);

    //Prevenir actualizacion de la pantalla
    e.preventDefault();
    //Recoger los datos del formulario
    const form = {
      fecha: new Date(),
      userId: auth._id,
      gradoDeclarado: auth.grado,
      pesoCorp: auth.peso,
      test1Peso: test1Peso,
      test1Porcent: test1Porcent,
      test1Punt: puntos1,
      test2Peso: test2Peso,
      test2Porcent: test2Porcent,
      test2Punt: puntos2,
      test3Tiempo: test3Tiempo,
      variante: variante,
      test3Punt: puntos3,
      test4Tiempo: test4Tiempo,
      test4Punt: puntos4,
      gradoTeorico: grado,
    };
    let newRecord = form;
    // ??????????????????????????????????????????
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
    } else {
    }
    setGrade(grado);
    handleNext();
    return { puntos1, puntos2, puntos3, puntos4, resultados, grado };
  };
  const handleChange1 = (e) => {
    setTest1(e.target.value);
  };
  const handleChange2 = (e) => {
    setTest2(e.target.value);
  };
  const handleChange3 = (e) => {
    setTest3(e.target.value);
  };
  const handleChangeVariante = (e) => {
    setVariante(e.target.value);
  };
  const handleChange4 = (e) => {
    setTest4(e.target.value);
  };

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setGrade("");
    setTest1("");
    setTest2("");
    setTest3("");
    setVariante("");
    setTest4("");
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      padding={3}
    >
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {(() => {
        if (activeStep === steps.length)
          return (
            <React.Fragment>
              <Card
                sx={{
                  maxWidth: 700,
                  maxHeight: 900,
                  display: "flex",
                  flexDirection: "column",
                  pt: 2,
                }}
              >
                <CardMedia
                  height={400}
                  component="iframe"
                  alt="Resultados"
                  src="../../../assets/img/backgrounds/background2.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    Resultado de tu test:
                  </Typography>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    Con tus condiciones físicas actuales podrías llegar a
                    escalar hasta {grade}
                  </Typography>
                </CardContent>
              </Card>

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Volver a hacer el Test</Button>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button href="/social">Ir al Dashboard</Button>
              </Box>
            </React.Fragment>
          );
        if (activeStep === 0)
          return (
            <React.Fragment>
              <Card
                sx={{
                  maxWidth: 700,
                  maxHeight: 900,
                  display: "flex",
                  flexDirection: "column",
                  pt: 2,
                }}
              >
                <CardMedia
                  height={400}
                  component="iframe"
                  alt="Suspensión en regletas"
                  src="https://www.youtube.com/embed/BOx9Q_sUBnM"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    Test 1: Fuerza de dedos.
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Realiza una suspensión durante 5 segundos en una regleta de
                    20mm con el mayor lastre que puedas. Escribe aquí por favor
                    qué lastre has utilizado (si no pones nada serán 0kg)
                  </Typography>
                  <Typography
                    sx={{ ml: 20, mt: 2, mb: 1 }}
                    color="text.secondary"
                  >
                    Introduce el peso de tu suspensión
                  </Typography>

                  <Input
                    sx={{ ml: 20, mt: 2, mb: 1 }}
                    type="number"
                    id="test1Peso"
                    onChange={handleChange1}
                    value={test1Peso}
                    endAdornment={
                      <InputAdornment position="end">kg</InputAdornment>
                    }
                  />
                </CardContent>
              </Card>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  maxWidth: 700,
                  justifyContent: "space-between",
                  pt: 2,
                }}
              >
                <Button
                  color="secondary"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Atrás
                </Button>
                <Button onClick={handleNext}>Siguiente</Button>
              </Box>
            </React.Fragment>
          );

        if (activeStep === 1)
          return (
            <React.Fragment>
              <Card
                sx={{
                  maxWidth: 700,
                  maxHeight: 900,
                  display: "flex",
                  flexDirection: "column",
                  pt: 2,
                }}
              >
                <CardMedia
                  height={400}
                  component="iframe"
                  alt="Dominada lastrada"
                  src="https://www.youtube.com/embed/Y7X1LJqJPSM"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Test 2: Fuerza de tracción.
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Realiza una dominada (agarre prono) con la mayor cantidad de
                    lastre que puedas. Escribe aquí por favor qué lastre has
                    utilizado (si no pones nada serán 0kg)
                  </Typography>
                  <Typography
                    sx={{ ml: 20, mt: 2, mb: 1 }}
                    color="text.secondary"
                  >
                    Introduce el resultado de tu dominada lastrada
                  </Typography>

                  <Input
                    sx={{ ml: 20, mt: 2, mb: 1 }}
                    type="number"
                    id="test2Tiempo"
                    onChange={handleChange2}
                    value={test2Peso}
                    endAdornment={
                      <InputAdornment position="end">kg</InputAdornment>
                    }
                  />
                </CardContent>
              </Card>

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="secondary"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Atrás
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />

                <Button onClick={handleNext}>Siguiente</Button>
              </Box>
            </React.Fragment>
          );

        if (activeStep === 2)
          return (
            <React.Fragment>
              <Card
                sx={{
                  maxWidth: 700,
                  maxHeight: 900,
                  display: "flex",
                  flexDirection: "column",
                  pt: 2,
                }}
              >
                <Slider {...settings}>
                  {
                    <CardMedia
                      height={400}
                      component="iframe"
                      alt="Rodillas Dobladas"
                      src="https://www.youtube.com/embed/tERWNQjvek4"
                    />
                  }
                  <CardMedia
                    height={400}
                    component="iframe"
                    alt="L-Sit"
                    src="https://www.youtube.com/embed/WHi1bvZLwlw"
                  />
                  <CardMedia
                    height={400}
                    component="iframe"
                    alt="Front Lever"
                    src="https://www.youtube.com/embed/0GUycaYNpls"
                  />
                </Slider>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Test 3: Fuerza abdominal.
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Agarrado de una barra haz un front lever todo el tiempo que
                    puedas. Si no puedes, puedes hacer un L-Sit con las piernas
                    estiradas, o, si no puedes, con las piernas dobladas, no hay
                    problema.
                  </Typography>
                  <Typography
                    sx={{ ml: 20, mt: 2, mb: 1 }}
                    color="text.secondary"
                  >
                    Introduce el tiempo que has aguantado (en segundos)
                  </Typography>
                  <Input
                    sx={{ ml: 20, mt: 2, mb: 1 }}
                    id="test3Tiempo"
                    onChange={handleChange3}
                    value={test3Tiempo}
                    InputProps={{ inputProps: { min: 0 } }}
                    endAdornment={
                      <InputAdornment position="end">s</InputAdornment>
                    }
                  />

                  <FormControl sx={{ ml: 20, mt: 2, mb: 1 }}>
                    <FormLabel id="controlled-radio-buttons-group">
                      Selecciona la variante que has hecho
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={variante}
                      onChange={handleChangeVariante}
                      sx={{ color: "text.secondary" }}
                    >
                      <FormControlLabel
                        value="Rodillas Dobladas"
                        control={<Radio />}
                        label="Rodillas Dobladas"
                      />
                      <FormControlLabel
                        value="L-Sit"
                        control={<Radio />}
                        label="L Sit"
                      />
                      <FormControlLabel
                        value="Front Lever"
                        control={<Radio />}
                        label="Front Lever"
                      />
                    </RadioGroup>
                  </FormControl>
                </CardContent>
              </Card>

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="secondary"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Atrás
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />

                <Button onClick={handleNext}>Siguiente</Button>
              </Box>
            </React.Fragment>
          );
        else activeStep === 3;
        return (
          <React.Fragment>
            <Card
              sx={{
                maxWidth: 700,
                maxHeight: 900,
                display: "flex",
                flexDirection: "column",
                pt: 2,
              }}
            >
              <CardMedia
                height={400}
                component="iframe"
                alt="handle bar"
                src="https://www.youtube.com/embed/4RqNGRVaTUQ"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Test 4: Fuerza de agarre.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cuélgate de una barra, relajado, todo el tiempo que puedas
                  (las manos tienen que estar todo el tiempo en la barra, no
                  puedes liberar una o moverlas). Escribe aquí por favor cuál ha
                  sido tu tiempo
                </Typography>
                <Typography
                  sx={{ ml: 20, mt: 2, mb: 1 }}
                  color="text.secondary"
                >
                  Introduce el tiempo que has aguantado (en segundos)
                </Typography>

                <Input
                  sx={{ ml: 20, mt: 2, mb: 1 }}
                  type="number"
                  id="test1Peso"
                  onChange={handleChange4}
                  value={test4Tiempo}
                  InputProps={{ inputProps: { min: 0 } }}
                  endAdornment={
                    <InputAdornment position="end">s</InputAdornment>
                  }
                />
              </CardContent>
            </Card>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="secondary"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Atrás
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />

              <Button onClick={handleSubmit}>Resultados</Button>
            </Box>
          </React.Fragment>
        );
      })()}
    </Grid>
  );
}
