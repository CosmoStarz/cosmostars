import AsteroidImage from "@/assets/images/game-model-asteroid.png";
import EnemyImage from "@/assets/images/game-model-enemy.png";
import EnemyProjectileImage from "@/assets/images/game-model-enemy-projectile.png";
import ExplosionSprite from "@/assets/images/game-model-explosion.png";
import PlayerImage from "@/assets/images/game-model-player.png";
import PlayerDamagedImage from "@/assets/images/game-model-player-damaged.png";
import PlayerDestroyedImage from "@/assets/images/game-model-player-destroyed.png";
import PlayerProjectileImage from "@/assets/images/game-model-player-projectile.png";

import { basicSize } from "../../model/BaseObject/types";
import { SpriteConfigType } from "./types";

export const SpriteSpeedLimit = 4;

export enum SpinTypes {
  CLOCKWISE = 1,
  COUNTERCLOCKWISE = -1,
}

export const initialExplosionSize: basicSize = {
  width: 96,
  height: 96,
};

export const initialPlayerSize: basicSize = {
  height: 70,
  width: 55,
};

export enum SpriteConstants {
  PLAYER = 1,
  ENEMY_DEFAULT = 2,
  PLAYER_PROJECTILE = 3,
  ENEMY_PROJECTILE = 4,
  EXPLOSION = 5,
  ASTEROID = 6,
}

export enum PlayerSkinsTypes {
  DESTROYED = 1,
  DAMAGED = 2,
  BASE = 3,
}

export const PlayerSkins: Record<PlayerSkinsTypes, string> = {
  [PlayerSkinsTypes.BASE]: PlayerImage,
  [PlayerSkinsTypes.DAMAGED]: PlayerDamagedImage,
  [PlayerSkinsTypes.DESTROYED]: PlayerDestroyedImage,
};

export const SpriteConfig: Record<SpriteConstants, SpriteConfigType> = {
  [SpriteConstants.PLAYER]: {
    src: PlayerSkins[PlayerSkinsTypes.BASE],
    frames: 7,
  },
  [SpriteConstants.ENEMY_DEFAULT]: {
    src: EnemyImage,
    ratio: 8,
  },
  [SpriteConstants.PLAYER_PROJECTILE]: {
    src: PlayerProjectileImage,
  },
  [SpriteConstants.ENEMY_PROJECTILE]: {
    src: EnemyProjectileImage,
  },
  [SpriteConstants.EXPLOSION]: {
    src: ExplosionSprite,
    frames: 12,
  },
  [SpriteConstants.ASTEROID]: {
    src: AsteroidImage,
    ratio: 3,
  },
};
