import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './transitions.css';

const TransitionWrapper = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    // Skip transition on initial render
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }
    
    // Only trigger transition when location actually changes
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage("fadeOut");
    }
  }, [location, displayLocation, isInitialRender]);

  const handleAnimationEnd = () => {
    if (transitionStage === "fadeOut") {
      setTransitionStage("fadeIn");
      setDisplayLocation(location);
    }
  };

  return (
    <div 
      className={`transition-wrapper ${isInitialRender ? '' : transitionStage}`}
      onAnimationEnd={handleAnimationEnd}
    >
      {children}
    </div>
  );
};

export default TransitionWrapper;