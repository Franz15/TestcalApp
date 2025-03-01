import React, { useState, useEffect, useMemo } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import getLastResult from "../../hooks/test9c/getLastResult";
import getAvgResult from "../../hooks/test9c/getAvgResult";
import { useAuth } from "../../hooks/useAuth";
import "./radarChart.css";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export function RadarChart({ results }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [latestResult, setLatestResult] = useState(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  let avgResult = getAvgResult();
  const { auth } = useAuth();

  // Detect mobile devices
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Set the latest result when results change
  useEffect(() => {
    if (results && results.length > 0) {
      setLatestResult(results[0]);
    }
  }, [results]);

  // Initialize average values
  let test1avg = 0;
  let test2avg = 0;
  let test3avg = 0;
  let test4avg = 0;

  // Set average values if available
  if (avgResult !== 0 && avgResult.length > 0) {
    test1avg = Number(avgResult[0].test1avg).toFixed(2);
    test2avg = Number(avgResult[0].test2avg).toFixed(2);
    test3avg = Number(avgResult[0].test3avg).toFixed(2);
    test4avg = Number(avgResult[0].test4avg).toFixed(2);
  }

  // Get user values and format to 2 decimal places
  const userValues = latestResult ? [
    latestResult.test1Punt ? Number(latestResult.test1Punt).toFixed(2) : 0,
    latestResult.test2Punt ? Number(latestResult.test2Punt).toFixed(2) : 0,
    latestResult.test3Punt ? Number(latestResult.test3Punt).toFixed(2) : 0,
    latestResult.test4Punt ? Number(latestResult.test4Punt).toFixed(2) : 0,
  ] : [0, 0, 0, 0];

  // Calculate the maximum value for dynamic scaling
  const allValues = [...userValues, test1avg, test2avg, test3avg, test4avg].map(val => parseFloat(val));
  const maxValue = useMemo(() => {
    return Math.max(...allValues) * 1.2; // Add 20% buffer for better visualization
  }, [allValues]);
  
  // Determine appropriate step size based on maxValue
  const getStepSize = () => {
    if (maxValue <= 5) return 1;
    if (maxValue <= 10) return 2;
    if (maxValue <= 20) return 4;
    return Math.ceil(maxValue / 5);
  };

  // Chart options with enhanced responsive settings and dynamic scale
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeOutQuart',
      onComplete: () => setAnimationComplete(true)
    },
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(150, 150, 150, 0.3)',
          lineWidth: 1
        },
        grid: {
          color: 'rgba(150, 150, 150, 0.2)',
        },
        suggestedMin: 0,
        suggestedMax: maxValue,
        ticks: {
          stepSize: getStepSize(),
          backdropColor: 'rgba(0, 0, 0, 0)',
          font: {
            size: isMobile ? 8 : 10
          },
          callback: function(value) {
            return Number(value).toFixed(1);
          }
        },
        pointLabels: {
          font: {
            size: isMobile ? 9 : 12,
            weight: 'bold'
          },
          color: 'rgba(50, 50, 50, 0.9)'
        }
      }
    },
    plugins: {
      legend: {
        position: isMobile ? "bottom" : "top",
        align: "center",
        labels: {
          boxWidth: isMobile ? 8 : 12,
          padding: isMobile ? 10 : 15,
          font: {
            size: isMobile ? 9 : 11
          },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#333',
        bodyColor: '#666',
        borderColor: 'rgba(200, 200, 200, 0.5)',
        borderWidth: 1,
        displayColors: true,
        padding: 10,
        titleFont: {
          size: isMobile ? 10 : 12,
          weight: 'bold'
        },
        bodyFont: {
          size: isMobile ? 9 : 11
        },
        callbacks: {
          title: function(tooltipItems) {
            return tooltipItems[0].label;
          },
          label: function(context) {
            return `${context.dataset.label}: ${parseFloat(context.raw).toFixed(2)}`;
          }
        }
      }
    }
  };

  // Enhanced data with improved colors and presentation
  const data = {
    labels: [
      "Fuerza de Dedos",
      "Fuerza de Tracción",
      "Fuerza Abdominal",
      "Fuerza de Agarre",
    ],
    datasets: [
      {
        label: `Media de ${auth.grado}`,
        data: [test1avg, test2avg, test3avg, test4avg],
        backgroundColor: "rgba(53, 162, 235, 0.3)",
        borderColor: "rgba(53, 162, 235, 0.8)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(53, 162, 235, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(53, 162, 235, 1)",
        pointRadius: isMobile ? 2 : 3,
        pointHoverRadius: isMobile ? 4 : 5,
      },
      {
        label: auth.nombre || "Mi perfil",
        data: userValues,
        backgroundColor: "rgba(75, 192, 92, 0.3)",
        borderColor: "rgba(75, 192, 92, 0.8)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(75, 192, 92, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(75, 192, 92, 1)",
        pointRadius: isMobile ? 3 : 4,
        pointHoverRadius: isMobile ? 5 : 6,
      },
    ],
  };
  
  // Add performance indicators
  const getPerformanceText = () => {
    if (!latestResult) return "";
    
    const userAvg = userValues.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / userValues.length;
    const avgStandard = [test1avg, test2avg, test3avg, test4avg].reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / 4;
    
    if (userAvg >= avgStandard * 1.2) {
      return "¡Excelente! Tu rendimiento está por encima de la media.";
    } else if (userAvg >= avgStandard * 0.9) {
      return "Buen trabajo. Tu rendimiento está al nivel de la media.";
    } else {
      return "Sigue entrenando para alcanzar la media de tu grado.";
    }
  };

  // Render chart with enhanced container and optional performance text
  return (
    <div className="radar-chart-wrapper">
      <div className="radar-chart-title">
        Comparación de Rendimiento
      </div>
      <div className="radar-chart-container">
        <Radar data={data} options={options} />
      </div>
      {animationComplete && latestResult && (
        <div className="radar-chart-insights">
          {getPerformanceText()}
        </div>
      )}
    </div>
  );
}
