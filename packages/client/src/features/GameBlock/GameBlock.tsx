import { Box } from "@mui/material";
import { FC } from "react";

import {
  BaseGameColors,
  gameBorderWidth,
  ThemeBorderRadius,
} from "@/shared/constants";

import { GameBlockType } from "./types";

export const GameBlock: FC<GameBlockType> = ({ children, position }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 8,
        [position]: 8,
        backgroundColor: BaseGameColors.BLACK,
        color: BaseGameColors.WHITE,
        border: `${gameBorderWidth}px solid ${BaseGameColors.WHITE}`,
        borderRadius: ThemeBorderRadius.BUTTON,
      }}>
      {children}
    </Box>
  );
};
