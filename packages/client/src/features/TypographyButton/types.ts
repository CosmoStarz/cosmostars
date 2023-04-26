import { SvgIconProps } from "@mui/material";
import { ReactElement } from "react";

export type TypographyButtonType = {
  icon: ReactElement<SvgIconProps>;
  title: string;
  onClick?: () => void;
};
