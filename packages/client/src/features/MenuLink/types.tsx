import { ReactElement } from "react";
import { SvgIconProps } from "@mui/material";

export type MenuLinkType = {
  title?: string;
  icon?: ReactElement<SvgIconProps>;
  path?: string;
};

export type LinkComponentType = {
  link: MenuLinkType;
};
