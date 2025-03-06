import React, { useState, useEffect } from "react";
import {
  Test1Test2,
  Test3,
  Test4,
  Puntuaciones,
  Porcentaje,
} from "./ComponentsTest9c";
import { useAuth } from "../../../hooks/useAuth";
import { Global } from "../../../helpers/Global";
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  InputAdornment, 
  TextField,
  Box,
  Container,
  Paper,
  Divider,
  CardActionArea,
  Fade,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  LinearProgress
} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StraightenIcon from "@mui/icons-material/Straighten";
import RepeatIcon from "@mui/icons-material/Repeat";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import Slider from "react-slick";
import "./test9c.css";
import "../../../components/common/buttons.css";

// Definición de las pruebas disponibles
const testDefinitions = [
  {
    id: "test1",
    name: "Fuerza de Dedos",
    description: "Realiza una suspensión durante 5 segundos en una regleta de 20mm con el mayor lastre que puedas.",
    icon: <StraightenIcon fontSize="large" />,
    color: "var(--color-principal)",
    dialogTitle: "Test 1: Fuerza de dedos",
    instructions: `Realiza una suspensión durante 5 segundos en una regleta de 20mm con el mayor lastre que puedas. Escribe aquí por favor qué lastre has utilizado (si no pones nada serán 0kg)`,
    videoUrl: "https://www.youtube.com/embed/BOx9Q_sUBnM",
    inputLabel: "Introduce el peso de tu suspensión",
    inputUnit: "kg"
  },
  {
    id: "test2",
    name: "Fuerza de Tracción",
    description: "Realiza una dominada (agarre prono) con la mayor cantidad de lastre que puedas.",
    icon: <FitnessCenterIcon fontSize="large" />,
    color: "var(--color-secundario)",
    dialogTitle: "Test 2: Fuerza de tracción",
    instructions: `Realiza una dominada (agarre prono) con la mayor cantidad de lastre que puedas. Escribe aquí por favor qué lastre has utilizado (si no pones nada serán 0kg)`,
    videoUrl: "https://www.youtube.com/embed/Y7X1LJqJPSM",
    inputLabel: "Introduce el resultado de tu dominada lastrada",
    inputUnit: "kg"
  },
  {
    id: "test3",
    name: "Fuerza Abdominal",
    description: "Agarrado de una barra haz un front lever todo el tiempo que puedas.",
    icon: <RepeatIcon fontSize="large" />,
    color: "var(--color-principal)",
    dialogTitle: "Test 3: Fuerza abdominal",
    instructions: `Agarrado de una barra haz un front lever todo el tiempo que puedas. Si no puedes, puedes hacer un L-Sit con las piernas estiradas, o, si no puedes, con las piernas dobladas, no hay problema.`,
    videoUrl: "https://www.youtube.com/embed/0GUycaYNpls",
    inputLabel: "Introduce el tiempo que has aguantado",
    inputUnit: "s"
  },
  {
    id: "test4",
    name: "Fuerza de Agarre",
    description: "Cuélgate de una barra, relajado, todo el tiempo que puedas.",
    icon: <AccessTimeIcon fontSize="large" />,
    color: "var(--color-secundario)",
    dialogTitle: "Test 4: Fuerza de agarre",
    instructions: `Cuélgate de una barra, relajado, todo el tiempo que puedas (las manos tienen que estar todo el tiempo en la barra, no puedes liberar una o moverlas). Escribe aquí por favor cuál ha sido tu tiempo`,
    videoUrl: "https://www.youtube.com/embed/4RqNGRVaTUQ",
    inputLabel: "Introduce el tiempo que has aguantado",
    inputUnit: "s"
  }
];

