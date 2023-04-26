import { PaletteMode } from "@mui/material";
import { ThemeOptions } from "@mui/material/styles";

import {
  ThemeBorderRadius,
  ThemeConfig,
  ThemePrimaryButton,
} from "../constants";

export const createThemeOptions = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    primary: ThemePrimaryButton,
    background: {
      default: ThemeConfig[mode].background,
    },
    action: {
      active: ThemeConfig[mode].text,
    },
  },
  typography: {
    fontFamily: "Bubblegum Sans, cursive",
    allVariants: {
      color: ThemeConfig[mode].text,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: ThemeBorderRadius.BUTTON,
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          background: ThemeConfig[mode].paper,
          borderRadius: ThemeBorderRadius.PAPER,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          flexDirection: "row",
        },
      },
    },
  },
});
