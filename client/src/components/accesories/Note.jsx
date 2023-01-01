import React from "react";
import Typography from "@mui/material/Typography";

const Note = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {
        "-TestcalApp 0.0.1- en desarrollo, la maquetación y estilo puede variar drásticamente en la versión final. Las funcionalidades no están completamente desarrolladas todavía."
      }
      {"Javier Vallinas, TFG DAM ITEP "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Note;
