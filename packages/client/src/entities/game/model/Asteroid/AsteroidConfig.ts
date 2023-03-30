import { getRandomNumber } from "@/shared/utils/functions";

import { Canvas } from "../../ui/Canvas/Canvas";
import {
  initialExplosionSize,
  SpinTypes,
  SpriteConstants,
} from "../../ui/Sprite/SpriteConfig";

export const asteroidFrequency = 200;

export const enum VectorAngles {
  MIN = 30,
  MAX = 70,
}

export const enum AsteroidVelocity {
  MIN = 4,
  MAX = 10,
}

export enum AsteroidAligns {
  RIGHT = 1,
  LEFT = 2,
}

export const generateAsteroidConfig = (canvas: Canvas) => {
  const baseAsteroidProps = {
    scene: canvas,
    type: SpriteConstants.ASTEROID,
    size: initialExplosionSize,
  };
  const yBasePosition = getRandomNumber(1, canvas.height / 2);
  const type = getRandomNumber(AsteroidAligns.RIGHT, AsteroidAligns.LEFT);
  const velocity = getRandomNumber(AsteroidVelocity.MIN, AsteroidVelocity.MAX);
  const angle = getRandomNumber(VectorAngles.MIN, VectorAngles.MAX);
  const rotationSpeed = getRandomNumber(1, 3);

  switch (type) {
    case AsteroidAligns.RIGHT:
      return {
        ...baseAsteroidProps,
        velocity: {
          dx: -velocity,
          dy: -velocity,
        },
        position: {
          x: canvas.width - initialExplosionSize.width,
          y: yBasePosition,
        },
        angle: -angle,
        spin: SpinTypes.COUNTERCLOCKWISE,
        rotationSpeed,
      };
    case AsteroidAligns.LEFT:
    default:
      return {
        ...baseAsteroidProps,
        velocity: {
          dx: velocity,
          dy: velocity,
        },
        position: {
          x: 0,
          y: yBasePosition,
        },
        angle,
        spin: SpinTypes.CLOCKWISE,
        rotationSpeed,
      };
  }
};
