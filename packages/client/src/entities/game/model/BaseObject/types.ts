import { BaseGameColors } from "@/shared/constants";

import { Canvas } from "../../ui/Canvas/Canvas";
import { elementCoords } from "../../ui/Canvas/types";

export type basicVelocity = {
  dx: number;
  dy: number;
};

export type basicSize = {
  width: number;
  height: number;
};

export type baseObjectProps = {
  scene: Canvas;
  velocity?: basicVelocity;
  position?: elementCoords;
  size?: basicSize;
  color?: BaseGameColors;
  src?: string;
};
