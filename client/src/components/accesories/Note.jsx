import React from "react";
import Typography from "@mui/material/Typography";

const Note = (props) => {
  return (
    <Typography sx={{pr:3, pl:3}}
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {
        "-TestcalApp 1.0.0- "
      }
      {"Javier Vallinas, TFG DAM ITEP "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Note;
