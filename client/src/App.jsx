import { Routing } from "./router/Routing";
import AppThemeProvider from "./assets/theme/Theme";
import "./theme.css";

function App() {
  return (
    <div className="layout">
      <AppThemeProvider>
        <Routing />
      </AppThemeProvider>
    </div>
  );
}

export default App;
