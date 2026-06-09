import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

// Custom styled Rating component
const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconFilled": {
    color: "var(--color-principal)",
  },
  "& .MuiRating-iconHover": {
    color: "var(--color-secundario)",
  },
  "& .MuiRating-iconEmpty": {
    color: theme.palette.grey[300],
  },
}));

// CSS styles
const styles = {
  ratingsContainer: {
    width: "100%",
    padding: "10px",
  },
  ratingsTitle: {
    marginBottom: 3,
    fontWeight: 500,
    color: "var(--letra-gris)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
  },
  ratingCard: {
    padding: "8px 8px", // Even thinner padding
    borderRadius: 2,
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)", // Lighter shadow
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: "0 2px 6px rgba(0,0,0,0.08)", // Lighter hover shadow
      transform: "translateY(-2px)", // Smaller lift effect
    },
    backgroundColor: "#fff",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  categoryTitle: {
    fontWeight: 500,
    color: "var(--letra-gris)",
    fontSize: "0.9rem", // Smaller font
    marginBottom: 1,
  },
  ratingStars: {
    display: "flex",
    justifyContent: "center",
    margin: "6px 0", // Reduced vertical margin
  },
  scoreContainer: {
    marginTop: 0.5,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scoreLabel: {
    color: "var(--letra-gris)",
    opacity: 0.7,
    fontSize: "0.7rem", // Smaller font for label
  },
  scoreValue: {
    fontWeight: "bold",
    fontSize: "0.8rem", // Smaller font for score
  },
  loadingSkeleton: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "16px",
    width: "100%",
  },
  skeletonItem: {
    height: "90px", // Even shorter height
    background: "#f0f0f0",
    borderRadius: "8px",
    animation: "pulse 1.5s infinite",
  },
};

function Ratings({ results }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set loading state when results change
    setLoading(true);
    
    // Short timeout to allow loading animation
    const timer = setTimeout(() => {
      if (results && results.length > 0) {
        // Make a direct assignment without any transformation
        setResult(results[0]);
        console.log("Setting result data:", results[0]); // Debug log
      } else {
        setResult(null);
      }
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [results]);

  // Rating categories with descriptions
  const ratingCategories = [
    {
      name: "Fuerza de Dedos",
      key: "test1Punt",
      description: "Mide la capacidad de los dedos para mantener el agarre en presas pequeñas"
    },
    {
      name: "Fuerza de Tracción",
      key: "test2Punt",
      description: "Evalúa la potencia de los músculos de la espalda y brazos para realizar movimientos de tracción"
    },
    {
      name: "Fuerza Abdominal",
      key: "test3Punt",
      description: "Mide la resistencia y fuerza del core para mantener posiciones estables"
    },
    {
      name: "Fuerza de Agarre",
      key: "test4Punt",
      description: "Evalúa la capacidad de mantener un agarre firme durante periodos prolongados"
    }
  ];

  // Get color based on score
  const getScoreColor = (score) => {
    if (!score && score !== 0) return 'var(--letra-gris)';
    if (score >= 7) return 'var(--color-success)';
    if (score >= 5) return 'var(--color-principal)';
    if (score >= 3) return 'var(--color-secundario)';
    return 'var(--color-alerta)';
  };

  return (
    <div style={styles.ratingsContainer}>
      <Typography 
        variant="h5" 
        component="h2" 
        sx={styles.ratingsTitle}
      >
        <FitnessCenterIcon /> Evaluación de Rendimiento
      </Typography>

      {loading ? (
        <div style={styles.loadingSkeleton}>
          <div style={styles.skeletonItem}></div>
          <div style={styles.skeletonItem}></div>
          <div style={styles.skeletonItem}></div>
          <div style={styles.skeletonItem}></div>
        </div>
      ) : (
        <Grid container spacing={2}> {/* Reduced spacing between cards */}
          {ratingCategories.map((category) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={3} 
              key={category.key}
            >
              <Tooltip title={category.description} arrow placement="top">
                <Box sx={styles.ratingCard}>
                  <Typography 
                    variant="body2" 
                    sx={styles.categoryTitle}
                  >
                    {category.name}
                  </Typography>
                  
                  <StyledRating
                    name={`rating${category.key}`}
                    value={result ? (result[category.key] / 2) : 0}
                    precision={0.5}
                    readOnly
                    size="medium" 
                    sx={styles.ratingStars}
                  />
                  
                  <Box sx={styles.scoreContainer}>
                    <Typography variant="caption" sx={styles.scoreLabel}>
                      Puntuación
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        ...styles.scoreValue,
                        color: getScoreColor(result ? result[category.key] : null)
                      }}
                    >
                      {result ? (
                        <>
                          {console.log(`Score for ${category.name}:`, result[category.key])}
                          {result[category.key]}
                        </>
                      ) : 0}/10
                    </Typography>
                  </Box>
                </Box>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default Ratings;