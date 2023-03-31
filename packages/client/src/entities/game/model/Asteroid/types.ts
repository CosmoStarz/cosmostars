import { SpinTypes } from "../../ui/Sprite/SpriteConfig";
import { baseObjectProps } from "../BaseObject/types";

export enum AsteroidAngles {
  RIGHT = 1,
  LEFT = 2,
}

export enum RotateAngles {
  CLOCKWISE = 1,
  COUNTER_CLOCKWISE = -1,
}

export type AsteroidProps = {
  angle: AsteroidAngles;
  rotationSpeed?: number;
  spin: SpinTypes;
} & baseObjectProps;
