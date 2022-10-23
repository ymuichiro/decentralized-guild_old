import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from "@mui/material/styles";
import CssBaseLine from "@mui/material/CssBaseline";
import { theme } from "./styles/theme";
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseLine>
        <App />
      </CssBaseLine>
    </ThemeProvider>
  </React.StrictMode>
)
