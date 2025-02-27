import React, { useContext, useEffect, useState } from "react";
import { Global } from "../../../helpers/Global";
import { Avatar, IconButton } from "@mui/material";
import { useAuth } from "../../../hooks/useAuth";
import { SidebarContext } from "../../../context/SidebarContext";
import "./header.css";

export const Header = () => {
  const { auth } = useAuth();
  const { toggleSidebar } = useContext(SidebarContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Slightly increased sizes for avatars
  const avatarSize = 50; // Increased from 45px
  // Slightly larger logo size
  const toggleLogoSize = isMobile ? 45 : 55; // Increased from 50px

  // Check for mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={`header ${isMobile ? 'mobile-header' : ''}`}>
      {/* Only show logo toggle on mobile */}
      {isMobile && (
        <div className="menu-toggle logo-toggle">
          <IconButton 
            onClick={toggleSidebar} 
            className="menu-button"
            aria-label="toggle sidebar"
            sx={{ 
              "&:hover": { backgroundColor: "transparent" },
              padding: 0
            }}
            disableRipple
          >
            <Avatar
              src="../../../../testcalapp.png"
              sx={{ width: toggleLogoSize, height: toggleLogoSize }}
            />
          </IconButton>
        </div>
      )}
      
      {!isMobile && <div className="header-spacer"></div>}
          
      <a href="/social/ajustes" className="user-profile-link">
        <Avatar
          src={Global.url + "user/avatar/" + auth.image}
          className="profile-avatar"
          sx={{ 
            width: isMobile ? 42 : avatarSize, 
            height: isMobile ? 42 : avatarSize,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        />
      </a>
    </header>
  );
};