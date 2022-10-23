import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#B32AF9",
      light: "#EA65FF",
      dark: "#7D00C5",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#2100EA",
      light: "#7440FF",
      dark: "#0000B6",
      contrastText: "#FFF",
    },
    background: {
      default: "#000",
      paper: "#000",
    }
  },
});