import { useMemo, useState } from "react";
import { createTheme } from "@mui/material";
import { createThemeOptions } from "../utils/createThemeOptions";
import { ThemeNames } from "../constants";

export const useBasicTheme = () => {
  const [mode, setMode] = useState<ThemeNames.LIGHT | ThemeNames.DARK>(
    ThemeNames.DARK
  );
  const options = createThemeOptions(mode);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode =>
          prevMode === ThemeNames.LIGHT ? ThemeNames.DARK : ThemeNames.LIGHT
        );
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(options), [mode]);

  return [theme, colorMode] as const;
};
