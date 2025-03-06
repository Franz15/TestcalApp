import React, { useState, useEffect } from "react";
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
  MenuItem,
  InputLabel,
  Select,
  Box,
  Container,
  Paper,
  Divider,
  CardActionArea,
  Fade,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import StraightenIcon from "@mui/icons-material/Straighten";
import RepeatIcon from "@mui/icons-material/Repeat";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import "./campus.css";
import "../../../components/common/buttons.css";

// Definición de las pruebas disponibles
const testDefinitions = [
  {
    id: "maxReach",
    name: "Alcance máximo",
    description: "Esta prueba mide tu potencia explosiva en el campus para cada lado.",
    icon: <StraightenIcon fontSize="large" />,
    color: "var(--color-principal)",
    dialogTitle: "Test 1: Alcance máximo",
    instructions: `Esta prueba mide tu potencia explosiva en el campus para cada lado.
Para completar esta prueba, utiliza el peldaño grande de una tabla de campus (aproximadamente 1.25 pulgadas o 32 mm).

Comienza emparejado en el peldaño inferior (puedes comenzar en un peldaño más alto, pero deberás restar la diferencia). Haz un campus tan alto como sea posible con una mano y luego empareja. Repite con la otra mano después de al menos 2 minutos de descanso. Registra el número del peldaño del campus (los medios cuentan) y envía la información a continuación.

Asegúrate de calentar adecuadamente antes de intentar cualquiera de estas pruebas de referencia. Recomendamos que completes solo una prueba al día para capturar tu mejor potencial en los resultados de la prueba.`
  },
  {
    id: "doubles",
    name: "Dobles",
    description: "Esta prueba mide tu resistencia a la potencia explosiva utilizando dinámicas dobles en el campus.",
    icon: <RepeatIcon fontSize="large" />,
    color: "var(--color-secundario)",
    dialogTitle: "Test 2: Campus Dobles dinámicos",
    instructions: `Esta prueba mide tu resistencia a la potencia explosiva utilizando dinámicas dobles en el campus. Para completar esta prueba, utiliza el peldaño grande de una tabla de campus (aproximadamente 1.25 pulgadas o 32 mm). 

Comienza en el peldaño inferior y muévete dinámicamente hacia arriba con ambas manos hasta el peldaño más alto posible. Registra el peldaño más alto alcanzado en el campus doble y envía la información a continuación.

Asegúrate de calentar adecuadamente antes de intentar cualquiera de estas pruebas de referencia. Recomendamos que completes solo una prueba al día para capturar tu mejor potencial en los resultados de la prueba.`
  },
  {
    id: "159",
    name: "1-5-9",
    description: "Esta prueba mide tu potencia explosiva en el campus en dos movimientos.",
    icon: <FitnessCenterIcon fontSize="large" />,
    color: "var(--color-principal)",
    dialogTitle: "Test 3: 1-5-9",
    instructions: `Esta prueba mide tu potencia explosiva en el campus en dos movimientos. Para completar esta prueba, utiliza el peldaño grande de una tabla de campus (aproximadamente 1.25 pulgadas o 32 mm).

Comienza en el peldaño inferior (puedes empezar en un peldaño más alto, solo recuerda restar la diferencia) y haz un campus tan alto como sea posible con una mano, luego tira lo más lejos posible con la otra mano. Registra el número del segundo y tercer peldaño del campus (los medios cuentan) y envía la información a continuación.

Asegúrate de calentar adecuadamente antes de intentar cualquiera de estas pruebas de referencia. Recomendamos que completes solo una prueba al día para capturar tu mejor potencial en los resultados de la prueba.`
  }
];

