import React from "react";

function Switcher() {
  const handleClick = () => {
    setThemeType(themeType === "light" ? "dark" : "light");
  };

  return (
    <Button variant="contained" onClick={handleClick}>
      {themeType === "light" ? "Modo oscuro" : "Modo claro"}
    </Button>
  );
}

export default Switcher;
