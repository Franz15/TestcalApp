import React from "react";
const Footer = () => {
  return (
    <footer className="footer">
      &copy; {"- TestcalApp 1.0.6 - "}
      {new Date().getFullYear()}
      {"."}
    </footer>
  );
};

export default Footer;