export function Campus() {
  const token = localStorage.getItem("token");
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentTest, setCurrentTest] = useState(null);
  const [option, setOption] = useState("");
  const [maxReachDer, setMaxReachDer] = useState("");
  const [maxReachIzq, setMaxReachIzq] = useState("");
  const [doubles, setDouble] = useState("");
  const [cinco, setCinco] = useState("");
  const [nueve, setNueve] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  // Simular carga de datos
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleOpenDialog = (test) => {
    setCurrentTest(test);
    setOption("");
    setMaxReachDer("");
    setMaxReachIzq("");
    setDouble("");
    setCinco("");
    setNueve("");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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

  const handleChangeDouble = (e) => {
    setDouble(e.target.value);
    setOption("doubles");
  };

  const handleChangeCinco = (e) => {
    setCinco(e.target.value);
    setOption("159");
  };

  const handleChangeNueve = (e) => {
    setNueve(e.target.value);
    setOption("159");
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!option) {
      setSnackbar({
        open: true,
        message: "Por favor, introduce un valor válido",
        severity: "error"
      });
      return;
    }

    let form;
    let form2 = null;
    
    // Recoger datos del formulario según el tipo de test
    if (option === "maxReach") {
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
    } else if (option === "maxReachDer") {
      form = {
        fecha: new Date(),
        userId: auth._id,
        gradoDeclarado: auth.grado,
        maxReachDer: maxReachDer,
        _type: "maxReachDer",
      };
    } else if (option === "maxReachIzq") {
      form = {
        fecha: new Date(),
        userId: auth._id,
        gradoDeclarado: auth.grado,
        maxReachIzq: maxReachIzq,
        _type: "maxReachIzq",
      };
    } else if (option === "doubles") {
      form = {
        fecha: new Date(),
        userId: auth._id,
        gradoDeclarado: auth.grado,
        dobles: doubles,
        _type: "dobles",
      };
    } else if (option === "159") {
      form = {
        fecha: new Date(),
        userId: auth._id,
        gradoDeclarado: auth.grado,
        cinco: cinco,
        nueve: nueve,
        _type: "159",
      };
    }

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
        if (form2 !== null) {
          const request2 = await fetch(Global.url + "results/save", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify(form2),
          });
          
          const data2 = await request2.json();
          
          if (data2.status === "success") {
            setSnackbar({
              open: true,
              message: "Resultados guardados correctamente",
              severity: "success"
            });
          } else {
            setSnackbar({
              open: true,
              message: "Error al guardar el segundo resultado",
              severity: "error"
            });
          }
        } else {
          setSnackbar({
            open: true,
            message: "Resultado guardado correctamente",
            severity: "success"
          });
        }
        
        handleCloseDialog();
        setOption("");
        setMaxReachDer("");
        setMaxReachIzq("");
        setDouble("");
        setCinco("");
        setNueve("");
      } else {
        setSnackbar({
          open: true,
          message: "Error al guardar el resultado",
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

  // Componente para cada tarjeta de test
  const TestCard = ({ test }) => (
    <Fade in={!loading} timeout={500 + testDefinitions.indexOf(test) * 150}>
      <Grid item xs={12} sm={6} md={4}>
        <Card 
          className="test-card" 
          elevation={3}
          sx={{ 
            height: '100%',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)'
            }
          }}
        >
          <CardActionArea 
            onClick={() => handleOpenDialog(test)}
            sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
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
                Iniciar Test
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

    if (currentTest.id === "maxReach") {
      return (
        <>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
            <InfoIcon sx={{ color: 'text.secondary', mr: 1, mt: 0.5 }} />
            <Typography variant="body1" color="text.secondary" style={{ whiteSpace: 'pre-line' }}>
              {currentTest.instructions}
            </Typography>
          </Box>
          
          <Box sx={{ mt: 3 }}>
            <InputLabel id="maxReachDer-label">Max Reach Der</InputLabel>
            <Select
              variant="outlined"
              fullWidth
              id="maxReachDer"
              labelId="maxReachDer-label"
              name="maxReachDer"
              value={maxReachDer}
              onChange={handleChangeDer}
              sx={{ mb: 2 }}
            >
              {[...Array(19)].map((_, i) => {
                const value = i % 2 === 0 ? (i / 2) + 1 : (i + 1) / 2;
                return (
                  <MenuItem key={value} value={value}>{value}</MenuItem>
                );
              })}
            </Select>

            <InputLabel id="maxReachIzq-label">Max Reach Izq</InputLabel>
            <Select
              variant="outlined"
              fullWidth
              id="maxReachIzq"
              labelId="maxReachIzq-label"
              name="maxReachIzq"
              value={maxReachIzq}
              onChange={handleChangeIzq}
            >
              {[...Array(19)].map((_, i) => {
                const value = i % 2 === 0 ? (i / 2) + 1 : (i + 1) / 2;
                return (
                  <MenuItem key={value} value={value}>{value}</MenuItem>
                );
              })}
            </Select>
          </Box>
        </>
      );
    } else if (currentTest.id === "doubles") {
      return (
        <>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
            <InfoIcon sx={{ color: 'text.secondary', mr: 1, mt: 0.5 }} />
            <Typography variant="body1" color="text.secondary" style={{ whiteSpace: 'pre-line' }}>
              {currentTest.instructions}
            </Typography>
          </Box>
          
          <Box sx={{ mt: 3 }}>
            <InputLabel id="doubles-label">Dobles</InputLabel>
            <Select
              variant="outlined"
              fullWidth
              id="doubles"
              labelId="doubles-label"
              name="doubles"
              value={doubles}
              onChange={handleChangeDouble}
            >
              {[...Array(19)].map((_, i) => {
                const value = i % 2 === 0 ? (i / 2) + 1 : (i + 1) / 2;
                return (
                  <MenuItem key={value} value={value}>{value}</MenuItem>
                );
              })}
            </Select>
          </Box>
        </>
      );
    } else if (currentTest.id === "159") {
      return (
        <>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
            <InfoIcon sx={{ color: 'text.secondary', mr: 1, mt: 0.5 }} />
            <Typography variant="body1" color="text.secondary" style={{ whiteSpace: 'pre-line' }}>
              {currentTest.instructions}
            </Typography>
          </Box>
          
          <Box sx={{ mt: 3 }}>
            <InputLabel id="cinco-label">Segundo</InputLabel>
            <Select
              variant="outlined"
              fullWidth
              id="cinco"
              labelId="cinco-label"
              name="cinco"
              value={cinco}
              onChange={handleChangeCinco}
              sx={{ mb: 2 }}
            >
              {[...Array(19)].map((_, i) => {
                const value = i % 2 === 0 ? (i / 2) + 1 : (i + 1) / 2;
                return (
                  <MenuItem key={value} value={value}>{value}</MenuItem>
                );
              })}
            </Select>

            <InputLabel id="nueve-label">Tercero</InputLabel>
            <Select
              variant="outlined"
              fullWidth
              id="nueve"
              labelId="nueve-label"
              name="nueve"
              value={nueve}
              onChange={handleChangeNueve}
            >
              {[...Array(19)].map((_, i) => {
                const value = i % 2 === 0 ? (i / 2) + 1 : (i + 1) / 2;
                return (
                  <MenuItem key={value} value={value}>{value}</MenuItem>
                );
              })}
            </Select>
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
            onClick={handleSubmit} 
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
            Test de Campus
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Selecciona una de las siguientes pruebas para evaluar tu rendimiento en el campus y seguir tu progreso.
          </Typography>
        </Paper>
      </Fade>
      
      <Grid container spacing={3}>
        {testDefinitions.map((test) => (
          <TestCard key={test.id} test={test} />
        ))}
      </Grid>
      
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