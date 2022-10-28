import React from 'react'
import ReactDOM from 'react-dom/client'

import { ThemeProvider } from "@mui/material/styles";
import CssBaseLine from "@mui/material/CssBaseline";

import { RecoilRoot } from 'recoil';

import { theme } from "./styles/theme";
import Root from './Root'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseLine>
        <RecoilRoot>
          <Root />
        </RecoilRoot>
      </CssBaseLine>
    </ThemeProvider>
  </React.StrictMode>
)
