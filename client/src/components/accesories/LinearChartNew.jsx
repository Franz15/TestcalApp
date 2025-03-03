import React, { useEffect, useState, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Skeleton from "@mui/material/Skeleton";
import TimelineIcon from "@mui/icons-material/Timeline";
import "./linearChartNew.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function LinearChart({ results }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [chartType, setChartType] = useState("progress"); // progress or score
  const [timeRange, setTimeRange] = useState("all"); // all, 6m, 3m, 1m
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);
  const [displayData, setDisplayData] = useState([]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Process results data
  useEffect(() => {
    setLoading(true);

    if (results && results.length > 0) {
      // Apply time range filter
      let filteredResults = [...results].reverse(); // Most recent first

      const now = moment();
      if (timeRange === "6m") {
        filteredResults = filteredResults.filter((item) =>
          moment(item.fecha).isAfter(now.clone().subtract(6, "months"))
        );
      } else if (timeRange === "3m") {
        filteredResults = filteredResults.filter((item) =>
          moment(item.fecha).isAfter(now.clone().subtract(3, "months"))
        );
      } else if (timeRange === "1m") {
        filteredResults = filteredResults.filter((item) =>
          moment(item.fecha).isAfter(now.clone().subtract(1, "months"))
        );
      }

      setDisplayData(filteredResults);
    } else {
      setDisplayData([]);
    }

    // Short timeout to allow for animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [results, timeRange]);

  // Handle chart type change
  const handleChartTypeChange = (event, newType) => {
    if (newType !== null) {
      setChartType(newType);
    }
  };

  // Handle time range change
  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  // If no data or loading, show skeleton
  if (loading) {
    return (
      <div className="linear-chart-wrapper">
        <Box
          className="linear-chart-controls"
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <ToggleButtonGroup
            value={chartType}
            exclusive
            onChange={handleChartTypeChange}
            aria-label="chart type"
            size="small"
            sx={{ mb: { xs: 1, sm: 0 } }}
          >
            <ToggleButton value="progress" aria-label="progress data">
              Progreso
            </ToggleButton>
            <ToggleButton value="score" aria-label="score data">
              Puntuación
            </ToggleButton>
          </ToggleButtonGroup>

          <FormControl size="small" sx={{ minWidth: 110 }}>
            <InputLabel id="time-range-select-label">Periodo</InputLabel>
            <Select
              labelId="time-range-select-label"
              id="time-range-select"
              value={timeRange}
              label="Periodo"
              onChange={handleTimeRangeChange}
              sx={{ "& .MuiSelect-select": { py: 0.75 } }}
            >
              <MenuItem value="all">Todo</MenuItem>
              <MenuItem value="6m">6 meses</MenuItem>
              <MenuItem value="3m">3 meses</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <div className="linear-chart-container">
          <Box sx={{ width: "100%", height: "100%", p: 2 }}>
            <Skeleton variant="rectangular" width="100%" height="80%" />
          </Box>
        </div>
      </div>
    );
  }

  if (displayData.length === 0) {
    return (
      <div className="linear-chart-wrapper">
        <Box
          className="linear-chart-controls"
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <ToggleButtonGroup
            value={chartType}
            exclusive
            onChange={handleChartTypeChange}
            aria-label="chart type"
            size="small"
            sx={{ mb: { xs: 1, sm: 0 } }}
          >
            <ToggleButton value="progress" aria-label="progress data">
              Progreso
            </ToggleButton>
            <ToggleButton value="score" aria-label="score data">
              Puntuación
            </ToggleButton>
          </ToggleButtonGroup>

          <FormControl size="small" sx={{ minWidth: 110 }}>
            <InputLabel id="time-range-select-label">Periodo</InputLabel>
            <Select
              labelId="time-range-select-label"
              id="time-range-select"
              value={timeRange}
              label="Periodo"
              onChange={handleTimeRangeChange}
              sx={{ "& .MuiSelect-select": { py: 0.75 } }}
            >
              <MenuItem value="all">Todo</MenuItem>
              <MenuItem value="6m">6 meses</MenuItem>
              <MenuItem value="3m">3 meses</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <div className="linear-chart-container">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "var(--letra-gris)",
            }}
          >
            <TimelineIcon sx={{ fontSize: 60, opacity: 0.5, mb: 2 }} />
            <Typography variant="h6">No hay datos disponibles</Typography>
            <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
              Añade resultados para ver tu progreso
            </Typography>
          </Box>
        </div>
      </div>
    );
  }

  // Prepare data
  const labels = displayData.map((item) =>
    moment(item.fecha).format(isMobile ? "DD/MM" : "DD-MM-YYYY")
  );

  // Define chart colors with better contrast and accessibility
  const chartColors = {
    fingerStrength: {
      border: "rgb(220, 53, 69)",
      background: "rgba(220, 53, 69, 0.1)",
      point: "rgba(220, 53, 69, 0.8)",
    },
    pullStrength: {
      border: "rgb(0, 123, 255)",
      background: "rgba(0, 123, 255, 0.1)",
      point: "rgba(0, 123, 255, 0.8)",
    },
    coreStrength: {
      border: "rgb(40, 167, 69)",
      background: "rgba(40, 167, 69, 0.1)",
      point: "rgba(40, 167, 69, 0.8)",
    },
    gripStrength: {
      border: "rgb(111, 66, 193)",
      background: "rgba(111, 66, 193, 0.1)",
      point: "rgba(111, 66, 193, 0.8)",
    },
  };

  // Chart options with proper responsive settings
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
    plugins: {
      legend: {
        position: "top",
        align: "center",
        labels: {
          boxWidth: isMobile ? 10 : 12,
          usePointStyle: true,
          pointStyle: "circle",
          padding: isMobile ? 8 : 15,
          font: {
            size: isMobile ? 9 : 11,
            family: "'Roboto', sans-serif",
          },
        },
      },
      title: {
        display: true,
        text:
          chartType === "progress"
            ? "Progreso de Fuerza"
            : "Puntuación de Tests",
        font: {
          size: isMobile ? 14 : 16,
          family: "'Roboto', sans-serif",
          weight: "bold",
        },
        padding: { bottom: 15 },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleFont: {
          size: isMobile ? 10 : 12,
          family: "'Roboto', sans-serif",
        },
        bodyFont: {
          size: isMobile ? 9 : 11,
          family: "'Roboto', sans-serif",
        },
        padding: 10,
        cornerRadius: 4,
        displayColors: true,
        callbacks: {
          title: function (tooltipItems) {
            return moment(displayData[tooltipItems[0].dataIndex].fecha).format(
              "DD MMMM YYYY"
            );
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: isMobile ? 8 : 10,
            family: "'Roboto', sans-serif",
          },
          maxRotation: isMobile ? 45 : 0,
          color: "rgba(0, 0, 0, 0.6)",
        },
        grid: {
          display: !isMobile,
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      y: {
        ticks: {
          font: {
            size: isMobile ? 8 : 10,
            family: "'Roboto', sans-serif",
          },
          color: "rgba(0, 0, 0, 0.6)",
        },
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)",
        },
        title: {
          display: true,
          text:
            chartType === "progress"
              ? "Valor (kg / segundos)"
              : "Puntuación (0-10)",
          font: {
            size: isMobile ? 8 : 10,
            family: "'Roboto', sans-serif",
          },
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    elements: {
      line: {
        tension: 0.3, // Smoother curves
      },
      point: {
        radius: isMobile ? 2 : 3,
        hoverRadius: isMobile ? 4 : 6,
      },
    },
  };

  // Chart data based on selected chart type
  const data = {
    labels,
    datasets:
      chartType === "progress"
        ? [
            {
              data: displayData.map((item) => item.test1Peso),
              label: "Fuerza de Dedos",
              borderColor: chartColors.fingerStrength.border,
              backgroundColor: chartColors.fingerStrength.background,
              pointBackgroundColor: chartColors.fingerStrength.point,
              fill: true,
              pointRadius: isMobile ? 2 : 3,
              borderWidth: isMobile ? 1.5 : 2,
            },
            {
              data: displayData.map((item) => item.test2Peso),
              label: "Fuerza de Tracción",
              borderColor: chartColors.pullStrength.border,
              backgroundColor: chartColors.pullStrength.background,
              pointBackgroundColor: chartColors.pullStrength.point,
              fill: true,
              pointRadius: isMobile ? 2 : 3,
              borderWidth: isMobile ? 1.5 : 2,
            },
            {
              data: displayData.map((item) => item.test3Tiempo),
              label: "Fuerza Abdominal",
              borderColor: chartColors.coreStrength.border,
              backgroundColor: chartColors.coreStrength.background,
              pointBackgroundColor: chartColors.coreStrength.point,
              fill: true,
              pointRadius: isMobile ? 2 : 3,
              borderWidth: isMobile ? 1.5 : 2,
            },
            {
              data: displayData.map((item) => item.test4Tiempo),
              label: "Fuerza de Agarre",
              borderColor: chartColors.gripStrength.border,
              backgroundColor: chartColors.gripStrength.background,
              pointBackgroundColor: chartColors.gripStrength.point,
              fill: true,
              pointRadius: isMobile ? 2 : 3,
              borderWidth: isMobile ? 1.5 : 2,
            },
          ]
        : [
            {
              data: displayData.map((item) => item.test1Punt),
              label: "Fuerza de Dedos",
              borderColor: chartColors.fingerStrength.border,
              backgroundColor: chartColors.fingerStrength.background,
              pointBackgroundColor: chartColors.fingerStrength.point,
              fill: true,
              pointRadius: isMobile ? 2 : 3,
              borderWidth: isMobile ? 1.5 : 2,
            },
            {
              data: displayData.map((item) => item.test2Punt),
              label: "Fuerza de Tracción",
              borderColor: chartColors.pullStrength.border,
              backgroundColor: chartColors.pullStrength.background,
              pointBackgroundColor: chartColors.pullStrength.point,
              fill: true,
              pointRadius: isMobile ? 2 : 3,
              borderWidth: isMobile ? 1.5 : 2,
            },
            {
              data: displayData.map((item) => item.test3Punt),
              label: "Fuerza Abdominal",
              borderColor: chartColors.coreStrength.border,
              backgroundColor: chartColors.coreStrength.background,
              pointBackgroundColor: chartColors.coreStrength.point,
              fill: true,
              pointRadius: isMobile ? 2 : 3,
              borderWidth: isMobile ? 1.5 : 2,
            },
            {
              data: displayData.map((item) => item.test4Punt),
              label: "Fuerza de Agarre",
              borderColor: chartColors.gripStrength.border,
              backgroundColor: chartColors.gripStrength.background,
              pointBackgroundColor: chartColors.gripStrength.point,
              fill: true,
              pointRadius: isMobile ? 2 : 3,
              borderWidth: isMobile ? 1.5 : 2,
            },
          ],
  };

  // Render chart with controls and better container
  return (
    <div className="linear-chart-wrapper">
      <Box
        className="linear-chart-controls"
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <ToggleButtonGroup
          value={chartType}
          exclusive
          onChange={handleChartTypeChange}
          aria-label="chart type"
          size="small"
          sx={{ mb: { xs: 1, sm: 0 } }}
        >
          <ToggleButton
            value="progress"
            aria-label="progress data"
            sx={{ px: 1.5, py: 0.5 }}
          >
            Progreso
          </ToggleButton>
          <ToggleButton
            value="score"
            aria-label="score data"
            sx={{ px: 1.5, py: 0.5 }}
          >
            Puntuación
          </ToggleButton>
        </ToggleButtonGroup>

        <FormControl size="small" sx={{ minWidth: 110 }}>
          <InputLabel id="time-range-select-label">Periodo</InputLabel>
          <Select
            labelId="time-range-select-label"
            id="time-range-select"
            value={timeRange}
            label="Periodo"
            onChange={handleTimeRangeChange}
            sx={{ "& .MuiSelect-select": { py: 0.75 } }}
          >
            <MenuItem value="all">Todo</MenuItem>
            <MenuItem value="6m">6 meses</MenuItem>
            <MenuItem value="3m">3 meses</MenuItem>
            <MenuItem value="1m">1 mes</MenuItem>
            <MenuItem value=" "> </MenuItem>
          </Select>
        </FormControl>
      </Box>

      <div className="linear-chart-container">
        <Line ref={chartRef} options={options} data={data} />
      </div>
    </div>
  );
}
