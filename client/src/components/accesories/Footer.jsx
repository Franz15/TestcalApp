import React from "react";
const Footer = () => {
  return (
    <footer className="footer">
      &copy; {"-TestcalApp 1.0.1- "}
      {"Javier Vallinas, TFG DAM ITEP "}
      {new Date().getFullYear()}
      {"."}
    </footer>
  );
};

export default Footer;