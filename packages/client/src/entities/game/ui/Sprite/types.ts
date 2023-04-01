import { basicSize } from "../../model/BaseObject/types";
import { Canvas } from "../Canvas/Canvas";
import { elementCoords } from "../Canvas/types";
import { SpriteConstants } from "./SpriteConfig";

export type SpriteType = {
  canvas: Canvas;
  objectSize: basicSize;
  spriteType: SpriteConstants;
  objectPosition: elementCoords;
};

export type SpriteConfigType = {
  src: string;
  frames?: number;
  ratio?: number;
};
