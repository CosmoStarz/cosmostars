import AsteroidImage1 from "@/assets/images/game-model-asteroid-1.png";
import AsteroidImage2 from "@/assets/images/game-model-asteroid-2.png";
import AsteroidImage3 from "@/assets/images/game-model-asteroid-3.png";
import BonusLiveImage from "@/assets/images/game-model-bonus-live.png";
import BonusPowerImage from "@/assets/images/game-model-bonus-power.png";
import EnemyImage1 from "@/assets/images/game-model-enemy-1.png";
import EnemyImage2 from "@/assets/images/game-model-enemy-2.png";
import EnemyImage3 from "@/assets/images/game-model-enemy-3.png";
import EnemyImage4 from "@/assets/images/game-model-enemy-4.png";
import EnemyProjectileImage from "@/assets/images/game-model-enemy-projectile.png";
import ExplosionSprite from "@/assets/images/game-model-explosion.png";
import PlayerImage from "@/assets/images/game-model-player.png";
import PlayerDamagedImage from "@/assets/images/game-model-player-damaged.png";
import PlayerDestroyedImage from "@/assets/images/game-model-player-destroyed.png";
import PlayerProjectileImage from "@/assets/images/game-model-player-projectile.png";
import ShieldImage from "@/assets/images/game-model-shield.png";
import UfoImage1 from "@/assets/images/game-model-ufo-1.png";
import UfoImage2 from "@/assets/images/game-model-ufo-2.png";
import UfoProjectileImage from "@/assets/images/game-model-ufo-projectile.png";

import { SpriteConfigType } from "./types";
// import { PlayerState } from "@/shared/constants";

export enum PlayerState {
  DEFAULT = 0,
  POWER = 1,
  SHIELD = 2,
}

export const SpriteSpeedLimit = 4;

export enum SpinTypes {
  CLOCKWISE = 1,
  COUNTERCLOCKWISE = -1,
}

export enum SpriteConstants {
  PLAYER = 1,
  EXPLOSION = 2,
  PLAYER_PROJECTILE = 3,
  ENEMY_PROJECTILE = 4,
  UFO_PROJECTILE = 5,
  ENEMY_1 = 6,
  ENEMY_2 = 7,
  ENEMY_3 = 8,
  ENEMY_4 = 9,
  UFO_1 = 10,
  UFO_2 = 11,
  ASTEROID_1 = 12,
  ASTEROID_2 = 13,
  ASTEROID_3 = 14,
  BONUS_LIVE = 15,
  BONUS_POWER = 16,
  BONUS_SHIELD = 17,
  SHIELD = 18,
}

export enum PlayerSkinsTypes {
  DESTROYED = 1,
  DAMAGED = 2,
  BASE = 3,
}

export const PlayerSkinsDefault: Record<PlayerSkinsTypes, string> = {
  [PlayerSkinsTypes.BASE]: PlayerImage,
  [PlayerSkinsTypes.DAMAGED]: PlayerDamagedImage,
  [PlayerSkinsTypes.DESTROYED]: PlayerDestroyedImage,
};

export const PlayerSkinsShield: Record<PlayerSkinsTypes, string> = {
  [PlayerSkinsTypes.BASE]: PlayerImage,
  [PlayerSkinsTypes.DAMAGED]: PlayerDamagedImage,
  [PlayerSkinsTypes.DESTROYED]: PlayerDestroyedImage,
};

export const PlayerSkinsPower: Record<PlayerSkinsTypes, string> = {
  [PlayerSkinsTypes.BASE]: PlayerImage,
  [PlayerSkinsTypes.DAMAGED]: PlayerDamagedImage,
  [PlayerSkinsTypes.DESTROYED]: PlayerDestroyedImage,
};

export const PlayerSkins = {
  [PlayerState.DEFAULT]: PlayerSkinsDefault,
  [PlayerState.POWER]: PlayerSkinsPower,
  [PlayerState.SHIELD]: PlayerSkinsShield,
}

export const SpriteConfig: Record<SpriteConstants, SpriteConfigType> = {
  [SpriteConstants.PLAYER]: {
    src: PlayerSkinsDefault[PlayerSkinsTypes.BASE],
    frames: 7,
  },
  [SpriteConstants.ENEMY_1]: {
    src: EnemyImage1,
    frames: 6,
  },
  [SpriteConstants.ENEMY_2]: {
    src: EnemyImage2,
    frames: 6,
  },
  [SpriteConstants.ENEMY_3]: {
    src: EnemyImage3,
    frames: 6,
  },
  [SpriteConstants.ENEMY_4]: {
    src: EnemyImage4,
    frames: 6,
  },
  [SpriteConstants.UFO_1]: {
    src: UfoImage1,
    frames: 6,
  },
  [SpriteConstants.UFO_2]: {
    src: UfoImage2,
    frames: 6,
  },
  [SpriteConstants.PLAYER_PROJECTILE]: {
    src: PlayerProjectileImage,
    frames: 4,
  },
  [SpriteConstants.ENEMY_PROJECTILE]: {
    src: EnemyProjectileImage,
    frames: 4,
  },
  [SpriteConstants.UFO_PROJECTILE]: {
    src: UfoProjectileImage,
    frames: 4,
  },
  [SpriteConstants.EXPLOSION]: {
    src: ExplosionSprite,
    frames: 12,
  },
  [SpriteConstants.ASTEROID_1]: {
    src: AsteroidImage1,
    ratio: 3,
  },
  [SpriteConstants.ASTEROID_2]: {
    src: AsteroidImage2,
    ratio: 3,
  },
  [SpriteConstants.ASTEROID_3]: {
    src: AsteroidImage3,
    ratio: 3,
  },
  [SpriteConstants.BONUS_LIVE]: {
    src: BonusLiveImage,
    frames: 8,
  },
  [SpriteConstants.BONUS_POWER]: {
    src: BonusPowerImage,
    frames: 10,
  },
  [SpriteConstants.BONUS_SHIELD]: {
    src: BonusLiveImage,
    frames: 8,
  },
  [SpriteConstants.SHIELD]: {
    src: ShieldImage,
    ratio: 8,
  },
};
