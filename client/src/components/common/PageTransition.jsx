import React, { useState, useEffect, useRef } from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import '../layout/private/animations.css';

/**
 * PageTransition - A reusable component for consistent page transitions
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The page content
 * @param {boolean} props.loading - Whether data is currently loading
 * @param {string} props.transitionType - Type of transition animation (default, slideUp, scaleIn)
 */
const PageTransition = ({ 
  children, 
  loading = false, 
  transitionType = 'default' 
}) => {
  const [contentVisible, setContentVisible] = useState(false);
  const initialRender = useRef(true);
  
  useEffect(() => {
    // Skip animation on initial render if not loading
    if (initialRender.current && !loading) {
      initialRender.current = false;
      setContentVisible(true);
      return;
    }
    
    // When loading completes, show content with animation
    if (!loading) {
      const timer = setTimeout(() => {
        setContentVisible(true);
      }, 50);
      
      return () => clearTimeout(timer);
    } else {
      setContentVisible(false);
    }
  }, [loading]);
  
  // Different animation classes based on transition type
  const getAnimationClass = () => {
    switch (transitionType) {
      case 'slideUp':
        return 'page-slide-up';
      case 'scaleIn':
        return 'page-scale-in';
      default:
        return 'page-fade-in';
    }
  };
  
  // Show loading spinner when content is loading
  if (loading) {
    return (
      <div className="page-loading">
        <CircularProgress size={40} thickness={4} />
      </div>
    );
  }
  
  // Render content with animation
  return (
    <div className={`page-content ${contentVisible ? 'visible' : ''} ${getAnimationClass()}`}>
      {children}
    </div>
  );
};

export default PageTransition;