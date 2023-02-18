import { createContext, FC, useContext } from "react";
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ThemeNames } from "@/shared/constants";

export const ColorModeContext = createContext({
  // eslint-disable-next-line
  toggleColorMode: () => {},
});

export const ThemeToggler: FC = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <IconButton
      aria-label="brightness4icon"
      size="small"
      sx={{
        mx: 2,
      }}
      onClick={colorMode.toggleColorMode}>
      {theme.palette.mode === ThemeNames.DARK ? (
        <Brightness7Icon fontSize="small" />
      ) : (
        <Brightness4Icon fontSize="small" />
      )}
    </IconButton>
  );
};
