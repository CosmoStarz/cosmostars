import { FC, PropsWithChildren, useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import { ThemeNames } from "../constants";
import BackgroundDark from "../../assets/images/bg-dark.png";
import BackgroundLight from "../../assets/images/bg-light.jpg";

export const BasicLayout: FC<PropsWithChildren> = props => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const background = useMemo(() => {
    return mode === ThemeNames.DARK ? BackgroundDark : BackgroundLight;
  }, [mode]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        backgroundImage: `url(${background})`,
        backgroundRepeat: "repeat",
      }}>
      {props.children}
    </Box>
  );
};
