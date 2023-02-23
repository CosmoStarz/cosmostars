import { SvgIconProps } from "@mui/material";
import { ReactElement } from "react";

export type MenuLinkType = {
  title?: string;
  icon?: ReactElement<SvgIconProps>;
  path?: string;
};

export type LinkComponentType = {
  link: MenuLinkType;
};
