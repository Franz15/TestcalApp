import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Global } from "../../helpers/Global";
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Button, 
  Box, 
  Container, 
  Paper, 
  Divider,
  CardActionArea,
  CardMedia,
  Fade,
  CircularProgress,
  LinearProgress,
  Tooltip,
  Badge
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./tests.css";
import "../common/buttons.css";

// Definición de los tests disponibles con sus metadatos
const testDefinitions = [
  {
    id: "test9c",
    name: "Test 9c",
    description: "Evaluación de fuerza y resistencia en escalada",
    icon: <EmojiEventsIcon fontSize="large" />,
    color: "var(--color-principal)"
  },
  {
    id: "dedos",
    name: "Dedos",
    description: "Medición de fuerza en dedos para escalada",
    icon: <TouchAppIcon fontSize="large" />,
    color: "var(--color-secundario)"
  },
  {
    id: "campus",
    name: "Campus",
    description: "Entrenamiento de potencia y coordinación",
    icon: <DirectionsRunIcon fontSize="large" />,
    color: "var(--color-principal)"
  },
  {
    id: "pullUp",
    name: "Pull Up",
    description: "Evaluación de fuerza en dominadas",
    icon: <FitnessCenterIcon fontSize="large" />,
    color: "var(--color-secundario)"
  }
];

export function Tests() {
  const token = localStorage.getItem("token");
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  
  // Simular carga de datos
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Componente para cada tarjeta de test
  const TestCard = ({ test }) => (
    <Fade in={!loading} timeout={500 + testDefinitions.indexOf(test) * 150}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
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
            component="a" 
            href={`/social/${test.id}`}
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
            Pruebas Disponibles
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Selecciona una de las siguientes pruebas para evaluar tu rendimiento y seguir tu progreso.
          </Typography>
        </Paper>
      </Fade>
      
      <Grid container spacing={3}>
        {testDefinitions.map((test) => (
          <TestCard key={test.id} test={test} />
        ))}
      </Grid>
    </Container>
  );
}