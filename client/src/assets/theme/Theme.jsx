import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(232, 191, 86)",
    },
    secondary: {
      main: "rgb(86, 127, 231)",
    },
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        standardSuccess: {
          backgroundColor: 'var(--color-success)',
          color: 'white'
        },
        standardError: {
          backgroundColor: 'var(--color-alerta)',
          color: '#9b0202',
          justifyContent:'center'
        },
        standardWarning: {
          backgroundColor: 'orange',
          color: 'white'
        },
        standardInfo: {
          backgroundColor: 'grey',
          color: 'black'
        }
      }
    },
    
  },
});

export default function AppThemeProvider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
