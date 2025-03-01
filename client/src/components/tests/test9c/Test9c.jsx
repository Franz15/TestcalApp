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
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import Slider from "react-slick";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import Container from "@mui/material/Container";
import "./test9c.css";

export function Test9c() {
  // Theme and responsive breakpoints
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  // Auth and state
  const token = localStorage.getItem("token");
  const { auth } = useAuth();
  const [grade, setGrade] = useState("");
  const pesoCorp = auth.peso;
  const [test1Peso, setTest1] = useState("");
  const [test2Peso, setTest2] = useState("");
  const [test3Tiempo, setTest3] = useState("");
  const [variante, setVariante] = useState("");
  const [test4Tiempo, setTest4] = useState("");
  const [activeStep, setActiveStep] = useState(0);
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
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          arrows: false,
        }
      }
    ]
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let puntos1 = Test1Test2(test1Peso, pesoCorp);
    let test1Porcent = Porcentaje(test1Peso, pesoCorp);
    let puntos2 = Test1Test2(test2Peso, pesoCorp);
    let test2Porcent = Porcentaje(test1Peso, pesoCorp);
    let puntos3 = Test3(test3Tiempo, variante);
    let puntos4 = Test4(test4Tiempo);
    [resultados, grado] = Puntuaciones(puntos1, puntos2, puntos3, puntos4);

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

    try {
      const request = await fetch(Global.url + "results/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(form),
      });
      const data = await request.json();
      
      if (data.status === "success") {
        setGrade(grado);
        handleNext();
      }
    } catch (error) {
      console.error("Error saving results:", error);
    }
  };

  const handleChange1 = (e) => setTest1(e.target.value);
  const handleChange2 = (e) => setTest2(e.target.value);
  const handleChange3 = (e) => setTest3(e.target.value);
  const handleChangeVariante = (e) => setVariante(e.target.value);
  const handleChange4 = (e) => setTest4(e.target.value);

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

  // Common styles for input sections
  const inputSectionStyle = {
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: isMobile ? 'flex-start' : 'center',
    width: '100%',
    mt: 2, 
    mb: 1,
    ml: isMobile ? 0 : 2
  };

  // Render test content based on active step
  const renderTestContent = () => {
    if (activeStep === steps.length) {
      return (
        <div className="test-results">
          <h2 className="test-results-title">Resultado de tu test:</h2>
          <p className="test-results-description">
            Con tus condiciones físicas actuales podrías llegar a escalar hasta
          </p>
          <span className="test-results-grade">{grade}</span>
          
          <div className="test-results-buttons">
            <button 
              className="test-button test-button-secondary" 
              onClick={handleReset}
            >
              Volver a hacer el Test
            </button>
            
            <a href="/social" className="test-button test-button-primary">
              Ir al Dashboard
            </a>
          </div>
        </div>
      );
    }

    // Common card props
    const cardProps = {
      className: "test-card",
      sx: {
        width: '100%',
        maxWidth: 700,
        boxShadow: 3,
        borderRadius: 2,
      }
    };

    if (activeStep === 0) {
      return (
        <>
          <Card {...cardProps}>
            <div className="video-container">
              <CardMedia
                component="iframe"
                alt="Suspensión en regletas"
                src="https://www.youtube.com/embed/BOx9Q_sUBnM"
                sx={{ border: 0 }}
              />
            </div>
            <CardContent className="test-card-content">
              <Typography variant="h5" component="h2" className="test-card-title">
                Test 1: Fuerza de dedos
              </Typography>
              <Typography className="test-card-description">
                Realiza una suspensión durante 5 segundos en una regleta de
                20mm con el mayor lastre que puedas. Escribe aquí por favor
                qué lastre has utilizado (si no pones nada serán 0kg)
              </Typography>
              
              <div className="test-input-group">
                <label className="test-input-label">
                  Introduce el peso de tu suspensión
                </label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    className="test-input-field"
                    type="number"
                    id="test1Peso"
                    onChange={handleChange1}
                    value={test1Peso}
                    min="0"
                  />
                  <span className="test-input-addon">kg</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="test-buttons">
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className="test-button test-button-primary"
            >
              Siguiente
            </Button>
          </div>
        </>
      );
    }

    if (activeStep === 1) {
      return (
        <>
          <Card {...cardProps}>
            <div className="video-container">
              <CardMedia
                component="iframe"
                alt="Dominada lastrada"
                src="https://www.youtube.com/embed/Y7X1LJqJPSM"
                sx={{ border: 0 }}
              />
            </div>
            <CardContent className="test-card-content">
              <Typography variant="h5" component="h2" className="test-card-title">
                Test 2: Fuerza de tracción
              </Typography>
              <Typography className="test-card-description">
                Realiza una dominada (agarre prono) con la mayor cantidad de
                lastre que puedas. Escribe aquí por favor qué lastre has
                utilizado (si no pones nada serán 0kg)
              </Typography>
              
              <div className="test-input-group">
                <label className="test-input-label">
                  Introduce el resultado de tu dominada lastrada
                </label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    className="test-input-field"
                    type="number"
                    id="test2Peso"
                    onChange={handleChange2}
                    value={test2Peso}
                    min="0"
                  />
                  <span className="test-input-addon">kg</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="test-buttons">
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleBack}
              className="test-button test-button-secondary"
            >
              Atrás
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className="test-button test-button-primary"
            >
              Siguiente
            </Button>
          </div>
        </>
      );
    }

    if (activeStep === 2) {
      return (
        <>
          <Card {...cardProps}>
            <div className="slider-container">
              <Slider {...settings}>
                <div>
                  <div className="video-container">
                    <CardMedia
                      component="iframe"
                      alt="Rodillas Dobladas"
                      src="https://www.youtube.com/embed/tERWNQjvek4"
                      sx={{ border: 0 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="video-container">
                    <CardMedia
                      component="iframe"
                      alt="L-Sit"
                      src="https://www.youtube.com/embed/WHi1bvZLwlw"
                      sx={{ border: 0 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="video-container">
                    <CardMedia
                      component="iframe"
                      alt="Front Lever"
                      src="https://www.youtube.com/embed/0GUycaYNpls"
                      sx={{ border: 0 }}
                    />
                  </div>
                </div>
              </Slider>
            </div>
            <CardContent className="test-card-content">
              <Typography variant="h5" component="h2" className="test-card-title">
                Test 3: Fuerza abdominal
              </Typography>
              <Typography className="test-card-description">
                Agarrado de una barra haz un front lever todo el tiempo que
                puedas. Si no puedes, puedes hacer un L-Sit con las piernas
                estiradas, o, si no puedes, con las piernas dobladas, no hay
                problema.
              </Typography>
              
              <div className="test-input-group">
                <label className="test-input-label">
                  Introduce el tiempo que has aguantado (en segundos)
                </label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    className="test-input-field"
                    type="number"
                    id="test3Tiempo"
                    onChange={handleChange3}
                    value={test3Tiempo}
                    min="0"
                  />
                  <span className="test-input-addon">s</span>
                </div>
              </div>

              <div className="test-radio-group">
                <label className="test-radio-title">
                  Selecciona la variante que has hecho
                </label>
                <div className="test-radio-options">
                  <div className="test-radio-option">
                    <input
                      type="radio"
                      id="rodillasDobladas"
                      name="variante"
                      value="Rodillas Dobladas"
                      checked={variante === "Rodillas Dobladas"}
                      onChange={handleChangeVariante}
                    />
                    <label htmlFor="rodillasDobladas" className="test-radio-label">
                      Rodillas Dobladas
                    </label>
                  </div>
                  <div className="test-radio-option">
                    <input
                      type="radio"
                      id="lSit"
                      name="variante"
                      value="L-Sit"
                      checked={variante === "L-Sit"}
                      onChange={handleChangeVariante}
                    />
                    <label htmlFor="lSit" className="test-radio-label">
                      L-Sit
                    </label>
                  </div>
                  <div className="test-radio-option">
                    <input
                      type="radio"
                      id="frontLever"
                      name="variante"
                      value="Front Lever"
                      checked={variante === "Front Lever"}
                      onChange={handleChangeVariante}
                    />
                    <label htmlFor="frontLever" className="test-radio-label">
                      Front Lever
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="test-buttons">
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleBack}
              className="test-button test-button-secondary"
            >
              Atrás
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className="test-button test-button-primary"
            >
              Siguiente
            </Button>
          </div>
        </>
      );
    }

    // Step 3
    return (
      <>
        <Card {...cardProps}>
          <div className="video-container">
            <CardMedia
              component="iframe"
              alt="Handle bar"
              src="https://www.youtube.com/embed/4RqNGRVaTUQ"
              sx={{ border: 0 }}
            />
          </div>
          <CardContent className="test-card-content">
            <Typography variant="h5" component="h2" className="test-card-title">
              Test 4: Fuerza de agarre
            </Typography>
            <Typography className="test-card-description">
              Cuélgate de una barra, relajado, todo el tiempo que puedas
              (las manos tienen que estar todo el tiempo en la barra, no
              puedes liberar una o moverlas). Escribe aquí por favor cuál ha
              sido tu tiempo
            </Typography>
            
            <div className="test-input-group">
              <label className="test-input-label">
                Introduce el tiempo que has aguantado (en segundos)
              </label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  className="test-input-field"
                  type="number"
                  id="test4Tiempo"
                  onChange={handleChange4}
                  value={test4Tiempo}
                  min="0"
                />
                <span className="test-input-addon">s</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="test-buttons">
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleBack}
            className="test-button test-button-secondary"
          >
            Atrás
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className="test-button test-button-primary"
          >
            Resultados
          </Button>
        </div>
      </>
    );
  };

  return (
    <div className="test-container">
      <div className="test-stepper">
        <Stepper 
          activeStep={activeStep} 
          alternativeLabel={isMobile}
          sx={{ 
            overflowX: 'auto',
            '& .MuiStepLabel-label': {
              fontSize: isMobile ? '0.75rem' : '0.875rem',
            }
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      
      {renderTestContent()}
    </div>
  );
}
