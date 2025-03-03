import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import LinearProgress from "@mui/material/LinearProgress";
import "./ratings.css";

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

// Custom styled progress bar
const BorderLinearProgress = styled(LinearProgress)(({ theme, value }) => ({
  height: 8,
  borderRadius: 5,
  [`&.MuiLinearProgress-colorPrimary`]: {
    backgroundColor: theme.palette.grey[200],
  },
  [`& .MuiLinearProgress-bar`]: {
    borderRadius: 5,
    backgroundColor:
      value < 3
        ? "#f44336"
        : value < 6
        ? "#ff9800"
        : value < 8
        ? "var(--color-principal)"
        : "var(--color-success)",
  },
}));

function Ratings({ results }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Set loading state when results change
    setLoading(true);

    // Short timeout to allow loading animation
    const timer = setTimeout(() => {
      if (results && results.length > 0) {
        setResult(results[0]);
      } else {
        setResult(null);
      }
      setLoading(false);

      // Trigger animation after data is loaded
      setTimeout(() => {
        setAnimate(true);
      }, 100);
    }, 300);

    return () => clearTimeout(timer);
  }, [results]);

  // Rating categories with icons and descriptions
  const ratingCategories = [
    {
      name: "Fuerza de Dedos",
      key: "test1Punt",
      description:
        "Mide la capacidad de los dedos para mantener el agarre en presas pequeñas",
    },
    {
      name: "Fuerza de Tracción",
      key: "test2Punt",
      description:
        "Evalúa la potencia de los músculos de la espalda y brazos para realizar movimientos de tracción",
    },
    {
      name: "Fuerza Abdominal",
      key: "test3Punt",
      description:
        "Mide la resistencia y fuerza del core para mantener posiciones estables",
    },
    {
      name: "Fuerza de Agarre",
      key: "test4Punt",
      description:
        "Evalúa la capacidad de mantener un agarre firme durante periodos prolongados",
    },
  ];
  return (
    <div className="ratings-container">
      <Typography
        variant="h5"
        component="h2"
        className={`ratings-title ${animate ? "animate-in" : ""}`}
        sx={{
          mb: 3,
          fontWeight: 500,
          color: "var(--letra-gris)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <FitnessCenterIcon /> Evaluación de Rendimiento
      </Typography>

      {loading ? (
        <div className="ratings-loading">
          <div className="ratings-skeleton"></div>
          <div className="ratings-skeleton"></div>
          <div className="ratings-skeleton"></div>
          <div className="ratings-skeleton"></div>
        </div>
      ) : (
        <>
          <Grid container spacing={3}>
            {ratingCategories.map((category, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={category.key}
                className={`rating-item ${animate ? "animate-in" : ""}`}
                sx={{ animationDelay: `${index * 100}ms` }}
              >
                <Tooltip title={category.description} arrow placement="top">
                  <Box
                    className="rating-card"
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        transform: "translateY(-3px)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 500,
                          color: "var(--letra-gris)",
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <span className="category-icon">{category.icon}</span>
                        {category.name}
                      </Typography>
                    </Box>

                    <StyledRating
                      name={`rating${category.key}`}
                      value={result ? result[category.key] / 2 : 0}
                      precision={0.5}
                      readOnly
                      size="large"
                      className="rating-stars"
                    />

                    <Box
                      sx={{
                        mt: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ color: "var(--letra-gris)", opacity: 0.7 }}
                      >
                        Puntuación
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "bold",
                          color:
                            result && result[category.key] >= 7
                              ? "var(--color-success)"
                              : result && result[category.key] >= 5
                              ? "var(--color-principal)"
                              : result && result[category.key] >= 3
                              ? "var(--color-secundario)"
                              : "var(--color-alerta)",
                        }}
                      >
                        {result ? result[category.key] : 0}/10
                      </Typography>
                    </Box>
                  </Box>
                </Tooltip>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
}

export default Ratings;
