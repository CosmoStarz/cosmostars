import { Box } from "@mui/material";
import { FC } from "react";

import { GameModalImageProps } from "@/shared/constants";

import { GameModalImageTypes } from "./types";

export const GameModalImage: FC<GameModalImageTypes> = props => {
  const { type, image } = props;
  const imageConfig = GameModalImageProps[type];

  return (
    <Box
      sx={{
        background: `no-repeat center/contain url(${image})`,
        position: "absolute",
        width: "250px",
        height: "250px",
        ...imageConfig,
      }}
    />
  );
};
