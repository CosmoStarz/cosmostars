import { Box, useTheme } from "@mui/material";
import { FC, PropsWithChildren, useMemo } from "react";

import BackgroundDark from "@/assets/images/bg-dark.png";
import BackgroundLight from "@/assets/images/bg-light.png";
import { AdditionalMenu } from "@/widgets/AdditionalMenu/AdditionalMenu";
import { Notification } from "@/widgets/Notification";

import { ThemeNames } from "../constants";

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
        background: `url(${background}) repeat`,
        backgroundSize: "contain",
      }}>
      <AdditionalMenu />
      {props.children}
      <Notification />
    </Box>
  );
};
