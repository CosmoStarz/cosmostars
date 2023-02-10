import { FC } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { TypographyButtonType } from "./types";

export const TypographyButton: FC<TypographyButtonType> = props => {
  const { icon, title, onClick } = props;

  const handleClick = () => {
    onClick ? onClick() : null;
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}>
      <IconButton
        edge="end"
        aria-label="likes"
        disableRipple
        onClick={handleClick}>
        {icon}
      </IconButton>
      <Typography ml={1} color="GrayText">
        {title}
      </Typography>
    </Box>
  );
};
