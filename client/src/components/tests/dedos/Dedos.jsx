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
import { Porcentaje } from "../test9c/ComponentsTest9c";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import StraightenIcon from "@mui/icons-material/Straighten";
import RepeatIcon from "@mui/icons-material/Repeat";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import "./dedos.css";
import "../../../components/common/buttons.css";

// Definición de las pruebas disponibles
const testDefinitions = [
  {
    id: "max20mm",
    name: "Peso máximo 20mm",
    description: "Mide la cantidad máxima de peso adicional que puedes sostener en un borde de 20 mm durante 10 segundos.",
    icon: <FitnessCenterIcon fontSize="large" />,
    color: "var(--color-principal)",
    dialogTitle: "Test 1: Peso máximo en 20mm",
    instructions: `Esta prueba mide la cantidad máxima de peso adicional que puedes sostener en un borde de 20 mm. Serás evaluado por el peso total añadido sostenido durante 10 segundos.

Para completar esta prueba, cuelga de un borde de 20 mm con la mayor cantidad de peso adicional posible durante 10 segundos. Se recomienda agregar pequeñas cantidades de peso hasta alcanzar tu máximo. NO se recomienda hacer más de 6 series durante un día de prueba. Descansa al menos 5 minutos entre intentos.

Asegúrate de calentar adecuadamente antes de intentar cualquiera de estas pruebas de referencia. Recomendamos que completes solo una prueba al día para capturar tu mejor potencial en los resultados de la prueba.`,
    inputLabel: "Peso adicional",
    inputUnit: "kg",
    inputType: "max20mm"
  },
  {
    id: "minEdge",
    name: "Regleta mínima",
    description: "Mide tu máxima fuerza de agarre en regletas pequeñas, colgándote de la regleta más pequeña posible durante 10 segundos.",
    icon: <StraightenIcon fontSize="large" />,
    color: "var(--color-secundario)",
    dialogTitle: "Test 2: Regleta mínima",
    instructions: `Esta prueba mide tu máxima fuerza de agarre en regletas pequeñas. Para completar esta prueba, cuelga de la regleta más pequeña posible durante 10 segundos (sin peso adicional).

Comienza en una regleta en la que puedas colgarte cómodamente y progresa hacia regletas cada vez más pequeñas. Recomendamos no hacer más de 6 series por día, descansando al menos 5 minutos entre intentos. Registra la regleta más pequeña de la cual puedes colgarte.

Asegúrate de calentar adecuadamente antes de intentar cualquiera de estas pruebas de referencia. Recomendamos que completes solo una prueba al día para capturar tu mejor potencial en los resultados de la prueba.`,
    inputLabel: "Tamaño de regleta",
    inputUnit: "mm",
    inputType: "minEdge"
  },
  {
    id: "series",
    name: "Series",
    description: "Registra tus series de entrenamiento de dedos para seguir tu progreso a lo largo del tiempo.",
    icon: <RepeatIcon fontSize="large" />,
    color: "var(--color-principal)",
    dialogTitle: "Test 3: Series de entrenamiento",
    instructions: `Esta función te permite registrar tus series de entrenamiento de dedos para seguir tu progreso a lo largo del tiempo.

Próximamente disponible.`,
    inputLabel: "",
    inputUnit: "",
    inputType: "series"
  }
];

export function Dedos() {
  const token = localStorage.getItem("token");
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentTest, setCurrentTest] = useState(null);
  const [inputValue, setInputValue] = useState("");
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
    setInputValue("");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!inputValue || inputValue <= 0) {
      setSnackbar({
        open: true,
        message: "Por favor, introduce un valor válido",
        severity: "error"
      });
      return;
    }

    let form;
    
    // Recoger datos del formulario según el tipo de test
    if (currentTest.inputType === "max20mm") {
      form = {
        fecha: new Date(),
        userId: auth._id,
        gradoDeclarado: auth.grado,
        max20mmPeso: inputValue,
        max20mmPorcent: Porcentaje(inputValue, auth.peso), 
        pesoCorp: auth.peso,
        _type: "max20mm",
      };
    } else if (currentTest.inputType === "minEdge") {
      form = {
        fecha: new Date(),
        userId: auth._id,
        gradoDeclarado: auth.grado,
        minEdge: inputValue,
        _type: "minEdge",
      };
    } else {
      // Para futuras implementaciones
      setSnackbar({
        open: true,
        message: "Esta función estará disponible próximamente",
        severity: "info"
      });
      handleCloseDialog();
      return;
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
        setSnackbar({
          open: true,
          message: "Resultado guardado correctamente",
          severity: "success"
        });
        handleCloseDialog();
        setInputValue("");
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

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
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
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
            <InfoIcon sx={{ color: 'text.secondary', mr: 1, mt: 0.5 }} />
            <Typography variant="body1" color="text.secondary" style={{ whiteSpace: 'pre-line' }}>
              {currentTest.instructions}
            </Typography>
          </Box>
          
          {currentTest.inputType !== "series" && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <TextField
                label={currentTest.inputLabel}
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: <InputAdornment position="end">{currentTest.inputUnit}</InputAdornment>,
                }}
                variant="outlined"
                autoFocus
                sx={{ minWidth: 200 }}
              />
            </Box>
          )}
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
            Test de Dedos
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Selecciona una de las siguientes pruebas para evaluar la fuerza de tus dedos y seguir tu progreso.
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
