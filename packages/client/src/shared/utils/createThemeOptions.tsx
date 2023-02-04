import { PaletteMode } from "@mui/material";
import { ThemeOptions } from "@mui/material/styles";
import { ThemeNames } from "../constants";

export const createThemeOptions = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      light: "#ba68c8",
      main: "#9c27b0",
      dark: "#7b1fa2",
      contrastText: "white",
    },
    background: {
      default: mode === ThemeNames.DARK ? "#000" : "#fff",
    },
  },
  typography: {
    fontFamily: "Bubblegum Sans, cursive",
    allVariants: {
      color: mode === ThemeNames.DARK ? "#fff" : "#000",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "32px",
        },
      },
    },
  },
});