export function Test9c() {
  const token = localStorage.getItem("token");
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentTest, setCurrentTest] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  const [grade, setGrade] = useState("");
  const pesoCorp = auth.peso;
  const [test1Peso, setTest1] = useState("");
  const [test2Peso, setTest2] = useState("");
  const [test3Tiempo, setTest3] = useState("");
  const [variante, setVariante] = useState("");
  const [test4Tiempo, setTest4] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [completedTests, setCompletedTests] = useState([]);

  // Simular carga de datos
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleOpenDialog = (test) => {
    setCurrentTest(test);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  const handleChange = (e, testId) => {
    const value = e.target.value;
    
    switch(testId) {
      case "test1":
        setTest1(value);
        break;
      case "test2":
        setTest2(value);
        break;
      case "test3":
        setTest3(value);
        break;
      case "test4":
        setTest4(value);
        break;
      default:
        break;
    }
  };

  const handleChangeVariante = (e) => {
    setVariante(e.target.value);
  };

  const handleSubmitTest = async (testId) => {
    if (!validateTestInput(testId)) {
      setSnackbar({
        open: true,
        message: "Por favor, introduce un valor válido",
        severity: "error"
      });
      return;
    }

    try {
      // Marcar el test como completado
      setCompletedTests([...completedTests, testId]);
      
      // Cerrar el diálogo
      handleCloseDialog();
      
      // Mostrar mensaje de éxito
      setSnackbar({
        open: true,
        message: "Resultado guardado correctamente",
        severity: "success"
      });

      // Si todos los tests están completados, calcular y guardar el resultado final
      if (completedTests.length === 3) { // Ya tenemos 3 y estamos añadiendo el 4º
        await handleFinalSubmit();
      }
    } catch (error) {
      console.error("Error al guardar el resultado:", error);
      setSnackbar({
        open: true,
        message: "Error al guardar el resultado",
        severity: "error"
      });
    }
  };

  const validateTestInput = (testId) => {
    switch(testId) {
      case "test1":
        return test1Peso !== "";
      case "test2":
        return test2Peso !== "";
      case "test3":
        return test3Tiempo !== "" && variante !== "";
      case "test4":
        return test4Tiempo !== "";
      default:
        return false;
    }
  };

  const handleFinalSubmit = async () => {
    let puntos1 = Test1Test2(test1Peso, pesoCorp);
    let test1Porcent = Porcentaje(test1Peso, pesoCorp);
    let puntos2 = Test1Test2(test2Peso, pesoCorp);
    let test2Porcent = Porcentaje(test2Peso, pesoCorp);
    let puntos3 = Test3(test3Tiempo, variante);
    let puntos4 = Test4(test4Tiempo);
    let [resultados, grado] = Puntuaciones(puntos1, puntos2, puntos3, puntos4);

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
      _type: "test9c",
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
        setSnackbar({
          open: true,
          message: "¡Test completado! Tu grado estimado es " + grado,
          severity: "success"
        });
      } else {
        setSnackbar({
          open: true,
          message: "Error al guardar el resultado final",
          severity: "error"
        });
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setSnackbar({
        open: true,
        message: "Error de conexión",
        severity: "error"
      });
    }
  };

  const handleReset = () => {
    setTest1("");
    setTest2("");
    setTest3("");
    setVariante("");
    setTest4("");
    setCompletedTests([]);
    setGrade("");
  };

  // Componente para cada tarjeta de test
  const TestCard = ({ test }) => (
    <Fade in={!loading} timeout={500 + testDefinitions.indexOf(test) * 150}>
      <Grid item xs={12} sm={6} md={6}>
        <Card 
          className="test-card" 
          elevation={3}
          sx={{ 
            height: '100%',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)'
            },
            opacity: completedTests.includes(test.id) ? 0.7 : 1
          }}
        >
          <CardActionArea 
            onClick={() => handleOpenDialog(test)}
            sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
            disabled={completedTests.includes(test.id)}
          >
            <Box 
              sx={{ 
                backgroundColor: test.color,
                p: 3,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white'
              }}
            >
              {test.icon}
            </Box>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography gutterBottom variant="h5" component="div" fontWeight="bold">
                {test.name}
              </Typography>
              <Divider sx={{ my: 1.5 }} />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {test.description}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Typography 
                variant="button" 
                sx={{ 
                  mt: 2, 
                  alignSelf: 'flex-end',
                  color: test.color
                }}
              >
                {completedTests.includes(test.id) ? "COMPLETADO" : "INICIAR TEST"}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Fade>
  );

  // Renderizar el contenido del diálogo según el test seleccionado
  const renderDialogContent = () => {
    if (!currentTest) return null;

    if (currentTest.id === "test1") {
      return (
        <>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
            <InfoIcon sx={{ color: 'text.secondary', mr: 1, mt: 0.5 }} />
            <Typography variant="body1" color="text.secondary" style={{ whiteSpace: 'pre-line' }}>
              {currentTest.instructions}
            </Typography>
          </Box>
          
          <Box sx={{ mt: 3 }}>
            <TextField
              label={currentTest.inputLabel}
              type="number"
              value={test1Peso}
              onChange={(e) => handleChange(e, "test1")}
              InputProps={{
                endAdornment: <InputAdornment position="end">{currentTest.inputUnit}</InputAdornment>,
              }}
              variant="outlined"
              fullWidth
            />
          </Box>
        </>
      );
    } else if (currentTest.id === "test2") {
      return (
        <>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
            <InfoIcon sx={{ color: 'text.secondary', mr: 1, mt: 0.5 }} />
            <Typography variant="body1" color="text.secondary" style={{ whiteSpace: 'pre-line' }}>
              {currentTest.instructions}
            </Typography>
          </Box>
          
          <Box sx={{ mt: 3 }}>
            <TextField
              label={currentTest.inputLabel}
              type="number"
              value={test2Peso}
              onChange={(e) => handleChange(e, "test2")}
              InputProps={{
                endAdornment: <InputAdornment position="end">{currentTest.inputUnit}</InputAdornment>,
              }}
              variant="outlined"
              fullWidth
            />
          </Box>
        </>
      );
    } else if (currentTest.id === "test3") {
      return (
        <>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
            <InfoIcon sx={{ color: 'text.secondary', mr: 1, mt: 0.5 }} />
            <Typography variant="body1" color="text.secondary" style={{ whiteSpace: 'pre-line' }}>
              {currentTest.instructions}
            </Typography>
          </Box>
          
          <Box sx={{ mt: 3 }}>
            <TextField
              label={currentTest.inputLabel}
              type="number"
              value={test3Tiempo}
              onChange={(e) => handleChange(e, "test3")}
              InputProps={{
                endAdornment: <InputAdornment position="end">{currentTest.inputUnit}</InputAdornment>,
              }}
              variant="outlined"
              fullWidth
              sx={{ mb: 3 }}
            />

            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Selecciona la variante que has hecho:
            </Typography>
            <RadioGroup
              aria-label="variante"
              name="variante"
              value={variante}
              onChange={handleChangeVariante}
            >
              <FormControlLabel value="Rodillas Dobladas" control={<Radio />} label="Rodillas Dobladas" />
              <FormControlLabel value="L-Sit" control={<Radio />} label="L-Sit" />
              <FormControlLabel value="Front Lever" control={<Radio />} label="Front Lever" />
            </RadioGroup>
          </Box>
        </>
      );
    } else if (currentTest.id === "test4") {
      return (
        <>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
            <InfoIcon sx={{ color: 'text.secondary', mr: 1, mt: 0.5 }} />
            <Typography variant="body1" color="text.secondary" style={{ whiteSpace: 'pre-line' }}>
              {currentTest.instructions}
            </Typography>
          </Box>
          
          <Box sx={{ mt: 3 }}>
            <TextField
              label={currentTest.inputLabel}
              type="number"
              value={test4Tiempo}
              onChange={(e) => handleChange(e, "test4")}
              InputProps={{
                endAdornment: <InputAdornment position="end">{currentTest.inputUnit}</InputAdornment>,
              }}
              variant="outlined"
              fullWidth
            />
          </Box>
        </>
      );
    }
  };

  // Diálogo de test
  const TestDialog = () => {
    if (!currentTest) return null;
    
    return (
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          elevation: 5,
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle 
          sx={{ 
            backgroundColor: currentTest.color, 
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Box display="flex" alignItems="center">
            {currentTest.icon}
            <Typography variant="h6" sx={{ ml: 1 }}>
              {currentTest.dialogTitle}
            </Typography>
          </Box>
          <IconButton 
            onClick={handleCloseDialog}
            sx={{ 
              color: 'white',
              padding: '8px',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }
            }}
            size="small"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ mb: 3 }}>
            <div className="video-container">
              <CardMedia
                component="iframe"
                alt={currentTest.name}
                src={currentTest.videoUrl}
                sx={{ border: 0 }}
              />
            </div>
          </Box>
          {renderDialogContent()}
        </DialogContent>
        
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={handleCloseDialog} 
            variant="outlined"
            className="app-button app-button-secondary"
            sx={{ 
              borderColor: currentTest.color,
              color: currentTest.color,
              fontWeight: 600,
              '&:hover': {
                borderColor: currentTest.color === 'var(--color-principal)' ? 'var(--color-secundario)' : 'var(--color-principal)',
                color: currentTest.color === 'var(--color-principal)' ? 'var(--color-secundario)' : 'var(--color-principal)',
                backgroundColor: `${currentTest.color}10`
              }
            }}
          >
            VOLVER
          </Button>
          <Button 
            onClick={() => handleSubmitTest(currentTest.id)} 
            variant="contained"
            className="app-button app-button-primary"
            sx={{ 
              backgroundColor: currentTest.color,
              color: '#fff',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: currentTest.color === 'var(--color-principal)' ? 'var(--color-secundario)' : 'var(--color-principal)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            GUARDAR
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  // Componente de resultados
  const ResultsComponent = () => {
    if (!grade) return null;
    
    return (
      <Fade in={true} timeout={500}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            mt: 4, 
            borderRadius: 2,
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.9)'
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" color="primary">
            ¡Excelente trabajo!
          </Typography>
          <Typography variant="body1" paragraph>
            Con tus condiciones físicas actuales podrías llegar a escalar hasta:
          </Typography>
          <Typography 
            variant="h2" 
            component="div" 
            sx={{ 
              my: 3, 
              color: 'var(--color-principal)',
              fontWeight: 'bold'
            }}
          >
            {grade}
          </Typography>
          
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              className="app-button app-button-secondary"
              onClick={handleReset}
              sx={{ 
                borderColor: 'var(--color-principal)',
                color: 'var(--color-principal)',
                fontWeight: 600,
                '&:hover': {
                  borderColor: 'var(--color-secundario)',
                  color: 'var(--color-secundario)',
                  backgroundColor: 'rgba(232, 191, 86, 0.05)'
                }
              }}
            >
              REPETIR TEST
            </Button>
            <Button
              variant="contained"
              className="app-button app-button-primary"
              component="a"
              href="/social"
              sx={{ 
                backgroundColor: 'var(--color-principal)',
                color: '#fff',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'var(--color-secundario)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              VER DASHBOARD
            </Button>
          </Box>
        </Paper>
      </Fade>
    );
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={40} thickness={4} />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Fade in={!loading} timeout={300}>
        <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.8)' }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Test 9c
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Completa las cuatro pruebas para evaluar tu nivel de escalada y recibir una estimación de tu grado máximo.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Progreso: {completedTests.length} de 4 pruebas completadas
            </Typography>
            <Box sx={{ width: '100%', mt: 1 }}>
              <LinearProgress 
                variant="determinate" 
                value={(completedTests.length / 4) * 100} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: 'var(--color-principal)'
                  }
                }}
              />
            </Box>
          </Box>
        </Paper>
      </Fade>
      
      <Grid container spacing={3}>
        {testDefinitions.map((test) => (
          <TestCard key={test.id} test={test} />
        ))}
      </Grid>
      
      {grade && <ResultsComponent />}
      
      <TestDialog />
      
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}