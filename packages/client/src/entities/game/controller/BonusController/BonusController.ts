import { store } from "@/app/store";
import { Sound } from "@/entities/game/ui/Sound/Sound";
import {
  BaseGameColors,
  baseSpeed,
  framesPerShoot,
  hitEffectDuration,
  hitEffectOpacity,
  InitialSizes,
  maxStarsCount,
  PlayerLives,
  randomInterval,
  StarRadius,
  StarVelocity,
} from "@/shared/constants";
import { getRandomNumber } from "@/shared/utils/functions";

import { Asteroid } from "../../model/Asteroid/Asteroid";
import {
  asteroidFrequency,
  generateAsteroidConfig,
} from "../../model/Asteroid/AsteroidConfig";
import { BaseObject } from "../../model/BaseObject/BaseObject";
import { EnemyGrid } from "../../model/EnemyGrid/EnemyGrid";
import { Player } from "../../model/Player/Player";
import { Star } from "../../model/Star/Star";
import {
  decrementLives,
  incrementScoreByEnemy,
} from "../../model/store/gameSlice";
import { Canvas } from "../../ui/Canvas/Canvas";
import { elementCoords } from "../../ui/Canvas/types";
import { SpriteConstants } from "../../ui/Sprite/SpriteConfig";
import { BonusControllerType } from "./types";

// класс игрового контроллера: включает в себя работу над игровыми объектами
export class BonusController {
  private scene: Canvas;
  private player: Player;
  public bonuses: BaseObject[] = [];

  constructor(props: BonusControllerType) {
    this.scene = props.scene;
    this.player = props.player;
  }

  private get randomBonusType() {
    const minBonusType = this.player.lives < PlayerLives.MAX ? SpriteConstants.BONUS_LIVE : SpriteConstants.BONUS_POWER;

    return getRandomNumber(minBonusType, SpriteConstants.BONUS_POWER)
  }

  private get randomBonus(): BaseObject {
    const type = this.randomBonusType;
    const size = InitialSizes[type];

    return new BaseObject({
      scene: this.scene,
      type,
      velocity: {
        dx: 0,
        dy: 2,
      },
      position: {
        x: getRandomNumber(0, this.scene.width - size.width),
        y: 0,
      },
      size,
    });
  }

  public createBonus() {
    this.bonuses.push(this.randomBonus);
  }

  public watchBonusGone() {
    this.bonuses.forEach((bonus, index) => {
      if (bonus.position.y >= this.scene.height) {
        this.bonuses = this.bonuses.filter(
          (item, idx) => idx !== index
        );
      } else {
        bonus.update();
      }
    });
  }

  public clear() {
    this.bonuses = [];
  }
}
