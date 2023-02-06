import { elementCoords } from "../../ui/Canvas/types";
import { Canvas } from "../../ui/Canvas/Canvas";

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
};
