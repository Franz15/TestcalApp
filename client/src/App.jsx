import { Routing } from "./router/Routing";
import AppThemeProvider from "./assets/theme/Theme";
import './theme.css';
import "bootstrap/dist/css/bootstrap.min.css";

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
