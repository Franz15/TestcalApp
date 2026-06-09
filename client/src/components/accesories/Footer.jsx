import React from "react";
import { Avatar } from "@mui/material";

import "./footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-branding">
          <div className="footer-logo">
            <Avatar
              src="/testcalapp.png"
              sx={{ width: 20, height: 20 }}
            />
          </div>
          <div className="footer-copyright">
            <span className="company-name">TestcalApp</span>
            <span className="version">v1.0.9</span>
            <span className="copyright">&copy; {currentYear}</span>
          </div>
        </div>

        <div className="footer-links">
          <a href="/about" className="footer-link">
            Sobre nosotros
          </a>
          <span className="footer-divider">â€¢</span>
          <a href="/terms" className="footer-link">
            TÃ©rminos
          </a>
          <span className="footer-divider">â€¢</span>
          <a href="/privacy" className="footer-link">
            Privacidad
          </a>
          <span className="footer-divider">â€¢</span>
          <a href="/help" className="footer-link">
            Ayuda
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
