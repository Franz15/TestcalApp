import React, { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { Global } from "../../../helpers/Global";
import { Porcentaje } from "../test9c/ComponentsTest9c";
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
  IconButton
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RepeatIcon from "@mui/icons-material/Repeat";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import "./pullUp.css";
import "../../../components/common/buttons.css";

// Definición de las pruebas disponibles
const testDefinitions = [
  {
    id: "lockOff",
    name: "Bloqueos",
    description: "Mide el tiempo máximo que puedes mantener un bloqueo de 90 grados en una barra de dominadas con un solo brazo.",
    icon: <AccessTimeIcon fontSize="large" />,
    color: "var(--color-principal)",
    dialogTitle: "Test 1: Máximo tiempo bloqueando con cada brazo",
    instructions: `Esta prueba mide el tiempo máximo que puedes mantener un bloqueo de 90 grados en una barra de dominadas con un solo brazo.

Para completar esta prueba, mantén el bloqueo a 90 grados el máximo tiempo posible. NO se recomienda hacer más de 6 series durante un día de prueba. Descansa al menos 5 minutos entre intentos. Registra el tiempo en segundos y envía la información a continuación. Si no eres capaz de aguantar, introduce 0.

Asegúrate de calentar adecuadamente antes de intentar cualquiera de estas pruebas de referencia. Recomendamos que completes solo una prueba al día para capturar tu mejor potencial en los resultados de la prueba.`,
    inputLabelDer: "Brazo Derecho",
    inputLabelIzq: "Brazo Izquierdo",
    inputUnit: "s",
    inputType: "lockOff"
  },
  {
    id: "maxWeight",
    name: "Dominadas lastradas",
    description: "Mide el peso máximo con el que puedes hacer una dominada.",
    icon: <FitnessCenterIcon fontSize="large" />,
    color: "var(--color-secundario)",
    dialogTitle: "Test 2: Dominada con el máximo lastre posible",
    instructions: `Esta prueba mide el peso máximo con el que puedes hacer una dominada.

Para completar esta prueba, haz una dominada con el máximo lastre posible. Descansa al menos 5 minutos entre intentos. Registra el peso en kilos y envía la información a continuación.

Asegúrate de calentar adecuadamente antes de intentar cualquiera de estas pruebas de referencia. Recomendamos que completes solo una prueba al día para capturar tu mejor potencial en los resultados de la prueba.`,
    inputLabelBoth: "Lastre",
    inputLabelDer: "Lastre brazo derecho",
    inputLabelIzq: "Lastre brazo izquierdo",
    inputUnit: "kg",
    inputType: "maxWeight"
  },
  {
    id: "maxNumDom",
    name: "Máximo número de dominadas",
    description: "Mide cuántas dominadas puedes realizar con tu peso corporal.",
    icon: <RepeatIcon fontSize="large" />,
    color: "var(--color-principal)",
    dialogTitle: "Test 3: Máximo número de dominadas",
    instructions: `Esta prueba mide cuántas dominadas puedes realizar con tu peso corporal.

Para completar esta prueba, realiza el máximo número de dominadas posible. Registra el número de repeticiones y envía la información a continuación.

Asegúrate de calentar adecuadamente antes de intentar cualquiera de estas pruebas de referencia. Recomendamos que completes solo una prueba al día para capturar tu mejor potencial en los resultados de la prueba.`,
    inputLabelBoth: "Número de repeticiones",
    inputLabelDer: "Número de repeticiones brazo derecho",
    inputLabelIzq: "Número de repeticiones brazo izquierdo",
    inputUnit: "",
    inputType: "maxNumDom"
  }
];

export function PullUp() {
  const token = localStorage.getItem("token");
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentTest, setCurrentTest] = useState(null);
  const [option, setOption] = useState("");
  const [bloqueoDer, setBloqueoDer] = useState("");
  const [bloqueoIzq, setBloqueoIzq] = useState("");
  const [maxWeight, setMaxWeight] = useState("");
  const [maxWeightDer, setMaxWeightDer] = useState("");
  const [maxWeightIzq, setMaxWeightIzq] = useState("");
  const [maxNumDom, setMaxNumDom] = useState("");
  const [maxNumDomDer, setMaxNumDomDer] = useState("");
  const [maxNumDomIzq, setMaxNumDomIzq] = useState("");
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
    setBloqueoDer("");
    setBloqueoIzq("");
    setMaxWeight("");
    setMaxWeightDer("");
    setMaxWeightIzq("");
    setMaxNumDom("");
    setMaxNumDomDer("");
    setMaxNumDomIzq("");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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

  const handleChangeMaxWeight = (e) => {
    setMaxWeight(e.target.value);
    setOption("maxPesoDom");
  };

  const handleChangeMaxWeightDer = (e) => {
    setMaxWeightDer(e.target.value);
    setOption("maxPesoDom");
  };

  const handleChangeMaxWeightIzq = (e) => {
    setMaxWeightIzq(e.target.value);
    setOption("maxPesoDom");
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
    if (option === "bloqueo") {
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
    } else if (option === "bloqueoDer") {
      form = {
        fecha: new Date(),
        userId: auth._id,
        gradoDeclarado: auth.grado,
        bloqueoDer: bloqueoDer,
        _type: "bloqueoDer",
      };
    } else if (option === "bloqueoIzq") {
      form = {
        fecha: new Date(),
        userId: auth._id,
        gradoDeclarado: auth.grado,
        bloqueoIzq: bloqueoIzq,
        _type: "bloqueoIzq",
      };
    } else if (option === "maxPesoDom") {
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
    } else if (option === "maxNumDom") {
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
        setBloqueoDer("");
        setBloqueoIzq("");
        setMaxWeight("");
        setMaxWeightDer("");
        setMaxWeightIzq("");
        setMaxNumDom("");
        setMaxNumDomDer("");
        setMaxNumDomIzq("");
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

    if (currentTest.id === "lockOff") {
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
              label={currentTest.inputLabelDer}
              type="number"
              value={bloqueoDer}
              onChange={handleChangeLockOffDer}
              InputProps={{
                endAdornment: <InputAdornment position="end">{currentTest.inputUnit}</InputAdornment>,
              }}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              label={currentTest.inputLabelIzq}
              type="number"
              value={bloqueoIzq}
              onChange={handleChangeLockOffIzq}
              InputProps={{
                endAdornment: <InputAdornment position="end">{currentTest.inputUnit}</InputAdornment>,
              }}
              variant="outlined"
              fullWidth
            />
          </Box>
        </>
      );
    } else if (currentTest.id === "maxWeight") {
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
              label={currentTest.inputLabelBoth}
              type="number"
              value={maxWeight}
              onChange={handleChangeMaxWeight}
              InputProps={{
                endAdornment: <InputAdornment position="end">{currentTest.inputUnit}</InputAdornment>,
              }}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              label={currentTest.inputLabelDer}
              type="number"
              value={maxWeightDer}
              onChange={handleChangeMaxWeightDer}
              InputProps={{
                endAdornment: <InputAdornment position="end">{currentTest.inputUnit}</InputAdornment>,
              }}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              label={currentTest.inputLabelIzq}
              type="number"
              value={maxWeightIzq}
              onChange={handleChangeMaxWeightIzq}
              InputProps={{
                endAdornment: <InputAdornment position="end">{currentTest.inputUnit}</InputAdornment>,
              }}
              variant="outlined"
              fullWidth
            />
          </Box>
        </>
      );
    } else if (currentTest.id === "maxNumDom") {
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
              label={currentTest.inputLabelBoth}
              type="number"
              value={maxNumDom}
              onChange={handleChangeMaxNumDom}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              label={currentTest.inputLabelDer}
              type="number"
              value={maxNumDomDer}
              onChange={handleChangeMaxNumDomDer}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              label={currentTest.inputLabelIzq}
              type="number"
              value={maxNumDomIzq}
              onChange={handleChangeMaxNumDomIzq}
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
            Test de Dominadas
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Selecciona una de las siguientes pruebas para evaluar tu fuerza en dominadas y seguir tu progreso.
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